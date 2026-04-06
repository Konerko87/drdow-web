import { FadeIn } from '@/components/ui/fade-in'

type Feature = {
  icon: string
  title: string
  desc: string
}

export function FeatureGrid({
  features,
  columns = 3,
}: {
  features: readonly Feature[]
  columns?: 2 | 3
}) {
  const gridCols = columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'

  return (
    <div className={`grid grid-cols-1 ${gridCols} gap-6`}>
      {features.map((feature, i) => (
        <FadeIn key={i} delay={i * 60}>
          <div className="bg-surface rounded-2xl p-6 hover-lift h-full">
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h3 className="text-base font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
