import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/constants'
import { FadeIn } from '@/components/ui/fade-in'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '關於 Dr.Dow AI — 用 AI 替傳統產業打造智慧系統',
  description: 'Dr.Dow AI 是一家專注於宮廟管理與物流產業的 AI 軟體解決方案公司。旗下產品包含廟通宮廟管理系統、TMS 派車系統、ERP 財務系統。',
  path: '/about',
  keywords: ['關於', 'Dr.Dow AI', 'AI公司', '宮廟管理', '物流系統', '台灣'],
})

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '關於我們', url: '/about' }]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: '關於 Dr.Dow AI',
        description: 'Dr.Dow AI 是一家專注於宮廟管理與物流產業的 AI 軟體解決方案公司。',
        url: `${SITE.url}/about`,
        mainEntity: {
          '@type': 'Organization',
          name: SITE.name,
          description: SITE.description,
          url: SITE.url,
          foundingDate: '2026',
          knowsAbout: ['宮廟管理系統', '物流管理系統', 'AI 自動化', '數位轉型'],
        },
      }} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumb items={[{ name: '首頁', href: '/' }, { name: '關於我們', href: '/about' }]} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center mt-6">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              用 AI 替傳統產業
              <br />
              <span className="gradient-text">打造會思考的系統</span>
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Dr.Dow AI 的使命很簡單：讓中小企業不再被手動作業綁架。
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <FadeIn>
            <article className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-black mb-4">我們的故事</h2>
              <p className="text-muted leading-relaxed">
                Dr.Dow AI 誕生於一個簡單的觀察：台灣許多傳統產業每天花大量時間在紙本作業、Excel 管理、重複性人工流程上。不管是宮廟的點燈捐款管理，還是物流公司的派車對帳，這些工作 AI 其實都能做得更好更快。
              </p>
              <p className="text-muted leading-relaxed">
                我們的團隊深入了解每個產業的第一線需求——從宮廟管委會的財務透明化，到物流調度員的每日派車。我們不是從矽谷空降的科技公司，而是從產業現場長出來的解決方案。
              </p>
            </article>
          </FadeIn>

          <FadeIn>
            <h2 className="text-2xl font-black mb-8">我們相信</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'AI 應該替人做事',
                  desc: '不是給人更多報表看，而是直接把事情做完。AI 規劃路線、AI 辨識發票、AI 對帳——人只需要確認。',
                },
                {
                  title: '軟體要配合人',
                  desc: '司機用 LINE、老闆用手機、老闆娘用電腦。每個角色用最習慣的方式操作，不需要學新軟體。',
                },
                {
                  title: '傳統產業值得好工具',
                  desc: '不需要大企業的預算也能有專業級管理。從宮廟到物流，我們專為台灣傳統產業設計功能到位、價格合理的系統。',
                },
              ].map((belief, i) => (
                <div key={i} className="bg-surface rounded-2xl p-6">
                  <h3 className="font-bold mb-2">{belief.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{belief.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn>
            <h2 className="text-2xl font-black mb-4">聯繫我們</h2>
            <div className="bg-surface rounded-2xl p-8">
              <div className="space-y-3 text-sm">
                <p><span className="font-semibold">Email：</span><a href={`mailto:${SITE.email}`} className="text-accent">{SITE.email}</a></p>
                <p><span className="font-semibold">公司：</span>{SITE.company}</p>
                <p><span className="font-semibold">地點：</span>台灣</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
    </>
  )
}
