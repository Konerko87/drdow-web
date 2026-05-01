import Image from 'next/image'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'
import { PRODUCTS } from '@/lib/constants'
import { Icon, type IconName } from '@/components/ui/icon'

const SECONDARY_PRODUCTS = [
  {
    key: 'tms',
    href: '/products/tms',
    logo: '/logo-tms.png',
    logoAlt: 'Dr.Dow TMS 派車系統 logo',
    image: '/screenshots/tms-dispatch.png',
    imageAlt: 'Dr.Dow TMS 派車系統智慧派車板介面，拖拉指派一鍵搞定',
    industry: '物流配送',
  },
  {
    key: 'wms',
    href: '/products/wms',
    logo: '/logo-wms.png',
    logoAlt: 'Dr.Dow WMS 倉儲系統 logo',
    image: '/screenshots/wms-inventory.png',
    imageAlt: 'Dr.Dow WMS 倉儲系統庫存即時儀表板與儲位地圖',
    industry: '倉儲管理',
  },
  {
    key: 'erp',
    href: '/products/erp',
    logo: '/logo-erp.png',
    logoAlt: 'Dr.Dow ERP 財務系統 logo',
    image: '/screenshots/erp-payments.png',
    imageAlt: 'Dr.Dow ERP 財務系統待匯款審核畫面，展開照片明細逐筆確認',
    industry: '物流財務',
  },
] as const

export function ProductCards() {
  return (
    <section id="products" className="py-28 bg-white" aria-label="產品介紹">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: '#B91C1C' }}>Featured Product</p>
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-5xl font-bold mb-4 tracking-tight">四套系統，一個目標</h2>
          <p className="text-muted text-base">AI 驅動的產業管理系統，讓宮廟與物流現場的傳統流程全面升級。</p>
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
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-muted">宮廟產業</span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <Image src="/logo-miaotong.png" alt="Dr.Dow AI 廟通 宮廟管理系統 logo" width={56} height={56} className="rounded-xl" priority />
                    <div>
                      <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl md:text-3xl font-bold tracking-tight">{PRODUCTS.miaotong.name}</h3>
                      <p className="text-sm text-muted">{PRODUCTS.miaotong.fullName}</p>
                    </div>
                  </div>
                  <p className="text-muted mb-6 leading-relaxed">{PRODUCTS.miaotong.description}</p>
                  <ul className="space-y-2.5 mb-8">
                    {PRODUCTS.miaotong.features.slice(0, 6).map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <Icon name={f.icon as IconName} className="w-4 h-4 mt-0.5 text-[#B91C1C] flex-shrink-0" strokeWidth={1.75} />
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

        {/* Secondary: 物流產業線 — TMS / WMS / ERP */}
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2 text-accent">Logistics Suite</p>
          <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl md:text-3xl font-bold tracking-tight mb-2">物流產業線</h3>
          <p className="text-muted text-sm">派車、倉儲、財務三套系統，從訂單到撥款全程串接。</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECONDARY_PRODUCTS.map((sp, idx) => {
            const product = PRODUCTS[sp.key]
            return (
              <FadeIn key={sp.key} delay={idx * 80}>
                <div className="group relative h-full bg-[#FAFBFC] rounded-3xl p-1 border border-black/[0.04] hover:border-accent/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white rounded-[20px] p-7 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <Image src={sp.logo} alt={sp.logoAlt} width={44} height={44} className="w-11 h-11 rounded-xl" />
                      <div>
                        <h4 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold tracking-tight">{product.name}</h4>
                        <p className="text-xs text-muted">{product.fullName}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted mb-5 leading-relaxed line-clamp-3">{product.description}</p>

                    <div className="rounded-xl mb-5 overflow-hidden border border-black/5">
                      <Image src={sp.image} alt={sp.imageAlt} width={800} height={500} className="w-full aspect-[16/10] object-cover object-top" sizes="(max-width: 1024px) 100vw, 33vw" quality={80} />
                    </div>

                    <ul className="space-y-2 mb-5 flex-1">
                      {product.features.slice(0, 3).map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <Icon name={f.icon as IconName} className="w-3.5 h-3.5 mt-0.5 text-accent flex-shrink-0" strokeWidth={1.75} />
                          <div>
                            <span className="font-semibold">{f.title}</span>
                            <span className="text-muted"> — {f.desc.split('。')[0]}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <Link href={sp.href} className="group/link inline-flex items-center gap-1.5 text-accent font-semibold text-sm">
                      看 {product.name} 完整功能 <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

