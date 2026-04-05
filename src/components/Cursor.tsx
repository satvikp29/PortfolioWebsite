'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type CursorState = 'default' | 'link' | 'view' | 'text'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const rafId = useRef<number>(0)
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  const animate = useCallback(() => {
    const ease = 0.11
    ring.current.x += (mouse.current.x - ring.current.x) * ease
    ring.current.y += (mouse.current.y - ring.current.y) * ease

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
    }
    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Only show on pointer-fine (mouse) devices
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const interactive = el.closest('a, button, [data-cursor]')
      if (!interactive) {
        setCursorState('default')
        return
      }
      const attr = (interactive as HTMLElement).getAttribute('data-cursor')
      if (attr === 'view') setCursorState('view')
      else setCursorState('link')
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver, { passive: true })

    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId.current)
    }
  }, [animate, visible])

  const isView = cursorState === 'view'
  const isLink = cursorState === 'link'

  const ringSize = isView ? 80 : isLink ? 52 : 40

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1px solid ${isView ? 'rgba(200,16,46,0.85)' : 'rgba(200,16,46,0.45)'}`,
          backgroundColor: isView ? 'rgba(200,16,46,0.06)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition:
            'width 0.35s cubic-bezier(0.65,0.05,0,1), height 0.35s cubic-bezier(0.65,0.05,0,1), background-color 0.3s ease, border-color 0.3s ease, opacity 0.4s ease',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: '9px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#C8102E',
            fontWeight: 700,
            opacity: isView ? 1 : 0,
            transition: 'opacity 0.2s ease',
            userSelect: 'none',
          }}
        >
          View
        </span>
      </div>

      {/* Sharp dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isLink ? 0 : 5,
          height: isLink ? 0 : 5,
          borderRadius: '50%',
          backgroundColor: '#C8102E',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transition: 'width 0.25s ease, height 0.25s ease, opacity 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  )
}
