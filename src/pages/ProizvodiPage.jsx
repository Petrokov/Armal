import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import kupaonicaImage from '../assets/kupaonica-zelena.webp'
import oNamaImage from '../assets/o_nama_kupaonica_2.png'

const ProizvodiPage = () => {
  const { t } = useLanguage()

  const productCategories = [
    {
      key: 'faucets',
      href: '/proizvodi/slavine',
      translationKey: 'products.faucets',
      descriptionKey: 'productsPage.faucetsExplore',
      image: kupaonicaImage,
    },
    {
      key: 'bathing',
      href: '/proizvodi/kupanje-tusiranje',
      translationKey: 'products.bathing',
      descriptionKey: 'productsPage.bathingExplore',
      image: oNamaImage,
    },
    {
      key: 'sanitary',
      href: '/proizvodi/sanitarije',
      translationKey: 'products.sanitary',
      descriptionKey: 'productsPage.sanitaryExplore',
      image: kupaonicaImage,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative flex min-h-[40vh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC0yMHYyaC0ydi0yaDJ6bTIwIDIwdjJoLTJ2LTJoMnptMC0yMHYyaC0ydi0yaDJ6bS0yMCAyMHYyaC0ydi0yaDJ6bTAtMjB2MmgtMnYtMmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            {t('productsPage.title')}
          </h1>
          <p className="text-lg text-white/90 md:text-xl lg:text-2xl">
            {t('productsPage.subtitle')}
          </p>
        </div>
      </section>

      {/* Categories - Horizontal Layout */}
      <section className="w-full overflow-visible bg-slate-50 py-16">
  <div className="mx-auto max-w-7xl px-6">
    <div className="flex flex-col gap-8">
      {productCategories.map((category) => (
        <Link
          key={category.key}
          to={category.href}
          className="group relative flex flex-col md:flex-row w-full items-center overflow-visible rounded-r-2xl bg-slate-200 p-4 md:p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mt-8 md:mt-12 mb-8 md:mb-12"
        >
          {/* Slika gore na mobitelu, lijevo na većim ekranima */}
          <div className="relative z-20 mb-4 md:mb-0 md:-ml-8 flex-shrink-0 overflow-visible w-full md:w-auto">
            <div className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48 md:h-64 md:w-48 overflow-visible">
              <div className="absolute inset-0 origin-center rotate-[-5deg] transform -top-[30%] left-0 h-[130%] w-full">
                <div className="relative h-full w-full overflow-hidden rounded-lg bg-white shadow-lg">
                  <div className="absolute -top-[30%] left-0 h-[130%] w-full">
                    <img
                      src={category.image}
                      alt={t(category.translationKey)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tekst dolje na mobitelu, desno na većim ekranima */}
          <div className="relative z-10 text-center md:text-left md:ml-8 flex flex-col flex-1">
            <h2 className="mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 transition-colors group-hover:text-blue-600">
              {t(category.translationKey)}
            </h2>
            <p className="mb-4 text-base sm:text-lg md:text-xl text-slate-700">
              {t(category.descriptionKey)}
            </p>
            {/* Button */}
            <div className="mt-auto">
              <span className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-blue-700">
                {t('productsPage.learnMore')}
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

    </div>
  )
}

export default ProizvodiPage

