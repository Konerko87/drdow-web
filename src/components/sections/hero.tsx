import Link from 'next/link'

export function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-sm mb-8 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          AI-Powered Software Solutions
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
          Systems that
          <br />
          <span className="gradient-text">think for you.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          我們用 AI 替傳統產業��造會思考的企業系統。
          <br className="hidden md:block" />
          不是工具，是替你做決策的���伴。
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3.5 bg-accent text-white rounded-full text-base font-semibold hover:bg-accent-light transition-colors shadow-lg shadow-accent/25"
          >
            預約 Demo
          </Link>
          <Link
            href="#products"
            className="px-8 py-3.5 bg-white/10 text-white rounded-full text-base font-semibold hover:bg-white/20 transition-colors border border-white/10"
          >
            看產品 →
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 animate-bounce">
          <svg className="w-6 h-6 mx-auto text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
