import { FadeIn } from '@/components/ui/fade-in'
import { PAIN_POINTS } from '@/lib/constants'

export function PainPoints() {
  return (
    <section className="py-28 bg-white" aria-label="痛點分析">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
            這些問題，是不是每天都在發生？
          </h2>
          <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed">
            宮廟不是沒有在做，而是很多事做得辛苦卻不順。
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="group relative bg-[#faf5ff] rounded-2xl p-7 border border-[#6b21a8]/[0.06] hover:border-[#6b21a8]/20 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#6b21a8]/5 to-[#dc2626]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6b21a8]/10 to-[#dc2626]/10 flex items-center justify-center text-2xl mb-4">
                    {point.icon}
                  </div>
                  <h3 className="text-base font-bold text-dark mb-2">{point.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{point.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
