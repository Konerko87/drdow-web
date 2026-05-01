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
    <div className="blog-paper">
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

      <section className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: '部落格', href: '/blog' }]} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center mt-8">
          <FadeIn>
            <div className="text-[12px] tracking-[0.18em] uppercase text-[var(--color-blog-accent)] mb-3 font-semibold">
              Dr.Dow 編輯部 · Editorial
            </div>
            <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-4xl md:text-5xl font-bold mb-4 leading-[1.2] tracking-tight text-[var(--color-blog-ink)]">
              部落格
            </h1>
            <p className="text-[15px] text-[var(--color-blog-muted)] leading-[1.7] max-w-xl mx-auto">
              宮廟數位轉型、物流 AI、TMS / ERP 產業觀察。每週更新產業動態與一線實務筆記。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="pb-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/blog"
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                !tag
                  ? 'bg-[var(--color-blog-accent)] text-white'
                  : 'bg-[var(--color-blog-cream)] text-[var(--color-blog-muted)] hover:bg-[var(--color-blog-accent)]/10 hover:text-[var(--color-blog-accent)]'
              }`}
            >
              全部
            </Link>
            {allTags.map((t) => (
              <Link
                key={t}
                href={`/blog/tags/${encodeURIComponent(t)}`}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  tag === t
                    ? 'bg-[var(--color-blog-accent)] text-white'
                    : 'bg-[var(--color-blog-cream)] text-[var(--color-blog-muted)] hover:bg-[var(--color-blog-accent)]/10 hover:text-[var(--color-blog-accent)]'
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Pinned articles */}
      {!tag && (() => {
        const pinnedPosts = allPosts.filter((p) => p.pinned)
        if (pinnedPosts.length === 0) return null
        return (
          <section className="pb-12">
            <div className="max-w-4xl mx-auto px-6">
              <FadeIn>
                <h2 className="text-[12px] tracking-[0.18em] uppercase text-[var(--color-blog-muted)] font-semibold mb-6 flex items-center gap-2">
                  <span className="text-[var(--color-blog-gold)]">★</span> 置頂 · Featured
                </h2>
              </FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pinnedPosts.map((post, i) => (
                  <FadeIn key={post.slug} delay={i * 60}>
                    <article>
                      <Link href={`/blog/${post.slug}`} className="block group">
                        <div className="bg-white rounded-2xl overflow-hidden border border-[var(--color-blog-rule)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-20px_rgba(60,30,0,0.25)] transition-all">
                          {post.coverImage && (
                            <Image
                              src={post.coverImage}
                              alt={post.title}
                              width={600}
                              height={300}
                              className="w-full aspect-[2/1] object-cover"
                              sizes="(max-width: 768px) 100vw, 400px"
                            />
                          )}
                          <div className="p-6">
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {post.tags.map((t, idx) => (
                                <span
                                  key={t}
                                  className={
                                    idx === 0
                                      ? 'text-[10px] font-semibold text-[var(--color-blog-accent)] bg-[var(--color-blog-accent)]/10 px-2 py-0.5 rounded-full'
                                      : 'text-[10px] font-semibold text-[var(--color-blog-muted)] bg-[var(--color-blog-cream)] px-2 py-0.5 rounded-full'
                                  }
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                            <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[17px] font-semibold leading-[1.4] mb-1.5 text-[var(--color-blog-ink)] group-hover:text-[var(--color-blog-accent)] transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-[13px] text-[var(--color-blog-muted)] leading-relaxed line-clamp-2">{post.description}</p>
                          </div>
                        </div>
                      </Link>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        )
      })()}

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {posts.length === 0 ? (
            <FadeIn>
              <div className="text-center py-16 text-[var(--color-blog-muted)]">
                <p className="text-lg mb-2">沒有符合的文章</p>
                <p className="text-sm">試試其他標籤，或<Link href="/blog" className="text-[var(--color-blog-accent)] hover:underline">查看全部文章</Link>。</p>
              </div>
            </FadeIn>
          ) : (
            <div className="space-y-10">
              {posts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 60}>
                  <article>
                    <Link href={`/blog/${post.slug}`} className="block group">
                      <div className="bg-white rounded-2xl overflow-hidden border border-[var(--color-blog-rule)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-20px_rgba(60,30,0,0.25)] transition-all">
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
                          {/* Tags — first chip uses brand red */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((t, idx) => (
                              <span
                                key={t}
                                className={
                                  idx === 0
                                    ? 'text-xs font-semibold text-[var(--color-blog-accent)] bg-[var(--color-blog-accent)]/10 px-3 py-1 rounded-full'
                                    : 'text-xs font-semibold text-[var(--color-blog-muted)] bg-[var(--color-blog-cream)] px-3 py-1 rounded-full'
                                }
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Title — Noto Serif TC */}
                          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl md:text-[26px] font-semibold leading-[1.35] mb-3 text-[var(--color-blog-ink)] group-hover:text-[var(--color-blog-accent)] transition-colors">
                            {post.title}
                          </h2>

                          {/* Description */}
                          <p className="text-[var(--color-blog-muted)] text-[14.5px] leading-[1.7] mb-5">
                            {post.description}
                          </p>

                          {/* Meta */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-blog-muted)]">
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString('zh-TW', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </time>
                            <span className="text-[var(--color-blog-rule)]">·</span>
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
    </div>
  )
}
