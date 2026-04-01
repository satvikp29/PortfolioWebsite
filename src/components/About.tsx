import FadeIn from './FadeIn'
import TextReveal from './TextReveal'

export default function About() {
  return (
    <section id="about" className="py-40 px-8 border-t border-line bg-bg">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

          {/* Left: text */}
          <div>
            <FadeIn>
              <p className="text-[10px] text-red tracking-[0.22em] uppercase mb-6 font-medium">01 · About</p>
            </FadeIn>

            <TextReveal delay={60}>
              <h2
                className="font-serif font-semibold text-ink leading-[0.92] mb-10"
                style={{ fontSize: 'clamp(3rem,5.5vw,5.5rem)', letterSpacing: '-0.04em' }}
              >
                I own features<br />
                <span className="gradient-text">start to finish.</span>
              </h2>
            </TextReveal>

            <FadeIn delay={140}>
              <div className="space-y-5 text-muted leading-relaxed text-[0.95rem] mb-12 max-w-md">
                <p>
                  I design the database schema, write the FastAPI routes, build the React UI, wire Docker Compose, and deploy — as one cohesive system. Not just code features in isolation.
                </p>
                <p>
                  Most of my projects involve LLMs in some meaningful way. Not just API wrappers — I've built evaluation frameworks, structured output pipelines, and context management systems that behave predictably under real load.
                </p>
                <p>
                  Looking for a backend or full stack role where I can own real features, ship fast, and learn from engineers who care about the fundamentals. Based in Dallas, TX and open to remote.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={220}>
              <div className="flex gap-5">
                <a
                  href="https://github.com/satvikp29"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.2em] uppercase text-red border-b border-red/25 pb-0.5 hover:border-red transition-colors duration-500"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://www.linkedin.com/in/satvikreddy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.2em] uppercase text-red border-b border-red/25 pb-0.5 hover:border-red transition-colors duration-500"
                >
                  LinkedIn ↗
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: terminal */}
          <FadeIn delay={100}>
            <div className="rounded-none overflow-hidden" style={{ background: '#0E0E0E', border: '1px solid #1E1E1E' }}>
              {/* Terminal chrome */}
              <div
                className="flex items-center justify-between px-5 py-3.5 border-b"
                style={{ borderColor: '#1E1E1E', background: '#161616' }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#C8102E', opacity: 0.75 }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2A2A2A' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2A2A2A' }} />
                </div>
                <span className="text-[10px] font-mono tracking-widest" style={{ color: '#444' }}>project-root</span>
                <div style={{ width: '44px' }} />
              </div>

              <pre className="p-6 text-[11px] font-mono leading-[1.9] overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                <code>
                  <span style={{ color: '#3A3A3A' }}>$ </span>
                  <span style={{ color: '#C8102E' }}>docker compose</span>
                  <span style={{ color: '#666' }}> up --build</span>
                  {'\n'}
                  <span style={{ color: '#2A2A2A' }}>[+] Building 4/4</span>
                  {'\n'}
                  <span style={{ color: '#333' }}> ✔ api        </span><span style={{ color: '#2A6B2A' }}>built in 3.2s</span>
                  {'\n'}
                  <span style={{ color: '#333' }}> ✔ web        </span><span style={{ color: '#2A6B2A' }}>built in 5.8s</span>
                  {'\n'}
                  <span style={{ color: '#333' }}> ✔ db         </span><span style={{ color: '#2A6B2A' }}>ready</span>
                  {'\n'}
                  <span style={{ color: '#333' }}> ✔ nginx      </span><span style={{ color: '#2A6B2A' }}>ready</span>
                  {'\n'}
                  <span style={{ color: '#555' }}>api_1  | </span>
                  <span style={{ color: '#777' }}>Uvicorn running on </span>
                  <span style={{ color: '#555' }}>http://0.0.0.0:8000</span>
                  {'\n'}
                  <span style={{ color: '#555' }}>web_1  | </span>
                  <span style={{ color: '#777' }}>Ready on </span>
                  <span style={{ color: '#555' }}>http://localhost:3000</span>
                  {'\n\n'}
                  <span style={{ color: '#3A3A3A' }}>$ </span>
                  <span style={{ color: '#C8102E' }}>curl</span>
                  <span style={{ color: '#666' }}> localhost:8000/health</span>
                  {'\n'}
                  <span style={{ color: '#444' }}>{'{"status":"ok","uptime":"3.1s","db":"connected"}'}</span>
                  {'\n\n'}
                  <span style={{ color: '#3A3A3A' }}>$ </span>
                  <span style={{ color: '#C8102E' }}>pytest</span>
                  <span style={{ color: '#666' }}> tests/ -v --tb=short</span>
                  {'\n'}
                  <span style={{ color: '#333' }}>collected 24 items</span>
                  {'\n'}
                  <span style={{ color: '#3A3A3A' }}>tests/test_routes.py   </span>
                  <span style={{ color: '#2A6B2A' }}>........ [ 33%]</span>
                  {'\n'}
                  <span style={{ color: '#3A3A3A' }}>tests/test_models.py   </span>
                  <span style={{ color: '#2A6B2A' }}>........ [ 66%]</span>
                  {'\n'}
                  <span style={{ color: '#3A3A3A' }}>tests/test_services.py </span>
                  <span style={{ color: '#2A6B2A' }}>........ [100%]</span>
                  {'\n\n'}
                  <span style={{ color: '#2A6B2A' }}>24 passed</span>
                  <span style={{ color: '#444' }}> in 1.42s</span>
                  <span style={{ color: '#3A3A3A' }}> ·</span>
                  <span style={{ color: '#444' }}> 0 warnings</span>
                </code>
              </pre>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
