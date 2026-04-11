import { NextRequest, NextResponse } from 'next/server'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'drdow2026'

function getClient() {
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!key) return null

  const credentials = JSON.parse(key)
  return new BetaAnalyticsDataClient({ credentials })
}

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-admin-password')
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: '未授權' }, { status: 401 })
  }

  const client = getClient()
  if (!client) {
    return NextResponse.json({ error: '未設定 GOOGLE_SERVICE_ACCOUNT_KEY' }, { status: 500 })
  }

  const propertyId = process.env.GA4_PROPERTY_ID
  if (!propertyId) {
    return NextResponse.json({ error: '未設定 GA4_PROPERTY_ID' }, { status: 500 })
  }

  const searchParams = request.nextUrl.searchParams
  const days = parseInt(searchParams.get('days') || '28')

  try {
    const [overview, pages, sources, devices] = await Promise.all([
      // Overall metrics
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ],
      }),
      // Top pages
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'activeUsers' },
          { name: 'averageSessionDuration' },
        ],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 20,
      }),
      // Traffic sources
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      }),
      // Devices
      client.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }],
      }),
    ])

    const overviewRow = overview[0]?.rows?.[0]
    const overviewMetrics = overviewRow?.metricValues || []

    return NextResponse.json({
      summary: {
        users: parseInt(overviewMetrics[0]?.value || '0'),
        sessions: parseInt(overviewMetrics[1]?.value || '0'),
        pageviews: parseInt(overviewMetrics[2]?.value || '0'),
        avgDuration: parseFloat(overviewMetrics[3]?.value || '0'),
        bounceRate: parseFloat(overviewMetrics[4]?.value || '0'),
        days,
      },
      pages: (pages[0]?.rows || []).map((row) => ({
        path: row.dimensionValues?.[0]?.value,
        views: parseInt(row.metricValues?.[0]?.value || '0'),
        users: parseInt(row.metricValues?.[1]?.value || '0'),
        avgDuration: parseFloat(row.metricValues?.[2]?.value || '0'),
      })),
      sources: (sources[0]?.rows || []).map((row) => ({
        channel: row.dimensionValues?.[0]?.value,
        sessions: parseInt(row.metricValues?.[0]?.value || '0'),
        users: parseInt(row.metricValues?.[1]?.value || '0'),
      })),
      devices: (devices[0]?.rows || []).map((row) => ({
        device: row.dimensionValues?.[0]?.value,
        sessions: parseInt(row.metricValues?.[0]?.value || '0'),
        users: parseInt(row.metricValues?.[1]?.value || '0'),
      })),
    })
  } catch (error) {
    console.error('GA4 API error:', error)
    return NextResponse.json({ error: 'GA4 API 錯誤' }, { status: 500 })
  }
}
