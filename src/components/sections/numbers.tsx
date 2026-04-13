import { FadeIn } from '@/components/ui/fade-in'
import { STATS } from '@/lib/constants'

export function Numbers() {
  return (
    <section className="py-28 bg-[#faf5ff]/50" aria-label="關鍵數據">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">為台灣宮廟而生</h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {STATS.map((stat, i) => (
            <FadeIn key={i} delay={i * 60} className="text-center">
              <div className="py-6">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#6b21a8] via-[#dc2626] to-[#d97706] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-muted tracking-wide">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
