import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const AUTOPLAY_MS = 7000
const SWIPE_THRESHOLD_PX = 50

/**
 * HeroCarousel – carousel na vrhu naslovnice.
 * `slides`: [{ id, content: ReactNode }]. Sadržaj slajdova slaže LandingPage (vidi src/data/promotions.js).
 * Autoplay se pauzira na hover/fokus i kad korisnik ima uključen "reduce motion".
 */
const HeroCarousel = ({ slides }) => {
  const { t } = useLanguage()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const touchStartX = useRef(null)
  const count = slides.length

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const goTo = useCallback((index) => setActive(((index % count) + count) % count), [count])

  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return undefined
    const timer = setTimeout(() => goTo(active + 1), AUTOPLAY_MS)
    return () => clearTimeout(timer)
  }, [active, count, paused, reducedMotion, goTo])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) goTo(active + (delta < 0 ? 1 : -1))
  }

  if (count === 0) return null

  return (
    <section
      className="relative h-[65vh] w-full overflow-hidden bg-slate-900 text-white"
      aria-roledescription="carousel"
      aria-label={t('promoCarousel.label')}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, index) => {
        const isActive = index === active
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${count}`}
            aria-hidden={!isActive}
            inert={!isActive}
            className={`absolute inset-0 flex items-center transition-opacity duration-700 ease-out ${
              isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
          >
            {slide.content}
          </div>
        )
      })}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            aria-label={t('promoCarousel.previous')}
            className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur transition hover:bg-black/45 md:flex"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            aria-label={t('promoCarousel.next')}
            className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur transition hover:bg-black/45 md:flex"
          >
            <Chevron direction="right" />
          </button>
          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`${t('promoCarousel.goTo')} ${index + 1}`}
                aria-current={index === active}
                className={`h-2.5 rounded-full transition-all ${
                  index === active ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

const Chevron = ({ direction }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default HeroCarousel
