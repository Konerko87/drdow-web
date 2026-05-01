/**
 * Illustration404 — 手刻 SVG 插畫，用於 404 頁。
 * 配色：accent (#3B82F6) + purple (#8B5CF6)，搭配品牌漸層。
 * 主題：迷路的紙飛機，象徵「飛去了不存在的地方」。
 */
export function Illustration404({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="plane-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Sky dots */}
      {[
        [40, 30], [80, 50], [60, 90], [120, 25], [180, 60],
        [240, 35], [280, 80], [50, 140], [220, 150], [290, 120],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={1.5} fill="#8B5CF6" opacity={0.3} />
      ))}

      {/* Curved trail */}
      <path
        d="M 30 170 Q 100 120, 160 130 T 280 70"
        stroke="url(#trail-gradient)"
        strokeWidth="2"
        strokeDasharray="4 6"
        fill="none"
      />

      {/* Paper plane */}
      <g transform="translate(220, 50) rotate(-15)">
        <path
          d="M 0 30 L 60 0 L 50 25 L 28 22 L 50 28 L 30 50 Z"
          fill="url(#plane-gradient)"
        />
        <path
          d="M 28 22 L 50 28 L 30 50 Z"
          fill="#1E40AF"
          opacity="0.4"
        />
      </g>

      {/* Big 404 text */}
      <text
        x="50%"
        y="115"
        textAnchor="middle"
        fontSize="64"
        fontWeight="900"
        fontFamily="ui-sans-serif, system-ui"
        fill="url(#plane-gradient)"
        opacity="0.08"
      >
        404
      </text>
    </svg>
  )
}
