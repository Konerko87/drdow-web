import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { SITE } from '@/lib/constants'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Biru0618'
const SITE_URL = `${SITE.url}/`

/**
 * 索引狀態檢查 — 讀 sitemap 後逐一打 Search Console urlInspection.index API。
 *
 * 為什麼存在：
 * - 搜尋成效（Search Console performance）只能看「有 impressions 的頁面」。
 * - 如果某頁從沒被 Google 索引，就連 0 曝光都不會出現，會被靜默漏掉。
 * - 這個 endpoint 把 scripts/check-index-status.ts 的邏輯搬到 API，
 *   讓 admin UI 可以一鍵看「哪幾頁還沒被索引」。
 *
 * 限速：Google 官方 600/min，我們每筆 sleep 250ms 留 buffer。
 * sitemap 大概 15-60 個 URL，最差約 15 秒，需要拉長 Next.js route timeout。
 */
export const maxDuration = 60

interface IndexResult {
  url: string
  path: string
  verdict: string // 'PASS' | 'FAIL' | 'NEUTRAL' | 'PARTIAL' | 'ERROR'
  coverageState: string
  indexingState: string
  lastCrawlTime: string | null
  robotsTxtState: string
  pageFetchState: string
  googleCanonical: string
  userCanonical: string
  errorMessage?: string
}

function authorize() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!key) return null
  const credentials = JSON.parse(key)
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  })
}

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await fetch(`${SITE.url}/sitemap.xml`, {
    headers: { 'User-Agent': 'DrDow-Index-Checker/1.0' },
  })
  const xml = await res.text()
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1])
}

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password')
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: '未授權' }, { status: 401 })
  }

  const auth = authorize()
  if (!auth) {
    return NextResponse.json({ error: '未設定 GOOGLE_SERVICE_ACCOUNT_KEY' }, { status: 500 })
  }

  // 為了控制 timeout，預設只查靜態頁；?all=1 才查全部 URL（含 blog 文章）。
  const includeAll = request.nextUrl.searchParams.get('all') === '1'

  try {
    const allUrls = await fetchSitemapUrls()
    const urls = includeAll
      ? allUrls
      : allUrls.filter((u) => {
          const path = u.replace(SITE.url, '')
          return !path.startsWith('/blog/')
        })

    const searchconsole = google.searchconsole({ version: 'v1', auth })
    const results: IndexResult[] = []

    for (const url of urls) {
      const path = url.replace(SITE.url, '') || '/'
      try {
        const res = await searchconsole.urlInspection.index.inspect({
          requestBody: {
            inspectionUrl: url,
            siteUrl: SITE_URL,
            languageCode: 'zh-TW',
          },
        })
        const idx = res.data.inspectionResult?.indexStatusResult
        results.push({
          url,
          path,
          verdict: idx?.verdict || 'UNKNOWN',
          coverageState: idx?.coverageState || 'Unknown',
          indexingState: idx?.indexingState || 'Unknown',
          lastCrawlTime: idx?.lastCrawlTime || null,
          robotsTxtState: idx?.robotsTxtState || 'Unknown',
          pageFetchState: idx?.pageFetchState || 'Unknown',
          googleCanonical: idx?.googleCanonical || '',
          userCanonical: idx?.userCanonical || '',
        })
      } catch (err) {
        results.push({
          url,
          path,
          verdict: 'ERROR',
          coverageState: 'API_ERROR',
          indexingState: 'Unknown',
          lastCrawlTime: null,
          robotsTxtState: 'Unknown',
          pageFetchState: 'Unknown',
          googleCanonical: '',
          userCanonical: '',
          errorMessage: err instanceof Error ? err.message.slice(0, 120) : 'unknown',
        })
      }
      // Rate limit 250ms
      await new Promise((r) => setTimeout(r, 250))
    }

    const indexed = results.filter((r) => r.verdict === 'PASS').length
    const notIndexed = results.filter((r) => r.verdict !== 'PASS' && r.verdict !== 'ERROR').length
    const errors = results.filter((r) => r.verdict === 'ERROR').length

    // 依 coverageState 分組計數
    const byCoverage: Record<string, number> = {}
    for (const r of results) {
      byCoverage[r.coverageState] = (byCoverage[r.coverageState] || 0) + 1
    }

    return NextResponse.json({
      summary: {
        total: results.length,
        indexed,
        notIndexed,
        errors,
        score: results.length > 0 ? Math.round((indexed / results.length) * 100) : 0,
      },
      byCoverage,
      pages: results,
    })
  } catch (error) {
    console.error('Index status API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '索引狀態查詢失敗' },
      { status: 500 }
    )
  }
}
