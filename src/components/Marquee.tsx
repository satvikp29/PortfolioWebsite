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

const DIAMOND = '◆'

export default function Marquee() {
  const doubled  = [...items, ...items]
  const reversed = [...doubled].reverse()

  return (
    <div
      style={{
        borderTop:    '1px solid #1F1E1B',
        borderBottom: '1px solid #1F1E1B',
        background:   '#0C0C0A',
        overflow: 'hidden',
      }}
    >
      {/* Row 1 — forward */}
      <div
        style={{
          padding: '14px 0',
          overflow: 'hidden',
          position: 'relative',
          borderBottom: '1px solid rgba(31,30,27,0.6)',
        }}
      >
        <div
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', zIndex: 1,
            background: 'linear-gradient(90deg, #0C0C0A, transparent)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', zIndex: 1,
            background: 'linear-gradient(-90deg, #0C0C0A, transparent)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', animation: 'marquee 65s linear infinite' }}
        >
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '40px', fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              <span style={{ color: '#3A3835' }}>{item}</span>
              <span style={{ color: 'rgba(201,168,76,0.2)', fontSize: '7px' }}>{DIAMOND}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — reverse */}
      <div style={{ padding: '14px 0', overflow: 'hidden' }}>
        <div
          style={{ display: 'flex', gap: '40px', whiteSpace: 'nowrap', animation: 'marqueeReverse 52s linear infinite' }}
        >
          {reversed.map((item, i) => (
            <span
              key={i}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '40px', fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              <span style={{ color: '#2A2826' }}>{item}</span>
              <span style={{ color: 'rgba(201,168,76,0.1)', fontSize: '7px' }}>{DIAMOND}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
