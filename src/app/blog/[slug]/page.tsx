import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Marked } from 'marked'
import { createMetadata } from '@/lib/metadata'
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/blog'
import { RelatedPosts } from '@/components/sections/related-posts'
import { FadeIn } from '@/components/ui/fade-in'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'
import { TrackedCTA } from '@/components/ui/tracked-cta'

const absoluteUrl = (pathOrUrl: string) =>
  pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE.url}${pathOrUrl}`

// GFM-aware markdown renderer with custom tweaks for:
// - Open external links in new tab
// - Wrap images in <figure> with caption from alt text
const md = new Marked({
  gfm: true,
  breaks: false,
  async: false,
})
md.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const isExternal = /^https?:\/\//.test(href)
      const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}"${titleAttr}${attrs}>${text}</a>`
    },
    image({ href, title, text }) {
      const titleAttr = title ? ` title="${title}"` : ''
      const altAttr = text ? ` alt="${text}"` : ''
      const caption = text || title || ''
      return `<figure><img src="${href}"${altAttr}${titleAttr} loading="lazy" decoding="async" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`
    },
  },
})

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const meta = createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.coverImage ? absoluteUrl(post.coverImage) : undefined,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated || post.date,
    authors: [SITE.name],
  })
  return {
    ...meta,
    keywords: post.keywords.length > 0 ? post.keywords : post.tags,
  }
}

