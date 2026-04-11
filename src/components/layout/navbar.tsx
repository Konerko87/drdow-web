'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SITE, NAV_LINKS } from '@/lib/constants'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav role="navigation" aria-label="主選單" className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'nav-blur border-b border-black/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="Dr.Dow AI logo"
            width={28}
            height={28}
            className="rounded-md"
          />
          <span className={`text-lg font-black tracking-tight transition-colors ${
            scrolled ? 'text-dark' : 'text-white'
          }`}>
            Dr.Dow <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            'children' in link && link.children ? (
              <div key={link.href} className="relative group">
                <button
                  aria-expanded={false}
                  aria-haspopup="true"
                  className={`text-xs tracking-wide transition-colors flex items-center gap-1 ${
                    scrolled ? 'text-muted hover:text-dark' : 'text-white/50 hover:text-white'
                  }`}
                >
                  {link.label}
                  <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-lg border border-black/5 py-2 min-w-[240px]">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 hover:bg-surface transition-colors"
                      >
                        <div className="text-xs font-semibold text-dark">{child.label}</div>
                        <div className="text-[10px] text-muted mt-0.5">{child.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-wide transition-colors ${
                  scrolled ? 'text-muted hover:text-dark' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/contact"
            className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
              scrolled
                ? 'bg-dark text-white hover:bg-dark/80'
                : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
            }`}
          >
            預約 Demo
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 ${scrolled ? 'text-dark' : 'text-white'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-black/5 px-6 py-6 space-y-1">
          {NAV_LINKS.map((link) => (
            'children' in link && link.children ? (
              <div key={link.href}>
                <span className="block text-sm font-semibold text-dark py-2.5">{link.label}</span>
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block text-sm text-muted hover:text-dark py-2 pl-4"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-muted hover:text-dark py-2.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          ))}
          <Link
            href="/contact"
            className="block text-center px-5 py-2.5 bg-dark text-white rounded-full text-sm font-semibold mt-4"
            onClick={() => setMobileOpen(false)}
          >
            預約 Demo
          </Link>
        </div>
      )}
    </nav>
  )
}
