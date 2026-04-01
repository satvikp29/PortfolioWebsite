'use client'
import { useRef, useEffect, useState } from 'react'
import { highlight } from '@/lib/highlight'

const projects = [
  {
    index: '01',
    name: 'CareerCompass',
    tagline: 'AI career guidance platform',
    description:
      'Helps job seekers find relevant roles, score job postings against their profile, and track applications. Match scores and resume suggestions are generated with OpenAI against the actual job description.',
    tech: ['Next.js', 'FastAPI', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/satvikp29/CareerCompass',
    filename: 'routes/jobs.py',
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
    description:
      'Run your own test cases against multiple language models at once. GPT-4o scores every response on accuracy, relevance, coherence, and hallucination risk. Same evaluation pattern the major AI labs use internally.',
    tech: ['FastAPI', 'Next.js', 'TypeScript', 'Docker', 'OpenAI', 'SQLite'],
    github: 'https://github.com/satvikp29/EvaluateAI',
    filename: 'services/judge_service.py',
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
    description:
      'Plugs into your workflow to review pull requests, catch common issues, and write documentation. Pulls full repo context so the suggestions are actually relevant to your codebase.',
    tech: ['Python', 'TypeScript', 'FastAPI', 'OpenAI API', 'REST APIs'],
    github: 'https://github.com/satvikp29/CodePilot',
    filename: 'lib/reviewer.ts',
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
    description:
      'Pulls vendor data into one dashboard and flags disruptions, stockouts, and reorder windows before they become problems. Built as a full stack app with a FastAPI backend and a Next.js frontend.',
    tech: ['Next.js', 'FastAPI', 'Docker', 'PostgreSQL', 'TypeScript', 'REST APIs'],
    github: 'https://github.com/satvikp29/SupplyChainSync',
    filename: 'api/dashboard.ts',
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
          <p className="text-xs text-red tracking-widest uppercase font-medium">02 · Projects</p>
          <span className="text-xs text-muted font-mono">
            {String(currentPanel + 1).padStart(2, '0')} / {String(numPanels).padStart(2, '0')}
          </span>
        </div>

        {/* Panel dots */}
        <div className="absolute top-8 right-8 z-20 flex gap-2 items-center">
          {projects.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{
                width: i === currentPanel ? '24px' : '6px',
                height: '2px',
                background: i === currentPanel ? '#C8102E' : '#E0DBD5',
              }}
            />
          ))}
        </div>

        {/* Sliding track */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${numPanels * 100}vw`, willChange: 'transform' }}
        >
          {projects.map((project) => {
            const highlighted = highlight(project.code, project.lang)
            return (
              <div key={project.name} className="w-screen h-full shrink-0 flex">

                {/* Left: project info — white bg */}
                <div className="w-1/2 flex flex-col justify-center px-16 py-20 border-r border-line bg-bg">
                  <span
                    className="font-serif leading-none mb-3"
                    style={{ fontSize: '110px', color: 'rgba(200,16,46,0.22)', fontWeight: 700 }}
                  >
                    {project.index}
                  </span>
                  <h3
                    className="font-serif text-5xl font-semibold text-ink mb-2 -mt-8"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-xs text-red/70 tracking-widest uppercase mb-5">{project.tagline}</p>
                  <p className="text-muted text-sm leading-relaxed mb-6 max-w-md">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-mono bg-surface border border-line text-muted hover:border-red/25 hover:text-ink transition-all duration-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink border-b border-red/30 pb-0.5 hover:border-red hover:text-red w-fit transition-colors duration-300"
                  >
                    View on GitHub ↗
                  </a>
                </div>

                {/* Right: code block — intentionally dark for contrast */}
                <div className="w-1/2 flex items-center justify-center px-12" style={{ background: '#F4F1EE' }}>
                  <div className="w-full max-w-lg">
                    <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #222', background: '#111111' }}>
                      <div
                        className="flex items-center gap-2 px-4 py-3 border-b"
                        style={{ borderColor: '#222', background: '#1A1A1A' }}
                      >
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full" style={{ background: '#C8102E', opacity: 0.7 }} />
                          <div className="w-3 h-3 rounded-full" style={{ background: '#333' }} />
                          <div className="w-3 h-3 rounded-full" style={{ background: '#333' }} />
                        </div>
                        <span className="text-xs font-mono ml-2" style={{ color: '#666' }}>{project.filename}</span>
                      </div>
                      <pre
                        className="p-5 text-xs font-mono leading-[1.7] overflow-x-auto"
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
        <div className="absolute bottom-0 left-0 right-0 h-px bg-line">
          <div ref={progressBarRef} className="h-full bg-red transition-none" style={{ width: '0%' }} />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-xs text-muted tracking-widest uppercase">
          <span>Scroll to explore</span>
          <span className="text-red">→</span>
        </div>
      </div>
    </div>
  )
}
