import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import axios from 'axios'
import { buildLocalizedRoutes } from '../scripts/seo-routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3001
app.set('trust proxy', Number(process.env.TRUST_PROXY_HOPS || 1))

// Apex domain duplicates www (canonical host) — send crawlers and visitors to a single host.
app.use((req, res, next) => {
  if (
    process.env.NODE_ENV === 'production' &&
    (req.method === 'GET' || req.method === 'HEAD') &&
    req.hostname === 'armal.hr'
  ) {
    res.redirect(301, `https://www.armal.hr${req.originalUrl}`)
    return
  }
  next()
})

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
 * @param {Array<{ name: string, contentBytes: string, contentType?: string }>} [attachments] - Prilozi (contentBytes = base64)
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
      contentType: a.contentType,
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
const MAX_SERVICE_IMAGES = 5
const MAX_SERVICE_IMAGE_SIZE_MB = 2
const MAX_SERVICE_FIELDS = 12
const MAX_SERVICE_FIELD_SIZE_BYTES = 10 * 1024
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_SERVICE_IMAGE_SIZE_MB * 1024 * 1024,
    files: MAX_SERVICE_IMAGES,
    fields: MAX_SERVICE_FIELDS,
    fieldSize: MAX_SERVICE_FIELD_SIZE_BYTES,
    parts: MAX_SERVICE_FIELDS + MAX_SERVICE_IMAGES,
  },
  fileFilter: (req, file, cb) => {
    const allowed = /^image\/(jpeg|jpg|png|gif|webp)$/i
    if (allowed.test(file.mimetype)) cb(null, true)
    else cb(new Error('Dozvoljeni formati: JPEG, PNG, GIF, WebP'))
  },
})
const serviceImagesUpload = upload.fields([
  { name: 'images', maxCount: MAX_SERVICE_IMAGES },
  { name: 'image', maxCount: 1 },
])

function handleServiceImagesUpload(req, res, next) {
  serviceImagesUpload(req, res, (err) => {
    if (!err) {
      next()
      return
    }

    const multerErrorMessages = {
      LIMIT_FILE_SIZE: `Jedna slika smije imati najvise ${MAX_SERVICE_IMAGE_SIZE_MB} MB.`,
      LIMIT_FILE_COUNT: `Mozete priloziti najvise ${MAX_SERVICE_IMAGES} slika.`,
      LIMIT_UNEXPECTED_FILE: `Mozete priloziti najvise ${MAX_SERVICE_IMAGES} slika.`,
      LIMIT_FIELD_COUNT: 'Obrazac ima previse polja.',
      LIMIT_FIELD_VALUE: 'Jedno polje obrasca je predugacko.',
      LIMIT_PART_COUNT: 'Obrazac ima previse dijelova.',
    }

    res.status(400).json({
      success: false,
      error: multerErrorMessages[err.code] || err.message || 'Upload slika nije uspio.',
    })
  })
}

