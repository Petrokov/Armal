import React, { useEffect, useMemo, useRef, useState } from 'react'

type LazyImageProps = {
  src: string
  alt: string
  className?: string
  /**
   * When true, image mounts immediately (used for hero/LCP).
   */
  eager?: boolean
  /**
   * Override fetchPriority for eager images.
   */
  fetchPriority?: 'high' | 'low' | 'auto'
  rootMargin?: string
  /**
   * Placeholder sizing to reduce layout shift.
   */
  minHeight?: number | string
  aspectRatio?: string
  style?: React.CSSProperties
}

export default function LazyImage({
  src,
  alt,
  className,
  eager = false,
  fetchPriority = 'high',
  rootMargin = '200px',
  minHeight,
  aspectRatio,
  style,
}: LazyImageProps) {
  const [shouldRender, setShouldRender] = useState(eager)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const canObserve = useMemo(() => {
    return typeof window !== 'undefined' && 'IntersectionObserver' in window
  }, [])

  useEffect(() => {
    if (!canObserve) {
      setShouldRender(true)
      return
    }
    if (shouldRender) return

    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first) return
        if (first.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [canObserve, rootMargin, shouldRender])

  if (!shouldRender) {
    const placeholderStyle: React.CSSProperties = {
      minHeight: minHeight != null ? (typeof minHeight === 'number' ? `${minHeight}px` : minHeight) : undefined,
      aspectRatio,
      width: '100%',
    }
    return (
      <div
        ref={wrapperRef}
        className={className}
        style={{ ...placeholderStyle, ...style }}
        aria-hidden="true"
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? fetchPriority : undefined}
      style={style}
      draggable={false}
    />
  )
}

