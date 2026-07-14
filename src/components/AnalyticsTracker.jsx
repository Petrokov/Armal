import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView, trackWebshopClick } from '../utils/analytics'

const AnalyticsTracker = () => {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname, location.search)
  }, [location.pathname, location.search])

  useEffect(() => {
    const handleClick = (event) => {
      const link = event.target.closest('a[href]')
      if (!link) return

      const href = link.getAttribute('href')
      if (!href) return

      trackWebshopClick({
        href,
        label: link.textContent,
        pagePath: `${location.pathname}${location.search}`,
      })
    }

    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [location.pathname, location.search])

  return null
}

export default AnalyticsTracker
