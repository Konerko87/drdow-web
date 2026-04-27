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
// ---------------------------------------------------------------------------
const SUSPICIOUS_PATTERNS = [
  /%27|%22|%2527|%2522/i,           // encoded quotes (double-encoded)
  /<script[\s>]/i,                   // XSS script tags
  /(\b(union|select|insert|drop|delete|update)\b.*\b(from|into|table|set)\b)/i, // SQL
  /javascript\s*:/i,                 // JS protocol
  /on(error|load|click|mouseover)\s*=/i,  // event handlers
  /\.\.\//,                          // path traversal
  /\x00/,                            // null bytes
]

function isSuspicious(fields: Record<string, string>): boolean {
  const combined = Object.values(fields).join(' ')
  return SUSPICIOUS_PATTERNS.some((p) => p.test(combined))
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
  try {
    // Rate limit by IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: '提交次數過多，請稍後再試' },
        { status: 429 }
      )
    }

    const data = await request.json()

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

    // Suspicious content check
    if (isSuspicious({ company, name, email, phone: data.phone || '', message })) {
      // Return success to not reveal detection, but don't send email
      console.warn(`[Contact] Blocked suspicious submission from ${ip}`)
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
