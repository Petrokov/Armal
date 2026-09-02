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

const currentPagePath = () =>
  typeof window === 'undefined' ? '' : `${window.location.pathname}${window.location.search}`

export const trackCatalogDownload = ({ title, fileUrl, action = 'download', pagePath }) => {
  pushDataLayer({
    event: 'catalog_download',
    catalog_title: title?.trim() || '',
    file_url: fileUrl || '',
    download_action: action,
    page_path: pagePath || currentPagePath(),
  })
}

export const trackPartnerInteraction = ({ interaction, partnerName, pagePath }) => {
  pushDataLayer({
    event: 'partner_interaction',
    interaction_type: interaction,
    partner_name: partnerName?.trim() || '',
    page_path: pagePath || currentPagePath(),
  })
}

export const trackPhoneClick = ({ href, label, pagePath }) => {
  pushDataLayer({
    event: 'phone_click',
    phone_number: (href || '').replace(/^tel:/i, ''),
    link_text: label?.trim() || '',
    page_path: pagePath || currentPagePath(),
  })
}
