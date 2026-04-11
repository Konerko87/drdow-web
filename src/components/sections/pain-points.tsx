import { FadeIn } from '@/components/ui/fade-in'
import { PAIN_POINTS } from '@/lib/constants'

export function PainPoints() {
  return (
    <section id="pain" className="py-28 bg-white" aria-label="痛點分析">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-8">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Why AI</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            請人的時代，已經過了
          </h2>
        </FadeIn>

        <FadeIn className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-muted text-base leading-relaxed">
            行政薪水年年漲，找到人了還不一定留得住。
            <br />
            教會了 Excel 又走了，下一個來又要重頭教。
            <br />
            <strong className="text-dark">與其一直請人，不如讓 AI 替你上班。</strong>
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="group relative bg-[#FAFBFC] rounded-2xl p-7 border border-black/[0.04] hover:border-accent/20 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-purple/10 flex items-center justify-center text-xl mb-4">
                    {point.icon}
                  </div>
                  <p className="text-sm text-dark/40 line-through decoration-dark/15 mb-2 leading-relaxed">{point.before}</p>
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
          <p className="text-muted text-sm mb-1">一套系統，取代 3 個行政的工作量。</p>
          <p className="text-xs text-muted/60">而且它不會請假、不會離職、不會算錯。</p>
        </FadeIn>
      </div>
    </section>
  )
}
