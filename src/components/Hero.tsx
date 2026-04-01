import Image from 'next/image'
import TextReveal from './TextReveal'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg">

      {/* Very faint red glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(200,16,46,0.06) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 mb-10 px-3.5 py-1.5 rounded-full border"
              style={{
                borderColor: 'rgba(200,16,46,0.2)',
                background: 'rgba(200,16,46,0.05)',
                animation: 'fadeUp 0.7s cubic-bezier(0.65,0.05,0,1) forwards',
                opacity: 0,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-red"
                style={{ animation: 'borderPulse 2.5s ease-in-out infinite' }}
              />
              <span className="text-xs text-red tracking-widest uppercase font-medium">
                Dallas, TX · Open to Roles
              </span>
            </div>

            {/* Name — sized to never overflow left column */}
            <h1 className="font-serif leading-[0.92] mb-2" style={{ letterSpacing: '-0.02em' }}>
              <TextReveal delay={80}>
                <span className="block text-[clamp(2.2rem,4vw,4.5rem)] font-semibold text-ink">
                  Satvik Reddy
                </span>
              </TextReveal>
              <TextReveal delay={160}>
                <span className="block text-[clamp(2.2rem,4vw,4.5rem)] font-semibold gradient-text">
                  Parvathareddy.
                </span>
              </TextReveal>
            </h1>

            {/* Subtitle */}
            <div
              className="mt-8"
              style={{
                animation: 'fadeUp 0.85s cubic-bezier(0.65,0.05,0,1) 240ms forwards',
                opacity: 0,
              }}
            >
              <p className="text-xs tracking-widest uppercase text-red/70 font-medium mb-4">
                Python · TypeScript · React · FastAPI
              </p>
              <p className="text-muted leading-relaxed text-sm max-w-md">
                I write Python backends and TypeScript frontends, containerize with Docker,
                and build AI integrations that work in practice, not just in demos.
              </p>
            </div>

            {/* CTAs */}
            <div
              className="mt-10 flex flex-wrap gap-4"
              style={{
                animation: 'fadeUp 0.85s cubic-bezier(0.65,0.05,0,1) 380ms forwards',
                opacity: 0,
              }}
            >
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
                className="px-7 py-3 border border-line text-ink text-sm hover:border-red/40 hover:text-red transition-all duration-500"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/satvikreddy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3 border border-line text-ink text-sm hover:border-red/40 hover:text-red transition-all duration-500"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          {/* Right: photo */}
          <div
            className="hidden lg:flex items-center justify-center"
            style={{
              animation: 'fadeUp 0.85s cubic-bezier(0.65,0.05,0,1) 200ms forwards',
              opacity: 0,
            }}
          >
            <div className="relative">
              {/* Red glow behind */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(200,16,46,0.12) 0%, transparent 70%)',
                  transform: 'scale(1.15)',
                  filter: 'blur(28px)',
                }}
              />
              {/* Image */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(200,16,46,0.25)' }}
              >
                <Image
                  src="https://avatars.githubusercontent.com/satvikp29"
                  alt="Satvik Reddy Parvathareddy"
                  width={420}
                  height={420}
                  className="block"
                  priority
                />
                {/* Very light bottom fade so image blends into white bg */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, transparent 65%, rgba(250,250,248,0.3) 100%)' }}
                />
              </div>
              {/* Corner accent */}
              <div className="absolute -bottom-px -left-px w-16 h-px" style={{ background: '#C8102E' }} />
              <div className="absolute -bottom-px -left-px w-px h-16" style={{ background: '#C8102E' }} />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-8 flex items-center gap-3"
        style={{
          animation: 'fadeUp 0.85s cubic-bezier(0.65,0.05,0,1) 700ms forwards',
          opacity: 0,
        }}
      >
        <div className="w-8 h-px" style={{ background: 'rgba(200,16,46,0.35)' }} />
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  )
}
