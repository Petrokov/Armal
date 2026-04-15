import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CanonicalLink = () => {
  const location = useLocation()
  const baseUrl = import.meta.env.VITE_PUBLIC_SITE_URL || 'https://www.armal.hr'

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined'
    const hostname = isBrowser ? window.location.hostname.toLowerCase() : ''
    const isProductionHost = hostname === 'www.armal.hr' || hostname === 'armal.hr'

    let robotsMeta = document.querySelector('meta[name="robots"]')
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta')
      robotsMeta.setAttribute('name', 'robots')
      document.head.appendChild(robotsMeta)
    }
    robotsMeta.setAttribute('content', isProductionHost ? 'index,follow' : 'noindex,nofollow')

    // Pronađi postojeći canonical link ili kreiraj novi
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }

    // Ažuriraj href s trenutnom rutom
    const canonicalUrl = `${baseUrl}${location.pathname}`
    canonicalLink.setAttribute('href', canonicalUrl)
  }, [location.pathname])

  return null
}

export default CanonicalLink

