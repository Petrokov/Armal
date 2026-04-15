import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { buildLocaleSeoUrls } from '../utils/languageRouting'

const PROD_HOSTS = new Set(['www.armal.hr', 'armal.hr'])

const upsertMetaByName = (name, content) => {
  if (!content) return
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const upsertMetaByProperty = (property, content) => {
  if (!content) return
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const upsertCanonical = (href) => {
  if (!href) return
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

const syncHreflangLinks = (hreflangs = []) => {
  const old = document.querySelectorAll('link[rel="alternate"][data-seo-hreflang="true"]')
  old.forEach((node) => node.remove())
  hreflangs.forEach((item) => {
    if (!item?.hrefLang || !item?.href) return
    const link = document.createElement('link')
    link.setAttribute('rel', 'alternate')
    link.setAttribute('hreflang', item.hrefLang)
    link.setAttribute('href', item.href)
    link.setAttribute('data-seo-hreflang', 'true')
    document.head.appendChild(link)
  })
}

const SEOHead = ({
  title,
  description,
  canonical,
  robots,
  ogTitle,
  ogDescription,
  ogUrl,
  ogType = 'website',
  hreflangs,
}) => {
  const location = useLocation()

  useEffect(() => {
    const baseUrl = (import.meta.env.VITE_PUBLIC_SITE_URL || 'https://www.armal.hr').replace(/\/$/, '')
    const localeUrls = buildLocaleSeoUrls(location.pathname, baseUrl)
    const canonicalUrl = canonical || localeUrls.canonical
    const hostname = (window.location.hostname || '').toLowerCase()
    const isPrerenderBuild = window.__ARMAL_PRERENDER__ === true
    const shouldIndex = isPrerenderBuild || PROD_HOSTS.has(hostname)
    const robotsValue = robots || (shouldIndex ? 'index,follow' : 'noindex,nofollow')
    const resolvedHreflangs = Array.isArray(hreflangs)
      ? hreflangs
      : [...localeUrls.alternates, localeUrls.xDefault]

    document.documentElement.lang = localeUrls.htmlLang
    if (title) document.title = title
    upsertMetaByName('description', description)
    upsertMetaByName('robots', robotsValue)
    upsertCanonical(canonicalUrl)

    upsertMetaByProperty('og:title', ogTitle || title)
    upsertMetaByProperty('og:description', ogDescription || description)
    upsertMetaByProperty('og:url', ogUrl || canonicalUrl)
    upsertMetaByProperty('og:type', ogType)
    upsertMetaByProperty('og:locale', localeUrls.ogLocale)
    upsertMetaByName('twitter:title', ogTitle || title)
    upsertMetaByName('twitter:description', ogDescription || description)
    upsertMetaByName('twitter:url', canonicalUrl)

    syncHreflangLinks(resolvedHreflangs)
  }, [title, description, canonical, robots, ogTitle, ogDescription, ogUrl, ogType, hreflangs, location.pathname])

  return null
}

export default SEOHead

