'use client'

import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

type TrackedCTAProps = Omit<ComponentProps<typeof Link>, 'children'> & {
  /** Where on the page is this CTA (hero, mid-page, footer-cta, sticky, etc.) */
  location: string
  /** Which product context (tms, wms, miaotong, erp, generic) */
  product?: string
  /** Free-form label for variant identification (e.g. "primary", "phone", "view-features") */
  label?: string
  children: ReactNode
}

/**
 * Link wrapper that fires GA4 `cta_click` events for funnel analysis.
 *
 * Use on every meaningful CTA (hero buttons, mid-page CTAs, dark CTA section,
 * sticky bars). Combined with `form_start` + `generate_lead`, this gives a full
 * picture of where in the conversion funnel users drop off.
 *
 * Example:
 *   <TrackedCTA href="/contact" location="hero" product="tms" label="primary">
 *     預約 Demo
 *   </TrackedCTA>
 */
export function TrackedCTA({
  location,
  product = 'generic',
  label = 'primary',
  onClick,
  children,
  ...rest
}: TrackedCTAProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'cta_click', {
        event_category: 'engagement',
        event_label: `${product}:${location}:${label}`,
        cta_location: location,
        cta_product: product,
        cta_label: label,
      })
    }
    onClick?.(e)
  }

  return (
    <Link {...rest} onClick={handleClick}>
      {children}
    </Link>
  )
}
