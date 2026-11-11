'use client'

import { useEffect, useRef, useState } from 'react'

// Angelic ambient shader: pearl light, iridescent veils, a halo that follows
// the cursor. Falls back to a static CSS gradient when WebGPU is unavailable.
async function startHalo(canvas, { reducedMotion }) {
  const { clock, effect, frame, frameLoop, init, surface } = await import('vgpu')
  const shader = (await import('./halo.wgsl')).default

  const gpu = await init()

  const out = surface(gpu, canvas, { dpr: [1, 1.5] })
  const halo = effect(gpu, shader, {
    label: 'halo',
    set: { params: { time: 0, texel: out.texelSize, pointer: [0.5, 0.4] } },
  })
  out.onResize(() => halo.set({ params: { texel: out.texelSize } }))

  // Soft-lerped pointer, in uv space (y up).
  const target = [0.5, 0.4]
  const current = [0.5, 0.4]
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect()
    target[0] = (e.clientX - r.left) / r.width
    target[1] = 1 - (e.clientY - r.top) / r.height
  }
  window.addEventListener('pointermove', onMove, { passive: true })

  const time = clock(gpu)
  const draw = (f) => {
    current[0] += (target[0] - current[0]) * 0.04
    current[1] += (target[1] - current[1]) * 0.04
    halo.set({ params: { time: time.time, pointer: current } })
    f.pass(out, halo)
  }

  // Reduced motion: one still frame, no loop.
  const loop = reducedMotion
    ? (frame(gpu, draw), null)
    : frameLoop(gpu, draw)

  return () => {
    window.removeEventListener('pointermove', onMove)
    loop?.stop()
    gpu.dispose()
  }
}

export function Halo({ className = '' }) {
  const canvasRef = useRef(null)
  const [fallback, setFallback] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dispose
    startHalo(canvasRef.current, { reducedMotion })
      .then((d) => { dispose = d })
      .catch((err) => {
        console.warn('[halo] WebGPU unavailable, using static gradient:', err)
        setFallback(true)
      })
    return () => dispose?.()
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={`block h-full w-full ${className}`}
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, #fdf3e3 0%, #fbeaf1 45%, #f6f8f2 100%)',
        }}
      />
      {fallback && (
        <span className="absolute bottom-4 right-4 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[10px] tracking-widest text-[#8a8378] uppercase backdrop-blur">
          Static preview — WebGPU off
        </span>
      )}
    </>
  )
}
