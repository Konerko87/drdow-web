import type { Metadata } from 'next'
import Link from 'next/link'
import { Illustration404 } from '@/components/ui/illustration-404'

export const metadata: Metadata = {
  title: '404 — 找不到頁面',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <Illustration404 className="w-full max-w-sm mx-auto mb-6" />
        <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-5xl font-bold text-accent mb-3 tracking-tight">404</h1>
        <p className="text-xl font-semibold text-dark mb-2">找不到這個頁面</p>
        <p className="text-muted mb-8">
          你要找的頁面可能已經移除、更名，或暫時無法使用。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-light transition-colors"
          >
            回到首頁
          </Link>
          <Link
            href="/products/miaotong"
            className="px-6 py-3 border border-slate-200 text-dark font-medium rounded-xl hover:bg-surface transition-colors"
          >
            了解廟通
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-slate-200 text-dark font-medium rounded-xl hover:bg-surface transition-colors"
          >
            聯繫我們
          </Link>
        </div>
      </div>
    </section>
  )
}
