import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'
import { PRODUCTS } from '@/lib/constants'

export function ProductCards() {
  return (
    <section id="products" className="py-28 bg-white" aria-label="產品介紹">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#B91C1C' }}>Featured Product</p>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">三套系統，一個目標</h2>
          <p className="text-muted text-base">AI 驅動的產業管理系統，讓傳統流程全面升級。</p>
        </FadeIn>

        {/* Featured: 廟通 */}
        <FadeIn className="mb-16">
          <div className="group relative rounded-3xl p-1 border border-[#B91C1C]/10 hover:border-[#B91C1C]/30 transition-all duration-500" style={{ background: '#FFFBF7' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#B91C1C]/5 via-transparent to-[#D97706]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-white rounded-[20px] p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Left: content */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full text-white" style={{ background: '#B91C1C' }}>主打產品</span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <Image src="/logo-miaotong.png" alt="Dr.Dow AI 廟通 宮廟管理系統 logo" width={56} height={56} className="rounded-xl" priority />
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tight">{PRODUCTS.miaotong.name}</h3>
                      <p className="text-sm text-muted">{PRODUCTS.miaotong.fullName}</p>
                    </div>
                  </div>
                  <p className="text-muted mb-6 leading-relaxed">{PRODUCTS.miaotong.description}</p>
                  <ul className="space-y-2.5 mb-8">
                    {PRODUCTS.miaotong.features.slice(0, 6).map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <span className="text-xs mt-0.5">{f.icon}</span>
                        <div>
                          <span className="font-semibold">{f.title}</span>
                          <span className="text-muted"> — {f.desc.split('。')[0]}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 flex-wrap">
                    <Link href="/products/miaotong" className="px-6 py-3 text-white rounded-full font-semibold text-sm hover:opacity-90 transition-opacity" style={{ background: '#B91C1C' }}>
                      了解廟通 →
                    </Link>
                    <Link href="/contact" className="px-6 py-3 bg-black/5 rounded-full font-semibold text-sm hover:bg-black/10 transition-colors">
                      預約展示
                    </Link>
                  </div>
                </div>
                {/* Right: logo large */}
                <div className="flex items-center justify-center">
                  <Image src="/logo-miaotong.png" alt="Dr.Dow AI 廟通 智慧宮廟管理系統" width={320} height={320} className="w-full max-w-[320px]" priority />
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Secondary: TMS & ERP */}
        <FadeIn className="text-center mb-10">
          <p className="text-muted text-sm">其他產品</p>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn>
            <div className="group relative bg-[#FAFBFC] rounded-3xl p-1 border border-black/[0.04] hover:border-accent/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white rounded-[20px] p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-lg">🚛</div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{PRODUCTS.tms.name}</h3>
                    <p className="text-xs text-muted">{PRODUCTS.tms.fullName}</p>
                  </div>
                </div>
                <p className="text-sm text-muted mb-6 leading-relaxed">{PRODUCTS.tms.description}</p>
                <div className="rounded-xl mb-6 overflow-hidden border border-black/5">
                  <Image src="/screenshots/tms-dispatch.png" alt="Dr.Dow TMS 派車系統智慧派車板介面，拖拉指派一鍵搞定" width={800} height={500} className="w-full aspect-[16/10] object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" quality={80} />
                </div>
                <ul className="space-y-2.5 mb-6">
                  {PRODUCTS.tms.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="text-xs mt-0.5">{f.icon}</span>
                      <div>
                        <span className="font-semibold">{f.title}</span>
                        <span className="text-muted"> — {f.desc.split('。')[0]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/products/tms" className="group/link inline-flex items-center gap-1.5 text-accent font-semibold text-sm">
                  了解更多 <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="group relative bg-[#FAFBFC] rounded-3xl p-1 border border-black/[0.04] hover:border-accent/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-white rounded-[20px] p-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-lg">💰</div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight">{PRODUCTS.erp.name}</h3>
                    <p className="text-xs text-muted">{PRODUCTS.erp.fullName}</p>
                  </div>
                </div>
                <p className="text-sm text-muted mb-6 leading-relaxed">{PRODUCTS.erp.description}</p>
                <div className="rounded-xl mb-6 overflow-hidden border border-black/5">
                  <Image src="/screenshots/erp-payments.png" alt="Dr.Dow ERP 財務系統待匯款審核畫面，展開照片明細逐筆確認" width={800} height={500} className="w-full aspect-[16/10] object-cover object-top" sizes="(max-width: 1024px) 100vw, 50vw" quality={80} />
                </div>
                <ul className="space-y-2.5 mb-6">
                  {PRODUCTS.erp.features.slice(0, 4).map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <span className="text-xs mt-0.5">{f.icon}</span>
                      <div>
                        <span className="font-semibold">{f.title}</span>
                        <span className="text-muted"> — {f.desc.split('。')[0]}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="/products/erp" className="group/link inline-flex items-center gap-1.5 text-accent font-semibold text-sm">
                  了解更多 <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
