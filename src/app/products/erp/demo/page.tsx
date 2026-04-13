import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createMetadata } from '@/lib/metadata'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: 'ERP 系統功能導覽 — Dr.Dow ERP 完整畫面展示',
  description: '完整展示 Dr.Dow ERP 財務系統的所有功能畫面：廠商管理、請款單、付款審核、銀行對帳、應收帳款、老闆 App、廠商入口等模組。',
  path: '/products/erp/demo',
  keywords: ['ERP 功能導覽', 'ERP 系統展示', '財務系統畫面', 'Dr.Dow ERP Demo'],
})

const SECTIONS = [
  {
    title: '登入與工作台',
    desc: 'LINE 帳號一鍵登入，工作台即時掌握應付總額、油料總覽、車輛油耗排行。',
    images: [
      { src: '/screenshots/training/01-login-page.png', title: 'LINE 登入', desc: '以 LINE 帳號快速登入系統' },
      { src: '/screenshots/training/02-after-login.png', title: '登入成功', desc: '登入後自動跳轉至工作台' },
      { src: '/screenshots/training/02-ap-home.png', title: 'AP 工作台', desc: '應付總額、油料總覽、車輛油耗排行一頁看完' },
      { src: '/screenshots/training/03-sidebar-full.png', title: '側邊選單', desc: '所有功能模組一目了然' },
    ],
  },
  {
    title: '廠商管理',
    desc: '完整的廠商資料管理：新增、查看、編輯，含銀行帳戶與付款週期設定。',
    images: [
      { src: '/screenshots/training/04-vendor-list.png', title: '廠商列表', desc: '快速搜尋與篩選所有廠商' },
      { src: '/screenshots/training/05-vendor-create.png', title: '新增廠商', desc: '填入廠商基本資料、稅號、銀行帳戶' },
      { src: '/screenshots/training/06-vendor-detail.png', title: '廠商詳情', desc: '查看廠商完整資料與請款紀錄' },
      { src: '/screenshots/training/07-vendor-edit.png', title: '編輯廠商', desc: '修改廠商資料與付款條件' },
    ],
  },
  {
    title: '請款單管理',
    desc: 'AI OCR 自動辨識發票，從建立到送審一氣呵成。',
    images: [
      { src: '/screenshots/training/08-invoice-list.png', title: '請款單列表', desc: '依狀態篩選、搜尋所有請款單' },
      { src: '/screenshots/training/09-invoice-new-top.png', title: '新增請款單（上）', desc: '選擇廠商、填寫請款資訊' },
      { src: '/screenshots/training/09-invoice-new-bottom.png', title: '新增請款單（下）', desc: '明細行項目、上傳發票照片' },
    ],
  },
  {
    title: '付款管理',
    desc: '待匯款清單搭配六層防呆，逐筆確認後才匯款。',
    images: [
      { src: '/screenshots/training/10-pending-payments.png', title: '待匯款清單', desc: '展開照片、備註，逐筆確認匯款' },
      { src: '/screenshots/training/11-payment-list.png', title: '付款紀錄', desc: '所有已完成的付款紀錄與明細' },
    ],
  },
  {
    title: '費用管理',
    desc: '油料、停車、過路費等營運費用，分類記錄與追蹤。',
    images: [
      { src: '/screenshots/training/12-expense-list.png', title: '費用列表', desc: '依類別篩選所有費用紀錄' },
      { src: '/screenshots/training/13-expense-new.png', title: '新增費用', desc: '選擇成本類別、車輛、司機' },
    ],
  },
  {
    title: '車輛管理',
    desc: '車輛維修工單與車隊總覽，TMS 系統自動同步。',
    images: [
      { src: '/screenshots/training/14-vehicle-repair.png', title: '維修工單', desc: '維修項目、零件、工資明細' },
      { src: '/screenshots/training/15-vehicle-list.png', title: '車輛列表', desc: 'TMS 同步的車隊總覽' },
    ],
  },
  {
    title: '薪資管理',
    desc: 'TMS 司機自動同步，勞健保勞退一目了然。',
    images: [
      { src: '/screenshots/training/16-salary.png', title: '薪資總覽', desc: '司機薪資排行、部門彙總' },
      { src: '/screenshots/training/17-unpaid.png', title: '未付清帳款', desc: '追蹤所有未結清的應付款項' },
    ],
  },
  {
    title: '對帳作業',
    desc: '銀行爬蟲自動抓明細，AI 比對應收帳款，一鍵勾稽。',
    images: [
      { src: '/screenshots/training/18-reconciliation.png', title: '應付對帳', desc: '月度應付帳款對帳總覽' },
      { src: '/screenshots/training/19-bank-reconciliation.png', title: '銀行勾稽', desc: '銀行交易自動比對應收帳款' },
    ],
  },
  {
    title: '報表分析',
    desc: '月度損益、帳齡分析、預算控管，數據驅動決策。',
    images: [
      { src: '/screenshots/training/20-reports.png', title: '月度報表', desc: '收支彙總、成本分析、趨勢圖表' },
    ],
  },
  {
    title: '應收帳款 (AR)',
    desc: '客戶管理、應收單建立、營收匯入、付款條件、對帳一站搞定。',
    images: [
      { src: '/screenshots/training/21-ar-customer-list.png', title: '客戶列表', desc: '所有客戶與應收餘額總覽' },
      { src: '/screenshots/training/22-ar-customer-new.png', title: '新增客戶', desc: '建立客戶基本資料與付款條件' },
      { src: '/screenshots/training/23-ar-receivable-list.png', title: '應收單列表', desc: '依狀態追蹤所有應收帳款' },
      { src: '/screenshots/training/24-ar-receivable-new.png', title: '新增應收單', desc: '建立應收單，關聯客戶與明細' },
      { src: '/screenshots/training/25-ar-upload.png', title: '匯入營收', desc: '批次上傳營收資料' },
      { src: '/screenshots/training/26-ar-payment-terms.png', title: '撥款設定', desc: '客戶付款條件與帳期管理' },
      { src: '/screenshots/training/27-ar-reconciliation.png', title: '應收對帳', desc: 'AR 帳款比對與沖帳作業' },
    ],
  },
  {
    title: '老闆行動 App',
    desc: '手機專屬介面，收款進度、審核、薪資、車隊一頁掌握。',
    images: [
      { src: '/screenshots/training/28-boss-home.png', title: '老闆首頁', desc: '應收未收、應付未付、淨額一目了然' },
      { src: '/screenshots/training/29-boss-approvals.png', title: '待審核', desc: '滑一下看照片和明細，一鍵核准' },
      { src: '/screenshots/training/30-boss-overview.png', title: '營運概覽', desc: '本月收款、付款、薪資成本總覽' },
      { src: '/screenshots/training/31-boss-history.png', title: '操作歷史', desc: '所有審核與操作紀錄' },
      { src: '/screenshots/training/32-boss-ar.png', title: '應收帳款', desc: '客戶收款進度追蹤' },
      { src: '/screenshots/training/33-boss-bank.png', title: '銀行概覽', desc: '各銀行帳戶餘額與交易' },
      { src: '/screenshots/training/34-boss-salary.png', title: '薪資成本', desc: '司機薪資排行與部門分析' },
      { src: '/screenshots/training/35-boss-vehicles.png', title: '車隊管理', desc: '車輛狀態、維修、油耗總覽' },
    ],
  },
  {
    title: '廠商自助入口',
    desc: '廠商用 LINE 登入，自行送請款、追進度、查撥款。',
    images: [
      { src: '/screenshots/training/36-vendor-portal-login.png', title: '廠商登入', desc: 'LINE 帳號登入廠商入口' },
    ],
  },
  {
    title: '系統設定',
    desc: '使用者管理、角色權限、系統參數，彈性配置。',
    images: [
      { src: '/screenshots/training/37-settings.png', title: '系統設定', desc: '使用者、權限、系統參數管理' },
    ],
  },
] as const

