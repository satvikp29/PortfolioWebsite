import FadeIn from './FadeIn'

const skillGroups = [
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['Next.js', 'React', 'FastAPI', 'Tailwind CSS'],
  },
  {
    category: 'Infrastructure',
    skills: ['Docker', 'Docker Compose', 'Git', 'REST APIs'],
  },
  {
    category: 'AI & Data',
    skills: ['OpenAI API', 'LLM Evaluation', 'Prompt Engineering', 'SQLite'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <div className="mb-16">
            <p className="text-xs text-gold tracking-widest uppercase mb-3 font-medium">
              What I work with
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-ink">
              Skills
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillGroups.map((group, i) => (
            <FadeIn key={group.category} delay={i * 80}>
              <div className="p-6 rounded-lg bg-surface card-border h-full">
                <p className="text-xs text-gold/70 tracking-widest uppercase font-medium mb-4">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded bg-card text-ink-muted border border-line hover:border-gold/30 hover:text-ink transition-all duration-200"
                    >
                      {skill}
                    </span>
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
