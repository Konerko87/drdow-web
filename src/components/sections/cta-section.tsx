import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'
import { SITE } from '@/lib/constants'
import { Icon } from '@/components/ui/icon'

type CTAVariant = 'generic' | 'temple' | 'logistics'

const CTA_COPY: Record<CTAVariant, {
  title: string
  highlight: string
  description: string
  note: string
}> = {
  generic: {
    title: '讓現場營運進入',
    highlight: '下一個階段',
    description: 'Dr.Dow AI 協助宮廟、物流、倉儲與財務團隊，把紙本、Excel 與 LINE 群組整理成可追蹤、可交接、可自動化的營運流程。',
    note: '我們提供 30 分鐘線上導覽，依你的產業與流程展示對應產品。無需預付費用，先看再決定。',
  },
  temple: {
    title: '讓廟務管理進入',
    highlight: '下一個階段',
    description: '不論是百年大廟還是社區宮廟，Dr.Dow AI 廟通都能協助您建立現代化的營運流程。',
    note: '我們提供 30 分鐘線上導覽，針對貴宮廟的實際需求展示對應功能。無需預付費用，先看再決定。',
  },
  logistics: {
    title: '讓物流營運進入',
    highlight: '下一個階段',
    description: '從派車、倉儲到財務對帳，Dr.Dow AI 協助物流團隊把現場流程整理成即時、可追蹤、可自動化的管理系統。',
    note: '我們提供 30 分鐘線上導覽，依你的車隊、倉庫與財務流程展示 TMS、WMS 或 ERP。',
  },
}

export function CTASection({ variant = 'generic' }: { variant?: CTAVariant } = {}) {
  const copy = CTA_COPY[variant]
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #6b21a8, #dc2626)' }} aria-label="行動呼籲">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {copy.title}
            <br />
            <span className="text-[#fbbf24]">{copy.highlight}</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg mb-4 max-w-xl mx-auto leading-relaxed">
            {copy.description}
          </p>
          <p className="text-white/40 text-sm mb-10 max-w-md mx-auto">
            {copy.note}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group px-8 py-4 rounded-full text-base font-bold transition-all hover:opacity-90 text-center"
              style={{ background: 'linear-gradient(135deg, #d97706, #dc2626)', color: '#fff', boxShadow: '0 4px 20px rgba(217,119,6,0.35)' }}
            >
              預約免費展示
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="px-8 py-4 rounded-full text-base font-medium text-white/70 border border-white/30 hover:bg-white/10 hover:text-white transition-all text-center inline-flex items-center justify-center gap-2"
            >
              <Icon name="phone" className="w-4 h-4" strokeWidth={2} /> {SITE.phone}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
