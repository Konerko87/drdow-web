import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  keywords: string[]
  coverImage: string | null
  coverCredit: string | null
  pinned: boolean
  content: string
  readingTime: number
  wordCount: number
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))

  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '')
    return getPostBySlug(slug)
  }).filter((p): p is BlogPost => p !== null)

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  const charCount = content.replace(/[#*\->\n]/g, '').length
  const readingTime = Math.max(1, Math.ceil(charCount / 500))

  return {
    slug,
    title: data.title || slug,
    description: data.description || '',
    date: data.date || new Date().toISOString().split('T')[0],
    tags: data.tags || [],
    keywords: data.keywords ? (typeof data.keywords === 'string' ? data.keywords.split(',').map((k: string) => k.trim()) : data.keywords) : [],
    coverImage: data.coverImage || null,
    coverCredit: data.coverCredit || null,
    pinned: data.pinned === true,
    content,
    readingTime,
    wordCount: charCount,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

const PRODUCT_TAGS: Record<'miaotong' | 'tms' | 'wms' | 'erp', string[]> = {
  miaotong: ['廟通', '宮廟', '宮廟系統', '宮廟管理', '點燈', 'LINE Pay', '法會', '發財金', '收據', '功德'],
  tms: ['TMS', '派車', '物流', '物流管理', '運輸管理', '司機', '物流數位轉型'],
  wms: ['WMS', '倉儲', '倉儲管理', '庫存', '庫存管理', '盤點', '條碼盤點', '出入庫'],
  erp: ['ERP', '財務', '對帳', 'AI對帳', 'OCR', '請款', '銀行對帳', '物流財務', '財務自動化'],
}

/** Get blog posts whose tags or keywords overlap with the given product. */
export function getPostsByProduct(
  product: 'miaotong' | 'tms' | 'wms' | 'erp',
  limit?: number,
): BlogPost[] {
  const targets = PRODUCT_TAGS[product].map((t) => t.toLowerCase())
  const all = getAllPosts()
  const matched = all.filter((p) => {
    const haystack = [...p.tags, ...p.keywords].map((s) => s.toLowerCase())
    return haystack.some((h) => targets.some((t) => h.includes(t) || t.includes(h)))
  })
  return limit ? matched.slice(0, limit) : matched
}

/** Get blog posts that include a specific tag (case-insensitive). */
export function getPostsByTag(tag: string): BlogPost[] {
  const target = tag.toLowerCase()
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === target),
  )
}

/** Get all unique tags across all posts, sorted by frequency desc. */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}
