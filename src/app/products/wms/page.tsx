import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { SITE, PRODUCTS } from '@/lib/constants'
import { FadeIn } from '@/components/ui/fade-in'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { CTASection } from '@/components/sections/cta-section'
import { InlineLeadForm } from '@/components/sections/inline-lead-form'
import { ProductFAQ } from '@/components/sections/product-faq'
import { RelatedProductPosts } from '@/components/sections/related-product-posts'
import { SoftwareApplicationJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Icon, type IconName } from '@/components/ui/icon'
import { TrackedCTA } from '@/components/ui/tracked-cta'

export const metadata: Metadata = createMetadata({
  title: 'Dr.Dow WMS — 智慧倉儲管理系統｜盤點 3 天變 3 小時、條碼即時庫存',
  description: '盤點從 3 天縮到 3 小時、出貨揀錯率降 90%。手機掃碼、儲位視覺化、即時庫存、與 TMS / ERP 全打通。倉儲現場不再靠紙本和 LINE 喊話追資料，台灣中小倉儲與電商倉專用。免費預約 Demo。',
  path: '/products/wms',
  image: 'https://drdowai.com/og/wms-og.png',
  keywords: ['WMS', 'WMS 系統', 'WMS系統', '倉儲管理系統', '倉庫管理系統', '庫存管理系統', '條碼盤點', '條碼盤點系統', '出入庫管理', '出入庫管理系統', '儲位管理', '物流倉儲'],
})

const SCREENSHOTS = [
  {
    src: '/screenshots/wms-inventory.png',
    title: '庫存即時儀表板',
    alt: 'Dr.Dow WMS 庫存即時儀表板，在庫量、進出貨與儲位熱區一頁呈現',
    desc: '在庫量、今日進貨、出貨、低庫存品項一頁掌握',
  },
  {
    src: '/screenshots/wms-inbound.png',
    title: '入庫掃描',
    alt: 'WMS 入庫掃描畫面，條碼掃描自動分配儲位',
    desc: '掃條碼自動辨識品項與供應商、自動分配儲位',
  },
  {
    src: '/screenshots/wms-outbound.png',
    title: '出庫揀貨',
    alt: 'WMS 出庫揀貨清單畫面，按儲位排序減少行走時間',
    desc: '揀貨清單按儲位排序，掃碼複核防錯出',
  },
  {
    src: '/screenshots/wms-locations.png',
    title: '儲位視覺化地圖',
    alt: 'WMS 儲位視覺化地圖，熱區冷區一眼判讀',
    desc: '區/排/層/位四層結構，熱區冷區一眼判讀',
  },
  {
    src: '/screenshots/wms-stocktake.png',
    title: '盤點任務',
    alt: 'WMS 手機盤點任務畫面，掃碼盤點差異報表自動產生',
    desc: '日盤、週盤、年盤任務派發，掃碼盤點差異報表自動產生',
  },
  {
    src: '/screenshots/wms-pallet.png',
    title: '棧板與循環容器',
    alt: 'WMS 棧板與循環容器追蹤畫面，三倉之間流轉一筆不漏',
    desc: '棧板/籠車序號全程追蹤，三倉流轉與司機歸還一筆不漏',
  },
] as const

const WMS_WORKFLOW: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'arrow-down', title: '到貨入庫', desc: '掃碼自動分儲位' },
  { icon: 'bar-chart', title: '庫存即時', desc: '異動立刻反映' },
  { icon: 'clipboard-list', title: '揀貨任務', desc: '按儲位排序' },
  { icon: 'arrow-up', title: '出庫複核', desc: '掃碼防錯出' },
  { icon: 'truck', title: '通知 TMS', desc: '自動推派車' },
]

const ROLE_SCENARIOS: { role: string; device: string; icon: IconName; steps: string }[] = [
  {
    role: '倉管主管',
    device: '電腦',
    icon: 'user-circle',
    steps: '看儀表板 → 在庫量 12,840、今日出貨 418 → 點低庫存清單 → 一鍵生成補貨單 → 通知採購',
  },
  {
    role: '現場作業員',
    device: '手機',
    icon: 'hard-hat',
    steps: '打開手機 → 接到揀貨任務 → 按儲位順序揀貨 → 掃碼複核 → 系統自動扣帳、通知 TMS',
  },
  {
    role: '盤點人員',
    device: '手機',
    icon: 'search',
    steps: '收到盤點任務 → 掃碼或手動 → 數量輸入 → 系統自動比對差異 → 報表自動產出',
  },
]

