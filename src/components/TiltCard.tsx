import React, { useEffect, useMemo, useRef, useState } from 'react'

type TiltCardProps = {
  children: React.ReactNode
  className?: string
  maxTilt?: number // degrees
  scale?: number
  glare?: boolean
  disabled?: boolean
}

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

/**
 * Reusable subtle 3D tilt card (desktop mouse only).
 * - Uses only transform/opacity for performance.
 * - Respects prefers-reduced-motion.
 * - Touch/pointer (non-mouse) disables tilt.
 */
export default function TiltCard({
  children,
  className,
  maxTilt = 8,
  scale = 1.02,
  glare = true,
  disabled = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const glareRef = useRef<HTMLDivElement | null>(null)

  const rafRef = useRef<number | null>(null)
  const latestRef = useRef({
    rx: 0,
    ry: 0,
    glareX: 50,
    glareY: 50,
    active: false,
  })

  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(!!mq.matches)
    update()

    // Safari compatibility: older versions may not support addEventListener on MediaQueryList
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }
    // eslint-disable-next-line deprecation/deprecation
    mq.addListener(update)
    // eslint-disable-next-line deprecation/deprecation
    return () => mq.removeListener(update)
  }, [])

  const isDisabled = disabled || reducedMotion
  const ariaDisabled = useMemo(() => (isDisabled ? true : undefined), [isDisabled])

  const apply = (rx: number, ry: number, glareX: number, glareY: number, active: boolean) => {
    const cardEl = cardRef.current
    if (!cardEl) return

    const s = active ? scale : 1
    // Note: translate3d keeps it on the GPU and avoids layout work.
    cardEl.style.transform = `translate3d(0,0,0) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`

    if (glare && glareRef.current) {
      const glareEl = glareRef.current
      glareEl.style.opacity = active ? '1' : '0'
      glareEl.style.backgroundPosition = `${glareX}% ${glareY}%`
    }
  }

  const scheduleApply = (rx: number, ry: number, glareX: number, glareY: number, active: boolean) => {
    latestRef.current = { rx, ry, glareX, glareY, active }
    if (rafRef.current != null) return

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null
      const { rx: rx2, ry: ry2, glareX, glareY, active } = latestRef.current
      apply(rx2, ry2, glareX, glareY, active)
    })
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDisabled) return
    if (e.pointerType !== 'mouse') return

    const cardEl = cardRef.current
    if (!cardEl) return

    const rect = cardEl.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    if (width <= 0 || height <= 0) return

    const px = (e.clientX - rect.left) / width // 0..1
    const py = (e.clientY - rect.top) / height // 0..1

    const xNorm = (px - 0.5) * 2 // -1..1
    const yNorm = (py - 0.5) * 2 // -1..1

    const ry = clamp(xNorm * maxTilt, -maxTilt, maxTilt)
    const rx = clamp(-yNorm * maxTilt, -maxTilt, maxTilt)

    // subtle glare position
    const glareX = clamp(px * 100, 0, 100)
    const glareY = clamp(py * 100, 0, 100)

    // Disable transition during interaction for snappy feel.
    cardEl.style.transition = 'transform 0ms'
    if (glareRef.current) glareRef.current.style.transition = 'opacity 120ms linear'

    scheduleApply(rx, ry, glareX, glareY, true)
  }

  const onPointerLeave = () => {
    const cardEl = cardRef.current
    if (!cardEl) return

    // Smooth return.
    cardEl.style.transition = 'transform 650ms cubic-bezier(0.2, 0.8, 0.2, 1)'
    cardEl.style.transform = `translate3d(0,0,0) rotateX(0deg) rotateY(0deg) scale(1)`

    if (glare && glareRef.current) {
      glareRef.current.style.transition = 'opacity 420ms ease'
      glareRef.current.style.opacity = '0'
    }
  }

  return (
    <div style={{ perspective: 1000 }} aria-disabled={ariaDisabled}>
      <div
        ref={cardRef}
        className={`relative overflow-hidden will-change-transform ${className ?? ''}`}
        onPointerMove={isDisabled ? undefined : onPointerMove}
        onPointerLeave={isDisabled ? undefined : onPointerLeave}
      >
        {glare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: 'inherit',
              opacity: 0,
              backgroundImage:
                'radial-gradient(420px circle at 50% 50%, rgba(255,255,255,0.55), rgba(255,255,255,0.0) 60%)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '120% 120%',
              willChange: 'opacity, background-position, transform',
            }}
          />
        )}

        {children}
      </div>
    </div>
  )
}

