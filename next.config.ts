import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    // Content Security Policy — marketing site, allow GA + Turnstile + Unsplash images.
    // 'unsafe-inline' on script-src is required for Next.js hydration & GA inline config;
    // when we move to nonces this can tighten further.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://www.google-analytics.com https://www.googletagmanager.com",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; ')

    const baseSecurityHeaders = [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // 2-year HSTS + preload-eligible. Once stable, submit to hstspreload.org
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
    ]

    return [
      // All routes EXCEPT /decks/* — full CSP applied
      {
        source: '/((?!decks/).*)',
        headers: [
          ...baseSecurityHeaders,
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      // /decks/* — sandboxed self-contained pitch deck HTML. CSP omitted so the
      // embedded bundler can unpack without restrictions; X-Robots-Tag added so
      // even if URL leaks, search engines won't index.
      {
        source: '/decks/(.*)',
        headers: [
          ...baseSecurityHeaders,
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet' },
        ],
      },
      {
        source: '/screenshots/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(logo-.*\\.png)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
};

export default nextConfig;
