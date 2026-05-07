import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'
import { WarmCreamBg } from '@/components/ui/warm-cream-bg'
import { TrackedCTA } from '@/components/ui/tracked-cta'

export const metadata: Metadata = createMetadata({
  title: '價格方案 — 廟通 / TMS / WMS / ERP 系統',
  description: 'Dr.Dow AI 廟通宮廟管理系統、TMS 物流派車系統、WMS 倉儲管理系統和 ERP 財務系統的價格方案。依需求彈性選擇，所有方案都包含免費諮詢。',
  path: '/pricing',
  keywords: ['價格', '方案', '廟通價格', 'TMS價格', 'WMS價格', 'ERP價格', '物流系統費用', '倉儲系統費用'],
})

const MIAOTONG_PLANS = [
  {
    name: '廟通入門版',
    target: '適合初次數位化的中小型宮廟，年度服務人次 5,000 以下',
    label: '起始方案',
    meta: '依信徒規模／月為單位 · 無導入費',
    featured: false,
    features: [
      '信徒資料管理（5,000 筆）',
      '點燈、牌位、安太歲線上登記',
      '電子捐款收據（合規格式）',
      '基本法會活動報名',
      'LINE 官方帳號通知綁定',
      '每月雲端備份',
    ],
  },
  {
    name: '廟通專業版',
    target: '中大型宮廟、有專職行政人員，需要多功能整合與會計報表',
    label: '熱門方案',
    meta: '依信徒規模／月為單位 · 含 4 小時導入訓練',
    featured: true,
    features: [
      '信徒資料管理（不限筆數）',
      '點燈、牌位、安太歲＋自動續燈',
      '電子捐款收據＋功德主自助查詢',
      '法會活動完整流程（報名／繳費／簽到）',
      '發財金借還管理＋到期提醒',
      '會計報表（捐款／支出／月結）',
      'LINE LIFF 信徒專屬頁',
      '每日自動備份＋版本還原',
    ],
  },
  {
    name: '廟通旗艦版',
    target: '大型宮廟、聯合會、跨廟系統，需要 API 整合與專屬支援',
    label: '企業／聯合會方案',
    meta: '依模組與廟數客製 · 含現場導入',
    featured: false,
    features: [
      '包含專業版全部功能',
      '多廟管理（一帳號管多分廟）',
      'API 串接（廟方既有系統／POS）',
      '專屬資料庫實例',
      'SLA 99.9% 服務保證',
      '現場導入訓練（2 天／場）',
      '專屬客戶成功經理',
      '客製化開發評估',
    ],
  },
]

const COMPARE_ROWS: Array<{
  name: string
  sub: string
  entry: string | 'check' | 'dash'
  pro: string | 'check' | 'dash'
  flagship: string | 'check' | 'dash'
}> = [
  { name: '信徒資料管理', sub: '姓名、生辰、聯絡方式', entry: '5,000 筆', pro: '不限', flagship: '不限・多廟' },
  { name: '點燈・牌位登記', sub: '線上申請、續燈提醒', entry: 'check', pro: 'check', flagship: 'check' },
  { name: '電子捐款收據', sub: '合規格式、自動寄送', entry: 'check', pro: 'check', flagship: 'check' },
  { name: '法會活動管理', sub: '報名／繳費／簽到', entry: '基本', pro: '完整流程', flagship: '完整＋客製' },
  { name: '發財金借還', sub: '到期提醒、利息計算', entry: 'dash', pro: 'check', flagship: 'check' },
  { name: '會計報表', sub: '捐款／支出／月結', entry: 'dash', pro: 'check', flagship: 'check' },
  { name: 'LINE LIFF 整合', sub: '信徒專屬頁面', entry: '通知綁定', pro: 'check', flagship: 'check' },
  { name: '多廟管理', sub: '一帳號跨分廟', entry: 'dash', pro: 'dash', flagship: 'check' },
  { name: 'API 串接', sub: '外部系統整合', entry: 'dash', pro: 'dash', flagship: 'check' },
  { name: '服務 SLA', sub: '系統可用性保證', entry: '標準', pro: '99.5%', flagship: '99.9%' },
  { name: '現場導入訓練', sub: '由顧問到場服務', entry: 'dash', pro: '遠端 4 hr', flagship: '現場 2 天' },
]

