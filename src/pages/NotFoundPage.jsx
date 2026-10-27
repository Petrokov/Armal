import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import SEOHead from '../components/SEOHead'
import { buildLocalizedPath } from '../utils/languageRouting'
import { getSeoData, SEO_ROUTE_KEYS } from '../seo/seoConfig'

const COPY = {
  hr: { heading: 'Stranica nije pronađena', body: 'Tražena stranica ne postoji ili je premještena.', cta: 'Povratak na naslovnicu' },
  slo: { heading: 'Stran ni najdena', body: 'Iskana stran ne obstaja ali je bila premaknjena.', cta: 'Nazaj na začetno stran' },
  rs: { heading: 'Stranica nije pronađena', body: 'Tražena stranica ne postoji ili je premeštena.', cta: 'Povratak na početnu stranicu' },
  eng: { heading: 'Page not found', body: 'The page you are looking for does not exist or has been moved.', cta: 'Back to the homepage' },
}

const NotFoundPage = () => {
  const { language } = useLanguage()
  const seo = getSeoData(SEO_ROUTE_KEYS.NOT_FOUND, language)
  const copy = COPY[language] || COPY.hr

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <SEOHead title={seo.title} description={seo.description} robots="noindex,follow" />
      <div className="max-w-lg text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">404</p>
        <h1 className="mb-4 text-3xl font-bold text-slate-900">{copy.heading}</h1>
        <p className="mb-8 text-lg text-slate-700">{copy.body}</p>
        <Link
          to={buildLocalizedPath('/', language)}
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-slate-800"
        >
          {copy.cta}
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