export default function WMSPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Dr.Dow WMS"
        description={PRODUCTS.wms.description}
        url={`${SITE.url}/products/wms`}
        category="BusinessApplication"
      />
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', url: '/' },
          { name: '產品', url: '/#products' },
          { name: 'WMS 倉儲系統', url: '/products/wms' },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16" aria-label="WMS 倉儲管理系統介紹">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: '產品', href: '/#products' }, { name: 'WMS 倉儲系統', href: '/products/wms' }]} />
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="text-center lg:text-left">
              <p className="text-accent text-[12px] font-semibold tracking-[0.18em] uppercase mb-4">Warehouse Management System</p>
              <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-[1.15]">
                倉儲現場，
                <br />
                <span className="gradient-text">即時同步</span>
              </h1>
              <p className="text-lg text-muted max-w-xl mx-auto lg:mx-0 mb-8">
                {PRODUCTS.wms.description}
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <TrackedCTA
                  href="/contact"
                  location="hero"
                  product="wms"
                  label="primary"
                  className="px-8 py-3.5 bg-accent text-white rounded-full font-semibold hover:bg-accent-light transition-colors"
                >
                  預約 Demo
                </TrackedCTA>
                <TrackedCTA
                  href="#features"
                  location="hero"
                  product="wms"
                  label="view-features"
                  className="px-8 py-3.5 bg-black/5 rounded-full font-semibold hover:bg-black/10 transition-colors"
                >
                  看功能 →
                </TrackedCTA>
              </div>
            </FadeIn>
            <FadeIn delay={120} className="flex justify-center lg:justify-end">
              <Image
                src="/hero/wms-hero.png"
                alt="Dr.Dow WMS 倉儲管理系統 — 庫存儀表板與手機掃碼視覺"
                width={800}
                height={600}
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 560px"
                className="w-full max-w-[560px] h-auto"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-black/5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-12 text-center">
          {[
            { value: '3 倉', label: '即時同步聯動' },
            { value: '4 層', label: '儲位結構管理' },
            { value: '< 1s', label: '異動即時反映' },
            { value: '0', label: '紙本驗收作業' },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black gradient-text">{s.value}</div>
              <div className="text-sm text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Search Intent */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <p className="text-accent text-[12px] font-semibold tracking-[0.18em] uppercase mb-3">WMS / 倉儲管理系統 / 庫存管理系統</p>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              你搜尋的是 WMS，真正要解的是庫存不準和出貨錯誤
            </h2>
            <p className="text-muted text-lg max-w-3xl mx-auto">
              Dr.Dow WMS 把入庫、儲位、盤點、出庫複核與派車通知接起來，讓現場不再靠紙本、LINE 喊話和月底人工盤點補洞。
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                keyword: '倉儲管理系統',
                title: '入庫出庫都有掃碼紀錄',
                desc: '品項、批號、儲位、數量異動即時更新，主管不用等人回報才知道庫存狀態。',
              },
              {
                keyword: '庫存管理系統',
                title: '庫存差異可以追到來源',
                desc: '每一次入庫、移倉、揀貨、盤點都留下紀錄，差異不是月底才爆出來。',
              },
              {
                keyword: '條碼盤點系統',
                title: '盤點任務直接派到手機',
                desc: '現場掃碼回報，系統自動比對帳面與實盤差異，減少人工彙整時間。',
              },
            ].map((item) => (
              <FadeIn key={item.keyword}>
                <article className="bg-white rounded-2xl p-6 border border-black/5 h-full hover-lift">
                  <p className="text-xs font-semibold text-accent mb-3">{item.keyword}</p>
                  <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-xl font-bold mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <TrackedCTA
              href="#lead-form"
              location="search-intent"
              product="wms"
              label="demo-anchor"
              className="inline-flex px-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-light transition-colors"
            >
              用你的倉庫流程看一次 Demo
            </TrackedCTA>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">8 大核心功能</h2>
            <p className="text-muted text-lg">從到貨入庫到出貨派車，全程一套系統管。</p>
          </FadeIn>
          <FeatureGrid features={PRODUCTS.wms.features} columns={2} />
        </div>
      </section>

      {/* Role Scenarios */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">三種角色，三種場域</h2>
            <p className="text-muted text-lg">主管看數據、現場掃條碼、盤點靠手機。</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROLE_SCENARIOS.map((scenario, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 hover-lift h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 flex items-center justify-center mb-4">
                    <Icon name={scenario.icon} className="w-6 h-6 text-cyan-700" strokeWidth={1.75} />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-lg font-bold">{scenario.role}</h3>
                    <span className="text-xs text-muted bg-surface px-2 py-0.5 rounded-full">{scenario.device}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{scenario.steps}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-24 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">系統畫面</h2>
            <p className="text-white/50 text-lg">從電腦到手機，現場作業全打通</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCREENSHOTS.map((ss, i) => (
              <FadeIn key={i} delay={i * 80}>
                <figure className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={ss.src}
                    alt={ss.alt}
                    width={800}
                    height={500}
                    className="w-full aspect-video object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={80}
                  />
                  <figcaption className="p-4">
                    <p className="font-bold text-sm mb-1">{ss.title}</p>
                    <p className="text-xs text-white/50">{ss.desc}</p>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">從入庫到派車，全自動</h2>
            <p className="text-muted text-lg">WMS 與 TMS / ERP 在同一個事實來源上運作。</p>
          </FadeIn>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2">
            {WMS_WORKFLOW.map((step, i) => (
              <FadeIn key={i} delay={i * 100} className="flex items-center gap-2">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-cyan-600 text-white flex items-center justify-center mx-auto mb-2">
                    <Icon name={step.icon} className="w-6 h-6" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-bold">{step.title}</p>
                  <p className="text-xs text-muted">{step.desc}</p>
                </div>
                {i < WMS_WORKFLOW.length - 1 && (
                  <span className="hidden md:block text-accent text-xl mx-2">→</span>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">無縫整合</h2>
            <p className="text-muted text-lg mb-12">與 TMS、ERP、條碼設備直接串接</p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              {['TMS 派車', 'ERP 財務', '條碼/QR', 'PDA 設備', 'LINE 通知', 'SSO 認證'].map((name) => (
                <div key={name} className="px-5 py-2.5 bg-surface rounded-xl text-sm font-medium text-muted">
                  {name}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cross Product */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold mb-2 tracking-tight">物流產業線其他產品</h2>
            <p className="text-muted text-sm">搭配使用，從訂單到撥款全程串接</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/products/tms" className="group bg-white rounded-2xl p-6 hover-lift border border-black/5">
              <h3 className="font-bold mb-1 group-hover:text-accent transition-colors">TMS 派車系統</h3>
              <p className="text-sm text-muted">智慧派車板、司機 LINE App、GPS 追蹤、薪酬自動計算。</p>
            </Link>
            <Link href="/products/erp" className="group bg-white rounded-2xl p-6 hover-lift border border-black/5">
              <h3 className="font-bold mb-1 group-hover:text-accent transition-colors">ERP 財務系統</h3>
              <p className="text-sm text-muted">AI OCR 請款、銀行自動對帳、六層付款防呆，財務零差錯。</p>
            </Link>
          </div>
        </div>
      </section>

      <ProductFAQ
        productKey="wms"
        title="關於 WMS 倉儲管理系統，你可能想問"
        subtitle="導入前最常被問的問題，一次看完"
      />

      <RelatedProductPosts
        productKey="wms"
        title="WMS 倉儲管理相關閱讀"
        subtitle="WMS 是什麼、Excel 換 WMS 訊號、WMS / TMS / ERP 串接實務"
      />

      <InlineLeadForm source="wms" />

      <CTASection variant="logistics" />
    </>
  )
}
