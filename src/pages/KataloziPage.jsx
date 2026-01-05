import { useLanguage } from '../contexts/LanguageContext'

const KataloziPage = () => {
  const { t } = useLanguage()

  // Sample catalogue data
  const catalogues = [
    {
      id: 1,
      title: 'Katalog Walkin 2025',
      subtitle: 'Nove kolekcije Walkin tuš stijena',
      image: 'public\katalozi\placeholder_slika\walkin.png',
      fileSize: '15.2 MB',
      year: 2025,
      pdfUrl: '/katalozi/ARMAL_OPEN_WALK.pdf',
      createdAt: new Date('2024-12-15'), // Recent - within 30 days
    },
    {
      id: 2,
      title: 'Katalog Kupaonica 2023',
      subtitle: 'Kolekcija proizvoda za moderne kupaonice',
      image: 'https://via.placeholder.com/600x400/059669/FFFFFF?text=Katalog+2023',
      fileSize: '12.8 MB',
      year: 2023,
      pdfUrl: '#',
      createdAt: new Date('2023-11-20'),
    },
    {
      id: 3,
      title: 'Katalog Kupaonica 2022',
      subtitle: 'Klasični i moderni dizajni za svaki ukus',
      image: 'https://via.placeholder.com/600x400/DC2626/FFFFFF?text=Katalog+2022',
      fileSize: '11.5 MB',
      year: 2022,
      pdfUrl: '#',
      createdAt: new Date('2022-10-10'),
    },
    {
      id: 4,
      title: 'Katalog Kupaonica 2021',
      subtitle: 'Premium kolekcija kupaonskih rješenja',
      image: 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=Katalog+2021',
      fileSize: '10.3 MB',
      year: 2021,
      pdfUrl: '#',
      createdAt: new Date('2021-09-15'),
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

  // Get other catalogues (excluding the latest)
  const getOtherCatalogues = () => {
    const latest = getLatestCatalogue()
    return catalogues.filter((cat) => cat.id !== latest.id)
  }

  const featuredCatalogue = getLatestCatalogue()
  const otherCatalogues = getOtherCatalogues()
  const isFeaturedNew = isNew(featuredCatalogue.createdAt)

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
              <div className="relative h-64 w-full overflow-hidden md:h-auto">
                <img
                  src={featuredCatalogue.image}
                  alt={featuredCatalogue.title}
                  className="h-full w-full object-cover"
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
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={catalogue.image}
                      alt={catalogue.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
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


