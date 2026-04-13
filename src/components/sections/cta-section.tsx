import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'
import { SITE } from '@/lib/constants'

export function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, #6b21a8, #dc2626)' }} aria-label="行動呼籲">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            讓廟務管理進入
            <br />
            <span className="text-[#fbbf24]">下一個階段</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg mb-4 max-w-xl mx-auto leading-relaxed">
            不論是百年大廟還是社區宮廟，Dr.Dow AI 廟通都能協助您建立現代化的營運流程。
          </p>
          <p className="text-white/40 text-sm mb-10 max-w-md mx-auto">
            我們提供 30 分鐘線上導覽，針對貴宮廟的實際需求展示對應功能。無需預付費用，先看再決定。
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
              className="px-8 py-4 rounded-full text-base font-medium text-white/70 border border-white/30 hover:bg-white/10 hover:text-white transition-all text-center"
            >
              📞 {SITE.phone}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
