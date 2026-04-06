'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import { highlight } from '@/lib/highlight'

const projects = [
  {
    index: '01',
    name: 'CareerCompass',
    tagline: 'AI career guidance platform',
    impact: 'Scores job postings against a resume in real time — so job seekers stop applying blind.',
    arch: ['Next.js', 'FastAPI', 'OpenAI', 'PostgreSQL'],
    decisions: [
      { id: '01', label: 'asyncio.gather',    detail: 'All job scoring runs in parallel. One await instead of a sequential loop — latency drops with scale.' },
      { id: '02', label: 'Pydantic as contract', detail: 'Same model used for DB validation and as the structured output spec sent to OpenAI.' },
      { id: '03', label: 'tsvector index',    detail: 'Postgres full-text search on job titles and descriptions. No Elasticsearch needed.' },
    ],
    github: 'https://github.com/satvikp29/CareerCompass',
    filename: 'routes/jobs.py',
    note: '// async · typed · 24 tests passing',
    lang: 'python' as const,
    code: `@router.post("/match")
async def match_jobs(
    profile: UserProfile,
    db: Session = Depends(get_db)
) -> list[JobMatch]:
    jobs = await fetch_active_jobs(db)

    # Score each job against the user profile
    matches = await asyncio.gather(*[
        score_job_match(profile, job)
        for job in jobs
    ])
    return sorted(
        matches,
        key=lambda m: m.score,
        reverse=True
    )`,
  },
  {
    index: '02',
    name: 'EvaluateAI',
    tagline: 'LLM evaluation platform',
    impact: 'Run test cases across multiple models at once. GPT-4o judges every response on accuracy, relevance, and hallucination risk.',
    arch: ['Next.js', 'FastAPI', 'OpenAI', 'SQLite'],
    decisions: [
      { id: '01', label: 'LLM-as-judge',   detail: 'GPT-4o evaluates with response_format: json_object — scores are structured, not free-form text.' },
      { id: '02', label: 'Parallel eval',  detail: 'All model calls run concurrently via asyncio.gather. Results arrive in one batch, not one at a time.' },
      { id: '03', label: 'SQLite intentional', detail: 'Zero setup, single file. Schema is identical to Postgres — one line to swap when scale demands it.' },
    ],
    github: 'https://github.com/satvikp29/EvaluateAI',
    filename: 'services/judge_service.py',
    note: '// json_object · parallel · zero-setup DB',
    lang: 'python' as const,
    code: `async def evaluate_response(
    model_output: str,
    expected: str,
) -> EvalScores:
    result = await openai.chat.completions.create(
        model="gpt-4o",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": JUDGE_PROMPT},
            {"role": "user", "content": build_prompt(
                model_output, expected
            )},
        ],
    )
    data = json.loads(
        result.choices[0].message.content
    )
    return EvalScores(**data)`,
  },
  {
    index: '03',
    name: 'CodePilot',
    tagline: 'AI code review tool',
    impact: 'Reviews pull requests with full repo context — so suggestions are relevant to your codebase, not generic.',
    arch: ['Next.js', 'FastAPI', 'GitHub API', 'OpenAI'],
    decisions: [
      { id: '01', label: 'Token budget',    detail: 'Context manager trims repo files to 4k tokens before the prompt is built — no silent truncation mid-review.' },
      { id: '02', label: 'unidiff parsing', detail: 'Only changed hunks are sent. Unchanged context is stripped to reduce noise and stay within limits.' },
      { id: '03', label: 'Streaming',       detail: 'Completions stream line by line to the client. Review appears as it generates, not after a 15s wait.' },
    ],
    github: 'https://github.com/satvikp29/CodePilot',
    filename: 'lib/reviewer.ts',
    note: '// streaming · token-budgeted · diff-aware',
    lang: 'typescript' as const,
    code: `export async function reviewPR(
  pr: PullRequest
): Promise<Review> {
  const [diff, context] = await Promise.all([
    fetchDiff(pr.number),
    buildRepoContext(pr.baseSha, {
      maxTokens: 4000,
    }),
  ])

  const { choices } = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: REVIEW_PROMPT },
      { role: "user", content: buildPrompt(diff, context) },
    ],
  })

  return parseReview(choices[0].message.content)
}`,
  },
  {
    index: '04',
    name: 'SupplyChainSync',
    tagline: 'Supply chain visibility dashboard',
    impact: 'Pulls vendor inventory and order data into one view and flags disruptions before they become stockouts.',
    arch: ['Next.js', 'FastAPI', 'PostgreSQL', 'Docker'],
    decisions: [
      { id: '01', label: 'inArray batch query', detail: 'Single Drizzle query with inArray instead of per-vendor fetches. Eliminates N+1 on every dashboard load.' },
      { id: '02', label: 'Weighted severity',   detail: 'Alert score is weighted across lead time, current stock, and reorder point — not a simple threshold.' },
      { id: '03', label: 'DB healthcheck',      detail: 'Compose healthcheck blocks the API container from starting until Postgres is accepting connections.' },
    ],
    github: 'https://github.com/satvikp29/SupplyChainSync',
    filename: 'api/dashboard.ts',
    note: '// no N+1 · weighted alerts · healthchecked',
    lang: 'typescript' as const,
    code: `export async function getVendorStatus(
  vendorIds: string[]
): Promise<DashboardData> {
  const [inventory, orders, alerts] = await Promise.all([
    db.query.inventory.findMany({
      where: inArray(inventory.vendorId, vendorIds),
      with: { vendor: true, product: true },
    }),
    fetchPendingOrders(vendorIds),
    checkDisruptionAlerts(vendorIds),
  ])

  return {
    stockHealth: calcStockHealth(inventory),
    reorderFlags: inventory.filter(
      i => i.qty < i.reorderPoint
    ),
    activeAlerts: alerts.filter(
      a => a.severity === "high"
    ),
  }
}`,
  },
]

