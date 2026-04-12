import { NextRequest, NextResponse } from 'next/server'
import { SITE } from '@/lib/constants'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Biru0618'

interface SeoResult {
  url: string
  path: string
  status: number
  title: string
  titleLength: number
  description: string
  descriptionLength: number
  h1: string
  h1Count: number
  canonical: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  issues: string[]
}

const PAGES = [
  '/',
  '/products/tms',
  '/products/erp',
  '/products/miaotong',
  '/blog',
  '/pricing',
  '/faq',
  '/solutions',
  '/contact',
  '/about',
]

async function checkPage(path: string): Promise<SeoResult> {
  const url = `${SITE.url}${path}`
  const issues: string[] = []

  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'DrDow-SEO-Checker/1.0' },
    })

    const html = await res.text()

    // Extract meta tags
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
    const title = titleMatch?.[1]?.trim() || ''

    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i)
    const description = descMatch?.[1]?.trim() || ''

    const h1Matches = html.match(/<h1[^>]*>([^<]*)<\/h1>/gi) || []
    const h1 = h1Matches[0]?.replace(/<[^>]*>/g, '').trim() || ''

    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)
    const canonical = canonicalMatch?.[1] || ''

    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i)
    const ogTitle = ogTitleMatch?.[1] || ''

    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i)
    const ogDescription = ogDescMatch?.[1] || ''

    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i)
    const ogImage = ogImageMatch?.[1] || ''

    // Check issues
    if (!title) issues.push('缺少 title')
    else if (title.length > 60) issues.push(`title 過長 (${title.length} 字)`)
    else if (title.length < 10) issues.push(`title 過短 (${title.length} 字)`)

    if (!description) issues.push('缺少 meta description')
    else if (description.length > 160) issues.push(`description 過長 (${description.length} 字)`)
    else if (description.length < 50) issues.push(`description 過短 (${description.length} 字)`)

    if (h1Matches.length === 0) issues.push('缺少 H1')
    if (h1Matches.length > 1) issues.push(`多個 H1 (${h1Matches.length} 個)`)

    if (!canonical) issues.push('缺少 canonical')
    if (!ogTitle) issues.push('缺少 og:title')
    if (!ogDescription) issues.push('缺少 og:description')
    if (!ogImage) issues.push('缺少 og:image')

    if (res.status !== 200) issues.push(`HTTP ${res.status}`)

    return {
      url,
      path,
      status: res.status,
      title,
      titleLength: title.length,
      description,
      descriptionLength: description.length,
      h1,
      h1Count: h1Matches.length,
      canonical,
      ogTitle,
      ogDescription,
      ogImage,
      issues,
    }
  } catch (error) {
    return {
      url,
      path,
      status: 0,
      title: '',
      titleLength: 0,
      description: '',
      descriptionLength: 0,
      h1: '',
      h1Count: 0,
      canonical: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      issues: [`無法連線: ${error instanceof Error ? error.message : '未知錯誤'}`],
    }
  }
}

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password')
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: '未授權' }, { status: 401 })
  }

  const results = await Promise.all(PAGES.map(checkPage))

  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0)
  const pagesWithIssues = results.filter((r) => r.issues.length > 0).length

  return NextResponse.json({
    summary: {
      totalPages: results.length,
      pagesWithIssues,
      totalIssues,
      score: Math.round(((results.length - pagesWithIssues) / results.length) * 100),
    },
    pages: results,
  })
}
