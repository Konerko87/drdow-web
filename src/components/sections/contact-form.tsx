'use client'

import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { Icon } from '@/components/ui/icon'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
const ADS_CONVERSION_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID
const ADS_CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL
const ADS_LEAD_EVENT_NAME =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_EVENT_NAME || 'ads_conversion_SUBMIT_LEAD_FORM_1'
const LEAD_CONVERSION_PENDING_KEY = 'drdow:lead-conversion-pending'
const LEAD_CONVERSION_STORAGE_KEY = 'drdow:lead-conversion-tracked'
const LEAD_CONVERSION_SOURCE_KEY = 'drdow:lead-conversion-source'

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

const INTEREST_OPTIONS = [
  { value: 'demo', label: '看 Demo 操作' },
  { value: 'price', label: '想知道價格' },
  { value: 'timeline', label: '想了解導入時程' },
  { value: 'spec', label: '想評估系統規格' },
] as const

function markLeadConversionPending(source: string) {
  try {
    window.sessionStorage.setItem(LEAD_CONVERSION_PENDING_KEY, '1')
    window.sessionStorage.setItem(LEAD_CONVERSION_SOURCE_KEY, source)
  } catch {
    // Ignore storage failures; conversion tracking should never block the form.
  }
}

function markLeadConversionTracked() {
  try {
    window.sessionStorage.setItem(LEAD_CONVERSION_STORAGE_KEY, '1')
    window.sessionStorage.removeItem(LEAD_CONVERSION_PENDING_KEY)
    window.sessionStorage.removeItem(LEAD_CONVERSION_SOURCE_KEY)
  } catch {
    // Ignore storage failures; conversion tracking should never block the form.
  }
}

export function ContactForm({ source }: ContactFormProps = {}) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [interests, setInterests] = useState<Set<string>>(new Set())
  const startedRef = useRef(false)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string>('')

  function toggleInterest(value: string) {
    setInterests((prev) => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return next
    })
    trackFormStart()
  }

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
    const rawMessage = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim()
    const sourceTag = source && SOURCE_LABELS[source] ? `[來自 ${SOURCE_LABELS[source]}] ` : ''

    // Validate: at least one interest OR a message
    if (interests.size === 0 && !rawMessage) {
      setStatus('error')
      setErrorMsg('請勾選至少一項想了解的內容，或填寫留言')
      return
    }

    if (!email && !phone) {
      setStatus('error')
      setErrorMsg('請至少留下 Email 或電話其中一種聯絡方式')
      return
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setErrorMsg('Email 格式不正確')
      return
    }

    // Build composite message
    const interestLabels = INTEREST_OPTIONS.filter((o) => interests.has(o.value))
      .map((o) => o.label)
      .join('、')
    const messageParts: string[] = []
    if (interestLabels) messageParts.push(`【想了解】${interestLabels}`)
    if (rawMessage) messageParts.push(`【留言】\n${rawMessage}`)
    const composedMessage = sourceTag + messageParts.join('\n\n')

    const data = {
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email,
      phone,
      message: composedMessage,
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

      const formSource = source || 'contact'
      markLeadConversionPending(formSource)

      // Fire conversion event BEFORE redirect; /thank-you only acts as a fallback.
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'lead',
          event_label: formSource,
          form_source: formSource,
          value: 1,
        })

        if (ADS_LEAD_EVENT_NAME) {
          window.gtag('event', ADS_LEAD_EVENT_NAME, {
            event_category: 'lead',
            event_label: formSource,
            form_source: formSource,
            value: 1,
            currency: 'TWD',
          })
        }

        if (ADS_CONVERSION_ID && ADS_CONVERSION_LABEL) {
          window.gtag('event', 'conversion', {
            send_to: `${ADS_CONVERSION_ID}/${ADS_CONVERSION_LABEL}`,
            value: 1,
            currency: 'TWD',
          })
        }

        markLeadConversionTracked()
      }

      setStatus('success')
      form.reset()
      setInterests(new Set())
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
            Email <span className="text-muted font-normal">(Email 或電話擇一)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@company.com"
            className="w-full px-4 py-3 rounded-xl bg-surface border border-black/10 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
          />
        </div>

        {/* Phone — optional */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold mb-1.5">
            電話 <span className="text-muted font-normal">(Email 或電話擇一)</span>
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

        {/* Interests — quick checkboxes (lower commitment than free-form message) */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            您想了解什麼？ <span className="text-muted font-normal">(可複選)</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {INTEREST_OPTIONS.map((opt) => {
              const checked = interests.has(opt.value)
              return (
                <label
                  key={opt.value}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors text-sm ${
                    checked
                      ? 'border-accent bg-accent/5 text-dark'
                      : 'border-black/10 bg-surface hover:border-black/20'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleInterest(opt.value)}
                    className="w-4 h-4 rounded border-black/20 text-accent focus:ring-accent"
                  />
                  <span className="select-none">{opt.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Message — optional (only required if no interests selected) */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-1.5">
            想多說一點？ <span className="text-muted font-normal">(選填)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="例如：我們是 OO 宮、20 台車隊、需要 ERP 整合 ..."
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
