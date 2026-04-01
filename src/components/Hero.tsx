import Image from 'next/image'
import TextReveal from './TextReveal'

const stackRows = [
  { label: 'Backend',  items: 'FastAPI  ·  Python  ·  PostgreSQL  ·  SQLAlchemy' },
  { label: 'Frontend', items: 'Next.js  ·  React  ·  TypeScript  ·  Tailwind' },
  { label: 'Infra',    items: 'Docker  ·  Vercel  ·  Git  ·  REST APIs' },
]

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg">

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(200,16,46,0.055) 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(200,16,46,0.025) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-28 pb-20 w-full">

        {/* Location badge */}
        <div
          className="inline-flex items-center gap-2.5 mb-12 px-3.5 py-1.5 rounded-full border"
          style={{
            borderColor: 'rgba(200,16,46,0.18)',
            background: 'rgba(200,16,46,0.04)',
            animation: 'fadeUp 0.65s cubic-bezier(0.65,0.05,0,1) forwards',
            opacity: 0,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red" style={{ animation: 'borderPulse 2.5s ease-in-out infinite' }} />
          <span className="text-[10px] text-red tracking-[0.22em] uppercase font-medium">Dallas, TX · Open to Roles</span>
        </div>

        {/* Monument name — full width */}
        <h1
          className="font-serif leading-[0.88] mb-10"
          style={{ letterSpacing: '-0.04em' }}
        >
          <TextReveal delay={60}>
            <span
              className="block text-ink"
              style={{ fontSize: 'clamp(3.5rem,7vw,7.5rem)', fontWeight: 600 }}
            >
              Satvik Reddy
            </span>
          </TextReveal>
          <TextReveal delay={130}>
            <span
              className="block gradient-text"
              style={{ fontSize: 'clamp(3.5rem,7vw,7.5rem)', fontWeight: 600 }}
            >
              Parvathareddy.
            </span>
          </TextReveal>
        </h1>

        {/* Divider */}
        <div
          className="w-full h-px bg-line mb-12"
          style={{ animation: 'fadeUp 0.85s cubic-bezier(0.65,0.05,0,1) 200ms forwards', opacity: 0 }}
        />

        {/* Below the name: descriptor + stack + CTAs left / photo right */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start"
          style={{ animation: 'fadeUp 0.85s cubic-bezier(0.65,0.05,0,1) 280ms forwards', opacity: 0 }}
        >
          {/* Left */}
          <div>
            <p className="text-xl text-ink font-medium leading-snug mb-1">
              Full stack engineer.
            </p>
            <p className="text-base text-muted leading-relaxed max-w-xl mb-10">
              Database schema, API layer, React UI, Docker deployment — shipped as one working product, not isolated features.
            </p>

            {/* Stack breakdown */}
            <div className="space-y-2.5 mb-12 pl-4 border-l-2 border-red/20">
              {stackRows.map(({ label, items }) => (
                <div key={label} className="flex items-baseline gap-4">
                  <span className="text-[10px] text-red/55 font-mono uppercase tracking-[0.18em] w-16 shrink-0">{label}</span>
                  <span className="text-xs text-muted font-mono">{items}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="px-7 py-3 text-sm font-medium text-white hover:opacity-85 transition-opacity duration-500"
                style={{ background: '#C8102E' }}
              >
                View Projects
              </a>
              <a
                href="https://github.com/satvikp29"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 border border-line text-ink text-sm hover:border-red/40 hover:text-red transition-all duration-500"
              >
                <GithubIcon />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/satvikreddy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 border border-line text-ink text-sm hover:border-red/40 hover:text-red transition-all duration-500"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right: photo — portrait crop */}
          <div className="hidden lg:block">
            <div className="relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(200,16,46,0.12) 0%, transparent 70%)',
                  transform: 'scale(1.25)',
                  filter: 'blur(36px)',
                }}
              />
              <div
                className="relative overflow-hidden"
                style={{
                  border: '1px solid rgba(200,16,46,0.22)',
                  aspectRatio: '4/5',
                }}
              >
                <Image
                  src="https://avatars.githubusercontent.com/satvikp29"
                  alt="Satvik Reddy Parvathareddy"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 55%, rgba(250,250,248,0.2) 100%)' }}
                />
              </div>
              {/* Red corner accents */}
              <div className="absolute -bottom-px -left-px w-14 h-px" style={{ background: '#C8102E' }} />
              <div className="absolute -bottom-px -left-px w-px h-14" style={{ background: '#C8102E' }} />
              <div className="absolute -top-px -right-px w-14 h-px" style={{ background: 'rgba(200,16,46,0.3)' }} />
              <div className="absolute -top-px -right-px w-px h-14" style={{ background: 'rgba(200,16,46,0.3)' }} />
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
