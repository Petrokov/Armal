import { useLanguage } from '../contexts/LanguageContext'
import { useEffect, useRef } from 'react'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import oNamaImage from '../assets/o_nama_kupaonica_2.png'

const ProizvodiSlavine = () => {
  const { t } = useLanguage()
  const productRefs = useRef([])

  // 5 kolekcija slavina
  const collections = [
    {
      key: 'rubi',
      image: kupaonicaImage,
    },
    {
      key: 'onix',
      image: oNamaImage,
    },
    {
      key: 'topaz',
      image: kupaonicaImage,
    },
    {
      key: 'quartz',
      image: oNamaImage,
    },
    {
      key: 'marble',
      image: kupaonicaImage,
    },
  ]

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
                  {/* Image Container */}
                  <div className="flex-shrink-0 w-full md:w-1/2 group">
                    <div className="relative h-64 md:h-80 lg:h-96">
                      <div className="absolute inset-0 origin-center rotate-0 transform transition-all duration-300 group-hover:scale-110">
                        <img
                          src={collection.image}
                          alt={t(`collections.${collection.key}.name`)}
                          className="h-full w-full rounded-lg object-cover shadow-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">
                    <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                      {t(`collections.${collection.key}.name`)}
                    </h2>
                    <p className="mb-4 text-base leading-relaxed text-slate-600 md:text-lg">
                      {t(`collections.${collection.key}.description`)}
                    </p>
                    {t(`collections.${collection.key}.benefit`) && (
                      <p className="mb-6 text-sm font-semibold text-blue-600 md:text-base">
                        {t(`collections.${collection.key}.benefit`)}
                      </p>
                    )}
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                      <a
                        href="#b2b"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
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
                        href="#uredi-dom"
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
              href="#b2b"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-lg"
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
              href="#uredi-dom"
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

