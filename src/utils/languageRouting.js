const LANGUAGE_PREFIXES = ['slo', 'rs']
const DEFAULT_LANGUAGE = 'hr'
export const SEO_LANGUAGES = ['hr', 'slo', 'rs']
const SEO_LOCALE_BY_LANG = {
  hr: { hreflang: 'hr-HR', ogLocale: 'hr_HR', htmlLang: 'hr' },
  slo: { hreflang: 'sl-SI', ogLocale: 'sl_SI', htmlLang: 'sl' },
  rs: { hreflang: 'sr-RS', ogLocale: 'sr_RS', htmlLang: 'sr' },
}

export const isSupportedLanguage = (lang) =>
  lang === DEFAULT_LANGUAGE || LANGUAGE_PREFIXES.includes(lang)

export const getLanguageFromPathname = (pathname = '') => {
  const segments = String(pathname).split('/').filter(Boolean)
  const first = (segments[0] || '').toLowerCase()
  if (LANGUAGE_PREFIXES.includes(first)) return first
  return DEFAULT_LANGUAGE
}

export const stripLanguagePrefix = (pathname = '') => {
  const raw = String(pathname || '/')
  const [pathOnly, hashPart = ''] = raw.split('#')
  const [purePath, searchPart = ''] = pathOnly.split('?')
  const segments = purePath.split('/').filter(Boolean)
  const first = (segments[0] || '').toLowerCase()
  const normalizedSegments = LANGUAGE_PREFIXES.includes(first) ? segments.slice(1) : segments
  const normalizedPath = `/${normalizedSegments.join('/')}`.replace(/\/{2,}/g, '/')
  const pathWithSearch = searchPart ? `${normalizedPath}?${searchPart}` : normalizedPath
  return hashPart ? `${pathWithSearch}#${hashPart}` : pathWithSearch
}

export const buildLocalizedPath = (pathname = '/', lang = DEFAULT_LANGUAGE) => {
  const normalizedPath = stripLanguagePrefix(pathname)
  if (lang === DEFAULT_LANGUAGE) return normalizedPath
  return `/${lang}${normalizedPath === '/' ? '' : normalizedPath}`.replace(/\/{2,}/g, '/')
}

export const buildLocaleSeoUrls = (pathname = '/', baseUrl = 'https://www.armal.hr') => {
  const normalizedBase = String(baseUrl || 'https://www.armal.hr').replace(/\/$/, '')
  const lang = getLanguageFromPathname(pathname)
  const canonicalPath = buildLocalizedPath(pathname, lang)
  const alternates = SEO_LANGUAGES.map((code) => ({
    hrefLang: SEO_LOCALE_BY_LANG[code].hreflang,
    href: `${normalizedBase}${buildLocalizedPath(pathname, code)}`,
  }))
  const xDefaultHref = `${normalizedBase}${buildLocalizedPath(pathname, DEFAULT_LANGUAGE)}`

  return {
    language: lang,
    htmlLang: SEO_LOCALE_BY_LANG[lang].htmlLang,
    ogLocale: SEO_LOCALE_BY_LANG[lang].ogLocale,
    canonical: `${normalizedBase}${canonicalPath}`,
    alternates,
    xDefault: { hrefLang: 'x-default', href: xDefaultHref },
  }
}

