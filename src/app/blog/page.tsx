import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/blog'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'

export async function generateMetadata(
  props: { searchParams: Promise<{ tag?: string }> }
): Promise<Metadata> {
  const { tag } = await props.searchParams
  const meta = createMetadata({
    title: tag ? `${tag} 相關文章 — 部落格` : '部落格 — 廟通宮廟管理、物流 TMS、ERP 產業趨勢',
    description: '宮廟智慧管理、物流 AI 數位轉型趨勢、TMS 運輸管理、ERP 財務系統最新資訊。每週更新產業動態與技術觀點。',
    path: '/blog',
    keywords: ['部落格', '物流數位轉型', '宮廟管理', 'TMS', 'ERP', '廟通', 'AI'],
  })
  if (tag) {
    return { ...meta, robots: { index: false, follow: true } }
  }
  return meta
}

export default async function BlogPage(
  props: { searchParams: Promise<{ tag?: string }> }
) {
  const { tag } = await props.searchParams
  const allPosts = getAllPosts()
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts

  // Collect all unique tags
  const allTags = Array.from(new Set(allPosts.flatMap((p) => p.tags))).sort()

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '部落格', url: '/blog' }]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: '部落格',
        description: '物流業 AI 數位轉型趨勢、宮廟智慧管理、產業動態',
        url: `${SITE.url}/blog`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: posts.length,
          itemListElement: posts.slice(0, 10).map((post, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${SITE.url}/blog/${post.slug}`,
            name: post.title,
          })),
        },
      }} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: '部落格', href: '/blog' }]} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center mt-6">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black mb-4">部落格</h1>
            <p className="text-lg text-muted">
              物流業 AI 數位轉型趨勢、宮廟智慧管理、產業動態
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                !tag ? 'bg-accent text-white' : 'bg-surface text-muted hover:bg-accent/10'
              }`}
            >
              全部
            </Link>
            {allTags.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  tag === t ? 'bg-accent text-white' : 'bg-surface text-muted hover:bg-accent/10'
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {posts.length === 0 ? (
            <FadeIn>
              <div className="text-center py-16 text-muted">
                <p className="text-lg mb-2">沒有符合的文章</p>
                <p className="text-sm">試試其他標籤，或<Link href="/blog" className="text-accent hover:underline">查看全部文章</Link>。</p>
              </div>
            </FadeIn>
          ) : (
            <div className="space-y-8">
              {posts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 60}>
                  <article>
                    <Link href={`/blog/${post.slug}`} className="block group">
                      <div className="bg-surface rounded-2xl overflow-hidden hover-lift transition-all">
                        {/* Cover Image */}
                        {post.coverImage && (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="w-full aspect-[2/1] object-cover"
                            sizes="(max-width: 768px) 100vw, 800px"
                            {...(i === 0 ? { priority: true } : {})}
                          />
                        )}

                        <div className="p-8">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((t) => (
                              <span
                                key={t}
                                className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Title */}
                          <h2 className="text-xl font-black mb-2 group-hover:text-accent transition-colors">
                            {post.title}
                          </h2>

                          {/* Description */}
                          <p className="text-muted text-sm leading-relaxed mb-4">
                            {post.description}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-4 text-xs text-muted">
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString('zh-TW', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </time>
                            <span>閱讀約 {post.readingTime} 分鐘</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
