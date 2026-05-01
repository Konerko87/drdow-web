import type { Metadata } from 'next'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'
import { Icon, type IconName } from '@/components/ui/icon'

export const metadata: Metadata = createMetadata({
  title: '解決方案 — 宮廟管理 / 物流派車 / 倉儲管理 / 財務對帳 AI 數位轉型',
  description: '宮廟智慧管理、派車自動化、倉儲即時同步、財務自動化。Dr.Dow AI 針對宮廟、物流、倉儲與財務痛點提供完整的 AI 解決方案。',
  path: '/solutions',
  keywords: ['解決方案', 'AI解決方案', '宮廟管理', '物流數位轉型', '派車自動化', '倉儲管理', '庫存管理', '財務自動化'],
})

const TEMPLE_SOLUTIONS = [
  {
    icon: 'hand-heart' as IconName,
    title: '信徒管理數位化',
    desc: '信徒資料從紙本、Excel 散落各處，整合到雲端系統。家庭關係、服務紀錄、捐款歷程一站查詢。',
    pain: '信徒資料分散在不同人的電腦和紙本',
    result: '集中管理，任何人都能即時查詢完整紀錄',
    products: ['廟通'],
  },
  {
    icon: 'lamp' as IconName,
    title: '點燈牌位服務整合',
    desc: '點燈、安太歲、牌位、進塔服務統一管理。受益人、燈位、年度自動帶入，不用每年重新 key。',
    pain: '每年點燈資料重新登記，容易搞混出錯',
    result: '歷年紀錄自動帶入，櫃台作業時間減半',
    products: ['廟通'],
  },
  {
    icon: 'wallet' as IconName,
    title: '捐款收據自動化',
    desc: '具名、匿名捐款即時入帳，收據自動產生編號。日結對帳一鍵完成，財務透明可追蹤。',
    pain: '收據手開容易錯，月底對帳總是對不起來',
    result: '自動產生收據 + 日結對帳，帳務零落差',
    products: ['廟通'],
  },
  {
    icon: 'clipboard-list' as IconName,
    title: '法會活動管理',
    desc: '法會報名、繳費、桌次安排、QR Code 報到全自動。活動前中後一條龍處理。',
    pain: '電話報名、手抄桌次，到場才發現位子不夠',
    result: '線上報名 + 自動分桌 + QR 報到',
    products: ['廟通'],
  },
  {
    icon: 'coins' as IconName,
    title: '發財金數位管理',
    desc: '擲筊流程、借金規則、額度控管、黑名單、還金追蹤全系統化。不靠手寫，不漏不亂。',
    pain: '借還紀錄靠手寫，查不到誰借了多少',
    result: '數位化追蹤，借還狀態即時查詢',
    products: ['廟通'],
  },
  {
    icon: 'bar-chart' as IconName,
    title: '財務報表透明化',
    desc: '收支管理、傳票、會計科目、預算控管。委員會隨時看到即時數據，不用等會計整理。',
    pain: '委員會要報表，會計要花一週整理',
    result: '即時報表，收支、預算執行率一頁看完',
    products: ['廟通'],
  },
]

const LOGISTICS_SOLUTIONS = [
  {
    icon: 'truck' as IconName,
    title: '派車自動化',
    desc: '從 WMS 匯入訂單到路線規劃、司機指派，全程自動化。調度員從每天 3 小時排車縮短到 30 分鐘。',
    pain: '每天花 3 小時在 Excel 排派車',
    result: 'AI 路線規劃 + 拖拉指派，30 分鐘搞定',
    products: ['TMS'],
  },
  {
    icon: 'smartphone' as IconName,
    title: '司機行動管理',
    desc: '司機用 LINE 接單、GPS 打卡、拍照回報。不用裝 App，不用教操作。',
    pain: '司機用 LINE 群組回報，訊息常漏掉',
    result: 'LINE App 自動歸檔，所有紀錄可追溯',
    products: ['TMS'],
  },
  {
    icon: 'wrench' as IconName,
    title: '車隊維護管理',
    desc: '保養排程自動提醒、報修 AI 解析分類、油耗異常預警。降低車隊維護成本。',
    pain: '驗車到期才發現、維修紀錄找不到',
    result: '自動提醒 + AI 分類 + 費用分析',
    products: ['TMS'],
  },
]

const FINANCE_SOLUTIONS = [
  {
    icon: 'camera' as IconName,
    title: 'AI OCR 請款',
    desc: '廠商拍照上傳發票，AI 自動辨識廠商、金額、明細，準確率 95%+。',
    pain: '請款單堆滿桌、key 資料 key 到瘋',
    result: '拍照上傳 AI 自動填單，廠商自助送單',
    products: ['ERP'],
  },
  {
    icon: 'landmark' as IconName,
    title: '銀行自動對帳',
    desc: '每天自動登入企業網銀，AI 辨識驗證碼，抓取明細自動比對應收應付。',
    pain: '月底花 3 天比對銀行明細與應收帳款',
    result: '銀行爬蟲自動比對，3 小時搞定',
    products: ['ERP'],
  },
  {
    icon: 'shield' as IconName,
    title: '六層付款防呆',
    desc: 'DB 約束、照片 hash、軟警告、Boss 審核、API 冪等性、逐筆確認。',
    pain: '怕重複付款、怕匯錯帳號、怕被發票騙',
    result: '六層保護把錢牢牢守住',
    products: ['ERP'],
  },
  {
    icon: 'briefcase' as IconName,
    title: '老闆行動審核',
    desc: 'iOS 風格手機介面，收款進度、待審核、薪資排行一頁掌握。',
    pain: '老闆不在公司就沒人能簽單',
    result: '手機 App 一鍵審核 + 看照片明細',
    products: ['ERP'],
  },
]

