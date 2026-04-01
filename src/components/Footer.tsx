import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line py-40 px-8 bg-bg">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <p className="text-[10px] text-red tracking-[0.22em] uppercase mb-6 font-medium">
            04 · Contact
          </p>
        </FadeIn>

        <TextReveal delay={60}>
          <h2
            className="font-serif font-semibold text-ink leading-[0.92] mb-10"
            style={{ fontSize: 'clamp(3.2rem,6.5vw,6rem)', letterSpacing: '-0.04em' }}
          >
            Get in touch.
          </h2>
        </TextReveal>

        <FadeIn delay={180}>
          <p className="text-muted text-[0.95rem] max-w-md leading-relaxed mb-14">
            Looking for entry-level engineering roles. I work across the full stack and
            pick things up fast. Message me on LinkedIn or look at my GitHub.
          </p>
        </FadeIn>

        <FadeIn delay={260}>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/in/satvikreddy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 border text-sm hover:bg-red/5 hover:border-red/35 transition-all duration-500"
              style={{ borderColor: 'rgba(200,16,46,0.22)', color: '#C8102E', background: 'rgba(200,16,46,0.04)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn
            </a>
            <a
              href="https://github.com/satvikp29"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3.5 border border-line text-ink text-sm hover:border-red/30 hover:text-red transition-all duration-500"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              View GitHub
            </a>
          </div>
        </FadeIn>

        <div className="mt-28 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <a href="#" className="font-serif gradient-text font-semibold tracking-wide" style={{ fontSize: '1.2rem' }}>
            Satvik Reddy
          </a>
          <p className="text-[10px] text-dim tracking-widest uppercase">
            © {new Date().getFullYear()} Satvik Reddy Parvathareddy · Dallas, TX
          </p>
        </div>
      </div>
    </footer>
  )
}
