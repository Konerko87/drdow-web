# Changelog

所有版本變更紀錄。每個版本對應一個 git commit，可用 `git revert` 回滾。

---

## v1.6.0 — 2026-05-01
### 變更內容
- 階段 B：首頁 metadata 從廟通主打改成 Dr.Dow AI 多產品母品牌定位
  - title：`Dr.Dow AI｜宮廟、物流、倉儲與財務 AI 管理系統`
  - description：涵蓋廟通 / TMS / WMS / ERP 四產品
  - keywords：補 `Dr.Dow AI`、`TMS`、`WMS`、`ERP`、`物流系統`、`倉儲系統`、`AI管理系統`
- 首頁 CTA variant 從 `temple` 改 `generic`，與多產品 metadata 一致
- 註：首頁 Hero 與廟通專屬 sections（LinePayFlow / FamilyProxy / CounterOps / LightManagement / ReceiptsDocs / FortuneMoney / FeatureModules / BeforeAfter）依 brief 第 412-414 行「架構保留」維持不動

### 影響檔案
- src/app/page.tsx

### SEO 影響評估
- title 改變會觸發 Google 重新索引，短期排名可能波動
- 廟通 SEO 流量主要來自 `/products/miaotong` 產品頁與 blog，首頁 title 改變影響有限
- 首頁將開始爭取 `Dr.Dow AI`、`AI 管理系統`、`物流系統`、`倉儲系統` 等多產品關鍵字

### 後續可選工作（未在本次 commit 內）
- Hero 改成多產品輪播或 4 產品並列
- 拿掉首頁的廟通深度區塊，移到 `/products/miaotong`（產品頁已有對應內容）
- 評估首頁 Google Ads 出價策略（從廟通單一改為多產品）

### 回滾指令
```bash
git revert <this-commit-hash>
```

---

## v1.5.0 — 2026-04-30
### 變更內容
- 母品牌轉型：`SITE.name` 從 `廟通` 改成 `Dr.Dow AI`，tagline / description 改成多產品母品牌定位
- WebSite JSON-LD（`layout.tsx`）改用 `SITE.name` + alternateName `Dr.Dow AI 產業管理系統`
- `<CTASection>` 加 `variant` prop（`generic` / `temple` / `logistics`），CTA 文案依頁面切換不再全站講廟務
- Footer 品牌文案從「為宮廟量身打造」改成「為現場營運打造的 AI 管理系統」，logo alt 改成 `Dr.Dow AI logo`
- TMS 頁「其他產品」改推 WMS / ERP（移除廟通），標題改「物流產業線其他產品」
- ERP 頁「其他產品」改推 TMS / WMS（移除廟通），標題改「物流產業線其他產品」
- TMS / WMS / ERP 頁套用 `<CTASection variant="logistics" />`
- FAQ 新增「WMS 倉儲管理系統」分類（3 題），metadata title / description / keywords 補 WMS
- Pricing 物流方案 Title 改 `TMS / WMS / ERP 物流營運系統`，專業版 / 企業版加入 WMS 功能項，metadata + JSON-LD 同步
- Contact 頁與 contact-form placeholder 補 WMS：metadata description、Demo 包含項、表單 placeholder
- 修 OG fallback 404：`metadata.ts` 預設 OG 從 `/og/default.png`（不存在）改成 `/opengraph-image`（動態產生）
- `opengraph-image.tsx` 改成母品牌版面：Dr.Dow AI / 宮廟 · 物流 · 倉儲 · 財務 AI 管理系統 / 廟通 · TMS · WMS · ERP
- 首頁 / about / solutions / pricing / faq 套用對應 variant（home=temple、其他=generic）

### 影響檔案
- src/lib/constants.ts
- src/lib/metadata.ts
- src/app/layout.tsx
- src/app/page.tsx
- src/app/opengraph-image.tsx
- src/app/about/page.tsx
- src/app/solutions/page.tsx
- src/app/pricing/page.tsx
- src/app/faq/page.tsx
- src/app/contact/page.tsx
- src/app/products/tms/page.tsx
- src/app/products/wms/page.tsx
- src/app/products/erp/page.tsx
- src/components/layout/footer.tsx
- src/components/sections/cta-section.tsx
- src/components/sections/contact-form.tsx

### 階段策略
本次採 Phase A：保留首頁 Hero 與 metadata 為廟通主打，僅修品牌 / CTA / footer / 產品頁互推 / FAQ / Pricing / Contact / OG。
未來如要 Phase B 改成 Dr.Dow AI 多產品首頁 metadata，再進入 v1.6.0。

### 回滾指令
```bash
git revert <this-commit-hash>
```

---

