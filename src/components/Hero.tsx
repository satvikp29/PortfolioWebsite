import TextReveal from './TextReveal'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid"
        style={{
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 100%)',
        }}
      />

      {/* Radial glow — deep gold */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pt-28 pb-20 w-full">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2.5 mb-10 px-3.5 py-1.5 rounded-full border"
          style={{
            borderColor: 'rgba(201,169,110,0.2)',
            background: 'rgba(201,169,110,0.05)',
            animation: 'fadeUp 0.7s cubic-bezier(0.65,0.05,0,1) forwards',
            opacity: 0,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold"
            style={{ animation: 'borderPulse 2.5s ease-in-out infinite' }} />
          <span className="text-xs text-gold tracking-widest uppercase font-medium">
            Open to entry-level roles
          </span>
        </div>

        {/* Name — serif, large, tight */}
        <h1 className="font-serif leading-none mb-2" style={{ letterSpacing: '-0.02em' }}>
          <TextReveal delay={80}>
            <span className="block text-[clamp(4rem,10vw,8.5rem)] font-semibold text-cream">
              Satvik Reddy
            </span>
          </TextReveal>
          <TextReveal delay={160}>
            <span className="block text-[clamp(4rem,10vw,8.5rem)] font-semibold gradient-text">
              Parvathareddy.
            </span>
          </TextReveal>
        </h1>

        {/* Role + description */}
        <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-16">
          <TextReveal delay={280}>
            <p className="text-xs tracking-widest uppercase text-gold font-medium">
              Python · TypeScript · React · FastAPI
            </p>
          </TextReveal>

          <TextReveal delay={360} className="max-w-md">
            <p className="text-muted leading-relaxed text-sm sm:text-base">
              I write Python backends and TypeScript frontends, containerize with Docker,
              and build AI integrations that actually work in practice.
            </p>
          </TextReveal>
        </div>

        {/* CTAs */}
        <div
          className="mt-12 flex flex-wrap gap-4"
          style={{
            animation: 'fadeUp 0.85s cubic-bezier(0.65,0.05,0,1) 480ms forwards',
            opacity: 0,
          }}
        >
          <a
            href="#projects"
            className="px-7 py-3 text-sm font-medium rounded text-bg hover:opacity-85 transition-opacity duration-500"
            style={{ background: 'linear-gradient(135deg, #E2C98A 0%, #C9A96E 100%)' }}
          >
            View Projects
          </a>
          <a
            href="https://github.com/satvikp29"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 border border-line text-cream text-sm rounded hover:border-gold-border hover:text-gold transition-all duration-500"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/satvikreddy"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 border border-line text-cream text-sm rounded hover:border-gold-border hover:text-gold transition-all duration-500"
          >
            LinkedIn ↗
          </a>
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
        <div className="w-8 h-px bg-gold/30" />
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
      </div>
    </section>
  )
}
