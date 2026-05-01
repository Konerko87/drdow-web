# Changelog

所有版本變更紀錄。每個版本對應一個 git commit，可用 `git revert` 回滾。

---

## v1.10.9 — 2026-05-01
### 變更內容（DevOps：加 .railwayignore）

新增 `.railwayignore` 排除 node_modules / .next / 大型行銷素材（fb-ads, ig-posts, screenshots/.next）等，避免 `railway up` 因上傳量太大 timeout（先前實測整包 1.5GB+）。

順便 retrigger Railway 部署（前一次 deploy 02fe9414 status=FAILED 但本地 build 完全正常，疑似 Railway 端瞬時錯誤）。

**影響檔案**
- `.railwayignore`（新增）

---

## v1.10.8 — 2026-05-01
### 變更內容（部落格 editorial 第九批：圖片 figure 收尾）

把 cover image 與內文 markdown 圖片的 figure / figcaption 也統一到 editorial 系統。

**Cover image**
- 加 hairline border + 暖陰影（`0 24px 56px -32px rgba(0,0,0,0.25)`）
- Figcaption 從「Photo: <credit>」（左對齊小灰字）改成「— <credit>」（金色 em-dash + Noto Serif TC italic + 右對齊），雜誌攝影署名感

**Inline figures（marked renderer 自動把 `![alt](url)` wrap 成 figure）**
- `.blog-prose figure`: 14px 圓角 + 暖陰影 + hairline
- `.blog-prose figure figcaption`: Noto Serif TC italic + 金色 em-dash 前綴 + 右對齊

**為什麼**
- 圖片是 blog 文章主要視覺資產，之前用通用 prose 樣式 + 站內紫框，現在收齊到雜誌攝影風
- 配合 v1.9.1 已有的 marked image renderer（自動 wrap figure），作者寫 `![圖說](url)` 就會自動成為帶 caption 的雜誌風 figure，零學習成本

**影響檔案**
- `src/app/globals.css`（+25 行 figure CSS）
- `src/app/blog/[slug]/page.tsx`（cover figure JSX 微調）

**回滾**
```bash
git revert <v1.10.8-commit>
```

---

## v1.10.7 — 2026-05-01
### 變更內容（部落格 editorial 第八批：tag 主題頁同步）

`/blog/tags/[tag]` 主題頁是列表頁的子型，跟列表頁同步成 editorial 風，避免從列表點 tag 後又掉回舊紫色版面。

**變更**
- 整頁外層加 `blog-paper` 背景（暖紙白）
- Hero 改置中：紅色 eyebrow「Tag · 主題」 + Noto Serif TC H1（大標就是 tag 名稱）+ 暖灰副標
- 移除 `bg-gradient-to-b from-surface to-white` 漸層
- 文章 card 改白底 + hairline + 暖陰影 hover
- 標籤改第一個紅底 + 後續米白 chip
- 標題 Noto Serif TC 26px + meta row 用 `·` 分隔（與列表頁一致）

**為什麼**
- 從 `/blog` 點 tag 進來，預期應該是同一套設計系統的 filtered view
- 之前 tag 頁仍是站內紫色 + accent → 跟列表頁雜誌風斷裂
- 統一後 list / tag / detail 三層 blog 路由完全一致

**影響檔案**
- `src/app/blog/tags/[tag]/page.tsx`

**回滾**
```bash
git revert <v1.10.7-commit>
```

---

## v1.10.6 — 2026-05-01
### 變更內容（部落格 editorial 第七批：列表頁全面 editorial 化）

`/blog` 列表頁從原本的「surface 灰底 + 紫色 accent」風格全面重做成跟詳情頁一致的廟通雜誌調性。從列表進到詳情頁不再有視覺斷層。

**Hero 區**
- 背景從 `from-surface to-white` 漸層改成 `blog-paper` 暖紙白
- 加 12px uppercase 紅色 eyebrow 「Dr.Dow 編輯部 · Editorial」
- H1「部落格」改 Noto Serif TC + `tracking-tight`
- 副標文案重寫，更精準描述三個內容主軸

**Tag filter**
- 改置中
- accent 紫色 → 廟通深紅（`var(--color-blog-accent)`）
- inactive chip 從 `bg-surface` 改 `bg-blog-cream`，hover 改深紅 ghost 風

