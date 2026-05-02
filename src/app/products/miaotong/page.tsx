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
import { InlineLeadForm } from '@/components/sections/inline-lead-form'
import { RelatedProductPosts } from '@/components/sections/related-product-posts'
import { SoftwareApplicationJsonLd, BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo/json-ld'
import { Icon, type IconName } from '@/components/ui/icon'
import { LanternIllustration } from '@/components/ui/lantern-illustration'

export const metadata: Metadata = createMetadata({
  title: '廟通 — 智慧宮廟管理系統｜LINE Pay 線上點燈、家人代辦、發財金',
  description: '點燈一週對帳變即時、信徒在 LINE 直接用 LINE Pay 付款、家人可代爸媽點燈報名法會、發財金借還黑名單自動管理。專為台灣宮廟打造的廟務 SaaS，最快 1 週上線。免費預約展示。',
  path: '/products/miaotong',
  image: 'https://drdowai.com/og/miaotong-og.png',
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
            <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">這些痛點，你們廟也有嗎？</h2>
            <p className="text-muted text-lg">廟通幫你一次解決</p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MIAOTONG_PAIN_POINTS.map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-black/5 hover-lift h-full">
                  <div className="w-12 h-12 rounded-xl bg-[#FEF2F2] flex items-center justify-center mb-4">
                    <Icon name={p.icon as IconName} className="w-6 h-6 text-[#B91C1C]" strokeWidth={1.75} />
                  </div>
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
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">8 大核心功能模組</h2>
            <p className="text-muted text-lg">從信徒資料到會計報表，一套系統管到好</p>
          </FadeIn>
          <FeatureGrid features={MIAOTONG.features} columns={2} />
        </div>
      </section>

      {/* Target Audience — warm-editorial (open-design v0.1.0 web-prototype skill) */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, #fef7f2 0%, #fdf3e7 100%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(185,28,28,0.10) 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
            opacity: 0.55,
            WebkitMaskImage: 'linear-gradient(180deg, transparent 0, #000 18%, #000 82%, transparent 100%)',
            maskImage: 'linear-gradient(180deg, transparent 0, #000 18%, #000 82%, transparent 100%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-flex items-center gap-2.5 text-xs font-mono font-medium uppercase tracking-[0.16em] text-[#B91C1C]">
              <span className="w-7 h-px bg-[#B91C1C]/60" />
              為宮廟團隊而生
              <span className="w-7 h-px bg-[#B91C1C]/60" />
            </span>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] font-extrabold text-3xl md:text-5xl tracking-tight text-[#1c1714] mt-4 leading-tight">
              誰適合使用<span className="text-[#B91C1C]">廟通</span>？
            </h2>
            <p className="text-base md:text-[17px] text-[#6b5b4a] max-w-2xl mx-auto mt-4 leading-relaxed">
              從管委會到櫃台、從會計到信徒——不論你在宮廟生態裡扮演哪個角色，廟通都能讓你的工作更輕鬆。
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MIAOTONG_TARGET_AUDIENCE.map((t, i) => (
              <FadeIn key={i} delay={i * 60}>
                <article className="group relative bg-white rounded-3xl p-7 border border-[#B91C1C]/[0.08] hover:border-[#B91C1C]/[0.18] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(185,28,28,0.18),0_4px_10px_-4px_rgba(124,19,19,0.10)] transition-all duration-[350ms] h-full">
                  <div
                    className="w-12 h-12 rounded-2xl grid place-items-center mb-4"
                    style={{ background: 'linear-gradient(135deg, rgba(185,28,28,0.12) 0%, rgba(217,119,6,0.12) 100%)' }}
                  >
                    <Icon name={t.icon as IconName} className="w-[22px] h-[22px] text-[#B91C1C]" strokeWidth={1.8} />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#d97706] mb-2.5">
                    Role · {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-[family-name:var(--font-noto-serif-tc)] font-bold text-[19px] tracking-tight text-[#1c1714] mb-2 leading-snug">
                    {t.role}
                  </h3>
                  <p className="text-[14.5px] text-[#6b5b4a] leading-relaxed">
                    {t.desc}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages — editorial split with sticky lantern (open-design v0.1.0) */}
      <section className="relative py-28 md:py-32 bg-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(185,28,28,0.6) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            opacity: 0.03,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 lg:gap-20 items-start">
            <div>
              <FadeIn className="mb-10">
                <span className="inline-flex items-center gap-2.5 text-xs font-mono font-medium uppercase tracking-[0.16em] text-[#B91C1C]">
                  <span className="w-7 h-px bg-[#B91C1C]/60" />
                  為什麼選廟通？
                </span>
                <h2 className="font-[family-name:var(--font-noto-serif-tc)] font-extrabold text-3xl md:text-5xl tracking-tight text-[#1c1714] mt-4 leading-tight">
                  不是套通用 SaaS，<br />是<span className="text-[#B91C1C]">為台灣廟方</span>長出來的。
                </h2>
              </FadeIn>

              <ol className="flex flex-col gap-9">
                {MIAOTONG_ADVANTAGES.map((a, i) => (
                  <FadeIn key={i} delay={i * 80}>
                    <li className="grid grid-cols-[64px_1fr] gap-5 items-start">
                      <div className="relative w-12 h-12 rounded-full grid place-items-center text-white font-[family-name:var(--font-noto-serif-tc)] font-extrabold text-xl"
                        style={{
                          background: 'linear-gradient(135deg, #B91C1C 0%, #d97706 100%)',
                          boxShadow: '0 6px 16px -6px rgba(185,28,28,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
                        }}
                      >
                        {i + 1}
                        <span aria-hidden="true" className="absolute -inset-1 rounded-full border border-dashed border-[#B91C1C]/25" />
                      </div>
                      <div>
                        <h3 className="font-[family-name:var(--font-noto-serif-tc)] font-bold text-[19px] tracking-tight text-[#1c1714] mb-2 leading-snug">
                          {a.title}
                        </h3>
                        <p className="text-[14.5px] text-[#6b5b4a] leading-[1.7] max-w-[46ch]">
                          {a.desc}
                        </p>
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ol>
            </div>

            {/* Sticky lantern illustration */}
            <aside className="lg:sticky lg:top-24 grid place-items-center w-full max-w-[460px] mx-auto aspect-square">
              <LanternIllustration />
            </aside>
          </div>
        </div>
      </section>

      {/* LINE Integration */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B91C1C]/10 to-[#D97706]/10 flex items-center justify-center mx-auto mb-6">
              <Icon name="smartphone" className="w-8 h-8 text-[#B91C1C]" strokeWidth={1.75} />
            </div>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">LINE 就能用，信眾免下載 App</h2>
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
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">常見問題</h2>
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

      <RelatedProductPosts
        productKey="miaotong"
        title="廟通 宮廟管理相關閱讀"
        subtitle="點燈流程、家人代辦、發財金、收據與 LINE Pay 實務"
      />

      <InlineLeadForm source="miaotong" />

      {/* CTA */}
      <section className="relative py-32 overflow-hidden" style={{ background: '#1E293B' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B91C1C] opacity-10 rounded-full blur-[120px]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
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
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold mb-2 tracking-tight">其他產品</h2>
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
