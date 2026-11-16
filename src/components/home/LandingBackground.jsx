'use client'

import { useEffect, useRef } from 'react'

/**
 * The landing page's vgpu backdrop, fixed behind everything so the footer sits
 * on the same paper instead of a seam. Decorative: if WebGPU is unavailable the
 * page keeps its flat colour and nothing else changes.
 */
export function LandingBackground({ children }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !navigator.gpu) return

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let disposed = false
    let stop

    // Defer past StrictMode's mount/unmount/mount so only the live instance boots.
    const bootFrame = requestAnimationFrame(() => {
      import('@/graphics/backdrop')
        .then(({ startBackdrop }) => startBackdrop(canvas, { still }))
        .then((teardown) => {
          if (disposed) teardown()
          else stop = teardown
        })
        .catch((error) => {
          console.warn('[background] field unavailable, keeping the flat colour:', error)
        })
    })

    return () => {
      disposed = true
      cancelAnimationFrame(bootFrame)
      stop?.()
    }
  }, [])

  return (
    <div className="relative flex min-h-svh flex-col bg-[var(--page-bg)] font-space text-[var(--page-ink)]">
      <canvas ref={canvasRef} aria-hidden="true" className="fixed inset-0 -z-10 h-full w-full" />
      {children}
    </div>
  )
}
