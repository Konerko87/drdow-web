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
    image: post.coverImage || undefined,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.date,
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
          datePublished: post.date,
          dateModified: post.date,
          ...(post.coverImage && post.coverImage.startsWith('http') && { image: post.coverImage }),
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
            logo: `${SITE.url}/logo-icon.png`,
          },
          mainEntityOfPage: `${SITE.url}/blog/${slug}`,
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

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{post.title}</h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-muted mb-8">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('zh-TW', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </time>
              <span>閱讀約 {post.readingTime} 分鐘</span>
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <figure className="mb-12">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full rounded-2xl object-cover aspect-[2/1]"
                  priority
                />
                {post.coverCredit && (
                  <figcaption className="text-xs text-muted mt-2 text-center">
                    Photo: {post.coverCredit}
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
                <nav className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {prevPost ? (
                    <Link href={`/blog/${prevPost.slug}`} className="group p-4 bg-surface rounded-xl hover:bg-accent/5 transition-colors">
                      <span className="text-xs text-muted">← 上一篇</span>
                      <p className="text-sm font-semibold mt-1 group-hover:text-accent transition-colors line-clamp-2">{prevPost.title}</p>
                    </Link>
                  ) : <div />}
                  {nextPost && (
                    <Link href={`/blog/${nextPost.slug}`} className="group p-4 bg-surface rounded-xl hover:bg-accent/5 transition-colors text-right">
                      <span className="text-xs text-muted">下一篇 →</span>
                      <p className="text-sm font-semibold mt-1 group-hover:text-accent transition-colors line-clamp-2">{nextPost.title}</p>
                    </Link>
                  )}
                </nav>
              ) : null
            })()}

            {/* CTA */}
            <div className="mt-16 p-8 bg-surface rounded-2xl text-center">
              <h3 className="text-xl font-black mb-2">想了解更多？</h3>
              <p className="text-sm text-muted mb-4">預約 30 分鐘 Demo，看看 Dr.Dow AI 如何解決你的管理痛點。</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/contact" className="inline-block px-6 py-2.5 bg-accent text-white rounded-full text-sm font-semibold hover:bg-accent-light transition-colors">
                  免費諮詢 →
                </Link>
                <Link href="/products/miaotong" className="inline-block px-6 py-2.5 border border-slate-200 rounded-full text-sm font-semibold hover:bg-surface transition-colors">
                  了解廟通
                </Link>
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

