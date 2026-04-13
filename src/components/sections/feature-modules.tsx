import { FadeIn } from '@/components/ui/fade-in'
import { FEATURE_MODULES, FEATURE_TAGS } from '@/lib/constants'

export function FeatureModules() {
  return (
    <section className="py-28 bg-[#faf5ff]/50" aria-label="功能模組">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            一套系統涵蓋整座廟的營運需求
          </h2>
          <p className="text-muted text-base max-w-2xl mx-auto leading-relaxed">
            不是東拼西湊的工具組合，而是從信徒管理、服務受理、財務帳務到 LINE 行動端，完整設計的宮廟營運平台。
          </p>
        </FadeIn>

        {/* 12 module grid */}
        <FadeIn>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
            {FEATURE_MODULES.map((mod, i) => (
              <div key={i} className="bg-white rounded-xl p-5 text-center border border-black/5 hover:border-[#6b21a8]/20 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{mod.icon}</div>
                <div className="text-xs font-semibold text-dark">{mod.name}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Feature tags */}
        <FadeIn delay={200}>
          <div className="flex flex-wrap justify-center gap-2">
            {FEATURE_TAGS.map((tag) => (
              <span
                key={tag.name}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                  tag.highlight
                    ? 'bg-[#d97706]/10 text-[#92400e] border-[#d97706]/30 font-bold'
                    : 'bg-white text-muted border-black/5 hover:border-[#6b21a8]/20'
                }`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
