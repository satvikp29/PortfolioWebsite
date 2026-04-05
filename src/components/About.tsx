'use client'

import { useEffect, useRef, useState } from 'react'
import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

const terminalLines = [
  { delay: 300,  prompt: true,  text: 'docker compose up --build' },
  { delay: 900,  prompt: false, text: '[+] Building 4/4' },
  { delay: 1100, prompt: false, text: ' ✔ api         built in 3.2s', color: '#2A7B2A' },
  { delay: 1350, prompt: false, text: ' ✔ web         built in 5.8s', color: '#2A7B2A' },
  { delay: 1550, prompt: false, text: ' ✔ db          ready', color: '#2A7B2A' },
  { delay: 1700, prompt: false, text: ' ✔ nginx       ready', color: '#2A7B2A' },
  { delay: 2000, prompt: false, text: 'api_1  | Uvicorn running on http://0.0.0.0:8000', color: '#666' },
  { delay: 2200, prompt: false, text: 'web_1  | Ready on http://localhost:3000', color: '#666' },
  { delay: 2700, prompt: true,  text: 'curl localhost:8000/health' },
  { delay: 3100, prompt: false, text: '{"status":"ok","uptime":"3.1s","db":"connected"}', color: '#555' },
  { delay: 3600, prompt: true,  text: 'pytest tests/ -v --tb=short' },
  { delay: 4000, prompt: false, text: 'collected 24 items' },
  { delay: 4200, prompt: false, text: 'tests/test_routes.py    ........ [ 33%]', color: '#2A7B2A' },
  { delay: 4450, prompt: false, text: 'tests/test_models.py    ........ [ 66%]', color: '#2A7B2A' },
  { delay: 4700, prompt: false, text: 'tests/test_services.py  ........ [100%]', color: '#2A7B2A' },
  { delay: 5000, prompt: false, text: '24 passed in 1.42s · 0 warnings', color: '#2A7B2A' },
]

function AnimatedTerminal({ active }: { active: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const started = useRef(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    if (!active || started.current) return
    started.current = true

    terminalLines.forEach((line, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), line.delay)
      timers.current.push(t)
    })
    return () => timers.current.forEach(clearTimeout)
  }, [active])

  return (
    <div className="rounded-none overflow-hidden" style={{ background: '#0C0C0C', border: '1px solid #1A1A1A' }}>
      {/* Chrome */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b"
        style={{ borderColor: '#1A1A1A', background: '#141414' }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#C8102E', opacity: 0.8 }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2A2A2A' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2A2A2A' }} />
        </div>
        <span className="text-[10px] font-mono tracking-widest" style={{ color: '#3A3A3A' }}>~/project-root</span>
        <div style={{ width: '44px' }} />
      </div>

      <div className="p-6 min-h-[320px]" style={{ scrollbarWidth: 'none' }}>
        {terminalLines.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className="text-[11px] font-mono leading-[1.85]"
            style={{
              color: line.color || (line.prompt ? '#888' : '#444'),
              animation: 'fadeIn 0.2s ease forwards',
            }}
          >
            {line.prompt && (
              <span style={{ color: '#C8102E', marginRight: '8px' }}>$</span>
            )}
            <span style={{ color: line.prompt ? '#AAA' : undefined }}>
              {line.text}
            </span>
          </div>
        ))}
        {/* Blinking cursor */}
        {visibleCount > 0 && visibleCount < terminalLines.length && (
          <span
            className="inline-block w-2 h-3 ml-1 align-middle"
            style={{
              background: '#C8102E',
              animation: 'borderPulse 1s ease-in-out infinite',
              opacity: 0.8,
            }}
          />
        )}
        {visibleCount === terminalLines.length && (
          <div className="mt-3" style={{ color: '#C8102E', fontSize: '11px', fontFamily: 'var(--font-dm-mono)' }}>
            <span style={{ color: '#3A3A3A' }}>$ </span>
            <span style={{ animation: 'borderPulse 1.5s ease-in-out infinite', display: 'inline-block' }}>▊</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function About() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminalActive, setTerminalActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTerminalActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    const el = terminalRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-40 px-8 border-t border-line bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

          {/* Left */}
          <div>
            <FadeIn>
              <p className="text-[10px] text-red tracking-[0.22em] uppercase mb-6 font-semibold">01 · About</p>
            </FadeIn>

            <TextReveal delay={60}>
              <h2
                className="font-serif font-semibold text-ink leading-[0.92] mb-10"
                style={{ fontSize: 'clamp(3rem,5.5vw,5.5rem)', letterSpacing: '-0.04em' }}
              >
                I own features<br />
                <span className="gradient-text">start to finish.</span>
              </h2>
            </TextReveal>

            <FadeIn delay={140}>
              <div className="space-y-5 text-muted leading-relaxed text-[0.95rem] mb-12 max-w-md">
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

            <FadeIn delay={220}>
              <div className="flex gap-5">
                <a
                  href="https://github.com/satvikp29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-[11px] tracking-[0.2em] uppercase text-red font-semibold flex items-center gap-1.5"
                >
                  <span className="border-b border-red/25 pb-0.5 group-hover:border-red transition-colors duration-400">GitHub</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/satvikreddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-[11px] tracking-[0.2em] uppercase text-red font-semibold flex items-center gap-1.5"
                >
                  <span className="border-b border-red/25 pb-0.5 group-hover:border-red transition-colors duration-400">LinkedIn</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: animated terminal */}
          <FadeIn delay={100}>
            <div ref={terminalRef}>
              <AnimatedTerminal active={terminalActive} />
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
