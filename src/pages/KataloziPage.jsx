import { useLanguage } from '../contexts/LanguageContext'
import { useEffect, useState } from 'react'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import { isSupabaseConfigured, supabasePublic } from '../lib/supabaseClient'
import { trackCatalogDownload } from '../utils/analytics'

const KataloziPage = () => {
  const { t, language } = useLanguage()
  const [supabaseCatalogues, setSupabaseCatalogues] = useState([])

  useEffect(() => {
    let active = true

    if (!isSupabaseConfigured) {
      return undefined
    }

    supabasePublic
      .getPublishedCatalogs(language)
      .then((items) => {
        if (active) setSupabaseCatalogues(Array.isArray(items) ? items : [])
      })
      .catch(() => {
        if (active) setSupabaseCatalogues([])
      })

    return () => {
      active = false
    }
  }, [language])

  const displayedCatalogues = supabaseCatalogues.map((catalogue) => ({
    id: catalogue.id,
    title: catalogue.title,
    subtitle: catalogue.subtitle,
    image: catalogue.cover_image_url || '/katalozi/placeholder_slika/Armal_slavine_mockup_50.png',
    fileSize: catalogue.file_size || '-',
    year: catalogue.year,
    pdfUrl: catalogue.pdf_url,
    createdAt: new Date(catalogue.published_at || catalogue.created_at),
  }))

  const isNew = (createdAt) => {
    const now = new Date()
    const daysDiff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24))
    return daysDiff <= 30
  }

  const latestCatalogue = displayedCatalogues.reduce((latest, current) => {
    if (!latest) return current
    return current.createdAt > latest.createdAt ? current : latest
  }, null)

  const featuredCatalogue = latestCatalogue && isNew(latestCatalogue.createdAt) ? latestCatalogue : null
  const otherCatalogues = featuredCatalogue
    ? displayedCatalogues.filter((catalogue) => catalogue.id !== featuredCatalogue.id)
    : displayedCatalogues
  const isFeaturedNew = featuredCatalogue ? isNew(featuredCatalogue.createdAt) : false

  const handleDownload = (pdfUrl, title) => {
    if (!pdfUrl) return
    trackCatalogDownload({ title, fileUrl: pdfUrl, action: 'download' })
    window.open(pdfUrl, '_blank')
  }

  const handlePreview = (pdfUrl, title) => {
    if (!pdfUrl) return
    trackCatalogDownload({ title, fileUrl: pdfUrl, action: 'preview' })
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section
        className="w-full h-[40vh] flex items-center text-white"
        style={{ backgroundImage: `url(${kupaonicaImage})`, backgroundPosition: 'center 72%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 text-left">
          <div className="max-w-3xl rounded-2xl border border-white/35 bg-white/15 p-5 backdrop-blur-md md:p-7">
            <h1 className="text-4xl font-bold md:text-5xl">{t('catalogues.title')}</h1>
            <p className="mt-4 text-lg text-white/90">{t('catalogues.subtitle')}</p>
          </div>
        </div>
      </section>

      {featuredCatalogue && (
        <section className="w-full bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-2xl font-semibold text-slate-900 md:text-3xl">
              {t('catalogues.featured')}
            </h2>

            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl">
              {isFeaturedNew && (
                <div className="absolute right-4 top-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    {t('catalogues.new')}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-100 md:h-auto md:min-h-[400px]">
                  <img
                    src={featuredCatalogue.image}
                    alt={featuredCatalogue.title}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col justify-center p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="rounded-full bg-[#0070CD]/20 px-3 py-1 text-sm font-semibold text-[#005bb0]">
                      {featuredCatalogue.year}
                    </span>
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-slate-900 md:text-3xl">
                    {featuredCatalogue.title}
                  </h3>

                  <p className="mb-6 text-base text-slate-600 md:text-lg">
                    {featuredCatalogue.subtitle}
                  </p>

                  <div className="mb-6 flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <FileSizeIcon />
                      {t('catalogues.fileSize')}: {featuredCatalogue.fileSize}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => handleDownload(featuredCatalogue.pdfUrl, featuredCatalogue.title)}
                      disabled={!featuredCatalogue.pdfUrl}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#005bb0] disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      <DownloadIcon />
                      {t('catalogues.downloadPDF')}
                    </button>
                    <button
                      onClick={() => handlePreview(featuredCatalogue.pdfUrl, featuredCatalogue.title)}
                      disabled={!featuredCatalogue.pdfUrl}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                    >
                      <PreviewIcon />
                      {t('catalogues.preview')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="w-full bg-slate-50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-2xl font-semibold text-slate-900 md:text-3xl">
            {t('catalogues.moreCatalogues')}
          </h2>

          {otherCatalogues.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {otherCatalogues.map((catalogue) => {
                const isCatalogueNew = isNew(catalogue.createdAt)
                return (
                  <div
                    key={catalogue.id}
                    className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-slate-100">
                      <img
                        src={catalogue.image}
                        alt={catalogue.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      {isCatalogueNew && (
                        <div className="absolute right-3 top-3">
                          <span className="inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-semibold text-white shadow-md">
                            {t('catalogues.new')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <span className="rounded-full bg-[#0070CD]/20 px-3 py-1 text-xs font-semibold text-[#005bb0]">
                          {catalogue.year}
                        </span>
                      </div>

                      <h3 className="mb-2 text-xl font-bold text-slate-900">
                        {catalogue.title}
                      </h3>

                      <p className="mb-4 text-sm text-slate-600">
                        {catalogue.subtitle}
                      </p>

                      <div className="mb-4 flex items-center gap-2 text-xs text-slate-500">
                        <FileSizeIcon />
                        {t('catalogues.fileSize')}: {catalogue.fileSize}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleDownload(catalogue.pdfUrl, catalogue.title)}
                          disabled={!catalogue.pdfUrl}
                          className="inline-flex items-center gap-2 rounded-lg bg-[#0070CD] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#005bb0] disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                          <DownloadIcon />
                          {t('catalogues.downloadPDF')}
                        </button>
                        <button
                          onClick={() => handlePreview(catalogue.pdfUrl, catalogue.title)}
                          disabled={!catalogue.pdfUrl}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                        >
                          <PreviewIcon />
                          {t('catalogues.preview')}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
              Trenutno nema objavljenih kataloga za odabrani jezik.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PreviewIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
)

const FileSizeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default KataloziPage
