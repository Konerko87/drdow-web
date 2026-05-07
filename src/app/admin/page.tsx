'use client'

import { useState, useCallback } from 'react'

const TABS = ['總覽', '搜尋成效', '流量分析', '廣告成效', 'SEO 健檢', '索引狀態'] as const
type Tab = typeof TABS[number]

const PERIOD_OPTIONS = [
  { label: '7 天', value: 7 },
  { label: '28 天', value: 28 },
  { label: '90 天', value: 90 },
]

interface SearchConsoleData {
  summary: { clicks: number; impressions: number; ctr: number; days: number }
  queries: { query: string; clicks: number; impressions: number; ctr: number; position: number }[]
  pages: { page: string; clicks: number; impressions: number; ctr: number; position: number }[]
  daily: { date: string; clicks: number; impressions: number }[]
}

interface AnalyticsData {
  summary: { users: number; sessions: number; pageviews: number; avgDuration: number; bounceRate: number; days: number }
  pages: { path: string; views: number; users: number; avgDuration: number }[]
  sources: { channel: string; sessions: number; users: number }[]
  devices: { device: string; sessions: number; users: number }[]
}

interface GoogleAdsData {
  summary: {
    cost: number; clicks: number; impressions: number; cpc: number; ctr: number
    sessions: number; conversions: number; costPerConversion: number; days: number
  }
  campaigns: { name: string; cost: number; clicks: number; impressions: number; sessions: number; conversions: number }[]
  keywords: { keyword: string; cost: number; clicks: number; impressions: number; sessions: number; conversions: number }[]
  daily: { date: string; cost: number; clicks: number; impressions: number }[]
}

interface SeoCheckData {
  summary: { totalPages: number; pagesWithIssues: number; totalIssues: number; score: number }
  pages: {
    path: string; status: number; title: string; titleLength: number
    description: string; descriptionLength: number; h1: string; h1Count: number
    issues: string[]
  }[]
}

interface IndexStatusData {
  summary: { total: number; indexed: number; notIndexed: number; errors: number; score: number }
  byCoverage: Record<string, number>
  pages: {
    url: string; path: string; verdict: string; coverageState: string; indexingState: string
    lastCrawlTime: string | null; robotsTxtState: string; pageFetchState: string
    googleCanonical: string; userCanonical: string; errorMessage?: string
  }[]
}

interface OverviewData {
  days: number
  generatedAt: string
  search: SearchConsoleData | null
  analytics: AnalyticsData | null
  ads: GoogleAdsData | null
  seo: SeoCheckData | null
  errors: { source: string; message: string }[]
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('總覽')
  const [days, setDays] = useState(28)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [overviewData, setOverviewData] = useState<OverviewData | null>(null)
  const [searchData, setSearchData] = useState<SearchConsoleData | null>(null)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [adsData, setAdsData] = useState<GoogleAdsData | null>(null)
  const [seoData, setSeoData] = useState<SeoCheckData | null>(null)
  const [indexData, setIndexData] = useState<IndexStatusData | null>(null)

