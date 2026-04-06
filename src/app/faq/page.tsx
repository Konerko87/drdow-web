import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeIn } from '@/components/ui/fade-in'
import { CTASection } from '@/components/sections/cta-section'
import { FAQPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '常見問題 FAQ — 物流 TMS / ERP 系統',
  description: '關於 Dr.Dow AI 物流派車系統 TMS 和財務系統 ERP 的常見問題解答。什麼是 TMS？多少錢？怎麼導入？',
  path: '/faq',
})

const FAQS = [
  {
    category: '基本概念',
    items: [
      {
        question: '什麼是 TMS（運輸管理系統）？跟 Excel 派車有什麼差別？',
        answer: 'TMS（Transport Management System）是專門管理運輸調度的軟體系統。跟 Excel 派車最大的差別是：TMS 能自動規劃路線、即時追蹤車輛位置、自動計算薪酬，而 Excel 需要人工一筆一筆處理。Dr.Dow TMS 更進一步用 AI 做智慧派車，支援拖拉指派和自動填滿，一個調度員就能管理 40+ 台車。',
      },
      {
        question: '物流公司需要 ERP 嗎？什麼規模適合導入？',
        answer: '當你的物流公司有 10 台車以上，開始覺得 Excel 對帳很痛苦、LINE 群組訊息找不到、月底薪資算不完，就是導入 ERP 的好時機。Dr.Dow ERP 專為 10-100 台車的中小物流公司設計，不需要 SAP 那種大系統的成本和複雜度。',
      },
      {
        question: 'Dr.Dow AI 跟 SAP TM 或 Oracle TMS 有什麼差別？',
        answer: 'SAP TM 和 Oracle TMS 是為大型企業設計的，導入成本高（數百萬起）、時間長（半年以上）。Dr.Dow AI 專為台灣中小物流公司打造：中文介面、LINE 整合、台灣銀行對帳、在地計費邏輯，而且導入只需要 1-2 週。',
      },
    ],
  },
  {
    category: '產品功能',
    items: [
      {
        question: 'AI OCR 辨識發票的準確率有多高？',
        answer: 'Dr.Dow ERP 使用 Claude Vision AI 進行兩段式辨識：第一段辨識發票上的文字和數字，第二段交叉比對廠商資料庫和歷史紀錄。目前準確率達 95% 以上。即使辨識有誤，系統也會標記讓人工確認，不會直接過帳。',
      },
      {
        question: '銀行自動對帳怎麼運作？安全嗎？',
        answer: '系統每天早上 6:00 自動登入企業網銀（目前支援彰化銀行、第一銀行、玉山銀行），用 AI 辨識驗證碼後抓取交易明細，再自動比對應收帳款。所有銀行帳密都經過加密儲存，爬蟲在隔離的 Docker 容器中執行。系統只讀取明細，不會執行任何轉帳操作。',
      },
      {
        question: '司機需要裝 App 嗎？',
        answer: '不用。Dr.Dow TMS 的司機端是用 LINE LIFF 技術打造的，直接在 LINE 裡面操作。司機不需要下載任何 App，也不需要學新軟體。打開 LINE 就能看任務、GPS 打卡、拍照回報、棧板交易。',
      },
      {
        question: '六層付款防呆具體是什麼？',
        answer: '六層防呆：(1) 資料庫約束防重複建立 (2) 照片 SHA-256 hash 辨識重複發票 (3) 金額/日期異常軟警告 (4) 老闆手機審核 (5) API 冪等性防重複提交 (6) 老闆娘逐筆確認後才匯款。每一層都是獨立的防護，確保不會重複付款或漏付。',
      },
    ],
  },
  {
    category: '導入與價格',
    items: [
      {
        question: '物流派車系統或 ERP 要多少錢？',
        answer: '價格依公司規模和需求而定。我們提供基本版（10 台車以下）、專業版（10-50 台車，最多客戶選擇）和企業版（50 台車以上 / 客製需求）三種方案。歡迎預約 Demo，我們會根據您的實際需求提供報價。',
      },
      {
        question: '導入需要多久？',
        answer: '基本版 1 週內可以上線，專業版約 2 週，企業版視客製程度而定。我們會協助資料搬遷、員工教育訓練和上線後的技術支援。',
      },
      {
        question: '可以先試用嗎？',
        answer: '可以。我們提供 30 天免費試用，不需要信用卡。試用期間包含完整功能和技術支援。預約 Demo 後，我們會幫您開好試用環境。',
      },
    ],
  },
  {
    category: '技術與整合',
    items: [
      {
        question: '可以跟我現有的 WMS / ERP 串接嗎？',
        answer: '可以。Dr.Dow AI 提供 Webhook 雙向串接和 API 介面。TMS 已經跟 WMS 自動串接（每日匯入訂單），ERP 可以跟現有的會計系統串接。SSO 統一身份認證讓員工不需要多組帳號。',
      },
      {
        question: '資料放在哪裡？安全嗎？',
        answer: '系統部署在 Railway 雲端平台（新加坡機房），使用 PostgreSQL 資料庫，每日自動備份。所有傳輸都走 HTTPS 加密，敏感資料（銀行帳密、個資）額外加密儲存。',
      },
    ],
  },
]

const allFaqs = FAQS.flatMap((cat) => cat.items)

export default function FAQPage() {
  return (
    <>
      <FAQPageJsonLd faqs={allFaqs} />
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: 'FAQ', url: '/faq' }]} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black mb-4">常見問題</h1>
            <p className="text-lg text-muted">
              關於 Dr.Dow AI 物流派車系統和財務系統的所有問題
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {FAQS.map((category, ci) => (
            <FadeIn key={ci} delay={ci * 100} className="mb-12">
              <h2 className="text-xl font-black mb-6 text-accent">{category.category}</h2>
              <div className="space-y-4">
                {category.items.map((faq, fi) => (
                  <details key={fi} className="group bg-surface rounded-xl">
                    <summary className="cursor-pointer p-5 font-semibold text-sm flex items-center justify-between list-none">
                      <span>{faq.question}</span>
                      <svg className="w-5 h-5 text-muted flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
