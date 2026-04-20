'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

type CursorState = 'default' | 'link' | 'view'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos        = useRef({ x: -300, y: -300 })
  const smoothPos  = useRef({ x: -300, y: -300 })
  const rafId      = useRef<number>(0)
  const [state,   setState]   = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  const animate = useCallback(() => {
    smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.12
    smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.12
    if (cursorRef.current) {
      cursorRef.current.style.transform =
        `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px) translate(-50%, -50%)`
    }
    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [data-cursor]')
      if (!el) { setState('default'); return }
      setState((el as HTMLElement).getAttribute('data-cursor') === 'view' ? 'view' : 'link')
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', () => setVisible(false))
    document.documentElement.addEventListener('mouseenter', () => setVisible(true))
    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId.current)
    }
  }, [animate, visible])

  // Reticle sizing
  const spread  = state === 'view' ? 20 : state === 'link' ? 14 : 9
  const legLen  = state === 'view' ? 12 : state === 'link' ? 10 : 7
  const color   = state === 'default' ? 'rgba(201,168,76,0.75)' : '#C9A84C'
  const thickness = 1.5

  const corner = (x: number, y: number, flipX: boolean, flipY: boolean) => ({
    position: 'absolute' as const,
    width:  legLen,
    height: legLen,
    left:   x - legLen / 2,
    top:    y - legLen / 2,
    borderTop:    flipY ? 'none' : `${thickness}px solid ${color}`,
    borderBottom: flipY ? `${thickness}px solid ${color}` : 'none',
    borderLeft:   flipX ? 'none' : `${thickness}px solid ${color}`,
    borderRight:  flipX ? `${thickness}px solid ${color}` : 'none',
    transition:   'all 0.22s cubic-bezier(0.65, 0.05, 0, 1)',
  })

  const size = spread * 2 + legLen
  const c    = size / 2

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         size,
        height:        size,
        pointerEvents: 'none',
        zIndex:        10003,
        opacity:       visible ? 1 : 0,
        transition:    'opacity 0.3s ease',
        willChange:    'transform',
      }}
    >
      {/* Centre dot — 1px pixel */}
      <div style={{
        position:        'absolute',
        left:            c - 1,
        top:             c - 1,
        width:           2,
        height:          2,
        background:      color,
        borderRadius:    '50%',
        transition:      `background 0.2s ease`,
      }} />

      {/* 4 corner brackets */}
      <div style={corner(c - spread, c - spread, false, false)} />  {/* top-left     */}
      <div style={corner(c + spread, c - spread, true,  false)} />  {/* top-right    */}
      <div style={corner(c - spread, c + spread, false, true)}  />  {/* bottom-left  */}
      <div style={corner(c + spread, c + spread, true,  true)}  />  {/* bottom-right */}

      {/* "VIEW" label when in view mode */}
      {state === 'view' && (
        <div style={{
          position:      'absolute',
          left:          '50%',
          top:           size + 6,
          transform:     'translateX(-50%)',
          fontFamily:    'var(--font-sans)',
          fontSize:      '7px',
          letterSpacing: '0.22em',
          color:         '#C9A84C',
          fontWeight:    700,
          textTransform: 'uppercase',
          whiteSpace:    'nowrap',
          opacity:       0.9,
        }}>
          View
        </div>
      )}
    </div>
  )
}
