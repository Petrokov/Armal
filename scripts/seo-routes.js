export const BASE_ROUTES = [
  '/',
  '/o-nama',
  '/servis',
  '/katalozi',
  '/proizvodi',
  '/proizvodi/slavine',
  '/proizvodi/kupanje-tusiranje',
  '/proizvodi/sanitarije',
  '/blog',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
]

export const FAUCET_COLLECTION_SLUGS = [
  'rubi',
  'topaz',
  'violet',
  'start',
  'opal',
  'safir',
  'beril',
  'lapis',
  'ana',
  'jana',
]

export const BLOG_POST_IDS = ['1', '2', '3', '4', '5', '6']

export const LANGUAGE_PREFIXES = ['', '/slo', '/rs']

const normalizePath = (value) => {
  const next = `${value}`.replace(/\/{2,}/g, '/')
  return next === '' ? '/' : next
}

export const DYNAMIC_ROUTES = [
  ...FAUCET_COLLECTION_SLUGS.map((slug) => `/proizvodi/slavine/${slug}`),
  ...BLOG_POST_IDS.map((id) => `/blog/${id}`),
]

export const INDEXABLE_ROUTES = [
  ...BASE_ROUTES,
  ...DYNAMIC_ROUTES,
]

export const buildLocalizedRoutes = (routes = INDEXABLE_ROUTES) =>
  LANGUAGE_PREFIXES.flatMap((prefix) =>
    routes.map((route) => {
      if (prefix === '') return route
      if (route === '/') return prefix
      return normalizePath(`${prefix}${route}`)
    })
  )
