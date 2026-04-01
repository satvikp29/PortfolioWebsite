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
    <div className="relative overflow-hidden py-5 border-y border-line">
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #FAFAF8, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #FAFAF8, transparent)' }}
      />
      <div
        className="flex gap-10 whitespace-nowrap"
        style={{ animation: 'marquee 55s linear infinite' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 text-[11px] tracking-[0.18em] uppercase font-medium">
            <span className="text-muted">{item}</span>
            <span style={{ color: 'rgba(200,16,46,0.25)', fontSize: '8px' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
