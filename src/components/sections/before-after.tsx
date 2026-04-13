import { FadeIn } from '@/components/ui/fade-in'
import { BEFORE_AFTER } from '@/lib/constants'

export function BeforeAfter() {
  return (
    <section className="py-28 bg-white" aria-label="前後對比">
      <div className="max-w-4xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            用了廟通之後
          </h2>
          <p className="text-muted text-base">
            每一項改變，都是從宮廟現場的真實痛點出發
          </p>
        </FadeIn>

        <FadeIn>
          <div className="rounded-2xl overflow-hidden border border-black/5">
            {/* Header */}
            <div className="grid grid-cols-2 bg-[#1a1a2e] text-white">
              <div className="px-6 py-4 text-xs font-bold tracking-wider uppercase">以前</div>
              <div className="px-6 py-4 text-xs font-bold tracking-wider uppercase">用了廟通之後</div>
            </div>

            {/* Rows */}
            {BEFORE_AFTER.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 border-t border-black/5 ${
                  row.highlight ? 'bg-[#d97706]/5' : i % 2 === 0 ? 'bg-white' : 'bg-[#faf5ff]/30'
                }`}
              >
                <div className="px-6 py-4 text-sm text-muted/70 line-through decoration-[#dc2626]/20">
                  {row.before}
                </div>
                <div className={`px-6 py-4 text-sm font-semibold ${row.highlight ? 'text-[#92400e]' : 'text-dark'}`}>
                  {row.highlight && <span className="text-[#d97706] mr-1">★</span>}
                  {row.after}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
