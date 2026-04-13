import Image from 'next/image'
import { FadeIn } from '@/components/ui/fade-in'

export function FamilyProxy() {
  return (
    <section className="py-28 bg-[#faf5ff]/50" aria-label="家庭代辦">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: phone mockups */}
          <FadeIn>
            <div className="flex gap-4 justify-center lg:justify-start">
              <div className="w-[180px] md:w-[200px] rounded-2xl overflow-hidden shadow-xl border border-black/5 transform -rotate-2">
                <Image src="/screenshots/liff-family.png" alt="家庭成員管理" width={360} height={640} className="w-full" sizes="200px" quality={85} />
              </div>
              <div className="w-[180px] md:w-[200px] rounded-2xl overflow-hidden shadow-xl border border-black/5 transform rotate-2 mt-8">
                <Image src="/screenshots/liff-lights.png" alt="我的光明燈" width={360} height={640} className="w-full" sizes="200px" quality={85} />
              </div>
            </div>
          </FadeIn>

          {/* Right: text */}
          <FadeIn delay={100}>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-[#6b21a8] mb-4 block">LINE 行動端</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                家庭代辦與信徒自助查詢
              </h2>
              <p className="text-lg text-muted mb-3 font-medium">
                宮廟服務不是單人流程，而是家庭流程
              </p>
              <p className="text-muted leading-relaxed mb-8">
                一家人的點燈、法會、收據不該拆成一筆一筆重填。系統支援家庭成員管理與代辦機制，信徒在 LINE 裡就能幫家人處理、查看紀錄，不必每次都打電話問廟方。
              </p>
              <ul className="space-y-3">
                {[
                  '家庭成員管理，角色與關係一目了然',
                  '幫家人代辦點燈、法會，搭配 LINE Pay 直接付款',
                  '邀請家人加入，共享服務紀錄',
                  'LINE 免安裝，打開就能用',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-[#22C55E] mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