## v1.4.0 — 2026-04-30
### 變更內容
- 產品線並存策略：首頁從廟通單一主打改為「廟通主打 + 多產品入口」過渡架構
- 新增 `SceneSelector` 場景選擇 section（4 場景：宮廟 / TMS 派車 / WMS 倉儲 / ERP 財務），插在 Hero 之後
- 重接 `ProductCards` 到首頁（Numbers 之後、CTA 之前），改造支援 4 卡：廟通主打大卡 + TMS / WMS / ERP 三小卡
- 新增 `/products/wms` 倉儲管理產品頁（Hero / Stats / 8 大功能 / 三角色情境 / 6 截圖區 / 5 步工作流程 / 整合 / Cross product / CTA）
- 新增 `Dr.Dow WMS` 產品資料於 `lib/constants.ts`（8 大功能：入庫掃描、出庫揀貨、庫存即時同步、儲位管理、盤點任務、棧板循環容器、異常告警、TMS/ERP 串接）
- 導覽列產品下拉新增「WMS 倉儲系統」入口
- 頁尾「產品與資源」新增 WMS 連結
- `sitemap.xml` 新增 `/products/wms` URL（priority 0.9）
- `/solutions` 拆成 4 大解決方案區塊：廟通宮廟、TMS 派車、WMS 倉儲、ERP 財務（原本的 LOGISTICS_SOLUTIONS 拆成 TMS / ERP 兩組，新增 WAREHOUSE_SOLUTIONS）
- WMS 6 張截圖到位（GPT 生成）：wms-inventory / wms-inbound / wms-outbound / wms-locations / wms-stocktake / wms-pallet
- 移除 placeholder 邏輯（fs.existsSync + CSS mock），全改用 next/image 直接載入

### 影響檔案
- src/lib/constants.ts
- src/components/sections/product-cards.tsx
- src/components/sections/scene-selector.tsx（新增）
- src/components/layout/footer.tsx
- src/app/page.tsx
- src/app/products/wms/page.tsx（新增）
- src/app/sitemap.ts
- src/app/solutions/page.tsx

### 待補資源（GPT 圖片生成）
WMS 產品頁需 6 張截圖，路徑：
- public/screenshots/wms-inventory.png — 庫存即時儀表板
- public/screenshots/wms-inbound.png — 入庫掃描
- public/screenshots/wms-outbound.png — 出庫揀貨
- public/screenshots/wms-locations.png — 儲位視覺化地圖
- public/screenshots/wms-stocktake.png — 盤點任務（手機）
- public/screenshots/wms-pallet.png — 棧板與循環容器追蹤

### 回滾指令
```bash
git revert <this-commit-hash>
```

---

## v1.3.1 — 2026-04-28
### 變更內容
- 修：簡報頁 `/decks/tms.html` bundler 解包失敗（[bundle] error）
- 原因：next.config.ts 的 CSP `default-src 'self'` + `connect-src 'self'` 擋住簡報自包含 bundler 的動態載入
- 修法：next.config.ts 的 main headers rule source 改用 negative lookahead `'/((?!decks/).*)'` 排除 `/decks/`，再為 `/decks/(.*)` 套用除 CSP 外的所有 security headers + `X-Robots-Tag: noindex,nofollow,noarchive,nosnippet`

### 影響檔案
- next.config.ts

### 回滾指令
```bash
git revert <this-commit-hash>
```

---

## v1.3.0 — 2026-04-28
### 變更內容
- 新增隱藏式 TMS 產品簡報頁，路徑：`/decks/tms.html`（17 slides 自包含 HTML）
- 用途：行銷分享專用，知道網址才能進入
- 隱藏措施：robots.txt `Disallow: /decks/`、不寫進 sitemap、站內無連結、middleware 自動加 `X-Robots-Tag: noai, noimageai`

### 影響檔案
- public/decks/tms.html（新增，6.4MB）
- src/app/robots.ts

### 回滾指令
```bash
git revert <this-commit-hash>
```

---

## v1.2.1 — 2026-04-27
### 變更內容
- 強化 `/api/contact` 防護：新增 12+ 種 sqlmap payload 偵測（time-based blind、boolean blind、stacked queries、template injection）
- 命中惡意 payload 的 IP 自動封鎖 24 小時（in-memory，重啟重置）
- 拒絕非 JSON content-type 的請求（403），並封鎖該 IP
- malformed JSON body 直接 403 並封鎖 IP（先前是噴錯到 log，現在直接擋）
- middleware 新增環境變數驅動的 IP 黑名單 `BLOCKED_IPS`（comma-separated）
- log 格式改為 `[Contact] Blocked sqli/xss from <ip> ua="..." pattern=...`，方便日後查 IP 加進 BLOCKED_IPS

### 影響檔案
- src/app/api/contact/route.ts
- src/middleware.ts

### 回滾指令
```bash
git revert <this-commit-hash>
```

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
