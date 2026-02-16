import { useLanguage } from '../contexts/LanguageContext'
import { useEffect, useRef, useState } from 'react'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import ProductGallery from '../components/ProductGallery'
// Glavna slika Rubi galerije (uvijek rubi-prostor.webp). Fallback ako glob ne nađe nijednu sliku.
import rubiProstor from '../assets/slavine/rubi-compresed/rubi-prostor.webp'

// Automatsko učitavanje svih slika iz src/assets/slavine/rubi-compresed (uključujući podfoldere).
// Održavanje: dodaj novu sliku u folder → automatski se pojavi u galeriji Rubi. Sortirano po putanji (natural order).
const rubiGlob = import.meta.glob('../assets/slavine/rubi-compresed/**/*.{webp,png,jpg,jpeg}', { eager: true })
const rubiGalleryImages = Object.entries(rubiGlob)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true }))
  .map(([, mod]) => mod.default)
// ProductGallery prikazuje images[0] kao glavnu – rubi-prostor mora biti prvi u nizu
const rubiImages =
  rubiGalleryImages.length > 0
    ? [rubiProstor, ...rubiGalleryImages.filter((src) => src !== rubiProstor)]
    : [rubiProstor]
const rubiMainImage = rubiProstor

const ProizvodiSlavine = () => {
  const { t } = useLanguage()
  const productRefs = useRef([])
  const [lightbox, setLightbox] = useState(null) // { images: string[], index: number } | null

  // Boje obrada za prikaz ispod naslova serije (key za prijevod, hex za swatch)
  const defaultFinishes = [
    { key: 'chrome', color: '#e5e7eb' },
    { key: 'black', color: '#1f2937' },
    { key: 'gunMetal', color: '#4b5563' },
    { key: 'brushGold', color: '#c9a227' },
    { key: 'brushedNickel', color: '#a8a9ad' },
    { key: 'bronze', color: '#cd7f32' },
  ]

  // Kolekcije slavina – image = glavna, images = niz za galeriju, finishes = obrade (opcionalno)
  const collections = [
    {
      key: 'rubi',
      image: rubiMainImage,
      images: rubiImages,
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
        { key: 'gunMetal', color: '#4b5563' },
        { key: 'brushGold', color: '#c9a227' },
        { key: 'brushedNickel', color: '#a8a9ad' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=RUBI',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'topaz',
      image: '/slavine/topaz.webp',
      images: ['/slavine/topaz.webp', '/slavine/topaz.webp', '/slavine/topaz.webp', '/slavine/topaz.webp'],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
        { key: 'gunMetal', color: '#4b5563' },
        { key: 'brushGold', color: '#c9a227' },
        { key: 'brushedNickel', color: '#a8a9ad' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=TOPAZ',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'opal',
      image: '/slavine/opal.webp',
      images: ['/slavine/opal.webp', '/slavine/opal.webp', '/slavine/opal.webp', '/slavine/opal.webp'],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
        { key: 'gunMetal', color: '#4b5563' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=OPAL',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'safir',
      image: '/slavine/safir.webp',
      images: ['/slavine/safir.webp', '/slavine/safir.webp', '/slavine/safir.webp', '/slavine/safir.webp'],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=SAFIR',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'beril',
      image: '/slavine/beril.webp',
      images: ['/slavine/beril.webp', '/slavine/beril.webp', '/slavine/beril.webp', '/slavine/beril.webp'],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
        { key: 'black', color: '#1f2937' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=BERIL',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'lapis',
      image: '/slavine/lapis.webp',
      images: ['/slavine/lapis.webp', '/slavine/lapis.webp', '/slavine/lapis.webp', '/slavine/lapis.webp'],
      finishes: [
        { key: 'black', color: '#1f2937' },
        { key: 'bronze', color: '#cd7f32' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=LAPIS',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'violet',
      image: '/slavine/violet3.webp',
      images: ['/slavine/violet3.webp', '/slavine/violet3.webp', '/slavine/violet3.webp', '/slavine/violet3.webp'],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=VIOLET',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'jana',
      image: '/slavine/jana3.webp',
      images: ['/slavine/jana3.webp', '/slavine/jana3.webp', '/slavine/jana3.webp', '/slavine/jana3.webp'],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=JANA',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'ana',
      image: '/slavine/ana3.webp',
      images: ['/slavine/ana3.webp', '/slavine/ana3.webp', '/slavine/ana3.webp', '/slavine/ana3.webp'],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=ANA',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'start',
      image: '/slavine/start3.webp',
      images: ['/slavine/start3.webp', '/slavine/start3.webp', '/slavine/start3.webp', '/slavine/start3.webp'],
      finishes: [
        { key: 'chrome', color: '#e5e7eb' },
      ],
      b2bLink: 'https://b2b.armal.hr/Store/Index?grupa=0504&brend=START',
      editHomeLink: 'https://uredidom.hr/',
    },
  ]

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') {
        setLightbox((l) => l && { ...l, index: (l.index - 1 + l.images.length) % l.images.length })
      }
      if (e.key === 'ArrowRight') {
        setLightbox((l) => l && { ...l, index: (l.index + 1) % l.images.length })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  // Fade-in animacija pri skrolanju
  useEffect(() => {
    const observers = productRefs.current.map((ref) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('opacity-100', 'translate-y-0')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] w-full items-center justify-center overflow-hidden">
        <img
          src={kupaonicaImage}
          alt="Slavine"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-slate-900/50"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            {t('products.faucets')}
          </h1>
          <p className="text-lg text-white/90 md:text-xl lg:text-2xl">
            {t('products.faucetsDescription')}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-24 md:space-y-32">
            {collections.map((collection, index) => {
              const isEven = index % 2 === 0
              const imagePosition = isEven ? 'left' : 'right'

              return (
                <div
                  key={collection.key}
                  ref={(el) => (productRefs.current[index] = el)}
                  className={`flex flex-col items-center gap-8 opacity-0 translate-y-8 transition-all duration-700 md:flex-row md:gap-12 ${
                    imagePosition === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Responsive galerija: padding da se vidi kompletna sjena kartice */}
                  <div className="flex-shrink-0 w-full md:w-1/2 lg:max-w-xl xl:max-w-2xl rounded-lg overflow-visible p-4">
                    <ProductGallery
                      images={collection.images ?? [collection.image]}
                      alt={t(`collections.${collection.key}.name`)}
                      onImageClick={(_, index) => setLightbox({ images: collection.images ?? [collection.image], index })}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">
                    <h2 className="mb-2 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                      {t(`collections.${collection.key}.name`)}
                    </h2>
                    {/* Boje obrada – prilagodivo po proizvodu (collection.finishes), inače defaultFinishes */}
                    <div className="mb-4 flex flex-wrap items-center justify-center gap-3 p-2 md:justify-start">
                      {(collection.finishes ?? defaultFinishes).map((finish) => (
                        <span
                          key={finish.key}
                          className="inline-block h-[24px] w-[24px] shrink-0 rounded-full border-[1px] border-black shadow-sm"
                          style={{
                            background: `
                              radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5) 0%, transparent 55%),
                              linear-gradient(160deg, rgba(255,255,255,0.25) 0%, transparent 40%, rgba(0,0,0,0.25) 100%),
                              ${finish.color}
                            `.replace(/\s+/g, ' ').trim(),
                          }}
                          title={t(`faucetsPage.finishes.${finish.key}`)}
                          aria-label={t(`faucetsPage.finishes.${finish.key}`)}
                        />
                      ))}
                    </div>
                    <p className="mb-4 text-base leading-relaxed text-slate-600 md:text-lg">
                      {t(`collections.${collection.key}.description`)}
                    </p>
                    {t(`collections.${collection.key}.benefit`) && (
                      <p className="mb-6 text-sm font-semibold text-[#0070CD] md:text-base">
                        {t(`collections.${collection.key}.benefit`)}
                      </p>
                    )}
                    {/* Action Buttons – svaki proizvod koristi vlastite linkove */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                      <a
                        href={collection.b2bLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#005bb0] hover:shadow-lg"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        {t('navbar.b2b')}
                      </a>
                      <a
                        href={collection.editHomeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-lg"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        {t('navbar.editHome')}
                      </a>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Lightbox – galerija proizvoda s listanjem slika */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Galerija slika"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Zatvori"
          >
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {lightbox.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.images.length) % lightbox.images.length })
                }}
                className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:left-4"
                aria-label="Prethodna slika"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.images.length })
                }}
                className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white md:right-4"
                aria-label="Sljedeća slika"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <img
            src={lightbox.images[lightbox.index]}
            alt="Povećana slika"
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.images.length > 1 && (
            <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
              {lightbox.index + 1} / {lightbox.images.length}
            </p>
          )}
        </div>
      )}

      {/* CTA Section */}
      <section className="w-full bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
            {t('faucetsPage.ctaTitle')}
          </h2>
          <p className="mb-12 text-lg text-slate-600">
            {t('faucetsPage.ctaDescription')}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://b2b.armal.hr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#005bb0] hover:shadow-lg"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {t('navbar.b2b')}
            </a>
            <a
              href="https://uredidom.hr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-slate-800 hover:shadow-lg"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {t('navbar.editHome')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProizvodiSlavine

