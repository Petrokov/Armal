import fs from 'fs'
import path from 'path'
import { buildLocalizedRoutes } from './seo-routes.js'

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

const buildSitemapXml = (baseUrl, paths) => {
  const today = new Date().toISOString().slice(0, 10)
  const urlNodes = paths
    .map((pathname) => {
      const absoluteUrl = `${baseUrl}${pathname}`
      return [
        '  <url>',
        `    <loc>${absoluteUrl}</loc>`,
        `    <lastmod>${today}</lastmod>`,
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

const run = () => {
  const baseUrl = resolveBaseUrl()
  const localizedPaths = buildLocalizedRoutes()
  const uniquePaths = Array.from(new Set(localizedPaths))
  const xml = buildSitemapXml(baseUrl, uniquePaths)

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_PATH, xml, 'utf8')
  console.log(`Sitemap generated: ${OUTPUT_PATH}`)
  console.log(`Base URL: ${baseUrl}`)
  console.log(`URLs included: ${uniquePaths.length}`)
}

run()
