import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/constants'
import { FadeIn } from '@/components/ui/fade-in'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export const metadata: Metadata = createMetadata({
  title: '關於 Dr.Dow AI — 用 AI 替傳統產業打造會思考的系統',
  description: 'Dr.Dow AI 是一家專注於物流產業的 AI 軟體解決方案公司。我們的使命是用 AI 讓中小企業不再被手動作業綁架。',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }, { name: '關於我們', url: '/about' }]} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-surface to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
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
                Dr.Dow AI 誕生於一個簡單的觀察：台灣中小物流公司每天花大量時間在 Excel 排派車、LINE 群組溝通、月底手動對帳。這些重複性的工作，AI 其實都能做得更好更快。
              </p>
              <p className="text-muted leading-relaxed">
                我們的創辦團隊來自物流產業第一線，深知調度員、司機、老闆各自的痛點。我們不是從矽谷空降的科技公司，而是從物流現場長出來的解決方案。
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
                  title: '中小企業值得好工具',
                  desc: '不需要 SAP 的預算也能有 SAP 等級的管理。我們專為 10-100 台車的公司設計，功能到位、價格合理。',
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
