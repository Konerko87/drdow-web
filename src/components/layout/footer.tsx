import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/lib/constants'
import { Icon } from '@/components/ui/icon'

export function Footer() {
  return (
    <footer className="text-white/40 border-t border-white/5" style={{ background: '#1a1a2e' }} role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Image src="/logo-miaotong.png" alt="Dr.Dow AI logo" width={28} height={28} className="rounded-md" />
              <span className="text-lg font-black text-white">{SITE.name}</span>
            </div>
            <p className="text-xs leading-relaxed mb-4">
              為現場營運打造的 AI 管理系統
            </p>
            <p className="text-xs leading-relaxed text-white/25">
              從宮廟櫃檯、物流派車、倉儲出入庫到財務對帳，協助團隊把紙本、Excel 與 LINE 群組整理成可追蹤、可交接、可自動化的流程。
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/70 font-semibold text-xs tracking-wider uppercase mb-4">產品與資源</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/products/miaotong" className="hover:text-white transition-colors">廟通 智慧宮廟管理系統</Link></li>
              <li><Link href="/products/tms" className="hover:text-white transition-colors">TMS 物流派車系統</Link></li>
              <li><Link href="/products/wms" className="hover:text-white transition-colors">WMS 倉儲管理系統</Link></li>
              <li><Link href="/products/erp" className="hover:text-white transition-colors">ERP 物流財務系統</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition-colors">產業解決方案</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">價格方案</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">產業 Blog 與導入指南</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">常見問題 FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">隱私政策</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/70 font-semibold text-xs tracking-wider uppercase mb-4">聯絡我們</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href={`tel:${SITE.phone}`} className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <Icon name="phone" className="w-3.5 h-3.5" strokeWidth={2} /> {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors inline-flex items-center gap-2">
                  <Icon name="mail" className="w-3.5 h-3.5" strokeWidth={2} /> {SITE.email}
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