export default async function BlogPostPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          url: `${SITE.url}/blog/${slug}`,
          datePublished: post.date,
          dateModified: post.updated || post.date,
          ...(post.coverImage && {
            image: {
              '@type': 'ImageObject',
              url: absoluteUrl(post.coverImage),
              width: 1200,
              height: 630,
            },
          }),
          author: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.url,
            logo: `${SITE.url}/logo-icon.png`,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.url,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE.url}/logo-icon.png`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE.url}/blog/${slug}`,
          },
          keywords: post.keywords.length > 0 ? post.keywords.join(', ') : post.tags.join(', '),
          wordCount: post.wordCount,
          articleSection: post.tags[0] || '產業趨勢',
          inLanguage: 'zh-TW',
          about: post.tags.map((tag) => ({ '@type': 'Thing', name: tag })),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', url: '/' },
          { name: '部落格', url: '/blog' },
          { name: post.title, url: `/blog/${slug}` },
        ]}
      />

      <article className="pt-32 pb-24 blog-paper">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            {/* Back */}
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent mb-8 transition-colors">
              ← 返回部落格
            </Link>

            {/* Tags — first chip uses brand red, rest use warm cream */}
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className={
                    idx === 0
                      ? 'text-xs font-semibold text-[var(--color-blog-accent)] bg-[var(--color-blog-accent)]/10 px-3 py-1 rounded-full'
                      : 'text-xs font-semibold text-[var(--color-blog-muted)] bg-[var(--color-blog-cream)] px-3 py-1 rounded-full'
                  }
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title — Noto Serif TC for editorial feel */}
            <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-4xl md:text-5xl font-bold mb-4 leading-[1.2] tracking-tight text-[var(--color-blog-ink)]">
              {post.title}
            </h1>

            {/* Meta row with · separators and author */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--color-blog-muted)] mb-10">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('zh-TW', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </time>
              <span className="text-[var(--color-blog-rule)]">·</span>
              <span>閱讀約 {post.readingTime} 分鐘</span>
              <span className="text-[var(--color-blog-rule)]">·</span>
              <span>作者 · <span className="text-[var(--color-blog-ink)]">Dr.Dow 編輯部</span></span>
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <figure className="mb-12">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full rounded-2xl object-cover aspect-[2/1] border border-[var(--color-blog-rule)] shadow-[0_24px_56px_-32px_rgba(0,0,0,0.25)]"
                  priority
                />
                {post.coverCredit && (
                  <figcaption className="font-[family-name:var(--font-noto-serif-tc)] italic text-[12.5px] text-[var(--color-blog-muted)] mt-2.5 text-right tracking-[0.02em]">
                    <span className="text-[var(--color-blog-gold)] not-italic mr-0.5">—</span> {post.coverCredit}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Content */}
            <div
              className="blog-prose prose prose-lg max-w-none
                prose-headings:font-black prose-headings:text-dark prose-headings:tracking-tight
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-5 prose-h2:pb-2.5
                prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-3 prose-h3:text-dark
                prose-p:text-[15px] md:prose-p:text-base prose-p:text-slate-700 prose-p:leading-[1.85] prose-p:my-5
                prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-dark prose-strong:font-bold
                prose-ul:my-5 prose-ul:text-slate-700 prose-ol:my-5 prose-ol:text-slate-700
                prose-li:my-2 prose-li:leading-relaxed marker:text-accent/60
                prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-accent/5 prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-700
                prose-img:rounded-2xl prose-img:mx-auto prose-img:my-2 prose-img:border prose-img:border-black/5
                prose-figure:my-10 prose-figcaption:text-center prose-figcaption:text-xs prose-figcaption:text-muted prose-figcaption:mt-2
                prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-medium prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-[#0f172a] prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:p-5 prose-pre:my-8 prose-pre:overflow-x-auto prose-pre:text-sm prose-pre:leading-relaxed
                prose-hr:my-12 prose-hr:border-black/10
                [&_table]:my-8 [&_table]:w-full [&_table]:text-sm [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-xl [&_table]:border [&_table]:border-black/5
                [&_thead]:bg-surface
                [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-dark [&_th]:border-b [&_th]:border-black/10
                [&_td]:px-4 [&_td]:py-3 [&_td]:border-b [&_td]:border-black/5 [&_td]:text-slate-700 [&_td]:align-top
                [&_tbody_tr:last-child_td]:border-b-0
                [&_tbody_tr:hover]:bg-accent/[0.03]
              "
              dangerouslySetInnerHTML={{ __html: md.parse(post.content) as string }}
            />

            {/* Prev / Next Navigation */}
            {(() => {
              const allPosts = getAllPosts()
              const currentIndex = allPosts.findIndex((p) => p.slug === slug)
              const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
              const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
              return (prevPost || nextPost) ? (
                <nav className="mt-20 mb-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link
                      href={`/blog/${prevPost.slug}`}
                      className="group block p-6 bg-white border border-[var(--color-blog-rule)] rounded-2xl hover:-translate-y-0.5 hover:border-[var(--color-blog-rule)]/60 hover:shadow-[0_14px_28px_-20px_rgba(60,30,0,0.25)] transition-all"
                    >
                      <div className="text-[11px] tracking-[0.14em] uppercase text-[var(--color-blog-muted)] mb-2.5 font-medium">
                        <span className="text-[var(--color-blog-accent)]">←</span>&nbsp; 上一篇
                      </div>
                      <p className="font-[family-name:var(--font-noto-serif-tc)] text-[17px] font-semibold leading-snug text-[var(--color-blog-ink)] line-clamp-2">{prevPost.title}</p>
                    </Link>
                  ) : <div />}
                  {nextPost && (
                    <Link
                      href={`/blog/${nextPost.slug}`}
                      className="group block p-6 bg-white border border-[var(--color-blog-rule)] rounded-2xl hover:-translate-y-0.5 hover:border-[var(--color-blog-rule)]/60 hover:shadow-[0_14px_28px_-20px_rgba(60,30,0,0.25)] transition-all text-right"
                    >
                      <div className="text-[11px] tracking-[0.14em] uppercase text-[var(--color-blog-muted)] mb-2.5 font-medium">
                        下一篇 &nbsp;<span className="text-[var(--color-blog-accent)]">→</span>
                      </div>
                      <p className="font-[family-name:var(--font-noto-serif-tc)] text-[17px] font-semibold leading-snug text-[var(--color-blog-ink)] line-clamp-2">{nextPost.title}</p>
                    </Link>
                  )}
                </nav>
              ) : null
            })()}

            {/* CTA — editorial 風雙漸層暈染卡 */}
            <div className="relative mt-16 p-12 bg-white border border-[var(--color-blog-rule)] rounded-[18px] text-center overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 60% 40% at 80% 0%, rgba(217, 119, 6, 0.10), transparent 60%), radial-gradient(ellipse 50% 50% at 0% 100%, rgba(185, 28, 28, 0.08), transparent 60%)',
                }}
              />
              <div className="relative">
                <div className="text-[11px] tracking-[0.18em] uppercase text-[var(--color-blog-accent)] mb-2.5 font-semibold">
                  下一步 · Next Step
                </div>
                <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[clamp(22px,2.4vw,28px)] font-bold leading-[1.35] mb-3 text-[var(--color-blog-ink)]">
                  想看看廟通怎麼解掉你的管理痛點？
                </h3>
                <p className="text-[15px] text-[var(--color-blog-muted)] leading-[1.7] max-w-[480px] mx-auto mb-7">
                  預約 30 分鐘 Demo，由團隊直接帶你跑完香油錢、會員、財報三個關鍵流程。
                </p>
                <div className="inline-flex flex-wrap gap-3 justify-center">
                  <TrackedCTA
                    href="/contact"
                    location="blog-post-cta"
                    product="miaotong"
                    label="primary"
                    className="inline-block px-[22px] py-3.5 bg-[var(--color-blog-accent)] text-white rounded-[10px] text-[14.5px] font-medium tracking-[0.02em] shadow-[0_10px_22px_-14px_rgba(185,28,28,0.6)] hover:bg-[#a01818] hover:-translate-y-0.5 transition-all"
                  >
                    預約 Demo →
                  </TrackedCTA>
                  <Link
                    href="/products/miaotong"
                    className="inline-block px-[22px] py-3.5 bg-transparent text-[var(--color-blog-ink)] border border-[var(--color-blog-rule)] rounded-[10px] text-[14.5px] font-medium tracking-[0.02em] hover:bg-[var(--color-blog-cream)]/60 transition-colors"
                  >
                    了解廟通
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            <RelatedPosts posts={getAllPosts()} currentSlug={slug} currentTags={post.tags} />
          </FadeIn>
        </div>
      </article>
    </>
  )
}
