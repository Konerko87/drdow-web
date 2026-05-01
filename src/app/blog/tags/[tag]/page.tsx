import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createMetadata } from '@/lib/metadata'
import { getAllTags, getPostsByTag } from '@/lib/blog'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata(
  props: { params: Promise<{ tag: string }> }
): Promise<Metadata> {
  const { tag: rawTag } = await props.params
  const tag = decodeURIComponent(rawTag)
  const posts = getPostsByTag(tag)

  return createMetadata({
    title: `${tag} 主題文章｜Dr.Dow AI 部落格`,
    description: `關於「${tag}」的 ${posts.length} 篇深度文章 — 涵蓋產業趨勢、導入策略、實務案例。Dr.Dow AI 為宮廟、物流、倉儲與財務團隊整理的產業知識庫。`,
    path: `/blog/tags/${rawTag}`,
    keywords: [tag, `${tag} 文章`, `${tag} 介紹`, `${tag} 教學`, 'Dr.Dow AI', '產業趨勢'],
  })
}

export default async function TagPage(
  props: { params: Promise<{ tag: string }> }
) {
  const { tag: rawTag } = await props.params
  const tag = decodeURIComponent(rawTag)
  const posts = getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="blog-paper">
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', url: '/' },
          { name: '部落格', url: '/blog' },
          { name: tag, url: `/blog/tags/${rawTag}` },
        ]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${tag} 主題文章`,
          description: `關於 ${tag} 的所有文章`,
          url: `${SITE.url}/blog/tags/${rawTag}`,
          inLanguage: 'zh-TW',
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: posts.length,
            itemListElement: posts.slice(0, 20).map((post, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE.url}/blog/${post.slug}`,
              name: post.title,
            })),
          },
        }}
      />

      <section className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumb
            items={[
              { name: '首頁', href: '/' },
              { name: '部落格', href: '/blog' },
              { name: tag, href: `/blog/tags/${rawTag}` },
            ]}
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-8 text-center">
          <FadeIn>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[var(--color-blog-accent)] mb-3">Tag · 主題</p>
            <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-4xl md:text-5xl font-bold mb-3 tracking-tight text-[var(--color-blog-ink)]">{tag}</h1>
            <p className="text-[var(--color-blog-muted)] text-[15px] leading-[1.7]">
              共 {posts.length} 篇關於「{tag}」的文章
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 50}>
              <article>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden border border-[var(--color-blog-rule)] hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-20px_rgba(60,30,0,0.25)] transition-all">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="w-full aspect-[2/1] object-cover"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    )}
                    <div className="p-8">
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
                      <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl md:text-[26px] font-semibold leading-[1.35] mb-3 text-[var(--color-blog-ink)] group-hover:text-[var(--color-blog-accent)] transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-[var(--color-blog-muted)] text-[14.5px] leading-[1.7] mb-5">
                        {post.description}
                      </p>
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
      </section>
    </div>
  )
}
