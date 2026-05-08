import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createMetadata } from '@/lib/metadata'
import { BLOG_TOPICS, getBlogTopic } from '@/lib/blog-topics'
import { getPostsByProduct } from '@/lib/blog'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'

type TopicPageProps = {
  params: Promise<{ topic: string }>
}

export function generateStaticParams() {
  return BLOG_TOPICS.map((topic) => ({ topic: topic.slug }))
}

export async function generateMetadata(props: TopicPageProps): Promise<Metadata> {
  const { topic: slug } = await props.params
  const topic = getBlogTopic(slug)
  if (!topic) return {}

  return createMetadata({
    title: `${topic.title}｜Dr.Dow AI 部落格`,
    description: topic.description,
    path: topic.href,
    keywords: [...topic.keywords, `${topic.navTitle} 文章`, `${topic.navTitle} 導入`],
  })
}

export default async function BlogTopicPage(props: TopicPageProps) {
  const { topic: slug } = await props.params
  const topic = getBlogTopic(slug)
  if (!topic) notFound()

  const posts = getPostsByProduct(topic.productKey, 16)

  return (
    <div className="blog-paper">
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', url: '/' },
          { name: '部落格', url: '/blog' },
          { name: topic.navTitle, url: topic.href },
        ]}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: topic.title,
          description: topic.description,
          url: `${SITE.url}${topic.href}`,
          inLanguage: 'zh-TW',
          about: topic.keywords.map((keyword) => ({ '@type': 'Thing', name: keyword })),
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: posts.length,
            itemListElement: posts.map((post, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `${SITE.url}/blog/${post.slug}`,
              name: post.title,
              description: post.description,
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
              { name: topic.navTitle, href: topic.href },
            ]}
          />
        </div>
        <div className="max-w-4xl mx-auto px-6 mt-8 text-center">
          <FadeIn>
            <p className="text-[12px] font-semibold tracking-[0.2em] uppercase text-[var(--color-blog-accent)] mb-3">
              Topic Guide · 主題指南
            </p>
            <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-4xl md:text-5xl font-bold mb-4 leading-[1.2] tracking-tight text-[var(--color-blog-ink)]">
              {topic.title}
            </h1>
            <p className="text-[15px] text-[var(--color-blog-muted)] leading-[1.8] max-w-2xl mx-auto">
              {topic.description}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-10">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-[1.4fr_0.9fr] gap-4">
              <div className="bg-white rounded-2xl border border-[var(--color-blog-rule)] p-6 md:p-8">
                <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[var(--color-blog-muted)] mb-3">
                  Keyword Cluster
                </p>
                <div className="flex flex-wrap gap-2">
                  {topic.keywords.map((keyword, idx) => (
                    <span
                      key={keyword}
                      className={
                        idx === 0
                          ? 'text-xs font-semibold text-[var(--color-blog-accent)] bg-[var(--color-blog-accent)]/10 px-3 py-1.5 rounded-full'
                          : 'text-xs font-semibold text-[var(--color-blog-muted)] bg-[var(--color-blog-cream)] px-3 py-1.5 rounded-full'
                      }
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={topic.productHref}
                className="group bg-[var(--color-blog-ink)] rounded-2xl p-6 md:p-8 text-white hover:-translate-y-0.5 transition-all"
              >
                <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-white/60 mb-3">
                  Product
                </p>
                <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold leading-tight mb-3">
                  {topic.productName}
                </h2>
                <p className="text-sm text-white/70">
                  {topic.ctaLabel}
                  <span className="ml-1 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                </p>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-[12px] tracking-[0.18em] uppercase text-[var(--color-blog-muted)] font-semibold mb-6">
              核心文章 · {posts.length} 篇
            </h2>
          </FadeIn>
          <div className="space-y-5">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 45}>
                <article>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-2xl border border-[var(--color-blog-rule)] p-6 md:p-7 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-20px_rgba(60,30,0,0.25)] transition-all"
                  >
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.slice(0, 4).map((tag, idx) => (
                        <span
                          key={tag}
                          className={
                            idx === 0
                              ? 'text-[11px] font-semibold text-[var(--color-blog-accent)] bg-[var(--color-blog-accent)]/10 px-2.5 py-1 rounded-full'
                              : 'text-[11px] font-semibold text-[var(--color-blog-muted)] bg-[var(--color-blog-cream)] px-2.5 py-1 rounded-full'
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-xl md:text-2xl font-semibold leading-[1.35] mb-2 text-[var(--color-blog-ink)] group-hover:text-[var(--color-blog-accent)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-[14.5px] text-[var(--color-blog-muted)] leading-[1.75] mb-4">
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
                  </Link>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
