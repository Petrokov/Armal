export const TEAM_IMAGE_BREAKPOINTS = [
  { key: 'phone', label: 'Mobitel', hint: 'do 767px', minWidth: 0, previewWidth: 320 },
  { key: 'tablet', label: 'Tablet', hint: '768px i vise', minWidth: 768, previewWidth: 300 },
  { key: 'laptop', label: 'Laptop', hint: '1024px i vise', minWidth: 1024, previewWidth: 240 },
  { key: 'monitor', label: 'Monitor', hint: '1280px i vise', minWidth: 1280, previewWidth: 260 },
  { key: 'widescreen', label: 'Widescreen', hint: '1536px i vise', minWidth: 1536, previewWidth: 280 },
]

export const TEAM_IMAGE_ZOOM_MIN = 100
export const TEAM_IMAGE_ZOOM_MAX = 250

const defaultForBreakpoint = (key) => ({ x: 50, y: key === 'phone' ? 25 : 50, zoom: 100 })

export const DEFAULT_TEAM_IMAGE_SETTINGS = TEAM_IMAGE_BREAKPOINTS.reduce(
  (acc, breakpoint) => ({ ...acc, [breakpoint.key]: defaultForBreakpoint(breakpoint.key) }),
  {},
)

const clamp = (value, min, max, fallback) => {
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.min(max, Math.max(min, Math.round(number)))
}

export const normalizeTeamImageSettings = (value) => {
  let source = value

  if (typeof source === 'string') {
    try {
      source = JSON.parse(source)
    } catch {
      source = null
    }
  }

  if (!source || typeof source !== 'object') source = {}

  return TEAM_IMAGE_BREAKPOINTS.reduce((acc, breakpoint) => {
    const fallback = defaultForBreakpoint(breakpoint.key)
    const entry = source[breakpoint.key] && typeof source[breakpoint.key] === 'object' ? source[breakpoint.key] : {}

    acc[breakpoint.key] = {
      x: clamp(entry.x, 0, 100, fallback.x),
      y: clamp(entry.y, 0, 100, fallback.y),
      zoom: clamp(entry.zoom, TEAM_IMAGE_ZOOM_MIN, TEAM_IMAGE_ZOOM_MAX, fallback.zoom),
    }

    return acc
  }, {})
}

export const teamImageInlineStyle = (settings, breakpointKey = 'phone') => {
  const normalized = normalizeTeamImageSettings(settings)[breakpointKey] || defaultForBreakpoint(breakpointKey)

  return {
    objectPosition: `${normalized.x}% ${normalized.y}%`,
    scale: String(normalized.zoom / 100),
  }
}

export const teamImageCssVarStyle = {
  objectPosition: 'var(--tm-x, 50%) var(--tm-y, 25%)',
  scale: 'var(--tm-zoom, 1)',
}

export const teamImageCssKey = (member) =>
  String(member?.id || member?.name || 'unknown').replace(/[^A-Za-z0-9_-]/g, '-')

export const buildTeamImageCss = (entries = []) => {
  const usable = entries.filter((entry) => entry?.cssKey)
  if (!usable.length) return ''

  return TEAM_IMAGE_BREAKPOINTS.map((breakpoint) => {
    const rules = usable
      .map(({ cssKey, settings }) => {
        const value = normalizeTeamImageSettings(settings)[breakpoint.key]
        return `[data-team-image="${cssKey}"]{--tm-x:${value.x}%;--tm-y:${value.y}%;--tm-zoom:${value.zoom / 100};}`
      })
      .join('')

    return breakpoint.minWidth ? `@media (min-width:${breakpoint.minWidth}px){${rules}}` : rules
  }).join('')
}
