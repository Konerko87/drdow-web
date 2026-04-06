import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { PRODUCTS } from '@/lib/constants'
import { FadeIn } from '@/components/ui/fade-in'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { CTASection } from '@/components/sections/cta-section'
import { SoftwareApplicationJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: 'Dr.Dow ERP — 物流財務 AI 系統 | 自動對帳 OCR 請款',
  description: 'AI 拍照請款、銀行自動對帳、六層付款防呆、老闆行動 App、廠商自助 Portal。專為物流公司打造的智慧財務系統。',
  path: '/products/erp',
})

const ROLE_SCENARIOS = [
  {
    role: '老闆',
    device: '手機',
    icon: '👔',
    steps: '打開 App → 看收款進度 78% → 3 筆待審核 → 滑一下看照片和明細 → 通過 → LINE 通知老闆娘匯款',
  },
  {
    role: '老闆娘',
    device: '電腦',
    icon: '💻',
    steps: '待匯款頁 → 展開看完整照片/明細/備註 → 確認沒問題打勾 → 複製帳號 → 匯款 → 批次確認',
  },
  {
    role: '廠商',
    device: '手機',
    icon: '🏪',
    steps: 'LINE 登入 → 拍照上傳發票 → AI 自動填單 → 送出 → 追蹤進度條 → 預計 4/25 撥款',
  },
]

const SCREENSHOTS = [
  { src: '/screenshots/erp-boss.png', title: 'Boss App 總覽', desc: '收款進度、待審核、薪資排行、應收對帳一頁看完', mobile: true },
  { src: '/screenshots/erp-ocr.png', title: 'AI OCR 上傳請款', desc: '拍照上傳，AI 自動辨識廠商、金額、明細', mobile: false },
  { src: '/screenshots/erp-payments.png', title: '待匯款明細', desc: '展開完整照片、備註，逐筆確認匯款', mobile: false },
  { src: '/screenshots/erp-bank.png', title: '月度收款對帳', desc: '銀行爬蟲自動抓明細，AI 比對應收帳款', mobile: false },
  { src: '/screenshots/erp-salary.png', title: '薪資排行', desc: 'TMS 司機自動同步，勞健保勞退一目了然', mobile: true },
  { src: '/screenshots/erp-vendor.png', title: '廠商付款追蹤', desc: 'LINE 登入，送請款、追進度、看撥款', mobile: true },
]

export default function ERPPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Dr.Dow ERP"
        description={PRODUCTS.erp.description}
        url="https://drdowai.com/products/erp"
        category="BusinessApplication"
      />
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', url: '/' },
          { name: '產品', url: '/#products' },
          { name: 'ERP 財務系統', url: '/products/erp' },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">Financial Management System</p>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              物流財務，
              <br />
              <span className="gradient-text">AI 自動管</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              {PRODUCTS.erp.description}
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
            { value: '6 層', label: '付款防呆機制' },
            { value: '3 家', label: '銀行自動串接' },
            { value: '513 筆', label: '銀行交易自動比對' },
            { value: '95%+', label: 'OCR 辨識準確率' },
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
            <p className="text-muted text-lg">從請款到撥款，每一步都有 AI 把關。</p>
          </FadeIn>
          <FeatureGrid features={PRODUCTS.erp.features} columns={2} />
        </div>
      </section>

      {/* Role Scenarios */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">三種角色，三種體驗</h2>
            <p className="text-muted text-lg">每個人都有最適合的操作方式。</p>
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

      {/* Screenshots — Desktop */}
      <section className="py-24 bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">系統畫面</h2>
            <p className="text-white/50 text-lg">為不同角色設計的直覺操作介面</p>
          </FadeIn>

          {/* Desktop screenshots (16:10) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {SCREENSHOTS.filter((ss) => !ss.mobile).map((ss, i) => (
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

          {/* Mobile screenshots (phone mockup) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SCREENSHOTS.filter((ss) => ss.mobile).map((ss, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="flex flex-col items-center">
                  <div className="relative w-[240px] mx-auto">
                    {/* Phone frame */}
                    <div className="bg-[#1a1a2e] rounded-[2rem] p-2 shadow-2xl shadow-black/40 border border-white/10">
                      <div className="bg-black rounded-[1.5rem] overflow-hidden">
                        {/* Notch */}
                        <div className="bg-black h-6 flex justify-center items-end pb-1">
                          <div className="w-16 h-3 bg-[#1a1a2e] rounded-full" />
                        </div>
                        <Image
                          src={ss.src}
                          alt={ss.title}
                          width={390}
                          height={844}
                          className="w-full object-cover object-top"
                          style={{ maxHeight: '420px' }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <h4 className="font-bold text-sm mb-1">{ss.title}</h4>
                    <p className="text-xs text-white/50">{ss.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Layer Protection */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">六層付款防呆</h2>
            <p className="text-muted text-lg">從輸入到匯款，每一層都有保護。</p>
          </FadeIn>
          <div className="space-y-4">
            {[
              { layer: '1', title: 'DB 約束', desc: '資料庫層級防止重複建立' },
              { layer: '2', title: '照片 Hash 比對', desc: 'SHA-256 辨識重複發票照片' },
              { layer: '3', title: '軟警告', desc: '金額異常、日期異常自動提醒' },
              { layer: '4', title: 'Boss 審核', desc: '老闆手機一鍵審核，看照片和明細' },
              { layer: '5', title: 'API 冪等性', desc: '技術層防止重複提交' },
              { layer: '6', title: '老闆娘逐筆確認', desc: '最後一關，看完才匯款' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="flex items-center gap-4 bg-surface rounded-xl p-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {item.layer}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-muted">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
