/**
 * Illustration404 — 廟通 404 插畫
 * 由 open-design v0.1.0 web-prototype skill 產出（warm-editorial design system）。
 * 主題：紅燈籠（天燈）漂走，下方廟簷剪影 + 散落金粉 + 虛線軌跡 + ghost 404 文字。
 * 配色：廟通紅 #B91C1C / 深紅 #7c1313 / 廟通金 #d97706 / 暖金 #fbbf24。
 */
export function Illustration404({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      role="img"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="lanternGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B91C1C" stopOpacity="1" />
          <stop offset="100%" stopColor="#7c1313" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#d97706" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ghost 404 text */}
      <text x="90" y="140" fontFamily="serif" fontSize="72" fontWeight="700" fill="#B91C1C" opacity="0.07">404</text>

      {/* 廟簷剪影 */}
      <path d="M 40 170 L 60 158 L 100 162 L 140 158 L 180 162 L 200 156" stroke="#7c1313" strokeWidth="1.6" fill="none" opacity="0.3" strokeLinecap="round" />

      {/* 散落金粉（12 顆） */}
      <circle cx="30" cy="80" r="1.2" fill="#d97706" opacity="0.7" />
      <circle cx="55" cy="95" r="1.5" fill="#fbbf24" opacity="0.6" />
      <circle cx="80" cy="70" r="1" fill="#d97706" opacity="0.8" />
      <circle cx="110" cy="110" r="1.3" fill="#fbbf24" opacity="0.5" />
      <circle cx="145" cy="85" r="1.1" fill="#d97706" opacity="0.7" />
      <circle cx="170" cy="125" r="1.4" fill="#fbbf24" opacity="0.6" />
      <circle cx="200" cy="100" r="1" fill="#d97706" opacity="0.9" />
      <circle cx="225" cy="115" r="1.2" fill="#fbbf24" opacity="0.5" />
      <circle cx="250" cy="75" r="1.3" fill="#d97706" opacity="0.6" />
      <circle cx="275" cy="90" r="1.5" fill="#fbbf24" opacity="0.7" />
      <circle cx="290" cy="60" r="1.1" fill="#d97706" opacity="0.8" />
      <circle cx="305" cy="45" r="1" fill="#fbbf24" opacity="0.6" />

      {/* 虛線軌跡 */}
      <path d="M 50 160 Q 120 120, 240 50" stroke="#d97706" strokeWidth="1.4" fill="none" strokeDasharray="2,4" opacity="0.4" strokeLinecap="round" />

      {/* 燈籠暖光暈 */}
      <ellipse cx="245" cy="48" rx="32" ry="28" fill="url(#glowGrad)" />

      {/* 燈籠主體 */}
      <ellipse cx="245" cy="48" rx="18" ry="16" fill="url(#lanternGrad)" stroke="#7c1313" strokeWidth="1.6" />

      {/* 燈籠頂蓋 */}
      <path d="M 227 36 Q 245 32, 263 36" stroke="#7c1313" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* 燈籠流蘇 */}
      <line x1="238" y1="64" x2="236" y2="70" stroke="#7c1313" strokeWidth="1.2" opacity="0.7" />
      <line x1="245" y1="64" x2="245" y2="72" stroke="#7c1313" strokeWidth="1.2" opacity="0.7" />
      <line x1="252" y1="64" x2="254" y2="70" stroke="#7c1313" strokeWidth="1.2" opacity="0.7" />

      {/* 燈籠內部高光 */}
      <ellipse cx="245" cy="46" rx="8" ry="7" fill="#fbbf24" opacity="0.5" />
    </svg>
  )
}
