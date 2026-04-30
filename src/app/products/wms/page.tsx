import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { SITE, PRODUCTS } from '@/lib/constants'
import { FadeIn } from '@/components/ui/fade-in'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { CTASection } from '@/components/sections/cta-section'
import { SoftwareApplicationJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { Breadcrumb } from '@/components/ui/breadcrumb'

export const metadata: Metadata = createMetadata({
  title: 'Dr.Dow WMS — 智慧倉儲管理系統 | 條碼盤點、即時庫存',
  description: '入庫、出庫、盤點、儲位管理一套搞定。手機掃碼、即時庫存、TMS / ERP 全打通，倉儲現場不再靠紙本和喊話追資料。',
  path: '/products/wms',
  keywords: ['WMS', '倉儲管理系統', '庫存管理系統', '條碼盤點', '出入庫管理', '儲位管理', '物流倉儲'],
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

const WMS_WORKFLOW = [
  { icon: '📥', title: '到貨入庫', desc: '掃碼自動分儲位' },
  { icon: '📊', title: '庫存即時', desc: '異動立刻反映' },
  { icon: '📋', title: '揀貨任務', desc: '按儲位排序' },
  { icon: '📤', title: '出庫複核', desc: '掃碼防錯出' },
  { icon: '🚛', title: '通知 TMS', desc: '自動推派車' },
] as const

const ROLE_SCENARIOS = [
  {
    role: '倉管主管',
    device: '電腦',
    icon: '👨‍💼',
    steps: '看儀表板 → 在庫量 12,840、今日出貨 418 → 點低庫存清單 → 一鍵生成補貨單 → 通知採購',
  },
  {
    role: '現場作業員',
    device: '手機',
    icon: '👷',
    steps: '打開手機 → 接到揀貨任務 → 按儲位順序揀貨 → 掃碼複核 → 系統自動扣帳、通知 TMS',
  },
  {
    role: '盤點人員',
    device: '手機',
    icon: '🔍',
    steps: '收到盤點任務 → 掃碼或手動 → 數量輸入 → 系統自動比對差異 → 報表自動產出',
  },
] as const

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
      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white" aria-label="WMS 倉儲管理系統介紹">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: '產品', href: '/#products' }, { name: 'WMS 倉儲系統', href: '/products/wms' }]} />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center mt-6">
          <FadeIn>
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">Warehouse Management System</p>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              倉儲現場，
              <br />
              <span className="gradient-text">即時同步</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              {PRODUCTS.wms.description}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact" className="px-8 py-3.5 bg-accent text-white rounded-full font-semibold hover:bg-accent-light transition-colors">
                預約 Demo
              </Link>
              <Link href="#features" className="px-8 py-3.5 bg-black/5 rounded-full font-semibold hover:bg-black/10 transition-colors">
                看功能 →
              </Link>
            </div>
          </FadeIn>
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

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">8 大核心功能</h2>
            <p className="text-muted text-lg">從到貨入庫到出貨派車，全程一套系統管。</p>
          </FadeIn>
          <FeatureGrid features={PRODUCTS.wms.features} columns={2} />
        </div>
      </section>

      {/* Role Scenarios */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">三種角色，三種場域</h2>
            <p className="text-muted text-lg">主管看數據、現場掃條碼、盤點靠手機。</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROLE_SCENARIOS.map((scenario, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-8 hover-lift h-full">
                  <div className="text-4xl mb-3">{scenario.icon}</div>
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
            <h2 className="text-3xl md:text-4xl font-black mb-4">系統畫面</h2>
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
            <h2 className="text-3xl md:text-4xl font-black mb-4">從入庫到派車，全自動</h2>
            <p className="text-muted text-lg">WMS 與 TMS / ERP 在同一個事實來源上運作。</p>
          </FadeIn>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2">
            {WMS_WORKFLOW.map((step, i) => (
              <FadeIn key={i} delay={i * 100} className="flex items-center gap-2">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-2xl mx-auto mb-2">
                    {step.icon}
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
            <h2 className="text-3xl md:text-4xl font-black mb-4">無縫整合</h2>
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
            <h2 className="text-2xl font-black mb-2">物流產業線其他產品</h2>
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

      <CTASection />
    </>
  )
}
