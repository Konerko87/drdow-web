import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CTASection } from '@/components/sections/cta-section'
import { FAQPageJsonLd, BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '常見問題 FAQ — 廟通宮廟管理 / 物流 TMS / ERP',
  description: '關於 Dr.Dow AI 廟通宮廟管理系統、物流派車系統 TMS 和財務系統 ERP 的常見問題解答。',
  path: '/faq',
  keywords: ['FAQ', '常見問題', '廟通', 'TMS', 'ERP', '物流系統', '宮廟管理'],
})

const FAQS = [
  {
    category: '廟通 宮廟管理系統',
    accent: '#B91C1C',
    items: [
      {
        question: '廟通適合哪些類型的宮廟？',
        answer: '不論是大型宮廟、中小型廟宇或新建宮廟，只要有管理信徒、點燈、捐款、法會、財務等需求，都適合使用。系統可依宮廟規模彈性調整。',
      },
      {
        question: '可以只先導入部分功能嗎？',
        answer: '可以。廟通採模組化設計，你可以先從最急需的功能（如點燈牌位或捐款管理）開始，之後再逐步擴充其他模組，不需要一次買全套。',
      },
      {
        question: '能不能依照我們廟的流程調整？',
        answer: '可以。我們理解每間宮廟的作業流程不同，系統支援流程客製化，確保符合你們的實際需求。',
      },
      {
        question: '信眾一定要下載 App 嗎？',
        answer: '不用。信眾透過 LINE 就能使用線上點燈、法會報名、紀錄查詢等服務，不需要額外下載任何 App。',
      },
      {
        question: '發財金借還也可以管理嗎？',
        answer: '可以。系統支援完整的借金流程，包含擲筊紀錄、借金規則、額度控管、黑名單與還金追蹤。',
      },
      {
        question: '舊資料能不能匯入？',
        answer: '可以。我們協助將現有的 Excel 或紙本資料批次匯入系統，確保歷史資料不遺失。',
      },
      {
        question: '廟通導入需要多久？',
        answer: '入門版最快 1 週可上線，專業版約 2 週。我們會協助資料匯入、人員教育訓練和上線後的技術支援。',
      },
    ],
  },
  {
    category: 'TMS 物流派車系統',
    accent: undefined,
    items: [
      {
        question: '什麼是 TMS（運輸管理系統）？跟 Excel 派車有什麼差別？',
        answer: 'TMS（Transport Management System）是專門管理運輸調度的軟體系統。跟 Excel 派車最大的差別是：TMS 能自動規劃路線、即時追蹤車輛位置、自動計算薪酬，而 Excel 需要人工一筆一筆處理。Dr.Dow TMS 更進一步用 AI 做智慧派車，支援拖拉指派和自動填滿，一個調度員就能管理 40+ 台車。',
      },
      {
        question: '司機需要裝 App 嗎？',
        answer: '不用。Dr.Dow TMS 的司機端是用 LINE LIFF 技術打造的，直接在 LINE 裡面操作。司機不需要下載任何 App，也不需要學新軟體。',
      },
      {
        question: 'Dr.Dow AI 跟 SAP TM 或 Oracle TMS 有什麼差別？',
        answer: 'SAP TM 和 Oracle TMS 是為大型企業設計的，導入成本高（數百萬起）、時間長（半年以上）。Dr.Dow AI 專為台灣中小物流公司打造：中文介面、LINE 整合、台灣銀行對帳、在地計費邏輯，而且導入只需要 1-2 週。',
      },
    ],
  },
  {
    category: 'ERP 財務系統',
    accent: undefined,
    items: [
      {
        question: 'AI OCR 辨識發票的準確率有多高？',
        answer: 'Dr.Dow ERP 使用 Claude Vision AI 進行兩段式辨識，目前準確率達 95% 以上。即使辨識有誤，系統也會標記讓人工確認，不會直接過帳。',
      },
      {
        question: '銀行自動對帳怎麼運作？安全嗎？',
        answer: '系統每天早上自動登入企業網銀，用 AI 辨識驗證碼後抓取交易明細，再自動比對應收帳款。所有銀行帳密都經過加密儲存，系統只讀取明細，不會執行任何轉帳操作。',
      },
      {
        question: '六層付款防呆具體是什麼？',
        answer: '六層防呆：(1) 資料庫約束防重複建立 (2) 照片 SHA-256 hash 辨識重複發票 (3) 金額/日期異常軟警告 (4) 老闆手機審核 (5) API 冪等性防重複提交 (6) 老闆娘逐筆確認後才匯款。',
      },
    ],
  },
  {
    category: '導入與價格',
    accent: undefined,
    items: [
      {
        question: '系統要多少錢？',
        answer: '價格依產品和需求而定。廟通和物流系統都提供多種方案，歡迎預約諮詢，我們會根據您的實際需求提供報價。',
      },
      {
        question: '可以先試用嗎？',
        answer: '可以。我們提供免費試用，不需要信用卡。試用期間包含完整功能和技術支援。預約 Demo 後，我們會幫您開好試用環境。',
      },
      {
        question: '資料放在哪裡？安全嗎？',
        answer: '系統部署在雲端平台，使用 PostgreSQL 資料庫，每日自動備份。所有傳輸都走 HTTPS 加密，敏感資料額外加密儲存。',
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
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: 'FAQ', href: '/faq' }]} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center mt-6">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black mb-4">常見問題</h1>
            <p className="text-lg text-muted">
              關於 Dr.Dow AI 廟通、物流派車系統和財務系統的所有問題
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {FAQS.map((category, ci) => (
            <FadeIn key={ci} delay={ci * 100} className="mb-12">
              <h2 className={`text-xl font-black mb-6`} style={category.accent ? { color: category.accent } : { color: 'var(--color-accent)' }}>
                {category.category}
              </h2>
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
