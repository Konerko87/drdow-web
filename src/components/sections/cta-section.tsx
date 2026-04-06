import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'

export function CTASection() {
  return (
    <section className="relative py-28 bg-[#030712] text-white overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            別再花錢請人做
            <br />
            AI 能做的事
          </h2>
          <p className="text-white/30 text-base mb-10 max-w-md mx-auto">
            30 分鐘免費諮詢，算給你看一套 AI 系統能省多少人力成本。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group px-8 py-4 bg-white text-dark rounded-full text-sm font-semibold hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]"
            >
              免費諮詢
              <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              href="mailto:kevin@st-logistics.com.tw"
              className="px-8 py-4 text-white/50 rounded-full text-sm font-medium hover:text-white transition-colors border border-white/10 hover:border-white/20"
            >
              直接聯繫
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
