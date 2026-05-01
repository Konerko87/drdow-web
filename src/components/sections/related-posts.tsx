import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/blog'

export function RelatedPosts({ posts, currentSlug, currentTags = [] }: { posts: BlogPost[]; currentSlug: string; currentTags?: string[] }) {
  const others = posts.filter((p) => p.slug !== currentSlug)
  const related = currentTags.length > 0
    ? others
        .map((p) => ({ post: p, score: p.tags.filter((t) => currentTags.includes(t)).length }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((r) => r.post)
    : others.slice(0, 3)

  if (related.length === 0) return null

  return (
    <aside className="mt-16 pt-12 border-t border-[var(--color-blog-rule)]" aria-label="延伸閱讀">
      <h4 className="text-[12px] tracking-[0.18em] uppercase text-[var(--color-blog-muted)] font-semibold mb-[22px]">
        延伸閱讀 · Related
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
        {related.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3.5 shadow-[0_10px_24px_-20px_rgba(60,30,0,0.3)] bg-[var(--color-blog-cream)]">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              )}
            </div>
            <p className="font-[family-name:var(--font-noto-serif-tc)] text-[16.5px] font-semibold leading-[1.45] text-[var(--color-blog-ink)] mb-2 line-clamp-2 group-hover:text-[var(--color-blog-accent)] transition-colors">
              {post.title}
            </p>
            <p className="text-[12.5px] text-[var(--color-blog-muted)] tracking-[0.02em]">{post.date}</p>
          </Link>
        ))}
      </div>
    </aside>
  )
}
