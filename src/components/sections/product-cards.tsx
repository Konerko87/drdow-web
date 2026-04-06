import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'
import { PRODUCTS } from '@/lib/constants'

function ProductCard({
  product,
  icon,
  href,
  delay = 0,
}: {
  product: typeof PRODUCTS.tms | typeof PRODUCTS.erp
  icon: string
  href: string
  delay?: number
}) {
  return (
    <FadeIn delay={delay}>
      <div className="group relative bg-[#FAFBFC] rounded-3xl p-1 border border-black/[0.04] hover:border-accent/20 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-white rounded-[20px] p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-lg">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">{product.name}</h3>
              <p className="text-xs text-muted">{product.fullName}</p>
            </div>
          </div>

          <p className="text-sm text-muted mb-6 leading-relaxed">{product.description}</p>

          {/* Screenshot placeholder */}
          <div className="bg-gradient-to-br from-dark to-[#1a1a2e] rounded-xl aspect-[16/10] mb-6 flex items-center justify-center text-white/20 text-xs border border-white/5 overflow-hidden">
            <div className="text-center">
              <div className="w-8 h-8 rounded-lg bg-white/5 mx-auto mb-2 flex items-center justify-center text-base">{icon}</div>
              <span>系統截圖</span>
            </div>
          </div>

          {/* Features */}
          <ul className="space-y-2.5 mb-6">
            {product.features.slice(0, 5).map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <span className="text-xs mt-0.5">{f.icon}</span>
                <div>
                  <span className="font-semibold">{f.title}</span>
                  <span className="text-muted"> — {f.desc.split('。')[0]}</span>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href={href}
            className="group/link inline-flex items-center gap-1.5 text-accent font-semibold text-sm"
          >
            了解更多
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </FadeIn>
  )
}

export function ProductCards() {
  return (
    <section id="products" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Products</p>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">兩套系統，一個目標</h2>
          <p className="text-muted text-base">讓你的物流公司從手動走向全自動。</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductCard product={PRODUCTS.tms} icon="🚛" href="/products/tms" />
          <ProductCard product={PRODUCTS.erp} icon="💰" href="/products/erp" delay={100} />
        </div>
      </div>
    </section>
  )
}
