import { FadeIn } from '@/components/ui/fade-in'
import { PAIN_POINTS } from '@/lib/constants'

export function PainPoints() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Pain Points</p>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">這些問題，聽起來熟悉嗎？</h2>
          <p className="text-muted text-base">每天重複的手動作業，其實 AI 都能替你做。</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="group relative bg-[#FAFBFC] rounded-2xl p-8 border border-black/[0.04] hover:border-accent/20 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-purple/10 flex items-center justify-center text-2xl mb-5">
                    {point.icon}
                  </div>
                  <p className="text-base font-semibold text-dark/40 line-through decoration-dark/20 mb-3">{point.before}</p>
                  <p className="text-base text-dark leading-relaxed font-medium">
                    {point.after}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
