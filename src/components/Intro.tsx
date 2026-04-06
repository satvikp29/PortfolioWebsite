'use client'

import { useEffect, useState } from 'react'

export default function Intro() {
  const [phase, setPhase] = useState<'in' | 'out' | 'gone'>('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 1100)
    const t2 = setTimeout(() => setPhase('gone'), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (phase === 'gone') return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#090907',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transform: phase === 'out' ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.65s cubic-bezier(0.65, 0, 0, 1)',
        pointerEvents: phase === 'out' ? 'none' : 'all',
      }}
    >
      {/* Logo mark */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 12vw, 9rem)',
          fontWeight: 600,
          color: '#C9A84C',
          letterSpacing: '-0.04em',
          lineHeight: 1,
          animation: 'fadeIn 0.45s ease forwards',
          opacity: 0,
          animationDelay: '0.05s',
        }}
      >
        SR
      </div>

      {/* Full name */}
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          color: '#3A3835',
          marginTop: '20px',
          textTransform: 'uppercase',
          animation: 'fadeIn 0.45s ease forwards',
          opacity: 0,
          animationDelay: '0.3s',
        }}
      >
        Satvik Reddy Parvathareddy
      </div>

      {/* Bottom border sweep */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4) 50%, transparent)',
          animation: 'fadeIn 0.5s ease forwards',
          opacity: 0,
          animationDelay: '0.5s',
        }}
      />
    </div>
  )
}
