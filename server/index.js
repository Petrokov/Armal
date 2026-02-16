import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import axios from 'axios'

const app = express()
const PORT = process.env.PORT || 3001

const M365_CLIENT_ID = process.env.M365_CLIENT_ID
const M365_CLIENT_SECRET = process.env.M365_CLIENT_SECRET
const M365_TENANT_ID = process.env.M365_TENANT_ID
const M365_FROM_EMAIL = process.env.M365_FROM_EMAIL

const TOKEN_URL = `https://login.microsoftonline.com/${M365_TENANT_ID}/oauth2/v2.0/token`
const GRAPH_SEND_MAIL_URL = (userEmail) =>
  `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(userEmail)}/sendMail`

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

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }))
app.use(express.json())

// POST /api/servis – prima formu (name, phone, message, image)
app.post('/api/servis', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {}
    const file = req.file

    if (!name?.trim() || !email?.trim() || !phone?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Ime, email i telefon su obavezni.',
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
    const message =
      err.response?.data?.error?.message || err.message || 'Došlo je do greške.'
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

app.listen(PORT, () => {
  console.log(`Servis API: http://localhost:${PORT}`)
})
