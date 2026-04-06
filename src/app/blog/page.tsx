import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { getAllPosts } from '@/lib/blog'
import { FadeIn } from '@/components/ui/fade-in'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '部落格 — 物流數位轉型、TMS、ERP 產業趨勢',
  description: '物流業 AI 數位轉型趨勢、TMS 運輸管理系統、ERP 財務系統最新資訊。每週更新產業動態與技術觀點。',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '部落格', url: '/blog' }]} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black mb-4">部落格</h1>
            <p className="text-lg text-muted">
              物流業 AI 數位轉型趨勢、產業動態、技術觀點
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {posts.length === 0 ? (
            <FadeIn>
              <div className="text-center py-16 text-muted">
                <p className="text-lg mb-2">文章即將推出</p>
                <p className="text-sm">我們正在準備物流業 AI 數位轉型的精彩內容，敬請期待。</p>
              </div>
            </FadeIn>
          ) : (
            <div className="space-y-8">
              {posts.map((post, i) => (
                <FadeIn key={post.slug} delay={i * 60}>
                  <article>
                    <Link href={`/blog/${post.slug}`} className="block group">
                      <div className="bg-surface rounded-2xl p-8 hover-lift transition-all">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full"
                            >
                              {tag}
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
