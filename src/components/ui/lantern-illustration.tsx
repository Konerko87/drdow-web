/**
 * LanternIllustration — 廟通紅燈籠 + 祥雲 + 金粉裝飾插畫
 * 由 open-design v0.1.0 web-prototype skill warm-editorial 產出。
 * 結構：金色光暈 radialGradient + 4 朵雲 + 紅燈籠（漸層 body + 5 條 ribs + 頂底 cap + 福字 + 流蘇）+ 散落金粉 + 虛線軌跡。
 * 用法：放在 advantages section sticky 右欄，aria-hidden=true。
 */
export function LanternIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 460"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <radialGradient id="lantern-halo" cx="50%" cy="46%" r="48%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.55" />
          <stop offset="40%" stopColor="#d97706" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lantern-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B91C1C" />
          <stop offset="55%" stopColor="#9a1818" />
          <stop offset="100%" stopColor="#7c1313" />
        </linearGradient>
        <linearGradient id="lantern-shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lantern-cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="lantern-tassel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#B91C1C" />
        </linearGradient>
        <radialGradient id="lantern-cloudG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="230" cy="215" r="200" fill="url(#lantern-halo)" />

      <g opacity="0.85">
        <ellipse cx="92" cy="120" rx="58" ry="22" fill="url(#lantern-cloudG)" />
        <ellipse cx="370" cy="150" rx="64" ry="24" fill="url(#lantern-cloudG)" />
        <ellipse cx="358" cy="320" rx="74" ry="26" fill="url(#lantern-cloudG)" />
        <ellipse cx="100" cy="340" rx="56" ry="20" fill="url(#lantern-cloudG)" />
      </g>

      <g fill="none" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
        <path d="M340 92c10-10 26-10 36 0c8 8 22 6 30-2" />
        <path d="M348 110c8-6 20-6 28 0" />
      </g>
      <g fill="none" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" opacity="0.5">
        <path d="M84 96c8-8 22-8 30 0c6 6 18 4 26-2" />
      </g>

      <g fill="#d97706">
        <circle cx="60" cy="240" r="1.8" opacity="0.55" />
        <circle cx="74" cy="262" r="1.8" opacity="0.6" />
        <circle cx="92" cy="282" r="1.8" opacity="0.65" />
        <circle cx="116" cy="298" r="1.8" opacity="0.7" />
        <circle cx="146" cy="306" r="1.8" opacity="0.75" />
        <circle cx="180" cy="306" r="1.8" opacity="0.8" />
      </g>
      <g fill="#fbbf24">
        <circle cx="298" cy="124" r="2" />
        <circle cx="324" cy="146" r="1.6" />
        <circle cx="146" cy="142" r="1.8" />
        <circle cx="118" cy="168" r="1.4" />
        <circle cx="380" cy="252" r="2" />
        <circle cx="404" cy="278" r="1.5" />
        <circle cx="58" cy="190" r="1.6" />
      </g>

      <line x1="230" y1="48" x2="230" y2="92" stroke="#7c1313" strokeWidth="1.6" strokeLinecap="round" />

      <rect x="200" y="92" width="60" height="14" rx="3" fill="url(#lantern-cap)" />
      <rect x="194" y="104" width="72" height="6" rx="2" fill="#7c1313" />

      <ellipse cx="230" cy="218" rx="118" ry="108" fill="url(#lantern-body)" />
      <g stroke="#7c1313" strokeWidth="1.2" opacity="0.45" fill="none">
        <path d="M165 138 Q160 218 165 298" />
        <path d="M198 122 Q196 218 198 314" />
        <path d="M230 116 V 320" />
        <path d="M262 122 Q264 218 262 314" />
        <path d="M295 138 Q300 218 295 298" />
      </g>
      <ellipse cx="230" cy="156" rx="98" ry="10" fill="none" stroke="#7c1313" strokeWidth="1.4" opacity="0.55" />
      <ellipse cx="230" cy="280" rx="98" ry="10" fill="none" stroke="#7c1313" strokeWidth="1.4" opacity="0.55" />

      <ellipse cx="200" cy="186" rx="60" ry="80" fill="url(#lantern-shine)" opacity="0.7" />

      <rect x="138" y="208" width="184" height="22" fill="url(#lantern-cap)" opacity="0.95" />
      <rect x="138" y="208" width="184" height="22" fill="none" stroke="#7c1313" strokeWidth="1" opacity="0.4" />

      <text x="230" y="226" textAnchor="middle" fontFamily="'Noto Serif TC', serif" fontWeight="900" fontSize="22" fill="#7c1313">福</text>

      <rect x="194" y="326" width="72" height="6" rx="2" fill="#7c1313" />
      <rect x="200" y="332" width="60" height="14" rx="3" fill="url(#lantern-cap)" />

      <line x1="230" y1="346" x2="230" y2="366" stroke="#7c1313" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="230" cy="372" r="6" fill="url(#lantern-tassel)" />
      <g stroke="url(#lantern-tassel)" strokeWidth="1.6" strokeLinecap="round">
        <line x1="222" y1="378" x2="219" y2="402" />
        <line x1="226" y1="380" x2="225" y2="406" />
        <line x1="230" y1="380" x2="230" y2="408" />
        <line x1="234" y1="380" x2="235" y2="406" />
        <line x1="238" y1="378" x2="241" y2="402" />
      </g>

      <g fill="#fbbf24">
        <path d="M88 198l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" opacity="0.85" />
        <path d="M380 196l1.6 4.8 4.8 1.6-4.8 1.6-1.6 4.8-1.6-4.8-4.8-1.6 4.8-1.6z" opacity="0.85" />
        <path d="M348 380l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4z" opacity="0.8" />
      </g>
    </svg>
  )
}
