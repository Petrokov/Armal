import { useEffect, useRef, useState } from 'react'

/**
 * Primjer lokacija partnera – mogu se proslijediti i preko propa partnerLocations.
 */
const defaultPartnerLocations = [
  {
    name: 'Armal Partner Zagreb',
    address: 'Ulica Grada Vukovara 269A, 10000 Zagreb',
    phone: '+385 1 2345 678',
    lat: 45.8011,
    lng: 15.9713,
  },
  {
    name: 'Armal Partner Split',
    address: 'Poljička cesta 26, 21000 Split',
    phone: '+385 21 123 456',
    lat: 43.5081,
    lng: 16.4402,
  },
]

/**
 * PartnerMap – Google Mapa s markerima lokacija partnera.
 * Za svaki marker prikazuje InfoWindow s imenom, adresom i telefonom.
 * API ključ: postavi VITE_GOOGLE_MAPS_API_KEY u .env ili proslijedi apiKey prop.
 */
const PartnerMap = ({
  partnerLocations = defaultPartnerLocations,
  apiKey,
  className = '',
}) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const infoWindowsRef = useRef([])
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [loadError, setLoadError] = useState(null)

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

    const first = partnerLocations[0]
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: first.lat, lng: first.lng },
      zoom: 10,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true,
    })
    mapInstanceRef.current = map

    const bounds = new window.google.maps.LatLngBounds()
    const markers = []
    const infoWindows = []

    partnerLocations.forEach((partner) => {
      const position = { lat: partner.lat, lng: partner.lng }
      bounds.extend(position)

      const marker = new window.google.maps.Marker({
        position,
        map,
        title: partner.name,
      })
      markers.push(marker)

      const contentString = `
        <div style="padding: 12px; min-width: 220px; font-family: system-ui, sans-serif;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #0f172a;">${escapeHtml(partner.name)}</h3>
          <p style="margin: 0 0 4px 0; font-size: 14px; color: #475569; line-height: 1.4;">${escapeHtml(partner.address)}</p>
          <p style="margin: 0; font-size: 14px; color: #475569;">${escapeHtml(partner.phone)}</p>
        </div>
      `
      const infoWindow = new window.google.maps.InfoWindow({ content: contentString })
      infoWindows.push(infoWindow)

      marker.addListener('click', () => {
        infoWindows.forEach((iw) => iw.close())
        infoWindow.open(map, marker)
      })
    })

    if (partnerLocations.length > 1) {
      map.fitBounds(bounds)
    }
    markersRef.current = markers
    infoWindowsRef.current = infoWindows

    return () => {
      markers.forEach((m) => m.setMap(null))
      infoWindows.forEach((iw) => iw.close())
      mapInstanceRef.current = null
    }
  }, [scriptLoaded, partnerLocations])

  if (loadError) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl bg-slate-100 text-slate-600 ${className}`}
        style={{ width: '100%', height: '500px' }}
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
      className={`w-full overflow-hidden rounded-2xl shadow-lg ${className}`}
      style={{ height: '500px' }}
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

export default PartnerMap
export { defaultPartnerLocations }
