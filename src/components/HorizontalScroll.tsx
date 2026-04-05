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
      { id: '01', label: 'asyncio.gather', detail: 'All job scoring runs in parallel. One await instead of a sequential loop — latency drops with scale.' },
      { id: '02', label: 'Pydantic as contract', detail: 'Same model used for DB validation and as the structured output spec sent to OpenAI.' },
      { id: '03', label: 'tsvector index', detail: 'Postgres full-text search on job titles and descriptions. No Elasticsearch needed.' },
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
      { id: '01', label: 'LLM-as-judge', detail: 'GPT-4o evaluates with response_format: json_object — scores are structured, not free-form text.' },
      { id: '02', label: 'Parallel eval', detail: 'All model calls run concurrently via asyncio.gather. Results arrive in one batch, not one at a time.' },
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
      { id: '01', label: 'Token budget', detail: 'Context manager trims repo files to 4k tokens before the prompt is built — no silent truncation mid-review.' },
      { id: '02', label: 'unidiff parsing', detail: 'Only changed hunks are sent. Unchanged context is stripped to reduce noise and stay within limits.' },
      { id: '03', label: 'Streaming', detail: 'Completions stream line by line to the client. Review appears as it generates, not after a 15s wait.' },
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
      { id: '02', label: 'Weighted severity', detail: 'Alert score is weighted across lead time, current stock, and reorder point — not a simple threshold.' },
      { id: '03', label: 'DB healthcheck', detail: 'Compose healthcheck blocks the API container from starting until Postgres is accepting connections.' },
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

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    el.style.transform = `perspective(900px) rotateX(${-dy * 3}deg) rotateY(${dx * 4}deg) scale(1.01)`
  }, [])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: 'transform',
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
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
        const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight
        const scrolled = Math.max(0, -rect.top)
        const p = Math.min(scrolled / scrollableHeight, 1)
        const tx = p * (numPanels - 1) * 100
        trackRef.current.style.transform = `translateX(-${tx}vw)`
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${p * 100}%`
        }
        const panel = Math.round(p * (numPanels - 1))
        setCurrentPanel((prev) => (prev !== panel ? panel : prev))
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [numPanels])

  return (
    <div
      ref={containerRef}
      id="projects"
      style={{ height: `${numPanels * 100}vh` }}
      className="relative border-t border-line"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-bg">

        {/* Section label + counter */}
        <div className="absolute top-8 left-8 z-20 flex items-center gap-6">
          <p className="text-[10px] text-red tracking-[0.22em] uppercase font-semibold">02 · Projects</p>
          <span className="text-[10px] text-muted font-mono tracking-widest">
            {String(currentPanel + 1).padStart(2, '0')} / {String(numPanels).padStart(2, '0')}
          </span>
        </div>

        {/* Panel indicators */}
        <div className="absolute top-8 right-8 z-20 flex gap-2 items-center">
          {projects.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-700"
              style={{
                width: i === currentPanel ? '32px' : '6px',
                height: '2px',
                background: i === currentPanel ? '#C8102E' : '#D8D3CE',
                borderRadius: '1px',
              }}
            />
          ))}
        </div>

        {/* Sliding track */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${numPanels * 100}vw`, willChange: 'transform', transition: 'transform 0.05s linear' }}
        >
          {projects.map((project, panelIndex) => {
            const highlighted = highlight(project.code, project.lang)
            const isActive = panelIndex === currentPanel
            return (
              <div key={project.name} className="w-screen h-full shrink-0 flex">

                {/* Left: project case study with 3D tilt */}
                <TiltCard
                  className="w-1/2 flex flex-col justify-center px-16 py-20 border-r border-line bg-bg"
                  style={{}}
                >
                  {/* Watermark number */}
                  <span
                    className="font-serif leading-none mb-2 select-none"
                    style={{
                      fontSize: '110px',
                      color: isActive ? 'rgba(200,16,46,0.09)' : 'rgba(200,16,46,0.05)',
                      fontWeight: 700,
                      lineHeight: 1,
                      transition: 'color 0.8s ease',
                    }}
                  >
                    {project.index}
                  </span>

                  {/* Impact */}
                  <p
                    className="text-ink font-serif font-semibold leading-snug mb-5 -mt-4 max-w-sm"
                    style={{
                      fontSize: 'clamp(1.1rem,1.6vw,1.4rem)',
                      letterSpacing: '-0.015em',
                      opacity: isActive ? 1 : 0.7,
                      transform: isActive ? 'translateY(0)' : 'translateY(6px)',
                      transition: 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.65,0.05,0,1)',
                    }}
                  >
                    {project.impact}
                  </p>

                  {/* Name + tagline */}
                  <h3
                    className="font-serif font-semibold text-ink mb-1"
                    style={{
                      fontSize: 'clamp(2.4rem,3.5vw,3.8rem)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      opacity: isActive ? 1 : 0.6,
                      transition: 'opacity 0.7s ease 0.05s',
                    }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-[10px] text-red/60 tracking-[0.2em] uppercase mb-7 font-semibold">{project.tagline}</p>

                  {/* Architecture flow */}
                  <div className="flex items-center gap-1 mb-7 flex-wrap">
                    {project.arch.map((node, i) => (
                      <span key={node} className="flex items-center gap-1">
                        <span
                          className="text-[10px] font-mono px-2.5 py-1 border text-ink"
                          style={{
                            background: '#F4F1EE',
                            borderColor: '#D8D3CE',
                            transition: 'border-color 0.4s ease, color 0.4s ease',
                          }}
                        >
                          {node}
                        </span>
                        {i < project.arch.length - 1 && (
                          <span className="text-dim text-[10px] select-none">→</span>
                        )}
                      </span>
                    ))}
                  </div>

                  {/* Engineering decisions */}
                  <div className="space-y-3.5 mb-8">
                    {project.decisions.map((d, di) => (
                      <div
                        key={d.id}
                        className="flex gap-3 items-start"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transform: isActive ? 'translateX(0)' : 'translateX(-12px)',
                          transition: `opacity 0.6s ease ${0.1 + di * 0.07}s, transform 0.6s cubic-bezier(0.65,0.05,0,1) ${0.1 + di * 0.07}s`,
                        }}
                      >
                        <span className="font-mono text-[9px] text-red/40 shrink-0 mt-0.5 tracking-widest">
                          {d.id}.
                        </span>
                        <div>
                          <span className="text-xs font-mono text-ink font-medium mr-2">{d.label}</span>
                          <span className="text-xs text-muted leading-relaxed">{d.detail}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    className="group text-xs text-ink font-semibold tracking-wide w-fit flex items-center gap-1.5"
                  >
                    <span className="border-b border-red/25 pb-0.5 group-hover:border-red group-hover:text-red transition-all duration-300">
                      View on GitHub
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-red">↗</span>
                  </a>
                </TiltCard>

                {/* Right: code block */}
                <div
                  className="w-1/2 flex items-center justify-center px-14"
                  style={{
                    background: '#EDECE8',
                    transition: 'background 0.8s ease',
                  }}
                >
                  <div className="w-full max-w-lg">
                    <p className="text-[10px] font-mono mb-3 tracking-widest" style={{ color: '#999' }}>
                      {project.note}
                    </p>
                    <div
                      style={{
                        border: '1px solid #1C1C1C',
                        background: '#0C0C0C',
                        boxShadow: isActive ? '0 32px 80px rgba(0,0,0,0.25), 0 8px 24px rgba(200,16,46,0.08)' : '0 8px 24px rgba(0,0,0,0.12)',
                        transition: 'box-shadow 0.8s cubic-bezier(0.65,0.05,0,1)',
                      }}
                    >
                      <div
                        className="flex items-center gap-2 px-4 py-3 border-b"
                        style={{ borderColor: '#1C1C1C', background: '#141414' }}
                      >
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#C8102E', opacity: 0.7 }} />
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2A2A2A' }} />
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2A2A2A' }} />
                        </div>
                        <span className="text-[10px] font-mono ml-2" style={{ color: '#555' }}>{project.filename}</span>
                      </div>
                      <pre
                        className="p-5 text-[11px] font-mono leading-[1.8] overflow-x-auto"
                        style={{ scrollbarWidth: 'none' }}
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
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: '#E8E4E0' }}>
          <div
            ref={progressBarRef}
            className="h-full transition-none"
            style={{ width: '0%', background: 'linear-gradient(90deg, #8A0A20, #C8102E)' }}
          />
        </div>

      </div>
    </div>
  )
}
