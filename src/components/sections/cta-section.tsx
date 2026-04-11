import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'

export function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: '#1E293B' }} aria-label="行動呼籲">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#B91C1C]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            讓宮廟管理進入
            <br />
            <span className="gradient-text-temple">智慧時代</span>
          </h2>
          <p className="text-white/30 text-base mb-10 max-w-md mx-auto">
            30 分鐘免費展示，看看廟通如何讓你們廟的管理流程更順、更清楚、更可追蹤。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group px-8 py-4 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-[0_0_30px_rgba(185,28,28,0.3)]"
              style={{ background: '#B91C1C' }}
            >
              預約產品展示
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 text-white/50 rounded-full text-sm font-medium hover:text-white transition-colors border border-white/10 hover:border-white/20"
            >
              查看方案
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
