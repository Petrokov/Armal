import fs from 'fs'
import path from 'path'
import express from 'express'
import puppeteer from 'puppeteer'
import { buildLocalizedRoutes } from './seo-routes.js'

const DIST_DIR = path.resolve(process.cwd(), 'dist')
const PORT = Number(process.env.PRERENDER_PORT || 4173)
const HOST = '127.0.0.1'

const ROUTES = buildLocalizedRoutes()

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

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      page.setDefaultNavigationTimeout(45000)
      await page.evaluateOnNewDocument(() => {
        window.__ARMAL_PRERENDER__ = true
      })

      const url = `http://${HOST}:${PORT}${route}`
      await page.goto(url, { waitUntil: 'networkidle0' })
      await new Promise((resolve) => setTimeout(resolve, 200))
      const html = await page.content()

      const outputFile = routeToOutputFile(route)
      fs.mkdirSync(path.dirname(outputFile), { recursive: true })
      fs.writeFileSync(outputFile, html, 'utf8')
      console.log(`Prerendered: ${route} -> ${path.relative(DIST_DIR, outputFile)}`)
      await page.close()
    }
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
    console.log(`Prerender complete. Routes: ${ROUTES.length}`)
  })
  .catch((error) => {
    console.error('Prerender failed:', error)
    process.exit(1)
  })
