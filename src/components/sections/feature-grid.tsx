import { FadeIn } from '@/components/ui/fade-in'
import { Icon, type IconName } from '@/components/ui/icon'

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
          <div className="bg-surface rounded-2xl p-6 hover-lift h-full" role="article">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-purple/10 flex items-center justify-center mb-4" aria-hidden="true">
              <Icon name={feature.icon as IconName} className="w-6 h-6 text-accent" strokeWidth={1.75} />
            </div>
            <h3 className="text-base font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  )
}
