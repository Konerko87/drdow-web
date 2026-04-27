import { NextRequest, NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Blocked bot user-agent patterns (case-insensitive match)
// ---------------------------------------------------------------------------
const BLOCKED_BOTS = [
  // AI training crawlers
  'gptbot', 'chatgpt-user', 'google-extended', 'claudebot', 'claude-web',
  'anthropic-ai', 'perplexitybot', 'bytespider', 'ccbot', 'omgili',
  'diffbot', 'cohere-ai', 'applebot-extended',
  // SEO scrapers
  'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot', 'petalbot', 'blexbot',
  'dataforseobot', 'sogou', 'megaindex',
  // Generic scrapers / attack tools
  'scrapy', 'python-requests', 'go-http-client', 'java/', 'libwww-perl',
  'wget', 'httrack', 'nikto', 'sqlmap', 'nmap', 'masscan', 'zgrab',
  'dirbuster', 'gobuster', 'nuclei', 'httpx',
]

// Paths that should not be processed by middleware
const EXCLUDED_PATHS = [
  '/_next/',      // Next.js assets
  '/favicon.ico',
  '/logo-',
  '/apple-touch-icon',
]

function isBlockedBot(ua: string): boolean {
  const lower = ua.toLowerCase()
  return BLOCKED_BOTS.some((bot) => lower.includes(bot))
}

// ---------------------------------------------------------------------------
// Tarpit: waste bot's time with a slow, useless response
// ---------------------------------------------------------------------------
const TARPIT_HTML = `<!DOCTYPE html><html><head><title>Loading...</title>
<meta http-equiv="refresh" content="300;url=about:blank">
</head><body>${'<!-- ' + 'x'.repeat(1024) + ' -->\n'.repeat(64)}</body></html>`

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || ''
  const path = request.nextUrl.pathname

  // Skip middleware for static assets
  if (EXCLUDED_PATHS.some((p) => path.startsWith(p))) {
    return NextResponse.next()
  }

  // Block known bad bots — return tarpit response to waste their resources
  if (ua && isBlockedBot(ua)) {
    return new NextResponse(TARPIT_HTML, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-store',
        // Slow drip — make the bot wait
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
      },
    })
  }

  // Block requests with no user-agent hitting API endpoints (likely bots/scanners)
  if (!ua && path.startsWith('/api/')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Add security headers to all responses
  const response = NextResponse.next()
  response.headers.set('X-Robots-Tag', 'noai, noimageai')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  return response
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon\\.ico).*)',
  ],
}
