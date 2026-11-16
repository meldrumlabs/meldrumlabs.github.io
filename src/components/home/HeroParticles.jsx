'use client'

import { useEffect, useRef, useState } from 'react'

/** The static mark: the fallback whenever the GPU path cannot run. */
const MARK_URL = '/img/logo/mark.svg'

/**
 * The particle mark, drawn as ink on paper: coverage in alpha, a denser field
 * than the glowing version, and streams that saturate to solid ink.
 *
 * Every failure path lands on the static mark: no adapter, a dead device,
 * reduced motion.
 */
export function HeroParticles({ className = '' }) {
  const canvasRef = useRef(null)
  const [staticMark, setStaticMark] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !navigator.gpu) {
      setStaticMark(true)
      return
    }

    let disposed = false
    let stop

    // Defer past StrictMode's mount/unmount/mount so only the live instance boots.
    const bootFrame = requestAnimationFrame(() => {
      import('@/graphics/hero-particles')
        .then(({ startHeroParticles }) =>
          startHeroParticles({
            canvas,
            ink: true,
            onFailure: () => setStaticMark(true),
          }),
        )
        .then((teardown) => {
          if (disposed) teardown()
          else {
            stop = teardown
            setReady(true)
          }
        })
        .catch((error) => {
          console.warn('[hero] particle logo unavailable, using the static mark:', error)
          setStaticMark(true)
        })
    })

    return () => {
      disposed = true
      cancelAnimationFrame(bootFrame)
      stop?.()
    }
  }, [])

  return (
    <div className={`relative aspect-[1.58] ${className}`}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {staticMark && (
        <img
          src={MARK_URL}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  )
}
