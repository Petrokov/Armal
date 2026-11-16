import { Link } from 'react-router-dom'
import { getPromotionContent } from '../data/promotions'
import { buildLocalizedPath } from '../utils/languageRouting'

const THEMES = {
  dark: {
    background:
      'radial-gradient(circle at 78% 30%, rgba(0,112,205,0.55) 0%, rgba(0,112,205,0) 45%), radial-gradient(circle at 15% 85%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%), linear-gradient(135deg, #020617 0%, #0b1220 55%, #000000 100%)',
    highlight: 'text-[#4BA8FF]',
    button: 'bg-white text-slate-900',
  },
  blue: {
    background: 'linear-gradient(135deg, #003d73 0%, #0070CD 100%)',
    highlight: 'text-white',
    button: 'bg-white text-[#0070CD]',
  },
}

/** Jedan promo slajd za HeroCarousel: `promo.banner` (gotova grafika) ili tekst na gradijentu iz `promo.theme`. */
const PromoSlide = ({ promo, language }) => {
  const copy = getPromotionContent(promo, language)
  const theme = THEMES[promo.theme] || THEMES.dark
  const to = buildLocalizedPath(`/blog/${promo.slug}`, language)

  // Gotova grafika: cijeli slajd je link, slika se prikazuje cijela (bez rezanja teksta).
  if (promo.banner) {
    return (
      <Link to={to} className="block h-full w-full bg-black" aria-label={`${copy.title} ${copy.highlight || ''} – ${copy.cta}`}>
        <picture className="block h-full w-full">
          <source media="(min-width: 768px)" srcSet={promo.banner.desktop} />
          <img
            src={promo.banner.mobile}
            alt={copy.subtitle}
            className="h-full w-full object-contain"
            draggable={false}
          />
        </picture>
      </Link>
    )
  }

  return (
    <div className="relative h-full w-full" style={promo.image ? undefined : { background: theme.background }}>
      {promo.image && (
        <>
          <img
            src={promo.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </>
      )}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-10 lg:px-12">
        <div className="max-w-3xl p-5 sm:p-7 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-sm">{copy.eyebrow}</p>
          <h2 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            {copy.title}
          </h2>
          {copy.highlight && (
            <p className={`mt-3 text-4xl font-bold sm:text-5xl md:text-6xl ${theme.highlight}`}>{copy.highlight}</p>
          )}
          {copy.subtitle && <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">{copy.subtitle}</p>}
          <Link
            to={to}
            className={`mt-8 inline-flex min-w-[200px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 ${theme.button}`}
          >
            {copy.cta}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PromoSlide
