import fs from 'fs'
import path from 'path'

const ROOT_DIR = process.cwd()
const ENV_PATH = path.join(ROOT_DIR, '.env')

const LOCALE_PREFIXES = {
  hr: '',
  slo: '/slo',
  rs: '/rs',
}

export const loadLocalEnv = () => {
  if (!fs.existsSync(ENV_PATH)) return

  const envText = fs.readFileSync(ENV_PATH, 'utf8')
  for (const line of envText.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '')
    if (key && process.env[key] === undefined) process.env[key] = value
  }
}

const normalizePath = (value) => {
  const next = `/${value}`.replace(/\/{2,}/g, '/')
  return next === '' ? '/' : next
}

const formatLastmod = (value) => {
  if (!value) return undefined

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined

  return date.toISOString().slice(0, 10)
}

const getSupabaseConfig = () => {
  const url = (process.env.VITE_SUPABASE_URL || '').trim()
  const anonKey = (process.env.VITE_SUPABASE_ANON_KEY || '').trim()

  if (!url || !anonKey) return null
  return { url, anonKey }
}

export const fetchPublishedBlogRoutes = async () => {
  const config = getSupabaseConfig()
  if (!config) {
    console.warn('Supabase env vars missing. CMS routes will be skipped.')
    return []
  }

  const now = encodeURIComponent(new Date().toISOString())
  const query = [
    'select=locale,slug,updated_at,published_at,created_at',
    'status=eq.published',
    `or=(published_at.is.null,published_at.lte.${now})`,
    'order=locale.asc,published_at.desc',
  ].join('&')

  const response = await fetch(`${config.url}/rest/v1/blog_posts?${query}`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
    },
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Supabase blog routes fetch failed: ${response.status} ${message}`)
  }

  const rows = await response.json()
  return rows
    .filter((post) => post.slug && LOCALE_PREFIXES[post.locale] !== undefined)
    .map((post) => ({
      pathname: normalizePath(`${LOCALE_PREFIXES[post.locale]}/blog/${post.slug}`),
      lastmod: formatLastmod(post.updated_at || post.published_at || post.created_at),
    }))
}
