import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const FeaturedCollections = () => {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Dummy podaci za kolekcije
  const collections = [
    {
      id: 1,
      image: 'https://via.placeholder.com/400x300/4A5568/FFFFFF?text=Amarilis',
      category: 'bathroom-furniture',
      name: 'Amarilis',
      description:
        'Reljefni oblici su nešto posebno: takav namještaj prostor puni dinamikom i elegancijom. Savršen spoj funkcionalnosti i estetike za vašu kupaonicu.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/400x300/2D3748/FFFFFF?text=SPINEL',
      category: 'kitchen-faucets',
      name: 'SPINEL MJEŠALICA',
      description:
        'Mješalica za sudoper sa izvlačnom glavom tuša. Moderni dizajn koji kombinira praktičnost i stil za vašu kuhinju.',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/400x300/1A202C/FFFFFF?text=Magnolija',
      category: 'bathroom-furniture',
      name: 'Magnolija',
      description:
        'Za osobnu oazu koja odiše luksuzom. Istančan dizajn, materijali neprikosnovene kvalitete i pažljivo osmišljeni detalji.',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/400x300/4A5568/FFFFFF?text=Kolekcija+4',
      category: 'bathroom-faucets',
      name: 'Elegance',
      description:
        'Moderna kolekcija slavina koja donosi sofisticiranu eleganciju u vašu kupaonicu. Kombinacija stila i funkcionalnosti.',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/400x300/2D3748/FFFFFF?text=Kolekcija+5',
      category: 'shower-components',
      name: 'Aqua Flow',
      description:
        'Napredni sustav tuša s prilagodljivim protokom vode. Uživajte u luksuznom iskustvu kupanja svaki dan.',
    },
    {
      id: 6,
      image: 'https://via.placeholder.com/400x300/1A202C/FFFFFF?text=Kolekcija+6',
      category: 'sanitary-ceramics',
      name: 'Pure Line',
      description:
        'Minimalistički dizajn sanitarnih proizvoda koji naglašava čistoću i jednostavnost. Savršeno za moderne prostore.',
    },
  ]

  // Prilagodi itemsPerPage na osnovu veličine ekrana
  // Na mobilnim: 1, na tabletima: 2, na desktopu: 3
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  // Resetiraj currentIndex kada se promijeni itemsPerPage
  useEffect(() => {
    setCurrentIndex(0)
  }, [itemsPerPage])

  const totalPages = Math.ceil(collections.length / itemsPerPage)

  // Funkcije za navigaciju
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const goToPage = (index) => {
    setCurrentIndex(index)
  }

  // Izračunaj koje kolekcije prikazati
  const getVisibleCollections = () => {
    const start = currentIndex * itemsPerPage
    return collections.slice(start, start + itemsPerPage)
  }

  const visibleCollections = getVisibleCollections()

  return (
    <section className="w-full bg-[f8f9fb] py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {t('collections.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-600 md:text-lg">
            {t('collections.subtitle')}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:shadow-xl sm:flex md:-translate-x-6"
            aria-label="Prethodna kolekcija"
          >
            <ChevronLeftIcon />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-4 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:shadow-xl sm:flex md:translate-x-6"
            aria-label="Sljedeća kolekcija"
          >
            <ChevronRightIcon />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleCollections.map((collection) => (
              <div
                key={collection.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-slate-200">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Category */}
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
                    {collection.category}
                  </p>

                  {/* Name */}
                  <h3 className="mb-3 text-xl font-bold text-slate-900">
                    {collection.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-600">
                    {collection.description}
                  </p>

                  {/* CTA Button */}
                  <button className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg">
                    {t('collections.exploreCollection')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-blue-600'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Idi na stranicu ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="#all-collections"
            className="inline-flex items-center gap-2 text-base font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            {t('collections.viewAll')}
            <ArrowRightIcon />
          </a>
        </div>
      </div>
    </section>
  )
}

// SVG Icons
const ChevronLeftIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-slate-700"
  >
    <path
      d="M15 18l-6-6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-slate-700"
  >
    <path
      d="M9 18l6-6-6-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ArrowRightIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default FeaturedCollections

