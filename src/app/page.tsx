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
    title: 'Dr.Dow AI｜宮廟、物流、倉儲與財務 AI 管理系統',
    description: 'Dr.Dow AI 提供廟通宮廟管理系統、TMS 物流派車系統、WMS 倉儲管理系統與 ERP 財務系統，協助現場流程從紙本、Excel 和 LINE 群組升級成可追蹤、可自動化的營運平台。',
    path: '/',
    keywords: ['Dr.Dow AI', '廟務系統', 'TMS', 'WMS', 'ERP', '物流系統', '倉儲系統', '宮廟管理系統', 'AI管理系統', '廟通', '智慧廟務系統', '物流派車系統', 'AI OCR 請款'],
  }),
  title: 'Dr.Dow AI｜宮廟、物流、倉儲與財務 AI 管理系統',
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
