import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/constants'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ContactForm } from '@/components/sections/contact-form'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '聯繫我們 — 預約 Demo',
  description: '預約 Dr.Dow AI 廟通宮廟管理、物流派車 TMS 或財務 ERP 系統的免費 Demo。30 分鐘了解如何從手動變全自動。',
  path: '/contact',
  keywords: ['聯繫', '預約Demo', '免費諮詢', 'Dr.Dow AI', '廟通', 'TMS', 'ERP'],
})

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '聯繫我們', url: '/contact' }]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: '聯繫我們',
        description: '預約 Dr.Dow AI 產品 Demo',
        url: `${SITE.url}/contact`,
        mainEntity: {
          '@type': 'Organization',
          name: SITE.name,
          email: SITE.email,
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Sales',
            email: SITE.email,
            availableLanguage: ['zh-TW'],
          },
        },
      }} />

      <section className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: '聯繫我們', href: '/contact' }]} />
          <FadeIn className="text-center mb-16 mt-6">
            <h1 className="text-4xl md:text-5xl font-black mb-4">預約 Demo</h1>
            <p className="text-lg text-muted max-w-xl mx-auto">
              30 分鐘了解 Dr.Dow AI 如何讓你的宮廟管理或物流營運從手動變全自動。
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Contact Form */}
            <FadeIn>
              <div className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm">
                <h2 className="text-xl font-black mb-6">留言給我們</h2>
                <ContactForm />
              </div>
            </FadeIn>

            {/* Right: Info */}
            <FadeIn delay={100}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-black mb-4">聯繫方式</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl">✉️</span>
                      <div>
                        <p className="font-semibold text-sm">Email</p>
                        <a href={`mailto:${SITE.email}`} className="text-accent text-sm">{SITE.email}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">🏢</span>
                      <div>
                        <p className="font-semibold text-sm">公司</p>
                        <p className="text-sm text-muted">{SITE.company}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl">📍</span>
                      <div>
                        <p className="font-semibold text-sm">地點</p>
                        <p className="text-sm text-muted">台灣</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-2xl p-6">
                  <h3 className="font-bold mb-3">Demo 包含什麼？</h3>
                  <ul className="space-y-2 text-sm text-muted">
                    {[
                      '了解你的業務需求和痛點',
                      '實際操作廟通 / TMS / ERP 系統示範',
                      '客製化建議和導入計劃',
                      '30 天免費試用帳號',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-success mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-accent/5 rounded-2xl p-6 border border-accent/10">
                  <p className="text-sm font-semibold text-accent mb-1">回覆時間</p>
                  <p className="text-sm text-muted">
                    我們會在 <strong className="text-dark">24 小時內</strong> 回覆你的留言。
                    急件請直接寄 Email 到 {SITE.email}。
                  </p>
                </div>

                <div className="bg-surface rounded-2xl p-6">
                  <h3 className="font-bold mb-3">常見問題</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold text-dark">Demo 需要付費嗎？</dt>
                      <dd className="text-muted mt-0.5">完全免費，30 分鐘線上展示，無任何義務。</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-dark">導入需要多久？</dt>
                      <dd className="text-muted mt-0.5">基本功能 1-2 週即可上線，含教育訓練。</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-dark">有試用期嗎？</dt>
                      <dd className="text-muted mt-0.5">提供 30 天免費試用，滿意再簽約。</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
