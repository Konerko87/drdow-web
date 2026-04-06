import Link from 'next/link'
import { SITE } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-dark text-white/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-xl font-black text-white mb-2">
              Dr.Dow <span className="gradient-text">AI</span>
            </div>
            <p className="text-sm leading-relaxed">
              {SITE.tagline}
              <br />
              用 AI 替傳統產業打造會思考的系統。
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">產品</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products/tms" className="hover:text-white transition-colors">TMS 派車系統</Link></li>
              <li><Link href="/products/erp" className="hover:text-white transition-colors">ERP 財務系統</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">價格方案</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">資源</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">常見問題</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">關於我們</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">聯繫我們</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">聯繫</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="text-white/40">{SITE.company}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="text-white/30">Built with AI, for companies that want AI to work for them.</p>
        </div>
      </div>
    </footer>
  )
}
