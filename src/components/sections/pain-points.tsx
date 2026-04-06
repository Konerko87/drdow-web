import { FadeIn } from '@/components/ui/fade-in'
import { PAIN_POINTS } from '@/lib/constants'

export function PainPoints() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">這些問題，聽起來熟悉��？</h2>
          <p className="text-muted text-lg">每天重複的手動作業，其實 AI 都能替你做。</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((point, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-white rounded-2xl p-8 hover-lift h-full">
                <div className="text-4xl mb-4">{point.icon}</div>
                <p className="text-lg font-bold text-red-500/80 mb-3 line-through decoration-red-300">{point.before}</p>
                <p className="text-base text-dark leading-relaxed">
                  <span className="text-success font-semibold">→</span> {point.after}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
