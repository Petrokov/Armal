import { buildLocaleSeoUrls, buildLocalizedPath, getLanguageFromPathname } from '../utils/languageRouting'

const DEFAULT_BASE_URL = 'https://www.armal.hr'

const LOCALE_BY_LANGUAGE = {
  hr: 'hr-HR',
  slo: 'sl-SI',
  rs: 'sr-RS',
}

export const getStructuredDataBaseUrl = () =>
  String(import.meta.env.VITE_PUBLIC_SITE_URL || DEFAULT_BASE_URL).replace(/\/$/, '')

export const toAbsoluteUrl = (urlOrPath, baseUrl = getStructuredDataBaseUrl()) => {
  if (!urlOrPath) return baseUrl
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath
  const normalizedPath = `${urlOrPath}`.startsWith('/') ? urlOrPath : `/${urlOrPath}`
  return `${baseUrl}${normalizedPath}`
}

export const getCanonicalForPath = (pathname = '/', baseUrl = getStructuredDataBaseUrl()) =>
  buildLocaleSeoUrls(pathname, baseUrl).canonical

export const buildOrganizationSchema = ({ pathname = '/' } = {}) => {
  const baseUrl = getStructuredDataBaseUrl()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Armal',
    url: getCanonicalForPath(pathname, baseUrl),
    sameAs: [
      'https://www.facebook.com/Armal.Hrvatska',
      'https://www.instagram.com/armal_hrvatska/',
      'https://hr.linkedin.com/company/armal-d-o-o',
    ],
    areaServed: ['HR', 'SI', 'RS', 'BA'],
  }
}

export const buildBreadcrumbListSchema = ({ pathname = '/', items = [] } = {}) => {
  const baseUrl = getStructuredDataBaseUrl()
  const language = getLanguageFromPathname(pathname)
  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${buildLocalizedPath(item.path, language)}`,
  }))

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }
}

export const buildArticleSchema = ({
  pathname = '/',
  language = 'hr',
  headline,
  description,
  image,
  datePublished,
  dateModified,
} = {}) => {
  const baseUrl = getStructuredDataBaseUrl()
  const canonical = getCanonicalForPath(pathname, baseUrl)

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: canonical,
    headline,
    description,
    image: toAbsoluteUrl(image, baseUrl),
    datePublished,
    dateModified: dateModified || datePublished,
    inLanguage: LOCALE_BY_LANGUAGE[language] || LOCALE_BY_LANGUAGE.hr,
    author: {
      '@type': 'Organization',
      name: 'Armal',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Armal',
    },
  }
}

export const buildFaqPageSchema = (faqs = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
})