function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2)
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)
    el.style.transform = `perspective(900px) rotateX(${-dy * 2.5}deg) rotateY(${dx * 3.5}deg) scale(1.008)`
  }, [])
  const onMouseLeave = useCallback(() => {
    const el = ref.current; if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
  }, [])
  return (
    <div
      ref={ref}
      style={{ ...style, transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)', willChange: 'transform' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

export default function HorizontalScroll() {
  const containerRef   = useRef<HTMLDivElement>(null)
  const trackRef       = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [currentPanel, setCurrentPanel] = useState(0)
  const numPanels = projects.length

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current || !trackRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const scrollable = containerRef.current.offsetHeight - window.innerHeight
        const scrolled   = Math.max(0, -rect.top)
        const p = Math.min(scrolled / scrollable, 1)
        trackRef.current.style.transform = `translateX(-${p * (numPanels - 1) * 100}vw)`
        if (progressBarRef.current) progressBarRef.current.style.width = `${p * 100}%`
        const panel = Math.round(p * (numPanels - 1))
        setCurrentPanel(prev => prev !== panel ? panel : prev)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId) }
  }, [numPanels])

  return (
    <div
      ref={containerRef}
      id="projects"
      style={{ height: `${numPanels * 100}vh`, position: 'relative', borderTop: '1px solid #1F1E1B' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: '#090907' }}>

        {/* Label + counter */}
        <div style={{ position: 'absolute', top: '32px', left: '32px', zIndex: 20, display: 'flex', alignItems: 'center', gap: '20px' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '9px', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 700 }}>
            02 / Projects
          </p>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#3A3835', letterSpacing: '0.2em' }}>
            {String(currentPanel + 1).padStart(2, '0')} / {String(numPanels).padStart(2, '0')}
          </span>
        </div>

        {/* Panel dots */}
        <div style={{ position: 'absolute', top: '32px', right: '32px', zIndex: 20, display: 'flex', gap: '8px', alignItems: 'center' }}>
          {projects.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === currentPanel ? '30px' : '6px',
                height: '2px',
                background: i === currentPanel ? '#C9A84C' : '#2A2926',
                borderRadius: '1px',
                transition: 'width 0.6s cubic-bezier(0.65,0.05,0,1), background 0.4s ease',
              }}
            />
          ))}
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          style={{ display: 'flex', height: '100%', width: `${numPanels * 100}vw`, willChange: 'transform' }}
        >
          {projects.map((project, panelIndex) => {
            const isActive   = panelIndex === currentPanel
            const highlighted = highlight(project.code, project.lang)

            return (
              <div key={project.name} style={{ width: '100vw', height: '100%', flexShrink: 0, display: 'flex' }}>

                {/* Left — tilt card */}
                <TiltCard
                  style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 4rem',
                    borderRight: '1px solid #1F1E1B',
                    background: '#090907',
                  }}
                >
                  {/* Watermark number */}
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '120px',
                      fontWeight: 700,
                      lineHeight: 1,
                      color: isActive ? 'rgba(201,168,76,0.07)' : 'rgba(201,168,76,0.03)',
                      marginBottom: '-12px',
                      userSelect: 'none',
                      transition: 'color 0.8s ease',
                    }}
                  >
                    {project.index}
                  </span>

                  {/* Impact */}
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: 'clamp(1rem, 1.5vw, 1.3rem)',
                      color: '#5E5A54',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.4,
                      marginBottom: '20px',
                      maxWidth: '380px',
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? 'translateY(0)' : 'translateY(8px)',
                      transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.65,0.05,0,1)',
                    }}
                  >
                    {project.impact}
                  </p>

                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.6rem, 4vw, 4.2rem)',
                      fontWeight: 600,
                      color: '#EEE9E1',
                      letterSpacing: '-0.03em',
                      lineHeight: 0.95,
                      marginBottom: '6px',
                      opacity: isActive ? 1 : 0.5,
                      transition: 'opacity 0.7s ease 0.05s',
                      fontOpticalSizing: 'auto',
                    } as React.CSSProperties}
                  >
                    {project.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '9px',
                      color: 'rgba(201,168,76,0.4)',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      marginBottom: '24px',
                    }}
                  >
                    {project.tagline}
                  </p>

                  {/* Arch flow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    {project.arch.map((node, i) => (
                      <span key={node} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            padding: '3px 10px',
                            border: '1px solid #1F1E1B',
                            background: '#0F0F0D',
                            color: '#5E5A54',
                          }}
                        >
                          {node}
                        </span>
                        {i < project.arch.length - 1 && (
                          <span style={{ color: '#2A2926', fontSize: '10px' }}>→</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Decisions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                    {project.decisions.map((d, di) => (
                      <div
                        key={d.id}
                        style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'flex-start',
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateX(0)' : 'translateX(-14px)',
                          transition: `opacity 0.55s ease ${0.12 + di * 0.07}s, transform 0.55s cubic-bezier(0.65,0.05,0,1) ${0.12 + di * 0.07}s`,
                        }}
                      >
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', color: 'rgba(201,168,76,0.3)', flexShrink: 0, marginTop: '2px', letterSpacing: '0.1em' }}>
                          {d.id}.
                        </span>
                        <div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#BBB5AD', fontWeight: 500, marginRight: '8px' }}>{d.label}</span>
                          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: '#5E5A54', lineHeight: 1.6 }}>{d.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    className="group"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', width: 'fit-content' }}
                  >
                    <span
                      style={{ borderBottom: '1px solid rgba(201,168,76,0.25)', paddingBottom: '2px', transition: 'border-color 0.3s ease' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderBottomColor = '#C9A84C'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderBottomColor = 'rgba(201,168,76,0.25)'}
                    >
                      View on GitHub
                    </span>
                    <span>↗</span>
                  </a>
                </TiltCard>

                {/* Right — code */}
                <div
                  style={{
                    width: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3.5rem',
                    background: '#0C0C0A',
                  }}
                >
                  <div style={{ width: '100%', maxWidth: '520px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#2A2926', letterSpacing: '0.18em', marginBottom: '10px' }}>
                      {project.note}
                    </p>
                    <div
                      style={{
                        border: '1px solid #1A1916',
                        background: '#080806',
                        boxShadow: isActive
                          ? '0 32px 80px rgba(0,0,0,0.6), 0 8px 24px rgba(201,168,76,0.06)'
                          : '0 8px 24px rgba(0,0,0,0.3)',
                        transition: 'box-shadow 0.8s cubic-bezier(0.65,0.05,0,1)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          borderBottom: '1px solid #1A1916',
                          background: '#0C0C0A',
                        }}
                      >
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'rgba(201,168,76,0.55)' }} />
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1F1E1B' }} />
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1F1E1B' }} />
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: '#3A3835', marginLeft: '6px' }}>
                          {project.filename}
                        </span>
                      </div>
                      <pre
                        style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', lineHeight: 1.8, overflowX: 'auto', scrollbarWidth: 'none' } as React.CSSProperties}
                      >
                        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
                      </pre>
                    </div>
                  </div>
                </div>

              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: '#1F1E1B' }}
        >
          <div
            ref={progressBarRef}
            style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg, #8A6D2C, #C9A84C)' }}
          />
        </div>
      </div>
    </div>
  )
}
