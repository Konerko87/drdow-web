import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '廟通 — 智慧宮廟管理系統 | Dr.Dow AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(185,28,28,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              color: 'white',
              marginBottom: 40,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Dr.Dow{' '}
            <span style={{ color: '#B91C1C' }}>AI</span>
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            宮廟管理，
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #B91C1C, #D97706)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: 32,
            }}
          >
            智慧升級。
          </div>

          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.4)',
              textAlign: 'center',
            }}
          >
            廟通 · 信徒管理 · 點燈牌位 · 捐款收據 · 法會報名
          </div>

          <div
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.25)',
              marginTop: 24,
            }}
          >
            drdowai.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
