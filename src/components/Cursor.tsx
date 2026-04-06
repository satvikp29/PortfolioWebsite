'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type CursorState = 'default' | 'link' | 'view'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse   = useRef({ x: -300, y: -300 })
  const ring    = useRef({ x: -300, y: -300 })
  const rafId   = useRef<number>(0)
  const [state,   setState]   = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  const animate = useCallback(() => {
    ring.current.x += (mouse.current.x - ring.current.x) * 0.1
    ring.current.y += (mouse.current.y - ring.current.y) * 0.1
    if (dotRef.current)
      dotRef.current.style.transform  = `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%,-50%)`
    if (ringRef.current)
      ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`
    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [data-cursor]')
      if (!el) { setState('default'); return }
      const attr = (el as HTMLElement).getAttribute('data-cursor')
      setState(attr === 'view' ? 'view' : 'link')
    }

    document.addEventListener('mousemove',  onMove, { passive: true })
    document.addEventListener('mouseover',  onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', () => setVisible(false))
    document.documentElement.addEventListener('mouseenter', () => setVisible(true))
    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId.current)
    }
  }, [animate, visible])

  const isView = state === 'view'
  const isLink = state === 'link'
  const ringSize = isView ? 76 : isLink ? 48 : 38

  return (
    <>
      {/* Trailing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:       'fixed',
          top: 0, left: 0,
          width:          ringSize,
          height:         ringSize,
          borderRadius:   '50%',
          border:         `1px solid ${isView ? 'rgba(201,168,76,0.85)' : 'rgba(201,168,76,0.4)'}`,
          backgroundColor: isView ? 'rgba(201,168,76,0.05)' : 'transparent',
          pointerEvents:  'none',
          zIndex:         9998,
          opacity:        visible ? 1 : 0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          transition:
            'width 0.3s cubic-bezier(0.65,0.05,0,1), height 0.3s cubic-bezier(0.65,0.05,0,1), background-color 0.25s ease, border-color 0.25s ease, opacity 0.35s ease',
          willChange: 'transform',
        }}
      >
        <span
          style={{
            fontFamily:    'var(--font-sans)',
            fontSize:      '8px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         '#C9A84C',
            fontWeight:    700,
            opacity:       isView ? 1 : 0,
            transition:    'opacity 0.2s ease',
            userSelect:    'none',
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
          position:        'fixed',
          top: 0, left: 0,
          width:           isLink ? 0 : 5,
          height:          isLink ? 0 : 5,
          borderRadius:    '50%',
          backgroundColor: '#C9A84C',
          pointerEvents:   'none',
          zIndex:          9999,
          opacity:         visible ? 1 : 0,
          transition:      'width 0.2s ease, height 0.2s ease, opacity 0.3s ease',
          willChange:      'transform',
        }}
      />
    </>
  )
}
