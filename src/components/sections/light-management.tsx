import Image from 'next/image'
import { FadeIn } from '@/components/ui/fade-in'

export function LightManagement() {
  return (
    <section className="py-28 bg-[#faf5ff]/50" aria-label="點燈管理">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: screenshots */}
          <FadeIn>
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-xl border border-black/5">
                <Image src="/screenshots/lights.png" alt="光明燈管理總覽" width={800} height={500} className="w-full" sizes="(max-width: 1024px) 100vw, 50vw" quality={85} />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg border border-black/5 max-w-[70%]">
                <Image src="/screenshots/lights-print.png" alt="字卡批次列印" width={800} height={500} className="w-full" sizes="(max-width: 1024px) 70vw, 35vw" quality={80} />
              </div>
            </div>
          </FadeIn>

          {/* Right: text */}
          <FadeIn delay={100}>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-[#6b21a8] mb-4 block">核心模組</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                點燈管理從受理到列印一條龍
              </h2>
              <p className="text-lg text-muted mb-3 font-medium">
                不是把點燈當普通訂單，而是完整的年度管理
              </p>
              <p className="text-muted leading-relaxed mb-8">
                從燈種統計、通路來源、到期續點提醒，到字卡批次列印，形成完整的年度點燈管理流程。不論是櫃檯受理還是 LINE Pay 線上點燈，全部統一管理。
              </p>
              <ul className="space-y-3">
                {[
                  '各燈種即時統計，年度管理一目了然',
                  '到期續點主動提醒，不遺漏任何信徒',
                  '字卡批次列印，待印追蹤不靠手工整理',
                  'LINE Pay 線上訂單自動進入管理流程',
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
