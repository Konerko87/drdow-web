/**
 * TempleCloudPattern — 廟宇祥雲 SVG pattern (v2)
 * 由 open-design v0.1.0 web-prototype skill 第二次產出，已修正 v1 版本「水滴狀」問題。
 * 結構：每個 220×220 tile 含 3 個 motif（大/中/小）+ 連接雲帶
 *  - 大 motif（左上）：如意雲頭 + S 頸 + 內捲尾
 *  - 中 motif（右下）：鏡像縮小版
 *  - 小 motif（中央）：旋轉 25°
 *  - 雲帶：橫向細線連結
 */
export function TempleCloudPattern({ className, opacity = 0.1 }: { className?: string; opacity?: number }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className ?? ''}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern id="miaotong-temple-cloud-v2" x="0" y="0" width="220" height="220" patternUnits="userSpaceOnUse">
          {/* LARGE MOTIF（左上）— 雲頭 + S 頸 + 內捲尾 */}
          <path
            d="M 45 35 Q 55 25, 65 30 Q 70 35, 68 42 Q 65 48, 58 48 Q 52 48, 48 45 M 48 45 Q 42 55, 38 70 Q 35 85, 40 100 Q 45 110, 55 115 M 55 115 Q 62 118, 68 115 Q 72 112, 73 108 Q 74 104, 72 101 Q 70 98, 66 98 Q 63 98, 61 100"
            stroke="white"
            strokeWidth="1.6"
            fill="none"
            opacity="0.4"
          />
          <path
            d="M 52 35 Q 58 32, 62 36 Q 64 40, 62 44 Q 60 47, 56 46 Q 53 45, 52 42"
            stroke="white"
            strokeWidth="1.4"
            fill="white"
            fillOpacity="0.05"
            opacity="0.45"
          />
          <path
            d="M 56 38 Q 58 37, 59 39 Q 60 41, 58 42 Q 57 43, 55 41"
            stroke="white"
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
          />

          {/* MEDIUM MOTIF（右下）— 鏡像 */}
          <path
            d="M 175 185 Q 165 180, 158 183 Q 154 186, 156 192 Q 158 196, 164 197 M 164 197 Q 168 190, 172 178 Q 175 168, 172 158 Q 170 152, 164 149 M 164 149 Q 160 147, 156 149 Q 153 151, 153 154 Q 153 157, 155 159 Q 157 161, 160 160"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            opacity="0.35"
          />
          <path
            d="M 168 185 Q 163 183, 160 186 Q 159 189, 161 192 Q 163 194, 166 193"
            stroke="white"
            strokeWidth="1.3"
            fill="white"
            fillOpacity="0.04"
            opacity="0.38"
          />

          {/* SMALL MOTIF（中央填補）— 旋轉 25° */}
          <g transform="rotate(25 120 120)">
            <path
              d="M 110 100 Q 115 96, 120 99 Q 123 102, 121 107 M 121 107 Q 118 115, 115 125 Q 113 132, 117 138 Q 120 142, 125 142 Q 128 142, 130 140 Q 131 138, 130 136 Q 129 135, 127 135"
              stroke="white"
              strokeWidth="1.4"
              fill="none"
              opacity="0.32"
            />
            <path
              d="M 114 99 Q 117 97, 119 100 Q 120 103, 118 105 Q 116 106, 114 104"
              stroke="white"
              strokeWidth="1.2"
              fill="white"
              fillOpacity="0.03"
              opacity="0.35"
            />
          </g>

          {/* 雲帶連結 */}
          <path
            d="M 75 120 Q 95 118, 110 122 Q 130 126, 145 120"
            stroke="white"
            strokeWidth="0.8"
            fill="none"
            opacity="0.18"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#miaotong-temple-cloud-v2)" />
    </svg>
  )
}