function sanitizeAttachmentName(value, index) {
  const fallback = `prilog-${index + 1}.jpg`
  if (!value) return fallback

  const baseName = Array.from(path.basename(value))
    .map((char) => {
      const code = char.charCodeAt(0)
      return code < 32 || code === 127 ? '-' : char
    })
    .join('')
  const safeName = baseName
    .replace(/[<>:"/\\|?*]+/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)

  return safeName || fallback
}

function hasValidImageSignature(file) {
  const buffer = file?.buffer
  if (!buffer || buffer.length < 4) return false

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  }

  if (file.mimetype === 'image/png') {
    return buffer.length >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
  }

  if (file.mimetype === 'image/gif') {
    return buffer.subarray(0, 6).toString('ascii') === 'GIF87a' ||
      buffer.subarray(0, 6).toString('ascii') === 'GIF89a'
  }

  if (file.mimetype === 'image/webp') {
    return buffer.length >= 12 &&
      buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
      buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  }

  return false
}

app.use(cors({ origin: corsOrigin }))
app.use(express.json())

// POST /api/servis – prima formu i do 5 slika racuna.
app.post('/api/servis', requireAllowedServiceOrigin, serviceRateLimit, handleServiceImagesUpload, async (req, res) => {
  try {
    const { name, email, phone, street, houseNumber, city, postalCode, country, message } = req.body || {}
    const uploadedFiles = [
      ...(req.files?.images || []),
      ...(req.files?.image || []),
    ].slice(0, MAX_SERVICE_IMAGES)

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

    if (uploadedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Prilozite barem jednu sliku racuna.',
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
      uploadedFiles.length ? `Prilozi: ${uploadedFiles.length} slika` : '',
      '',
      message ? `Poruka: ${message}` : '',
    ]
      .filter(Boolean)
      .join('\n')
    const htmlContent = `<pre style="font-family: sans-serif; white-space: pre-wrap;">${escapeHtml(text)}</pre>`

    const attachments = []
    for (const [index, file] of uploadedFiles.entries()) {
      if (!file?.buffer) continue

      if (!hasValidImageSignature(file)) {
        return res.status(400).json({
          success: false,
          error: 'Jedna ili vise slika nema ispravan format datoteke.',
        })
      }

      attachments.push({
        name: sanitizeAttachmentName(file.originalname, index),
        contentType: file.mimetype,
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

// GET /pdf/:slug – newsletter PDF iz Supabase Storagea posluzen pod armal.hr adresom (proxy, bez redirecta).
const SUPABASE_URL = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
const NEWSLETTER_BUCKET = 'armal-newsletter'
const NEWSLETTER_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const PDF_PASSTHROUGH_HEADERS = ['content-length', 'content-range', 'accept-ranges', 'etag', 'last-modified']

app.get('/pdf/:slug', async (req, res) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')

  const slug = String(req.params.slug || '').replace(/\.pdf$/i, '').toLowerCase()
  if (!SUPABASE_URL || !NEWSLETTER_SLUG_PATTERN.test(slug)) {
    res.status(404).type('text/plain; charset=utf-8').send('PDF nije pronađen.')
    return
  }

  const fileUrl = `${SUPABASE_URL}/storage/v1/object/public/${NEWSLETTER_BUCKET}/${slug}.pdf`

  try {
    // Range se prosljeduje da preglednikov PDF viewer moze ucitavati velike datoteke u dijelovima.
    const upstream = await axios.get(fileUrl, {
      responseType: 'stream',
      timeout: 15000,
      validateStatus: () => true,
      headers: req.headers.range ? { Range: req.headers.range } : {},
    })

    if (upstream.status >= 400) {
      upstream.data.resume()
      const notFound = upstream.status < 500
      res
        .status(notFound ? 404 : 502)
        .type('text/plain; charset=utf-8')
        .send(notFound ? 'PDF nije pronađen.' : 'PDF trenutno nije dostupan.')
      return
    }

    res.status(upstream.status)
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${slug}.pdf"`)
    res.setHeader('Cache-Control', 'public, max-age=60')
    for (const header of PDF_PASSTHROUGH_HEADERS) {
      if (upstream.headers[header]) res.setHeader(header, upstream.headers[header])
    }

    req.on('close', () => upstream.data.destroy())
    upstream.data.pipe(res)
  } catch (err) {
    console.error('Newsletter PDF proxy error:', err.message)
    if (!res.headersSent) {
      res.status(502).type('text/plain; charset=utf-8').send('PDF trenutno nije dostupan.')
    }
  }
})

// Production (npr. Railway): poslužuj build frontenda s istog poslužitelja – jedan deploy
const distPath = path.join(__dirname, '..', 'dist')
if (isProduction) {
  const KNOWN_ROUTES = new Set(buildLocalizedRoutes())
  // Blog posts come from the CMS and can be published after the last build, so unknown slugs fall back to the SPA.
  const BLOG_POST_PATTERN = /^(?:\/(?:slo|rs|eng))?\/blog\/[^/.\\]+$/
  const ADMIN_PATTERN = /^\/admin(?:\/|$)/
  const ASSET_EXTENSION_PATTERN = /\.[a-z0-9]{2,5}$/i

  const prerenderedFile = (pathname) =>
    path.join(distPath, pathname === '/' ? '' : pathname.slice(1), 'index.html')

  const sendPage = (res, pathname) => {
    const file = prerenderedFile(pathname)
    res.sendFile(fs.existsSync(file) ? file : path.join(distPath, 'index.html'))
  }

  app.use(express.static(distPath, { index: false, redirect: false }))

  app.get('*', (req, res) => {
    const pathname = req.path.length > 1 ? req.path.replace(/\/+$/, '') || '/' : req.path

    if (pathname !== req.path) {
      const query = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : ''
      res.redirect(301, `${pathname}${query}`)
      return
    }

    // A missing file must not be answered with the HTML shell (200), or crawlers and browsers cache it as the asset.
    if (pathname.startsWith('/assets/') || ASSET_EXTENSION_PATTERN.test(pathname)) {
      res.status(404).type('text/plain; charset=utf-8').send('Not found')
      return
    }

    if (ADMIN_PATTERN.test(pathname)) {
      res.setHeader('X-Robots-Tag', 'noindex, nofollow')
      res.sendFile(path.join(distPath, 'index.html'))
      return
    }

    if (KNOWN_ROUTES.has(pathname) || BLOG_POST_PATTERN.test(pathname)) {
      sendPage(res, pathname)
      return
    }

    const notFoundFile = path.join(distPath, '404.html')
    res.status(404)
    res.setHeader('X-Robots-Tag', 'noindex')
    res.sendFile(fs.existsSync(notFoundFile) ? notFoundFile : path.join(distPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Servis API: http://localhost:${PORT}`)
})
