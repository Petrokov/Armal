import { useLanguage } from '../contexts/LanguageContext'
import { useEffect, useRef } from 'react'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import oNamaImage from '../assets/o_nama_kupaonica_2.png'
import ProductGallery from '../components/ProductGallery'

const ProizvodiKupanjeTusiranje = () => {
  const { t } = useLanguage()
  const productRefs = useRef([])

  // Podkategorije kupanje + tuširanje – za svaku kategoriju moguće je postaviti vlastiti link za B2B i Uredi dom
  const categories = [
    {
      key: 'showerCabins',
      image: '/kade_tuskade_kanalice/tus_kabine.webp',
      b2bLink: 'https://b2b.armal.hr/Store?grupa=0507',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'showerTrays',
      image: '/kade_tuskade_kanalice/tus_kade.webp',
      b2bLink: 'https://b2b.armal.hr/Store?grupa=0506&podgrupa1=050603',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'bathtubs',
      image: '/kade_tuskade_kanalice/kade.webp',
      b2bLink: 'https://b2b.armal.hr/Store?grupa=0506&podgrupa1=050601',
      editHomeLink: 'https://uredidom.hr/',
    },
    {
      key: 'showerChannels',
      image: '/kade_tuskade_kanalice/kanalice.webp',
      b2bLink: 'https://b2b.armal.hr/Store?grupa=0506&podgrupa1=050604',
      editHomeLink: 'https://uredidom.hr/',
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
      <section
        className="w-full h-[40vh] flex items-center text-white"
        style={{ backgroundImage: `url(${kupaonicaImage})`, backgroundPosition: 'center 72%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 text-left">
          <div className="max-w-3xl rounded-2xl border border-white/35 bg-white/15 p-5 backdrop-blur-md md:p-7">
            <h1 className="text-4xl font-bold md:text-5xl">{t('products.bathing')}</h1>
            <p className="mt-4 text-lg text-white/90">{t('products.bathingDescription')}</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
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
                  className={`group relative flex flex-col gap-8 p-6 md:flex-row md:gap-10 md:p-8 ${
                    imagePosition === 'right' ? 'md:flex-row-reverse' : ''
                  } opacity-0 translate-y-8 transition-all duration-700`}
                >
                  {/* Dekorativni “tag” u gornjem lijevom kutu kartice */}
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-1 rounded-b-full bg-gradient-to-r from-[#c9a227] via-[#e5e7eb] to-[#111827]" />

                  {/* Lijevo: galerija */}
                  <div className="flex-shrink-0 w-full md:w-1/2 lg:max-w-xl xl:max-w-2xl rounded-2xl p-2">
                    <ProductGallery
                      images={[category.image]}
                      alt={t(`bathingCategories.${category.key}.name`)}
                    />
                  </div>

                  <div className="flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">
                    {/* Desno: sadržaj */}
                    <div className="flex w-full flex-col justify-center gap-5 md:w-1/2">
                      <div className="space-y-2">
                        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          <span className="h-1.5 w-6 rounded-full bg-[#c9a227]" />
                          {t('products.bathing')}
                        </p>
                        <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
                          {t(`bathingCategories.${category.key}.name`)}
                        </h2>
                        <p className="text-sm text-slate-600 md:text-base">
                          {t(`bathingCategories.${category.key}.description`)}
                        </p>
                        {t(`bathingCategories.${category.key}.benefit`) && (
                          <p className="text-sm font-semibold text-[#0070CD] md:text-base">
                            {t(`bathingCategories.${category.key}.benefit`)}
                          </p>
                        )}
                      </div>

                      {/* CTA gumbi */}
                      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <a
                          href={category.b2bLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0070CD] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#005bb0]"
                        >
                          {t('navbar.b2b')}
                        </a>
                        <a
                          href={category.editHomeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-slate-900"
                        >
                          {t('navbar.editHome')}
                        </a>
                      </div>
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
            {t('bathingPage.ctaTitle')}
          </h2>
          <p className="mb-12 text-lg text-slate-600">
            {t('bathingPage.ctaDescription')}
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

export default ProizvodiKupanjeTusiranje

