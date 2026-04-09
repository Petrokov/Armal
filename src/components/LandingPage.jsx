import { BadgeCheck, ShieldCheck, Package, Truck, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import headerPipa from '../assets/header/header-pipa.webp'
import rubiProstor from '../assets/slavine/rubi-compresed/rubi-prostor.webp'
import oNamaKupaonicaHero from '../assets/o_nama_kupaonica_hero.png'
import wcSjedalice from '../assets/sanitarije/wc_sjedalice.webp'
import PartnerMap from './PartnerMap'
import partnerLocationsData, { partnerLocationsSI } from '../data/partnerLocations'
import FeaturedCollections from './FeaturedCollections'
import MoodboardSection from './MoodboardSection'
import CTASection from './CTASection'
import TeamSection from './TeamSection'

const LandingPage = () => {
  const { t } = useLanguage()
  const [isAnimated, setIsAnimated] = useState(false)
  const partnerSectionRef = useRef(null)
  const partnerCanvasRef = useRef(null)

  useEffect(() => {
    // Pokreni animaciju nakon kratkog delay-a
    const timer = setTimeout(() => {
      setIsAnimated(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const sectionEl = partnerSectionRef.current
    const canvas = partnerCanvasRef.current
    if (!sectionEl || !canvas) return

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let dots = []
    let mouse = { x: null, y: null, inside: false }
    let animationFrameId

    const GRID_SPACING = 30
    const BASE_RADIUS = 1.5
    const MAX_RADIUS = 4
    const INFLUENCE_RADIUS = 70
    const FRICTION = 0.75

    const createDots = () => {
      const rect = sectionEl.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width
      canvas.height = height
      dots = []

      for (let y = GRID_SPACING / 2; y < height; y += GRID_SPACING) {
        for (let x = GRID_SPACING / 2; x < width; x += GRID_SPACING) {
          dots.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            radius: BASE_RADIUS,
          })
        }
      }
    }

    const onMouseMove = (e) => {
      const rect = sectionEl.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.inside = true
    }

    const onMouseLeave = () => {
      mouse.inside = false
      mouse.x = null
      mouse.y = null
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      for (const d of dots) {
        if (mouse.inside && mouse.x != null && mouse.y != null) {
          const dx = d.x - mouse.x
          const dy = d.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001

          if (dist < INFLUENCE_RADIUS) {
            const force = (INFLUENCE_RADIUS - dist) / INFLUENCE_RADIUS
            const nx = dx / dist
            const ny = dy / dist
            d.vx += nx * force * 2
            d.vy += ny * force * 2
            d.radius += (MAX_RADIUS - d.radius) * 0.2
          } else {
            d.radius += (BASE_RADIUS - d.radius) * 0.1
          }
        } else {
          d.radius += (BASE_RADIUS - d.radius) * 0.1
        }

        d.vx += (d.ox - d.x) * (1 - FRICTION) * 0.5
        d.vy += (d.oy - d.y) * (1 - FRICTION) * 0.5

        d.vx *= FRICTION
        d.vy *= FRICTION

        d.x += d.vx
        d.y += d.vy

        const alphaFactor = (d.radius - BASE_RADIUS) / (MAX_RADIUS - BASE_RADIUS || 1)
        const alpha = 0.12 + Math.max(0, alphaFactor) * (0.45 - 0.12)

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(26,108,196,${alpha})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    createDots()
    animate()

    const handleResize = () => {
      createDots()
    }

    sectionEl.addEventListener('mousemove', onMouseMove)
    sectionEl.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', handleResize)

    return () => {
      sectionEl.removeEventListener('mousemove', onMouseMove)
      sectionEl.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', handleResize)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
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

  const categoryCards = [
    {
      key: 'faucets',
      eyebrowLabel: 'MJEŠALICE ZA VODU',
      titleKey: 'products.faucets',
      descriptionKey: 'products.faucetsDescription',
      to: '/proizvodi/slavine',
      imageSrc: rubiProstor,
      accent: '#4FA6FF',
    },
    {
      key: 'bathing',
      eyebrowLabel: 'KUPANJE + TUŠIRANJE',
      titleKey: 'products.bathing',
      descriptionKey: 'products.bathingDescription',
      to: '/proizvodi/kupanje-tusiranje',
      imageSrc: oNamaKupaonicaHero,
      accent: '#46D3C6',
    },
    {
      key: 'sanitary',
      eyebrowLabel: 'SANITARIJE',
      titleKey: 'products.sanitary',
      descriptionKey: 'products.sanitaryDescription',
      to: '/proizvodi/sanitarije',
      imageSrc: wcSjedalice,
      accent: '#A0A8B3',
    },
  ]

  // Partner map filters + geo-distance logic
  const [partnerCountry, setPartnerCountry] = useState('ALL')
  const [partnerQuery, setPartnerQuery] = useState('')
  const [distanceKm, setDistanceKm] = useState('all')
  const [geoStatus, setGeoStatus] = useState('idle') // idle | loading | success | error
  const [geoError, setGeoError] = useState('')
  const [myCoords, setMyCoords] = useState(null) // { lat, lng }
  const [selectedPartnerId, setSelectedPartnerId] = useState(null)
  const [mapDebug, setMapDebug] = useState({
    scriptLoaded: false,
    hasGoogle: false,
    hasMapInstance: false,
    loadError: '',
    locationsCount: 0,
  })
  // Debug traka za Google Maps (API key, status skripte, itd.)
  // Podrazumevano je sakrivena; uključi je preko VITE_SHOW_MAP_DEBUG=true u .env.
  const showMapDebug = import.meta.env.VITE_SHOW_MAP_DEBUG === 'true'

  const haversineKm = useCallback((lat1, lng1, lat2, lng2) => {
    const toRad = (deg) => (deg * Math.PI) / 180
    const R = 6371 // Earth radius (km)
    const dLat = toRad(lat2 - lat1)
    const dLng = toRad(lng2 - lng1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }, [])

  const requestMyLocation = useCallback(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeoStatus('error')
      setGeoError(t('landingPartnerMap.geo.error'))
      return
    }

    setGeoStatus('loading')
    setGeoError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMyCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoStatus('success')
      },
      () => {
        setGeoStatus('error')
        setGeoError(t('landingPartnerMap.geo.error'))
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    )
  }, [t])

  const resetPartnerFilters = useCallback(() => {
    setPartnerCountry('ALL')
    setPartnerQuery('')
    setDistanceKm('all')
    setSelectedPartnerId(null)
  }, [])

  const filteredPartners = useMemo(() => {
    const q = partnerQuery.trim().toLowerCase()
    const locationFilterEnabled = geoStatus === 'success' && myCoords && distanceKm !== 'all'
    const basePartners = [
      ...partnerLocationsData.filter((p) => p.country !== 'SLO' && p.disabledOnMap !== true),
      ...partnerLocationsSI,
    ]

    let list = basePartners
    if (partnerCountry !== 'ALL') {
      list = list.filter((p) => p.country === partnerCountry)
    }
    if (q) {
      list = list.filter((p) => (p.name || '').toLowerCase().includes(q))
    }

    if (locationFilterEnabled) {
      const limit = Number(distanceKm)
      list = list.filter((p) => haversineKm(myCoords.lat, myCoords.lng, p.lat, p.lng) <= limit)
    }

    // Petrokov poslovnice uvijek prikaži prve u rezultatima pretrage.
    return [...list].sort((a, b) => {
      const aIsPetrokov = (a.name || '').toLowerCase().includes('petrokov')
      const bIsPetrokov = (b.name || '').toLowerCase().includes('petrokov')

      if (aIsPetrokov && !bIsPetrokov) return -1
      if (!aIsPetrokov && bIsPetrokov) return 1
      return 0
    })
  }, [partnerCountry, partnerQuery, distanceKm, geoStatus, myCoords, haversineKm])

  useEffect(() => {
    if (!selectedPartnerId) return
    const stillExists = filteredPartners.some((p) => p.id === selectedPartnerId)
    if (!stillExists) setSelectedPartnerId(null)
  }, [filteredPartners, selectedPartnerId])

  const hasMapsApiKey = !!(import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim()

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex h-[65vh] w-full flex-1 items-center overflow-hidden bg-slate-900 text-white"
      >
        <img
          src={headerPipa}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover pointer-events-none select-none"
          draggable={false}
        />

        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/60 to-slate-900/20"
          style={{ zIndex: 0 }}
        />

        <div className="relative z-10 w-full">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-start justify-center gap-6 px-6 py-16 text-left md:px-10 lg:px-12">
            <div className="w-full max-w-3xl p-5 sm:p-7 md:p-8">
              <div className="text-white">
                <h1 className="mt-2 text-4xl font-semibold leading-none sm:text-5xl md:text-6xl">
                  <span className="block mb-2">
                    {getAnimatedText(t('hero.title1'), ['kupaonicu', 'kupatilo', 'kopalnico'], 200)}
                  </span>
                  <span className="block mb-2">
                    {getAnimatedText(t('hero.title2'), ['dizajn'], 400)}
                  </span>
                  <span className="block">
                    {getAnimatedText(t('hero.title3'), ['cijena', 'cena'], 600)}
                  </span>
                </h1>
                {t('hero.subtitle') && (
                  <p className="mt-4 text-base text-white/95 sm:text-lg md:max-w-2xl">
                    {t('hero.subtitle')}
                  </p>
                )}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/proizvodi"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(15,23,42,0.25)] whitespace-nowrap min-w-[200px] flex-1 sm:flex-initial sm:min-w-[240px]"
                >
                  {t('hero.exploreCollection')}
                  <ArrowIcon />
                </Link>
                <Link
                  to="/katalozi"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 bg-white/25 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/30 whitespace-nowrap min-w-[200px] flex-1 sm:flex-initial sm:min-w-[240px]"
                >
                  {t('hero.viewCatalog')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="w-full bg-slate-50 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-5">
          <div className="mb-10 max-w-4xl md:mb-14">
            <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-[36px] lg:text-[40px]">
              Naši proizvodi
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {categoryCards.map((card) => (
              <Link
                key={card.key}
                to={card.to}
                aria-label={t(card.titleKey)}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.14)]"
              >
                <div
                  className="absolute left-0 top-0 h-[3px] w-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: card.accent }}
                />

                <div className="flex flex-col p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-10 rounded-full"
                      style={{ backgroundColor: card.accent }}
                    />
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600">
                      {card.eyebrowLabel}
                    </p>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 md:text-[28px]">
                    {t(card.titleKey)}
                  </h3>

                  <p className="mt-3 text-[16px] leading-[1.55] text-slate-600">
                    {t(card.descriptionKey)}
                  </p>

                  <div className="relative mt-5 h-28 overflow-hidden rounded-2xl bg-slate-100 sm:h-32 md:h-40 lg:h-44">
                    <img
                      src={card.imageSrc}
                      alt={t(card.titleKey)}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </div>

                  <div className="mt-5 flex min-h-[44px] items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-white/50 px-4 py-2.5">
                    <span className="text-sm font-semibold text-slate-900">
                      {t('landingCategories.ctaExplore')}
                    </span>
                    <span className="flex items-center justify-center text-slate-900 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Map Section */}
      <section
        ref={partnerSectionRef}
        className="relative w-full overflow-hidden bg-[#EEF4FB] py-10 md:py-14"
      >
        {/* <canvas
          ref={partnerCanvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        /> */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-5">
          <div className="mb-10 flex w-full flex-col gap-4 md:mb-14 md:flex-row md:items-stretch md:justify-between">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                {t('landingPartnerMap.eyebrow')}
              </p>
              <h2 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl md:text-[36px] lg:text-[40px]">
                {t('landingPartnerMap.title')}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">
                {t('landingPartnerMap.subtitle')}
              </p>
              {showMapDebug && (
                <div className="inline-flex w-fit flex-wrap items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">DEBUG</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-semibold ${
                      hasMapsApiKey ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {hasMapsApiKey ? 'API key: OK' : 'API key: MISSING'}
                  </span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold text-slate-700">
                    rezultati: {filteredPartners.length}
                  </span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold text-slate-700">
                    geo: {geoStatus}
                  </span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold text-slate-700">
                    selected: {selectedPartnerId || 'none'}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-semibold ${
                      mapDebug.loadError
                        ? 'bg-red-100 text-red-700'
                        : mapDebug.mapReady
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    map: {mapDebug.loadError ? 'error' : mapDebug.mapReady ? 'ready' : 'loading'}
                  </span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold text-slate-700">
                    google: {mapDebug.hasGoogle ? 'yes' : 'no'}
                  </span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold text-slate-700">
                    script: {mapDebug.scriptLoaded ? 'loaded' : 'pending'}
                  </span>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold text-slate-700">
                    instance: {mapDebug.hasMapInstance ? 'yes' : 'no'}
                  </span>
                  {mapDebug.loadError && (
                    <span className="max-w-[320px] truncate rounded-full bg-red-100 px-2 py-0.5 font-semibold text-red-700">
                      err: {mapDebug.loadError}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="hidden shrink-0 items-center justify-center rounded-2xl border border-white/80 bg-white/60 px-6 text-[#0070CD] shadow-sm backdrop-blur-sm md:inline-flex md:min-h-[170px]">
              <Store className="h-20 w-20" />
            </div>
          </div>

          <div
            className="rounded-2xl border border-white/80 bg-white/60 p-4 shadow-sm md:p-6"
            style={{
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Filters */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {t('landingPartnerMap.filters.countryLabel')}
                </label>
                <select
                  className="h-[44px] w-full rounded-xl border border-slate-200/80 px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0070CD]/40"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: 8,
                  }}
                  value={partnerCountry}
                  onChange={(e) => setPartnerCountry(e.target.value)}
                >
                  <option value="ALL">{t('landingPartnerMap.filters.allCountries')}</option>
                  <option value="HR">HR</option>
                  <option value="BIH">BIH</option>
                  <option value="RS">RS</option>
                  <option value="SI">{t('landingPartnerMap.filters.countrySI')}</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {t('landingPartnerMap.filters.partnerLabel')}
                </label>
                <input
                  type="text"
                  className="h-[44px] w-full rounded-xl border border-slate-200/80 px-4 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0070CD]/40"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: 8,
                  }}
                  value={partnerQuery}
                  placeholder={t('landingPartnerMap.filters.partnerPlaceholder')}
                  onChange={(e) => setPartnerQuery(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  {t('landingPartnerMap.filters.distanceLabel')}
                </label>
                <select
                  className="h-[44px] w-full rounded-xl border border-slate-200/80 px-4 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0070CD]/40"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: 8,
                  }}
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(e.target.value)}
                >
                  <option value="all">{t('landingPartnerMap.filters.allDistances')}</option>
                  <option value="25">do 25 km</option>
                  <option value="50">do 50 km</option>
                  <option value="100">do 100 km</option>
                  <option value="200">do 200 km</option>
                </select>

                {distanceKm !== 'all' && geoStatus === 'idle' && (
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {t('landingPartnerMap.filters.locationHelper')}
                  </p>
                )}
              </div>
            </div>

            {/* Actions + result count */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#0070CD] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#005bb0] disabled:opacity-70"
                onClick={requestMyLocation}
                disabled={geoStatus === 'loading'}
              >
                {geoStatus === 'loading'
                  ? t('landingPartnerMap.geo.loading')
                  : t('landingPartnerMap.filters.useMyLocation')}
              </button>

              <button
                type="button"
                className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200/70 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
                onClick={resetPartnerFilters}
              >
                {t('landingPartnerMap.filters.resetFilters')}
              </button>
            </div>

            {geoStatus === 'error' && (
              <p className="mt-3 text-sm text-red-600">{geoError || t('landingPartnerMap.geo.error')}</p>
            )}

            <p className="mt-4 text-sm text-slate-600" aria-live="polite">
              {t('landingPartnerMap.resultShownPrefix')}
              {filteredPartners.length}
              {t('landingPartnerMap.resultShownSuffix')}
            </p>

            {/* Map + List */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5 lg:items-start lg:gap-8">
              {/* Map */}
              <div
                className="order-2 lg:order-1 lg:col-span-3 rounded-2xl border border-white/80 bg-white/60 shadow-sm"
                style={{
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                }}
              >
                <PartnerMap
                  partnerLocations={filteredPartners}
                  selectedPartnerId={selectedPartnerId}
                  onPartnerSelect={setSelectedPartnerId}
                  onDebugChange={showMapDebug ? setMapDebug : undefined}
                  heightClassName="h-[420px] sm:h-[460px] md:h-[520px] lg:h-[540px]"
                  className="rounded-2xl"
                />
              </div>

              {/* List */}
              <div className="order-3 lg:order-2 lg:col-span-2">
                <div
                  className="h-[420px] overflow-hidden rounded-2xl border border-slate-200/80 bg-white/60 shadow-sm sm:h-[460px] md:h-[520px] lg:h-[540px]"
                  style={{
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                  }}
                >
                  <div className="h-full overflow-auto p-3 sm:p-4">
                    {filteredPartners.length > 0 ? (
                      <ul className="space-y-2 pr-1">
                        {filteredPartners.map((p) => {
                          const distance =
                            geoStatus === 'success' && myCoords
                              ? haversineKm(myCoords.lat, myCoords.lng, p.lat, p.lng)
                              : null
                          const isActive = selectedPartnerId === p.id

                          return (
                            <li key={p.id}>
                              <button
                                type="button"
                                onClick={() => setSelectedPartnerId(p.id)}
                                className={`group w-full rounded-xl border px-2.5 py-2 text-left transition focus:outline-none focus:ring-2 focus:ring-[#0070CD]/40 ${
                                  isActive
                                    ? 'border-[#0070CD]/60 bg-white shadow-sm'
                                    : 'border-transparent hover:border-[#0070CD] hover:bg-[#0070CD]'
                                }`}
                                aria-current={isActive ? 'true' : 'false'}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <span className="text-sm font-semibold text-slate-900 transition-colors group-hover:text-white">
                                    {p.name}
                                  </span>
                                  {distance != null && (
                                    <span className="shrink-0 text-xs font-semibold text-[#0070CD] transition-colors group-hover:text-white">
                                      {Math.round(distance)} km
                                    </span>
                                  )}
                                </div>
                                <div className="mt-0.5 text-xs leading-relaxed text-slate-600 transition-colors group-hover:text-white">
                                  {p.address}
                                </div>
                                {isActive && p.country === 'SI' && (
                                  <>
                                    <div className="mt-1 text-xs leading-relaxed text-slate-600 transition-colors group-hover:text-white">
                                      {t('landingPartnerMap.detailCountryLabel')}:{' '}
                                      {t('landingPartnerMap.countryNames.SI')}
                                    </div>
                                    {p.phone ? (
                                      <div className="mt-1 text-xs leading-relaxed text-slate-600 transition-colors group-hover:text-white">
                                        {p.phone}
                                      </div>
                                    ) : null}
                                    {p.googleMapsUrl ? (
                                      <a
                                        href={p.googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-1 block text-xs leading-relaxed text-slate-600 underline transition-colors group-hover:text-white"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        {t('landingPartnerMap.filters.mapsLinkLabel')}
                                      </a>
                                    ) : null}
                                  </>
                                )}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
                        <p className="text-sm font-semibold text-slate-600">
                          {t('landingPartnerMap.empty')}
                        </p>
                        <button
                          type="button"
                          className="mt-2 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200/70 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-slate-50"
                          onClick={resetPartnerFilters}
                        >
                          {t('landingPartnerMap.clearFilters')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full bg-slate-50 py-16">
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
      <TeamSection
        columnsLg={3}
        memberRows={[['Simona Zavratnik', 'Suzana Mahović', 'Marko Hrgetić']]}
      />

            {/* Moodboard Section */}
            <MoodboardSection />
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

