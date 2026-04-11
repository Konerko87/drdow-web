import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'SEO 管理後台 | Dr.Dow AI',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
