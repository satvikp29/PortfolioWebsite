import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid #C8102E',
          borderRadius: '4px',
        }}
      >
        <span
          style={{
            color: '#C8102E',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            fontFamily: 'serif',
          }}
        >
          SRP
        </span>
      </div>
    ),
    { ...size }
  )
}
