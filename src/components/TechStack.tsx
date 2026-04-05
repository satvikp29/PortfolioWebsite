'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

const BrowserIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <path d="M2 9h20" />
    <circle cx="6" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="9.5" cy="6" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const NextjsIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.499-.054z" />
  </svg>
)

const FastAPIIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 0C5.375 0 0 5.375 0 12c0 6.626 5.375 12 12 12 6.626 0 12-5.374 12-12 0-6.625-5.374-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z" />
  </svg>
)

const PydanticIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L4 5.5v7c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9v-7L12 2z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)

const SQLAlchemyIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="8" ry="2.5" />
    <path d="M4 5v5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
    <path d="M4 10v5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-5" />
    <path d="M4 15v4c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-4" />
  </svg>
)

const PostgreSQLIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403C13.379.7 12.566 1.388 11.99 1.388c-.576 0-1.388-.688-2.383-.985A10.134 10.134 0 0 0 6.852 0C3.12 0 0 3.442 0 7.68c0 2.297.77 4.393 2.03 5.974.238.298.464.574.674.828.668.807 1.139 1.376 1.453 2.246.31.863.47 1.975.682 3.87.14 1.232.375 2.073.73 2.607.356.534.789.795 1.31.795.843 0 1.608-.738 2.256-1.437.648-.7 1.234-1.362 1.887-1.57.408-.13.878-.13 1.342-.13.464 0 .934 0 1.342.13.653.208 1.24.87 1.887 1.57.648.699 1.413 1.437 2.256 1.437.521 0 .954-.261 1.31-.795.355-.534.59-1.375.73-2.606.212-1.896.373-3.008.682-3.871.314-.87.785-1.439 1.453-2.246.21-.254.436-.53.674-.828 1.26-1.581 2.03-3.677 2.03-5.974C24 3.442 20.88 0 17.128 0zM9 15.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm6 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" />
  </svg>
)

const lifecycle = [
  { label: 'Browser',    note: 'Next.js SSR',       Icon: BrowserIcon },
  { label: 'API Route',  note: 'Server component',  Icon: NextjsIcon },
  { label: 'FastAPI',    note: 'Async handler',     Icon: FastAPIIcon },
  { label: 'Pydantic',   note: 'Validation',        Icon: PydanticIcon },
  { label: 'SQLAlchemy', note: 'ORM / raw SQL',     Icon: SQLAlchemyIcon },
  { label: 'PostgreSQL', note: 'Source of truth',   Icon: PostgreSQLIcon },
]

const columns = [
  {
    label: 'API Design',
    items: [
      { name: 'Auto-generated docs',   note: 'FastAPI generates OpenAPI from type annotations. The spec is always in sync because it comes from the code itself.' },
      { name: 'Async by default',      note: 'Route handlers are async throughout. asyncio.gather runs independent queries in parallel, not sequentially.' },
      { name: 'Typed response models', note: 'Every route declares its response model. FastAPI validates outgoing data the same way it validates incoming.' },
      { name: 'Structured errors',     note: 'Error responses follow a consistent shape. Clients never parse free-form strings to understand what failed.' },
    ],
  },
  {
    label: 'Type Safety',
    items: [
      { name: 'Pydantic as source of truth', note: 'Schema and validation live in one place. The model is the contract between the DB, the API, and the client.' },
      { name: 'Zod on the frontend',   note: 'API responses are validated at runtime before they touch React state. Type errors surface at the boundary.' },
      { name: 'TypeScript strict mode', note: 'No implicit any, no loose nulls. Types flow from Pydantic models through Zod to the UI layer without gaps.' },
      { name: 'Shared contracts',      note: 'Backend response shapes are mirrored as Zod schemas. If the API changes, the frontend type error tells you.' },
    ],
  },
  {
    label: 'Deployment',
    items: [
      { name: 'Docker Compose for everything', note: 'API, web, and database start with one command. Dev environment matches production exactly.' },
      { name: 'Healthchecks before startup', note: 'The API container waits for the database healthcheck to pass. No race conditions on cold start.' },
      { name: 'Vercel for the frontend', note: 'Deploys on every push to main. Preview URLs for every pull request. Zero config for Next.js.' },
      { name: 'Environment parity',    note: 'Same Compose file runs locally and in CI. No separate dev config to drift out of sync with production.' },
    ],
  },
]

