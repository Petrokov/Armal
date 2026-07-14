export const pushDataLayer = (payload) => {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

export const getWebshopNameFromUrl = (href) => {
  try {
    const hostname = new URL(href, window.location.origin).hostname.toLowerCase()
    if (hostname.includes('b2b.armal.hr')) return 'b2b'
    if (hostname.includes('uredidom.hr')) return 'uredi_dom'
  } catch {
    return null
  }
  return null
}

export const trackPageView = (pathname, search = '') => {
  pushDataLayer({
    event: 'page_view',
    page_path: `${pathname}${search}`,
    page_title: document.title,
    page_location: window.location.href,
  })
}

export const trackWebshopClick = ({ href, label, pagePath }) => {
  const webshopName = getWebshopNameFromUrl(href)
  if (!webshopName) return

  pushDataLayer({
    event: 'webshop_click',
    webshop_name: webshopName,
    link_url: href,
    link_text: label?.trim() || webshopName,
    page_path: pagePath,
  })
}
