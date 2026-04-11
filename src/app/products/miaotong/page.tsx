import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/constants'
import {
  MIAOTONG,
  MIAOTONG_PAIN_POINTS,
  MIAOTONG_TARGET_AUDIENCE,
  MIAOTONG_ADVANTAGES,
  MIAOTONG_FAQ,
  MIAOTONG_STATS,
} from '@/lib/miaotong-constants'
import { FadeIn } from '@/components/ui/fade-in'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { SoftwareApplicationJsonLd, BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '廟通 — 智慧宮廟管理系統 | 點燈牌位 捐款 法會',
  description: '專為台灣宮廟打造的一站式管理平台。信徒管理、點燈牌位、捐款收據、法會報名、發財金借還、會計報表、LINE 行動服務，一套系統全整合。',
  path: '/products/miaotong',
  keywords: ['廟通', '宮廟管理系統', '廟務系統', '點燈系統', '捐款管理', '法會報名', '宮廟數位轉型'],
})

export default function MiaotongPage() {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Dr.Dow AI 廟通"
        description={MIAOTONG.description}
        url={`${SITE.url}/products/miaotong`}
        category="BusinessApplication"
      />
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', url: '/' },
          { name: '產品', url: '/#products' },
          { name: '廟通 宮廟管理系統', url: '/products/miaotong' },
        ]}
      />
      <FAQPageJsonLd
        faqs={MIAOTONG_FAQ.map(f => ({ question: f.question, answer: f.answer }))}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: '#1E293B' }}>
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#B91C1C] opacity-10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#D97706] opacity-10 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Visible breadcrumb */}
          <nav aria-label="breadcrumb" className="text-xs text-white/40 mb-8">
            <ol className="flex items-center gap-1.5">
              <li><Link href="/" className="hover:text-white/70 transition-colors">首頁</Link></li>
              <li><span className="text-white/20">/</span></li>
              <li><Link href="/#products" className="hover:text-white/70 transition-colors">產品</Link></li>
              <li><span className="text-white/20">/</span></li>
              <li><span className="text-white/70 font-medium">廟通 宮廟管理系統</span></li>
            </ol>
          </nav>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="mb-6">
              <Image src="/logo-miaotong.png" alt="Dr.Dow AI 廟通智慧宮廟管理系統 logo" width={80} height={80} className="mx-auto mb-4" priority />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/10 rounded-full text-sm text-white/80 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse" />
              智慧宮廟管理系統
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              真正懂台灣宮廟流程的
              <br />
              <span className="gradient-text-temple">智慧管理平台</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-4">
              Dr.Dow AI 廟通，專為台灣宮廟打造。整合信徒管理、點燈牌位、捐款收據、法會活動、發財金借還、會計報表與 LINE 行動服務。
            </p>
            <p className="text-sm text-white/40 mb-8">
              不只是紀錄資料，而是讓廟務流程更順、更清楚、更可追蹤。
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="px-8 py-3.5 bg-[#B91C1C] text-white rounded-full font-semibold hover:bg-[#DC2626] transition-colors">
                預約產品展示
              </Link>
              <Link href="#features" className="px-8 py-3.5 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors border border-white/10">
                看功能介紹 →
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-black/5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-12 text-center">
          {MIAOTONG_STATS.map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black gradient-text-temple">{s.value}</div>
              <div className="text-sm text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">這些痛點，你們廟也有嗎？</h2>
            <p className="text-muted text-lg">廟通幫你一次解決</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MIAOTONG_PAIN_POINTS.map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-black/5 hover-lift h-full">
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <div className="mb-4">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-[#B91C1C] text-xs font-bold mt-0.5">痛點</span>
                      <p className="text-sm text-muted line-through decoration-[#B91C1C]/30">{p.problem}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#22C55E] text-xs font-bold mt-0.5">解法</span>
                      <p className="text-sm font-medium">{p.solution}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-[#FFF7ED]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">8 大核心功能模組</h2>
            <p className="text-muted text-lg">從信徒資料到會計報表，一套系統管到好</p>
          </FadeIn>
          <FeatureGrid features={MIAOTONG.features} columns={2} />
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">誰適合使用廟通？</h2>
            <p className="text-muted text-lg">從管委會到櫃台，每個角色都有專屬功能</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MIAOTONG_TARGET_AUDIENCE.map((t, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-black/5 hover-lift h-full">
                  <div className="text-3xl mb-3">{t.icon}</div>
                  <h3 className="text-base font-bold mb-2">{t.role}</h3>
                  <p className="text-sm text-muted leading-relaxed">{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">為什麼選廟通？</h2>
            <p className="text-muted text-lg">比陽春系統更完整，比客製專案更容易開始</p>
          </FadeIn>
          <div className="space-y-6">
            {MIAOTONG_ADVANTAGES.map((a, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #B91C1C, #D97706)' }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{a.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* LINE Integration */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="text-5xl mb-6">📱</div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">LINE 就能用，信眾免下載 App</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-12">
              信眾透過 LINE 就能線上點燈、法會報名、捐款紀錄查詢。不用下載 App、不用註冊帳號，打開 LINE 就能用。
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="flex flex-wrap justify-center gap-4">
              {['線上點燈', '法會報名', '捐款查詢', '個人紀錄', 'LINE 推播', '活動通知'].map((name) => (
                <div key={name} className="px-5 py-2.5 bg-[#FFF7ED] rounded-xl text-sm font-medium text-[#92400E]">
                  {name}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#FEF2F2]">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">常見問題</h2>
          </FadeIn>
          <div className="space-y-4">
            {MIAOTONG_FAQ.map((faq, i) => (
              <FadeIn key={i} delay={i * 60}>
                <details className="group bg-white rounded-2xl border border-black/5 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-sm">
                    {faq.question}
                    <svg className="w-5 h-5 text-muted transition-transform group-open:rotate-180 flex-shrink-0 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden" style={{ background: '#1E293B' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B91C1C] opacity-10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              讓宮廟管理進入
              <span className="gradient-text-temple">智慧時代</span>
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              想了解 Dr.Dow AI 廟通如何導入你們廟的流程？歡迎預約產品展示，我們會針對你的需求做完整介紹。
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/contact" className="px-8 py-3.5 bg-[#B91C1C] text-white rounded-full font-semibold hover:bg-[#DC2626] transition-colors">
                預約產品展示
              </Link>
              <Link href="/contact" className="px-8 py-3.5 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors border border-white/10">
                立即諮詢
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cross Product */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl font-black mb-2">其他產品</h2>
            <p className="text-muted text-sm">Dr.Dow AI 全系列解決方案</p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/products/tms" className="group bg-white rounded-2xl p-6 hover-lift border border-black/5">
              <h3 className="font-bold mb-1 group-hover:text-accent transition-colors">TMS 派車系統</h3>
              <p className="text-sm text-muted">智慧派車板、司機 LINE App、GPS 追蹤、薪資自動計算。</p>
            </Link>
            <Link href="/products/erp" className="group bg-white rounded-2xl p-6 hover-lift border border-black/5">
              <h3 className="font-bold mb-1 group-hover:text-accent transition-colors">ERP 財務系統</h3>
              <p className="text-sm text-muted">AI OCR 請款、銀行自動對帳、六層付款防呆，財務零差錯。</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
