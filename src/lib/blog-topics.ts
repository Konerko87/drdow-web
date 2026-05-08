export type BlogTopicSlug = 'tms' | 'wms' | 'miaotong' | 'erp'

export type BlogTopic = {
  slug: BlogTopicSlug
  productKey: BlogTopicSlug
  title: string
  navTitle: string
  description: string
  keywords: string[]
  href: string
  productHref: string
  productName: string
  ctaLabel: string
}

export const BLOG_TOPICS: BlogTopic[] = [
  {
    slug: 'tms',
    productKey: 'tms',
    title: 'TMS 運輸管理系統指南',
    navTitle: 'TMS 運輸管理',
    description: '整理派車、運輸管理、司機調度、物流對帳與 TMS 系統導入文章，協助物流車隊判斷何時需要升級運輸管理系統。',
    keywords: ['TMS', '運輸管理系統', '派車系統', '物流管理系統', '物流數位轉型', '司機調度'],
    href: '/blog/topics/tms',
    productHref: '/products/tms',
    productName: 'TMS 運輸管理系統',
    ctaLabel: '看 TMS 產品',
  },
  {
    slug: 'wms',
    productKey: 'wms',
    title: 'WMS 倉儲管理系統指南',
    navTitle: 'WMS 倉儲管理',
    description: '收錄庫存管理、儲位編碼、條碼盤點、出入庫流程與 WMS 選型文章，幫助倉庫從 Excel 管理升級到可追蹤的倉儲系統。',
    keywords: ['WMS', '倉儲管理系統', '庫存管理', '儲位編碼', '條碼盤點', '出入庫管理'],
    href: '/blog/topics/wms',
    productHref: '/products/wms',
    productName: 'WMS 倉儲管理系統',
    ctaLabel: '看 WMS 產品',
  },
  {
    slug: 'miaotong',
    productKey: 'miaotong',
    title: '宮廟管理系統與廟通指南',
    navTitle: '宮廟管理',
    description: '彙整點燈系統、安太歲、牌位管理、收據、法會報名、LINE Pay 與信眾資料管理文章，給宮廟數位轉型前的完整參考。',
    keywords: ['宮廟管理系統', '廟務系統', '點燈系統', '廟通', '安太歲系統', '牌位管理', '信眾管理'],
    href: '/blog/topics/miaotong',
    productHref: '/products/miaotong',
    productName: '廟通宮廟管理系統',
    ctaLabel: '看廟通產品',
  },
  {
    slug: 'erp',
    productKey: 'erp',
    title: 'ERP 財務與 AI 對帳指南',
    navTitle: 'ERP 財務對帳',
    description: '整理 ERP、請款、OCR、物流財務、銀行對帳與 AI 對帳文章，協助企業把財務作業從人工核對改成可稽核流程。',
    keywords: ['ERP', '財務系統', 'AI 對帳', 'OCR 請款', '銀行對帳', '物流財務'],
    href: '/blog/topics/erp',
    productHref: '/products/erp',
    productName: 'ERP 財務管理系統',
    ctaLabel: '看 ERP 產品',
  },
]

export function getBlogTopic(slug: string): BlogTopic | null {
  return BLOG_TOPICS.find((topic) => topic.slug === slug) ?? null
}
