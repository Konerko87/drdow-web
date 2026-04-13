import Image from 'next/image'
import { FadeIn } from '@/components/ui/fade-in'

export function ReceiptsDocs() {
  return (
    <section className="py-28 bg-white" aria-label="收據與文件">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <FadeIn>
            <div>
              <span className="text-xs font-bold tracking-wider uppercase text-[#6b21a8] mb-4 block">行政效率</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                收據、文件、行政作業全面電子化
              </h2>
              <p className="text-lg text-muted mb-3 font-medium">
                文件不是另外做，直接從業務流程產生
              </p>
              <p className="text-muted leading-relaxed mb-8">
                付款完成自動產生正式收據，信徒在 LINE 查看，廟方可列印補印。疏文、字卡、法會公告、捐款收據、發財金單據，全部集中在同一個文件工作台，行政工作真的能做完。
              </p>
              <ul className="space-y-3">
                {[
                  '電子收據可查、可印、可補印',
                  'LINE Pay 付款後收據自動產生，信徒在 LINE 裡直接查看',
                  '疏文、字卡、公告、單據集中管理',
                  '文件從業務流程自動產生，不必重做',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-[#22C55E] mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Right: screenshots */}
          <FadeIn delay={100}>
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-xl border border-black/5">
                <Image src="/screenshots/receipt.png" alt="電子收據" width={800} height={500} className="w-full" sizes="(max-width: 1024px) 100vw, 50vw" quality={85} />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg border border-black/5 max-w-[70%] ml-auto">
                <Image src="/screenshots/documents-workbench.png" alt="文件工作台" width={800} height={500} className="w-full" sizes="(max-width: 1024px) 70vw, 35vw" quality={80} />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
