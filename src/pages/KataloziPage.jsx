import { useLanguage } from '../contexts/LanguageContext'

const KataloziPage = () => {
  const { t } = useLanguage()

  // Catalogue data - all catalogues from katalozi folder
  const catalogues = [
    {
      id: 1,
      title: 'Katalog Walkin 2025',
      subtitle: 'Nove kolekcije Walkin tuš stijena',
      image: '/katalozi/placeholder_slika/Armal_walk_in_2.png',
      fileSize: '1 MB',
      year: 2025,
      pdfUrl: '/katalozi/ARMAL_OPEN_WALK.pdf',
      createdAt: new Date('2025-12-15'),
    },
    {
      id: 2,
      title: 'Katalog Kabine',
      subtitle: 'Kolekcija tuš kabina i vrata',
      image: '/katalozi/placeholder_slika/Armal_tus_kabine_mockup_33.png',
      fileSize: '2.5 MB',
      year: 2025,
      pdfUrl: '/katalozi/armal_katalog_kabine_2.pdf',
      createdAt: new Date('2025-11-15'),
    },
    {
      id: 3,
      title: 'Katalog Kade i Kanalice',
      subtitle: 'Premium kolekcija kada i tuš kanalica',
      image: '/katalozi/placeholder_slika/Armal_kade_mockup_33.png',
      fileSize: '3.2 MB',
      year: 2025,
      pdfUrl: '/katalozi/Armal_katalog_kade_kanalice.pdf',
      createdAt: new Date('2025-11-15'),
    },
    {
      id: 4,
      title: 'Katalog Slavine',
      subtitle: 'Kolekcija slavina za kupaonicu i kuhinju',
      image: '/katalozi/placeholder_slika/Armal_slavine_mockup_50.png',
      fileSize: '2.8 MB',
      year: 2025,
      pdfUrl: '/katalozi/Katalog_Armal_slavine.pdf',
      createdAt: new Date('2025-11-15'),
    },
    {
      id: 5,
      title: 'Katalog Sanitarije',
      subtitle: 'Kompletan asortiman sanitarije',
      image: '/katalozi/placeholder_slika/Armal_sanitarije_mockup.png',
      fileSize: '2.1 MB',
      year: 2025,
      pdfUrl: '/katalozi/KATALOG_SANITARIJE.pdf',
      createdAt: new Date('2025-11-15'),
    },
    {
      id: 6,
      title: 'Katalog Usponski Tuševi 2024',
      subtitle: 'Kolekcija usponskih tuševa',
      image: '/katalozi/placeholder_slika/Armal_tus_kade_mockup_33.png',
      fileSize: '1.9 MB',
      year: 2024,
      pdfUrl: '/katalozi/Katalog_usponski_tusevi_2024.pdf',
      createdAt: new Date('2025-11-15'),
    },
  ]

  // Check if a catalogue is "new" (created within 30 days)
  const isNew = (createdAt) => {
    const now = new Date()
    const daysDiff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24))
    return daysDiff <= 30
  }

  // Find the latest catalogue (most recent createdAt)
  const getLatestCatalogue = () => {
    return catalogues.reduce((latest, current) => {
      return current.createdAt > latest.createdAt ? current : latest
    })
  }

  // Get other catalogues (excluding the latest only if it's featured)
  const getOtherCatalogues = (excludeId) => {
    return catalogues.filter((cat) => cat.id !== excludeId)
  }

  const latestCatalogue = getLatestCatalogue()
  const isLatestNew = isNew(latestCatalogue.createdAt)
  
  // Only show as featured if it's new (within 30 days)
  const featuredCatalogue = isLatestNew ? latestCatalogue : null
  const otherCatalogues = featuredCatalogue 
    ? getOtherCatalogues(featuredCatalogue.id)
    : catalogues
  const isFeaturedNew = featuredCatalogue ? isNew(featuredCatalogue.createdAt) : false

  const handleDownload = (pdfUrl) => {
    // Handle PDF download
    window.open(pdfUrl, '_blank')
  }

  const handlePreview = (pdfUrl) => {
    // Handle PDF preview
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900 md:text-5xl">
              {t('catalogues.title')}
            </h1>
            <p className="mx-auto max-w-3xl text-base text-slate-600 md:text-lg">
              {t('catalogues.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Catalogue Section */}
      {featuredCatalogue && (
        <section className="w-full bg-slate-50 py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="mb-8 text-2xl font-semibold text-slate-900 md:text-3xl">
              {t('catalogues.featured')}
            </h2>

            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl">
              {/* New Badge */}
              {isFeaturedNew && (
                <div className="absolute right-4 top-4 z-10">
                  <span className="inline-flex items-center rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                    {t('catalogues.new')}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Image */}
                <div className="relative flex h-64 items-center justify-center overflow-hidden bg-slate-100 md:h-auto md:min-h-[400px]">
                  <img
                    src={featuredCatalogue.image}
                    alt={featuredCatalogue.title}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
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

                {/* Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleDownload(featuredCatalogue.pdfUrl)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <DownloadIcon />
                    {t('catalogues.downloadPDF')}
                  </button>
                  <button
                    onClick={() => handlePreview(featuredCatalogue.pdfUrl)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
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

      {/* More Catalogues Grid Section */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 text-2xl font-semibold text-slate-900 md:text-3xl">
            {t('catalogues.moreCatalogues')}
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {otherCatalogues.map((catalogue) => {
              const isCatalogueNew = isNew(catalogue.createdAt)
              return (
                <div
                  key={catalogue.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image */}
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

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
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

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleDownload(catalogue.pdfUrl)}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                      >
                        <DownloadIcon />
                        {t('catalogues.downloadPDF')}
                      </button>
                      <button
                        onClick={() => handlePreview(catalogue.pdfUrl)}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
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
        </div>
      </section>
    </div>
  )
}

// Icon Components
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


