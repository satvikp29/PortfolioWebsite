import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

const pipeline = [
  { step: 'Schema', tool: 'PostgreSQL', icon: '⬡' },
  { step: 'API', tool: 'FastAPI', icon: '⬡' },
  { step: 'Types', tool: 'Zod', icon: '⬡' },
  { step: 'UI', tool: 'React', icon: '⬡' },
  { step: 'Container', tool: 'Docker', icon: '⬡' },
  { step: 'Deploy', tool: 'Vercel', icon: '⬡' },
]

const columns = [
  {
    label: 'Backend',
    items: [
      { name: 'FastAPI', note: 'Auto-generated OpenAPI docs, async by default, Pydantic validation throughout.' },
      { name: 'PostgreSQL', note: 'Relational data with proper indexes. SQLite for lighter projects where joins stay simple.' },
      { name: 'Pydantic', note: 'Schema and validation in one place. The models are the source of truth.' },
      { name: 'SQLAlchemy', note: 'ORM for complex queries. Raw SQL when the ORM gets in the way.' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js', note: 'App router, server components where possible. Client components only when state is required.' },
      { name: 'TypeScript', note: 'Strict mode. Types flow from the Pydantic models through Zod to the UI layer.' },
      { name: 'Tailwind CSS', note: 'Utility first. No context switching between style files and markup.' },
      { name: 'Zod', note: 'Runtime validation on form inputs and API responses. Pairs well with React Hook Form.' },
    ],
  },
  {
    label: 'Infrastructure',
    items: [
      { name: 'Docker', note: 'Every project ships with a Compose file. Dev environment matches production exactly.' },
      { name: 'Docker Compose', note: 'API, web, and database all start with one command. No local setup docs needed.' },
      { name: 'Vercel', note: 'Front end deploys on every push to main. Preview URLs for every PR.' },
      { name: 'Git', note: 'Feature branches, pull request reviews, and clear commit messages. Nothing fancy.' },
    ],
  },
]

export default function TechStack() {
  return (
    <section id="stack" className="py-32 px-8 border-t border-line bg-bg">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <p className="text-xs text-red tracking-widest uppercase mb-4 font-medium">
            03 · Stack
          </p>
        </FadeIn>

        <TextReveal delay={60}>
          <h2
            className="font-serif text-[clamp(2.6rem,5vw,4rem)] font-semibold text-ink leading-none mb-16"
            style={{ letterSpacing: '-0.02em' }}
          >
            How a feature goes
            <br />
            <span className="gradient-text">to production.</span>
          </h2>
        </TextReveal>

        {/* Pipeline */}
        <FadeIn delay={100}>
          <div className="relative mb-20">
            <div
              className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 hidden lg:block"
              style={{ background: 'linear-gradient(90deg, transparent, #E0DBD5 10%, #E0DBD5 90%, transparent)' }}
            />
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {pipeline.map((item, i) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  <div
                    className="relative z-10 w-14 h-14 flex items-center justify-center mb-3 rounded-full border border-line bg-surface"
                    style={{
                      boxShadow: i === 0 || i === pipeline.length - 1
                        ? '0 0 0 1px rgba(200,16,46,0.15)'
                        : undefined,
                    }}
                  >
                    <span className="text-red/50 text-lg">{item.icon}</span>
                  </div>
                  <p className="text-xs text-ink font-medium mb-0.5">{item.step}</p>
                  <p className="text-xs text-muted font-mono">{item.tool}</p>
                  {i < pipeline.length - 1 && (
                    <div className="absolute top-7 left-[calc(50%+28px)] text-dim text-xs hidden lg:block">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* 3-column callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col, ci) => (
            <FadeIn key={col.label} delay={ci * 80 + 120}>
              <div>
                <p className="text-xs text-red/70 tracking-widest uppercase font-medium mb-5 pb-3 border-b border-line">
                  {col.label}
                </p>
                <div className="space-y-5">
                  {col.items.map((item) => (
                    <div key={item.name}>
                      <p className="text-sm text-ink font-medium mb-1">{item.name}</p>
                      <p className="text-xs text-muted leading-relaxed">{item.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
