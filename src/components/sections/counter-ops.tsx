import Image from 'next/image'
import { FadeIn } from '@/components/ui/fade-in'

export function CounterOps() {
  return (
    <section className="py-28 bg-white" aria-label="櫃檯作業">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <FadeIn>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-[#6b21a8] mb-4 block">功能亮點</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                櫃檯作業更快
              </h2>
              <p className="text-lg text-muted mb-3 font-medium">
                為櫃檯人員設計，不是只有給管理員看
              </p>
              <p className="text-muted leading-relaxed mb-8">
                點燈、捐款、借發財金、法會報名，集中在同一個櫃檯作業頁。不用切換系統、不用翻找功能選單。信徒站在面前的時候，幾個步驟就能完成受理。
              </p>
              <ul className="space-y-3">
                {[
                  '快速搜尋信徒，帶出歷史紀錄',
                  '點燈、捐款、法會、發財金一頁搞定',
                  '今日統計與最近交易即時可見',
                  'LINE Pay 線上點燈的訂單也會即時出現在櫃檯系統',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-[#22C55E] mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Right: screenshot */}
          <FadeIn delay={100}>
            <div className="rounded-xl overflow-hidden shadow-xl border border-black/5">
              <Image src="/screenshots/counter.png" alt="櫃檯作業中心" width={800} height={500} className="w-full" sizes="(max-width: 1024px) 100vw, 50vw" quality={85} />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
