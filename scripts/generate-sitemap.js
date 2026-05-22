import fs from 'fs'
import path from 'path'
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
  const today = new Date().toISOString().slice(0, 10)
  const urlNodes = entries
    .map((entry) => toSitemapEntry(entry, today))
    .map(({ pathname, lastmod }) => {
      const absoluteUrl = `${baseUrl}${pathname}`
      return [
        '  <url>',
        `    <loc>${escapeXml(absoluteUrl)}</loc>`,
        `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        '    <priority>0.8</priority>',
        '  </url>',
      ].join('\n')
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

const uniqueEntries = (entries) => {
  const seen = new Set()
  const unique = []

  for (const entry of entries) {
    const normalized = toSitemapEntry(entry, new Date().toISOString().slice(0, 10))
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
  const uniquePaths = uniqueEntries([...localizedPaths, ...blogRoutes])
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
