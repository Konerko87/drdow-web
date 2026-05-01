import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'
import { getPostsByProduct } from '@/lib/blog'

type Props = {
  productKey: 'miaotong' | 'tms' | 'wms' | 'erp'
  limit?: number
  title?: string
  subtitle?: string
}

export function RelatedProductPosts({
  productKey,
  limit = 4,
  title = '延伸閱讀',
  subtitle = '深入了解導入策略、痛點分析與行業最佳實務',
}: Props) {
  const posts = getPostsByProduct(productKey, limit)
  if (posts.length === 0) return null

  return (
    <section className="py-20 bg-white" aria-label={`${productKey} 相關文章`}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="mb-10">
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl md:text-3xl font-bold mb-2 tracking-tight">{title}</h2>
          <p className="text-muted text-sm">{subtitle}</p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 60}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full bg-surface rounded-2xl p-5 border border-black/[0.04] hover:border-accent/20 hover:shadow-md transition-all duration-300"
              >
                <p className="text-[10px] font-semibold tracking-wider uppercase text-accent mb-2">
                  {post.tags[0] || '產業洞察'}
                </p>
                <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-base font-bold mb-2 leading-snug tracking-tight line-clamp-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-muted line-clamp-2 mb-3">{post.description}</p>
                <span className="text-xs font-semibold text-accent inline-flex items-center gap-1">
                  閱讀全文 <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
