import { useMemo, useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const ASPECT_MAIN_MD = 'aspect-[4/3]' // prazan state
const ASPECT_THUMB = 'aspect-[4/3]'

/**
 * Responsive galerija proizvoda.
 * - Desktop (≥1024px): glavna slika + do 4 thumbnaila (scroll/strelicama ako više).
 * - Mobile (<768px): jedna slika, horizontalni swipe s scroll-snap.
 * @param {string[]} images - niz URL-ova slika (dinamičan, neograničen broj)
 * @param {string} alt - alt tekst za slike
 * @param {(src: string, index: number) => void} [onImageClick] - callback za otvaranje lightboxa (src, indeks u galeriji)
 * @param {number} [activeIndexExternal] - vanjska kontrola aktivne slike (npr. klik na \"Bidet\" badge)
 * @param {boolean} [isPriority] - oznaci samo LCP kandidata kao eager
 * @param {boolean} [shouldRenderFull] - odgodi tezi DOM dok kartica ne ude blizu viewporta
 */
const ProductGallery = ({
  images = [],
  alt = '',
  onImageClick,
  activeIndexExternal,
  isPriority = false,
  shouldRenderFull = true,
}) => {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef(null)
  const thumbStripRef = useRef(null)
  const didSyncExternalOnce = useRef(false) // spriječi inicijalno auto-scroll ponašanje pri mountu/refreshu

  const count = images.length
  const hasImages = count > 0
  const mainSrc = hasImages ? images[activeIndex] : null

  // Na mobilu usklađuj activeIndex s trenutnim scroll pozicijom (scroll-snap)
  useEffect(() => {
    const el = scrollRef.current
    if (!el || count <= 0) return

    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth)
      setActiveIndex(Math.min(index, count - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [count])

  // Vanjska promjena aktivne slike (npr. klik na kategoriju \"Bidet\")
  useEffect(() => {
    if (typeof activeIndexExternal !== 'number' || count <= 0) return
    const i = Math.max(0, Math.min(activeIndexExternal, count - 1))
    setActiveIndex(i)

    // Spriječi automatsko pomicanje pri početnom mountu / refreshu.
    // To je najčešći razlog za “skok” stranice prema dolje.
    if (!didSyncExternalOnce.current) {
      didSyncExternalOnce.current = true
      return
    }

    // Sinkroniziraj scroll na mobilu (unutar galerijskog scroller-a)
    const el = scrollRef.current
    if (el) el.scrollTo({ left: i * el.offsetWidth, behavior: 'smooth' })

    // Sinkroniziraj thumbnail traku na desktopu, ali bez `scrollIntoView`.
    // Time osiguravamo da se pomiče samo overflow-x kontejner, ne i cijela stranica.
    const thumbEl = thumbStripRef.current
    if (thumbEl && thumbEl.children && thumbEl.children[i] && count > 4) {
      const child = thumbEl.children[i]
      const childLeft = child.offsetLeft
      const childWidth = child.offsetWidth
      const centerOffset = (thumbEl.clientWidth - childWidth) / 2
      const targetLeft = childLeft - centerOffset

      // clamp unutar realnih granica scrolla
      const maxLeft = Math.max(0, thumbEl.scrollWidth - thumbEl.clientWidth)
      const clampedLeft = Math.max(0, Math.min(targetLeft, maxLeft))
      thumbEl.scrollTo({ left: clampedLeft, behavior: 'smooth' })
    }
  }, [activeIndexExternal, count])

  // Scroll thumbnail stripa strelicama (desktop, kad ima više od 4)
  const scrollThumbs = (direction) => {
    const el = thumbStripRef.current
    if (!el) return
    const step = el.offsetWidth * 0.6
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
  }

  // Na mobilu: skok na sliku po indeksu (za strelice)
  const scrollMobileTo = (index) => {
    const el = scrollRef.current
    if (!el || count <= 0) return
    const i = Math.max(0, Math.min(index, count - 1))
    el.scrollTo({ left: i * el.offsetWidth, behavior: 'smooth' })
  }

  const canScrollThumbs = count > 4
  const galleryLabel = `${alt} ${t('faucetsPage.gallery.regionSuffix')}`
  const thumbnailIndexes = useMemo(() => {
    if (!canScrollThumbs || count <= 12) {
      return Array.from({ length: count }, (_, i) => i)
    }
    const windowSize = 12
    const halfWindow = Math.floor(windowSize / 2)
    const start = Math.max(0, Math.min(activeIndex - halfWindow, count - windowSize))
    const end = Math.min(count, start + windowSize)
    return Array.from({ length: end - start }, (_, i) => start + i)
  }, [activeIndex, canScrollThumbs, count])

  if (!hasImages) {
    return (
      <div className={`w-full rounded-lg bg-slate-100 ${ASPECT_MAIN_MD}`} />
    )
  }

  // Minimalni prikaz za kartice koje jos nisu usle u viewport:
  // zadrzava isti vizualni okvir, ali izbjegava render kompletnog slide/thumb seta.
  if (!shouldRenderFull) {
    const previewSrc = images[0]
    return (
      <section
        className="w-full"
        role="region"
        aria-roledescription="carousel"
        aria-label={galleryLabel}
      >
        <div className="w-full overflow-hidden rounded-lg bg-slate-100 shadow-xl">
          <img
            src={previewSrc}
            alt={alt}
            className="w-full h-auto block object-contain object-center rounded-lg"
            loading="lazy"
            sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
            draggable={false}
          />
        </div>
      </section>
    )
  }

  return (
    <section
      className="w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label={galleryLabel}
    >
      {/* Mobile (< 768px): jedna slika po slideu, strelice lijevo/desno, scroll-snap */}
      <div className="relative md:hidden">
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex">
            {images.map((src, i) => (
              <div
                key={i}
                className="min-w-full w-full shrink-0 snap-center snap-always"
              >
                <button
                  type="button"
                  onClick={(e) => onImageClick?.(src, i, e.currentTarget)}
                  className="block w-full rounded-lg bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0070CD] focus:ring-offset-2"
                >
                  <img
                    src={src}
                    alt={`${alt} ${i + 1}`}
                    className="w-full h-auto block object-contain object-center rounded-lg"
                    loading={isPriority && i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                    sizes="100vw"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Strelice za navigaciju – samo ako ima više od jedne slike */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollMobileTo(activeIndex - 1)}
              disabled={activeIndex <= 0}
              aria-label={t('faucetsPage.gallery.previousImage')}
              className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white hover:text-[#0070CD] disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#0070CD]"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => scrollMobileTo(activeIndex + 1)}
              disabled={activeIndex >= count - 1}
              aria-label={t('faucetsPage.gallery.nextImage')}
              className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md transition hover:bg-white hover:text-[#0070CD] disabled:opacity-40 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#0070CD]"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Tablet (≥768px) i Desktop (≥1024px): glavna slika + thumbnaili – visina kontejnera = visina slike */}
      <div className="hidden md:block">
        <div className="w-full overflow-hidden rounded-lg bg-slate-100 shadow-xl">
          <button
            type="button"
            onClick={(e) => onImageClick?.(mainSrc, activeIndex, e.currentTarget)}
            className="block w-full focus:outline-none focus:ring-2 focus:ring-[#0070CD] focus:ring-offset-2 focus:ring-offset-slate-100 rounded-lg"
          >
            <img
              src={mainSrc}
              alt={alt}
              className="w-full h-auto block object-contain object-center"
              loading={isPriority ? 'eager' : 'lazy'}
              fetchPriority={isPriority ? 'high' : 'auto'}
              sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
            />
          </button>
        </div>

        {/* Thumbnaili – ispod: manje od 4 = svi vidljivi; više od 4 = horizontalni scroll + strelice */}
        {count > 1 && (
          <div className="mt-3 flex items-center gap-2">
            {canScrollThumbs && (
              <button
                type="button"
                onClick={() => scrollThumbs('left')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]"
                aria-label={t('faucetsPage.gallery.previousThumbnails')}
              >
                <ChevronLeft />
              </button>
            )}

            <div
              ref={thumbStripRef}
              className={`
                flex flex-1 gap-2 overflow-x-auto
                [scrollbar-width:none] [-ms-overflow-style:none]
                ${canScrollThumbs ? 'snap-x snap-mandatory' : ''}
              `}
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {thumbnailIndexes.map((i) => {
                const src = images[i]
                const isActive = i === activeIndex
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setActiveIndex(i)
                      onImageClick?.(src, i, null)
                    }}
                    className={`
                      relative shrink-0 overflow-hidden rounded-lg border-2 transition-all bg-slate-100
                      h-12 sm:h-14 md:h-16 lg:h-[4.5rem]
                      ${ASPECT_THUMB}
                      ${isActive
                        ? 'border-[#0070CD] shadow-lg ring-2 ring-[#0070CD]/30'
                        : 'border-slate-200 hover:border-slate-300'
                      }
                      focus:outline-none focus:ring-2 focus:ring-[#0070CD] focus:ring-offset-2
                      ${canScrollThumbs ? 'snap-center min-w-[3.5rem] sm:min-w-[4rem] md:min-w-[5rem] lg:min-w-[5.5rem]' : 'flex-1 min-w-0 max-w-[calc(25%-0.375rem)]'}
                    `}
                      aria-label={`${t('faucetsPage.gallery.imageLabel')} ${i + 1}`}
                    aria-pressed={isActive}
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-contain object-center"
                      loading="lazy"
                      draggable={false}
                    />
                  </button>
                )
              })}
            </div>

            {canScrollThumbs && (
              <button
                type="button"
                onClick={() => scrollThumbs('right')}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]"
                aria-label={t('faucetsPage.gallery.nextThumbnails')}
              >
                <ChevronRight />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function ChevronLeft() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default ProductGallery
