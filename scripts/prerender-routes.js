import fs from 'fs'
import path from 'path'
import express from 'express'
import puppeteer from 'puppeteer'
import { buildLocalizedRoutes } from './seo-routes.js'
import { fetchPublishedBlogRoutes, loadLocalEnv } from './cms-routes.js'

const DIST_DIR = path.resolve(process.cwd(), 'dist')
const PORT = Number(process.env.PRERENDER_PORT || 4174)
const HOST = '127.0.0.1'

const NOT_FOUND_ROUTE = '/__not-found__'

const uniqueRoutes =(routes) => Array.from(new Set(routes))

const routeToOutputFile = (route) => {
  if (route === '/') return path.join(DIST_DIR, 'index.html')
  return path.join(DIST_DIR, route.slice(1), 'index.html')
}

const createServer = (baseHtml) => {
  const app = express()
  app.use(express.static(DIST_DIR, { index: false }))
  app.get('*', (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.send(baseHtml)
  })

  return new Promise((resolve) => {
    const server = app.listen(PORT, HOST, () => resolve(server))
  })
}

const prerender = async () => {
  loadLocalEnv()

  const cmsRoutes = await fetchPublishedBlogRoutes()
  const routes = uniqueRoutes([
    ...buildLocalizedRoutes(),
    ...cmsRoutes.map((route) => route.pathname),
  ])

  const templatePath = path.join(DIST_DIR, 'index.html')
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run vite build before prerender.')
  }
  const baseHtml = fs.readFileSync(templatePath, 'utf8')

  const server = await createServer(baseHtml)
  const browser = await puppeteer.launch({
    headless: 'shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  // Third-party tags (GTM, Meta pixel, GA) must not run during prerender: they inject
  // scripts bound to 127.0.0.1 into the DOM, which would be baked into the static HTML.
  const THIRD_PARTY_PATTERN = /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|facebook\.com\/tr|doubleclick\.net/i

  const renderRoute = async (page, route, outputFile) => {
    page.setDefaultNavigationTimeout(45000)
    await page.setRequestInterception(true)
    page.on('request', (request) => {
      if (THIRD_PARTY_PATTERN.test(request.url())) request.abort()
      else request.continue()
    })
    await page.evaluateOnNewDocument(() => {
      window.__ARMAL_PRERENDER__ = true
    })

    await page.goto(`http://${HOST}:${PORT}${route}`, { waitUntil: 'networkidle0' })
    await new Promise((resolve) => setTimeout(resolve, 200))
    // Drop script tags injected at runtime by the tag loaders (they re-inject on every real visit).
    let html = (await page.content()).replace(
      /<script\b[^>]*\bsrc="[^"]*"[^>]*>\s*<\/script>/gi,
      (tag) => (THIRD_PARTY_PATTERN.test(tag) ? '' : tag)
    )

    // The 404 shell is served for every unknown URL, so it must not claim a canonical or alternates.
    if (route === NOT_FOUND_ROUTE) {
      html = html
        .replace(/<link\b[^>]*rel="canonical"[^>]*>\s*/gi, '')
        .replace(/<link\b[^>]*rel="alternate"[^>]*hreflang[^>]*>\s*/gi, '')
        .replace(/<meta\b[^>]*(?:property="og:url"|name="twitter:url")[^>]*>\s*/gi, '')
    }

    fs.mkdirSync(path.dirname(outputFile), { recursive: true })
    fs.writeFileSync(outputFile, html, 'utf8')
    console.log(`Prerendered: ${route} -> ${path.relative(DIST_DIR, outputFile)}`)
    await page.close()
  }

  try {
    for (const route of routes) {
      const page = await browser.newPage()
      await renderRoute(page, route, routeToOutputFile(route))
    }

    const notFoundPage = await browser.newPage()
    await renderRoute(notFoundPage, NOT_FOUND_ROUTE, path.join(DIST_DIR, '404.html'))
  } finally {
    await browser.close()
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  }
}

prerender()
  .then(() => {
    console.log('Prerender complete.')
  })
  .catch((error) => {
    console.error('Prerender failed:', error)
    process.exit(1)
  })
