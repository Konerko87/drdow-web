import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'
import { PRODUCTS } from '@/lib/constants'

export function ProductCards() {
  return (
    <section id="products" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">兩套系統，一個目標</h2>
          <p className="text-muted text-lg">讓你的物流公司從手動走向全自動。</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TMS Card */}
          <FadeIn>
            <div className="gradient-border p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🚛</span>
                <div>
                  <h3 className="text-xl font-black">{PRODUCTS.tms.name}</h3>
                  <p className="text-sm text-muted">{PRODUCTS.tms.fullName}</p>
                </div>
              </div>
              <p className="text-muted mb-6">{PRODUCTS.tms.description}</p>

              {/* Screenshot placeholder */}
              <div className="bg-surface rounded-xl aspect-video mb-6 flex items-center justify-center text-muted text-sm border border-black/5">
                TMS 派車板截圖
              </div>

              <ul className="space-y-2 mb-6">
                {PRODUCTS.tms.features.slice(0, 5).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span>{f.icon}</span>
                    <span className="font-medium">{f.title}</span>
                    <span className="text-muted">— {f.desc.split('。')[0]}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/products/tms"
                className="inline-flex items-center gap-1 text-accent font-semibold text-sm hover:gap-2 transition-all"
              >
                了解更多 <span>→</span>
              </Link>
            </div>
          </FadeIn>

          {/* ERP Card */}
          <FadeIn delay={100}>
            <div className="gradient-border p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">💰</span>
                <div>
                  <h3 className="text-xl font-black">{PRODUCTS.erp.name}</h3>
                  <p className="text-sm text-muted">{PRODUCTS.erp.fullName}</p>
                </div>
              </div>
              <p className="text-muted mb-6">{PRODUCTS.erp.description}</p>

              {/* Screenshot placeholder */}
              <div className="bg-surface rounded-xl aspect-video mb-6 flex items-center justify-center text-muted text-sm border border-black/5">
                ERP Boss App 截圖
              </div>

              <ul className="space-y-2 mb-6">
                {PRODUCTS.erp.features.slice(0, 5).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span>{f.icon}</span>
                    <span className="font-medium">{f.title}</span>
                    <span className="text-muted">— {f.desc.split('。')[0]}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/products/erp"
                className="inline-flex items-center gap-1 text-accent font-semibold text-sm hover:gap-2 transition-all"
              >
                了解更多 <span>→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
