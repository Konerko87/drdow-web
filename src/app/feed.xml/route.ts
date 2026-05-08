import { getAllPosts } from '@/lib/blog'
import { SITE } from '@/lib/constants'

const absoluteUrl = (pathOrUrl: string) =>
  pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE.url}${pathOrUrl}`

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = getAllPosts().slice(0, 50)
  const now = new Date().toUTCString()
  const items = posts.map((post) => {
    const url = `${SITE.url}/blog/${post.slug}`
    const pubDate = new Date(post.updated || post.date).toUTCString()

    return [
      '<item>',
      `<title>${escapeXml(post.title)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<pubDate>${pubDate}</pubDate>`,
      `<description>${escapeXml(post.description)}</description>`,
      `<category>${escapeXml(post.tags[0] || '產業趨勢')}</category>`,
      post.coverImage ? `<enclosure url="${escapeXml(absoluteUrl(post.coverImage))}" type="image/jpeg" />` : '',
      '</item>',
    ].filter(Boolean).join('')
  }).join('')

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${escapeXml(`${SITE.name} 部落格`)}</title>`,
    `<link>${SITE.url}/blog</link>`,
    `<description>${escapeXml('宮廟管理、物流 TMS、WMS、ERP 與 AI 自動化實務文章。')}</description>`,
    '<language>zh-TW</language>',
    `<lastBuildDate>${now}</lastBuildDate>`,
    `<atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    '</channel>',
    '</rss>',
  ].join('')

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
