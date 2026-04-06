'use client'

import { useEffect, useRef, ReactNode } from 'react'

export default function SwaySurface({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const target  = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const rafId   = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      // Normalize cursor to -1 → 1 from viewport center, then invert for sway
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      target.current = { x: -nx * 10, y: -ny * 5 }
    }

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.055
      current.current.y += (target.current.y - current.current.y) * 0.055
      if (wrapRef.current) {
        wrapRef.current.style.transform =
          `translate(${current.current.x.toFixed(3)}px, ${current.current.y.toFixed(3)}px)`
      }
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div ref={wrapRef} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}
