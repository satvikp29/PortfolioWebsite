import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

/* ── Pipeline step logos ────────────────────────── */
const PgLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403C13.379.7 12.566 1.388 11.99 1.388c-.576 0-1.388-.688-2.383-.985A10.134 10.134 0 0 0 6.852 0C3.12 0 0 3.442 0 7.68c0 2.297.77 4.393 2.03 5.974.238.298.464.574.674.828.668.807 1.139 1.376 1.453 2.246.31.863.47 1.975.682 3.87.14 1.232.375 2.073.73 2.607.356.534.789.795 1.31.795.843 0 1.608-.738 2.256-1.437.648-.7 1.234-1.362 1.887-1.57.408-.13.878-.13 1.342-.13.464 0 .934 0 1.342.13.653.208 1.24.87 1.887 1.57.648.699 1.413 1.437 2.256 1.437.521 0 .954-.261 1.31-.795.355-.534.59-1.375.73-2.606.212-1.896.373-3.008.682-3.871.314-.87.785-1.439 1.453-2.246.21-.254.436-.53.674-.828 1.26-1.581 2.03-3.677 2.03-5.974C24 3.442 20.88 0 17.128 0zM9 15.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm6 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z"/>
  </svg>
)

const FastAPILogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 0C5.375 0 0 5.375 0 12c0 6.626 5.375 12 12 12 6.626 0 12-5.374 12-12 0-6.625-5.374-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z"/>
  </svg>
)

const ZodLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M3 5h18v2.4L8.143 17H21v2H3v-2.4L15.857 7H3V5z"/>
  </svg>
)

const ReactLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <circle cx="12" cy="12" r="2.139"/>
    <path d="M12 6.5c5.523 0 10 2.462 10 5.5s-4.477 5.5-10 5.5S2 15.038 2 12s4.477-5.5 10-5.5zm0 1c-4.971 0-9 2.015-9 4.5s4.029 4.5 9 4.5 9-2.015 9-4.5-4.029-4.5-9-4.5z"/>
    <path d="M6.205 7.072c2.76-4.78 6.586-7.565 8.535-6.22 1.95 1.344.978 6.37-1.783 11.15C10.196 16.78 6.37 19.565 4.42 18.22 2.47 16.876 3.444 11.85 6.205 7.072zm.866.5C4.703 11.025 3.92 15.456 5.286 16.39c1.365.942 4.87-1.587 7.235-5.56 2.365-3.972 2.948-8.252 1.583-9.192-1.365-.94-4.718 1.96-7.033 5.934z"/>
    <path d="M6.205 16.928C3.444 12.15 2.47 7.124 4.42 5.78c1.95-1.344 5.775 1.441 8.536 6.22 2.76 4.78 3.733 9.807 1.783 11.15-1.95 1.345-5.775-1.44-8.534-6.22zm.866-.5c2.315 3.973 5.668 6.874 7.033 5.933 1.365-.94.782-5.22-1.583-9.19-2.365-3.973-5.87-6.503-7.235-5.561-1.366.94-.548 5.372 1.785 8.818z"/>
  </svg>
)

const DockerLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/>
  </svg>
)

const VercelLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M24 22.525H0l12-21.05 12 21.05z"/>
  </svg>
)

const pipeline = [
  { step: 'Schema',    tool: 'PostgreSQL', Logo: PgLogo },
  { step: 'API',       tool: 'FastAPI',    Logo: FastAPILogo },
  { step: 'Types',     tool: 'Zod',        Logo: ZodLogo },
  { step: 'UI',        tool: 'React',      Logo: ReactLogo },
  { step: 'Container', tool: 'Docker',     Logo: DockerLogo },
  { step: 'Deploy',    tool: 'Vercel',     Logo: VercelLogo },
]

const columns = [
  {
    label: 'Backend',
    items: [
      { name: 'FastAPI',      note: 'Auto-generated OpenAPI docs, async by default, Pydantic validation throughout.' },
      { name: 'PostgreSQL',   note: 'Relational data with proper indexes. SQLite for lighter projects where joins stay simple.' },
      { name: 'Pydantic',     note: 'Schema and validation in one place. The models are the source of truth.' },
      { name: 'SQLAlchemy',   note: 'ORM for complex queries. Raw SQL when the ORM gets in the way.' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'Next.js',      note: 'App router, server components where possible. Client components only when state is required.' },
      { name: 'TypeScript',   note: 'Strict mode. Types flow from the Pydantic models through Zod to the UI layer.' },
      { name: 'Tailwind CSS', note: 'Utility first. No context switching between style files and markup.' },
      { name: 'Zod',          note: 'Runtime validation on form inputs and API responses. Pairs well with React Hook Form.' },
    ],
  },
  {
    label: 'Infrastructure',
    items: [
      { name: 'Docker',         note: 'Every project ships with a Compose file. Dev environment matches production exactly.' },
      { name: 'Docker Compose', note: 'API, web, and database all start with one command. No local setup docs needed.' },
      { name: 'Vercel',         note: 'Front end deploys on every push to main. Preview URLs for every PR.' },
      { name: 'Git',            note: 'Feature branches, pull request reviews, and clear commit messages. Nothing fancy.' },
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
            {/* Connecting line */}
            <div
              className="absolute top-7 left-0 right-0 h-px hidden lg:block"
              style={{ background: 'linear-gradient(90deg, transparent, #E0DBD5 10%, #E0DBD5 90%, transparent)' }}
            />
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {pipeline.map((item, i) => (
                <div key={item.step} className="relative flex flex-col items-center text-center">
                  <div
                    className="relative z-10 w-14 h-14 flex items-center justify-center mb-3 rounded-full border bg-bg"
                    style={{
                      borderColor: i === 0 || i === pipeline.length - 1 ? 'rgba(200,16,46,0.35)' : '#E0DBD5',
                      color: i === 0 || i === pipeline.length - 1 ? '#C8102E' : '#8A8070',
                    }}
                  >
                    <item.Logo />
                  </div>
                  <p className="text-xs text-ink font-medium mb-0.5">{item.step}</p>
                  <p className="text-xs text-muted font-mono">{item.tool}</p>
                  {i < pipeline.length - 1 && (
                    <div className="absolute top-[26px] left-[calc(50%+30px)] text-dim text-xs hidden lg:block select-none">→</div>
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
