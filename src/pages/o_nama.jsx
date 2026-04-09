import { useLanguage } from '../contexts/LanguageContext'
import { Award, CheckCircle, Handshake, Target } from 'lucide-react'
import TeamSection from '../components/TeamSection'
import heroImage from '../assets/kupaonica-zelena.webp'
import aboutImage from '../assets/armal-rodendan-1.webp'

const ONamaPage = () => {
  const { t } = useLanguage()

  // Vrijednosti - podaci za kartice
  const values = [
    {
      icon: Award,
      titleKey: 'tradition',
      descriptionKey: 'traditionDesc',
      bgColor: 'bg-[#0070CD]/20',
      iconColor: 'text-[#0070CD]',
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
      <section
        className="w-full h-[40vh] flex items-center text-white"
        style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: 'center 72%', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 text-left">
          <div className="max-w-3xl rounded-2xl border border-white/35 bg-white/15 p-5 backdrop-blur-md md:p-7">
            <h1 className="text-4xl font-bold md:text-5xl">{t('aboutPage.heroTitle')}</h1>
            <p className="mt-4 text-lg text-white/90">{t('aboutPage.heroSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* 2. Naša priča – tekst koji se omata oko slike */}
      <section className="w-full bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#0070CD]/80 md:mb-4">
            {t('aboutPage.storyEyebrow')}
          </p>

          <h2 className="mb-6 text-2xl font-bold tracking-tight text-[#0070CD] md:text-3xl">
            {t('aboutPage.storyTitle')}
          </h2>

          <div className="relative text-base leading-relaxed text-slate-700 md:text-lg">
            {/* Slika u desnom kutu, oko koje se tekst omata na većim ekranima */}
            <figure className="mb-6 w-full overflow-hidden rounded-3xl border border-slate-200/70 bg-white/40 shadow-sm md:float-right md:ml-8 md:mb-4 md:w-1/3 lg:w-[320px]">
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={aboutImage}
                  alt="stara kupaonica Armal"
                  className="h-full w-full object-cover object-bottom md:object-center"
                  loading="lazy"
                />
              </div>
            </figure>

            <p className="mb-5">
              {t('aboutPage.storyParagraph1')}
            </p>
            <p className="mb-5">
              {t('aboutPage.storyParagraph2')}
            </p>

            <blockquote className="group relative mb-5 overflow-hidden rounded-[12px] border-none bg-[#1a6cc4] px-10 py-8 text-white transition-[background,transform] duration-300 ease-in-out hover:-translate-y-[2px] hover:bg-[#155ab0]">
              <span
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-[140px] w-[140px] rounded-full bg-white/10 opacity-60 transition-transform duration-300 ease-in-out group-hover:scale-[1.3]"
              />
              <p className="relative text-[17px] font-semibold leading-[1.6] text-white">
                {t('aboutPage.storyParagraph4')}
              </p>
            </blockquote>

            <p className="mb-0">
              {t('aboutPage.storyParagraph3')}
            </p>

            {/* Clear float na dnu da se ostatak layouta ne \"penje\" uz sliku */}
            <div className="clear-both" />
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

      {/* 4. Team Section - Reuse existing component, show all members */}
      <TeamSection
        showLearnMore={false}
        memberRows={[
          ['Simona Zavratnik', 'Suzana Mahović', 'Marko Hrgetić'],
          ['Aleksandar Franolić', 'Miroslav Salopek', 'Saša Čačić', 'Marko Čović'],
          ['Anja Križanić', 'Sandra Miklec', 'Natalija Jović', 'Marija Pršir', 'Morena Sršen', 'Mladen Luketić'],
        ]}
      />

      {/* 5. Stats Section */}
      <section className="w-full py-16 md:py-24 text-white" style={{ background: 'linear-gradient(to right, #0070CD, #005bb0, #004A8A)' }}>
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

