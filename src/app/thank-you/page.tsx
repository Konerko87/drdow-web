import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '感謝您的詢問 | Dr.Dow AI',
  description: '感謝您聯繫 Dr.Dow AI，我們會在 24 小時內回覆。',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#030712] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />

      <div className="relative text-center px-6 max-w-lg">
        <Image src="/logo-icon.png" alt="Dr.Dow AI logo" width={56} height={56} className="mx-auto mb-8 rounded-xl" />

        <h1 className="text-3xl md:text-4xl font-black text-white mb-4">
          感謝您的詢問！
        </h1>

        <p className="text-white/40 text-base mb-8 leading-relaxed">
          我們已收到您的訊息，將在 <strong className="text-white/70">24 小時內</strong> 回覆您的 Email。
        </p>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8 text-left">
          <p className="text-white/50 text-sm mb-3">在等待的同時，您可以先了解：</p>
          <ul className="space-y-2">
            <li>
              <Link href="/products/miaotong" className="text-accent text-sm hover:underline">
                → 廟通宮廟管理系統
              </Link>
            </li>
            <li>
              <Link href="/products/tms" className="text-accent text-sm hover:underline">
                → TMS 派車系統如何運作
              </Link>
            </li>
            <li>
              <Link href="/products/erp" className="text-accent text-sm hover:underline">
                → ERP 財務系統功能介紹
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-accent text-sm hover:underline">
                → 產業趨勢部落格
              </Link>
            </li>
          </ul>
        </div>

        <Link
          href="/"
          className="text-white/30 text-sm hover:text-white/60 transition-colors"
        >
          ← 回首頁
        </Link>
      </div>
    </section>
  )
}
