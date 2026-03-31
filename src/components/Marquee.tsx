const items = [
  'Python', 'TypeScript', 'React', 'Next.js', 'FastAPI',
  'Docker', 'PostgreSQL', 'REST APIs', 'OpenAI API',
  'Full Stack', 'AI Tooling', 'Node.js', 'SQLite', 'Git',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden py-5 border-y border-line">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #06060C, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #06060C, transparent)' }} />

      <div
        className="flex gap-8 whitespace-nowrap"
        style={{ animation: 'marquee 40s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 text-sm tracking-widest uppercase">
            <span className="text-muted">{item}</span>
            <span className="text-gold-dim text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
