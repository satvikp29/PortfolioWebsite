import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#090907',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #C9A84C',
          borderRadius: '3px',
        }}
      >
        <span
          style={{
            color: '#C9A84C',
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '-0.5px',
            fontFamily: 'serif',
          }}
        >
          SR
        </span>
      </div>
    ),
    { ...size }
  )
}
