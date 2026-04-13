import { FadeIn } from '@/components/ui/fade-in'

const FORTUNE_FEATURES = [
  { icon: '🪙', title: '借金流程', desc: '身分驗證、擲筊、金額層級、祝福語，完整記錄每一筆借金。' },
  { icon: '🔄', title: '還金管理', desc: '支援本人還金與代還，追蹤還金狀態，逾期提醒。' },
  { icon: '🛡️', title: '規則引擎', desc: '借金上限、冷卻期、黑名單，由廟方自訂管理規則。' },
]

export function FortuneMoney() {
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: '#1a1a2e' }} aria-label="發財金管理">
      {/* Gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#d97706]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <span className="text-xs font-bold tracking-wider uppercase mb-4 block" style={{ color: '#d97706' }}>宮廟特色</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6" style={{ color: '#d97706' }}>
            發財金借還管理
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            別的系統做不到的事
          </p>
        </FadeIn>

        <FadeIn className="max-w-3xl mx-auto mb-16">
          <p className="text-white/60 text-center text-base leading-relaxed">
            發財金是台灣宮廟獨特的信仰文化。從借金受理、身分核驗、擲筊流程、祝福語登記，到還金追蹤與規則管理，這套系統完整支援整個發財金生命週期。
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FORTUNE_FEATURES.map((feature, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-white/5 rounded-2xl p-8 border border-[#d97706]/10 hover:border-[#d97706]/30 transition-all text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-3" style={{ color: '#d97706' }}>{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
