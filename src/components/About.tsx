import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

const stack = [
  {
    layer: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    icon: '◈',
  },
  {
    layer: 'Backend',
    items: ['FastAPI', 'Python', 'Node.js', 'REST APIs'],
    icon: '◈',
  },
  {
    layer: 'Data & AI',
    items: ['PostgreSQL', 'SQLite', 'OpenAI API', 'LLM Evaluation'],
    icon: '◈',
  },
  {
    layer: 'Infrastructure',
    items: ['Docker', 'Docker Compose', 'Git', 'Vercel'],
    icon: '◈',
  },
]

export default function About() {
  return (
    <section id="about" className="py-32 px-8 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-start">

          {/* Left — text */}
          <div>
            <FadeIn>
              <p className="text-xs text-gold tracking-widest uppercase mb-4 font-medium">
                01 · About
              </p>
            </FadeIn>

            <TextReveal delay={60}>
              <h2 className="font-serif text-[clamp(2.6rem,5vw,4rem)] font-semibold text-cream leading-none mb-8" style={{ letterSpacing: '-0.02em' }}>
                Front to back,<br />
                <span className="gradient-text">every layer.</span>
              </h2>
            </TextReveal>

            <FadeIn delay={120}>
              <div className="space-y-4 text-muted leading-relaxed text-[0.95rem]">
                <p>
                  I'm comfortable across the full stack. On any given project I'm writing
                  FastAPI routes, building the React UI, wiring up Docker, and sometimes
                  dropping in an OpenAI integration on top.
                </p>
                <p>
                  Most of my recent work touches LLMs in some way. Not just wrapping APIs,
                  but thinking about evaluation, context management, and making AI features
                  that behave predictably.
                </p>
                <p>
                  Looking for a role where I can ship real things, learn from good engineers,
                  and get better fast.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="mt-10 flex gap-4">
                <a
                  href="https://github.com/satvikp29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-500"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/satvikreddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-500"
                >
                  LinkedIn ↗
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right — stack grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stack.map((group, i) => (
              <FadeIn key={group.layer} delay={i * 70 + 80}>
                <div className="card-luxury p-5 rounded-lg h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gold/40 text-xs">{group.icon}</span>
                    <span className="text-xs text-gold/70 tracking-widest uppercase font-medium">
                      {group.layer}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs rounded bg-surface text-muted border border-line hover:text-cream hover:border-gold/20 transition-all duration-500"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
