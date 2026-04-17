import { NextRequest, NextResponse } from 'next/server'
import { BetaAnalyticsDataClient } from '@google-analytics/data'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Biru0618'

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
  const property = `properties/${propertyId}`
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: 'today' }]

  try {
    const [overview, campaigns, keywords, daily] = await Promise.all([
      // Overall Google Ads metrics
      client.runReport({
        property,
        dateRanges,
        metrics: [
          { name: 'advertiserAdCost' },
          { name: 'advertiserAdClicks' },
          { name: 'advertiserAdImpressions' },
          { name: 'advertiserAdCostPerClick' },
          { name: 'sessions' },
          { name: 'conversions' },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionDefaultChannelGroup',
            stringFilter: { matchType: 'EXACT', value: 'Paid Search' },
          },
        },
      }),
      // Campaign breakdown
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: 'sessionGoogleAdsCampaignName' }],
        metrics: [
          { name: 'advertiserAdCost' },
          { name: 'advertiserAdClicks' },
          { name: 'advertiserAdImpressions' },
          { name: 'sessions' },
          { name: 'conversions' },
        ],
        orderBys: [{ metric: { metricName: 'advertiserAdClicks' }, desc: true }],
        limit: 10,
      }),
      // Keyword performance
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: 'sessionGoogleAdsKeyword' }],
        metrics: [
          { name: 'advertiserAdCost' },
          { name: 'advertiserAdClicks' },
          { name: 'advertiserAdImpressions' },
          { name: 'sessions' },
          { name: 'conversions' },
        ],
        orderBys: [{ metric: { metricName: 'advertiserAdClicks' }, desc: true }],
        limit: 20,
      }),
      // Daily trend
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: 'date' }],
        metrics: [
          { name: 'advertiserAdCost' },
          { name: 'advertiserAdClicks' },
          { name: 'advertiserAdImpressions' },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'sessionDefaultChannelGroup',
            stringFilter: { matchType: 'EXACT', value: 'Paid Search' },
          },
        },
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      }),
    ])

    const overviewRow = overview[0]?.rows?.[0]
    const m = overviewRow?.metricValues || []
    const totalCost = parseFloat(m[0]?.value || '0')
    const totalClicks = parseInt(m[1]?.value || '0')
    const totalImpressions = parseInt(m[2]?.value || '0')
    const avgCpc = parseFloat(m[3]?.value || '0')
    const totalSessions = parseInt(m[4]?.value || '0')
    const totalConversions = parseFloat(m[5]?.value || '0')

    return NextResponse.json({
      summary: {
        cost: totalCost,
        clicks: totalClicks,
        impressions: totalImpressions,
        cpc: avgCpc,
        ctr: totalImpressions > 0 ? totalClicks / totalImpressions : 0,
        sessions: totalSessions,
        conversions: totalConversions,
        costPerConversion: totalConversions > 0 ? totalCost / totalConversions : 0,
        days,
      },
      campaigns: (campaigns[0]?.rows || []).map((row) => ({
        name: row.dimensionValues?.[0]?.value || '(unknown)',
        cost: parseFloat(row.metricValues?.[0]?.value || '0'),
        clicks: parseInt(row.metricValues?.[1]?.value || '0'),
        impressions: parseInt(row.metricValues?.[2]?.value || '0'),
        sessions: parseInt(row.metricValues?.[3]?.value || '0'),
        conversions: parseFloat(row.metricValues?.[4]?.value || '0'),
      })),
      keywords: (keywords[0]?.rows || []).map((row) => ({
        keyword: row.dimensionValues?.[0]?.value || '(unknown)',
        cost: parseFloat(row.metricValues?.[0]?.value || '0'),
        clicks: parseInt(row.metricValues?.[1]?.value || '0'),
        impressions: parseInt(row.metricValues?.[2]?.value || '0'),
        sessions: parseInt(row.metricValues?.[3]?.value || '0'),
        conversions: parseFloat(row.metricValues?.[4]?.value || '0'),
      })),
      daily: (daily[0]?.rows || []).map((row) => {
        const d = row.dimensionValues?.[0]?.value || ''
        return {
          date: d ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : '',
          cost: parseFloat(row.metricValues?.[0]?.value || '0'),
          clicks: parseInt(row.metricValues?.[1]?.value || '0'),
          impressions: parseInt(row.metricValues?.[2]?.value || '0'),
        }
      }),
    })
  } catch (error) {
    console.error('Google Ads API error:', error)
    return NextResponse.json({ error: 'Google Ads 數據載入失敗' }, { status: 500 })
  }
}
