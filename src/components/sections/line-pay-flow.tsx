import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'
import { LINE_PAY_STEPS } from '@/lib/constants'

export function LinePayFlow() {
  return (
    <section id="features" className="py-28 md:py-36 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #faf5ff 0%, #f3e8ff 50%, #faf5ff 100%)' }} aria-label="LINE Pay 線上點燈流程">
      {/* Gold accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#d97706]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6" style={{ background: 'rgba(217,119,6,0.15)', color: '#92400e' }}>
            核心功能
          </span>
        </FadeIn>

        <FadeIn className="text-center mb-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            LINE 裡面就能完成<span className="text-[#d97706]">點燈</span>
          </h2>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-3">
            選燈種 → 填資料 → LINE Pay 付款 → 電子收據
          </p>
          <p className="text-base text-muted/70 max-w-xl mx-auto">
            全程不離開 LINE，不需要匯款、不需要等回覆
          </p>
        </FadeIn>

        {/* Step flow — desktop horizontal, mobile scrollable */}
        <FadeIn className="mt-16">
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible">
            {LINE_PAY_STEPS.map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[220px] md:w-auto text-center relative">
                {/* Step indicator */}
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: i === 3 ? '#d97706' : '#6b21a8' }}>
                    {item.step}
                  </div>
                  {i < LINE_PAY_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-4 left-[calc(50%+20px)] w-[calc(100%-40px)] h-px bg-gradient-to-r from-[#6b21a8]/30 to-[#6b21a8]/10" />
                  )}
                </div>

                {/* Phone mockup */}
                <div className="rounded-2xl overflow-hidden shadow-xl border border-black/5 mx-auto mb-4 bg-white" style={{ maxWidth: '200px' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={360}
                    height={640}
                    className="w-full"
                    sizes="200px"
                    quality={85}
                  />
                </div>

                {/* Label */}
                <h3 className="text-sm font-bold mb-1" style={{ color: i === 3 ? '#d97706' : '#1a1a2e' }}>
                  {item.title}
                </h3>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Comparison callout */}
        <FadeIn className="mt-16">
          <div className="bg-white rounded-2xl p-8 md:p-10 border border-[#6b21a8]/10 max-w-3xl mx-auto">
            <p className="text-muted text-sm md:text-base leading-relaxed mb-4">
              很多所謂線上點燈，最後還是落回人工查匯款、人工核對、人工補通知。
            </p>
            <p className="text-dark font-bold text-sm md:text-base">
              這套系統讓信徒直接在 LINE 裡完成整個流程，廟方後台同步收到訂單與付款確認。
            </p>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #d97706, #dc2626)', boxShadow: '0 4px 20px rgba(217,119,6,0.3)' }}
          >
            預約展示，看實際操作
            <span>→</span>
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
