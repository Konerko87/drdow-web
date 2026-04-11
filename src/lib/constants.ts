export const SITE = {
  name: 'Dr.Dow AI',
  tagline: '宮廟管理，智慧升級。',
  description: '廟通——專為台灣宮廟打造的智慧管理系統。信徒管理、點燈牌位、捐款收據、法會報名、發財金借還、LINE 行動服務，一套搞定。',
  url: 'https://drdowai.com',
  email: 'kevin@st-logistics.com.tw',
  company: 'Dr.Dow AI Ltd.',
} as const

export const NAV_LINKS = [
  { label: '產品', href: '#products', children: [
    { label: '廟通 宮廟管理', href: '/products/miaotong', description: '信徒管理、點燈牌位、捐款收據、法會報名' },
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
  miaotong: {
    name: 'Dr.Dow 廟通',
    fullName: '智慧宮廟管理系統',
    tagline: '宮廟管理，智慧升級',
    description: '專為台灣宮廟打造的一站式管理平台。整合信徒管理、點燈牌位、捐款收據、法會活動、發財金借還、會計報表與 LINE 行動服務。',
    features: [
      { icon: '🙏', title: '信徒管理', desc: '完整信徒與戶籍資料管理，家庭關係、服務紀錄、捐款歷程一目了然。' },
      { icon: '🏮', title: '點燈牌位服務', desc: '點燈、安太歲、牌位、進塔一站整合。受益人、燈位、期間自動管理。' },
      { icon: '💰', title: '捐款收據管理', desc: '具名 / 匿名捐款即時入帳，收據自動產生。日結、對帳一次搞定。' },
      { icon: '📋', title: '法會活動管理', desc: '法會報名、繳費、桌次安排、QR Code 報到全整合。' },
      { icon: '🪙', title: '發財金借還', desc: '擲筊流程數位化，借金規則、額度、黑名單、還金追蹤全系統管理。' },
      { icon: '📊', title: '會計財務報表', desc: '收支管理、傳票、會計科目、預算控管、審核簽核。' },
      { icon: '📱', title: 'LINE 行動服務', desc: '信眾免下載 App，直接用 LINE 線上點燈、法會報名、捐款查詢。' },
      { icon: '🔒', title: '角色權限與稽核', desc: '依角色設定操作權限，所有異動留稽核日誌。' },
    ],
  },
} as const

export const STATS = [
  { value: '8', label: '大功能模組' },
  { value: '100%', label: '雲端化管理' },
  { value: 'LINE', label: '信眾直接用' },
  { value: '2 週', label: '快速導入' },
  { value: '24/7', label: '系統不間斷' },
  { value: '0', label: '需要下載 App' },
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
    before: '信徒資料散落在 Excel、紙本、不同人的電腦裡',
    after: '信徒資料集中管理，家庭關係、捐款紀錄、服務歷程一站查詢',
    icon: '📄',
  },
  {
    before: '點燈、牌位、安太歲每年重來一次，資料容易搞混',
    after: '受益人、燈位、年度自動帶入，不用重新 key',
    icon: '🏮',
  },
  {
    before: '捐款收據手開容易錯，月底對帳總是對不起來',
    after: '捐款即時入帳、收據自動產生、日結對帳一鍵完成',
    icon: '🧾',
  },
  {
    before: '法會報名用電話登記，到場才發現桌次不夠',
    after: '線上報名、自動分桌、QR Code 報到，人到就知道坐哪',
    icon: '📞',
  },
  {
    before: '發財金借還靠手寫，借了多少、還了沒有根本查不到',
    after: '借金數位化，擲筊流程、額度規則、還金追蹤系統管理',
    icon: '🪙',
  },
  {
    before: '委���會想看報表，會計要花一週整理',
    after: '即時財務報表、收支明細、預算執行率，隨時查看',
    icon: '🔍',
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
