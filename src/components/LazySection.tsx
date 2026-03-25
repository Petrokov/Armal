import React, { useEffect, useMemo, useRef, useState } from 'react'

type LazySectionProps = {
  children: React.ReactNode
  className?: string
  /**
   * Placeholder minHeight to reduce layout shift before content mounts.
   * Example: 320, '320px', '40vh'
   */
  minHeight?: number | string
  rootMargin?: string
  threshold?: number | number[]
  /**
   * If true, content is rendered immediately.
   */
  eager?: boolean
  /**
   * If true, intersection observer mounts content only once.
   */
  once?: boolean
  /**
   * Optional custom placeholder. If provided, minHeight still applies to container.
   */
  placeholder?: React.ReactNode
}

export default function LazySection({
  children,
  className,
  minHeight = 200,
  rootMargin = '200px',
  threshold = 0.01,
  eager = false,
  once = true,
  placeholder,
}: LazySectionProps) {
  const [shouldRender, setShouldRender] = useState(eager)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const isBrowser = typeof window !== 'undefined'

  const canObserve = useMemo(() => isBrowser && 'IntersectionObserver' in window, [isBrowser])

  useEffect(() => {
    if (!canObserve) {
      // Fallback: if IO is not available, render immediately.
      setShouldRender(true)
      return
    }

    if (shouldRender) return

    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (!first) return

        if (first.isIntersecting) {
          setShouldRender(true)
          if (once) observer.disconnect()
        }
      },
      { root: null, rootMargin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [canObserve, once, rootMargin, shouldRender, threshold])

  if (shouldRender) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight }}
      aria-hidden="true"
    >
      {placeholder ?? null}
    </div>
  )
}

