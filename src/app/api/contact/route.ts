import { NextRequest, NextResponse } from 'next/server'
import { SITE } from '@/lib/constants'

// ---------------------------------------------------------------------------
// 1. Rate limiting (in-memory, per IP, resets on deploy)
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5       // max requests
const RATE_WINDOW = 3600000 // per hour (ms)

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT
}

// Periodically clean up expired entries to prevent memory leak
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip)
  }
}, RATE_WINDOW)

// ---------------------------------------------------------------------------
// 2. Suspicious content detection (SQL injection / XSS / scanner payloads)
//    Patterns expanded to catch full sqlmap signature set:
//    time-based blind, boolean blind, error-based, stacked queries.
// ---------------------------------------------------------------------------
const SUSPICIOUS_PATTERNS = [
  // --- SQL: time-based blind injection ---
  /\bpg_sleep\s*\(/i,                // PostgreSQL
  /\bsleep\s*\(\s*\d/i,              // MySQL sleep(N)
  /\bbenchmark\s*\(/i,                // MySQL benchmark()
  /\bwaitfor\s+delay\b/i,            // MSSQL
  /\bdbms_pipe\.receive_message\b/i, // Oracle
  /\bsysdate\s*\(/i,                 // sqlmap fingerprint
  // --- SQL: structural keywords ---
  /(\b(union|select|insert|drop|delete|update|truncate|exec|execute)\b[\s\S]{0,80}?\b(from|into|table|set|where|values|database|schema)\b)/i,
  /\bselect\s*\(\s*\d/i,             // sqlmap nested select(0)
  /\bfrom\s+dual\b/i,                // Oracle DUAL
  /\binformation_schema\b/i,
  // --- SQL: boolean blind injection ---
  /\b(?:or|and|xor)\b\s+\d+\s*=\s*\d+/i,         // OR 1=1, AND 5=5
  /\b(?:or|and|xor)\b\s+['"]?\w+['"]?\s*=\s*['"]?\w+['"]?\s*--/i,
  /\bif\s*\(\s*now\s*\(\s*\)\s*=\s*sysdate/i,    // sqlmap if(now()=sysdate(),...)
  /\bxor\s*\(\s*if\s*\(/i,                       // XOR(if(...))
  /\d+\s*\*\s*\d+\s*=\s*\d+/,                    // sqlmap math probe: 5*5=25, 3*2<5
  // --- SQL: stacked queries / comment exit ---
  /;\s*(drop|delete|update|insert|alter|create|exec)\b/i,
  /--\s*$/m,                         // SQL line comment at end
  /\/\*.*?\*\//,                     // SQL block comment
  // --- Encoding tricks ---
  /%27|%22|%2527|%2522|%00|%3Cscript/i,
  // --- XSS ---
  /<script[\s>]/i,
  /javascript\s*:/i,
  /on(error|load|click|mouseover|focus|blur)\s*=/i,
  /<iframe[\s>]/i,
  // --- Path traversal / null bytes ---
  /\.\.\//,
  /\x00/,
  // --- Server-side template / command injection ---
  /\$\{.*?\}/,                       // ${...} template
  /\{\{.*?\}\}/,                     // {{...}} template
  /\|\s*(sh|bash|cmd|powershell|wget|curl)\b/i,
]

function detectSuspicious(fields: Record<string, string>): string | null {
  const combined = Object.values(fields).join(' ')
  for (const p of SUSPICIOUS_PATTERNS) {
    if (p.test(combined)) return p.source.slice(0, 60)
  }
  return null
}

// ---------------------------------------------------------------------------
// 2b. In-memory IP auto-ban (per-instance; resets on deploy)
//     A single suspicious payload bans the IP for 24h.
// ---------------------------------------------------------------------------
const BAN_DURATION = 24 * 60 * 60 * 1000 // 24h
const bannedIps = new Map<string, number>()

function isIpBanned(ip: string): boolean {
  const until = bannedIps.get(ip)
  if (!until) return false
  if (Date.now() > until) {
    bannedIps.delete(ip)
    return false
  }
  return true
}

function banIp(ip: string) {
  bannedIps.set(ip, Date.now() + BAN_DURATION)
}

// ---------------------------------------------------------------------------
// 3. Cloudflare Turnstile verification (optional — only if env vars set)
// ---------------------------------------------------------------------------
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true // skip if not configured

  if (!token) return false

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: token,
    }),
  })

  const data = await res.json()
  return data.success === true
}

// ---------------------------------------------------------------------------
// Send email via Resend
// ---------------------------------------------------------------------------
async function sendEmail({
  company,
  name,
  email,
  phone,
  message,
}: {
  company: string
  name: string
  email: string
  phone: string
  message: string
}) {
  const resendKey = process.env.RESEND_API_KEY

  const subject = `[重要] 新客戶詢問 — ${company} / ${name}`
  const body = `
🔔 新的客戶詢問

公司名稱：${company}
聯絡人：${name}
Email：${email}
電話：${phone || '未填寫'}

留言內容：
${message}

---
來自 ${SITE.name} 官網聯繫表單
`.trim()

  if (resendKey) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: 'Dr.Dow AI <noreply@drdowai.com>',
        to: [SITE.email],
        subject,
        text: body,
        headers: {
          'X-Priority': '1',
          Importance: 'high',
        },
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      throw new Error(`Resend error: ${err}`)
    }
    return await res.json()
  }

  // Fallback: dev mode (no Resend key)
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Contact] ${subject}`)
  }
  return { id: 'dev-mode' }
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  // Resolve IP & UA up front (used for logging in every branch)
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  const ua = request.headers.get('user-agent') || ''

  try {
    // Auto-banned IP (caught a malicious payload before)
    if (isIpBanned(ip)) {
      console.warn(`[Contact] Banned IP retry: ${ip} ua="${ua.slice(0, 80)}"`)
      return NextResponse.json({ success: true })
    }

    // Rate limit by IP
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: '提交次數過多，請稍後再試' },
        { status: 429 }
      )
    }

    // Reject obviously non-form requests early (must be JSON)
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      console.warn(`[Contact] Bad content-type from ${ip} ua="${ua.slice(0, 80)}" ct="${contentType}"`)
      banIp(ip)
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse body — empty/malformed = scanner probe, ban immediately
    let data: Record<string, string>
    try {
      data = await request.json()
    } catch {
      console.warn(`[Contact] Malformed JSON from ${ip} ua="${ua.slice(0, 80)}"`)
      banIp(ip)
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Validate required fields
    const { company, name, email, message } = data
    if (!company || !name || !email || !message) {
      return NextResponse.json(
        { error: '請填寫所有必填欄位' },
        { status: 400 }
      )
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Email 格式不正確' },
        { status: 400 }
      )
    }

    // Honeypot check (anti-spam)
    if (data.website) {
      return NextResponse.json({ success: true })
    }

    // Suspicious content check — ban + drop, no email sent
    const matched = detectSuspicious({ company, name, email, phone: data.phone || '', message })
    if (matched) {
      banIp(ip)
      console.warn(`[Contact] Blocked sqli/xss from ${ip} ua="${ua.slice(0, 80)}" pattern=${matched}`)
      // Return success to not reveal detection
      return NextResponse.json({ success: true })
    }

    // Turnstile verification (skipped if not configured)
    const turnstileOk = await verifyTurnstile(data.turnstileToken || '')
    if (!turnstileOk) {
      return NextResponse.json(
        { error: '驗證失敗，請重新整理頁面再試' },
        { status: 403 }
      )
    }

    await sendEmail({
      company,
      name,
      email,
      phone: data.phone || '',
      message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: '寄送失敗，請稍後再試或直接寄 Email 給我們' },
      { status: 500 }
    )
  }
}