  const fetchData = useCallback(async (tab: Tab, period: number) => {
    const authHeaders = { 'x-admin-password': password }
    setLoading(true)
    setError('')
    try {
      if (tab === '總覽') {
        const loadJson = async (source: string, path: string) => {
          try {
            const res = await fetch(path, { headers: authHeaders })
            const data = await res.json()
            if (data.error) throw new Error(data.error)
            return { source, data, error: null }
          } catch (err) {
            return {
              source,
              data: null,
              error: err instanceof Error ? err.message : '載入失敗',
            }
          }
        }

        const [searchResult, analyticsResult, adsResult, seoResult] = await Promise.all([
          loadJson('搜尋成效', `/api/admin/search-console?days=${period}`),
          loadJson('流量分析', `/api/admin/analytics?days=${period}`),
          loadJson('廣告成效', `/api/admin/google-ads?days=${period}`),
          loadJson('SEO 健檢', '/api/admin/seo-check'),
        ])

        const search = searchResult.data as SearchConsoleData | null
        const analytics = analyticsResult.data as AnalyticsData | null
        const ads = adsResult.data as GoogleAdsData | null
        const seo = seoResult.data as SeoCheckData | null

        if (search) setSearchData(search)
        if (analytics) setAnalyticsData(analytics)
        if (ads) setAdsData(ads)
        if (seo) setSeoData(seo)

        setOverviewData({
          days: period,
          generatedAt: new Date().toISOString(),
          search,
          analytics,
          ads,
          seo,
          errors: [searchResult, analyticsResult, adsResult, seoResult]
            .filter((r) => r.error)
            .map((r) => ({ source: r.source, message: r.error || '載入失敗' })),
        })
      } else if (tab === '搜尋成效') {
        const res = await fetch(`/api/admin/search-console?days=${period}`, { headers: authHeaders })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setSearchData(data)
      } else if (tab === '流量分析') {
        const res = await fetch(`/api/admin/analytics?days=${period}`, { headers: authHeaders })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setAnalyticsData(data)
      } else if (tab === '廣告成效') {
        const res = await fetch(`/api/admin/google-ads?days=${period}`, { headers: authHeaders })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setAdsData(data)
      } else if (tab === 'SEO 健檢') {
        const res = await fetch('/api/admin/seo-check', { headers: authHeaders })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setSeoData(data)
      } else {
        const res = await fetch('/api/admin/index-status', { headers: authHeaders })
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setIndexData(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '載入失敗')
    } finally {
      setLoading(false)
    }
  }, [password])

  const handleLogin = () => {
    if (password.trim()) {
      setIsLoggedIn(true)
      fetchData(activeTab, days)
    }
  }

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab)
    const cached =
      tab === '總覽' ? overviewData
      : tab === '搜尋成效' ? searchData
      : tab === '流量分析' ? analyticsData
      : tab === '廣告成效' ? adsData
      : tab === 'SEO 健檢' ? seoData
      : indexData
    if (!cached) fetchData(tab, days)
  }

  const handlePeriodChange = (period: number) => {
    setDays(period)
    setOverviewData(null)
    setSearchData(null)
    setAnalyticsData(null)
    setAdsData(null)
    fetchData(activeTab, period)
  }

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Dr.Dow AI</h1>
            <p className="text-slate-400 text-sm mt-1">SEO 管理後台</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              autoComplete="current-password"
              placeholder="輸入密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-base"
            />
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl active:bg-blue-700 text-base"
            >
              登入
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800">
        <div className="px-4 py-3">
          <h1 className="text-lg font-bold">SEO 後台</h1>
        </div>

        {/* Tabs */}
        <div className="flex px-4 gap-1 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors ${
                activeTab === tab
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 active:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Period selector (not for SEO check / 索引狀態) */}
      {activeTab !== 'SEO 健檢' && activeTab !== '索引狀態' && (
        <div className="flex gap-2 px-4 py-3">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handlePeriodChange(opt.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                days === opt.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 active:bg-slate-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
          <button
            onClick={() => fetchData(activeTab, days)}
            className="ml-auto px-3 py-1.5 text-xs font-medium rounded-full bg-slate-800 text-slate-400 active:bg-slate-700"
          >
            重新整理
          </button>
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-2">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-slate-400 text-sm">載入中...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-800 rounded-xl p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && activeTab === '搜尋成效' && searchData && (
          <SearchConsoleView data={searchData} />
        )}

        {!loading && !error && activeTab === '總覽' && overviewData && (
          <OverviewView data={overviewData} />
        )}

        {!loading && !error && activeTab === '流量分析' && analyticsData && (
          <AnalyticsView data={analyticsData} />
        )}

        {!loading && !error && activeTab === '廣告成效' && adsData && (
          <GoogleAdsView data={adsData} />
        )}

        {!loading && !error && activeTab === 'SEO 健檢' && seoData && (
          <SeoCheckView data={seoData} />
        )}

        {!loading && !error && activeTab === 'SEO 健檢' && !seoData && (
          <div className="text-center py-20">
            <button
              onClick={() => fetchData('SEO 健檢', days)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl active:bg-blue-700"
            >
              開始健檢
            </button>
          </div>
        )}

        {!loading && !error && activeTab === '索引狀態' && indexData && (
          <IndexStatusView data={indexData} />
        )}

        {!loading && !error && activeTab === '索引狀態' && !indexData && (
          <div className="text-center py-20 px-4">
            <p className="text-sm text-slate-400 mb-4">
              查詢 sitemap 中每一頁在 Google 的索引狀態，每筆約需 0.3 秒（限速保護），可能需要 10-30 秒。
            </p>
            <button
              onClick={() => fetchData('索引狀態', days)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl active:bg-blue-700"
            >
              開始檢查
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function fmtNumber(n: number) {
  return n < 1000 ? n.toString() : `${(n / 1000).toFixed(1)}k`
}

function fmtMoney(n: number) {
  return `NT$${Math.round(n).toLocaleString()}`
}

function fmtPercent(n: number, digits = 1) {
  return `${(n * 100).toFixed(digits)}%`
}

function fmtDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.round(seconds % 60)
  return m > 0 ? `${m}m ${s}s` : `${s}s`
}

// ─── Metric Card ────────────────────────────────────────
function MetricCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
      <div className="text-xs text-slate-400 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
    </div>
  )
}

// ─── Overview View ───────────────────────────────────────
function OverviewView({ data }: { data: OverviewData }) {
  const alerts = buildOverviewAlerts(data)
  const queryOpportunities = (data.search?.queries || [])
    .filter((q) => q.impressions >= 10 && q.ctr < 0.05)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 5)
  const seoIssues = (data.seo?.pages || []).filter((p) => p.issues.length > 0).slice(0, 5)
  const paidNoConversion = (data.ads?.campaigns || [])
    .filter((c) => c.cost > 0 && c.conversions === 0)
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold">營運總覽</h2>
            <p className="text-xs text-slate-400 mt-1">
              過去 {data.days} 天，更新於 {new Date(data.generatedAt).toLocaleString('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30">
            Dashboard
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          label="Google 自然點擊"
          value={data.search ? fmtNumber(data.search.summary.clicks) : '—'}
          sub={data.search ? `${fmtNumber(data.search.summary.impressions)} 曝光 · CTR ${fmtPercent(data.search.summary.ctr)}` : 'Search Console 未載入'}
        />
        <MetricCard
          label="網站工作階段"
          value={data.analytics ? fmtNumber(data.analytics.summary.sessions) : '—'}
          sub={data.analytics ? `${fmtNumber(data.analytics.summary.users)} 使用者 · ${fmtDuration(data.analytics.summary.avgDuration)}` : 'GA4 未載入'}
        />
        <MetricCard
          label="廣告花費"
          value={data.ads ? fmtMoney(data.ads.summary.cost) : '—'}
          sub={data.ads ? `${fmtNumber(data.ads.summary.clicks)} 點擊 · ${data.ads.summary.conversions.toFixed(0)} 轉換` : 'Ads 未載入'}
        />
        <MetricCard
          label="SEO 健康度"
          value={data.seo ? data.seo.summary.score : '—'}
          sub={data.seo ? `${data.seo.summary.pagesWithIssues}/${data.seo.summary.totalPages} 頁有問題` : 'SEO 健檢未載入'}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">可行動提醒</h3>
        <div className="space-y-2">
          {alerts.map((alert, i) => (
            <InsightCard key={i} tone={alert.tone} title={alert.title} body={alert.body} />
          ))}
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">漏斗速讀</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <FunnelStep label="自然曝光" value={data.search ? fmtNumber(data.search.summary.impressions) : '—'} />
          <FunnelStep label="自然點擊" value={data.search ? fmtNumber(data.search.summary.clicks) : '—'} />
          <FunnelStep label="廣告點擊" value={data.ads ? fmtNumber(data.ads.summary.clicks) : '—'} />
          <FunnelStep label="Paid Search 工作階段" value={data.ads ? fmtNumber(data.ads.summary.sessions) : '—'} />
          <FunnelStep label="全站工作階段" value={data.analytics ? fmtNumber(data.analytics.summary.sessions) : '—'} />
          <FunnelStep label="轉換" value={data.ads ? data.ads.summary.conversions.toFixed(0) : '—'} />
        </div>
      </div>

      {queryOpportunities.length > 0 && (
        <OverviewList
          title="高曝光但 CTR 偏低的搜尋字"
          items={queryOpportunities.map((q) => ({
            title: q.query,
            meta: `${q.impressions} 曝光 · ${q.clicks} 點擊 · CTR ${fmtPercent(q.ctr)} · 排名 ${q.position.toFixed(1)}`,
          }))}
        />
      )}

      {paidNoConversion.length > 0 && (
        <OverviewList
          title="有花費但尚無轉換的廣告活動"
          items={paidNoConversion.map((c) => ({
            title: c.name,
            meta: `${fmtMoney(c.cost)} · ${c.clicks} 點擊 · ${c.impressions} 曝光`,
          }))}
        />
      )}

      {seoIssues.length > 0 && (
        <OverviewList
          title="SEO 健檢優先處理頁"
          items={seoIssues.map((p) => ({
            title: p.path,
            meta: p.issues.slice(0, 2).join('、'),
          }))}
        />
      )}

      {data.analytics?.pages && data.analytics.pages.length > 0 && (
        <OverviewList
          title="熱門頁面"
          items={data.analytics.pages.slice(0, 5).map((p) => ({
            title: p.path,
            meta: `${p.views} 瀏覽 · ${p.users} 使用者 · 停留 ${fmtDuration(p.avgDuration)}`,
          }))}
        />
      )}
    </div>
  )
}

function buildOverviewAlerts(data: OverviewData): { tone: 'good' | 'warn' | 'bad'; title: string; body: string }[] {
  const alerts: { tone: 'good' | 'warn' | 'bad'; title: string; body: string }[] = []

  for (const err of data.errors) {
    alerts.push({ tone: 'bad', title: `${err.source} 載入失敗`, body: err.message })
  }

  if (data.ads && data.ads.summary.cost > 0 && data.ads.summary.conversions === 0) {
    alerts.push({
      tone: 'bad',
      title: '廣告有花費但目前 0 轉換',
      body: `${fmtMoney(data.ads.summary.cost)} / ${data.ads.summary.clicks} 次點擊，建議先看關鍵字與落地頁是否精準。`,
    })
  }

  if (data.search && data.search.summary.impressions >= 100 && data.search.summary.ctr < 0.03) {
    alerts.push({
      tone: 'warn',
      title: '搜尋曝光有量，但 CTR 偏低',
      body: `${data.search.summary.impressions} 曝光、CTR ${fmtPercent(data.search.summary.ctr)}，優先調 title / description。`,
    })
  }

  if (data.analytics && data.analytics.summary.bounceRate > 0.7 && data.analytics.summary.sessions >= 10) {
    alerts.push({
      tone: 'warn',
      title: '跳出率偏高',
      body: `目前跳出率 ${fmtPercent(data.analytics.summary.bounceRate)}，可檢查首頁首屏、CTA 與落地頁速度。`,
    })
  }

  if (data.seo && data.seo.summary.pagesWithIssues > 0) {
    alerts.push({
      tone: 'warn',
      title: '仍有 SEO 健檢問題',
      body: `${data.seo.summary.pagesWithIssues} 頁有問題，共 ${data.seo.summary.totalIssues} 項，建議從 sitemap 核心頁先修。`,
    })
  }

  if (alerts.length === 0) {
    alerts.push({
      tone: 'good',
      title: '目前沒有明顯警報',
      body: '主要資料源已載入，沒有偵測到高優先級異常。',
    })
  }

  return alerts
}

function InsightCard({ tone, title, body }: { tone: 'good' | 'warn' | 'bad'; title: string; body: string }) {
  const cls = tone === 'bad'
    ? 'bg-red-950/30 border-red-800/70 text-red-200'
    : tone === 'warn'
      ? 'bg-amber-950/30 border-amber-800/70 text-amber-200'
      : 'bg-green-950/30 border-green-800/70 text-green-200'

  return (
    <div className={`rounded-xl p-3 border ${cls}`}>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs opacity-80 mt-1 leading-relaxed">{body}</div>
    </div>
  )
}

function FunnelStep({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-900/60 border border-slate-700/50 p-3">
      <div className="text-slate-500 mb-1">{label}</div>
      <div className="text-lg font-bold text-white">{value}</div>
    </div>
  )
}

function OverviewList({ title, items }: { title: string; items: { title: string; meta: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-300 mb-3">{title}</h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
            <div className="text-sm font-medium truncate">{item.title}</div>
            <div className="text-xs text-slate-400 mt-1">{item.meta}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Search Console View ────────────────────────────────
function SearchConsoleView({ data }: { data: SearchConsoleData }) {
  const { summary, queries, pages, daily } = data
  const maxImpressions = Math.max(...daily.map((d) => d.impressions), 1)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="總點擊" value={summary.clicks} />
        <MetricCard label="總曝光" value={summary.impressions} />
        <MetricCard label="平均 CTR" value={`${(summary.ctr * 100).toFixed(1)}%`} />
        <MetricCard label="過去天數" value={`${summary.days} 天`} />
      </div>

      {/* Mini Chart */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <div className="text-xs text-slate-400 mb-3">每日曝光趨勢</div>
        <div className="flex items-end gap-[2px] h-20">
          {daily.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500/60 rounded-t-sm min-h-[2px]"
                style={{ height: `${(d.impressions / maxImpressions) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-slate-600">{daily[0]?.date?.slice(5)}</span>
          <span className="text-[10px] text-slate-600">{daily[daily.length - 1]?.date?.slice(5)}</span>
        </div>
      </div>

      {/* Top Queries */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">熱門搜尋字</h3>
        {queries.length === 0 ? (
          <p className="text-sm text-slate-500">尚無數據</p>
        ) : (
          <div className="space-y-2">
            {queries.map((q, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <div className="text-sm font-medium mb-1">{q.query}</div>
                <div className="flex gap-4 text-xs text-slate-400">
                  <span>點擊 <strong className="text-white">{q.clicks}</strong></span>
                  <span>曝光 <strong className="text-white">{q.impressions}</strong></span>
                  <span>排名 <strong className="text-white">{q.position.toFixed(1)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top Pages */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">頁面表現</h3>
        <div className="space-y-2">
          {pages.map((p, i) => (
            <div key={i} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
              <div className="text-sm font-medium mb-1 truncate">{p.page || '/'}</div>
              <div className="flex gap-4 text-xs text-slate-400">
                <span>點擊 <strong className="text-white">{p.clicks}</strong></span>
                <span>曝光 <strong className="text-white">{p.impressions}</strong></span>
                <span>CTR <strong className="text-white">{(p.ctr * 100).toFixed(0)}%</strong></span>
                <span>排名 <strong className="text-white">{p.position.toFixed(1)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Analytics View ─────────────────────────────────────
function AnalyticsView({ data }: { data: AnalyticsData }) {
  const { summary, pages, sources, devices } = data

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.round(seconds % 60)
    return m > 0 ? `${m}m ${s}s` : `${s}s`
  }

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="使用者" value={summary.users} />
        <MetricCard label="工作階段" value={summary.sessions} />
        <MetricCard label="瀏覽量" value={summary.pageviews} />
        <MetricCard label="平均停留" value={formatDuration(summary.avgDuration)} />
        <MetricCard label="跳出率" value={`${(summary.bounceRate * 100).toFixed(1)}%`} />
        <MetricCard label="期間" value={`${summary.days} 天`} />
      </div>

      {/* Traffic Sources */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">流量來源</h3>
        <div className="space-y-2">
          {sources.map((s, i) => {
            const totalSessions = sources.reduce((sum, x) => sum + x.sessions, 0)
            const pct = totalSessions > 0 ? (s.sessions / totalSessions) * 100 : 0
            return (
              <div key={i} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{s.channel}</span>
                  <span className="text-xs text-slate-400">{s.sessions} 次</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Devices */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">裝置分佈</h3>
        <div className="grid grid-cols-3 gap-3">
          {devices.map((d, i) => {
            const icon = d.device === 'mobile' ? '📱' : d.device === 'desktop' ? '💻' : '📟'
            const label = d.device === 'mobile' ? '手機' : d.device === 'desktop' ? '電腦' : '平板'
            return (
              <div key={i} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 text-center">
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-xs text-slate-400">{label}</div>
                <div className="text-lg font-bold mt-1">{d.sessions}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top Pages */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">熱門頁面</h3>
        <div className="space-y-2">
          {pages.map((p, i) => (
            <div key={i} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
              <div className="text-sm font-medium mb-1 truncate">{p.path}</div>
              <div className="flex gap-4 text-xs text-slate-400">
                <span>瀏覽 <strong className="text-white">{p.views}</strong></span>
                <span>用戶 <strong className="text-white">{p.users}</strong></span>
                <span>停留 <strong className="text-white">{formatDuration(p.avgDuration)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── SEO Check View ─────────────────────────────────────
function SeoCheckView({ data }: { data: SeoCheckData }) {
  const { summary, pages } = data
  const [expanded, setExpanded] = useState<string | null>(null)

  const scoreColor = summary.score >= 80 ? 'text-green-400' : summary.score >= 50 ? 'text-yellow-400' : 'text-red-400'
  const scoreBg = summary.score >= 80 ? 'bg-green-500' : summary.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="text-center py-6">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-28 h-28 -rotate-90">
            <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-800" />
            <circle
              cx="56" cy="56" r="48"
              stroke="currentColor" strokeWidth="8" fill="none"
              className={scoreColor}
              strokeDasharray={`${(summary.score / 100) * 301.6} 301.6`}
              strokeLinecap="round"
            />
          </svg>
          <span className={`absolute text-3xl font-bold ${scoreColor}`}>{summary.score}</span>
        </div>
        <div className="text-sm text-slate-400 mt-2">
          {summary.totalPages} 頁中有 {summary.pagesWithIssues} 頁有問題
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="總頁數" value={summary.totalPages} />
        <MetricCard label="有問題" value={summary.pagesWithIssues} />
        <MetricCard label="問題數" value={summary.totalIssues} />
      </div>

      {/* Page Details */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">各頁檢查結果</h3>
        <div className="space-y-2">
          {pages.map((p) => (
            <div key={p.path} className="bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === p.path ? null : p.path)}
                className="w-full p-3 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${p.issues.length === 0 ? 'bg-green-500' : scoreBg}`} />
                  <span className="text-sm font-medium truncate">{p.path}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {p.issues.length > 0 && (
                    <span className="text-xs bg-red-900/50 text-red-300 px-2 py-0.5 rounded-full">
                      {p.issues.length} 問題
                    </span>
                  )}
                  <span className="text-slate-500 text-xs">{expanded === p.path ? '▲' : '▼'}</span>
                </div>
              </button>

              {expanded === p.path && (
                <div className="px-3 pb-3 space-y-2 border-t border-slate-700/50 pt-2">
                  <Detail label="Title" value={p.title} sub={`${p.titleLength} 字`} />
                  <Detail label="Description" value={p.description} sub={`${p.descriptionLength} 字`} />
                  <Detail label="H1" value={p.h1} sub={`${p.h1Count} 個`} />
                  <Detail label="Status" value={`HTTP ${p.status}`} />

                  {p.issues.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-red-400 font-medium mb-1">問題：</div>
                      {p.issues.map((issue, i) => (
                        <div key={i} className="text-xs text-red-300 flex items-start gap-1 ml-2">
                          <span className="shrink-0">•</span>
                          <span>{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <div className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</div>
      <div className="text-xs text-slate-300 break-all">
        {value || <span className="text-red-400">未設定</span>}
        {sub && <span className="text-slate-500 ml-1">({sub})</span>}
      </div>
    </div>
  )
}

// ─── Google Ads View ───────────────────────────────────
function GoogleAdsView({ data }: { data: GoogleAdsData }) {
  const { summary, campaigns, keywords, daily } = data
  const maxClicks = Math.max(...daily.map((d) => d.clicks), 1)
  const maxCost = Math.max(...daily.map((d) => d.cost), 1)

  const fmt = (n: number) => n < 1000 ? n.toString() : `${(n / 1000).toFixed(1)}k`
  const fmtMoney = (n: number) => `NT$${Math.round(n).toLocaleString()}`

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="總花費" value={fmtMoney(summary.cost)} sub={`${summary.days} 天`} />
        <MetricCard label="點擊數" value={fmt(summary.clicks)} />
        <MetricCard label="曝光數" value={fmt(summary.impressions)} />
        <MetricCard label="平均 CPC" value={fmtMoney(summary.cpc)} />
        <MetricCard label="CTR" value={`${(summary.ctr * 100).toFixed(2)}%`} />
        <MetricCard label="轉換數" value={summary.conversions.toFixed(0)} sub={summary.costPerConversion > 0 ? `${fmtMoney(summary.costPerConversion)}/轉換` : undefined} />
      </div>

      {/* Daily Trend - Dual chart: cost bars + clicks line */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-slate-400">每日趨勢</div>
          <div className="flex gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500/60 inline-block" />花費</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />點擊</span>
          </div>
        </div>
        <div className="flex items-end gap-[2px] h-24">
          {daily.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              <div
                className="w-full bg-amber-500/40 rounded-t-sm min-h-[2px]"
                style={{ height: `${(d.cost / maxCost) * 100}%` }}
              />
              <div
                className="absolute bottom-0 w-1.5 bg-blue-400 rounded-full min-h-[2px]"
                style={{ height: `${(d.clicks / maxClicks) * 100}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-slate-600">{daily[0]?.date?.slice(5)}</span>
          <span className="text-[10px] text-slate-600">{daily[daily.length - 1]?.date?.slice(5)}</span>
        </div>
      </div>

      {/* Campaigns */}
      {campaigns.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3">廣告活動</h3>
          <div className="space-y-2">
            {campaigns.map((c, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <div className="text-sm font-medium mb-2">{c.name}</div>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-400">
                  <span>花費 <strong className="text-amber-400">{fmtMoney(c.cost)}</strong></span>
                  <span>點擊 <strong className="text-white">{c.clicks}</strong></span>
                  <span>曝光 <strong className="text-white">{fmt(c.impressions)}</strong></span>
                  <span>CTR <strong className="text-white">{c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(1) : '0'}%</strong></span>
                  <span>工作階段 <strong className="text-white">{c.sessions}</strong></span>
                  <span>轉換 <strong className="text-green-400">{c.conversions.toFixed(0)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keywords */}
      {keywords.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3">關鍵字成效</h3>
          <div className="space-y-2">
            {keywords.map((k, i) => {
              const ctr = k.impressions > 0 ? ((k.clicks / k.impressions) * 100).toFixed(1) : '0'
              return (
                <div key={i} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                  <div className="text-sm font-medium mb-2">{k.keyword}</div>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                    <span>花費 <strong className="text-amber-400">{fmtMoney(k.cost)}</strong></span>
                    <span>點擊 <strong className="text-white">{k.clicks}</strong></span>
                    <span>曝光 <strong className="text-white">{k.impressions}</strong></span>
                    <span>CTR <strong className="text-white">{ctr}%</strong></span>
                    {k.conversions > 0 && <span>轉換 <strong className="text-green-400">{k.conversions.toFixed(0)}</strong></span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {campaigns.length === 0 && keywords.length === 0 && summary.clicks === 0 && (
        <div className="text-center py-10">
          <div className="text-3xl mb-3">📊</div>
          <div className="text-slate-400 text-sm">此期間無廣告數據</div>
          <div className="text-slate-500 text-xs mt-1">請確認 Google Ads 已連結 GA4</div>
        </div>
      )}
    </div>
  )
}

// ─── Index Status View ───────────────────────────────────
function IndexStatusView({ data }: { data: IndexStatusData }) {
  const { summary, byCoverage, pages } = data
  const scoreColor = summary.score >= 80 ? 'text-green-400' : summary.score >= 50 ? 'text-yellow-400' : 'text-red-400'
  const scoreBg = summary.score >= 80 ? 'bg-green-500' : summary.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'

  // 把未索引 / 錯誤的頁面排在前面，方便聚焦處理
  const sorted = [...pages].sort((a, b) => {
    const rank = (v: string) => (v === 'PASS' ? 2 : v === 'ERROR' ? 0 : 1)
    return rank(a.verdict) - rank(b.verdict)
  })

  const verdictLabel = (v: string) => {
    if (v === 'PASS') return { text: '已索引', cls: 'bg-green-900/40 text-green-300' }
    if (v === 'FAIL') return { text: '未索引', cls: 'bg-red-900/40 text-red-300' }
    if (v === 'NEUTRAL') return { text: '部分問題', cls: 'bg-yellow-900/40 text-yellow-300' }
    if (v === 'PARTIAL') return { text: '部分索引', cls: 'bg-yellow-900/40 text-yellow-300' }
    if (v === 'ERROR') return { text: 'API 錯誤', cls: 'bg-slate-700 text-slate-300' }
    return { text: v, cls: 'bg-slate-700 text-slate-300' }
  }

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="text-center py-6">
        <div className="relative inline-flex items-center justify-center">
          <svg className="w-28 h-28 -rotate-90">
            <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-800" />
            <circle
              cx="56" cy="56" r="48"
              stroke="currentColor" strokeWidth="8" fill="none"
              className={scoreColor}
              strokeDasharray={`${(summary.score / 100) * 301.6} 301.6`}
              strokeLinecap="round"
            />
          </svg>
          <span className={`absolute text-3xl font-bold ${scoreColor}`}>{summary.score}</span>
        </div>
        <div className="text-sm text-slate-400 mt-2">
          {summary.indexed} / {summary.total} 頁已被 Google 索引
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <MetricCard label="已索引" value={summary.indexed} />
        <MetricCard label="未索引" value={summary.notIndexed} />
        <MetricCard label="錯誤" value={summary.errors} />
      </div>

      {/* Coverage breakdown */}
      {Object.keys(byCoverage).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-300 mb-3">涵蓋狀態分佈</h3>
          <div className="space-y-2">
            {Object.entries(byCoverage)
              .sort((a, b) => b[1] - a[1])
              .map(([state, count]) => {
                const pct = summary.total > 0 ? (count / summary.total) * 100 : 0
                return (
                  <div key={state} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{state}</span>
                      <span className="text-xs text-slate-400">{count} 頁</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div className={`${scoreBg} h-1.5 rounded-full`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}

      {/* Page list */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">逐頁狀態（未索引優先）</h3>
        <div className="space-y-2">
          {sorted.map((p) => {
            const v = verdictLabel(p.verdict)
            return (
              <div key={p.url} className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-sm font-medium truncate min-w-0">{p.path || '/'}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${v.cls}`}>{v.text}</span>
                </div>
                <div className="text-xs text-slate-400 space-y-0.5">
                  <div>狀態：<span className="text-slate-300">{p.coverageState}</span></div>
                  {p.lastCrawlTime && (
                    <div>最後抓取：<span className="text-slate-300">{new Date(p.lastCrawlTime).toLocaleDateString('zh-TW')}</span></div>
                  )}
                  {p.googleCanonical && p.userCanonical && p.googleCanonical !== p.userCanonical && (
                    <div className="text-yellow-400">⚠ Canonical 不一致</div>
                  )}
                  {p.errorMessage && (
                    <div className="text-red-400 break-all">{p.errorMessage}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