**Pinned articles 卡片**
- 標題從 `text-lg font-black` 「★ 置頂文章」改 12px uppercase「★ 置頂 · Featured」（雜誌專欄索引感），★ 染金色
- 卡片從 `bg-[#faf5ff]` 紫底 → 白底 + hairline border
- 標籤改第一個紅底 + 後續米白 chip
- 標題改 Noto Serif TC 17px serif

**Article list 卡片**
- 卡片從 `bg-surface` → 白底 + hairline border + 暖陰影 hover
- 列表項間距從 `space-y-8` 加大到 `space-y-10`
- 標籤改第一個紅底 + 後續米白
- 標題改 Noto Serif TC 26px serif font-semibold（雜誌封面感）
- 描述文字色改 `var(--color-blog-muted)` 暖系
- Meta row 加 `·` 分隔符，配色改 blog-rule 暖灰

**為什麼**
- 列表頁是 blog 的入口，第一印象決定讀者要不要點進去
- 之前列表頁仍是站內通用紫色，點進文章卻是廟通深紅+金，視覺人格分裂
- 統一後從列表 → 詳情整段體驗都是同一套雜誌系統

**影響檔案**
- `src/app/blog/page.tsx`（整頁重寫）

**回滾**
```bash
git revert <v1.10.6-commit>
```

---

## v1.10.5 — 2026-05-01
### 變更內容（部落格 editorial 第六批：RelatedPosts 收尾）

文章頁最後一個還沒 editorial 化的元件 — 「延伸閱讀」三卡片格 — 也統一過來。

**變更**
- 區塊標題：`text-lg font-black` 「延伸閱讀」改 12px uppercase tracking-wider 暖灰「延伸閱讀 · Related」（雜誌專欄索引感）
- 上下分隔線：`border-black/5` 改 `var(--color-blog-rule)` 暖系
- 卡片版型：移掉 surface 卡片包覆，改裸照片 + 文字（雜誌 photo essay 風格）；圖片 aspect ratio 從 2/1 改 4/3，加暖陰影
- 圖片 hover：原本整張 hover-lift，改成圖片內輕微縮放 1.02（更克制）
- 標題：sans-serif `text-sm font-bold` 改 Noto Serif TC 16.5px font-semibold + 廟通深紅 hover
- 日期：暖米黃 muted + tracking 微調

**為什麼**
- v1.10.0–v1.10.4 升級了 hero / 正文 / code / table / prev-next / CTA，唯獨 RelatedPosts 還是站內通用樣式
- 收尾後整個 blog 文章頁從上到下完全是同一套 editorial 系統（Noto Serif TC + 深紅+金 + 暖灰 muted + hairline rule）

**影響檔案**
- `src/components/sections/related-posts.tsx`

**回滾**
```bash
git revert <v1.10.5-commit>
```

---

## v1.10.4 — 2026-05-01
### 變更內容（部落格 editorial 第五批：prev/next + CTA 卡片升級）

把文章底部的「上一篇／下一篇」和 CTA 從一般 `bg-surface` 卡片升級為 editorial 風格，跟整篇雜誌調性收齊。

**Prev / Next**
- `bg-surface` → 白底 + `var(--color-blog-rule)` hairline border
- 標籤改 12px uppercase + tracking-wider 米黃色，箭頭染深紅
- 標題改 Noto Serif TC 17px serif（雜誌 card 標題感）
- Hover：上浮 0.5px + 暖色陰影（`shadow-[0_14px_28px_-20px_rgba(60,30,0,0.25)]`）

**CTA 卡片**
- 背景改白底 + 雙 radial gradient 暈染（右上金、左下深紅，opacity 8-10%）模擬廟宇香煙感
- 加 12px uppercase 紅色 eyebrow 「下一步 · Next Step」
- H3 改 Noto Serif TC `clamp(22px, 2.4vw, 28px)` serif
- 主按鈕從「圓角 + accent 紫」改成「廟通深紅 + box-shadow 紅暈染 + 10px 圓角」
- 副按鈕從「surface hover」改成「米白 hover」配色

**為什麼**
- 文章內文已全部 editorial 化，但底部還是站內通用 surface 樣式，視覺斷層
- 統一後讀者從 hero 進入到文末 CTA，整段體驗都是廟通深紅+金的雜誌調性
- CTA 文案順帶從通用「想了解更多？」換成廟通專屬的「想看看廟通怎麼解掉你的管理痛點？」，更精準對應 blog 流量意圖

**影響檔案**
- `src/app/blog/[slug]/page.tsx`（prev/next nav block + CTA 區）

**回滾**
```bash
git revert <v1.10.4-commit>
```

---

