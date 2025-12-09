import { useLanguage } from '../contexts/LanguageContext'
import { Award, CheckCircle, Handshake, Target } from 'lucide-react'
import TeamSection from '../components/TeamSection'
import heroImage from '../assets/kupaonica-zelena.webp'
import aboutImage from '../assets/o_nama_kupaonica_2.png'

const ONamaPage = () => {
  const { t } = useLanguage()

  // Vrijednosti - podaci za kartice
  const values = [
    {
      icon: Award,
      titleKey: 'tradition',
      descriptionKey: 'traditionDesc',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: CheckCircle,
      titleKey: 'quality',
      descriptionKey: 'qualityDesc',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: Handshake,
      titleKey: 'responsibility',
      descriptionKey: 'responsibilityDesc',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Target,
      titleKey: 'partnership',
      descriptionKey: 'partnershipDesc',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative flex min-h-[40vh] w-full items-center justify-center overflow-hidden bg-slate-900 text-white">
        <img
          src={heroImage}
          alt="Moderni kupaonski interijer"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/30" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
            {t('aboutPage.heroTitle')}
          </h1>
          <p className="text-lg text-white/90 md:text-xl lg:text-2xl">
            {t('aboutPage.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* 2. Naša priča - Two Column Section */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            {/* Left Column - Text */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold text-blue-600 md:text-4xl">
                {t('aboutPage.storyTitle')}
              </h2>
              <p className="mb-4 text-base leading-relaxed text-slate-700 md:text-lg">
                {t('aboutPage.storyParagraph1')}
              </p>
              <p className="text-base leading-relaxed text-slate-700 md:text-lg">
                {t('aboutPage.storyParagraph2')}
              </p>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-96 w-full overflow-hidden rounded-2xl md:h-[500px]">
              <img
                src={aboutImage}
                alt="Moderni kupaonski interijer"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Naše vrijednosti Section */}
      <section className="w-full bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              {t('aboutPage.valuesTitle')}
            </h2>
            <p className="mx-auto max-w-3xl text-base text-slate-600 md:text-lg">
              {t('aboutPage.valuesSubtitle')}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div
                    className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${value.bgColor}`}
                  >
                    <IconComponent className={`h-10 w-10 ${value.iconColor}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">
                    {t(`aboutPage.values.${value.titleKey}`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {t(`aboutPage.values.${value.descriptionKey}`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. Team Section - Reuse existing component, show all 4 members */}
      <TeamSection maxMembers={4} showLearnMore={false} />

      {/* 5. Stats Section */}
      <section className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Stat 1 */}
            <div className="text-center text-white">
              <div className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
                {t('aboutPage.stats.stat1Number')}
              </div>
              <p className="text-base text-white/90 md:text-lg lg:text-xl">
                {t('aboutPage.stats.stat1Caption')}
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center text-white">
              <div className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
                {t('aboutPage.stats.stat2Number')}
              </div>
              <p className="text-base text-white/90 md:text-lg lg:text-xl">
                {t('aboutPage.stats.stat2Caption')}
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center text-white">
              <div className="mb-4 text-5xl font-bold md:text-6xl lg:text-7xl">
                {t('aboutPage.stats.stat3Number')}
              </div>
              <p className="text-base text-white/90 md:text-lg lg:text-xl">
                {t('aboutPage.stats.stat3Caption')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ONamaPage

