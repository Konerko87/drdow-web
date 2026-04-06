import Link from 'next/link'
import { FadeIn } from '@/components/ui/fade-in'

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-accent to-purple text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            準備好讓 AI 替你工作了嗎？
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            30 分鐘 Demo，看看 Dr.Dow AI 如何讓你的物流管理從手動變全自動���
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-white text-accent rounded-full text-base font-bold hover:bg-white/90 transition-colors shadow-lg"
            >
              預約 Demo →
            </Link>
            <Link
              href="mailto:kevin@st-logistics.com.tw"
              className="px-8 py-3.5 bg-white/10 text-white rounded-full text-base font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              直接聯繫
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
