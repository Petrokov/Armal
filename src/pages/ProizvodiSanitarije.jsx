import { useLanguage } from '../contexts/LanguageContext'
import { useEffect, useRef } from 'react'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import sanitarije1 from '../assets/sanitarije/sanitarije_1.webp'
import sanitarije2 from '../assets/sanitarije/wc_sjedalice.webp'
import sanitarije3 from '../assets/sanitarije/sanitarije_3.webp'
import daska from '../assets/sanitarije/daska.webp'
import bide from '../assets/sanitarije/bide.webp'
import monoblock from '../assets/sanitarije/monoblock.webp'

const ProizvodiSanitarije = () => {
  const { t } = useLanguage()
  const productRefs = useRef([])

  // Kategorije sanitarije
  const categories = [
    {
      key: 'washbasins',
      image: sanitarije1,
    },
    {
      key: 'toiletSeats',
      image: sanitarije2,
    },
    {
      key: 'toiletCisterns',
      image: sanitarije3,
    },
    {
      key: 'bidets',
      image: bide,
    },
    {
      key: 'monoblock',
      image: monoblock,
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
          alt="Sanitarije"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-slate-900/50"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            {t('products.sanitary')}
          </h1>
          <p className="text-lg text-white/90 md:text-xl lg:text-2xl">
            {t('products.sanitaryDescription')}
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="space-y-24 md:space-y-32">
            {categories.map((category, index) => {
              const isEven = index % 2 === 0
              const imagePosition = isEven ? 'left' : 'right'

              return (
                <div
                  key={category.key}
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
                          src={category.image}
                          alt={t(`sanitaryCategories.${category.key}.name`)}
                          className="h-full w-full rounded-lg object-cover shadow-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">
                    <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
                      {t(`sanitaryCategories.${category.key}.name`)}
                    </h2>
                    <p className="mb-4 text-base leading-relaxed text-slate-600 md:text-lg">
                      {t(`sanitaryCategories.${category.key}.description`)}
                    </p>
                    {t(`sanitaryCategories.${category.key}.benefit`) && (
                      <p className="mb-6 text-sm font-semibold text-[#0070CD] md:text-base">
                        {t(`sanitaryCategories.${category.key}.benefit`)}
                      </p>
                    )}
                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                      <a
                        href="https://b2b.armal.hr/"
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
                        href="https://uredidom.hr/"
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

      {/* CTA Section */}
      <section className="w-full bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
            {t('sanitaryPage.ctaTitle')}
          </h2>
          <p className="mb-12 text-lg text-slate-600">
            {t('sanitaryPage.ctaDescription')}
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

export default ProizvodiSanitarije