## v1.10.3 — 2026-05-01
### 變更內容（部落格 editorial 第四批：code/table/inline-code 三件套）

繼 hero 升級後，把 open-design 設計稿剩下的「結構性」editorial 元素全部 port 進 `.blog-prose`，全部純 CSS、不需動任何文章 markdown。

**新增（globals.css 內 `.blog-prose` scope）**

- **Inline code 改暖系**：原本 `<code>` 是紫底紫字（prose 預設），改成米白底（`var(--color-blog-cream)`）+ hairline border + 棕字 `#5a3a18`，與廟通色票一致
- **Code block 終端機 chrome**：`<pre>` 改深 slate（`#1a1f2b`）+ 左上 3 個灰圓點（紅黃綠燈意象，但統一用低調灰），純 `::before` + `box-shadow` 達成；`padding-top` 加大到 36px 給 chrome 留位置
- **Comparison table 雜誌化**：thead 改暖米白底 + sans-serif 字距加寬；tbody `<th>` 改 Noto Serif TC + 微暖底色（雜誌式 row label）；外框加 hairline + 14px 圓角
- **`.pill` / `.pill.win` 工具類**：作者可在 markdown table cell 直接寫 `<span class="pill win">即時</span>` 做出設計稿的「廟通優勢」紅色狀態徽章

**為什麼這樣做**
- 先前三批主要動「上下文」（hero/正文 H2/H3/lists/blockquote），這批處理「結構元素」（code、table），把整套 editorial 系統收齊
- 三件套都是 zero-config CSS：作者連 markdown 都不用改，code block 自動有 chrome、table 自動有雜誌風
- `.pill` 是「自願性」工具類：要做產品比較時手動加 `<span class="pill win">`，平時不會出現，不影響舊文章

**特殊性處理**
- Tailwind typography 的 `prose-pre:*` 用 `:where()` 包裹（0 specificity），所以 `.blog-prose pre` (0,1,1) 會贏，不需 `!important`
- Inline code 用 `:not(pre) > code` 精確選取，避免覆蓋到 code block 內的 `<code>`

**影響檔案**
- `src/app/globals.css`（+85 行 CSS rules）

**回滾**
```bash
git revert <v1.10.3-commit>
```

---

## v1.10.2 — 2026-05-01
### 變更內容（部落格 editorial 第三批：hero 區升級）

繼 v1.10.0 / v1.10.1 之後，把文章 hero 區（tags、H1、meta row）也 editorial 化，與正文 H2/H3 的 Noto Serif TC + 廟通紅金調性一致。

**變更**
- **Tag chips**：第一個 tag 改深紅底高亮（`var(--color-blog-accent)` 10% 透明 + 紅字），其餘用暖米白底（`var(--color-blog-cream)` + muted 文字），符合設計稿「主分類醒目、副標籤低調」的階層
- **H1**：字型改 Noto Serif TC（`var(--font-noto-serif-tc)`），字級 `text-4xl md:text-5xl`，`leading-[1.2]` 緊湊行距，色用 `var(--color-blog-ink)` 純黑
- **Meta row**：用 `·` 分隔（`var(--color-blog-rule)` 灰）三個資訊：發表日期、閱讀時間、作者；新增「作者 · Dr.Dow 編輯部」資訊增加雜誌感

**為什麼**
- v1.10.0/.1 已升級正文，但 hero 仍是預設 sans-serif + 紫色 chip，與正文 editorial 風格不一致
- 統一後整個文章頁從進入到讀完都是雜誌調性，廟通主題 (深紅+金) 一以貫之

**影響檔案**
- `src/app/blog/[slug]/page.tsx`（tags / H1 / meta row 三段 JSX）

**回滾**
```bash
git revert <v1.10.2-commit>
```

---

## v1.10.1 — 2026-05-01
### 變更內容（部落格 editorial 第二批：drop cap + pull-quote）

繼 v1.10.0 後，再從 open-design 設計稿擷取兩個 zero-config 的 editorial 元素（不需動文章 markdown，純 CSS 自動套用）。

**新增（globals.css 內 `.blog-prose` scope）**
- **Lead paragraph + Drop cap**：`> p:first-of-type` 字級放大到 19px Noto Serif TC，`::first-letter` 改 56px 深紅 serif drop cap（中文友善，自動套到每篇文章開頭第一段）
- **Pull-quote**：`blockquote` 取代成紅左邊 + 金色超大引號（`::before` 注入 `\201C` 80px 金色），並關掉 Tailwind typography 預設的智能引號（`p::before/::after` content 清空）。文章作者寫 `> 重點引言` 即可自動成為雜誌風 pull-quote。

