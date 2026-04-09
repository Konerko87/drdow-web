import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { FadeIn } from '@/components/ui/fade-in'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '價格方案 — 廟通宮廟管理 / 物流 TMS / ERP 系統',
  description: 'Dr.Dow AI 廟通宮廟管理系統、物流派車系統和財務系統的價格方案。依需求彈性選擇，所有方案都包含免費諮詢。',
  path: '/pricing',
})

const MIAOTONG_PLANS = [
  {
    name: '入門版',
    target: '中小型宮廟',
    featured: false,
    features: [
      '信徒資料管理',
      '點燈 / 牌位服務',
      '捐款收據管理',
      '日結對帳',
      'Email 技術支援',
    ],
  },
  {
    name: '專業版',
    target: '中大型宮廟',
    featured: true,
    features: [
      '入門版全部功能',
      '法會活動管理',
      '發財金借還系統',
      '會計財務報表',
      '角色權限管理',
      '稽核日誌',
      'LINE LIFF 行動服務',
      '專屬技術支援',
    ],
  },
  {
    name: '旗艦版',
    target: '大型宮廟 / 多廟管理',
    featured: false,
    features: [
      '專業版全部功能',
      '多廟管理',
      '客製化報表',
      '資料匯入協助',
      'API 開放串接',
      'SLA 保證',
      '現場教育訓練',
    ],
  },
]

const LOGISTICS_PLANS = [
  {
    name: '基本版',
    target: '10 台車以下',
    featured: false,
    features: [
      '派車板（3 種模式）',
      '司機 LINE App',
      'WMS 匯入',
      '薪酬計算',
      'GPS 追蹤',
      'Email 技術支援',
    ],
  },
  {
    name: '專業版',
    target: '10-50 台車',
    featured: true,
    features: [
      '基本版全部功能',
      '營運分析 KPI',
      '車隊維護管理',
      '棧板追蹤',
      'ERP 財務串接',
      'AI OCR 請款',
      '銀行自動對帳',
      'Boss 行動 App',
      '廠商 Portal',
      '專屬技術支援',
    ],
  },
  {
    name: '企業版',
    target: '50 台車以上',
    featured: false,
    features: [
      '專業版全部功能',
      '多倉庫管理',
      '客製化報表',
      'API 開放',
      '專屬技術支援',
      'SLA 保證',
      '教育訓練',
    ],
  },
]

function PlanCard({ plan, i, accentColor = 'accent' }: { plan: typeof MIAOTONG_PLANS[number]; i: number; accentColor?: string }) {
  const isTemple = accentColor === 'temple'
  return (
    <FadeIn key={i} delay={i * 100}>
      <div className={`rounded-2xl p-8 h-full flex flex-col ${
        plan.featured
          ? isTemple ? 'gradient-border-temple shadow-lg shadow-[#B91C1C]/10' : 'gradient-border shadow-lg shadow-accent/10'
          : 'bg-surface'
      }`}>
        {plan.featured && (
          <span className={`inline-block self-start text-xs font-bold text-white px-3 py-1 rounded-full mb-4 ${isTemple ? 'bg-[#B91C1C]' : 'bg-accent'}`}>
            最多人選擇
          </span>
        )}
        <h3 className="text-xl font-black mb-1">{plan.name}</h3>
        <p className="text-sm text-muted mb-2">{plan.target}</p>
        <div className="text-3xl font-black mb-6">
          洽詢 <span className="text-sm font-normal text-muted">/ 月</span>
        </div>
        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((f, fi) => (
            <li key={fi} className="flex items-start gap-2 text-sm">
              <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className={`text-center py-3 rounded-full font-semibold text-sm transition-colors ${
            plan.featured
              ? isTemple ? 'bg-[#B91C1C] text-white hover:bg-[#DC2626]' : 'bg-accent text-white hover:bg-accent-light'
              : 'bg-dark text-white hover:bg-dark/80'
          }`}
        >
          聯繫我們
        </Link>
      </div>
    </FadeIn>
  )
}

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '價格', url: '/pricing' }]} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black mb-4">簡單透明的價格</h1>
            <p className="text-lg text-muted">依需求選擇最適合的方案，所有方案都包含免費諮詢。</p>
          </FadeIn>
        </div>
      </section>

      {/* 廟通方案 */}
      <section className="pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <p className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: '#B91C1C' }}>廟通 宮廟管理系統</p>
            <h2 className="text-2xl font-black">宮廟管理方案</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MIAOTONG_PLANS.map((plan, i) => (
              <PlanCard key={i} plan={plan} i={i} accentColor="temple" />
            ))}
          </div>
        </div>
      </section>

      {/* 分隔線 */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-black/5" />
      </div>

      {/* 物流方案 */}
      <section className="py-16 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <p className="text-xs font-bold tracking-wider uppercase text-accent mb-2">TMS / ERP 物流系統</p>
            <h2 className="text-2xl font-black">物流管理方案</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LOGISTICS_PLANS.map((plan, i) => (
              <PlanCard key={i} plan={plan} i={i} accentColor="accent" />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
