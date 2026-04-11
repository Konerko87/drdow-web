import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'drdow2026'

function authorize() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!key) return null

  const credentials = JSON.parse(key)
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  })
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

  const searchParams = request.nextUrl.searchParams
  const days = parseInt(searchParams.get('days') || '28')

  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const formatDate = (d: Date) => d.toISOString().split('T')[0]

  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth })
    const siteUrl = 'https://drdowai.com/'

    // Fetch overall performance
    const [queryData, pageData, overallData] = await Promise.all([
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          dimensions: ['query'],
          rowLimit: 20,
        },
      }),
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          dimensions: ['page'],
          rowLimit: 50,
        },
      }),
      searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          dimensions: ['date'],
        },
      }),
    ])

    // Calculate totals
    const daily = overallData.data.rows || []
    const totals = daily.reduce(
      (acc: { clicks: number; impressions: number }, row) => ({
        clicks: acc.clicks + (row.clicks || 0),
        impressions: acc.impressions + (row.impressions || 0),
      }),
      { clicks: 0, impressions: 0 }
    )

    return NextResponse.json({
      summary: {
        clicks: totals.clicks,
        impressions: totals.impressions,
        ctr: totals.impressions > 0 ? totals.clicks / totals.impressions : 0,
        days,
      },
      queries: (queryData.data.rows || []).map((row) => ({
        query: row.keys?.[0],
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
      })),
      pages: (pageData.data.rows || []).map((row) => ({
        page: row.keys?.[0]?.replace('https://drdowai.com', ''),
        clicks: row.clicks,
        impressions: row.impressions,
        ctr: row.ctr,
        position: row.position,
      })),
      daily: daily.map((row) => ({
        date: row.keys?.[0],
        clicks: row.clicks,
        impressions: row.impressions,
      })),
    })
  } catch (error) {
    console.error('Search Console API error:', error)
    return NextResponse.json(
      { error: 'Search Console API 錯誤' },
      { status: 500 }
    )
  }
}
