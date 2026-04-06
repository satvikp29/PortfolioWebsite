'use client'

import { useState } from 'react'
import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

const BrowserIcon    = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 9h20"/><circle cx="6" cy="6" r="1" fill="currentColor" stroke="none"/><circle cx="9.5" cy="6" r="1" fill="currentColor" stroke="none"/></svg>
const NextjsIcon     = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.499-.054z"/></svg>
const FastAPIIcon    = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 0C5.375 0 0 5.375 0 12c0 6.626 5.375 12 12 12 6.626 0 12-5.374 12-12 0-6.625-5.374-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z"/></svg>
const PydanticIcon   = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L4 5.5v7c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9v-7L12 2z"/><path d="M9 12l2 2 4-4"/></svg>
const SQLAlchemyIcon = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="2.5"/><path d="M4 5v5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5"/><path d="M4 10v5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-5"/><path d="M4 15v4c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-4"/></svg>
const PostgreSQLIcon = () => <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M17.128 0a10.134 10.134 0 0 0-2.755.403C13.379.7 12.566 1.388 11.99 1.388c-.576 0-1.388-.688-2.383-.985A10.134 10.134 0 0 0 6.852 0C3.12 0 0 3.442 0 7.68c0 2.297.77 4.393 2.03 5.974.238.298.464.574.674.828.668.807 1.139 1.376 1.453 2.246.31.863.47 1.975.682 3.87.14 1.232.375 2.073.73 2.607.356.534.789.795 1.31.795.843 0 1.608-.738 2.256-1.437.648-.7 1.234-1.362 1.887-1.57.408-.13.878-.13 1.342-.13.464 0 .934 0 1.342.13.653.208 1.24.87 1.887 1.57.648.699 1.413 1.437 2.256 1.437.521 0 .954-.261 1.31-.795.355-.534.59-1.375.73-2.606.212-1.896.373-3.008.682-3.871.314-.87.785-1.439 1.453-2.246.21-.254.436-.53.674-.828 1.26-1.581 2.03-3.677 2.03-5.974C24 3.442 20.88 0 17.128 0zM9 15.5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm6 0c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z"/></svg>

const lifecycle = [
  { label: 'Browser',    note: 'Next.js SSR',     Icon: BrowserIcon    },
  { label: 'API Route',  note: 'Server component', Icon: NextjsIcon     },
  { label: 'FastAPI',    note: 'Async handler',   Icon: FastAPIIcon    },
  { label: 'Pydantic',   note: 'Validation',      Icon: PydanticIcon   },
  { label: 'SQLAlchemy', note: 'ORM / raw SQL',   Icon: SQLAlchemyIcon },
  { label: 'PostgreSQL', note: 'Source of truth', Icon: PostgreSQLIcon },
]

const columns = [
  {
    label: 'API Design',
    items: [
      { name: 'Auto-generated docs',    note: 'FastAPI generates OpenAPI from type annotations. The spec is always in sync because it comes from the code itself.' },
      { name: 'Async by default',       note: 'Route handlers are async throughout. asyncio.gather runs independent queries in parallel, not sequentially.' },
      { name: 'Typed response models',  note: 'Every route declares its response model. FastAPI validates outgoing data the same way it validates incoming.' },
      { name: 'Structured errors',      note: 'Error responses follow a consistent shape. Clients never parse free-form strings to understand what failed.' },
    ],
  },
  {
    label: 'Type Safety',
    items: [
      { name: 'Pydantic as source of truth', note: 'Schema and validation live in one place. The model is the contract between the DB, the API, and the client.' },
      { name: 'Zod on the frontend',    note: 'API responses are validated at runtime before they touch React state. Type errors surface at the boundary.' },
      { name: 'TypeScript strict mode', note: 'No implicit any, no loose nulls. Types flow from Pydantic models through Zod to the UI layer without gaps.' },
      { name: 'Shared contracts',       note: 'Backend response shapes are mirrored as Zod schemas. If the API changes, the frontend type error tells you.' },
    ],
  },
  {
    label: 'Deployment',
    items: [
      { name: 'Docker Compose for everything', note: 'API, web, and database start with one command. Dev environment matches production exactly.' },
      { name: 'Healthchecks before startup',   note: 'The API container waits for the database healthcheck to pass. No race conditions on cold start.' },
      { name: 'Vercel for the frontend',       note: 'Deploys on every push to main. Preview URLs for every pull request. Zero config for Next.js.' },
      { name: 'Environment parity',            note: 'Same Compose file runs locally and in CI. No separate dev config to drift out of sync with production.' },
    ],
  },
]

