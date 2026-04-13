export const SITE = {
  name: 'Dr.Dow AI 廟通',
  tagline: '真正懂宮廟流程的智慧營運平台',
  description: '整合櫃檯受理、點燈管理、法會活動、捐款收據與 LINE 信徒查詢的宮廟營運系統。真正懂宮廟流程，讓櫃檯更快、信徒查得到、行政做得完。',
  url: 'https://drdowai.com',
  email: 'kevin@st-logistics.com.tw',
  phone: '0922617117',
  company: 'Dr.Dow AI Ltd.',
} as const

export const NAV_LINKS = [
  { label: '產品', href: '#products', children: [
    { label: '廟通 宮廟管理', href: '/products/miaotong', description: '信徒管理、點燈牌位、捐款收據、法會報名' },
    { label: 'TMS 派車系統', href: '/products/tms', description: 'AI 智慧派車、司機 LINE App、GPS 追蹤' },
    { label: 'ERP 財務系統', href: '/products/erp', description: 'AI OCR 請款、銀行自動對帳、付款防呆' },
  ]},
  { label: '功能介紹', href: '#features' },
  { label: '部落格', href: '/blog' },
  { label: '聯絡我們', href: '/contact' },
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
    tagline: '真正懂宮廟流程的智慧營運平台',
    description: '整合櫃檯受理、點燈管理、法會活動、捐款收據與 LINE 信徒查詢的宮廟營運系統。真正懂宮廟流程，讓櫃檯更快、信徒查得到、行政做得完。',
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

export const PAIN_POINTS = [
  {
    icon: '⏰',
    title: '櫃檯忙不過來',
    desc: '點燈、法會、捐款、發財金分散在不同本子和系統，信徒排隊等，櫃檯人員切來切去。',
  },
  {
    icon: '📞',
    title: '信徒一直打電話來問',
    desc: '「我的光明燈在哪？」「收據可以補印嗎？」「法會什麼時候？」每天重複回答一樣的問題。',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: '幫全家人辦，每次都要重填',
    desc: '阿公幫孫子點燈、媽媽幫全家報法會，每次都要從頭填一遍資料。',
  },
  {
    icon: '📄',
    title: '收據、字卡、名冊散在各處',
    desc: 'Word 做字卡、Excel 記帳、手寫收據⋯⋯年底結算才發現兜不起來。',
  },
  {
    icon: '💸',
    title: '線上點燈還是要人工查匯款',
    desc: '信徒填了表單、匯了款，廟方還是得一筆一筆核對，漏單、對不上時有所聞。',
  },
  {
    icon: '⚙️',
    title: '多套系統反而更複雜',
    desc: 'A 廠商管一區、B 廠商管另一區、舊燈位還在紙本，廟方要同時對好幾套流程。',
  },
] as const

export const STATS = [
  { value: '14', label: '功能模組' },
  { value: '3', label: '端整合' },
  { value: '100%', label: '台灣在地開發' },
  { value: 'LINE', label: '免安裝直接用' },
  { value: '0', label: '需要下載 App' },
  { value: '24/7', label: '系統不間斷' },
] as const

export const LINE_PAY_STEPS = [
  { step: 1, title: '選擇燈種', desc: '多種燈種可選，金額清楚', image: '/screenshots/liff-light-order-1.png' },
  { step: 2, title: '填寫資料', desc: '受益人資料一次填好', image: '/screenshots/liff-light-order-2-form.png' },
  { step: 3, title: '家人代辦', desc: '幫家人一起點燈，直接選人', image: '/screenshots/liff-light-order-3-family.png' },
  { step: 4, title: 'LINE Pay 付款', desc: '付款完成，收據自動產生', image: '/screenshots/liff-light-order-4-personal.png' },
] as const

export const FEATURE_MODULES = [
  { icon: '🙏', name: '信徒管理' },
  { icon: '🏮', name: '點燈管理' },
  { icon: '📋', name: '法會活動' },
  { icon: '🧾', name: '捐款收據' },
  { icon: '🪙', name: '發財金' },
  { icon: '📁', name: '文件中心' },
  { icon: '📊', name: '會計帳務' },
  { icon: '🤝', name: '志工排班' },
  { icon: '👤', name: '人事管理' },
  { icon: '📈', name: '報表分析' },
  { icon: '⚙️', name: '系統設定' },
  { icon: '📱', name: 'LINE 行動端' },
] as const

export const FEATURE_TAGS = [
  { name: 'LINE Pay 線上點燈', highlight: true },
  { name: '家庭代辦', highlight: false },
  { name: '電子收據', highlight: false },
  { name: '字卡列印', highlight: false },
  { name: '疏文產生', highlight: false },
  { name: '櫃檯快速受理', highlight: false },
  { name: '發財金擲筊', highlight: false },
  { name: '法會報名', highlight: false },
  { name: 'QR 報到', highlight: false },
  { name: 'LINE 推播', highlight: false },
  { name: '信徒主檔', highlight: false },
  { name: '捐款管理', highlight: false },
  { name: '收據補印', highlight: false },
  { name: '文件工作台', highlight: false },
  { name: '會計傳票', highlight: false },
  { name: '預算管理', highlight: false },
  { name: '志工排班', highlight: false },
  { name: '人事出勤', highlight: false },
  { name: '稽核日誌', highlight: false },
  { name: '報表分析', highlight: false },
  { name: '匯入匯出', highlight: false },
  { name: '角色權限', highlight: false },
] as const

export const BEFORE_AFTER = [
  { before: '線上點燈要填表單、匯款、人工核對', after: 'LINE Pay 直接付款，系統自動確認', highlight: true },
  { before: '幫家人辦事每次重填資料', after: '家庭代辦一次搞定', highlight: false },
  { before: '收據手寫、補印找半天', after: '電子收據自動產生，LINE 裡查', highlight: false },
  { before: '法會通知靠人工打電話', after: 'LINE 推播一鍵送達', highlight: false },
  { before: '多套系統切來切去', after: '一個平台全部搞定', highlight: false },
  { before: '年底對帳花三天', after: '報表直接跑出來', highlight: false },
] as const

// Keep for TMS/ERP pages
export const WORKFLOW_STEPS = [
  { icon: '📦', title: 'WMS 匯入', desc: '自動爬取訂單' },
  { icon: '🛣️', title: 'AI 路線規劃', desc: '智慧拆單分區' },
  { icon: '🚛', title: '拖拉派車', desc: '一鍵指派司機' },
  { icon: '📱', title: 'LINE 執行', desc: '司機即時接單' },
  { icon: '💰', title: '薪酬結算', desc: 'AI 自動計算' },
  { icon: '🏦', title: '銀行對帳', desc: '爬蟲自動比對' },
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
