'use client'

import { useRef } from 'react'
import { FadeIn } from '@/components/ui/fade-in'
import { WORKFLOW_STEPS } from '@/lib/constants'
import { DuotoneIcon } from '@/components/ui/duotone-icon'
import type { IconName } from '@/components/ui/icon'
import { AnimatedBeam } from '@/components/ui/animated-beam'

export function AIWorkflow() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <section className="py-28 bg-[#030712] text-white overflow-hidden relative" aria-label="AI 工作流程">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">AI Workflow</p>
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-5xl font-black mb-4 tracking-tight">不只是軟體，是 AI 工作流</h2>
          <p className="text-white/30 text-base max-w-lg mx-auto">
            從訂單匯入到銀行對帳，每一步都有 AI 參與。人只需要最後確認。
          </p>
        </FadeIn>

        {/* Desktop: horizontal flow with animated beams */}
        <div className="hidden md:block">
          <div ref={containerRef} className="relative flex justify-between items-start max-w-4xl mx-auto">
            {WORKFLOW_STEPS.map((step, i) => (
              <div key={i} className="relative text-center w-28 z-10">
                <FadeIn delay={i * 80}>
                  <div
                    ref={(el) => { stepRefs.current[i] = el }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
                  >
                    <DuotoneIcon name={step.icon as IconName} size={28} className="text-accent" />
                  </div>
                  <p className="text-xs font-bold tracking-wide mb-1">{step.title}</p>
                  <p className="text-[10px] text-white/30 leading-relaxed">{step.desc}</p>
                </FadeIn>
              </div>
            ))}

            {/* Animated beams between consecutive icons */}
            {WORKFLOW_STEPS.slice(0, -1).map((_, i) => (
              <AnimatedBeam
                key={`beam-${i}`}
                containerRef={containerRef}
                fromRef={{ get current() { return stepRefs.current[i] } } as React.RefObject<HTMLElement | null>}
                toRef={{ get current() { return stepRefs.current[i + 1] } } as React.RefObject<HTMLElement | null>}
                duration={3.5}
                delay={i * 0.4}
                pathColor="rgba(59,130,246,0.15)"
                pathWidth={1.5}
                gradientStartColor="#3B82F6"
                gradientStopColor="#8B5CF6"
              />
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-4">
          {WORKFLOW_STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="flex items-center gap-4 bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <DuotoneIcon name={step.icon as IconName} size={22} className="text-accent" />
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