export default function TechStack() {
  const [activeNode, setActiveNode] = useState<number | null>(null)

  return (
    <section id="stack" className="py-40 px-8 border-t border-line bg-bg">
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <p className="text-[10px] text-red tracking-[0.22em] uppercase mb-6 font-semibold">
            03 · Stack
          </p>
        </FadeIn>

        <TextReveal delay={60}>
          <h2
            className="font-serif font-semibold text-ink leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3rem,5.5vw,5.5rem)', letterSpacing: '-0.04em' }}
          >
            How I build
            <br />
            <span className="gradient-text">systems.</span>
          </h2>
        </TextReveal>

        <FadeIn delay={100}>
          <p className="text-muted text-sm leading-relaxed max-w-md mb-20">
            Every project follows the same request lifecycle. Each layer has a clear job and hands off with a typed contract.
          </p>
        </FadeIn>

        {/* Request lifecycle — interactive */}
        <FadeIn delay={120}>
          <div className="relative mb-24">
            {/* Connecting line */}
            <div
              className="absolute top-8 left-8 right-8 h-px hidden lg:block"
              style={{ background: 'linear-gradient(90deg, transparent, #D8D3CE 8%, #D8D3CE 92%, transparent)' }}
            />
            {/* Animated fill for active node */}
            {activeNode !== null && (
              <div
                className="absolute top-8 left-8 h-px hidden lg:block pointer-events-none"
                style={{
                  right: `calc(${(1 - activeNode / (lifecycle.length - 1)) * 100}% - 32px)`,
                  background: 'linear-gradient(90deg, transparent, #C8102E)',
                  transition: 'right 0.5s cubic-bezier(0.65,0.05,0,1)',
                }}
              />
            )}
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {lifecycle.map(({ label, note, Icon }, i) => {
                const isFirst = i === 0
                const isLast = i === lifecycle.length - 1
                const isActive = activeNode !== null && i <= activeNode
                return (
                  <div
                    key={label}
                    className="relative flex flex-col items-center text-center group"
                    onMouseEnter={() => setActiveNode(i)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <div
                      className="relative z-10 w-16 h-16 flex items-center justify-center mb-4 border transition-all duration-400"
                      style={{
                        background: isActive ? 'rgba(200,16,46,0.06)' : '#FAFAF8',
                        borderColor: isFirst || isLast || isActive
                          ? 'rgba(200,16,46,0.4)'
                          : '#E0DBD5',
                        color: isFirst || isLast || isActive ? '#C8102E' : '#8A8070',
                        transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                        boxShadow: isActive ? '0 8px 24px rgba(200,16,46,0.1)' : 'none',
                        transition: 'all 0.35s cubic-bezier(0.65,0.05,0,1)',
                      }}
                    >
                      <Icon />
                    </div>
                    <p
                      className="text-[11px] font-semibold mb-0.5 transition-colors duration-300"
                      style={{ color: isActive ? '#111' : '#444' }}
                    >
                      {label}
                    </p>
                    <p className="text-[10px] text-muted font-mono">{note}</p>
                    {i < lifecycle.length - 1 && (
                      <div className="absolute top-[30px] left-[calc(50%+36px)] text-dim text-[10px] hidden lg:block select-none">→</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>

        {/* 3-column callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {columns.map((col, ci) => (
            <FadeIn key={col.label} delay={ci * 80 + 140}>
              <div>
                <p className="text-[10px] text-red/65 tracking-[0.2em] uppercase font-semibold mb-6 pb-4 border-b border-line">
                  {col.label}
                </p>
                <div className="space-y-6">
                  {col.items.map((item) => (
                    <div key={item.name} className="group">
                      <p className="text-sm text-ink font-semibold mb-1.5 group-hover:text-red transition-colors duration-300">{item.name}</p>
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
