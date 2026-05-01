/**
 * WarmCreamBg — 暖米色 hero/section 背景
 * 抽自 v1.15.0 Numbers section（open-design warm-editorial 交付）。
 * 結構：暖米色漸層底（#fef7f2 → #fdf3e7）+ 廟通紅點陣紋理 overlay。
 * 用法：放在 section 內絕對定位最底層，再放正常內容。
 */
export function WarmCreamBg({ className }: { className?: string }) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none ${className ?? ''}`}
        style={{ background: 'linear-gradient(180deg, #fef7f2 0%, #fdf3e7 100%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(185,28,28,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </>
  )
}
