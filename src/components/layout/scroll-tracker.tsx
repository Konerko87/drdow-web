'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const MILESTONES = [25, 50, 75, 100] as const

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Fires GA4 `scroll_depth` events at 25/50/75/100% page depth, once per page.
 * Resets when the user navigates between pages (App Router pathname change).
 *
 * Used to identify which landing pages have a "user lands but never scrolls"
 * bounce problem — a key signal that hero / above-the-fold isn't compelling.
 */
export function ScrollTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const fired = new Set<number>()

    function getDepth() {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const viewport = window.innerHeight || doc.clientHeight
      const total = Math.max(doc.scrollHeight, doc.offsetHeight) - viewport
      if (total <= 0) return 100
      return Math.min(100, Math.max(0, Math.round(((scrollTop + viewport) / (scrollTop + viewport + (total - scrollTop))) * 100)))
    }

    function getDepthSimple() {
      const doc = document.documentElement
      const scrollTop = window.scrollY || doc.scrollTop
      const viewport = window.innerHeight || doc.clientHeight
      const totalHeight = Math.max(doc.scrollHeight, doc.offsetHeight)
      const scrolled = scrollTop + viewport
      return Math.min(100, Math.round((scrolled / totalHeight) * 100))
    }

    // prefer simple calculation
    void getDepth

    function onScroll() {
      const depth = getDepthSimple()
      for (const m of MILESTONES) {
        if (depth >= m && !fired.has(m)) {
          fired.add(m)
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: `${m}%`,
              page_path: pathname,
              percent: m,
            })
          }
        }
      }
    }

    let ticking = false
    function throttled() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        onScroll()
        ticking = false
      })
    }

    window.addEventListener('scroll', throttled, { passive: true })
    onScroll() // fire immediately for short pages already past 25%
    return () => window.removeEventListener('scroll', throttled)
  }, [pathname])

  return null
}
