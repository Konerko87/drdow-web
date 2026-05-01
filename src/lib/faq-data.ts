export type FAQItem = {
  question: string
  answer: string
}

export type FAQCategory = {
  key: 'miaotong' | 'tms' | 'wms' | 'erp' | 'general'
  category: string
  accent?: string
  items: FAQItem[]
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    key: 'miaotong',
    category: '廟通 宮廟管理系統',
    accent: '#B91C1C',
    items: [
      {
        question: '廟通適合哪些類型的宮廟？',
        answer: '不論是大型宮廟、中小型廟宇或新建宮廟，只要有管理信徒、點燈、捐款、法會、財務等需求，都適合使用。系統可依宮廟規模彈性調整。',
      },
      {
        question: '可以只先導入部分功能嗎？',
        answer: '可以。廟通採模組化設計，你可以先從最急需的功能（如點燈牌位或捐款管理）開始，之後再逐步擴充其他模組，不需要一次買全套。',
      },
      {
        question: '能不能依照我們廟的流程調整？',
        answer: '可以。我們理解每間宮廟的作業流程不同，系統支援流程客製化，確保符合你們的實際需求。',
      },
      {
        question: '信眾一定要下載 App 嗎？',
        answer: '不用。信眾透過 LINE 就能使用線上點燈、法會報名、紀錄查詢等服務，不需要額外下載任何 App。',
      },
      {
        question: '發財金借還也可以管理嗎？',
        answer: '可以。系統支援完整的借金流程，包含擲筊紀錄、借金規則、額度控管、黑名單與還金追蹤。',
      },
      {
        question: '舊資料能不能匯入？',
        answer: '可以。我們協助將現有的 Excel 或紙本資料批次匯入系統，確保歷史資料不遺失。',
      },
      {
        question: '廟通導入需要多久？',
        answer: '入門版最快 1 週可上線，專業版約 2 週。我們會協助資料匯入、人員教育訓練和上線後的技術支援。',
      },
      {
        question: '線上點燈搭配 LINE Pay 怎麼運作？',
        answer: '信徒在 LINE 內選擇燈別、家人、年限後直接以 LINE Pay 付款，金流入帳後系統自動建立燈位、寄收據、回填會計，廟方在後台看到一筆完整紀錄，不再有「先收錢後對帳」的時間差。',
      },
      {
        question: '香客代辦家人點燈會出錯嗎？',
        answer: '不會。家人代辦使用「家人小卡」設計，每個家人是獨立資料卡片，可重複沿用、家族共用，避免每年重新輸入錯誤。爸媽資料一次建好，下次過年點燈直接套用。',
      },
    ],
  },
  {
    key: 'tms',
    category: 'TMS 物流派車系統',
    items: [
      {
        question: '什麼是 TMS（運輸管理系統）？跟 Excel 派車有什麼差別？',
        answer: 'TMS（Transport Management System）是專門管理運輸調度的軟體系統。跟 Excel 派車最大的差別是：TMS 能自動規劃路線、即時追蹤車輛位置、自動計算薪酬，而 Excel 需要人工一筆一筆處理。Dr.Dow TMS 更進一步用 AI 做智慧派車，支援拖拉指派和自動填滿，一個調度員就能管理 40+ 台車。',
      },
      {
        question: '司機需要裝 App 嗎？',
        answer: '不用。Dr.Dow TMS 的司機端是用 LINE LIFF 技術打造的，直接在 LINE 裡面操作。司機不需要下載任何 App，也不需要學新軟體。',
      },
      {
        question: 'Dr.Dow TMS 跟 SAP TM 或 Oracle TMS 有什麼差別？',
        answer: 'SAP TM 和 Oracle TMS 是為大型企業設計的，導入成本高（數百萬起）、時間長（半年以上）。Dr.Dow TMS 專為台灣中小物流公司打造：中文介面、LINE 整合、台灣銀行對帳、在地計費邏輯，而且導入只需要 1-2 週。',
      },
      {
        question: 'GPS 追蹤需要在每台車上裝設備嗎？',
        answer: '不需要額外硬體。司機 LINE App 在執行任務時自動回傳位置，調度員端即可看到即時車輛地圖。如果車隊已有車機，也支援第三方 GPS 平台串接。',
      },
      {
        question: '派車板可以多個調度員同時操作嗎？',
        answer: '可以。系統支援多使用者同時操作，所有變動即時同步，避免兩人重複指派同一台車。每筆操作都有紀錄，誰改的、什麼時候改的、改前是什麼一目了然。',
      },
      {
        question: '司機薪酬怎麼自動計算？',
        answer: '可依板數、里程、固定薪、抽成、加班費等多種公式組合計算。每筆任務完成後系統自動累計，月底直接出對帳單，免去 Excel 手動加總和爭議。',
      },
      {
        question: 'TMS 跟 WMS、ERP 怎麼串接？',
        answer: 'TMS 接收 WMS 出貨單做派車，完成後把運費資料推給 ERP 計算應收應付。三套系統共用同一筆事實來源，不再 Excel 來回 copy paste。',
      },
    ],
  },
  {
    key: 'wms',
    category: 'WMS 倉儲管理系統',
    items: [
      {
        question: '什麼是 WMS（倉儲管理系統）？',
        answer: 'WMS（Warehouse Management System）是用來管理入庫、出庫、庫存、儲位與盤點的系統。Dr.Dow WMS 透過條碼掃描、即時庫存與任務派發，讓倉庫不再靠紙本或人工喊話追資料。',
      },
      {
        question: 'WMS 跟 ERP 有什麼差別？',
        answer: 'ERP 看得到「應該有多少庫存」（會計帳上的數字），WMS 管的是「實際在哪個儲位有多少」（現場真實狀況）。ERP 庫存與實際倉儲常因現場進出沒記錄而對不起來，WMS 補上現場那一段，讓帳面與實況同步。',
      },
      {
        question: 'WMS 可以跟 TMS 和 ERP 串接嗎？',
        answer: '可以。WMS 的出貨資料可推送到 TMS 做派車，收貨、領料或庫存異動也能與 ERP 財務流程串接，讓倉儲、派車與對帳使用同一筆事實來源。',
      },
      {
        question: '現場人員一定要使用電腦嗎？',
        answer: '不用。現場作業可用手機或 PDA 掃碼完成入庫、揀貨、出庫與盤點，主管則可在電腦查看儀表板與異常報表。',
      },
      {
        question: '倉庫沒有 wifi 訊號好怎麼辦？',
        answer: '系統支援離線作業：手機暫存掃碼資料，回到訊號區自動同步。低訊號區的高架倉、冷凍倉都可以用。',
      },
      {
        question: '條碼是用什麼規格？要重貼嗎？',
        answer: '支援 EAN-13、Code 128、QR Code 等常見規格。如果商品已有條碼，直接套用；沒有的話我們協助設計流通條碼或棧板循環容器條碼。',
      },
      {
        question: '多倉庫、多儲位、不同品項可以管理嗎？',
        answer: '可以。系統設計就是多倉、多儲位、多品項。常溫倉、冷凍倉、半成品倉都能分開管理，總部一頁看所有倉庫即時庫存。',
      },
    ],
  },
  {
    key: 'erp',
    category: 'ERP 物流財務系統',
    items: [
      {
        question: 'AI OCR 辨識發票的準確率有多高？',
        answer: 'Dr.Dow ERP 使用 Claude Vision AI 進行兩段式辨識，目前準確率達 95% 以上。即使辨識有誤，系統也會標記讓人工確認，不會直接過帳。',
      },
      {
        question: '銀行自動對帳怎麼運作？安全嗎？',
        answer: '系統每天早上自動登入企業網銀，用 AI 辨識驗證碼後抓取交易明細，再自動比對應收帳款。所有銀行帳密都經過加密儲存，系統只讀取明細，不會執行任何轉帳操作。',
      },
      {
        question: '六層付款防呆具體是什麼？',
        answer: '六層防呆：(1) 資料庫約束防重複建立 (2) 照片 SHA-256 hash 辨識重複發票 (3) 金額/日期異常軟警告 (4) 老闆手機審核 (5) API 冪等性防重複提交 (6) 老闆娘逐筆確認後才匯款。',
      },
      {
        question: '我們已經有用 ERP 軟體了，還需要 Dr.Dow ERP 嗎？',
        answer: 'Dr.Dow ERP 不是要取代你現有的會計總帳系統，而是補上「拍照請款 → 銀行對帳 → 付款審核」這條最容易出錯、最費人力的鏈路。可以與既有 ERP 串接，把對好帳的資料寫回原系統。',
      },
      {
        question: '可以只用 OCR 請款不買全套嗎？',
        answer: '可以。Dr.Dow ERP 模組化銷售，OCR 請款、銀行對帳、廠商 Portal、老闆 App 可分開導入。多數客戶從最痛的 OCR 請款開始，之後再加銀行對帳。',
      },
      {
        question: '廠商 Portal 是讓廠商自己上傳請款單嗎？',
        answer: '是的。廠商透過專屬 Portal 自助上傳請款單，系統自動 OCR + 比對合約 + 提交審核流程。對廠商方便（不用 LINE 來回傳照片），對你方便（資料自動進系統，不用人工 key 入）。',
      },
    ],
  },
  {
    key: 'general',
    category: '導入與價格',
    items: [
      {
        question: '系統要多少錢？',
        answer: '價格依產品和需求而定。廟通和物流系統都提供多種方案，歡迎預約諮詢，我們會根據您的實際需求提供報價。',
      },
      {
        question: '可以先試用嗎？',
        answer: '可以。我們提供免費試用，不需要信用卡。試用期間包含完整功能和技術支援。預約 Demo 後，我們會幫您開好試用環境。',
      },
      {
        question: '資料放在哪裡？安全嗎？',
        answer: '系統部署在雲端平台，使用 PostgreSQL 資料庫，每日自動備份。所有傳輸都走 HTTPS 加密，敏感資料額外加密儲存。',
      },
      {
        question: '導入需要多久？',
        answer: '依產品與資料複雜度而定：廟通入門版 1 週、TMS / WMS / ERP 多數客戶 2-4 週可上線。我們會排專人協助資料匯入、人員訓練與上線後支援。',
      },
      {
        question: '可以客製功能嗎？',
        answer: '主要功能模組已就緒，可依客戶需求微調流程、欄位、權限、報表。大幅度客製需另行報價。建議先預約 Demo 評估標準功能是否已涵蓋你的需求。',
      },
    ],
  },
]

/** Get FAQ items for a specific product, plus shared general items */
export function getProductFAQ(productKey: 'miaotong' | 'tms' | 'wms' | 'erp'): FAQItem[] {
  const productItems = FAQ_CATEGORIES.find((c) => c.key === productKey)?.items || []
  const generalItems = FAQ_CATEGORIES.find((c) => c.key === 'general')?.items || []
  return [...productItems, ...generalItems]
}
