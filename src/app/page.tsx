import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { Hero } from '@/components/sections/hero'
import { PainPoints } from '@/components/sections/pain-points'
import { LinePayFlow } from '@/components/sections/line-pay-flow'
import { FamilyProxy } from '@/components/sections/family-proxy'
import { CounterOps } from '@/components/sections/counter-ops'
import { LightManagement } from '@/components/sections/light-management'
import { ReceiptsDocs } from '@/components/sections/receipts-docs'
import { FortuneMoney } from '@/components/sections/fortune-money'
import { FeatureModules } from '@/components/sections/feature-modules'
import { BeforeAfter } from '@/components/sections/before-after'
import { Numbers } from '@/components/sections/numbers'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Dr.Dow AI 廟通 — 為宮廟量身打造的智慧營運平台',
    description: '整合櫃檯受理、點燈管理、法會活動、捐款收據與 LINE 信徒查詢的宮廟營運系統。支援 LINE Pay 線上點燈付款、家庭代辦、電子收據、發財金借還管理。真正懂宮廟流程，讓櫃檯更快、信徒查得到、行政做得完。',
    path: '/',
    keywords: ['宮廟管理系統', '廟宇管理', '點燈系統', '宮廟軟體', '廟務管理', '光明燈管理', '法會報名系統', '宮廟收據', '發財金系統', '廟宇數位化', 'LINE Pay 點燈', '廟通'],
  }),
  title: 'Dr.Dow AI 廟通 — 為宮廟量身打造的智慧營運平台',
}

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }]} />
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        inLanguage: 'zh-TW',
        potentialAction: {
          '@type': 'ReadAction',
          target: `${SITE.url}/blog`,
        },
      }} />
      <Hero />
      <PainPoints />
      <LinePayFlow />
      <FamilyProxy />
      <CounterOps />
      <LightManagement />
      <ReceiptsDocs />
      <FortuneMoney />
      <FeatureModules />
      <BeforeAfter />
      <Numbers />
      <CTASection />
    </>
  )
}
