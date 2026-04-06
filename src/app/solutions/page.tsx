import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { FadeIn } from '@/components/ui/fade-in'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '解決方案 — 物流業 AI 數位轉型',
  description: '派車自動化、財務自動化、司機管理、車隊管理。Dr.Dow AI 針對物流業痛點提供完整的 AI 解決方案。',
  path: '/solutions',
})

const SOLUTIONS = [
  {
    icon: '🚛',
    title: '派車自動化',
    desc: '從 WMS 匯入訂單到路線規劃、司機指派，全程自動化。調度員從每天 3 小時排車縮短到 30 分鐘。',
    pain: '每天花 3 小時在 Excel 排派車',
    result: 'AI 路線規劃 + 拖拉指派，30 分鐘搞定',
    products: ['TMS'],
  },
  {
    icon: '💰',
    title: '財務自動化',
    desc: 'AI 辨識發票、自動對帳、六層防呆。月底結算從 3 天縮短到 3 小時。',
    pain: '月底花 3 天對帳、怕重複付��',
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
  {
    icon: '🏪',
    title: '廠商協作',
    desc: '廠商 LINE 登入自行送請款單，追蹤審核進度，不再打電話問「我的錢何時入帳」。',
    pain: '廠商一直打電話問撥款進度',
    result: '自助 Portal，廠商自己查進度',
    products: ['ERP'],
  },
  {
    icon: '📊',
    title: '營運數據分析',
    desc: '裝載率、每板成本、司機績效、油耗排行。數據驅動決策，不再靠感覺。',
    pain: '不知道哪台車賺錢、哪條路線虧錢',
    result: '10+ 維度 KPI，一頁看完',
    products: ['TMS', 'ERP'],
  },
]

export default function SolutionsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '解決方案', url: '/solutions' }]} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              物流業 <span className="gradient-text">AI 解決方案</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              針對物流公司最痛的問題，用 AI 提供完整解決方案。
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-8">
            {SOLUTIONS.map((solution, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-surface rounded-2xl p-8 hover-lift">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="text-4xl">{solution.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-black">{solution.title}</h2>
                        {solution.products.map((p) => (
                          <span key={p} className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
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
            ))}
          </div>

          <FadeIn className="text-center mt-16">
            <Link
              href="/contact"
              className="inline-block px-8 py-3.5 bg-accent text-white rounded-full font-semibold hover:bg-accent-light transition-colors"
            >
              找到你的解決方案 →
            </Link>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  )
}
