'use client'

import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

export default function Footer() {
  return (
    <footer id="contact" className="bg-bg overflow-hidden" style={{ borderTop: '1px solid #1F1E1B', paddingTop: '10rem', paddingBottom: '5rem', paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem' }}>
            04 / Contact
          </p>
        </FadeIn>

        {/* Big editorial heading */}
        <div style={{ marginBottom: '4rem' }}>
          <TextReveal delay={60}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 'clamp(4rem, 10vw, 10rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                color: '#EEE9E1',
                fontOpticalSizing: 'auto',
              } as React.CSSProperties}
            >
              Get in
            </h2>
          </TextReveal>
          <TextReveal delay={130}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 'clamp(4rem, 10vw, 10rem)',
                letterSpacing: '-0.04em',
                lineHeight: 0.88,
                background: 'linear-gradient(135deg, #E8C46A 0%, #C9A84C 50%, #8A6D2C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '2.5rem',
                fontOpticalSizing: 'auto',
              } as React.CSSProperties}
            >
              touch.
            </h2>
          </TextReveal>
        </div>

        <FadeIn delay={140}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', color: '#5E5A54', maxWidth: '420px', lineHeight: 1.75, marginBottom: '3.5rem' }}>
            Looking for entry-level engineering roles. I work across the full stack and pick things up fast. Message me on LinkedIn or look at my GitHub.
          </p>
        </FadeIn>

        <FadeIn delay={220}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <a
              href="https://www.linkedin.com/in/satvik-reddyy/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="btn-magnetic group"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 24px',
                border: '1px solid rgba(201,168,76,0.25)',
                background: 'rgba(201,168,76,0.06)',
                color: '#C9A84C',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'border-color 0.4s ease, background 0.4s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(201,168,76,0.5)'
                el.style.background  = 'rgba(201,168,76,0.1)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(201,168,76,0.25)'
                el.style.background  = 'rgba(201,168,76,0.06)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
              <span style={{ marginLeft: '2px', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translate(2px,-2px)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translate(0,0)'}
              >↗</span>
            </a>

            <a
              href="https://github.com/satvikp29"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="btn-magnetic group"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 24px',
                border: '1px solid #1F1E1B',
                background: 'transparent',
                color: '#EEE9E1',
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'border-color 0.4s ease, color 0.4s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(201,168,76,0.35)'
                el.style.color       = '#C9A84C'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#1F1E1B'
                el.style.color       = '#EEE9E1'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              View GitHub
              <span>↗</span>
            </a>
          </div>
        </FadeIn>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: '7rem',
            paddingTop: '2rem',
            borderTop: '1px solid #1F1E1B',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          className="sm:flex-row sm:items-center sm:justify-between"
        >
          <a
            href="#"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 600,
              letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg, #E8C46A 0%, #C9A84C 50%, #8A6D2C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textDecoration: 'none',
            }}
          >
            Satvik Reddy
          </a>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: '#2A2926', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
            © {new Date().getFullYear()} Satvik Reddy Parvathareddy  /  Dallas, TX
          </p>
        </div>
      </div>
    </footer>
  )
}
