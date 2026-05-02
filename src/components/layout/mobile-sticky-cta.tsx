'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { TrackedCTA } from '@/components/ui/tracked-cta'

/**
 * Mobile-only sticky bottom CTA bar.
 *
 * 為什麼存在：
 * - 手機流量在 hero 看完後常常滑很遠才看到下一個 CTA，中間流失。
 * - 永遠固定在螢幕底部一個「預約展示」按鈕，把轉換漏斗最關鍵的「想 → 點」之間距離縮到最短。
 * - 配合 GA4 cta_click 事件可以量化這個 bar 的轉換貢獻。
 *
 * 顯示規則：
 * - 只在手機（md:hidden）顯示，桌機 navbar 已有持續可見 CTA 不需重複。
 * - 隱藏於 /contact、/thank-you（已在表單上不需重複導引）。
 * - 等使用者滑動 200px 之後才出現（避免遮 hero 黃金第一畫面）。
 */
export function MobileStickyCTA() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Hide on conversion-step pages
  if (pathname === '/contact' || pathname === '/thank-you') return null

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 pointer-events-none transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!visible}
    >
      <div
        className="pointer-events-auto rounded-full shadow-[0_10px_30px_rgba(185,28,28,0.35)] backdrop-blur-md"
        style={{
          background: 'linear-gradient(135deg, #B91C1C, #d97706)',
        }}
      >
        <TrackedCTA
          href="/contact"
          location="mobile-sticky"
          product="generic"
          label="primary"
          tabIndex={visible ? 0 : -1}
          className="block w-full text-center py-3.5 text-white font-bold text-[15px] tracking-wide"
        >
          預約免費展示 →
        </TrackedCTA>
      </div>
    </div>
  )
}
