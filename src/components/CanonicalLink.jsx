import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const CanonicalLink = () => {
  const location = useLocation()
  const baseUrl = 'https://www.armal.hr'

  useEffect(() => {
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

