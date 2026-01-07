import { BadgeCheck, ShieldCheck, Package, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import heroImage from '../assets/kupaonica-zelena.webp'
import FeaturedCollections from './FeaturedCollections'
import MoodboardSection from './MoodboardSection'
import AboutSection from './AboutSection'
import CTASection from './CTASection'
import TeamSection from './TeamSection'

const LandingPage = () => {
  const { t } = useLanguage()

  // Struktura feature-a - koristi translation keys
  const features = [
    {
      icon: BadgeCheck,
      titleKey: 'quality',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: ShieldCheck,
      titleKey: 'warranty',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: Package,
      titleKey: 'solutions',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Truck,
      titleKey: 'delivery',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-5rem)] w-full flex-1 items-center overflow-hidden bg-slate-900 text-white">
        <img
          src={heroImage}
          alt="Moderni kupaonski interijer"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/30" />

        <div className="relative z-10 w-full">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-start justify-center gap-6 px-6 py-16 text-left md:px-10 lg:px-12">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.5em] text-white/70">
                {t('hero.collections')}
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                {t('hero.title1')}
                <br />
                {t('hero.title2')}
                <br />
                {t('hero.title3')}
              </h1>
              <p className="mt-4 text-base text-white/80 sm:text-lg md:max-w-2xl">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/proizvodi"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(15,23,42,0.25)]"
              >
                {t('hero.exploreCollection')}
                <ArrowIcon />
              </Link>
              <Link
                to="/katalozi"
                className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                {t('hero.viewCatalog')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full bg-[white] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full ${feature.bgColor}`}
                  >
                    <IconComponent
                      className={`h-10 w-10 ${feature.iconColor}`}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-800">
                    {t(`features.${feature.titleKey}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {t(`features.${feature.titleKey}.description`)}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      {/* <FeaturedCollections /> */}

      {/* Moodboard Section */}
      <MoodboardSection />

      {/* About Section */}
      <AboutSection />

      {/* CTA Section */}
      <CTASection
        title={t('cta.title')}
        description={t('cta.description')}
        buttons={[
          {
            label: t('cta.b2b'),
            href: 'https://b2b.armal.hr/',
            icon: true,
          },
          {
            label: t('cta.editHome'),
            href: 'https://uredidom.hr/',
            icon: true,
          },
        ]}
      />

      {/* Team Section */}
      <TeamSection />
    </>
  )
}

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default LandingPage

