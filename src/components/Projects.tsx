import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

const projects = [
  {
    index: '01',
    name: 'CareerCompass',
    tagline: 'AI career guidance platform',
    description:
      'Helps job seekers find relevant roles, score job postings against their profile, and track applications in one place. Match scores and resume suggestions are generated with OpenAI against the actual job description.',
    tech: ['Next.js', 'FastAPI', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/satvikp29/CareerCompass',
  },
  {
    index: '02',
    name: 'EvaluateAI',
    tagline: 'LLM evaluation platform',
    description:
      'Run your own test cases against multiple language models at once. GPT-4o scores every response on accuracy, relevance, coherence, and hallucination risk. Same evaluation pattern the major AI labs use internally.',
    tech: ['FastAPI', 'Next.js', 'TypeScript', 'Docker', 'OpenAI', 'SQLite'],
    github: 'https://github.com/satvikp29/EvaluateAI',
  },
  {
    index: '03',
    name: 'CodePilot',
    tagline: 'AI code review tool',
    description:
      'Plugs into your workflow to review pull requests, catch common issues, and write documentation. Pulls full repo context so the suggestions are actually relevant to your codebase.',
    tech: ['Python', 'TypeScript', 'FastAPI', 'OpenAI API', 'REST APIs'],
    github: 'https://github.com/satvikp29/CodePilot',
  },
  {
    index: '04',
    name: 'SupplyChainSync',
    tagline: 'Supply chain visibility dashboard',
    description:
      'Pulls vendor data into one dashboard and flags disruptions, stockouts, and reorder windows before they become problems. Built as a full stack app with a FastAPI backend and a Next.js frontend.',
    tech: ['Next.js', 'FastAPI', 'Docker', 'PostgreSQL', 'TypeScript', 'REST APIs'],
    github: 'https://github.com/satvikp29/SupplyChainSync',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-8 border-t border-line">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-16 gap-6">
          <div>
            <FadeIn>
              <p className="text-xs text-gold tracking-widest uppercase mb-4 font-medium">
                02 · Projects
              </p>
            </FadeIn>
            <TextReveal>
              <h2 className="font-serif text-[clamp(2.6rem,5vw,4rem)] font-semibold text-cream leading-none" style={{ letterSpacing: '-0.02em' }}>
                Selected work.
              </h2>
            </TextReveal>
          </div>
          <FadeIn delay={100}>
            <a
              href="https://github.com/satvikp29"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-xs tracking-widest uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-500 shrink-0"
            >
              All on GitHub ↗
            </a>
          </FadeIn>
        </div>

        {/* Project list */}
        <div className="space-y-4">
          {projects.map((project, i) => (
            <FadeIn key={project.name} delay={i * 80}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group block card-luxury rounded-xl p-7 sm:p-9"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">

                  {/* Number */}
                  <span
                    className="font-serif text-5xl font-semibold leading-none shrink-0 transition-colors duration-500"
                    style={{ color: 'rgba(201,169,110,0.18)' }}
                  >
                    {project.index}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                      <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-cream group-hover:text-gold transition-colors duration-500" style={{ letterSpacing: '-0.01em' }}>
                        {project.name}
                      </h3>
                      <span className="text-xs text-muted group-hover:text-gold/60 transition-colors duration-500 shrink-0">
                        GitHub ↗
                      </span>
                    </div>

                    <p className="text-xs text-gold/60 tracking-widest uppercase mb-3">
                      {project.tagline}
                    </p>

                    <p className="text-muted text-sm leading-relaxed mb-5 max-w-2xl">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs rounded bg-surface text-muted border border-line font-mono group-hover:border-gold/15 transition-colors duration-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
