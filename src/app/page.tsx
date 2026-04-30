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
    title: '廟通｜宮廟專用智慧廟務系統 — 點燈、法會、收據一套搞定',
    description: '廟通是專為台灣宮廟打造的廟務系統。櫃檯受理、點燈管理、法會報名、捐款收據、LINE 信徒查詢全整合，支援 LINE Pay 線上點燈。不是模板，100% 依廟方流程客製。免費預約展示。',
    path: '/',
    keywords: ['廟務系統', '宮廟管理系統', '智慧廟務系統', '點燈系統', '廟通', '宮廟軟體', '廟務管理', '光明燈管理', '法會報名系統', '宮廟收據', '發財金系統', 'LINE Pay 點燈', '宮廟 ERP'],
  }),
  title: '廟通｜宮廟專用智慧廟務系統 — 點燈、法會、收據一套搞定',
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
      <CTASection />
    </>
  )
}
