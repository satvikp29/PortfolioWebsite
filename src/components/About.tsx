'use client'

import { useEffect, useRef, useState } from 'react'
import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

const terminalLines = [
  { delay: 280,  prompt: true,  text: 'docker compose up --build', color: '' },
  { delay: 850,  prompt: false, text: '[+] Building 4/4',          color: '#3A3835' },
  { delay: 1050, prompt: false, text: ' ✔ api         built in 3.2s', color: '#3A7B3A' },
  { delay: 1280, prompt: false, text: ' ✔ web         built in 5.8s', color: '#3A7B3A' },
  { delay: 1450, prompt: false, text: ' ✔ db          ready',         color: '#3A7B3A' },
  { delay: 1580, prompt: false, text: ' ✔ nginx       ready',         color: '#3A7B3A' },
  { delay: 1870, prompt: false, text: 'api_1  | Uvicorn running on http://0.0.0.0:8000', color: '#4A4845' },
  { delay: 2070, prompt: false, text: 'web_1  | Ready on http://localhost:3000',          color: '#4A4845' },
  { delay: 2600, prompt: true,  text: 'curl localhost:8000/health', color: '' },
  { delay: 2980, prompt: false, text: '{"status":"ok","uptime":"3.1s","db":"connected"}', color: '#5E5A54' },
  { delay: 3500, prompt: true,  text: 'pytest tests/ -v --tb=short', color: '' },
  { delay: 3900, prompt: false, text: 'collected 24 items',            color: '#3A3835' },
  { delay: 4100, prompt: false, text: 'tests/test_routes.py    ........ [ 33%]', color: '#3A7B3A' },
  { delay: 4350, prompt: false, text: 'tests/test_models.py    ........ [ 66%]', color: '#3A7B3A' },
  { delay: 4600, prompt: false, text: 'tests/test_services.py  ........ [100%]', color: '#3A7B3A' },
  { delay: 4900, prompt: false, text: '24 passed in 1.42s · 0 warnings', color: '#3A7B3A' },
]

function AnimatedTerminal({ active }: { active: boolean }) {
  const [count, setCount] = useState(0)
  const started = useRef(false)
  const timers  = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    terminalLines.forEach((line, i) => {
      const t = setTimeout(() => setCount(i + 1), line.delay)
      timers.current.push(t)
    })
    return () => timers.current.forEach(clearTimeout)
  }, [active])

  return (
    <div style={{ background: '#080806', border: '1px solid #1A1916', overflow: 'hidden' }}>
      {/* Chrome bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 18px',
          borderBottom: '1px solid #1A1916',
          background: '#0C0C0A',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(201,168,76,0.6)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#222220' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#222220' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#2A2926', letterSpacing: '0.15em' }}>
          ~/project-root
        </span>
        <div style={{ width: '44px' }} />
      </div>

      {/* Terminal body */}
      <div style={{ padding: '20px 22px', minHeight: '300px' }}>
        {terminalLines.slice(0, count).map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              lineHeight: '1.9',
              color: line.color || (line.prompt ? '#888580' : '#3A3835'),
              animation: 'fadeIn 0.15s ease forwards',
            }}
          >
            {line.prompt && (
              <span style={{ color: '#C9A84C', marginRight: '8px' }}>$</span>
            )}
            <span style={{ color: line.prompt ? '#BBB5AD' : undefined }}>{line.text}</span>
          </div>
        ))}
        {count > 0 && count < terminalLines.length && (
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '14px',
              background: 'rgba(201,168,76,0.7)',
              animation: 'goldPulse 0.9s ease-in-out infinite',
              verticalAlign: 'middle',
              marginTop: '2px',
            }}
          />
        )}
        {count === terminalLines.length && (
          <div style={{ marginTop: '10px', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            <span style={{ color: '#C9A84C', marginRight: '8px' }}>$</span>
            <span
              style={{
                display: 'inline-block',
                width: '7px',
                height: '13px',
                background: 'rgba(201,168,76,0.5)',
                animation: 'goldPulse 1.5s ease-in-out infinite',
                verticalAlign: 'middle',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function About() {
  const termRef = useRef<HTMLDivElement>(null)
  const [termActive, setTermActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTermActive(true); observer.disconnect() } },
      { threshold: 0.25 }
    )
    const el = termRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-40 px-8 bg-bg" style={{ borderTop: '1px solid #1F1E1B' }}>
      <div className="max-w-6xl mx-auto">

        {/* Editorial statement — full width above the grid */}
        <FadeIn>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem' }}>
            01 / About
          </p>
        </FadeIn>

        <TextReveal delay={60}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(2.6rem, 5vw, 5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#EEE9E1',
              marginBottom: '1rem',
              fontOpticalSizing: 'auto',
            } as React.CSSProperties}
          >
            I own features
          </h2>
        </TextReveal>
        <TextReveal delay={120}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(2.6rem, 5vw, 5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #E8C46A 0%, #C9A84C 50%, #8A6D2C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '4rem',
              fontOpticalSizing: 'auto',
            } as React.CSSProperties}
          >
            start to finish.
          </h2>
        </TextReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left: text */}
          <div>
            <FadeIn delay={80}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  fontSize: '0.94rem',
                  lineHeight: '1.75',
                  color: '#5E5A54',
                  maxWidth: '440px',
                  marginBottom: '3rem',
                }}
              >
                <p>
                  I design the database schema, write the FastAPI routes, build the React UI, wire Docker Compose, and deploy — as one cohesive system. Not just code features in isolation.
                </p>
                <p>
                  Most of my projects involve LLMs in some meaningful way. Not just API wrappers — I've built evaluation frameworks, structured output pipelines, and context management systems that behave predictably under real load.
                </p>
                <p>
                  Looking for a backend or full stack role where I can own real features, ship fast, and learn from engineers who care about the fundamentals. Based in Dallas, TX and open to remote.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={160}>
              <div style={{ display: 'flex', gap: '24px' }}>
                {[
                  { label: 'GitHub', href: 'https://github.com/satvikp29' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/satvik-reddyy/' },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none' }}
                  >
                    <span style={{ borderBottom: '1px solid rgba(201,168,76,0.25)', paddingBottom: '2px' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderBottomColor = '#C9A84C'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(201,168,76,0.25)'}
                    >
                      {label}
                    </span>
                    <span style={{ transition: 'transform 0.3s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(2px,-2px)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)' }}
                    >↗</span>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right: animated terminal */}
          <FadeIn delay={100}>
            <div ref={termRef}>
              <AnimatedTerminal active={termActive} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
