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
    <>
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

      <section className="pt-32 pb-12 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumb
            items={[
              { name: '首頁', href: '/' },
              { name: '部落格', href: '/blog' },
              { name: tag, href: `/blog/tags/${rawTag}` },
            ]}
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-6">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">Tag</p>
            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">{tag}</h1>
            <p className="text-muted text-lg">
              共 {posts.length} 篇關於「{tag}」的文章
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 50}>
              <article>
                <Link href={`/blog/${post.slug}`} className="block group">
                  <div className="bg-surface rounded-2xl overflow-hidden hover-lift transition-all">
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
                      <h2 className="text-xl font-black mb-2 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-muted text-sm leading-relaxed mb-4">
                        {post.description}
                      </p>
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
      </section>
    </>
  )
}
