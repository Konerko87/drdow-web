# Changelog

所有版本變更紀錄。每個版本對應一個 git commit，可用 `git revert` 回滾。

---

## v1.2.0 — 2026-04-27
### 變更內容
- 新增 middleware 攔截惡意爬蟲（AI 訓練爬蟲、SEO 掃描器、攻擊工具），回傳 tarpit 浪費其資源
- robots.txt 改為僅允許 Google/Bing/DuckDuckGo，封鎖 GPTBot/ClaudeBot/Bytespider 等 30+ 惡意爬蟲
- llms.txt 端點改為回傳 403，不再主動提供商業資料
- 所有頁面加上 `X-Robots-Tag: noai, noimageai` 防止 AI 訓練索引
- 無 user-agent 的 API 請求直接回 403

### 影響檔案
- src/middleware.ts（新增）
- src/app/robots.ts
- src/app/llms.txt/route.ts

### 回滾指令
git revert <commit-hash>

---

## v1.1.1 — 2026-04-27
### 變更內容
- 聯絡表單新增三層防護：IP rate limiting（每小時 5 次）、攻擊 payload 偵測（SQL injection / XSS）、Cloudflare Turnstile 驗證碼（選配）
- 可疑提交靜默攔截不寄信，避免垃圾信淹沒信箱
- Turnstile 為 opt-in，設定 `TURNSTILE_SECRET_KEY` + `NEXT_PUBLIC_TURNSTILE_SITE_KEY` 即啟用

### 影響檔案
- src/app/api/contact/route.ts
- src/components/sections/contact-form.tsx

### 回滾指令
git revert <commit-hash>

---

## v1.1.0 — 2026-04-17
### 變更內容
- Admin 後台新增「廣告成效」Tab，整合 Google Ads 數據
- 透過 GA4 API 拉取廣告花費、點擊、曝光、CPC、CTR、轉換
- 顯示：摘要卡片、每日趨勢雙層圖、廣告活動明細、關鍵字成效
- 新增 API 端點 `/api/admin/google-ads`

### 影響檔案
- src/app/admin/page.tsx
- src/app/api/admin/google-ads/route.ts（新增）

### 回滾指令
git revert <commit-hash>

---

## v1.0.0 — 2026-04-14
### 變更內容
- 以目前線上版本為基準，建立版本管理制度
- 首頁：廟通主打，LINE Pay 線上點燈為核心賣點
- 產品頁：TMS / ERP / 廟通
- 部落格：47 篇文章 + 置頂功能
- ERP 功能導覽頁：37 張系統截圖
- OG 圖片改為廟通 logo 白底

### 影響檔案
- 全站

### 對應 commit
bbf8dc5
