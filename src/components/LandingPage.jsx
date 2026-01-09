import { BadgeCheck, ShieldCheck, Package, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useEffect, useState } from 'react'
import heroImage from '../assets/hero_2_2.jpg'
import FeaturedCollections from './FeaturedCollections'
import MoodboardSection from './MoodboardSection'
import AboutSection from './AboutSection'
import CTASection from './CTASection'
import TeamSection from './TeamSection'

const LandingPage = () => {
  const { t } = useLanguage()
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    // Pokreni animaciju nakon kratkog delay-a
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Funkcija za animaciju specifičnih riječi
  const getAnimatedText = (text, keywords, delay) => {
    // Provjeri koja riječ se nalazi u tekstu (case-insensitive)
    const textLower = text.toLowerCase()
    const foundKeyword = keywords.find((keyword) => textLower.includes(keyword.toLowerCase()))
    
    if (foundKeyword) {
      const keywordLower = foundKeyword.toLowerCase()
      const index = textLower.indexOf(keywordLower)
      const before = text.substring(0, index)
      // Pronađi točnu duljinu riječi (može biti različita zbog velikih/malih slova)
      const keywordMatch = text.substring(index).match(new RegExp(`^${foundKeyword}`, 'i'))
      const keyword = keywordMatch ? keywordMatch[0] : text.substring(index, index + foundKeyword.length)
      const after = text.substring(index + keyword.length)
      
      return (
        <>
          {before}
          <span
            className={`inline-block transition-all duration-700 ease-out ${
              isAnimated
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
          >
            {keyword}
          </span>
          {after}
        </>
      )
    }
    return text
  }

  // Struktura feature-a - koristi translation keys
  const features = [
    {
      icon: BadgeCheck,
      titleKey: 'quality',
      bgColor: 'bg-[#0070CD]/20',
      iconColor: 'text-[#0070CD]',
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
          className="absolute inset-0 h-full w-full object-cover min-h-full min-w-full"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/30" />

        <div className="relative z-10 w-full">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-start justify-center gap-6 px-6 py-16 text-left md:px-10 lg:px-12">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.5em] text-white/70">
                {t('hero.collections')}
              </p>
              <h1 className="mt-2 text-4xl font-semibold leading-none sm:text-5xl md:text-6xl">
                <span className="block mb-2">
                  {getAnimatedText(t('hero.title1'), ['rješenja', 'rešitve', 'rešenja'], 200)}
                </span>
                <span className="block mb-2">
                  {getAnimatedText(t('hero.title2'), ['dojam', 'vtis', 'utisak'], 400)}
                </span>
                <span className="block">
                  {getAnimatedText(t('hero.title3'), ['cijena', 'cena'], 600)}
                </span>
              </h1>
              <p className="mt-4 text-base text-white/80 sm:text-lg md:max-w-2xl">
                {t('hero.subtitle')}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/proizvodi"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(15,23,42,0.25)] whitespace-nowrap min-w-[200px] flex-1 sm:flex-initial sm:min-w-[240px]"
              >
                {t('hero.exploreCollection')}
                <ArrowIcon />
              </Link>
              <Link
                to="/katalozi"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15 whitespace-nowrap min-w-[200px] flex-1 sm:flex-initial sm:min-w-[240px]"
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
      <TeamSection maxMembers={3} />
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