const WAREHOUSE_SOLUTIONS = [
  {
    icon: 'scan-barcode' as IconName,
    title: '入庫掃碼自動化',
    desc: '到貨用條碼/QR 掃進系統，自動分配儲位與棧板，紙本驗收一次取代。',
    pain: '紙本驗收 + 手寫儲位，找貨找半天',
    result: '掃條碼自動分儲位，到貨即上架',
    products: ['WMS'],
  },
  {
    icon: 'package' as IconName,
    title: '出庫揀貨防錯',
    desc: '揀貨清單按儲位排序，掃碼複核防錯出。出貨完成自動通知 TMS 派車。',
    pain: '揀錯貨被客訴、揀貨員一直繞來繞去',
    result: '按儲位排序揀貨 + 掃碼複核，零揀錯',
    products: ['WMS'],
  },
  {
    icon: 'bar-chart' as IconName,
    title: '庫存即時透明',
    desc: '每一次異動立刻反映可用量、安全庫存、在途數，不用等夜批。',
    pain: '庫存表都是昨天的，業務不敢承諾交期',
    result: '即時庫存儀表板，業務直接報交期',
    products: ['WMS'],
  },
  {
    icon: 'search' as IconName,
    title: '盤點任務數位化',
    desc: '日盤、週盤、年盤任務派發，手機掃碼盤點，差異報表自動產出。',
    pain: '年度盤點停業 3 天、Excel 對到瘋掉',
    result: '手機盤點 + 差異報表自動跑',
    products: ['WMS'],
  },
]

function productBadgeClass(p: string) {
  if (p === '廟通') return 'text-[#B91C1C] bg-[#B91C1C]/10'
  if (p === 'WMS') return 'text-cyan-700 bg-cyan-500/10'
  if (p === 'ERP') return 'text-purple bg-purple/10'
  return 'text-accent bg-accent/10'
}

function SolutionCard({ solution, i }: { solution: { icon: IconName; title: string; desc: string; pain: string; result: string; products: string[] }; i: number }) {
  return (
    <FadeIn key={i} delay={i * 80}>
      <div className="bg-surface rounded-2xl p-8 hover-lift">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-purple/10 flex items-center justify-center flex-shrink-0">
            <Icon name={solution.icon} className="w-7 h-7 text-accent" strokeWidth={1.75} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-black">{solution.title}</h3>
              {solution.products.map((p) => (
                <span key={p} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${productBadgeClass(p)}`}>
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
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '解決方案',
        description: '宮廟智慧管理、派車自動化、財務自動化 AI 解決方案',
        url: `${SITE.url}/solutions`,
        about: [
          { '@type': 'Thing', name: '宮廟管理系統' },
          { '@type': 'Thing', name: '物流派車系統' },
          { '@type': 'Thing', name: '倉儲管理系統' },
          { '@type': 'Thing', name: '財務管理系統' },
        ],
      }} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: '解決方案', href: '/solutions' }]} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center mt-6">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              AI <span className="gradient-text">解決方案</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              針對宮廟管理、物流派車、倉儲管理與財務對帳最痛的問題，用 AI 提供完整解決方案。
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
              <SolutionCard key={i} solution={solution} i={i} />
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

      {/* TMS 物流派車 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <h2 className="text-2xl font-black">
              <span className="text-accent">TMS</span> 物流派車解決方案
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {LOGISTICS_SOLUTIONS.map((solution, i) => (
              <SolutionCard key={i} solution={solution} i={i} />
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <Link href="/products/tms" className="inline-block px-8 py-3.5 bg-accent text-white rounded-full font-semibold hover:bg-accent-light transition-colors">
              了解 TMS 派車系統 →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 分隔 */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-black/5" />
      </div>

      {/* WMS 倉儲管理 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <h2 className="text-2xl font-black">
              <span className="text-cyan-700">WMS</span> 倉儲管理解決方案
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {WAREHOUSE_SOLUTIONS.map((solution, i) => (
              <SolutionCard key={i} solution={solution} i={i} />
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <Link href="/products/wms" className="inline-block px-8 py-3.5 bg-cyan-600 text-white rounded-full font-semibold hover:bg-cyan-700 transition-colors">
              了解 WMS 倉儲系統 →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 分隔 */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-black/5" />
      </div>

      {/* ERP 財務 */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-10">
            <h2 className="text-2xl font-black">
              <span className="text-purple">ERP</span> 物流財務解決方案
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {FINANCE_SOLUTIONS.map((solution, i) => (
              <SolutionCard key={i} solution={solution} i={i} />
            ))}
          </div>
          <FadeIn className="text-center mt-10">
            <Link href="/products/erp" className="inline-block px-8 py-3.5 text-white rounded-full font-semibold hover:opacity-90 transition-opacity" style={{ background: '#8B5CF6' }}>
              了解 ERP 財務系統 →
            </Link>
          </FadeIn>
        </div>
      </section>

      <CTASection variant="generic" />
    </>
  )
}
