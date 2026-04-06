import { FadeIn } from '@/components/ui/fade-in'
import { TECH_STACK } from '@/lib/constants'

export function TechStack() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">Tech Stack</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">全棧 AI 原生架構</h2>
          <p className="text-muted text-lg mb-12 max-w-2xl mx-auto">
            不是套版 SaaS，每一行都是為物流產業量身打造的程式碼��
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex flex-wrap justify-center gap-4">
            {TECH_STACK.map((tech) => (
              <div
                key={tech}
                className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-muted border border-black/5 hover:border-accent/30 hover:text-accent transition-colors"
              >
                {tech}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
