import fs from 'fs'
import path from 'path'
import pg from 'pg'
import { loadLocalEnv } from './cms-routes.js'

loadLocalEnv()

const ROOT_DIR = process.cwd()
const SETUP_SQL_PATH = path.join(ROOT_DIR, 'supabase', 'setup-team-members.sql')

const SUPABASE_URL = (process.env.VITE_SUPABASE_URL || '').trim()
const SERVICE_ROLE_KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()
const ANON_KEY = (process.env.VITE_SUPABASE_ANON_KEY || '').trim()
const DB_PASSWORD = (process.env.SUPABASE_DB_PASSWORD || '').trim()
const ADMIN_EMAIL = (process.env.SUPABASE_ADMIN_EMAIL || 'tin.lojen@petrokov.hr').trim()
const ADMIN_PASSWORD = (process.env.SUPABASE_ADMIN_PASSWORD || '').trim()

const TEAM_MEMBERS = [
  { name: 'Simona Zavratnik', title: 'Direktorica', image_url: '/slike_team/simona_zavratnik_2.png', email: 'simona.zavratnik@armal.hr', linkedin_url: '#', sort_order: 1, show_on_homepage: true },
  { name: 'Suzana Mahović', title: 'COO – operativni direktor', image_url: '/slike_team/Suzana-Mahovic-2.webp', email: 'suzana.mahovic@armal.hr', linkedin_url: '#', sort_order: 2, show_on_homepage: true },
  { name: 'Marko Hrgetić', title: 'Voditelj nabave', image_url: '/slike_team/Marko-Hrgetic.webp', email: 'marko.hrgetic@armal.hr', linkedin_url: '#', sort_order: 3, show_on_homepage: true },
  { name: 'Aleksandar Franolić', title: 'Export menager', image_url: '/slike_team/Aleksandar-Franolic.webp', email: 'aleksandar.franolic@armal.hr', linkedin_url: '#', sort_order: 4, show_on_homepage: false },
  { name: 'Miroslav Salopek', title: 'Terenski komercijalist', image_url: '/slike_team/Miro-Salopek.webp', email: 'miroslav.salopek@armal.hr', linkedin_url: '#', sort_order: 5, show_on_homepage: false },
  { name: 'Saša Čačić', title: 'Terenski komercijalist', image_url: '/slike_team/Sasa-Cacic.webp', email: 'sasa.cacic@armal.hr', linkedin_url: '#', sort_order: 6, show_on_homepage: false },
  { name: 'Marko Čović', title: 'Terenski komercijalist', image_url: '/slike_team/Marko-Covic.webp', email: 'marko.covic@armal.hr', linkedin_url: '#', sort_order: 7, show_on_homepage: false },
  { name: 'Anja Križanić', title: 'Koordinator prodaje za RH', image_url: '/slike_team/anonimno.jpg', email: 'anja.krizanic@armal.hr', linkedin_url: '#', sort_order: 8, show_on_homepage: false },
  { name: 'Sandra Miklec', title: 'Administrator u odjelu prodaje', image_url: '/slike_team/Sandra-Miklec.webp', email: 'sandra.miklec@armal.hr', linkedin_url: '#', sort_order: 9, show_on_homepage: false },
  { name: 'Natalija Jović', title: 'Referent nabave', image_url: '/slike_team/Natalija-Jovic.webp', email: 'natalija.jovic@armal.hr', linkedin_url: '#', sort_order: 10, show_on_homepage: false },
  { name: 'Marija Pršir', title: 'Administrator nabave', image_url: '/slike_team/Marija-Prsir.webp', email: 'marija.prsir@armal.hr', linkedin_url: '#', sort_order: 11, show_on_homepage: false },
  { name: 'Morena Sršen', title: 'Voditelj odjela postprodaje', image_url: '/slike_team/Morena-Srsen.webp', email: 'morena.srsen@armal.hr', linkedin_url: '#', sort_order: 12, show_on_homepage: false },
  { name: 'Mladen Luketić', title: 'Serviser i montažer', image_url: '/slike_team/Mladen-Luketic.webp', email: 'mladen.luketic@armal.hr', linkedin_url: '#', sort_order: 13, show_on_homepage: false },
]

const publishedAt = new Date().toISOString()

const getProjectRef = () => {
  const match = SUPABASE_URL.match(/https:\/\/([^.]+)\.supabase\.co/)
  return match?.[1] || ''
}

const getAccessToken = async () => {
  if (SERVICE_ROLE_KEY) return SERVICE_ROLE_KEY

  if (!ADMIN_PASSWORD) {
    throw new Error('Postavi SUPABASE_SERVICE_ROLE_KEY ili SUPABASE_ADMIN_PASSWORD u .env za seed.')
  }

  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: ANON_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Admin prijava nije uspjela: ${message}`)
  }

  const data = await response.json()
  return data.access_token
}

const supabaseRequest = async (path, { method = 'GET', accessToken, body } = {}) => {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: {
      apikey: ANON_KEY,
      Authorization: `Bearer ${accessToken}`,
      ...(body ? { 'Content-Type': 'application/json', Prefer: 'return=representation' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`${method} ${path} failed (${response.status}): ${message}`)
  }

  if (response.status === 204) return null
  const contentType = response.headers.get('content-type') || ''
  return contentType.includes('application/json') ? response.json() : response.text()
}

const isMissingTableError = (error) => String(error.message || error).includes('PGRST205')

const runSetupSql = async () => {
  if (!DB_PASSWORD) {
    throw new Error(
      'Tablica team_members ne postoji. Pokreni supabase/setup-team-members.sql u Supabase SQL Editoru, ili dodaj SUPABASE_DB_PASSWORD u .env pa ponovi npm run seed:team.',
    )
  }

  const projectRef = getProjectRef()
  if (!projectRef) throw new Error('Ne mogu procitati project ref iz VITE_SUPABASE_URL.')

  const client = new pg.Client({
    host: `db.${projectRef}.supabase.co`,
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
  })

  const sql = fs.readFileSync(SETUP_SQL_PATH, 'utf8')

  try {
    await client.connect()
    await client.query(sql)
    console.log('Setup SQL uspjesno pokrenut (tablica + seed).')
  } finally {
    await client.end().catch(() => null)
  }
}

const main = async () => {
  if (!SUPABASE_URL || !ANON_KEY) {
    throw new Error('Nedostaju VITE_SUPABASE_URL i VITE_SUPABASE_ANON_KEY u .env')
  }

  const accessToken = await getAccessToken()

  let existing = []
  try {
    existing = await supabaseRequest('/rest/v1/team_members?select=id&limit=1', { accessToken })
  } catch (error) {
    if (!isMissingTableError(error)) throw error
    await runSetupSql()
    existing = await supabaseRequest('/rest/v1/team_members?select=id&limit=1', { accessToken })
  }

  if (Array.isArray(existing) && existing.length > 0) {
    const countResponse = await supabaseRequest('/rest/v1/team_members?select=id', { accessToken })
    console.log(`team_members vec ima podatke. Trenutno zapisa: ${Array.isArray(countResponse) ? countResponse.length : 0}`)
    return
  }

  const payload = TEAM_MEMBERS.map((member) => ({
    ...member,
    status: 'published',
    published_at: publishedAt,
  }))

  const inserted = await supabaseRequest('/rest/v1/team_members', {
    method: 'POST',
    accessToken,
    body: payload,
  })

  console.log(`Ubaceno ${Array.isArray(inserted) ? inserted.length : 0} zaposlenika u team_members.`)
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