const PRICING_FAQ = [
  {
    q: 'Demo 要錢嗎？',
    a: [
      '完全免費，沒有時間限制。我們的 Demo 環境會用真實的廟務情境（點燈、法會、會計）走過完整流程，由顧問遠端帶您操作 60 分鐘。',
      '如果第一次看完還想再約，沒問題；很多廟方在董事會討論前會請我們再 Demo 一次給其他委員看。',
    ],
  },
  {
    q: '導入要多久？',
    a: [
      '取決於資料量與您選擇的方案：',
      '入門版：簽約後 1–2 週，由您自行匯入信徒資料即可上線。',
      '專業版：2–4 週，含 4 小時遠端訓練與資料協助。',
      '旗艦版：4–8 週，含現場導入、資料清整與訂製設定。',
      '我們不收「導入費」，價格全部含在月費裡。',
    ],
  },
  {
    q: '可以試用嗎？',
    a: [
      '可以。簽約前我們提供 14 天完整試用，使用您廟方的真實資料，所有功能都開放，沒有任何試用版限制。',
      '14 天結束後若不繼續，我們會把您的資料以 Excel 匯出後完整刪除，不留底。',
    ],
  },
  {
    q: '可以中途換方案嗎？',
    a: [
      '隨時可以，不需要重新簽約、不收手續費。',
      '升級當月即生效，差額按比例計算；降級於下個帳單週期生效，您原有的資料完全保留。我們也不綁長約——按月計費，隨時可中止。',
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
    target: '10-50 台車 / 中型倉',
    featured: true,
    features: [
      '基本版全部功能',
      'WMS 倉儲管理：入庫掃描、出庫揀貨、儲位管理',
      '即時庫存與盤點任務',
      '棧板與循環容器追蹤',
      '營運分析 KPI',
      '車隊維護管理',
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
    target: '50 台車以上 / 多倉',
    featured: false,
    features: [
      '專業版全部功能',
      '多倉庫管理（WMS 完整功能）',
      '客製化報表',
      'API 開放',
      '專屬技術支援',
      'SLA 保證',
      '教育訓練',
    ],
  },
]

type QuotePlan = {
  name: string
  target: string
  features: string[]
}

function createQuoteOffer(plan: QuotePlan, serviceType: string, position: number) {
  return {
    '@type': 'Offer',
    position,
    name: plan.name,
    url: `${SITE.url}/pricing`,
    availability: 'https://schema.org/OnlineOnly',
    businessFunction: 'https://schema.org/Sell',
    description: `${plan.target} — ${plan.features.join('、')}。免費諮詢，依需求報價`,
    areaServed: {
      '@type': 'Country',
      name: '台灣',
    },
    itemOffered: {
      '@type': 'Service',
      name: plan.name,
      serviceType,
      provider: {
        '@type': 'Organization',
        name: SITE.name,
        url: SITE.url,
      },
    },
  }
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="#B91C1C" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 8.5 6.5 12 13 4.5" />
    </svg>
  )
}

function MiaotongTierCard({ plan, i }: { plan: typeof MIAOTONG_PLANS[number]; i: number }) {
  return (
    <FadeIn delay={i * 100}>
      <article
        className={`relative h-full rounded-[18px] p-9 flex flex-col bg-white transition-all duration-300 ${
          plan.featured
            ? 'shadow-[0_12px_36px_rgba(185,28,28,0.12)] hover:shadow-[0_16px_40px_rgba(185,28,28,0.16)] md:-translate-y-2'
            : 'border border-[#B91C1C]/[0.08] hover:border-[#B91C1C]/[0.16] hover:shadow-[0_8px_24px_rgba(185,28,28,0.08)]'
        }`}
        style={
          plan.featured
            ? {
                background:
                  'linear-gradient(white, white) padding-box, linear-gradient(135deg, #B91C1C, #d97706) border-box',
                border: '2px solid transparent',
              }
            : undefined
        }
      >
        {plan.featured && (
          <span
            className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-[0.18em] text-white px-4 py-1.5 rounded-full whitespace-nowrap"
            style={{
              background: 'linear-gradient(135deg, #B91C1C, #d97706)',
              boxShadow: '0 4px 12px rgba(185, 28, 28, 0.24)',
            }}
          >
            最多人選擇
          </span>
        )}
        <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold tracking-tight text-dark mb-1.5">
          {plan.name}
        </h3>
        <p className="text-[13px] text-[#6b5b4a] leading-relaxed mb-7">{plan.target}</p>

        <div className="pb-6 mb-6 border-b border-black/[0.08]">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#6b5b4a] mb-2">{plan.label}</p>
          <p
            className="font-[family-name:var(--font-noto-serif-tc)] text-[34px] font-bold leading-none tracking-tight"
            style={
              plan.featured
                ? {
                    background: 'linear-gradient(135deg, #B91C1C, #d97706)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }
                : { color: '#1a1a1a' }
            }
          >
            洽詢報價
          </p>
          <p className="text-xs text-[#6b5b4a] mt-1.5">{plan.meta}</p>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((f, fi) => (
            <li key={fi} className="flex items-start gap-3 text-sm text-dark leading-snug">
              <CheckIcon />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <TrackedCTA
          href="/contact"
          location="pricing-card"
          product="generic"
          label={plan.name}
          className={`group inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all ${
            plan.featured
              ? 'text-white shadow-[0_6px_16px_rgba(185,28,28,0.18)] hover:shadow-[0_10px_22px_rgba(185,28,28,0.24)] hover:-translate-y-0.5'
              : 'border border-dark text-dark hover:bg-dark hover:text-[#fef7f2]'
          }`}
          style={
            plan.featured
              ? { background: 'linear-gradient(135deg, #B91C1C, #d97706)' }
              : undefined
          }
        >
          Demo 預約
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </TrackedCTA>
      </article>
    </FadeIn>
  )
}

function CompareCell({ value, featured }: { value: string | 'check' | 'dash'; featured?: boolean }) {
  if (value === 'check') {
    return (
      <td className={`py-4 px-6 border-b border-black/[0.08] text-center align-middle ${featured ? 'bg-[#B91C1C]/[0.025]' : ''}`}>
        <span className="inline-block">
          <CheckIcon />
        </span>
      </td>
    )
  }
  if (value === 'dash') {
    return (
      <td className={`py-4 px-6 border-b border-black/[0.08] text-center align-middle text-[#6b5b4a]/40 ${featured ? 'bg-[#B91C1C]/[0.025]' : ''}`}>
        —
      </td>
    )
  }
  return (
    <td className={`py-4 px-6 border-b border-black/[0.08] text-center align-middle ${featured ? 'bg-[#B91C1C]/[0.025]' : ''}`}>
      <span className="text-[13px] font-medium text-dark">{value}</span>
    </td>
  )
}

function MobileCompareTier({
  title,
  featured,
  rows,
  pick,
}: {
  title: string
  featured?: boolean
  rows: typeof COMPARE_ROWS
  pick: (r: typeof COMPARE_ROWS[number]) => string | 'check' | 'dash'
}) {
  return (
    <div
      className={`bg-white rounded-b-2xl p-6 border border-black/[0.08] border-t-2 ${
        featured ? 'border-t-[#B91C1C] shadow-[0_4px_16px_rgba(185,28,28,0.08)]' : 'border-t-[#B91C1C]'
      }`}
    >
      <h4 className="font-[family-name:var(--font-noto-serif-tc)] text-xl font-bold mb-4 text-dark">
        {title}
        {featured && <span className="text-[#B91C1C]"> · 最多人選擇</span>}
      </h4>
      <ul className="space-y-2.5">
        {rows.map((r, i) => {
          const v = pick(r)
          const included = v === 'check' || (v !== 'dash' && v !== '—')
          return (
            <li
              key={i}
              className="grid grid-cols-[1fr_auto] items-center gap-3 text-sm text-dark py-1.5 border-b border-black/[0.08] last:border-0"
            >
              <span>{r.name}</span>
              <span className={`text-[13px] ${included ? 'text-[#B91C1C] font-medium' : 'text-[#6b5b4a]'}`}>
                {v === 'check' ? '✓' : v === 'dash' ? '—' : v}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function LogisticsCard({ plan, i }: { plan: typeof LOGISTICS_PLANS[number]; i: number }) {
  return (
    <FadeIn delay={i * 100}>
      <div className={`rounded-2xl p-8 h-full flex flex-col ${
        plan.featured ? 'gradient-border shadow-lg shadow-accent/10' : 'bg-surface'
      }`}>
        {plan.featured && (
          <span className="inline-block self-start text-xs font-bold text-white px-3 py-1 rounded-full mb-4 bg-accent">
            最多人選擇
          </span>
        )}
        <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-xl font-bold mb-1 tracking-tight">{plan.name}</h3>
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
        <TrackedCTA
          href="/contact"
          location="pricing-card-secondary"
          product="generic"
          label={plan.name}
          className={`text-center py-3 rounded-full font-semibold text-sm transition-colors ${
            plan.featured ? 'bg-accent text-white hover:bg-accent-light' : 'bg-dark text-white hover:bg-dark/80'
          }`}
        >
          聯繫我們
        </TrackedCTA>
      </div>
    </FadeIn>
  )
}

export default function PricingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '價格', url: '/pricing' }]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '價格方案',
        description: 'Dr.Dow AI 產品價格方案',
        url: `${SITE.url}/pricing`,
        mainEntity: {
          '@type': 'OfferCatalog',
          name: 'Dr.Dow AI 方案目錄',
          description: 'Dr.Dow AI 廟通、TMS、WMS、ERP 系統導入與維運方案。所有方案採免費諮詢，依需求報價。',
          itemListElement: [
            {
              '@type': 'OfferCatalog',
              name: '廟通 宮廟管理系統',
              description: '專為台灣宮廟打造的智慧管理平台',
              itemListElement: MIAOTONG_PLANS.map((plan, index) =>
                createQuoteOffer(plan, '宮廟管理系統導入服務', index + 1)
              ),
            },
            {
              '@type': 'OfferCatalog',
              name: 'TMS / WMS / ERP 物流營運系統',
              description: '物流派車、倉儲管理與財務管理 AI 系統',
              itemListElement: LOGISTICS_PLANS.map((plan, index) =>
                createQuoteOffer(plan, '物流營運系統導入服務', index + 1)
              ),
            },
          ],
        },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: PRICING_FAQ.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a.join(' ') },
        })),
      }} />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <WarmCreamBg />
        <div className="relative max-w-4xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: '價格', href: '/pricing' }]} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center mt-6">
          <FadeIn>
            <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-4xl md:text-5xl font-bold mb-4 tracking-tight text-dark">簡單透明的價格</h1>
            <p className="text-lg text-[#6b5b4a]">依需求選擇最適合的方案，所有方案都包含免費諮詢。</p>
          </FadeIn>
        </div>
      </section>

      {/* 廟通 — Editorial preamble + tier shell */}
      <section className="relative pb-16 overflow-hidden">
        <WarmCreamBg />
        <div className="relative max-w-6xl mx-auto px-6">
          {/* Editorial preamble */}
          <FadeIn className="text-center max-w-3xl mx-auto">
            <p className="inline-flex items-center gap-3.5 text-[12px] font-semibold tracking-[0.22em] uppercase mb-7" style={{ color: '#B91C1C' }}>
              <span className="w-7 h-px bg-[#B91C1C]/50" />
              透明定價・無隱藏費用
              <span className="w-7 h-px bg-[#B91C1C]/50" />
            </p>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] font-extrabold text-[clamp(32px,5vw,56px)] leading-[1.12] tracking-tight text-dark mb-7">
              為廟方而生的<br />
              <span className="italic font-bold" style={{ color: '#B91C1C' }}>合理</span>定價方式
            </h2>
            <p className="text-[17px] leading-[1.75] text-[#6b5b4a] max-w-xl mx-auto">
              Demo 永遠免費，不限次數。導入前先確認您的需求與規模，再依實際情況提供報價，全程不綁長約、不收年費押金。
            </p>
            <span className="relative block w-12 h-px mx-auto mt-9 bg-dark/[0.18]">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2.5 text-[8px] text-[#B91C1C]/70" style={{ background: '#fef7f2' }}>◆</span>
            </span>
          </FadeIn>

          {/* Tier shell — paper bg with red dot pattern */}
          <div
            className="relative mt-16 rounded-3xl border border-black/[0.08] p-8 md:p-14 overflow-hidden"
            style={{
              background:
                'radial-gradient(circle, rgba(185,28,28,0.06) 1px, transparent 1px) 0 0 / 24px 24px, #fffaf5',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {MIAOTONG_PLANS.map((plan, i) => (
                <MiaotongTierCard key={i} plan={plan} i={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 廟通 — Comparison table */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6b5b4a] mb-4">
              Feature Comparison
            </p>
            <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-[40px] font-bold tracking-tight text-dark">
              完整功能比較
            </h3>
          </FadeIn>

          {/* Desktop table */}
          <FadeIn delay={120}>
            <div className="hidden md:block bg-white rounded-b-2xl border border-black/[0.08] border-t-2 overflow-hidden" style={{ borderTopColor: '#B91C1C' }}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-5 px-6 font-[family-name:var(--font-noto-serif-tc)] font-bold text-base text-dark border-b border-black/[0.08]" style={{ background: '#fffaf5' }}>
                      功能項目
                    </th>
                    <th className="py-5 px-6 font-[family-name:var(--font-noto-serif-tc)] font-bold text-base text-dark text-center border-b border-black/[0.08] w-[16%]" style={{ background: '#fffaf5' }}>
                      入門版
                    </th>
                    <th
                      className="py-5 px-6 font-[family-name:var(--font-noto-serif-tc)] font-bold text-base text-center border-b border-black/[0.08] w-[16%]"
                      style={{
                        color: '#B91C1C',
                        background: 'linear-gradient(180deg, rgba(185,28,28,0.06), rgba(217,119,6,0.04))',
                      }}
                    >
                      專業版
                    </th>
                    <th className="py-5 px-6 font-[family-name:var(--font-noto-serif-tc)] font-bold text-base text-dark text-center border-b border-black/[0.08] w-[16%]" style={{ background: '#fffaf5' }}>
                      旗艦版
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row, i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-[#fef7f2]/50' : ''}>
                      <td className="py-4 px-6 border-b border-black/[0.08] align-middle">
                        <span className="font-medium text-dark">{row.name}</span>
                        <span className="block text-xs text-[#6b5b4a] mt-0.5">{row.sub}</span>
                      </td>
                      <CompareCell value={row.entry} />
                      <CompareCell value={row.pro} featured />
                      <CompareCell value={row.flagship} />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Mobile collapsed view */}
          <div className="md:hidden flex flex-col gap-5 mt-6">
            <MobileCompareTier title="入門版" rows={COMPARE_ROWS} pick={(r) => r.entry} />
            <MobileCompareTier title="專業版" featured rows={COMPARE_ROWS} pick={(r) => r.pro} />
            <MobileCompareTier title="旗艦版" rows={COMPARE_ROWS} pick={(r) => r.flagship} />
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
            <p className="text-xs font-bold tracking-wider uppercase text-accent mb-2">TMS / WMS / ERP 物流營運系統</p>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold tracking-tight">物流營運方案</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LOGISTICS_PLANS.map((plan, i) => (
              <LogisticsCard key={i} plan={plan} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="relative py-24 border-t border-b border-black/[0.08]" style={{ background: '#fffaf5' }}>
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase mb-3.5" style={{ color: '#B91C1C' }}>
              常見問題
            </p>
            <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-[40px] font-bold tracking-tight text-dark">
              關於導入與費用
            </h3>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="border-t border-black/[0.08]">
              {PRICING_FAQ.map((item, i) => (
                <details
                  key={i}
                  className="group border-b border-black/[0.08] py-1 open:bg-gradient-to-b open:from-[#B91C1C]/[0.025] open:to-transparent"
                >
                  <summary className="list-none cursor-pointer pr-14 py-6 relative font-[family-name:var(--font-noto-serif-tc)] font-bold text-[19px] leading-snug tracking-tight text-dark group-open:text-[#B91C1C] [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6b5b4a] group-open:text-[#B91C1C] transition-transform group-open:rotate-180">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="7" y1="1" x2="7" y2="13" className="group-open:hidden" />
                        <line x1="1" y1="7" x2="13" y2="7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pr-14 pb-7 text-[15px] leading-[1.75] text-[#6b5b4a] space-y-3">
                    {item.a.map((p, pi) => (
                      <p key={pi}>{p}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </FadeIn>

          <p className="mt-12 text-center text-[13px] text-[#6b5b4a]">
            還有其他問題？直接{' '}
            <Link href="/contact" className="text-[#B91C1C] border-b border-[#B91C1C]/20 hover:border-[#B91C1C] transition-colors">
              聯絡我們的顧問
            </Link>
            ，我們會在 24 小時內回覆。
          </p>
        </div>
      </section>

      <CTASection variant="generic" />
    </>
  )
}
