import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'
import { getAllPosts } from '@/lib/blog'

const absoluteUrl = (pathOrUrl: string) =>
  pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE.url}${pathOrUrl}`

const erpDemoImages = [
  '/screenshots/training/01-login-page.png',
  '/screenshots/training/02-ap-home.png',
  '/screenshots/training/08-invoice-list.png',
  '/screenshots/training/10-pending-payments.png',
  '/screenshots/training/19-bank-reconciliation.png',
  '/screenshots/training/20-reports.png',
  '/screenshots/training/28-boss-home.png',
  '/screenshots/training/36-vendor-portal-login.png',
]

function page(
  path: string,
  lastModified: Date,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  priority: number,
  images: string[] = [],
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
    ...(images.length > 0 && { images: images.map(absoluteUrl) }),
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    page('', now, 'weekly', 1.0, ['/opengraph-image']),
    page('/products/tms', now, 'monthly', 0.9, [
      '/og/tms-og.png',
      '/hero/tms-hero.png',
      '/screenshots/tms-dispatch.png',
      '/screenshots/tms-driver-app.png',
      '/screenshots/tms-kpi.png',
    ]),
    page('/products/wms', now, 'monthly', 0.9, [
      '/og/wms-og.png',
      '/hero/wms-hero.png',
      '/screenshots/wms-inventory.png',
      '/screenshots/wms-outbound.png',
      '/screenshots/wms-stocktake.png',
    ]),
    page('/products/erp', now, 'monthly', 0.9, [
      '/og/erp-og.png',
      '/hero/erp-hero.png',
      '/screenshots/erp-ocr.png',
      '/screenshots/erp-bank.png',
      '/screenshots/erp-boss.png',
    ]),
    page('/products/erp/demo', now, 'monthly', 0.8, erpDemoImages),
    page('/products/miaotong', now, 'monthly', 0.9, [
      '/og/miaotong-og.png',
      '/screenshots/liff-light-order-1.png',
      '/screenshots/liff-family.png',
      '/screenshots/receipt.png',
    ]),
    page('/blog', now, 'weekly', 0.8),
    page('/pricing', now, 'monthly', 0.8),
    page('/faq', now, 'monthly', 0.8),
    page('/solutions', now, 'monthly', 0.7),
    page('/contact', now, 'monthly', 0.6),
    page('/about', now, 'monthly', 0.5),
  ]

  // Dynamic blog posts
  const posts = getAllPosts()
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    ...(post.coverImage?.startsWith('/') && { images: [absoluteUrl(post.coverImage)] }),
  }))

  return [...staticPages, ...blogPages]
}