export default function TechStack() {
  const [activeNode, setActiveNode] = useState<number | null>(null)

  return (
    <section id="stack" className="py-40 px-8 bg-bg" style={{ borderTop: '1px solid #1F1E1B' }}>
      <div className="max-w-6xl mx-auto">

        <FadeIn>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '2rem' }}>
            03 / Stack
          </p>
        </FadeIn>

        <TextReveal delay={60}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: '#EEE9E1',
              marginBottom: '6px',
              fontOpticalSizing: 'auto',
            } as React.CSSProperties}
          >
            How I build
          </h2>
        </TextReveal>
        <TextReveal delay={110}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              background: 'linear-gradient(135deg, #E8C46A 0%, #C9A84C 50%, #8A6D2C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1.5rem',
            } as React.CSSProperties}
          >
            systems.
          </h2>
        </TextReveal>

        <FadeIn delay={100}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.875rem', color: '#5E5A54', lineHeight: 1.75, maxWidth: '420px', marginBottom: '5rem' }}>
            Every project follows the same request lifecycle. Each layer has a clear job and hands off with a typed contract.
          </p>
        </FadeIn>

        {/* Request lifecycle — interactive with animated data flow */}
        <FadeIn delay={120}>
          <div style={{ position: 'relative', marginBottom: '5rem' }}>

            {/* Connector track */}
            <div
              className="hidden lg:block"
              style={{
                position: 'absolute',
                top: '32px',
                left: 'calc(100% / 12)',
                right: 'calc(100% / 12)',
                height: '1px',
                background: '#1F1E1B',
                overflow: 'hidden',
              }}
            >
              {/* Animated data-flow particle */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '32px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)',
                  animation: 'dataFlow 2.8s ease-in-out infinite',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
              className="lg:grid lg:grid-cols-6">
              {lifecycle.map(({ label, note, Icon }, i) => {
                const isFirst  = i === 0
                const isLast   = i === lifecycle.length - 1
                const isActive = activeNode !== null && i <= activeNode
                return (
                  <div
                    key={label}
                    className="relative flex flex-col items-center text-center"
                    onMouseEnter={() => setActiveNode(i)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <div
                      style={{
                        position: 'relative',
                        zIndex: 10,
                        width: '64px',
                        height: '64px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '12px',
                        border: `1px solid ${isFirst || isLast || isActive ? 'rgba(201,168,76,0.35)' : '#1F1E1B'}`,
                        background: isActive ? 'rgba(201,168,76,0.05)' : '#090907',
                        color: isFirst || isLast || isActive ? '#C9A84C' : '#3A3835',
                        transform: isActive ? 'translateY(-3px)' : 'translateY(0)',
                        boxShadow: isActive ? '0 8px 32px rgba(201,168,76,0.1), 0 0 0 1px rgba(201,168,76,0.08)' : 'none',
                        transition: 'all 0.35s cubic-bezier(0.65,0.05,0,1)',
                      }}
                    >
                      <Icon />
                    </div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, color: isActive ? '#EEE9E1' : '#3A3835', marginBottom: '2px', transition: 'color 0.3s ease' }}>
                      {label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#2A2926' }}>{note}</p>

                    {i < lifecycle.length - 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '30px',
                          left: 'calc(50% + 38px)',
                          fontSize: '10px',
                          color: '#2A2926',
                          display: 'none',
                        }}
                        className="lg:block"
                      >
                        →
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </FadeIn>

        {/* 3-column callouts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '40px' }}
          className="md:grid-cols-3">
          {columns.map((col, ci) => (
            <FadeIn key={col.label} delay={ci * 80 + 140}>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '9px',
                    color: 'rgba(201,168,76,0.4)',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    marginBottom: '24px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #1F1E1B',
                  }}
                >
                  {col.label}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  {col.items.map(item => (
                    <div key={item.name}
                      onMouseEnter={e => (e.currentTarget.querySelector('p:first-child') as HTMLElement).style.color = '#C9A84C'}
                      onMouseLeave={e => (e.currentTarget.querySelector('p:first-child') as HTMLElement).style.color = '#BBB5AD'}
                    >
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 600, color: '#BBB5AD', marginBottom: '6px', transition: 'color 0.3s ease' }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#3A3835', lineHeight: 1.7 }}>
                        {item.note}
                      </p>
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
