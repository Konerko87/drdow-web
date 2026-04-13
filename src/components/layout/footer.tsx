import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="text-white/40 border-t border-white/5" style={{ background: '#1a1a2e' }} role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo-miaotong.png" alt="Dr.Dow AI 廟通 logo" width={28} height={28} className="rounded-md" />
              <span className="text-lg font-black text-white">{SITE.name}</span>
            </div>
            <p className="text-xs leading-relaxed mb-4">
              為宮廟量身打造的智慧營運平台
            </p>
            <p className="text-xs leading-relaxed text-white/25">
              從信徒管理、點燈服務、法會報名、捐款收據，到會計帳務與 LINE 行動服務，一套系統管好整間廟。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/70 font-semibold text-xs tracking-wider uppercase mb-4">產品與資源</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/products/miaotong" className="hover:text-white transition-colors">廟通 宮廟管理</Link></li>
              <li><Link href="/products/tms" className="hover:text-white transition-colors">TMS 派車系統</Link></li>
              <li><Link href="/products/erp" className="hover:text-white transition-colors">ERP 財務系統</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">部落格</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">常見問題</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">隱私政策</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/70 font-semibold text-xs tracking-wider uppercase mb-4">聯絡我們</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors">
                  📞 {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                  ✉️ {SITE.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  預約產品展示
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] tracking-wider">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="text-white/20">台灣在地開發與支援</p>
        </div>
      </div>
    </footer>
  )
}
