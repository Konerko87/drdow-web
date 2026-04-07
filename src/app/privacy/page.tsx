import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/constants'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '隱私權政策',
  description: 'Dr.Dow AI 隱私權政策，說明我們如何收集、使用及保護您的個人資料。',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '隱私權政策', url: '/privacy' }]} />

      <article className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-black mb-2">隱私權政策</h1>
          <p className="text-sm text-muted mb-12">最後更新：2026 年 4 月 7 日</p>

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-dark prose-p:text-muted prose-p:leading-relaxed prose-li:text-muted">

            <p>{SITE.name}（以下簡稱「本公司」）重視您的隱私權。本政策說明我們如何收集、使用、儲存及保護您的個人資料。</p>

            <h2>一、資料收集範圍</h2>
            <p>當您使用本網站（drdowai.com）時，我們可能收集以下資料：</p>
            <ul>
              <li><strong>您主動提供的資料</strong>：透過聯繫表單填寫的公司名稱、姓名、Email、電話及留言內容。</li>
              <li><strong>自動收集的資料</strong>：透過 Google Analytics 收集的匿名瀏覽資料，包括瀏覽頁面、停留時間、裝置類型、地理位置（國家/城市層級）。</li>
              <li><strong>Cookie</strong>：本網站使用 Google Analytics Cookie 進行流量分析。</li>
            </ul>

            <h2>二、資料使用目的</h2>
            <p>我們收集的資料僅用於以下目的：</p>
            <ul>
              <li>回覆您的諮詢或 Demo 預約請求</li>
              <li>改善網站內容與使用體驗</li>
              <li>分析網站流量與行銷成效</li>
            </ul>
            <p>我們<strong>不會</strong>將您的個人資料販售或提供給第三方用於行銷目的。</p>

            <h2>三、資料儲存與保護</h2>
            <ul>
              <li>您的聯繫表單資料透過加密傳輸（HTTPS）發送至本公司信箱。</li>
              <li>本網站託管於 Railway 雲端平台，資料中心位於新加坡。</li>
              <li>我們採取合理的技術與組織措施保護您的個人資料，防止未經授權的存取、修改或洩露。</li>
            </ul>

            <h2>四、第三方服務</h2>
            <p>本網站使用以下第三方服務：</p>
            <ul>
              <li><strong>Google Analytics</strong>：網站流量分析。Google 的隱私權政策請參閱 Google 官方說明。</li>
              <li><strong>Resend</strong>：聯繫表單 Email 發送服務。</li>
              <li><strong>Unsplash</strong>：部落格文章封面圖片。</li>
            </ul>

            <h2>五、您的權利</h2>
            <p>您有權：</p>
            <ul>
              <li>要求查閱我們持有的您的個人資料</li>
              <li>要求更正或刪除您的個人資料</li>
              <li>拒絕或限制我們處理您的個人資料</li>
            </ul>
            <p>如需行使上述權利，請聯繫：<a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>

            <h2>六、政策更新</h2>
            <p>本公司保留隨時修改本隱私權政策的權利。修改後的政策將公布於本頁面，並更新「最後更新」日期。</p>

            <h2>七、聯繫方式</h2>
            <p>如對本隱私權政策有任何疑問，請聯繫：</p>
            <ul>
              <li>Email：<a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>公司：{SITE.company}</li>
            </ul>

          </div>
        </div>
      </article>
    </>
  )
}
