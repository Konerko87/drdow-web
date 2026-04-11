import type { Metadata } from 'next'
import { createMetadata } from '@/lib/metadata'
import { Hero } from '@/components/sections/hero'
import { PainPoints } from '@/components/sections/pain-points'
import { ProductCards } from '@/components/sections/product-cards'
import { AIWorkflow } from '@/components/sections/ai-workflow'
import { Numbers } from '@/components/sections/numbers'
import { TechStack } from '@/components/sections/tech-stack'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd, JsonLd } from '@/components/seo/json-ld'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  ...createMetadata({
    title: '廟通 — 智慧宮廟管理系統 | Dr.Dow AI',
    description: '專為台灣宮廟打造的一站式管理平台。信徒管理、點燈牌位、捐款收據、法會報名、發財金借還、會計報表、LINE 行動服務，一套系統全搞定。',
    path: '/',
    keywords: ['廟通', '宮廟管理系統', '廟務系統', '點燈系統', '捐款管理', '法會報名', '宮廟數位轉型', 'Dr.Dow AI'],
  }),
  title: '廟通 — 智慧宮廟管理系統 | Dr.Dow AI',
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
      <ProductCards />
      <AIWorkflow />
      <Numbers />
      <TechStack />
      <CTASection />
    </>
  )
}