**為什麼是 zero-config**
- 兩個都靠 CSS selector 自動匹配既有 markdown 元素，不需新 syntax、不需改 marked renderer、不需更動現有文章
- Drop cap 靠 `:first-of-type::first-letter`，CJK ::first-letter 在 Chromium/Safari/Firefox 都正常選到第一個漢字
- Pull-quote 靠 `blockquote` 全域選取（既然是文章作者主動寫 `>` 才會出現，全域套合理）

**影響檔案**
- `src/app/globals.css`（+45 行 CSS rules）

**回滾**
```bash
git revert <v1.10.1-commit>
```

---

## v1.10.0 — 2026-05-01
### 變更內容（部落格 editorial 視覺升級）

用 nexu-io/open-design + Warm Editorial design system + claude-opus-4-7 跑出一份廟通主題的長文設計稿（`~/projects/open-design/.od/.../index.html`），把對 blog 最有效的三個視覺元素 port 進 drdow-web，**作用域只在 blog 文章頁，不影響首頁/產品頁**。

**新增**
- `globals.css` 新增 7 個 blog 專屬 CSS variables：`--color-blog-paper #faf7f2`、`--color-blog-cream`、`--color-blog-ink`、`--color-blog-muted`、`--color-blog-accent #b91c1c` (深紅)、`--color-blog-gold #d97706` (金)、`--color-blog-rule`
- `globals.css` 新增 `.blog-prose` scoped 樣式：
  - H2：Noto Serif TC 字型 + `width: fit-content` + 2px 金色 border-bottom（雜誌風章節分隔）
  - H3：Noto Serif TC + `::before` 注入金色 `§ ` 章節符
  - OL：`list-style: none` + counter 改用 `decimal-leading-zero`（01/02/03） + 深紅色 serif
  - UL：marker 改深紅
- `globals.css` 新增 `.blog-paper` utility（暖紙白底色）
- `layout.tsx` 加入 Noto_Serif_TC 字型（weight 500/600/700）並 inject 為 `--font-noto-serif-tc` CSS var
- `blog/[slug]/page.tsx` 文章 `<article>` 加 `blog-paper`，內文 div 加 `blog-prose` class，並把 prose-h2 的黑色 border-b 移除（讓金色底線生效）

**為什麼這樣做**
- 用戶選了 editorial 風格升級而非整站改版 → 所有樣式 scoped 在 `.blog-prose`
- 深紅 + 金 = 廟通品牌調性，blog 是廟通內容主戰場 → 色票合理
- Noto Serif TC 是中文 blog 雜誌風的關鍵；只在 blog 加，不影響其他頁面字型負擔

