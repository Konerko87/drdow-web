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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'nav-blur border-b border-black/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="Dr.Dow AI"
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
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-wide transition-colors ${
                scrolled ? 'text-muted hover:text-dark' : 'text-white/50 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
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
            <Link
              key={link.href}
              href={link.href}
              className="block text-sm text-muted hover:text-dark py-2.5"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
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
