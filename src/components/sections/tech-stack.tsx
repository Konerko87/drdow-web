import { FadeIn } from '@/components/ui/fade-in'
import { TECH_STACK } from '@/lib/constants'

export function TechStack() {
  return (
    <section className="py-28 bg-[#FAFBFC]">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Tech Stack</p>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">全棧 AI 原生架構</h2>
          <p className="text-muted text-base mb-16 max-w-lg mx-auto">
            不是套版 SaaS，每一行都是為物流產業量身打造。
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK.map((tech) => (
              <div
                key={tech}
                className="px-5 py-2.5 bg-white rounded-full text-sm font-medium text-dark/60 border border-black/[0.04] hover:border-accent/30 hover:text-accent hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 cursor-default"
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
