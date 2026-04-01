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
    layer: 'Data and AI',
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
    <section id="about" className="py-32 px-8 border-t border-line bg-bg">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-20">

          {/* Left: text */}
          <div>
            <FadeIn>
              <p className="text-xs text-red tracking-widest uppercase mb-4 font-medium">
                01 · About
              </p>
            </FadeIn>

            <TextReveal delay={60}>
              <h2
                className="font-serif text-[clamp(2.6rem,5vw,4rem)] font-semibold text-ink leading-none mb-8"
                style={{ letterSpacing: '-0.02em' }}
              >
                Front to back,
                <br />
                <span className="gradient-text">every layer.</span>
              </h2>
            </TextReveal>

            <FadeIn delay={120}>
              <div className="space-y-4 text-muted leading-relaxed text-[0.95rem] mb-10">
                <p>
                  I work across the full stack. On any given project I am writing
                  FastAPI routes, building the React UI, wiring up Docker, and
                  dropping in an OpenAI integration on top of it.
                </p>
                <p>
                  A lot of my recent work touches LLMs in some way. Not just wrapping
                  APIs, but thinking about evaluation, context management, and making AI
                  features that behave predictably under real conditions.
                </p>
                <p>
                  I want a role where I can ship real things, learn from good engineers,
                  and get better fast. Based in Dallas, TX and open to remote.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="flex gap-4">
                <a
                  href="https://github.com/satvikp29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-red border-b border-red/30 pb-0.5 hover:border-red transition-colors duration-500"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/satvikreddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-widest uppercase text-red border-b border-red/30 pb-0.5 hover:border-red transition-colors duration-500"
                >
                  LinkedIn ↗
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: terminal — stays dark intentionally, shows real dev feel */}
          <FadeIn delay={100}>
            <div className="rounded-lg overflow-hidden border border-line" style={{ background: '#111111' }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: '#222', background: '#1A1A1A' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#C8102E', opacity: 0.8 }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#333' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: '#333' }} />
                </div>
                <span className="text-xs font-mono ml-2" style={{ color: '#666' }}>terminal</span>
              </div>
              <pre className="p-5 text-xs font-mono leading-[1.85] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                <code>
                  <span style={{ color: '#555' }}>$ </span>
                  <span style={{ color: '#C8102E' }}>docker compose</span>
                  <span style={{ color: '#888' }}> up --build</span>
                  {'\n'}
                  <span style={{ color: '#333' }}>[+] Building 4/4</span>
                  {'\n'}
                  <span style={{ color: '#444' }}> ✔ api        built in 3.2s</span>
                  {'\n'}
                  <span style={{ color: '#444' }}> ✔ web        built in 5.8s</span>
                  {'\n'}
                  <span style={{ color: '#444' }}> ✔ db         ready</span>
                  {'\n'}
                  <span style={{ color: '#444' }}> ✔ nginx      ready</span>
                  {'\n'}
                  <span style={{ color: '#777' }}>Starting services...</span>
                  {'\n'}
                  <span style={{ color: '#555' }}>api_1  | </span>
                  <span style={{ color: '#888' }}>Uvicorn running on http://0.0.0.0:8000</span>
                  {'\n'}
                  <span style={{ color: '#555' }}>web_1  | </span>
                  <span style={{ color: '#888' }}>Ready on http://localhost:3000</span>
                  {'\n\n'}
                  <span style={{ color: '#555' }}>$ </span>
                  <span style={{ color: '#C8102E' }}>curl</span>
                  <span style={{ color: '#888' }}> http://localhost:8000/health</span>
                  {'\n'}
                  <span style={{ color: '#666' }}>{'{"status":"ok","version":"1.0.0"}'}</span>
                </code>
              </pre>
            </div>
          </FadeIn>
        </div>

        {/* Stack grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stack.map((group, i) => (
            <FadeIn key={group.layer} delay={i * 70 + 80}>
              <div className="card-luxury p-5 rounded-lg h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-red/40 text-xs">{group.icon}</span>
                  <span className="text-xs text-red/70 tracking-widest uppercase font-medium">
                    {group.layer}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs rounded bg-bg text-muted border border-line hover:text-ink hover:border-red/20 transition-all duration-500"
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
    </section>
  )
}
