import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg, #6b21a8, #dc2626)' }} aria-label="首頁主視覺">
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="text-center lg:text-left">
            {/* LINE Pay badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8 border border-white/20" style={{ background: 'rgba(217,119,6,0.3)', color: '#fbbf24' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-pulse" />
              支援 LINE Pay 線上點燈付款
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-6 tracking-tight">
              真正懂宮廟流程的
              <br />
              <span className="text-[#fbbf24]">智慧營運平台</span>
            </h1>

            {/* Sub */}
            <p className="text-lg md:text-xl text-white/70 max-w-xl mb-8 leading-relaxed">
              把櫃檯、點燈、法會、收據、LINE 查詢整合成一套系統
            </p>

            {/* Three promise badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              {['櫃檯快', '信徒查得到', '行政做得完'].map((badge) => (
                <span key={badge} className="px-4 py-2 rounded-full text-sm font-bold" style={{ background: 'rgba(217,119,6,0.25)', color: '#fbbf24', border: '1px solid rgba(217,119,6,0.4)' }}>
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/contact"
                className="group px-8 py-4 rounded-full text-base font-bold transition-all hover:opacity-90 shadow-lg text-center"
                style={{ background: 'linear-gradient(135deg, #d97706, #dc2626)', color: '#fff', boxShadow: '0 4px 20px rgba(220,38,38,0.35)' }}
              >
                預約免費展示
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 rounded-full text-base font-medium text-white/70 border border-white/30 hover:bg-white/10 hover:text-white transition-all text-center backdrop-blur-sm"
              >
                觀看產品介紹
              </Link>
            </div>
          </div>

          {/* Right: dual mockup */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Desktop mockup */}
            <div className="relative w-full max-w-[480px]">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10 transform rotate-1">
                <Image
                  src="/screenshots/dashboard.png"
                  alt="Dr.Dow AI 廟通營運儀表板"
                  width={800}
                  height={500}
                  className="w-full"
                  priority
                />
              </div>
              {/* Phone mockup overlapping */}
              <div className="absolute -bottom-8 -left-8 w-[140px] md:w-[160px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 transform -rotate-3">
                <Image
                  src="/screenshots/liff-light-order-1.png"
                  alt="LINE 線上點燈介面"
                  width={360}
                  height={640}
                  className="w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  )
}
