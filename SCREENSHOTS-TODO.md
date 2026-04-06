# Dr.Dow AI 網站截圖清單

截圖完成後放到 `/Users/kevin/Desktop/drdow-web/public/screenshots/` 資料夾。
檔名必須完全一致，網站會自動讀取。

---

## TMS 系統截圖（6 張）

從 https://logistics-tms-production.up.railway.app 登入後截取。

### 1. tms-dispatch.png
- **頁面**：派車 → 車找任務模式
- **要求**：全螢幕截圖，左邊任務池有任務分組，右邊有幾台車已指派，容量條可見
- **尺寸**：寬度至少 1920px

### 2. tms-focus.png
- **頁面**：派車 → 點一台有任務的車進入專注模式
- **要求**：顯示路線提示（如 450 → 楊梅區 → 蘆竹區）和趟次內的任務列表
- **尺寸**：寬度至少 1920px

### 3. tms-table.png
- **頁面**：派車 → 切到「表格模式」
- **要求**：顯示已派（綠底）和未派（黃底下拉）的混合表格
- **尺寸**：寬度至少 1920px

### 4. tms-kpi.png
- **頁面**：分析 → 第一個分頁「總覽」
- **要求**：截取完整的 6 個 KPI 卡片 + 成本分解 + 區域分布 + 每日趨勢圖
- **尺寸**：寬度至少 1920px

### 5. tms-fleet.png
- **頁面**：車隊 → 車輛維護 → 選一台有維修紀錄的車（如 KLE-9568）
- **要求**：點「維修歷史」tab，顯示藍/橘/綠分類標籤和篩選按鈕
- **尺寸**：寬度至少 1920px

### 6. tms-driver-app.png
- **頁面**：用 Chrome DevTools 手機模擬（iPhone 14 Pro），開司機 LINE LIFF App
- **要求**：任務列表畫面，確保有「提貨回倉」橘色標籤可見
- **尺寸**：手機尺寸 390x844

---

## ERP 系統截圖（6 張）

從 https://erp-production.up.railway.app 登入後截取（或用實際 ERP 網址）。

### 7. erp-boss.png
- **頁面**：/boss（Boss App 總覽）
- **要求**：用 Chrome DevTools 手機模擬（iPhone 14 Pro），顯示收款進度、待審核數字、今日動態
- **尺寸**：手機尺寸 390x844

### 8. erp-ocr.png
- **頁面**：/ap/invoices/new（AI OCR 上傳請款）
- **要求**：上傳一張發票照片後，顯示 AI 辨識結果（廠商名、金額、明細已自動填入）
- **尺寸**：寬度至少 1920px

### 9. erp-payments.png
- **頁面**：/ap/pending-payments（待匯款）
- **要求**：展開一筆待匯款，顯示完整照片、明細、備註、確認按鈕
- **尺寸**：寬度至少 1920px

### 10. erp-bank.png
- **頁面**：/boss/bank（月度收款對帳）
- **要求**：顯示按客戶分組的收款狀況，有已比對/疑似/未比對的狀態
- **尺寸**：寬度至少 1920px

### 11. erp-salary.png
- **頁面**：/boss/salary（薪資排行）
- **要求**：用 Chrome DevTools 手機模擬，顯示司機薪資排行列表
- **尺寸**：手機尺寸 390x844

### 12. erp-vendor.png
- **頁面**：/vendor-portal/payments（廠商付款追蹤）
- **要求**：用 Chrome DevTools 手機模擬，顯示付款狀態追蹤（進度條、預計撥款日）
- **尺寸**：手機尺寸 390x844

---

## 截圖技巧

- 桌面截圖：Chrome 全螢幕（F11），用 Cmd+Shift+4 或截圖工具
- 手機模擬：Chrome → F12 → 左上角手機圖示 → 選 iPhone 14 Pro (390x844)
- 確保畫面有真實數據（不要空白畫面）
- 存檔格式：PNG
- 如果畫面太長需要捲動，截最重要的上半部即可

## 完成後

12 張截圖全部放到 `/Users/kevin/Desktop/drdow-web/public/screenshots/` 後，
通知 Kevin，他會重新部署讓截圖上線。