**影響檔案**
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/app/blog/[slug]/page.tsx`

**參考產出**
- 設計稿位置：`~/projects/open-design/.od/projects/894cf716-3748-4e46-8a52-d412a604e2c0/index.html`
- 截圖：`/tmp/od-design-{1..7}.png`

**回滾指令**
```bash
git revert <v1.10.0-commit-hash>
```

---

## v1.9.1 — 2026-05-01
### 變更內容（部落格文章排版徹底修復）

**根本原因（3 個疊加 bug）**
1. `@tailwindcss/typography` 從未安裝 → 文章用的 `prose prose-lg ...` class 全部沒效果，瀏覽器拿到裸 HTML
2. `markdownToHtml()` 是手寫 regex 解析器，不支援表格、程式碼區塊（```）、inline code（`），導致 WMS 報價文等含表格的文章呈現為 `| --- |` 純文字
3. `<figure>` 被 paragraph 規則包進 `<p>`、`<ol>` 從不會被包起來等多項細節錯誤
4. 額外發現：`FadeIn` 用 `threshold: 0.1`，超長文章 10% 達不到視窗高度時整篇 opacity:0 不顯示

**修復**
- 安裝 `marked@18` + `@tailwindcss/typography@0.5`
- `globals.css` 加 `@plugin "@tailwindcss/typography"` 啟用 prose 樣式
- `src/app/blog/[slug]/page.tsx` 換成 marked GFM 解析器，外部連結自動 `target="_blank" rel="noopener"`，圖片包成 `<figure>` + `<figcaption>`
- 大幅擴充 prose className：表格樣式（rounded、邊框、hover 高亮）、程式碼區塊（深色背景）、inline code（紫色 chip）、引言區塊（accent 邊框 + 淡紫底）、圖片圓角邊框、標題 H2 底線
- `FadeIn`：mount 時若元素已在 viewport 立刻顯示（不靠 IntersectionObserver），threshold 改 0

**影響檔案**
- `src/app/blog/[slug]/page.tsx`
- `src/app/globals.css`
- `src/components/ui/fade-in.tsx`
- `package.json` / `package-lock.json`（新增 marked、@tailwindcss/typography）

**回滾指令**
```
git revert <commit-hash>
```

---

## v1.9.0 — 2026-05-01
### 變更內容（全站 icon 系統升級：emoji → Lucide React）

**動機**
- 原本各頁面使用 emoji 作為功能 icon（🚛📱🪙⛪️…），跨平台/跨瀏覽器渲染不一致
- emoji 大小無法統一，視覺風格與 SaaS 行銷網站不搭，整體質感偏弱

**作法**
- 安裝 `lucide-react`，新增 `src/components/ui/icon.tsx` 集中管理 50+ icon 對應表
- 所有資料來源（constants）從 emoji 字串改為 Lucide icon name 字串
- 所有消費端（頁面 / section）改用 `<Icon name="..." />` 元件，統一 stroke-width 1.75 與顏色
- emoji 容器（`text-3xl mb-3`）改為彩色 rounded square（`w-12 h-12 rounded-xl bg-gradient-to-br ...`）

**影響檔案**
- 新檔：`src/components/ui/icon.tsx`
- 資料源：`src/lib/constants.ts`、`src/lib/miaotong-constants.ts`
- 消費端 sections：`pain-points.tsx`、`ai-workflow.tsx`、`feature-modules.tsx`、`feature-grid.tsx`、`fortune-money.tsx`、`product-cards.tsx`、`cta-section.tsx`、`contact-form.tsx`
- 消費端 pages：`products/tms/page.tsx`、`products/erp/page.tsx`、`products/wms/page.tsx`、`products/miaotong/page.tsx`、`solutions/page.tsx`、`contact/page.tsx`
- Layout：`navbar.tsx`、`footer.tsx`（電話 / Email icon）
- `package.json` / `package-lock.json` 新增 lucide-react

**回滾指令**
```
git revert <commit-hash>
```

---

## v1.8.0 — 2026-05-01
### 變更內容（SEO 全面優化）

**1. Metadata / Title / Description 重寫**
- 首頁 / TMS / WMS / ERP / 廟通 5 大頁的 title 與 description 全部改為「關鍵字 + 量化痛點 + 量化結果」格式
- 擴充 keywords 涵蓋更多搜尋意圖（「派車」「盤點」「對帳」「點燈」等動作詞）

**2. 產品頁 FAQ 區塊（Schema.org FAQPage 富結果）**
- 新增 `src/lib/faq-data.ts` 共用 FAQ 資料，5 大分類（廟通/TMS/WMS/ERP/general）
- 各分類 FAQ 擴充：TMS 7 題、WMS 7 題、ERP 6 題、general 5 題
- 新元件 `<ProductFAQ>` 內含 `<FAQPageJsonLd>`，掛載到 4 個產品頁
- `/faq` 頁重構為使用共用資料，不再有重複資料
- Google 搜尋結果可顯示展開式 FAQ rich snippet

**3. 雙向內部連結（Topic Cluster）**
- 新元件 `<RelatedProductPosts>`：每個產品頁自動撈該產品的 4 篇相關 blog 顯示
- `lib/blog.ts` 新增 `getPostsByProduct()` / `getPostsByTag()` / `getAllTags()`
- 解決舊有「blog → 產品」單向連結問題

**4. 標籤聚合頁（Tag Aggregation Pages）**
- 新增 `/blog/tags/[tag]` 動態靜態路由（generateStaticParams）
- 含 BreadcrumbJsonLd + CollectionPage JSON-LD
- 每個 tag 頁有獨立 metadata，提升長尾關鍵字索引機會
- Sitemap 自動納入文章數 ≥2 的 tag 頁
- `/blog` 頁的 tag pill 從 `?tag=` query 改為靜態 URL `/blog/tags/{tag}`

**5. 錨文字（Anchor Text）優化**
- Footer 連結文字從「TMS」「WMS」改為「TMS 物流派車系統」「WMS 倉儲管理系統」
- 產品卡 CTA 從「了解更多」改為「看 {產品} 完整功能」
- 增強內部連結的關鍵字密度

**6. WMS 內容補完（解決 WMS vs 廟通內容嚴重斷層）**
- 4 篇 WMS 主題長尾關鍵字 SEO 文章：
  - `wms-recommend-2026.md` — WMS 推薦／比較（7 個選擇問題）
  - `wms-price-cost.md` — WMS 價格／費用（5 大成本結構）
  - `wms-vs-erp-difference.md` — WMS vs ERP 差別（消歧義文）
  - `storage-location-management.md` — 儲位管理（編碼/ABC/動線/貼標）
- WMS 主題從 3 篇擴充至 7 篇，可形成 topic cluster

**7. 圖片與 LCP 優化**
- `next.config.ts` 加 `formats: ['image/avif', 'image/webp']`
- 4 個產品頁 Hero 圖加 `fetchPriority="high"` + 完整 `sizes` prop（正確 srcset）

### 影響檔案
- next.config.ts
- src/app/page.tsx
- src/app/products/{tms,wms,erp,miaotong}/page.tsx
- src/app/faq/page.tsx
- src/app/blog/page.tsx
- src/app/blog/tags/[tag]/page.tsx（新增）
- src/app/sitemap.ts
- src/lib/blog.ts
- src/lib/faq-data.ts（新增）
- src/components/sections/product-faq.tsx（新增）
- src/components/sections/related-product-posts.tsx（新增）
- src/components/sections/product-cards.tsx
- src/components/layout/footer.tsx
- content/blog/2026-05-01-wms-recommend-2026.md（新增）
- content/blog/2026-05-01-wms-price-cost.md（新增）
- content/blog/2026-05-01-wms-vs-erp-difference.md（新增）
- content/blog/2026-05-01-storage-location-management.md（新增）

### SEO 影響評估
- 4 產品頁皆觸發 FAQPage rich result，預期 SERP CTR +20-40%
- 雙向內部連結提升 link equity 流動，內頁排名預期改善
- WMS 長尾關鍵字 4 篇新文，預期未來 60-90 天獲得新增有機流量
- Tag 聚合頁產生 100+ 新可索引頁面，加深網站結構深度
- AVIF/WebP 啟用後圖片下載量預期 -30-50%，Core Web Vitals LCP 預期改善

### 回滾指令
```bash
git revert <this-commit-hash>
```

---

## v1.7.0 — 2026-05-01
### 變更內容
- 補齊產品視覺資源：TMS / WMS / ERP / 廟通 4 套產品 logo + Hero 插圖 + OG 圖
- 新增資產：
  - `/logo-{tms,wms,erp}.png` — 3 套產品 app icon（藍/青/紫主題，廟通沿用 `logo-miaotong.png`）
  - `/hero/{tms,wms,erp}-hero.png` — 3 套產品 Hero 插圖（筆電 + 手機畫面）
  - `/og/{miaotong,tms,wms,erp}-og.png` — 4 套產品 social OG 圖
- TMS / WMS / ERP / 廟通 metadata 加 `image:` 欄位指向各自 OG 圖（解決 4 個產品頁分享時都長一樣）
- TMS / WMS / ERP 產品頁 Hero 改成 `grid lg:grid-cols-2` 左文右圖佈局，套用各自 hero 插圖（priority loading）
- `SceneSelector` 4 卡片：emoji 圖示（🛕🚛📦💰）改成各自 logo 圖
- `ProductCards` 物流三小卡：emoji + 漸層底改成 logo 圖
- 維持 ProductCards 主打廟通大卡的 `/logo-miaotong.png` 視覺不變

### 影響檔案
- src/app/products/miaotong/page.tsx
- src/app/products/tms/page.tsx
- src/app/products/wms/page.tsx
- src/app/products/erp/page.tsx
- src/components/sections/scene-selector.tsx
- src/components/sections/product-cards.tsx
- public/logo-tms.png（新增）
- public/logo-wms.png（新增）
- public/logo-erp.png（新增）
- public/hero/tms-hero.png（新增）
- public/hero/wms-hero.png（新增）
- public/hero/erp-hero.png（新增）
- public/og/miaotong-og.png（新增）
- public/og/tms-og.png（新增）
- public/og/wms-og.png（新增）
- public/og/erp-og.png（新增）

### SEO 影響評估
- 各產品頁分享 OG 圖各自獨立，社群點擊率預期提升
- 產品頁 Hero 視覺差異化，跳出率預期下降
- logo 圖檔 alt 包含 `Dr.Dow {產品}` 加強品牌關鍵字權重

### 回滾指令
```bash
git revert <this-commit-hash>
```

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
