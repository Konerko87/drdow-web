import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { PRODUCTS, WORKFLOW_STEPS } from '@/lib/constants'
import { FadeIn } from '@/components/ui/fade-in'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { CTASection } from '@/components/sections/cta-section'
import { SoftwareApplicationJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: 'Dr.Dow TMS — 物流派車 AI 系統 | 運輸管理系統',
  description: '智慧派車板、司機 LINE App、GPS 即時追蹤、薪酬自動計算。一套系統取代 Excel + LINE 群組，專為台灣中小物流公司設計的 TMS。',
  path: '/products/tms',
})

const SCREENSHOTS = [
  { src: '/screenshots/tms-dispatch.png', title: '派車板 — 車找任務', desc: '任務分組 + 一鍵指派 + 自動填滿，派 10 台車只要 10 下' },
  { src: '/screenshots/tms-focus.png', title: '專注派車模式', desc: '點選車輛進入專注模式，路線提示、容量計算、拖拉調整' },
  { src: '/screenshots/tms-table.png', title: '表格模式', desc: 'Google Sheet 風格，所有資訊一覽無遺，下拉選單直接指派' },
  { src: '/screenshots/tms-kpi.png', title: '營運 KPI 總覽', desc: '板數趨勢、準時率、裝載率、每板成本、回程空車率一頁看完' },
  { src: '/screenshots/tms-fleet.png', title: '車輛維護管理', desc: '維修/耗材/保養分類，保養排程提醒，費用分析' },
  { src: '/screenshots/tms-driver-app.png', title: '司機 LINE App', desc: '不用裝 App，LINE 裡直接操作。任務、簽到、拍照、報修' },
]

export default function TMSPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Dr.Dow TMS"
        description={PRODUCTS.tms.description}
        url="https://drdowai.com/products/tms"
        category="BusinessApplication"
      />
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', url: '/' },
          { name: '產品', url: '/#products' },
          { name: 'TMS 派車系統', url: '/products/tms' },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">Transport Management System</p>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              {PRODUCTS.tms.tagline.split('，')[0]}，
              <br />
              <span className="gradient-text">{PRODUCTS.tms.tagline.split('，')[1]}</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              {PRODUCTS.tms.description}
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
            { value: '40+', label: '管理車輛' },
            { value: '300+', label: '日處理板數' },
            { value: '15+', label: '司機即時追蹤' },
            { value: '3', label: '區域倉庫聯動' },
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
            <h2 className="text-3xl md:text-4xl font-black mb-4">9 大核心功能</h2>
            <p className="text-muted text-lg">一套系統，從派車到結算全部搞定。</p>
          </FadeIn>
          <FeatureGrid features={PRODUCTS.tms.features} columns={3} />
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-24 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">系統畫面</h2>
            <p className="text-white/50 text-lg">專為物流調度員設計的直覺操作介面</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SCREENSHOTS.map((ss, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={ss.src}
                    alt={ss.title}
                    width={800}
                    height={500}
                    className="w-full aspect-video object-cover object-top"
                  />
                  <div className="p-4">
                    <h4 className="font-bold text-sm mb-1">{ss.title}</h4>
                    <p className="text-xs text-white/50">{ss.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">從訂單到結算，全自動</h2>
          </FadeIn>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-2">
            {WORKFLOW_STEPS.slice(0, 5).map((step, i) => (
              <FadeIn key={i} delay={i * 100} className="flex items-center gap-2">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center text-2xl mx-auto mb-2">
                    {step.icon}
                  </div>
                  <h4 className="text-sm font-bold">{step.title}</h4>
                  <p className="text-xs text-muted">{step.desc}</p>
                </div>
                {i < 4 && (
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
            <p className="text-muted text-lg mb-12">與您現有的系統串接，不需要替換</p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              {['WMS 倉儲', 'LINE 通訊', 'ERP 財務', 'GPS 追蹤', '加油卡系統', 'SSO 認證'].map((name) => (
                <div key={name} className="px-5 py-2.5 bg-surface rounded-xl text-sm font-medium text-muted">
                  {name}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  )
}
