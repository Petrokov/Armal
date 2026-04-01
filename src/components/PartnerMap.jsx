import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import partnerLocationsData from '../data/partnerLocations'

/**
 * PartnerMap – Google Mapa s markerima lokacija partnera.
 * Za svaki marker prikazuje InfoWindow s imenom, adresom i telefonom.
 * API ključ: postavi VITE_GOOGLE_MAPS_API_KEY u .env ili proslijedi apiKey prop.
 */
const PartnerMap = ({
  partnerLocations = partnerLocationsData,
  apiKey,
  className = '',
  selectedPartnerId = null,
  onPartnerSelect,
  heightClassName = 'h-[500px]',
  onDebugChange,
}) => {
  const { t, language } = useLanguage()
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const infoWindowsRef = useRef([])
  const markerByIdRef = useRef(new Map())
  const infoWindowByIdRef = useRef(new Map())
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const [mapReady, setMapReady] = useState(false)

  useEffect(() => {
    onDebugChange?.({
      scriptLoaded,
      hasGoogle: !!window.google?.maps,
      hasMapInstance: !!mapInstanceRef.current,
      mapReady,
      loadError: loadError || '',
      locationsCount: partnerLocations?.length || 0,
    })
  }, [onDebugChange, scriptLoaded, loadError, partnerLocations, mapReady])

  // Učitavanje Google Maps skripte (callback da znamo kad je API stvarno spreman)
  useEffect(() => {
    const rawKey = apiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    const key = typeof rawKey === 'string' ? rawKey.trim() : ''
    if (!key) {
      setLoadError(
        'Google Maps API ključ nije postavljen. U rootu projekta napravi datoteku .env s redom: VITE_GOOGLE_MAPS_API_KEY=tvoj_kljuc'
      )
      return
    }
    if (window.google?.maps) {
      setScriptLoaded(true)
      return
    }
    const existing = document.querySelector('script[src*="maps.googleapis.com"]')
    if (existing) {
      const checkReady = () => {
        if (window.google?.maps) setScriptLoaded(true)
        else setTimeout(checkReady, 100)
      }
      checkReady()
      return
    }
    const callbackName = '__armalPartnerMapInit'
    let timeoutId
    window[callbackName] = () => {
      if (timeoutId) clearTimeout(timeoutId)
      setScriptLoaded(true)
    }
    timeoutId = setTimeout(() => {
      if (!window.google?.maps) {
        setLoadError(
          'Mapa nije uspjela učitati. Provjeri: 1) U .env je VITE_GOOGLE_MAPS_API_KEY=tvoj_kljuc 2) Restartaj npm run dev 3) U Google Cloud je uključen "Maps JavaScript API".'
        )
        window[callbackName] = null
      }
    }, 12000)
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&callback=${callbackName}`
    script.async = true
    script.defer = true
    script.onerror = () => {
      if (timeoutId) clearTimeout(timeoutId)
      window[callbackName] = null
      setLoadError('Google Mape nije moguće učitati. Provjeri internet i API ključ u Google Cloud Console.')
    }
    document.head.appendChild(script)
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window[callbackName] = null
    }
  }, [apiKey])

  // Inicijalizacija mape i markera nakon učitavanja skripte
  useEffect(() => {
    if (!scriptLoaded || !mapRef.current || !window.google?.maps || !partnerLocations?.length) return

    setMapReady(false)
    setLoadError(null)

    let map
    try {
      const first = partnerLocations[0]
      map = new window.google.maps.Map(mapRef.current, {
        center: { lat: first.lat, lng: first.lng },
        zoom: 10,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      })
      mapInstanceRef.current = map
      window.google.maps.event.addListenerOnce(map, 'idle', () => setMapReady(true))
    } catch (error) {
      setLoadError(
        `Google mapa se nije inicijalizirala. ${
          error instanceof Error ? error.message : 'Provjeri API restrikcije i billing u Google Cloud.'
        }`
      )
      mapInstanceRef.current = null
      setMapReady(false)
      return
    }

    const bounds = new window.google.maps.LatLngBounds()
    const markers = []
    const infoWindows = []
    const markerById = new Map()
    const infoWindowById = new Map()

    partnerLocations.forEach((partner) => {
      const partnerId = partner.id ?? partner.name ?? ''
      const position = { lat: partner.lat, lng: partner.lng }
      bounds.extend(position)

      const marker = new window.google.maps.Marker({
        position,
        map,
        title: partner.name,
      })
      markers.push(marker)
      markerById.set(partnerId, marker)

      const contentString = buildPartnerInfoWindowHtml(partner, t)
      const infoWindow = new window.google.maps.InfoWindow({ content: contentString })
      infoWindows.push(infoWindow)
      infoWindowById.set(partnerId, infoWindow)

      marker.addListener('click', () => {
        infoWindows.forEach((iw) => iw.close())
        infoWindow.open(map, marker)
        onPartnerSelect?.(partnerId)
      })
    })

    if (partnerLocations.length > 1) {
      map.fitBounds(bounds)
    } else if (partnerLocations.length === 1) {
      const first = partnerLocations[0]
      map.setCenter({ lat: first.lat, lng: first.lng })
      map.setZoom(14)
    }

    // Ako je selected partner još uvijek u ovom skupu rezultata, odmah prikaži info.
    if (selectedPartnerId) {
      const marker = markerById.get(selectedPartnerId)
      const infoWindow = infoWindowById.get(selectedPartnerId)
      if (marker && infoWindow) {
        infoWindows.forEach((iw) => iw.close())
        infoWindow.open(map, marker)
        const pos = marker.getPosition()
        if (pos) map.setCenter(pos)
        map.setZoom(14)
      }
    }

    markersRef.current = markers
    infoWindowsRef.current = infoWindows
    markerByIdRef.current = markerById
    infoWindowByIdRef.current = infoWindowById

    return () => {
      markers.forEach((m) => m.setMap(null))
      infoWindows.forEach((iw) => iw.close())
      mapInstanceRef.current = null
      setMapReady(false)
      markerByIdRef.current = new Map()
      infoWindowByIdRef.current = new Map()
    }
  }, [scriptLoaded, partnerLocations, language, t])

  // Kada klikneš partner u listi, highlight + infoWindow na mapi.
  useEffect(() => {
    if (!scriptLoaded || !mapInstanceRef.current || !selectedPartnerId) return

    const map = mapInstanceRef.current
    const marker = markerByIdRef.current.get(selectedPartnerId)
    const infoWindow = infoWindowByIdRef.current.get(selectedPartnerId)
    if (!marker || !infoWindow) return

    infoWindowsRef.current.forEach((iw) => iw.close())
    infoWindow.open(map, marker)

    const pos = marker.getPosition()
    if (pos) map.setCenter(pos)
    map.setZoom(14)
  }, [scriptLoaded, selectedPartnerId])

  if (loadError) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-slate-100 text-slate-600 ${className} ${heightClassName}`}
        style={{ width: '100%' }}
      >
        <p className="px-4 text-center text-sm">{loadError}</p>
      </div>
    )
  }

  if (!partnerLocations?.length) {
    return null
  }

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl shadow-lg ${className} ${heightClassName}`}
    >
      <div ref={mapRef} className="h-full w-full" />
    </div>
  )
}

function escapeHtml(text) {
  if (!text) return ''
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function buildPartnerInfoWindowHtml(partner, t) {
  const code = partner.country || ''
  const countryKey = code ? `landingPartnerMap.countryNames.${code}` : ''
  const countryTranslated = countryKey ? t(countryKey) : ''
  const countryDisplay =
    countryTranslated && !String(countryTranslated).startsWith('landingPartnerMap')
      ? countryTranslated
      : code

  const countryLine =
    countryDisplay !== ''
      ? `<p style="margin: 0 0 4px 0; font-size: 14px; color: #475569;">${escapeHtml(
          t('landingPartnerMap.detailCountryLabel')
        )}: ${escapeHtml(countryDisplay)}</p>`
      : ''

  const phoneLine =
    partner.phone && String(partner.phone).trim()
      ? `<p style="margin: 0 0 4px 0; font-size: 14px; color: #475569;">${escapeHtml(partner.phone)}</p>`
      : ''

  const mapsLine = partner.googleMapsUrl
    ? `<p style="margin: 8px 0 0 0;"><a href="${escapeHtml(partner.googleMapsUrl)}" target="_blank" rel="noopener noreferrer" style="color: #0070CD; font-size: 14px; font-weight: 600;">${escapeHtml(
        t('landingPartnerMap.filters.mapsLinkLabel')
      )}</a></p>`
    : ''

  return `
        <div style="padding: 12px; min-width: 220px; font-family: system-ui, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #0f172a;">${escapeHtml(partner.name)}</h3>
          <p style="margin: 0 0 4px 0; font-size: 14px; color: #475569; line-height: 1.4;">${escapeHtml(partner.address)}</p>
          ${countryLine}
          ${phoneLine}
          ${mapsLine}
        </div>
      `
}

export default PartnerMap
export { partnerLocationsData as defaultPartnerLocations }
