import { Hero } from '@/components/sections/hero'
import { PainPoints } from '@/components/sections/pain-points'
import { ProductCards } from '@/components/sections/product-cards'
import { AIWorkflow } from '@/components/sections/ai-workflow'
import { Numbers } from '@/components/sections/numbers'
import { TechStack } from '@/components/sections/tech-stack'
import { CTASection } from '@/components/sections/cta-section'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export default function HomePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: '首頁', url: '/' }]} />
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
