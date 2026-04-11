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
    title: 'Dr.Dow AI — 別再請人了，讓 AI 上班',
    description: '行政又貴又難請？Dr.Dow AI 用頂尖 AI 取代重複性工作流——廟通宮廟管理、物流派車 TMS、財務對帳 ERP，全自動搞定。',
    path: '/',
    keywords: ['AI', '宮廟管理系統', '物流派車', 'TMS', 'ERP', '廟通', '數位轉型', 'Dr.Dow AI'],
  }),
  title: 'Dr.Dow AI — 別再請人了，讓 AI 上班',
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
