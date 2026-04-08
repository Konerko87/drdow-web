import { NextRequest, NextResponse } from 'next/server'
import { SITE } from '@/lib/constants'

// Use Resend if available, fallback to console log for dev
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
    // Use Resend API
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

  // Fallback: log to console (dev mode)
  console.log('\n📧 === 新客戶留言 ===')
  console.log(`Subject: ${subject}`)
  console.log(body)
  console.log('=== END ===\n')
  return { id: 'dev-mode' }
}

export async function POST(request: NextRequest) {
  try {
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
      // Bot filled the hidden field
      return NextResponse.json({ success: true })
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
