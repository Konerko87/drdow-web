import { FadeIn } from '@/components/ui/fade-in'
import { WORKFLOW_STEPS } from '@/lib/constants'

export function AIWorkflow() {
  return (
    <section className="py-24 bg-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-3">AI Workflow</p>
          <h2 className="text-3xl md:text-4xl font-black mb-4">不只是軟體，是 AI 工作流</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            從訂單匯入到銀行對帳，每一步都有 AI 參與。人只需要做最後的確認。
          </p>
        </FadeIn>

        {/* Desktop flow */}
        <div className="hidden md:flex justify-center items-start gap-4">
          {WORKFLOW_STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 100} className="flex items-center">
              <div className="text-center w-36">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg shadow-accent/20">
                  {step.icon}
                </div>
                <h4 className="text-sm font-bold mb-1">{step.title}</h4>
                <p className="text-xs text-white/40">{step.desc}</p>
              </div>
              {i < WORKFLOW_STEPS.length - 1 && (
                <div className="flex-shrink-0 w-12 flex items-center justify-center mt-[-24px]">
                  <svg width="40" height="16" viewBox="0 0 40 16" className="text-accent/50">
                    <path d="M0 8h32M32 8l-6-6M32 8l-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </FadeIn>
          ))}
        </div>

        {/* Mobile flow */}
        <div className="md:hidden space-y-6">
          {WORKFLOW_STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 80}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center text-xl flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold">{step.title}</h4>
                  <p className="text-xs text-white/40">{step.desc}</p>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <svg className="w-4 h-4 text-accent/30 ml-auto rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
                  </svg>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
