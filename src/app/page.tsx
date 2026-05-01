import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { Hero } from '@/components/sections/hero'
import { SceneSelector } from '@/components/sections/scene-selector'
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
import { ProductCards } from '@/components/sections/product-cards'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Dr.Dow AI — 為現場營運打造的 AI 管理系統｜廟通 / TMS / WMS / ERP',
    description: '點燈對帳即時化、派車從 Excel 變拖拉指派、倉儲盤點 3 天縮成 3 小時、財務對帳全自動。Dr.Dow AI 為宮廟、物流、倉儲、財務團隊打造可上線的 AI 管理系統。免費預約展示。',
    path: '/',
    keywords: ['Dr.Dow AI', '廟通', '宮廟管理系統', 'TMS', '運輸管理系統', '物流派車系統', 'WMS', '倉儲管理系統', '庫存管理系統', 'ERP', '財務系統', 'AI 管理系統', 'AI OCR 請款', '銀行自動對帳', '台灣 SaaS', '中小物流系統'],
  }),
  title: 'Dr.Dow AI — 為現場營運打造的 AI 管理系統｜廟通 / TMS / WMS / ERP',
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
      <SceneSelector />
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
      <ProductCards />
      <CTASection variant="generic" />
    </>
  )
}
