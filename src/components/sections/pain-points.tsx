import { FadeIn } from '@/components/ui/fade-in'
import { PAIN_POINTS } from '@/lib/constants'

export function PainPoints() {
  return (
    <section id="pain" className="py-28 bg-white" aria-label="痛點分析">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#B91C1C' }}>Pain Points</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            這些痛點，你們廟也有嗎？
          </h2>
        </FadeIn>

        <FadeIn className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-muted text-base leading-relaxed">
            信徒資料散落各處、點燈年年重 key、收據手開對不上帳、
            <br />
            法會報名靠電話、發財金借還查不到⋯⋯
            <br />
            <strong className="text-dark">廟通幫你一次解決。</strong>
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="group relative bg-[#FFFBF7] rounded-2xl p-7 border border-[#B91C1C]/[0.06] hover:border-[#B91C1C]/20 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B91C1C]/5 to-[#D97706]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B91C1C]/10 to-[#D97706]/10 flex items-center justify-center text-xl mb-4">
                    {point.icon}
                  </div>
                  <p className="text-sm text-dark/40 line-through decoration-[#B91C1C]/20 mb-2 leading-relaxed">{point.before}</p>
                  <p className="text-sm text-dark leading-relaxed font-semibold">
                    → {point.after}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn className="text-center mt-16">
          <p className="text-muted text-sm mb-1">一套系統，管好整間廟的大小事。</p>
          <p className="text-xs text-muted/60">從信徒資料到會計報表，不用再翻紙本、不用再開 Excel。</p>
        </FadeIn>
      </div>
    </section>
  )
}
