'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import TextReveal from './TextReveal'

const stackRows = [
  { label: 'Backend',  items: 'FastAPI, Python, PostgreSQL, SQLAlchemy' },
  { label: 'Frontend', items: 'Next.js, React, TypeScript, Tailwind' },
  { label: 'Infra',    items: 'Docker, Vercel, Git, REST APIs' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef   = useRef<HTMLDivElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Parallax on photo
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const dx = (e.clientX - rect.left - rect.width / 2)  / rect.width
      const dy = (e.clientY - rect.top  - rect.height / 2) / rect.height
      if (photoRef.current)
        photoRef.current.style.transform = `translate(${dx * -14}px, ${dy * -10}px)`
      if (glowRef.current)
        glowRef.current.style.transform  = `translate(${dx * 25}px,  ${dy * 18}px)`
    }
    section.addEventListener('mousemove', onMove, { passive: true })
    return () => section.removeEventListener('mousemove', onMove)
  }, [])

  // Sync hero reveal with intro (starts after intro begins sliding ~1.2s)
  const delay = (ms: number) => `${1200 + ms}ms`

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent, transparent 3px,
            rgba(201,168,76,0.006) 3px,
            rgba(201,168,76,0.006) 4px
          )
        `,
      }}
    >
      {loaded && <div className="load-bar" />}

      {/* Ambient glow layers */}
      <div
        ref={glowRef}
        className="absolute top-0 right-0 w-[900px] h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top right, rgba(201,168,76,0.07) 0%, transparent 55%)',
          transition: 'transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(201,168,76,0.025) 0%, transparent 60%)' }}
      />

      {/* Faint watermark initial */}
      <div
        className="absolute right-0 top-0 pointer-events-none select-none overflow-hidden"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '45vw',
          fontWeight: 700,
          color: 'rgba(238,233,225,0.012)',
          lineHeight: 0.85,
          letterSpacing: '-0.05em',
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        S
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-28 pb-20 w-full">

        {/* Status badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '3rem',
            padding: '6px 14px',
            borderRadius: '99px',
            border: '1px solid rgba(201,168,76,0.2)',
            background: 'rgba(201,168,76,0.04)',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 0.7s ease ${delay(0)}, transform 0.7s cubic-bezier(0.65,0.05,0,1) ${delay(0)}`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#C9A84C', animation: 'goldPulse 2.2s ease-in-out infinite' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '10px',
              color: '#C9A84C',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Dallas, TX  /  Open to Roles
          </span>
        </div>

        {/* Giant name */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.035em',
            lineHeight: 1.0,
            marginBottom: '2.5rem',
            fontOpticalSizing: 'auto',
          } as React.CSSProperties}
        >
          <TextReveal delay={1260}>
            <span
              className="block text-ink"
              style={{ fontSize: 'clamp(3.8rem,8vw,9rem)', fontWeight: 400 }}
            >
              Satvik Reddy
            </span>
          </TextReveal>
          <TextReveal delay={1340}>
            <span
              className="block gradient-text"
              style={{ fontSize: 'clamp(3.8rem,8vw,9rem)', fontWeight: 600, paddingBottom: '0.18em' }}
            >
              Parvathareddy.
            </span>
          </TextReveal>
        </h1>

        {/* Divider — draws across */}
        <div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(201,168,76,0.3) 0%, rgba(201,168,76,0.08) 60%, transparent 100%)',
            marginBottom: '3rem',
            transformOrigin: 'left',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'scaleX(1)' : 'scaleX(0)',
            transition: `opacity 0.4s ease ${delay(200)}, transform 1.1s cubic-bezier(0.65,0.05,0,1) ${delay(200)}`,
          }}
        />

        {/* Main grid: text left, photo right */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(28px)',
            transition: `opacity 0.9s ease ${delay(350)}, transform 0.9s cubic-bezier(0.65,0.05,0,1) ${delay(350)}`,
          }}
        >
          {/* Left */}
          <div>
            <p className="text-xl font-semibold text-ink leading-snug mb-1">
              Full stack engineer.
            </p>
            <p className="text-base leading-relaxed max-w-xl mb-10" style={{ color: '#5E5A54' }}>
              Database schema, API layer, React UI, Docker deployment — shipped as one working product, not isolated features.
            </p>

            {/* Stack rows */}
            <div className="space-y-3 mb-12">
              {stackRows.map(({ label, items }) => (
                <div key={label} className="flex items-center gap-0">
                  <span
                    className="font-mono uppercase shrink-0 mr-5"
                    style={{ fontSize: '9px', color: 'rgba(201,168,76,0.45)', letterSpacing: '0.2em', width: '68px' }}
                  >
                    {label}
                  </span>
                  {/* Separator */}
                  <div style={{ width: '1px', height: '14px', background: 'rgba(201,168,76,0.18)', marginRight: '16px', flexShrink: 0 }} />
                  <span className="font-mono text-xs" style={{ color: '#5E5A54' }}>{items}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                data-cursor="view"
                className="btn-magnetic group relative overflow-hidden px-7 py-3.5 text-sm font-bold"
                style={{ background: '#C9A84C', color: '#090907', letterSpacing: '0.02em' }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2"
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                    <path d="M1 11L11 1M11 1H4M11 1v7"/>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gold-bright opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              </a>
              <a
                href="https://github.com/satvikp29"
                target="_blank" rel="noopener noreferrer"
                className="btn-magnetic flex items-center gap-2 px-5 py-3.5 text-sm font-medium"
                style={{ border: '1px solid rgba(201,168,76,0.18)', color: '#EEE9E1', transition: 'border-color 0.4s ease, color 0.4s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)'; (e.currentTarget as HTMLElement).style.color = '#C9A84C' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.18)'; (e.currentTarget as HTMLElement).style.color = '#EEE9E1' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/satvik-reddyy/"
                target="_blank" rel="noopener noreferrer"
                className="btn-magnetic flex items-center gap-2 px-5 py-3.5 text-sm font-medium"
                style={{ border: '1px solid rgba(201,168,76,0.18)', color: '#EEE9E1', transition: 'border-color 0.4s ease, color 0.4s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)'; (e.currentTarget as HTMLElement).style.color = '#C9A84C' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.18)'; (e.currentTarget as HTMLElement).style.color = '#EEE9E1' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right: photo */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glow behind photo */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.14) 0%, transparent 68%)',
                  transform: 'scale(1.4)',
                  filter: 'blur(48px)',
                }}
              />

              <div
                ref={photoRef}
                className="relative overflow-hidden"
                style={{
                  border: '1px solid rgba(201,168,76,0.2)',
                  aspectRatio: '4/5',
                  transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
                  willChange: 'transform',
                }}
              >
                <Image
                  src="https://avatars.githubusercontent.com/satvikp29"
                  alt="Satvik Reddy Parvathareddy"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(9,9,7,0.35) 100%)' }}
                />
              </div>

              {/* Gold corner accents */}
              <div className="absolute -bottom-px -left-px w-12 h-px" style={{ background: '#C9A84C' }} />
              <div className="absolute -bottom-px -left-px w-px  h-12" style={{ background: '#C9A84C' }} />
              <div className="absolute -top-px  -right-px w-12 h-px" style={{ background: 'rgba(201,168,76,0.35)' }} />
              <div className="absolute -top-px  -right-px w-px  h-12" style={{ background: 'rgba(201,168,76,0.35)' }} />

              {/* Floating location badge */}
              <div
                className="absolute -bottom-5 left-0 px-3 py-1.5"
                style={{
                  background: '#0F0F0D',
                  border: '1px solid #1F1E1B',
                  animation: 'float 4.5s ease-in-out infinite',
                }}
              >
                <span className="font-mono uppercase" style={{ fontSize: '9px', color: '#5E5A54', letterSpacing: '0.2em' }}>Dallas, TX</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        style={{
          opacity: loaded ? 0.45 : 0,
          transition: `opacity 1s ease ${delay(600)}`,
        }}
      >
        <span className="font-mono uppercase" style={{ fontSize: '8px', letterSpacing: '0.3em', color: '#5E5A54' }}>Scroll</span>
        <div className="w-px h-10 overflow-hidden" style={{ background: '#1F1E1B' }}>
          <div
            className="w-full"
            style={{
              height: '45%',
              background: 'linear-gradient(180deg, #C9A84C, transparent)',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
