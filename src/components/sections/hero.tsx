import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: '#1E293B' }} aria-label="首頁主視覺">
      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#B91C1C]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#D97706]/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-[#B91C1C]/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div className="text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-white/50 text-xs tracking-widest uppercase mb-10 border border-white/10 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
              智慧宮廟管理系統
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
              宮廟管理，
              <br />
              <span className="gradient-text-temple">
                智慧升級。
              </span>
            </h1>

            {/* Sub */}
            <p className="text-base md:text-lg text-white/50 max-w-lg mb-6 leading-relaxed">
              信徒資料散落各處？點燈牌位每年重 key？收據手開對不起來？
            </p>
            <p className="text-sm md:text-base text-white/30 max-w-lg mb-12 leading-relaxed">
              Dr.Dow AI 廟通——專為台灣宮廟打造的一站式管理平台。
              <br className="hidden md:block" />
              點燈、捐款、法會、發財金、會計報表，全部整合在一套系統裡。
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/contact"
                className="group px-8 py-4 text-white rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-[0_0_30px_rgba(185,28,28,0.3)] hover:shadow-[0_0_50px_rgba(185,28,28,0.4)]"
                style={{ background: '#B91C1C' }}
              >
                預約產品展示
                <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/products/miaotong"
                className="px-8 py-4 text-white/60 rounded-full text-sm font-medium hover:text-white transition-colors border border-white/10 hover:border-white/20 backdrop-blur-sm"
              >
                了解廟通功能
              </Link>
            </div>
          </div>

          {/* Right: logo */}
          <div className="flex items-center justify-center">
            <Image
              src="/logo-miaotong.png"
              alt="Dr.Dow AI 廟通 智慧宮廟管理系統"
              width={400}
              height={400}
              className="w-full max-w-[320px] md:max-w-[400px] drop-shadow-[0_0_60px_rgba(185,28,28,0.2)]"
              priority
            />
          </div>
        </div>

        {/* Scroll line */}
        <div className="mt-16 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
