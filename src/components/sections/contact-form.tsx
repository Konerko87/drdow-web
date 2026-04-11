'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export function ContactForm() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      website: (form.elements.namedItem('website') as HTMLInputElement).value, // honeypot
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

      setStatus('success')
      form.reset()
      router.push('/thank-you')
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : '寄送失敗，請稍後再試')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Company — required */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold mb-1.5">
          公司名稱 <span className="text-red-400">*</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          aria-required="true"
          autoComplete="organization"
          placeholder="例：ABC 物流股份有限公司"
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
          placeholder="怎麼稱呼您"
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
          placeholder="告訴我們你的需求，例如：想了解廟通宮廟管理系統 / 公司有 20 台車想導入 TMS / 需要 ERP 財務系統..."
          className="w-full px-4 py-3 rounded-xl bg-surface border border-black/10 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors resize-none"
        />
      </div>

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
        className="w-full py-3 bg-accent text-white rounded-full font-semibold text-sm hover:bg-accent-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? '寄送中...' : '送出留言 →'}
      </button>

      <p className="text-xs text-muted text-center">
        送出後會直接寄到我們的信箱，24 小時內回覆。
      </p>
    </form>
  )
}
