import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dr.Dow AI — 別再請人了，讓 AI 上班。'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #030712 0%, #0F172A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
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
            <span style={{ color: '#3B82F6' }}>AI</span>
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
            別再請人了，
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
              lineHeight: 1.2,
              marginBottom: 32,
            }}
          >
            讓 AI 上班。
          </div>

          <div
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.4)',
              textAlign: 'center',
            }}
          >
            廟通宮廟管理 · 物流派車 TMS · 財務 ERP
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
