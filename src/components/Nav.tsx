'use client'

import { useEffect, useState, useRef, useCallback } from 'react'

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack',    href: '#stack' },
  { label: 'Contact',  href: '#contact' },
]

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function useScramble(text: string, active: boolean) {
  const [display, setDisplay] = useState(text)
  const frame     = useRef(0)
  const iteration = useRef(0)

  const scramble = useCallback(() => {
    const total = text.length * 3
    if (iteration.current >= total) { setDisplay(text); return }
    setDisplay(
      text.split('').map((char, i) =>
        i < Math.floor(iteration.current / 3)
          ? char
          : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join('')
    )
    iteration.current++
    frame.current = requestAnimationFrame(scramble)
  }, [text])

  useEffect(() => {
    if (active) {
      iteration.current = 0
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(scramble)
    } else {
      cancelAnimationFrame(frame.current)
      setDisplay(text)
    }
    return () => cancelAnimationFrame(frame.current)
  }, [active, scramble, text])

  return display
}

function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  const displayed = useScramble(label.toUpperCase(), hovered)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: hovered ? '#C9A84C' : '#5E5A54',
        transition: 'color 0.3s ease',
        textDecoration: 'none',
      }}
    >
      {displayed}
    </a>
  )
}

export default function Nav() {
  const [scrolled,      setScrolled]      = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['about', 'projects', 'stack', 'contact']
    const obs: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach(o => o.disconnect())
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? 'rgba(9,9,7,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(150%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(31,30,27,0.8)' : '1px solid transparent',
        transition: 'background 0.8s cubic-bezier(0.65,0.05,0,1), border-color 0.8s cubic-bezier(0.65,0.05,0,1)',
      }}
    >
      <nav className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.35rem',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #E8C46A 0%, #C9A84C 50%, #8A6D2C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textDecoration: 'none',
          }}
        >
          SR
        </a>

        {/* Links */}
        <ul className="flex items-center gap-7" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map(link => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <li key={link.href} className="relative flex flex-col items-center gap-1">
                <NavLink label={link.label} href={link.href} />
                <div
                  className="w-1 h-1 rounded-full"
                  style={{
                    background: '#C9A84C',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scale(1)' : 'scale(0)',
                    transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                  }}
                />
              </li>
            )
          })}

          <li style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '20px', borderLeft: '1px solid #1F1E1B' }}>
            {[
              {
                href: 'https://github.com/satvikp29',
                label: 'GitHub',
                path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
              },
              {
                href: 'https://www.linkedin.com/in/satvikreddy',
                label: 'LinkedIn',
                path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
              },
            ].map(({ href, label, path }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color: '#5E5A54', transition: 'color 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5E5A54'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </li>
        </ul>
      </nav>
    </header>
  )
}
