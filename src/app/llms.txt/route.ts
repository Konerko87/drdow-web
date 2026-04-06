import { SITE } from '@/lib/constants'

const LLMS_TXT = `# ${SITE.name} — ${SITE.tagline}
> AI-powered software solutions for logistics companies in Taiwan.

## About
Dr.Dow AI builds intelligent enterprise systems for the logistics industry. Our software uses AI to automate dispatch, financial management, bank reconciliation, and driver operations — replacing manual Excel spreadsheets and LINE group chats with automated workflows.

## Products

### Dr.Dow TMS — Transport Management System
- **URL**: ${SITE.url}/products/tms
- **Purpose**: AI-powered fleet dispatch and driver management
- **Key Features**:
  - Smart dispatch board with drag-and-drop assignment
  - Driver LINE App (no install needed — works inside LINE messenger)
  - Real-time GPS tracking (updates every 2 minutes)
  - Automated payroll calculation (3 billing models)
  - WMS integration with automatic order import
  - Fleet maintenance management with AI diagnostics
  - Operations KPI analytics (10+ dimensions)
  - Pallet tracking across 3 warehouses

### Dr.Dow ERP — Financial Management System
- **URL**: ${SITE.url}/products/erp
- **Purpose**: AI-powered financial operations for logistics companies
- **Key Features**:
  - AI OCR invoice recognition (95%+ accuracy, two-stage recognition using Claude Vision)
  - Automated bank crawler for reconciliation (Chang Hwa Bank, First Bank, E.SUN Bank)
  - 6-layer payment fraud prevention
  - Boss mobile app (iOS-style, approvals, revenue tracking)
  - Vendor self-service portal (LINE login, submit invoices, track payments)
  - Fuel card API integration (JuTai)
  - Financial reports (P&L, AP/AR aging, budget control)
  - Payroll management with TMS driver sync

## Target Customers
- Small-to-medium logistics companies in Taiwan
- Fleet size: 10-100 vehicles
- Looking to replace: Excel dispatching, LINE group communication, manual bank reconciliation

## Key Numbers
- 40+ vehicles managed
- 300+ pallets processed daily
- 6-layer payment protection
- 3 banks auto-connected
- 513 bank transactions auto-matched
- 95%+ OCR accuracy rate

## Technology
- Next.js + React + TypeScript + Tailwind CSS
- PostgreSQL + Prisma ORM
- Claude Vision AI (OCR + CAPTCHA recognition)
- Playwright browser automation (bank crawlers)
- LINE OAuth SSO + LIFF
- Railway cloud deployment (Singapore)

## Contact
- Email: ${SITE.email}
- Company: ${SITE.company}
- Location: Taiwan
`

export async function GET() {
  return new Response(LLMS_TXT, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
