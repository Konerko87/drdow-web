import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { FadeIn } from '@/components/ui/fade-in'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '解決方案 — 宮廟管理 / 物流業 AI 數位轉型',
  description: '宮廟智慧管理、派車自動化、財務自動化。Dr.Dow AI 針對宮廟與物流業痛點提供完整的 AI 解決方案。',
  path: '/solutions',
})

const TEMPLE_SOLUTIONS = [
  {
    icon: '🙏',
    title: '信徒管理數位化',
    desc: '信徒資料從紙本、Excel 散落各處，整合到雲端系統。家庭關係、服務紀錄、捐款歷程一站查詢。',
    pain: '信徒資料分散在不同人的電腦和紙本',
    result: '集中管理，任何人都能即時查詢完整紀錄',
    products: ['廟通'],
  },
  {
    icon: '🏮',
    title: '點燈牌位服務整合',
    desc: '點燈、安太歲、牌位、進塔服務統一管理。受益人、燈位、年度自動帶入，不用每年重新 key。',
    pain: '每年點燈資料重新登記，容易搞混出錯',
    result: '歷年紀錄自動帶入，櫃台作業時間減半',
    products: ['廟通'],
  },
  {
    icon: '💰',
    title: '捐款收據自動化',
    desc: '具名、匿名捐款即時入帳，收據自動產生編號。日結對帳一鍵完成，財務透明可追蹤。',
    pain: '收據手開容易錯，月底對帳總是對不起來',
    result: '自動產生收據 + 日結對帳，帳務零落差',
    products: ['廟通'],
  },
  {
    icon: '📋',
    title: '法會活動管理',
    desc: '法會報名、繳費、桌次安排、QR Code 報到全自動。活動前中後一條龍處理。',
    pain: '電話報名、手抄桌次，到場才發現位子不夠',
    result: '線上報名 + 自動分桌 + QR 報到',
    products: ['廟通'],
  },
  {
    icon: '🪙',
    title: '發財金數位管理',
    desc: '擲筊流程、借金規則、額度控管、黑名單、還金追蹤全系統化。不靠手寫，不漏不亂。',
    pain: '借還紀錄靠手寫，查不到誰借了多少',
    result: '數位化追蹤，借還狀態即時查詢',
    products: ['廟通'],
  },
  {
    icon: '📊',
    title: '財務報表透明化',
    desc: '收支管理、傳票、會計科目、預算控管。委員會隨時看到即時數據，不用等會計整理。',
    pain: '委員會要報表，會計要花一週整理',
    result: '即時報表，收支、預算執行率一頁看完',
    products: ['廟通'],
  },
]

const LOGISTICS_SOLUTIONS = [
  {
    icon: '🚛',
    title: '派車自動化',
    desc: '從 WMS 匯入訂單到路線規劃、司機指派，全程自動化。調度員從每天 3 小時排車縮短到 30 分鐘。',
    pain: '每天花 3 小時在 Excel 排派車',
    result: 'AI 路線規劃 + 拖拉指派，30 分鐘搞定',
    products: ['TMS'],
  },
  {
    icon: '💵',
    title: '財務自動化',
    desc: 'AI 辨識發票、自動對帳、六層防呆。月底結算從 3 天縮短到 3 小時。',
    pain: '月底花 3 天對帳、怕重複付款',
    result: '銀行爬蟲自動比對 + 六層防呆',
    products: ['ERP'],
  },
  {
    icon: '📱',
    title: '司機行動管理',
    desc: '司機用 LINE 接單、GPS 打卡、拍照回報。不用裝 App，不用教操作。',
    pain: '司機用 LINE 群組回報，訊息常漏掉',
    result: 'LINE App 自動歸檔，所有紀錄可追溯',
    products: ['TMS'],
  },
  {
    icon: '🔧',
    title: '車隊維護管理',
    desc: '保養排程自動提醒、報修 AI 解析分類、油耗異常預警。降低車隊維護成本。',
    pain: '驗車到期才發現、維修紀錄找不到',
    result: '自動提醒 + AI 分類 + 費用分析',
    products: ['TMS'],
  },
]

function SolutionCard({ solution, i, isTemple }: { solution: typeof TEMPLE_SOLUTIONS[number]; i: number; isTemple: boolean }) {
  return (
    <FadeIn key={i} delay={i * 80}>
      <div className="bg-surface rounded-2xl p-8 hover-lift">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="text-4xl">{solution.icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-black">{solution.title}</h3>
              {solution.products.map((p) => (
                <span key={p} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  p === '廟通' ? 'text-[#B91C1C] bg-[#B91C1C]/10' : 'text-accent bg-accent/10'
                }`}>
                  {p}
                </span>
              ))}
            </div>
            <p className="text-muted mb-4">{solution.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-red-500 mb-1">Before</p>
                <p className="text-sm text-red-700">{solution.pain}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs font-semibold text-green-600 mb-1">After</p>
                <p className="text-sm text-green-700">{solution.result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}

export default function SolutionsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '解決方案', url: '/solutions' }]} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              AI <span className="gradient-text">解決方案</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              針對宮廟管理與物流公司最痛的問題，用 AI 提供完整解決方案。
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 廟通解決方案 */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <h2 className="text-2xl font-black">
              <span style={{ color: '#B91C1C' }}>廟通</span> 宮廟管理解決方案
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {TEMPLE_SOLUTIONS.map((solution, i) => (
              <SolutionCard key={i} solution={solution} i={i} isTemple={true} />
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <Link href="/products/miaotong" className="inline-block px-8 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-opacity" style={{ background: '#B91C1C' }}>
              了解廟通完整功能 →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 分隔 */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-black/5" />
      </div>

      {/* 物流解決方案 */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <h2 className="text-2xl font-black">
              <span className="text-accent">TMS / ERP</span> 物流管理解決方案
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {LOGISTICS_SOLUTIONS.map((solution, i) => (
              <SolutionCard key={i} solution={solution} i={i} isTemple={false} />
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <Link href="/products/tms" className="inline-block px-8 py-3.5 bg-accent text-white rounded-full font-semibold hover:bg-accent-light transition-colors">
              了解物流系統 →
            </Link>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  )
}
