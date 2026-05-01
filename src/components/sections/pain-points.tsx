import { FadeIn } from '@/components/ui/fade-in'
import { PAIN_POINTS } from '@/lib/constants'
import { DuotoneIcon } from '@/components/ui/duotone-icon'
import type { IconName } from '@/components/ui/icon'
import { DotPattern } from '@/components/ui/dot-pattern'

export function PainPoints() {
  return (
    <section className="relative py-28 bg-white overflow-hidden" aria-label="痛點分析">
      <DotPattern className="fill-[#B91C1C]/[0.06] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            這些問題，是不是每天都在發生？
          </h2>
          <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed">
            宮廟不是沒有在做，而是很多事做得辛苦卻不順。
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="group relative bg-[#fef7f2] rounded-2xl p-7 border border-[#B91C1C]/[0.06] hover:border-[#B91C1C]/20 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-[#B91C1C]/5 to-[#d97706]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#B91C1C]/15 to-[#d97706]/15 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <DuotoneIcon name={point.icon as IconName} size={28} className="text-[#B91C1C]" />
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
