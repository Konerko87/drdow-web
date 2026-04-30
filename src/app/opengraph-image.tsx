import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Dr.Dow AI — 宮廟、物流與倉儲 AI 管理系統'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const logoData = await readFile(join(process.cwd(), 'public', 'logo-miaotong.png'))
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        {/* Logo */}
        <img
          src={logoBase64}
          alt=""
          width={200}
          height={216}
          style={{ objectFit: 'contain' }}
        />

        {/* Brand */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: '#0F172A',
            marginTop: 24,
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          Dr.Dow AI
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: '#475569',
            marginTop: 16,
            textAlign: 'center',
          }}
        >
          宮廟 · 物流 · 倉儲 · 財務 AI 管理系統
        </div>

        {/* Products */}
        <div
          style={{
            fontSize: 20,
            color: '#64748B',
            marginTop: 14,
            textAlign: 'center',
            letterSpacing: '0.05em',
          }}
        >
          廟通 · TMS · WMS · ERP
        </div>
      </div>
    ),
    { ...size }
  )
}
