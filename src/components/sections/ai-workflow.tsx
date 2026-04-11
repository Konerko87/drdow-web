import { FadeIn } from '@/components/ui/fade-in'
import { WORKFLOW_STEPS } from '@/lib/constants'

export function AIWorkflow() {
  return (
    <section className="py-28 bg-[#030712] text-white overflow-hidden" aria-label="AI 工作流程">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">AI Workflow</p>
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">不只是軟體，是 AI 工作流</h2>
          <p className="text-white/30 text-base max-w-lg mx-auto">
            從訂單匯入到銀行對帳，每一步都有 AI 參與。人只需要最後確認。
          </p>
        </FadeIn>

        {/* Desktop: horizontal flow */}
        <div className="hidden md:block">
          <div className="flex justify-between items-start max-w-4xl mx-auto relative">
            {/* Connector line */}
            <div className="absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0" />

            {WORKFLOW_STEPS.map((step, i) => (
              <FadeIn key={i} delay={i * 80} className="relative text-center w-28">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-2xl mx-auto mb-4 backdrop-blur-sm">
                  {step.icon}
                </div>
                <p className="text-xs font-bold tracking-wide mb-1">{step.title}</p>
                <p className="text-[10px] text-white/30 leading-relaxed">{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-4">
          {WORKFLOW_STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <p className="text-sm font-bold">{step.title}</p>
                  <p className="text-xs text-white/30">{step.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