export default function ERPDemoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: '首頁', url: '/' },
          { name: '產品', url: '/#products' },
          { name: 'ERP 財務系統', url: '/products/erp' },
          { name: '功能導覽', url: '/products/erp/demo' },
        ]}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb
            items={[
              { name: '首頁', href: '/' },
              { name: 'ERP 財務系統', href: '/products/erp' },
              { name: '功能導覽', href: '/products/erp/demo' },
            ]}
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center mt-6">
          <FadeIn>
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">
              System Demo
            </p>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              ERP 系統
              <br />
              <span className="gradient-text">完整功能導覽</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              從登入到報表，13 大模組、37 張實際操作畫面，帶你看完整套系統。
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-accent text-white rounded-full font-semibold hover:bg-accent-light transition-colors"
              >
                預約 Demo
              </Link>
              <Link
                href="/products/erp"
                className="px-8 py-3.5 bg-black/5 rounded-full font-semibold hover:bg-black/10 transition-colors"
              >
                回產品頁 →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TOC */}
      <section className="py-12 border-y border-black/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {SECTIONS.map((section, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className="px-4 py-2 bg-surface rounded-full text-sm font-medium hover:bg-accent hover:text-white transition-colors"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      {SECTIONS.map((section, sectionIdx) => (
        <section
          key={sectionIdx}
          id={`section-${sectionIdx}`}
          className={`py-24 ${sectionIdx % 2 === 1 ? 'bg-surface' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <FadeIn className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                {String(sectionIdx + 1).padStart(2, '0')}
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                {section.title}
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                {section.desc}
              </p>
            </FadeIn>

            <div
              className={`grid gap-8 ${
                section.images.length === 1
                  ? 'grid-cols-1 max-w-4xl mx-auto'
                  : section.images.length === 3
                    ? 'grid-cols-1 md:grid-cols-3'
                    : 'grid-cols-1 md:grid-cols-2'
              }`}
            >
              {section.images.map((img, imgIdx) => (
                <FadeIn key={imgIdx} delay={imgIdx * 80}>
                  <figure className="bg-white rounded-2xl overflow-hidden border border-black/5 hover-lift">
                    <div className="relative aspect-video">
                      <Image
                        src={img.src}
                        alt={`${img.title} — ${img.desc}`}
                        fill
                        className="object-cover object-top"
                        sizes={
                          section.images.length === 1
                            ? '(max-width: 768px) 100vw, 896px'
                            : '(max-width: 768px) 100vw, 50vw'
                        }
                        quality={80}
                      />
                    </div>
                    <figcaption className="p-5">
                      <p className="font-bold text-sm mb-1">{img.title}</p>
                      <p className="text-xs text-muted">{img.desc}</p>
                    </figcaption>
                  </figure>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 bg-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              想親自操作看看？
            </h2>
            <p className="text-white/50 text-lg mb-8">
              預約 30 分鐘線上 Demo，讓我們為你展示完整系統。
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-accent text-white rounded-full font-semibold hover:bg-accent-light transition-colors"
              >
                預約 Demo
              </Link>
              <Link
                href="/products/erp"
                className="px-8 py-3.5 bg-white/10 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                回產品頁 →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
