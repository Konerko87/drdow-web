import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="bg-[#030712] text-white/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo-icon.png" alt="Dr.Dow AI" width={24} height={24} className="rounded-md" />
              <span className="text-lg font-black text-white">Dr.Dow <span className="gradient-text">AI</span></span>
            </div>
            <p className="text-xs leading-relaxed">
              {SITE.tagline}
              <br />
              用 AI 替傳統產業打造會思考的系統。
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white/70 font-semibold text-xs tracking-wider uppercase mb-4">Products</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/products/tms" className="hover:text-white transition-colors">TMS 派車系統</Link></li>
              <li><Link href="/products/erp" className="hover:text-white transition-colors">ERP 財務系統</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">價格方案</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white/70 font-semibold text-xs tracking-wider uppercase mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/blog" className="hover:text-white transition-colors">部落格</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">常見問題</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">關於我們</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">聯繫我們</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/70 font-semibold text-xs tracking-wider uppercase mb-4">Contact</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li>{SITE.company}</li>
              <li>Taiwan</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-wider">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="text-white/20">Built with AI, for companies that want AI to work for them.</p>
        </div>
      </div>
    </footer>
  )
}
