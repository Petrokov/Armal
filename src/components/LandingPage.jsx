import { BadgeCheck, ShieldCheck, Package, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useEffect, useRef, useState } from 'react'
import paralax1 from '../assets/paralax/para-1.webp'
import paralax2 from '../assets/paralax/para-2.webp'
import paralax3 from '../assets/paralax/para-3.webp'
import paralax4 from '../assets/paralax/para-4.webp'
import FeaturedCollections from './FeaturedCollections'
import MoodboardSection from './MoodboardSection'
import AboutSection from './AboutSection'
import CTASection from './CTASection'
import TeamSection from './TeamSection'

const LandingPage = () => {
  const { t } = useLanguage()
  const [isAnimated, setIsAnimated] = useState(false)
  const heroRef = useRef(null)
  const paralaxLayerRefs = useRef([])

  useEffect(() => {
    // Pokreni animaciju nakon kratkog delay-a
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Mouse parallax za hero (premium depth, bez layout thrash-a).
  // - koristi pointermove/pointerleave na hero wrapperu
  // - requestAnimationFrame + transform: translate3d(x, y, 0)
  // - na mouseleave vraća glatko na 0,0
  // - prefers-reduced-motion: efekt se ugasi
  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const isMobileOrTablet =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(max-width: 767px)').matches

    const isMobile =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(max-width: 639px)').matches

    // Intenziteti (px) po layeru: para-1 je najsporiji, para-2 najbrži/najbliži
    // redoslijed refova je: [para-1, armal-paralax, para-3, para-4, para-2]
    const intensities = [8, 14, 20, 28, 36]

    // Overscan da se ne vide rubovi layera pri translateu (layeri su transparentni komadi).
    const intensityScale = isMobileOrTablet ? 0.6 : 1
    const baseScale = isMobileOrTablet ? 1.06 : 1.12

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

    let rafId = null
    let running = false

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const applyTransforms = (xNorm, yNorm) => {
      // xNorm/yNorm: -1..1
      paralaxLayerRefs.current.forEach((el, i) => {
        if (!el) return
        const intensity = (intensities[i] ?? 0) * intensityScale
        const tx = xNorm * intensity
        const ty = yNorm * intensity
        const scale = isMobile && i === 4 ? 1.2 : baseScale
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`
      })
    }

    const animate = () => {
      rafId = null
      // Glatko približavanje targetu (bez inercije/lage, samo easing kroz rAF).
      const k = 0.12
      currentX += (targetX - currentX) * k
      currentY += (targetY - currentY) * k

      applyTransforms(currentX, currentY)

      const done = Math.abs(targetX - currentX) < 0.001 && Math.abs(targetY - currentY) < 0.001
      if (!done) {
        rafId = window.requestAnimationFrame(animate)
      } else {
        // Osiguraj točan final na 0,0
        currentX = targetX
        currentY = targetY
        applyTransforms(currentX, currentY)
        running = false
      }
    }

    const start = () => {
      if (running) return
      running = true
      rafId = window.requestAnimationFrame(animate)
    }

    const onPointerMove = (e) => {
      if (prefersReduced) return
      const rect = heroEl.getBoundingClientRect()
      const halfW = rect.width / 2
      const halfH = rect.height / 2
      if (halfW <= 0 || halfH <= 0) return

      const dx = (e.clientX - (rect.left + halfW)) / halfW
      const dy = (e.clientY - (rect.top + halfH)) / halfH

      // Normalize i ograniči da translate ne bude ekstreman
      targetX = clamp(dx, -1, 1)
      targetY = clamp(dy, -1, 1)

      start()
    }

    const onPointerLeave = () => {
      if (prefersReduced) return
      targetX = 0
      targetY = 0
      start()
    }

    if (prefersReduced) {
      applyTransforms(0, 0)
      return
    }

    // početno stanje
    applyTransforms(0, 0)

    heroEl.addEventListener('pointermove', onPointerMove, { passive: true })
    heroEl.addEventListener('pointerleave', onPointerLeave)

    return () => {
      heroEl.removeEventListener('pointermove', onPointerMove)
      heroEl.removeEventListener('pointerleave', onPointerLeave)
      if (rafId != null) window.cancelAnimationFrame(rafId)
    }
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
      bgColor: 'bg-[#92693d33]',
      iconColor: 'text-[#92693d]',
    },
    {
      icon: Truck,
      titleKey: 'delivery',
      bgColor: 'bg-[#7a838833]',
      iconColor: 'text-[#7a8388]',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-[calc(100vh-5rem)] w-full flex-1 items-center overflow-hidden bg-slate-900 text-white"
      >
        {/* Parallax layers (dekorativno) */}
        <img
          ref={(el) => {
            paralaxLayerRefs.current[0] = el
          }}
          src={paralax1}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          style={{ willChange: 'transform', zIndex: 1 }}
          draggable={false}
        />
        <img
          ref={(el) => {
            paralaxLayerRefs.current[2] = el
          }}
          src={paralax3}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          style={{ willChange: 'transform', zIndex: 3 }}
          draggable={false}
        />
        <img
          ref={(el) => {
            paralaxLayerRefs.current[3] = el
          }}
          src={paralax4}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          style={{ willChange: 'transform', zIndex: 4 }}
          draggable={false}
        />
        {/* para-2: slavina + kamen (mobile: sidri za dno hero-a) */}
        <div
          className="absolute left-1/2 bottom-6 z-20 h-[60%] w-[140%] -translate-x-1/2 pointer-events-none select-none md:inset-0 md:left-0 md:z-20 md:h-full md:w-full md:translate-x-0"
        >
          <img
            ref={(el) => {
              paralaxLayerRefs.current[4] = el
            }}
            src={paralax2}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-contain object-bottom md:object-cover md:object-center"
            style={{ willChange: 'transform' }}
            draggable={false}
          />
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/30"
          style={{ zIndex: 0 }}
        />

        <div className="relative z-10 w-full">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-start justify-center gap-6 px-6 py-16 text-left md:px-10 lg:px-12">
            <div
              className="hero-content-glass w-full max-w-3xl rounded-[28px] border border-white/25 bg-white/25 p-5 shadow-[0_8px_32px_rgba(15,23,42,0.12)] sm:p-7 md:bg-white/20 md:p-8"
              style={{
                backdropFilter: 'blur(14px) saturate(140%)',
                WebkitBackdropFilter: 'blur(14px) saturate(140%)',
              }}
            >
              <div className="text-white">
                <p className="text-sm uppercase tracking-[0.5em] text-white/75">
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
                <p className="mt-4 text-base text-white/90 sm:text-lg md:max-w-2xl">
                  {t('hero.subtitle')}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Link
                  to="/proizvodi"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(15,23,42,0.25)] whitespace-nowrap min-w-[200px] flex-1 sm:flex-initial sm:min-w-[240px]"
                >
                  {t('hero.exploreCollection')}
                  <ArrowIcon />
                </Link>
                <Link
                  to="/katalozi"
                  className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/20 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25 whitespace-nowrap min-w-[200px] flex-1 sm:flex-initial sm:min-w-[240px]"
                >
                  {t('hero.viewCatalog')}
                </Link>
              </div>
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
                  <h2 className="mb-2 text-lg font-semibold text-slate-800">
                    {t(`features.${feature.titleKey}.title`)}
                  </h2>
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

      {/* Team Section – 3 kartice u jednom redu */}
      <TeamSection maxMembers={3} columnsLg={3} />
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

