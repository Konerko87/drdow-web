import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CTASection } from '@/components/sections/cta-section'
import { FAQPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { FAQ_CATEGORIES } from '@/lib/faq-data'
import { WarmCreamBg } from '@/components/ui/warm-cream-bg'

export const metadata: Metadata = createMetadata({
  title: '常見問題 FAQ — 廟通 / TMS / WMS / ERP',
  description: '關於 Dr.Dow AI 廟通宮廟管理系統、TMS 物流派車系統、WMS 倉儲系統和 ERP 財務系統的常見問題解答。',
  path: '/faq',
  keywords: ['FAQ', '常見問題', '廟通', 'TMS', 'WMS', 'ERP', '物流系統', '倉儲系統', '宮廟管理'],
})

const FAQS = FAQ_CATEGORIES
const allFaqs = FAQS.flatMap((cat) => cat.items)

export default function FAQPage() {
  return (
    <>
      <FAQPageJsonLd faqs={allFaqs} />
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: 'FAQ', url: '/faq' }]} />

      <section className="relative pt-32 pb-16 overflow-hidden">
        <WarmCreamBg />
        <div className="relative max-w-4xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: 'FAQ', href: '/faq' }]} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center mt-6">
          <FadeIn>
            <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-4xl md:text-5xl font-bold mb-4 tracking-tight text-dark">常見問題</h1>
            <p className="text-lg text-[#6b5b4a]">
              關於 Dr.Dow AI 廟通、TMS、WMS 和 ERP 的所有問題
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {FAQS.map((category, ci) => (
            <FadeIn key={ci} delay={ci * 100} className="mb-12">
              <h2 className={`font-[family-name:var(--font-noto-serif-tc)] text-xl font-bold mb-6 tracking-tight`} style={category.accent ? { color: category.accent } : { color: 'var(--color-accent)' }}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.items.map((faq, fi) => (
                  <details key={fi} className="group bg-surface rounded-xl">
                    <summary className="cursor-pointer p-5 font-semibold text-sm flex items-center justify-between list-none">
                      <span>{faq.question}</span>
                      <svg className="w-5 h-5 text-muted flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTASection variant="generic" />
    </>
  )
}
