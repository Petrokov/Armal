import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'
import { buildLocalizedRoutes } from './seo-routes.js'
import { fetchPublishedBlogRoutes, loadLocalEnv } from './cms-routes.js'

const ROOT_DIR = process.cwd()
const PUBLIC_DIR = path.join(ROOT_DIR, 'public')
const OUTPUT_PATH = path.join(PUBLIC_DIR, 'sitemap.xml')
const FALLBACK_BASE_URL = 'https://www.armal.hr'
const PRODUCTION_HOSTS = new Set(['armal.hr', 'www.armal.hr'])

const resolveBaseUrl = () => {
  const raw = (process.env.VITE_PUBLIC_SITE_URL || '').trim()
  if (!raw) return FALLBACK_BASE_URL

  try {
    const parsed = new URL(raw)
    const host = parsed.hostname.toLowerCase()
    if (!PRODUCTION_HOSTS.has(host)) return FALLBACK_BASE_URL
    return `${parsed.protocol}//${parsed.host}`
  } catch {
    return FALLBACK_BASE_URL
  }
}

// Static routes get their lastmod from the last git commit touching the files that render them.
// Docker/Railway builds have no .git, so the dates are cached in a committed JSON file.
const LASTMOD_CACHE_PATH = path.join(ROOT_DIR, 'scripts', 'sitemap-lastmod.json')
const DEFAULT_SOURCES = ['src/AppRoutes.jsx']
const ROUTE_SOURCES = {
  '/': ['src/components/LandingPage.jsx', 'src/seo/landingSeoLocale.js'],
  '/o-nama': ['src/pages/o_nama.jsx'],
  '/servis': ['src/pages/ServisPage.jsx'],
  '/katalozi': ['src/pages/KataloziPage.jsx'],
  '/proizvodi': ['src/pages/ProizvodiPage.jsx'],
  '/proizvodi/slavine': ['src/pages/ProizvodiSlavine.jsx', 'src/pages/proizvodiSlavine', 'src/seo/proizvodiSlavineSeoLocale.js'],
  '/proizvodi/kupanje-tusiranje': ['src/pages/ProizvodiKupanjeTusiranje.jsx'],
  '/proizvodi/sanitarije': ['src/pages/ProizvodiSanitarije.jsx'],
  '/blog': ['src/pages/BlogPage.jsx'],
  '/privacy-policy': ['src/pages/LegalPage.jsx'],
  '/terms-of-service': ['src/pages/LegalPage.jsx'],
  '/cookie-policy': ['src/pages/LegalPage.jsx'],
}
const COLLECTION_SOURCES = ['src/pages/ProizvodSlavinaDetalj.jsx']

const readLastmodCache = () => {
  try {
    return JSON.parse(fs.readFileSync(LASTMOD_CACHE_PATH, 'utf8'))
  } catch {
    return {}
  }
}

const gitLastCommitDate = (sources) => {
  try {
    const output = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...sources], {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return /^\d{4}-\d{2}-\d{2}$/.test(output) ? output : null
  } catch {
    return null
  }
}

const stripLocalePrefix = (pathname) => {
  const stripped = pathname.replace(/^\/(slo|rs|eng)(?=\/|$)/, '')
  return stripped === '' ? '/' : stripped
}

const sourcesForRoute = (basePath) => {
  if (ROUTE_SOURCES[basePath]) return ROUTE_SOURCES[basePath]
  if (basePath.startsWith('/proizvodi/slavine/')) return COLLECTION_SOURCES
  return DEFAULT_SOURCES
}

const resolveStaticLastmods = (pathnames) => {
  const cache = readLastmodCache()
  const nextCache = { ...cache }
  const result = new Map()

  for (const pathname of pathnames) {
    const basePath = stripLocalePrefix(pathname)
    const fromGit = gitLastCommitDate(sourcesForRoute(basePath))
    if (fromGit) nextCache[basePath] = fromGit
    const lastmod = fromGit || cache[basePath]
    if (lastmod) result.set(pathname, lastmod)
  }

  if (JSON.stringify(nextCache) !== JSON.stringify(cache)) {
    fs.writeFileSync(LASTMOD_CACHE_PATH, `${JSON.stringify(nextCache, null, 2)}\n`, 'utf8')
  }
  return result
}

const toSitemapEntry = (entry, fallbackLastmod) => {
  if (typeof entry === 'string') {
    return {
      pathname: entry,
      lastmod: fallbackLastmod,
    }
  }

  return {
    pathname: entry.pathname,
    lastmod: entry.lastmod || fallbackLastmod,
  }
}

const escapeXml = (value) =>
  `${value}`
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const buildSitemapXml = (baseUrl, entries) => {
  // changefreq/priority are ignored by Google and Bing; lastmod is only emitted when it is real.
  const urlNodes = entries
    .map(({ pathname, lastmod }) => {
      const absoluteUrl = `${baseUrl}${pathname}`
      return [
        '  <url>',
        `    <loc>${escapeXml(absoluteUrl)}</loc>`,
        lastmod ? `    <lastmod>${escapeXml(lastmod)}</lastmod>` : null,
        '  </url>',
      ].filter(Boolean).join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlNodes,
    '</urlset>',
    '',
  ].join('\n')
}

const uniqueEntries = (entries, staticLastmods = new Map()) => {
  const seen = new Set()
  const unique = []

  for (const entry of entries) {
    const normalized = toSitemapEntry(entry, staticLastmods.get(typeof entry === 'string' ? entry : entry.pathname))
    if (seen.has(normalized.pathname)) continue
    seen.add(normalized.pathname)
    unique.push(normalized)
  }

  return unique
}

const run = async () => {
  loadLocalEnv()

  const baseUrl = resolveBaseUrl()
  const localizedPaths = buildLocalizedRoutes()
  const blogRoutes = await fetchPublishedBlogRoutes()
  const staticLastmods = resolveStaticLastmods(localizedPaths)
  const uniquePaths = uniqueEntries([...localizedPaths, ...blogRoutes], staticLastmods)
  const xml = buildSitemapXml(baseUrl, uniquePaths)

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_PATH, xml, 'utf8')
  console.log(`Sitemap generated: ${OUTPUT_PATH}`)
  console.log(`Base URL: ${baseUrl}`)
  console.log(`URLs included: ${uniquePaths.length}`)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
