'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Icon } from '@/components/ui/icon'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; 'expired-callback': () => void }
      ) => string
      reset: (widgetId: string) => void
    }
    gtag?: (...args: unknown[]) => void
  }
}

const SOURCE_LABELS: Record<string, string> = {
  miaotong: '廟通產品頁',
  tms: 'TMS 產品頁',
  wms: 'WMS 產品頁',
  erp: 'ERP 產品頁',
  contact: '聯絡頁',
}

interface ContactFormProps {
  source?: string
}

export function ContactForm({ source }: ContactFormProps = {}) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const startedRef = useRef(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>('')

  function trackFormStart() {
    if (startedRef.current) return
    startedRef.current = true
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'form_start', {
        event_category: 'lead',
        event_label: source || 'contact',
        form_source: source || 'contact',
      })
    }
  }

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !window.turnstile || !turnstileRef.current) return
    if (widgetIdRef.current) return // already rendered

    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
    })
  })

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const rawMessage = (form.elements.namedItem('message') as HTMLTextAreaElement).value
    const sourceTag = source && SOURCE_LABELS[source] ? `[來自 ${SOURCE_LABELS[source]}] ` : ''
    const data = {
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: sourceTag + rawMessage,
      website: (form.elements.namedItem('website') as HTMLInputElement).value, // honeypot
      turnstileToken,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || '寄送失敗')
      }

      // Fire conversion event BEFORE redirect — /thank-you may not load if user navigates away
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'lead',
          event_label: source || 'contact',
          form_source: source || 'contact',
          value: 1,
        })
      }

      setStatus('success')
      form.reset()
      router.push('/thank-you')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : '寄送失敗，請稍後再試')
      // Reset turnstile on error
      if (TURNSTILE_SITE_KEY && window.turnstile && widgetIdRef.current) {
        window.turnstile.reset(widgetIdRef.current)
        setTurnstileToken('')
      }
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-3">
          <Icon name="check-circle" className="w-12 h-12 text-green-600" strokeWidth={1.75} />
        </div>
        <h3 className="text-xl font-black text-green-700 mb-2">留言已送出！</h3>
        <p className="text-sm text-green-600">
          我們會在 24 小時內回覆你的 Email。感謝你的興趣！
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-green-600 underline"
        >
          再送一則留言
        </button>
      </div>
    )
  }

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          async
          defer
        />
      )}
      <form onSubmit={handleSubmit} onFocus={trackFormStart} className="space-y-5">
        {/* Company / Temple name — required */}
        <div>
          <label htmlFor="company" className="block text-sm font-semibold mb-1.5">
            公司／宮廟名稱 <span className="text-red-400">*</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            aria-required="true"
            autoComplete="organization"
            placeholder="例：○○宮、○○殿、ABC 物流公司"
            className="w-full px-4 py-3 rounded-xl bg-surface border border-black/10 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </div>

        {/* Name — required */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-1.5">
            聯絡人 <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            aria-required="true"
            autoComplete="name"
            placeholder="您的姓名或職稱（例：王主委、林董）"
            className="w-full px-4 py-3 rounded-xl bg-surface border border-black/10 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </div>

        {/* Email — required */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
            placeholder="your@company.com"
            className="w-full px-4 py-3 rounded-xl bg-surface border border-black/10 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </div>

        {/* Phone — optional */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-1.5">
            電話 <span className="text-muted font-normal">(選填)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="09xx-xxx-xxx"
            className="w-full px-4 py-3 rounded-xl bg-surface border border-black/10 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </div>

        {/* Message — required */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-1.5">
            留言 <span className="text-red-400">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            aria-required="true"
            rows={4}
            placeholder="簡單告訴我們您的需求，例如：&#10;・我們是 OO 宮，想看看廟通的點燈、法會、收據功能&#10;・公司有 20 台車想導入 TMS&#10;・需要 ERP 財務系統"
            className="w-full px-4 py-3 rounded-xl bg-surface border border-black/10 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
          />
        </div>

        {/* Cloudflare Turnstile widget (only if configured) */}
        {TURNSTILE_SITE_KEY && (
          <div ref={turnstileRef} className="flex justify-center" />
        )}

        {/* Honeypot — hidden from humans */}
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 h-0 w-0 overflow-hidden"
        />

        {/* Error */}
        {status === 'error' && (
          <div className="bg-red-50 text-red-600 text-sm rounded-xl p-3">
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{ background: 'linear-gradient(135deg, #B91C1C, #d97706)' }}
          className="w-full py-3 text-white rounded-full font-semibold text-sm shadow-[0_8px_24px_rgba(185,28,28,0.16)] hover:shadow-[0_10px_28px_rgba(185,28,28,0.24)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        >
          {status === 'sending' ? '寄送中...' : '送出留言 →'}
        </button>

        <p className="text-xs text-[#6b5b4a] text-center">
          送出後會直接寄到我們的信箱，24 小時內回覆。
        </p>
      </form>
    </>
  )
}
