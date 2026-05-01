import { FadeIn } from '@/components/ui/fade-in'
import { FAQPageJsonLd } from '@/components/seo/json-ld'
import { getProductFAQ } from '@/lib/faq-data'

type Props = {
  productKey: 'miaotong' | 'tms' | 'wms' | 'erp'
  title?: string
  subtitle?: string
}

export function ProductFAQ({ productKey, title = '常見問題', subtitle }: Props) {
  const faqs = getProductFAQ(productKey)

  return (
    <>
      <FAQPageJsonLd faqs={faqs} />
      <section className="py-24 bg-surface" aria-label={`${productKey} 常見問題`}>
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-4xl font-bold mb-4 tracking-tight">{title}</h2>
            {subtitle && <p className="text-muted text-lg">{subtitle}</p>}
          </FadeIn>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 40}>
                <details className="group bg-white rounded-xl border border-black/5">
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
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
