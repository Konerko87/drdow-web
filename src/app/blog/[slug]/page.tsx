import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createMetadata } from '@/lib/metadata'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import { FadeIn } from '@/components/ui/fade-in'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    image: post.coverImage || undefined,
  })
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
          '@type': 'Article',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          ...(post.coverImage && { image: post.coverImage }),
          author: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.url,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.url,
          },
          mainEntityOfPage: `${SITE.url}/blog/${slug}`,
          keywords: post.tags.join(', '),
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', url: '/' },
          { name: '部落格', url: '/blog' },
          { name: post.title, url: `/blog/${slug}` },
        ]}
      />

      <article className="pt-32 pb-24">
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
              className="prose prose-lg max-w-none
                prose-headings:font-black prose-headings:text-dark
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted prose-p:leading-relaxed
                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                prose-strong:text-dark
                prose-ul:text-muted prose-ol:text-muted
                prose-li:my-1
                prose-blockquote:border-accent prose-blockquote:text-muted prose-blockquote:not-italic
                prose-img:rounded-xl prose-img:mx-auto
              "
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />

            {/* CTA */}
            <div className="mt-16 p-8 bg-surface rounded-2xl text-center">
              <h3 className="text-xl font-black mb-2">想了解更多？</h3>
              <p className="text-sm text-muted mb-4">預約 30 分鐘 Demo，看看 Dr.Dow AI 如何解決你的物流管理痛點。</p>
              <Link href="/contact" className="inline-block px-6 py-2.5 bg-accent text-white rounded-full text-sm font-semibold hover:bg-accent-light transition-colors">
                預約 Demo →
              </Link>
            </div>
          </FadeIn>
        </div>
      </article>
    </>
  )
}

function markdownToHtml(md: string): string {
  return md
    // Images (before paragraphs)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold & italic
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote><p>$1</p></blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr />')
    // Paragraphs
    .replace(/^(?!<[hluobip])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
}
