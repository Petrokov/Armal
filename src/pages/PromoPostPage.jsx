import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { buildLocalizedPath } from '../utils/languageRouting'
import SEOHead from '../components/SEOHead'
import JsonLd from '../components/JsonLd'
import { buildArticleSchema } from '../seo/structuredData'
import { B2B_URL, getPromotionContent, isPromotionExpired } from '../data/promotions'

const HERO_BACKGROUND =
  'radial-gradient(circle at 80% 25%, rgba(0,112,205,0.55) 0%, rgba(0,112,205,0) 45%), linear-gradient(135deg, #020617 0%, #0b1220 55%, #000000 100%)'

/** Stranica akcije (npr. /blog/black-friday). Podaci: src/data/promotions.js */
const PromoPostPage = ({ promo }) => {
  const location = useLocation()
  const { t, language } = useLanguage()
  const localizePath = (path) => buildLocalizedPath(path, language)
  const copy = getPromotionContent(promo, language)
  const [discountsOpen, setDiscountsOpen] = useState(false)
  const discountsRef = useRef(null)
  const isExpired = isPromotionExpired(promo)
  const orderHref = promo.orderEmail
    ? `mailto:${promo.orderEmail}?subject=${encodeURIComponent(promo.orderSubject || copy.title)}`
    : null

  useEffect(() => {
    if (discountsOpen) discountsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [discountsOpen])

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title={`${copy.postTitle} | Armal`} description={copy.subtitle} ogType="article" />
      <JsonLd
        id={`article-promo-${promo.slug}`}
        data={buildArticleSchema({
          pathname: location.pathname,
          language,
          headline: copy.postTitle,
          description: copy.subtitle,
          image: promo.banner?.desktop,
          datePublished: copy.postDate,
          dateModified: copy.postDate,
        })}
      />

      {promo.banner ? (
        <section className="w-full bg-black">
          <picture className="block">
            <source media="(min-width: 768px)" srcSet={promo.banner.desktop} />
            <img
              src={promo.banner.mobile}
              alt={copy.subtitle}
              className="mx-auto block h-auto w-full max-w-[1920px]"
              fetchPriority="high"
            />
          </picture>
        </section>
      ) : (
        <section className="relative flex min-h-[40vh] w-full items-center text-white" style={{ background: HERO_BACKGROUND }}>
          <div className="mx-auto w-full max-w-7xl px-6 py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">{copy.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight md:text-6xl lg:text-7xl">
              {copy.title}
            </h1>
            {copy.highlight && <p className="mt-3 text-4xl font-bold text-[#4BA8FF] md:text-5xl">{copy.highlight}</p>}
          </div>
        </section>
      )}

      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-6">
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-600">
            <Link to={localizePath('/')} className="transition-colors hover:text-[#0070CD]">
              {t('navbar.home')}
            </Link>
            <span>/</span>
            <Link to={localizePath('/blog')} className="transition-colors hover:text-[#0070CD]">
              {t('navbar.blog')}
            </Link>
            <span>/</span>
            <span className="text-slate-900">{copy.postTitle}</span>
          </nav>

          {promo.banner ? (
            <h1 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">{copy.postTitle}</h1>
          ) : (
            <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">{copy.postTitle}</h2>
          )}

          {isExpired && (
            <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {t('promoPage.expired')}
            </p>
          )}

          <article className="space-y-6 text-base leading-relaxed text-slate-700">
            <p className="text-lg text-slate-800">{copy.postIntro}</p>
            {copy.postBody && <div className="whitespace-pre-line">{copy.postBody}</div>}
          </article>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setDiscountsOpen((open) => !open)}
              aria-expanded={discountsOpen}
              aria-controls="promo-discounts"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-[#005bb0]"
            >
              {discountsOpen ? t('promoPage.hideDiscounts') : t('promoPage.viewDiscounts')}
            </button>
            <a
              href={B2B_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-slate-900"
            >
              {t('promoPage.b2b')}
              <ExternalIcon />
            </a>
            {promo.pdf && (
              <a
                href={promo.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-base font-semibold text-slate-800 transition hover:border-[#0070CD] hover:text-[#0070CD]"
              >
                <PdfIcon />
                {t('promoPage.downloadPdf')}
              </a>
            )}
          </div>

          <div id="promo-discounts" ref={discountsRef} hidden={!discountsOpen} className="mt-10 scroll-mt-28">
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl font-semibold text-slate-900">{t('promoPage.categoriesTitle')}</h3>
              {copy.highlight && <span className="text-3xl font-black text-[#0070CD]">{copy.highlight}</span>}
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {promo.categories.map((key) => (
                <li
                  key={key}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium text-slate-900"
                >
                  {copy.categoryLabels?.[key]}
                </li>
              ))}
            </ul>

            {copy.conditions?.length > 0 && (
              <div className="mt-8">
                <h4 className="mb-3 text-lg font-semibold text-slate-900">{t('promoPage.conditionsTitle')}</h4>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
                  {copy.conditions.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-slate-900 p-6 text-white sm:flex-row sm:items-center">
              <div>
                <p className="text-lg font-semibold">{t('promoPage.b2bTitle')}</p>
                <p className="text-sm text-white/75">{t('promoPage.b2bText')}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                {orderHref && (
                  <a
                    href={orderHref}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {t('promoPage.sendOrder')}
                  </a>
                )}
                <a
                  href={B2B_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  {t('promoPage.b2b')}
                  <ExternalIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PdfIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M12 11v6m0 0-2.5-2.5M12 17l2.5-2.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default PromoPostPage
