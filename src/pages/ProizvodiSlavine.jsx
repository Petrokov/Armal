import { useLanguage } from '../contexts/LanguageContext'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import ProductGallery from '../components/ProductGallery'
import SEOHead from '../components/SEOHead'
import JsonLd from '../components/JsonLd'
import { getSeoData, SEO_ROUTE_KEYS } from '../seo/seoConfig'
import { getProizvodiSlavineSeoLocale } from '../seo/proizvodiSlavineSeoLocale'
import { buildBreadcrumbListSchema, buildFaqPageSchema } from '../seo/structuredData'
import { buildLocalizedPath } from '../utils/languageRouting'
import {
  faucetsCollections,
  defaultFinishes,
  colorFilenameMapByCollection,
  categoryFilenameMapByCollection,
} from './proizvodiSlavine/faucetsData'
import { getWaterMixerLabel } from './proizvodiSlavine/faucetsHelpers'
import FaucetsFaqSection from './proizvodiSlavine/FaucetsFaqSection'
import FaucetsCtaSection from './proizvodiSlavine/FaucetsCtaSection'

const ProizvodiSlavine = () => {
  const { t, language } = useLanguage()
  const location = useLocation()
  const seo = getSeoData(SEO_ROUTE_KEYS.FAUCETS, language)
  const localizePath = (path) => buildLocalizedPath(path, language)
  const productRefs = useRef([])
  const lightboxDialogRef = useRef(null)
  const lightboxCloseButtonRef = useRef(null)
  const lightboxTriggerRef = useRef(null)
  const lightboxPreviouslyFocusedRef = useRef(null)
  const [lightbox, setLightbox] = useState(null) // { images: string[], index: number } | null
  const [activeImageIndexes, setActiveImageIndexes] = useState({}) // po kolekciji: { [key]: index }
  const [colorFilters, setColorFilters] = useState({}) // po kolekciji: { [key]: colorKey }
  const [categoryFilters, setCategoryFilters] = useState({}) // po kolekciji: { [key]: waterMixerKey }
  const [renderFullGalleryByCollection, setRenderFullGalleryByCollection] = useState(() => ({ rubi: true }))

  // Uvijek ostani na hero sekciji (vrh stranice) nakon mount-a, refresh-a ili vraćanja pozicije.
  // Sprječavamo bilo kakvo automatsko "scroll restoration" ponašanje i forsiramo `scroll` na 0.
  useEffect(() => {
    const prevRestoration = window.history.scrollRestoration
    try {
      window.history.scrollRestoration = 'manual'
    } catch {
      // ignore (neki browseri/edge slučajevi)
    }

    // Odmah + nakon slikanja layout-a (RAF) kako bismo pobijedili browser restore.
    window.scrollTo(0, 0)
    const rafId = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    return () => {
      window.cancelAnimationFrame(rafId)
      try {
        window.history.scrollRestoration = prevRestoration
      } catch {
        // ignore
      }
    }
  }, [])

  const collections = faucetsCollections
  const seoLocale = getProizvodiSlavineSeoLocale(language)

  useEffect(() => {
    if (!lightbox) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    lightboxPreviouslyFocusedRef.current = document.activeElement
    window.requestAnimationFrame(() => {
      lightboxCloseButtonRef.current?.focus()
    })

    return () => {
      document.body.style.overflow = previousOverflow
      const focusTarget = lightboxTriggerRef.current || lightboxPreviouslyFocusedRef.current
      if (focusTarget && typeof focusTarget.focus === 'function') {
        focusTarget.focus()
      }
    }
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

  // Performance: render kompletne gallery DOM blokove tek kad je kolekcija blizu viewporta.
  useEffect(() => {
    const observers = productRefs.current.map((ref) => {
      if (!ref) return null
      const key = ref.id
      if (!key) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const collectionKey = entry.target.id
            if (!collectionKey) return
            setRenderFullGalleryByCollection((prev) => (
              prev[collectionKey] ? prev : { ...prev, [collectionKey]: true }
            ))
            observer.unobserve(entry.target)
          })
        },
        { rootMargin: '600px 0px', threshold: 0.01 }
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
      <SEOHead
        title={seo.title}
        description={seo.description}
        ogType={seo.ogType}
      />
      <JsonLd
        id="breadcrumb-products-faucets"
        data={buildBreadcrumbListSchema({
          pathname: location.pathname,
          items: [
            { name: t('navbar.home'), path: '/' },
            { name: t('navbar.products'), path: '/proizvodi' },
            { name: t('products.faucets'), path: '/proizvodi/slavine' },
          ],
        })}
      />
      {Array.isArray(seoLocale.faqs) && seoLocale.faqs.length > 0 && (
        <JsonLd
          id="faq-products-faucets"
          data={buildFaqPageSchema(seoLocale.faqs)}
        />
      )}
      {/* Hero Section */}
      <section
        className="w-full h-[40vh] flex items-center text-white"
        style={{ backgroundImage: `url(${kupaonicaImage})`, backgroundPosition: 'center 72%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 text-left">
          <div className="max-w-3xl rounded-2xl border border-white/35 bg-white/15 p-5 backdrop-blur-md md:p-7">
            <h1 className="text-4xl font-bold md:text-5xl">{t('products.faucets')}</h1>
            <p className="mt-4 text-lg text-white/90">{t('products.faucetsDescription')}</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full bg-white py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-4 flex flex-col items-center justify-center md:mb-6">
            <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-xs">
              {seoLocale.anchorTitle}
            </p>
            <p className="mb-3 max-w-3xl text-center text-sm text-slate-600 md:text-base">
              {seoLocale.introText}
            </p>
            <div className="flex w-full flex-wrap justify-center gap-2">
              {collections.map((collection) => (
                <a
                  key={`anchor-${collection.key}`}
                  href={`#${collection.key}`}
                  className="inline-flex items-center rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-[#0070CD] hover:text-[#0070CD]"
                >
                  {t(`collections.${collection.key}.name`)}
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-16 md:space-y-24">
            {collections.map((collection, index) => {
              const isEven = index % 2 === 0
              const imagePosition = isEven ? 'left' : 'right'

              const baseImages = collection.images ?? [collection.image]
              const colorFilenameMap = colorFilenameMapByCollection[collection.key]
              const colorFilter = colorFilters[collection.key] ?? ''

              // 1) Filtriranje po boji (ako kolekcija ima mapu boja)
              const colorFilteredImages =
                colorFilenameMap && colorFilter
                  ? (() => {
                      const filenames = colorFilenameMap[colorFilter] ?? []
                      if (!filenames.length) return baseImages
                      const filtered = baseImages.filter((src) =>
                        filenames.some((fn) => typeof src === 'string' && src.includes(fn))
                      )
                      return filtered.length ? filtered : baseImages
                    })()
                  : baseImages

              // 2) Kategorije (bidet/kada/tuš...) - klik sužava images array za odabranu kategoriju.
              const selectedCategoryKey = categoryFilters[collection.key] ?? ''
              const filenameMap =
                categoryFilenameMapByCollection[collection.key] || categoryFilenameMapByCollection.rubi
              let targetFilename = selectedCategoryKey ? filenameMap?.[selectedCategoryKey] : null

              // Lapis ima specifične varijante koje zavise o odabranom colorFilteru.
              if (collection.key === 'lapis' && selectedCategoryKey) {
                if (selectedCategoryKey === 'builtInShower') {
                  targetFilename =
                    !colorFilter || colorFilter === 'bronze'
                      ? 'ugradbeni-tus-bronca.webp'
                      : 'ugradbeni-tus-crna.webp'
                }
                if (selectedCategoryKey === 'builtInMixer') {
                  targetFilename =
                    !colorFilter || colorFilter === 'bronze'
                      ? 'mješalica-bronca.webp'
                      : 'mješalica-crna.webp'
                }
              }

              const imagesForGallery = targetFilename
                ? (() => {
                    const needsDecode =
                      collection.key === 'lapis' || collection.key === 'start' || collection.key === 'ana'

                    // `categoryFilenameMapByCollection` često drži "referentnu" datoteku (npr. `bide-1.webp`)
                    // pa `src.includes(targetFilename)` suzuje previše (dobiješ samo jednu sliku).
                    // Zato iz `targetFilename` izvučemo stabilni prefix (npr. `bide-`) i filtriramo sve varijante.
                    const categoryMatchToken = (() => {
                      if (typeof targetFilename !== 'string') return targetFilename
                      if (targetFilename.includes('/')) return targetFilename

                      const noExt = targetFilename.replace(/\.(webp|png|jpg|jpeg)$/i, '')
                      // Ukloni završni broj ako postoji (npr. `bide-1` -> `bide-`)
                      const withoutIndex = noExt.replace(/\d+$/i, '')
                      // Ukloni završni finish/color suffix kad je referentna datoteka previše specifična
                      // (npr. `tus-slavina-crna` -> `tus-slavina-`, `visoka-krom` -> `visoka-`)
                      const withoutFinish = withoutIndex.replace(
                        /-(crna|black|krom|chrome|gunmetal|gun-metal|zlatna|gold|brushgold|bronca|bronze|brushednickel|nikl)$/i,
                        '-'
                      )
                      return withoutFinish || withoutIndex || noExt
                    })()

                    const filtered = colorFilteredImages.filter((src) => {
                      if (typeof src !== 'string') return false
                      if (!needsDecode) return src.includes(categoryMatchToken)
                      try {
                        return decodeURIComponent(src).includes(categoryMatchToken)
                      } catch {
                        return src.includes(categoryMatchToken)
                      }
                    })

                    return filtered.length ? filtered : colorFilteredImages
                  })()
                : colorFilteredImages

              if (
                collection.key === 'rubi' ||
                collection.key === 'safir' ||
                collection.key === 'beril' ||
                collection.key === 'lapis' ||
                collection.key === 'violet' ||
                collection.key === 'jana' ||
                collection.key === 'ana' ||
                collection.key === 'start' ||
                collection.key === 'topaz' ||
                collection.key === 'opal'
              ) {
                // Rubi / Safir / Beril / Lapis / Violet / Topaz / Opal kartice – čišći, mirniji dizajn bez obruba i "lift" hover efekata
                return (
                  <div
                    key={collection.key}
                    id={collection.key}
                    ref={(el) => (productRefs.current[index] = el)}
                    className={`group relative flex flex-col gap-8 p-6 md:flex-row md:gap-10 md:p-8 ${
                      imagePosition === 'right' ? 'md:flex-row-reverse' : ''
                    } opacity-0 translate-y-8`}
                  >
                    {/* Dekorativni “tag” u gornjem lijevom kutu kartice */}
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#c9a227] via-[#e5e7eb] to-[#111827]" />

                    {/* Lijevo: galerija */}
                    <div className="flex-shrink-0 w-full md:w-1/2 lg:max-w-xl xl:max-w-2xl rounded-2xl p-2">
                      <ProductGallery
                        images={imagesForGallery}
                        alt={t(`collections.${collection.key}.name`)}
                        isPriority={index === 0}
                        shouldRenderFull={Boolean(renderFullGalleryByCollection[collection.key])}
                        activeIndexExternal={
                          typeof activeImageIndexes[collection.key] === 'number'
                            ? activeImageIndexes[collection.key]
                            : 0
                        }
                        onImageClick={(_, idx, triggerEl) => {
                          const images = imagesForGallery
                          lightboxTriggerRef.current = triggerEl
                          setActiveImageIndexes((prev) => ({
                            ...prev,
                            [collection.key]: idx,
                          }))
                          setLightbox({ images, index: idx })
                        }}
                      />
                    </div>

                    {/* Desno: sadržaj */}
                    <div className="flex w-full flex-col justify-center gap-5 md:w-1/2">
                      {/* Naslov + kratki opis */}
                      <div className="space-y-2">
                        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          <span className="h-1.5 w-6 rounded-full bg-[#c9a227]" />
                          {t('products.faucets')}
                        </p>
                        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                          {t(`collections.${collection.key}.name`)}
                        </h2>
                        <p className="text-sm text-slate-600 md:text-base">
                          {t(`collections.${collection.key}.description`)}
                        </p>
                        {t(`collections.${collection.key}.benefit`) && (
                          <p className="text-sm font-semibold text-[#0070CD] md:text-base">
                            {t(`collections.${collection.key}.benefit`)}
                          </p>
                        )}
                        <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                          {seoLocale.collectionSeoCopy[collection.key]}
                        </p>
                      </div>

                      {/* Boje – krugovi + dropdown */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          {(collection.finishes ?? defaultFinishes).map((finish) => (
                            <span
                              key={finish.key}
                              className="inline-block h-6 w-6 shrink-0 rounded-full border border-slate-300 shadow-sm"
                              style={{
                                background: `
                                  radial-gradient(circle at 35% 35%, rgba(255,255,255,0.6) 0%, transparent 55%),
                                  linear-gradient(150deg, rgba(255,255,255,0.25) 0%, transparent 40%, rgba(0,0,0,0.25) 100%),
                                  ${finish.color}
                                `.replace(/\s+/g, ' ').trim(),
                              }}
                              title={t(`faucetsPage.finishes.${finish.key}`)}
                              aria-label={t(`faucetsPage.finishes.${finish.key}`)}
                            />
                          ))}
                        </div>

                        {collection.key !== 'jana' && collection.key !== 'ana' && collection.key !== 'start' && (
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                              {t('faucetsPage.colorLabel') ?? 'BOJA'}
                            </label>
                            <div className="flex w-full max-w-xs items-center gap-2">
                              <div className="relative inline-flex flex-1">
                                <select
                                  className="w-full appearance-none rounded-full border border-slate-300 bg-white px-4 pr-10 py-2.5 text-xs font-medium text-slate-900 shadow-sm transition-colors focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/60"
                                  value={colorFilters[collection.key] ?? ''}
                                  onChange={(e) => {
                                    const next = e.target.value
                                    setColorFilters((prev) => ({ ...prev, [collection.key]: next }))
                                    setActiveImageIndexes((prev) => ({ ...prev, [collection.key]: 0 }))
                                  }}
                                >
                                  <option value="">{t('faucetsPage.colorAll') ?? 'Svi proizvodi'}</option>
                                  {(collection.key === 'safir' || collection.key === 'beril'
                                    ? ['chrome', 'black']
                                    : collection.key === 'violet'
                                    ? ['chrome']
                                    : collection.key === 'lapis'
                                    ? ['black', 'bronze']
                                    : collection.key === 'opal'
                                    ? ['chrome', 'black', 'gunMetal']
                                    : collection.key === 'topaz'
                                    ? ['chrome', 'black', 'gunMetal', 'brushGold']
                                    : ['chrome', 'black', 'gunMetal', 'brushGold', 'brushedNickel']
                                  ).map((finishKey) => (
                                    <option key={finishKey} value={finishKey}>
                                      {t(`faucetsPage.finishes.${finishKey}`)}
                                    </option>
                                  ))}
                                </select>
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                                  <svg
                                    className="h-3 w-3"
                                    viewBox="0 0 12 8"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M1 1.5L6 6.5L11 1.5"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setColorFilters((prev) => ({ ...prev, [collection.key]: '' }))
                                  // Reset cijelog galerijskog stanja za tu kolekciju:
                                  // korisnik očekuje da se vrati na "početno" (bez odabrane kategorije).
                                  setCategoryFilters((prev) => ({ ...prev, [collection.key]: '' }))
                                  setActiveImageIndexes((prev) => ({ ...prev, [collection.key]: 0 }))
                                }}
                                className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-[#0070CD] hover:text-[#0070CD]"
                              >
                                {t('faucetsPage.ui.reset')}
                              </button>
                            </div>
                          </div>
                        )}

                        {['jana', 'ana', 'start'].includes(collection.key) && (
                          <button
                            type="button"
                            onClick={() => {
                              setCategoryFilters((prev) => ({ ...prev, [collection.key]: '' }))
                              setActiveImageIndexes((prev) => ({ ...prev, [collection.key]: 0 }))
                            }}
                            className="inline-flex w-fit items-center rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-[#0070CD] hover:text-[#0070CD]"
                          >
                            {t('faucetsPage.ui.reset')}
                          </button>
                        )}
                      </div>

                      {/* Kategorije (bidet, kada, tuš...) */}
                      {(
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {t('faucetsPage.sections.waterMixersTitle')}
                          </p>
                            <div className="flex flex-wrap gap-2">
                            {(collection.key === 'violet'
                              ? ['bidet', 'bathtub', 'builtInMixer', 'showerSet']
                              : collection.key === 'topaz'
                                ? ['bidet', 'bathtub', 'showerSet', 'builtInShower'] // Topaz: bez builtInMixer
                                : collection.key === 'jana'
                                  ? ['bidet', 'bathtub', 'builtInMixer', 'builtInShower', 'showerSet']
                                  : collection.key === 'ana'
                                    ? ['bathtub', 'builtInMixer', 'showerSet']
                                    : collection.key === 'start'
                                      ? ['bidet', 'bathtub', 'builtInMixer', 'showerSet']
                                  : ['bidet', 'bathtub', 'builtInMixer', 'showerSet', 'builtInShower']
                            ).map((key) => (
                              <button
                                key={key}
                                type="button"
                                onClick={() => {
                                  // Kategorija sužava images array za taj galerijski set.
                                  setCategoryFilters((prev) => ({ ...prev, [collection.key]: key }))
                                  setActiveImageIndexes((prev) => ({ ...prev, [collection.key]: 0 }))
                                }}
                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-[#0070CD] hover:bg-slate-50 hover:text-[#0070CD]"
                              >
                                {getWaterMixerLabel(t, collection.key, key)}
                              </button>
                            ))}
                            </div>
                        </div>
                      )}

                      {/* CTA gumbi */}
                      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <a
                          href={collection.b2bLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#005bb0]"
                        >
                          {t('navbar.b2b')}
                        </a>
                        <a
                          href={collection.editHomeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-900"
                        >
                          {t('navbar.editHome')}
                        </a>
                      </div>
                    </div>
                  </div>
                )
              }

              // Ostale kolekcije – postojeći dizajn
              return (
                <div
                  key={collection.key}
                  id={collection.key}
                  ref={(el) => (productRefs.current[index] = el)}
                  className={`flex flex-col items-center gap-8 opacity-0 translate-y-8 transition-all duration-700 md:flex-row md:gap-12 ${
                    imagePosition === 'right' ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Responsive galerija: padding da se vidi kompletna sjena kartice */}
                  <div className="flex-shrink-0 w-full md:w-1/2 lg:max-w-xl xl:max-w-2xl rounded-lg overflow-visible p-4">
                    <ProductGallery
                      images={imagesForGallery}
                      alt={t(`collections.${collection.key}.name`)}
                      isPriority={index === 0}
                      shouldRenderFull={Boolean(renderFullGalleryByCollection[collection.key])}
                      activeIndexExternal={
                        typeof activeImageIndexes[collection.key] === 'number'
                          ? activeImageIndexes[collection.key]
                          : 0
                      }
                      onImageClick={(_, index, triggerEl) => {
                        const images = imagesForGallery
                        lightboxTriggerRef.current = triggerEl
                        setActiveImageIndexes((prev) => ({
                          ...prev,
                          [collection.key]: index,
                        }))
                        setLightbox({ images, index })
                      }}
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">
                    <h2 className="mb-2 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                      {t(`collections.${collection.key}.name`)}
                    </h2>
                    <p className="mb-2 text-sm text-slate-600 md:text-base">
                      {t(`collections.${collection.key}.description`)}
                    </p>
                    <p className="mb-4 text-sm leading-relaxed text-slate-600 md:text-base">
                      {seoLocale.collectionSeoCopy[collection.key]}
                    </p>
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
                    {/* Dropdown za filtriranje boje – za kolekcije koje imaju mapu boja (npr. Rubi, Topaz, Opal) */}
                    {colorFilenameMap && (
                      <div className="mb-4 space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {t('faucetsPage.colorLabel') ?? 'Boja proizvoda'}
                        </label>
                        <div className="flex w-full max-w-xs items-center gap-2">
                          <div className="relative inline-flex flex-1">
                            <select
                              className="w-full appearance-none rounded-full border border-slate-300 bg-white px-4 pr-10 py-2.5 text-xs font-medium text-slate-900 shadow-sm transition-colors focus:border-[#0070CD] focus:outline-none focus:ring-2 focus:ring-[#0070CD]/60"
                              value={colorFilter}
                              onChange={(e) => {
                                const next = e.target.value
                                setColorFilters((prev) => ({
                                  ...prev,
                                  [collection.key]: next,
                                }))
                                setActiveImageIndexes((prev) => ({
                                  ...prev,
                                  [collection.key]: 0,
                                }))
                              }}
                            >
                              <option value="">
                                {t('faucetsPage.colorAll') ?? 'Svi proizvodi'}
                              </option>
                              {(collection.key === 'topaz'
                                ? ['chrome', 'black', 'gunMetal', 'brushGold'] // Topaz: bez Nikla
                                : collection.key === 'opal'
                                ? ['chrome', 'black', 'gunMetal'] // Opal: krom, crna, gun metal
                                : ['chrome', 'black', 'gunMetal', 'brushGold', 'brushedNickel']
                              ).map((finishKey) => (
                                <option key={finishKey} value={finishKey}>
                                  {t(`faucetsPage.finishes.${finishKey}`)}
                                </option>
                              ))}
                            </select>
                            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
                              <svg
                                className="h-3 w-3"
                                viewBox="0 0 12 8"
                                aria-hidden="true"
                              >
                                <path
                                  d="M1 1.5L6 6.5L11 1.5"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setColorFilters((prev) => ({ ...prev, [collection.key]: '' }))
                              // Reset cijelog galerijskog stanja za tu kolekciju:
                              // korisnik očekuje da se vrati na "početno" (bez odabrane kategorije).
                              setCategoryFilters((prev) => ({ ...prev, [collection.key]: '' }))
                              setActiveImageIndexes((prev) => ({ ...prev, [collection.key]: 0 }))
                            }}
                            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:border-[#0070CD] hover:text-[#0070CD]"
                          >
                            {t('faucetsPage.ui.reset')}
                          </button>
                        </div>
                      </div>
                    )}
                    {/* Sekcije pregleda miješalica (bidet, kada, tuš...) – za Rubi, Topaz i Opal */}
                    {['topaz', 'opal'].includes(collection.key) && (
                      <div className="mb-4 space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          {t('faucetsPage.sections.waterMixersTitle')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                          {(collection.key === 'topaz'
                            ? ['bidet', 'bathtub', 'showerSet', 'builtInShower'] // Topaz
                            : ['bidet', 'bathtub', 'builtInMixer', 'builtInShower', 'showerSet'] // Opal
                          ).map((key) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => {
                                  setCategoryFilters((prev) => ({
                                    ...prev,
                                    [collection.key]: key,
                                  }))
                                  setActiveImageIndexes((prev) => ({
                                    ...prev,
                                    [collection.key]: 0,
                                  }))
                              }}
                              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-[#0070CD] hover:text-[#0070CD]"
                            >
                              {t(`faucetsPage.sections.waterMixers.${key}`)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
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
          aria-label={t('faucetsPage.lightbox.dialogLabel')}
          ref={lightboxDialogRef}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (!lightbox) return
            if (e.key === 'Escape') {
              e.preventDefault()
              setLightbox(null)
              return
            }
            if (e.key === 'ArrowLeft' && lightbox.images.length > 1) {
              e.preventDefault()
              setLightbox((l) => l && { ...l, index: (l.index - 1 + l.images.length) % l.images.length })
              return
            }
            if (e.key === 'ArrowRight' && lightbox.images.length > 1) {
              e.preventDefault()
              setLightbox((l) => l && { ...l, index: (l.index + 1) % l.images.length })
              return
            }
            if (e.key === 'Tab') {
              const dialog = lightboxDialogRef.current
              if (!dialog) return
              const focusable = dialog.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
              )
              if (!focusable.length) return
              const first = focusable[0]
              const last = focusable[focusable.length - 1]
              if (e.shiftKey && document.activeElement === first) {
                e.preventDefault()
                last.focus()
              } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault()
                first.focus()
              }
            }
          }}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={t('faucetsPage.lightbox.closeButton')}
            ref={lightboxCloseButtonRef}
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
                aria-label={t('faucetsPage.lightbox.previousImage')}
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
                aria-label={t('faucetsPage.lightbox.nextImage')}
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <img
            src={lightbox.images[lightbox.index]}
            alt={t('faucetsPage.lightbox.enlargedImageAlt')}
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

      <FaucetsFaqSection seoLocale={seoLocale} localizePath={localizePath} />
      <FaucetsCtaSection t={t} />
    </div>
  )
}

export default ProizvodiSlavine
