import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import axios from 'axios'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3001
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS || 1))

const M365_CLIENT_ID = process.env.M365_CLIENT_ID
const M365_CLIENT_SECRET = process.env.M365_CLIENT_SECRET
const M365_TENANT_ID = process.env.M365_TENANT_ID
const M365_FROM_EMAIL = process.env.M365_FROM_EMAIL
const isProduction = process.env.NODE_ENV === 'production'
const DEFAULT_ALLOWED_ORIGINS = [
  'https://armal.hr',
  'https://www.armal.hr',
]
const DEV_ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]
const ALLOWED_ORIGINS = new Set(
  [
    ...DEFAULT_ALLOWED_ORIGINS,
    ...(!isProduction ? DEV_ALLOWED_ORIGINS : []),
    ...(process.env.FRONTEND_ORIGIN || '')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  ].map((origin) => origin.replace(/\/$/, ''))
)
const SERVICE_RATE_WINDOW_MS = Number(process.env.SERVICE_RATE_WINDOW_MS || 15 * 60 * 1000)
const SERVICE_RATE_MAX = Number(process.env.SERVICE_RATE_MAX || 5)
const serviceRateHits = new Map()

const TOKEN_URL = `https://login.microsoftonline.com/${M365_TENANT_ID}/oauth2/v2.0/token`
const GRAPH_SEND_MAIL_URL = (userEmail) =>
  `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(userEmail)}/sendMail`

function normalizeOrigin(value) {
  if (!value) return ''
  try {
    const parsed = new URL(value)
    return `${parsed.protocol}//${parsed.host}`.replace(/\/$/, '')
  } catch {
    return ''
  }
}

function isAllowedOrigin(value) {
  const origin = normalizeOrigin(value)
  return origin ? ALLOWED_ORIGINS.has(origin) : false
}

function corsOrigin(origin, callback) {
  if (!origin || isAllowedOrigin(origin)) {
    callback(null, true)
    return
  }
  callback(null, false)
}

function requireAllowedServiceOrigin(req, res, next) {
  const origin = req.get('origin')
  const referer = req.get('referer')

  if (isAllowedOrigin(origin) || isAllowedOrigin(referer)) {
    next()
    return
  }

  if (!isProduction && !origin && !referer) {
    next()
    return
  }

  res.status(403).json({
    success: false,
    error: 'Zahtjev nije dozvoljen s ove domene.',
  })
}

function serviceRateLimit(req, res, next) {
  const now = Date.now()
  const key = req.ip || req.socket?.remoteAddress || 'unknown'
  const current = serviceRateHits.get(key)

  if (serviceRateHits.size > 10000) {
    for (const [hitKey, hit] of serviceRateHits.entries()) {
      if (hit.resetAt <= now) serviceRateHits.delete(hitKey)
    }
  }

  if (!current || current.resetAt <= now) {
    serviceRateHits.set(key, { count: 1, resetAt: now + SERVICE_RATE_WINDOW_MS })
    next()
    return
  }

  current.count += 1

  if (current.count > SERVICE_RATE_MAX) {
    const retryAfterSeconds = Math.ceil((current.resetAt - now) / 1000)
    res.setHeader('Retry-After', String(retryAfterSeconds))
    res.status(429).json({
      success: false,
      error: 'Previse zahtjeva. Pokusajte ponovno kasnije.',
    })
    return
  }

  next()
}

/**
 * Dohvaća OAuth2 access token (Client Credentials Flow).
 */
async function getM365AccessToken() {
  const params = new URLSearchParams({
    client_id: M365_CLIENT_ID,
    client_secret: M365_CLIENT_SECRET,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  })
  const { data } = await axios.post(TOKEN_URL, params.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return data.access_token
}

/**
 * Šalje email putem Microsoft 365 Graph API.
 * @param {string|string[]} toRecipients - Email adresa ili niz adresa primatelja
 * @param {string} subject - Predmet poruke
 * @param {string} htmlContent - Tijelo poruke u HTML formatu
 * @param {Array<{ name: string, contentBytes: string }>} [attachments] - Prilozi (contentBytes = base64)
 */
async function sendM365Email(toRecipients, subject, htmlContent, attachments = []) {
  const token = await getM365AccessToken()
  const toList = Array.isArray(toRecipients) ? toRecipients : [toRecipients]
  const toRecipientsPayload = toList.map((address) => ({
    emailAddress: {
      address,
      name: address,
    },
  }))

  const message = {
    message: {
      subject,
      body: {
        contentType: 'HTML',
        content: htmlContent,
      },
      toRecipients: toRecipientsPayload,
    },
  }

  if (attachments.length > 0) {
    message.message.attachments = attachments.map((a) => ({
      '@odata.type': '#microsoft.graph.fileAttachment',
      name: a.name,
      contentBytes: a.contentBytes,
    }))
  }

  await axios.post(GRAPH_SEND_MAIL_URL(M365_FROM_EMAIL), message, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

// Multer: spremi upload u memoriju (buffer za prilog)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = /^image\/(jpeg|jpg|png|gif|webp)$/i
    if (allowed.test(file.mimetype)) cb(null, true)
    else cb(new Error('Dozvoljeni formati: JPEG, PNG, GIF, WebP'))
  },
})

app.use(cors({ origin: corsOrigin }))
app.use(express.json())

// POST /api/servis – prima formu (name, phone, address, message, image)
app.post('/api/servis', requireAllowedServiceOrigin, serviceRateLimit, upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone, street, houseNumber, city, postalCode, country, message } = req.body || {}
    const file = req.file

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !street?.trim() ||
      !houseNumber?.trim() ||
      !city?.trim() ||
      !postalCode?.trim() ||
      !country?.trim()
    ) {
      return res.status(400).json({
        success: false,
        error: 'Ime, email, telefon i adresa su obavezni.',
      })
    }

    if (!M365_CLIENT_ID || !M365_CLIENT_SECRET || !M365_TENANT_ID || !M365_FROM_EMAIL) {
      return res.status(500).json({
        success: false,
        error: 'M365 nije konfiguriran. Postavi M365_CLIENT_ID, M365_CLIENT_SECRET, M365_TENANT_ID, M365_FROM_EMAIL u .env',
      })
    }

    const toEmail = process.env.TO_EMAIL || 'servis@armal.hr'
    const subject = `Servis zahtjev - ${name}`
    const text = [
      `Ime i prezime: ${name}`,
      `Email: ${email}`,
      `Telefon: ${phone}`,
      '',
      'Adresa:',
      `Ulica: ${street}`,
      `Broj: ${houseNumber}`,
      `Mjesto: ${city}`,
      `Postanski broj: ${postalCode}`,
      `Drzava: ${country}`,
      '',
      message ? `Poruka: ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    const htmlContent = `<pre style="font-family: sans-serif; white-space: pre-wrap;">${escapeHtml(text)}</pre>`

    const attachments = []
    if (file && file.buffer) {
      attachments.push({
        name: file.originalname || 'prilog.jpg',
        contentBytes: file.buffer.toString('base64'),
      })
    }

    await sendM365Email(toEmail, subject, htmlContent, attachments)

    res.status(200).json({ success: true })
  } catch (err) {
    console.error('Servis API error:', err.response?.data || err.message)
    const status = err.response?.status || 500
    res.status(status).json({
      success: false,
      error: 'Slanje emaila nije uspjelo. Pokušajte ponovno.',
    })
  }
})

function escapeHtml(str) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

// Production (npr. Railway): poslužuj build frontenda s istog poslužitelja – jedan deploy
const distPath = path.join(__dirname, '..', 'dist')
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Servis API: http://localhost:${PORT}`)
})
