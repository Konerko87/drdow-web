export const SITE = {
  name: 'Dr.Dow AI',
  tagline: 'Systems that think for you.',
  description: '用 AI 替傳統產業打造會思考的企業系統。物流派車、財務管理、自動對帳，一站搞定。',
  url: 'https://drdowai.com',
  email: 'kevin@st-logistics.com.tw',
  company: 'Dr.Dow AI Ltd.',
} as const

export const NAV_LINKS = [
  { label: '產品', href: '#products', children: [
    { label: 'TMS 派車系統', href: '/products/tms', description: 'AI 智慧派車、司機 LINE App、GPS 追蹤' },
    { label: 'ERP 財務系統', href: '/products/erp', description: 'AI OCR 請款、銀行自動對帳、付款防呆' },
  ]},
  { label: '解決方案', href: '/solutions' },
  { label: '價格', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: '部落格', href: '/blog' },
  { label: '關於我們', href: '/about' },
] as const

export const PRODUCTS = {
  tms: {
    name: 'Dr.Dow TMS',
    fullName: '物流派車 AI 系統',
    tagline: '物流派車，一鍵搞定',
    description: '從 WMS 匯入到薪酬結算，一套系統管理派車、司機、車隊、棧板、GPS 追蹤和財務串接。',
    features: [
      { icon: '🚛', title: '智慧派車板', desc: '拖拉指派、自動填滿、表格模式三種操作。按地區分組、容量即時計算。' },
      { icon: '📱', title: '司機 LINE App', desc: '不用裝 App，直接在 LINE 裡操作。任務清單、GPS 打卡、拍照回報。' },
      { icon: '💰', title: '薪酬自動計算', desc: '北區/中南區/轉運三種計費邏輯。保底薪資、客戶規則全自動。' },
      { icon: '📡', title: 'GPS 即時追蹤', desc: '每 2 分鐘更新車輛位置。軌跡回放、速度監控、地理圍欄。' },
      { icon: '🔧', title: '車隊維護管理', desc: '保養排程、驗車提醒、報修 AI 解析。維修/耗材/保養分類。' },
      { icon: '📊', title: '營運分析 KPI', desc: '裝載率、準時率、每板成本、車輛 TCO、司機績效。10+ 維度分析。' },
      { icon: '📦', title: 'WMS 自動串接', desc: '每日自動爬取訂單。智慧路線規劃、跨區轉運拆單。' },
      { icon: '🏗️', title: '棧板全程追蹤', desc: '三倉庫存即時同步。司機出板/入板/歸還全紀錄。' },
      { icon: '🔗', title: 'ERP 財務串接', desc: 'Webhook 雙向即時串接，SSO 統一身份。' },
    ],
  },
  erp: {
    name: 'Dr.Dow ERP',
    fullName: '物流財務 AI 系統',
    tagline: '物流財務，AI 自動管',
    description: 'AI 拍照請款、銀行自動對帳、六層付款防呆。讓老闆、老闆娘、廠商都省心的財務系統。',
    features: [
      { icon: '📸', title: 'AI 拍照請款', desc: '廠商拍照上傳發票，AI 自動辨識廠商、金額、明細，準確率 95%+。' },
      { icon: '🏦', title: '銀行自動對帳', desc: '每天 6:00 自動登入企業網銀，AI 辨識驗證碼，抓取明細自動比對。' },
      { icon: '👔', title: '老闆行動 App', desc: 'iOS 風格手機介面，收款進度、一鍵審核、薪資排行、油料總覽。' },
      { icon: '🛡️', title: '六層付款防呆', desc: 'DB 約束、照片 hash、軟警告、Boss 審核、API 冪等性、逐筆確認。' },
      { icon: '🏪', title: '廠商自助 Portal', desc: 'LINE 登入，廠商自行送請款單、追蹤審核進度、查看撥款狀態。' },
      { icon: '⛽', title: '加油卡即時串接', desc: '鉅泰加油卡 API，自動同步加值金額、車輛油耗排行。' },
      { icon: '📑', title: '財務報表', desc: '月度損益、AP/AR 帳齡分析、預算控管、Excel 匯出。' },
      { icon: '💵', title: '薪資管理', desc: 'CSV 上傳 + TMS 司機自動同步，勞健保勞退一目了然。' },
    ],
  },
} as const

export const STATS = [
  { value: '40+', label: '管理車輛' },
  { value: '6', label: '層付款防呆' },
  { value: '3', label: '家銀行串接' },
  { value: '95%+', label: 'OCR 準確率' },
  { value: '513', label: '筆自動比對' },
  { value: '24/7', label: '系統不間斷' },
] as const

export const WORKFLOW_STEPS = [
  { icon: '📦', title: 'WMS 匯入', desc: '自動爬取訂單' },
  { icon: '🛣️', title: 'AI 路線規劃', desc: '智慧拆單分區' },
  { icon: '🚛', title: '拖拉派車', desc: '一鍵指派司機' },
  { icon: '📱', title: 'LINE 執行', desc: '司機即時接單' },
  { icon: '💰', title: '薪酬結算', desc: 'AI 自動計算' },
  { icon: '🏦', title: '銀行對帳', desc: '爬蟲自動比對' },
] as const

export const PAIN_POINTS = [
  {
    before: '還在用 Excel 排派車？',
    after: 'AI 自動規劃路線，拖拉指派 10 台車只要 10 秒',
    icon: '📋',
  },
  {
    before: 'LINE 群組訊息找不到？',
    after: '司機在 LINE App 裡操作，所有紀錄自動歸檔',
    icon: '💬',
  },
  {
    before: '月底對帳對到崩潰？',
    after: '銀行爬蟲每天 6:00 自動抓明細，AI 比對到帳',
    icon: '😰',
  },
] as const

export const TECH_STACK = [
  'Next.js',
  'Claude AI',
  'LINE',
  'PostgreSQL',
  'Railway',
  'Playwright',
  'Prisma',
  'TypeScript',
] as const
