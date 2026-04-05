const items = [
  'typed from DB to UI',
  'async by default',
  'docker as the dev contract',
  'pydantic as source of truth',
  'full stack ownership',
  'LLM evaluation that ships',
  'zero config deploys',
  'schema first development',
  'request lifecycle thinking',
  'structured output pipelines',
  'one command to run everything',
  'real tests on real data',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="relative overflow-hidden border-y border-line" style={{ background: '#F5F2EE' }}>
      {/* Forward row */}
      <div className="py-3.5 overflow-hidden">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #F5F2EE, transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(-90deg, #F5F2EE, transparent)' }}
        />
        <div
          className="flex gap-10 whitespace-nowrap"
          style={{ animation: 'marquee 60s linear infinite' }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-[10px] tracking-[0.22em] uppercase font-semibold">
              <span className="text-muted">{item}</span>
              <span style={{ color: 'rgba(200,16,46,0.3)', fontSize: '7px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Reverse row */}
      <div className="py-3.5 border-t border-line/60 overflow-hidden">
        <div
          className="flex gap-10 whitespace-nowrap"
          style={{ animation: 'marqueeReverse 50s linear infinite' }}
        >
          {[...doubled].reverse().map((item, i) => (
            <span key={i} className="flex items-center gap-10 text-[10px] tracking-[0.22em] uppercase font-semibold">
              <span style={{ color: '#B8B0A6' }}>{item}</span>
              <span style={{ color: 'rgba(200,16,46,0.15)', fontSize: '7px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
