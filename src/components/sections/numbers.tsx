import { FadeIn } from '@/components/ui/fade-in'
import { STATS } from '@/lib/constants'

export function Numbers() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">用數字說話</h2>
          <p className="text-muted text-lg">已在實際物流場景中運行的成果。</p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {STATS.map((stat, i) => (
            <FadeIn key={i} delay={i * 60} className="text-center">
              <div className="text-4xl md:text-5xl font-black gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
