import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#030712] min-h-screen flex items-center">
      {/* Animated grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 text-center w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-white/50 text-xs tracking-widest uppercase mb-10 border border-white/10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          AI-Powered Software Solutions
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
          Systems that
          <br />
          <span className="bg-gradient-to-r from-accent via-purple to-accent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] bg-clip-text text-transparent">
            think for you.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-white/40 max-w-lg mx-auto mb-12 leading-relaxed font-light">
          我們用 AI 替傳統產業打造會思考的企業系統。
          <br />
          不是工具，是替你做決策的夥伴。
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="group px-8 py-4 bg-white text-dark rounded-full text-sm font-semibold hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]"
          >
            預約 Demo
            <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="#products"
            className="px-8 py-4 text-white/60 rounded-full text-sm font-medium hover:text-white transition-colors border border-white/10 hover:border-white/20 backdrop-blur-sm"
          >
            看產品
          </Link>
        </div>

        {/* Scroll line */}
        <div className="mt-24 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/20">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
