import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'

const SCENES = [
  {
    logo: '/logo-miaotong.png',
    logoAlt: '廟通 宮廟管理系統 logo',
    industry: '宮廟產業',
    title: '廟務管理',
    desc: '點燈、法會、捐款收據、LINE 信徒服務',
    href: '/products/miaotong',
    cta: '看廟通',
    accent: '#B91C1C',
    bg: 'from-[#FFF5EE] to-white',
    border: 'border-[#B91C1C]/20',
  },
  {
    logo: '/logo-tms.png',
    logoAlt: 'Dr.Dow TMS 派車系統 logo',
    industry: '物流配送',
    title: 'TMS 派車管理',
    desc: '派車板、司機 LINE、GPS、薪酬結算',
    href: '/products/tms',
    cta: '看 TMS',
    accent: '#3B82F6',
    bg: 'from-[#EFF6FF] to-white',
    border: 'border-accent/20',
  },
  {
    logo: '/logo-wms.png',
    logoAlt: 'Dr.Dow WMS 倉儲系統 logo',
    industry: '倉儲管理',
    title: 'WMS 倉儲管理',
    desc: '入庫、出庫、庫存、盤點、條碼作業',
    href: '/products/wms',
    cta: '看 WMS',
    accent: '#0EA5E9',
    bg: 'from-[#ECFEFF] to-white',
    border: 'border-cyan-400/30',
  },
  {
    logo: '/logo-erp.png',
    logoAlt: 'Dr.Dow ERP 財務系統 logo',
    industry: '物流財務',
    title: '物流 ERP',
    desc: 'OCR 請款、銀行對帳、付款審核、財務報表',
    href: '/products/erp',
    cta: '看 ERP',
    accent: '#8B5CF6',
    bg: 'from-[#F5F3FF] to-white',
    border: 'border-purple/20',
  },
] as const

export function SceneSelector() {
  return (
    <section className="py-20 bg-surface" aria-label="場景選擇">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 text-muted">Choose your scenario</p>
          <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">你想解決哪一種營運問題？</h2>
          <p className="text-muted text-base">Dr.Dow AI 服務宮廟、物流派車、倉儲管理與物流財務四大場景。</p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SCENES.map((scene, i) => (
            <FadeIn key={scene.href} delay={i * 60}>
              <Link
                href={scene.href}
                className={`group relative block h-full rounded-2xl bg-gradient-to-br ${scene.bg} p-6 border ${scene.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Image
                    src={scene.logo}
                    alt={scene.logoAlt}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-xl"
                  />
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/70 text-muted">
                    {scene.industry}
                  </span>
                </div>
                <h3 className="text-lg font-black mb-2 tracking-tight">{scene.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-5">{scene.desc}</p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: scene.accent }}
                >
                  {scene.cta}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
