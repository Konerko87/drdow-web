import { FadeIn } from '@/components/ui/fade-in'
import { STATS } from '@/lib/constants'

/**
 * Numbers — 廟通關鍵數據
 * 版型由 open-design v0.1.0 web-prototype skill 產出（warm-editorial）。
 * 結構：暖米色漸層背景 + 廟通紅點陣紋理 → 6 張白卡 → 每卡 icon container + Noto Serif TC 巨大漸層數字 + 細小 label。
 * Inline SVG icons 維持 duotone 風格（紅 stroke + 紅軟色 fill），跟現有 DuotoneIcon 視覺一致但獨立。
 */

const ICONS: Record<string, React.ReactNode> = {
  boxes: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="#B91C1C" strokeWidth="1.5" fill="rgba(185,28,28,0.12)" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="#B91C1C" strokeWidth="1.5" fill="rgba(185,28,28,0.12)" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="#B91C1C" strokeWidth="1.5" fill="rgba(185,28,28,0.12)" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="#B91C1C" strokeWidth="1.5" fill="rgba(185,28,28,0.12)" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#B91C1C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#B91C1C" strokeWidth="1.8" strokeLinecap="round" fill="rgba(185,28,28,0.12)" />
    </svg>
  ),
  'map-pin': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#B91C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(185,28,28,0.12)" />
      <circle cx="12" cy="10" r="3" stroke="#B91C1C" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  smartphone: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <rect x="5" y="2" width="14" height="20" rx="2" stroke="#B91C1C" strokeWidth="1.5" fill="rgba(185,28,28,0.12)" />
      <path d="M12 18h.01" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  'check-circle': (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" stroke="#B91C1C" strokeWidth="1.5" fill="rgba(185,28,28,0.12)" />
      <path d="M8 12l3 3 5-6" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" stroke="#B91C1C" strokeWidth="1.5" fill="rgba(185,28,28,0.12)" />
      <path d="M12 6v6l4 2" stroke="#B91C1C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
}

export function Numbers() {
  return (
    <section className="relative py-28 md:py-32 overflow-hidden" style={{ background: 'linear-gradient(180deg, #fef7f2 0%, #fdf3e7 100%)' }} aria-label="關鍵數據">
      {/* 廟通紅點陣紋理 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(185,28,28,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-16 md:mb-20">
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-3xl md:text-5xl font-bold tracking-tight text-dark">
            為台灣宮廟而生
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="group bg-white/92 backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-[#B91C1C]/[0.08] hover:border-[#B91C1C]/[0.16] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(185,28,28,0.08)] transition-all duration-300 flex flex-col items-center gap-3 md:gap-4 h-full">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B91C1C]/[0.12] to-[#d97706]/[0.12] flex items-center justify-center flex-shrink-0">
                  {ICONS[stat.icon]}
                </div>
                <div className="font-[family-name:var(--font-noto-serif-tc)] font-extrabold text-3xl md:text-4xl lg:text-5xl leading-none bg-gradient-to-br from-[#B91C1C] via-[#dc2626] to-[#d97706] bg-clip-text text-transparent text-center">
                  {stat.value}
                </div>
                <div className="text-xs font-medium tracking-[0.04em] text-[#6b5b4a] text-center leading-snug">
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
