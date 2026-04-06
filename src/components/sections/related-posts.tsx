import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/blog'

export function RelatedPosts({ posts, currentSlug }: { posts: BlogPost[]; currentSlug: string }) {
  const related = posts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3)

  if (related.length === 0) return null

  return (
    <div className="mt-16 pt-12 border-t border-black/5">
      <h3 className="text-lg font-black mb-6">延伸閱讀</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="bg-surface rounded-xl overflow-hidden hover-lift">
              {post.coverImage && (
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full aspect-[2/1] object-cover"
                />
              )}
              <div className="p-4">
                <h4 className="text-sm font-bold group-hover:text-accent transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-muted mt-1">{post.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
