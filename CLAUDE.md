@AGENTS.md

# Dr.Dow AI 官網 (drdowai.com)

B2B SaaS 行銷網站，推廣 AI 物流管理系統（TMS / ERP）。部署於 Railway。

## 技術棧

- Next.js 16.2.2 / React 19 / TypeScript 5
- Tailwind CSS v4（透過 @tailwindcss/postcss）
- 字型：Inter + Noto Sans TC (Google Fonts)
- 部署：Railway（us-west2）
- 網域：drdowai.com

## 常用指令

```bash
npm run dev           # 本地開發
npm run build         # 生產建置
npm run start         # 啟動生產伺服器
npm run lint          # ESLint 檢查
npm run generate-blog # 用 Claude AI 產生部落格文章
```

## 環境變數

| 變數 | 用途 |
|------|------|
| `NEXT_PUBLIC_GA_ID` | Google Analytics |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console |
| `RESEND_API_KEY` | Resend 寄信 API |
| `ANTHROPIC_API_KEY` | Claude API（部落格生成腳本） |

---

## 專案結構地圖

```
src/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # 根佈局（Navbar、Footer、字型、GA、JSON-LD）
│   ├── page.tsx                      # 首頁（Hero → PainPoints → Products → Workflow → Stats → TechStack → CTA）
│   ├── globals.css                   # Tailwind 設定 + 自訂 CSS 變數 + 動畫
│   ├── opengraph-image.tsx           # 動態 OG 圖片（1200×630）
│   ├── robots.ts                     # robots.txt
│   ├── sitemap.ts                    # sitemap.xml（含所有頁面 + 部落格）
│   ├── llms.txt/route.ts             # LLM 探索端點（純文字）
│   │
│   ├── api/
│   │   └── contact/route.ts          # POST 聯絡表單 → Resend 寄信
│   │
│   ├── blog/
│   │   ├── page.tsx                  # 部落格列表頁
│   │   └── [slug]/page.tsx           # 部落格文章頁（Markdown 渲染 + 相關文章）
│   │
│   ├── products/
│   │   ├── tms/page.tsx              # TMS 產品頁（9 功能 + 6 截圖 + 工作流程）
│   │   └── erp/page.tsx              # ERP 產品頁（8 功能 + 3 角色情境 + 6 截圖）
│   │
│   ├── contact/page.tsx              # 聯絡 / 預約 Demo 頁
│   ├── pricing/page.tsx              # 定價方案（Basic / Professional / Enterprise）
│   ├── faq/page.tsx                  # FAQ（20+ 問答，4 分類，Schema.org）
│   ├── solutions/page.tsx            # 解決方案總覽（6 應用場景）
│   ├── about/page.tsx                # 關於我們
│   ├── privacy/page.tsx              # 隱私權政策
│   └── thank-you/page.tsx            # 表單送出感謝頁（noindex）
│
├── components/
│   ├── layout/
│   │   ├── navbar.tsx                # 導覽列（'use client'，滾動模糊效果，手機漢堡選單）
│   │   ├── footer.tsx                # 頁尾（深色主題，4 欄連結）
│   │   └── analytics.tsx             # GA 載入器
│   │
│   ├── sections/
│   │   ├── hero.tsx                  # 首頁 Hero（漸層文字 + CTA）
│   │   ├── pain-points.tsx           # 痛點 Before/After 卡片（用 PAIN_POINTS）
│   │   ├── product-cards.tsx         # 產品展示卡（用 PRODUCTS）
│   │   ├── ai-workflow.tsx           # 6 步工作流程視覺化（用 WORKFLOW_STEPS）
│   │   ├── numbers.tsx               # 數據統計區塊（用 STATS）
│   │   ├── tech-stack.tsx            # 技術棧徽章（用 TECH_STACK）
│   │   ├── cta-section.tsx           # CTA 區塊（深色背景）
│   │   ├── feature-grid.tsx          # 可複用功能格子（props: features[], columns）
│   │   ├── contact-form.tsx          # 聯絡表單（'use client'，含 honeypot 防垃圾）
│   │   └── related-posts.tsx         # 相關文章側邊欄
│   │
│   ├── ui/
│   │   └── fade-in.tsx               # 滾動淡入動畫（Intersection Observer）
│   │
│   └── seo/
│       └── json-ld.tsx               # Schema.org 結構化資料生成器
│                                     #   - OrganizationJsonLd
│                                     #   - SoftwareApplicationJsonLd
│                                     #   - FAQPageJsonLd
│                                     #   - BreadcrumbJsonLd
│
├── lib/
│   ├── constants.ts                  # 全站設定：SITE、NAV_LINKS、PRODUCTS、
│   │                                 #   STATS、WORKFLOW_STEPS、PAIN_POINTS、TECH_STACK
│   ├── metadata.ts                   # createMetadata() 輔助函數
│   └── blog.ts                       # getAllPosts()、getPostBySlug()、getAllSlugs()
│                                     #   使用 gray-matter 解析 Markdown frontmatter

content/
└── blog/                             # Markdown 部落格文章（12 篇）
    └── *.md                          # frontmatter: title, description, slug, date,
                                      #   tags[], keywords, coverImage, coverCredit

scripts/
└── generate-blog.ts                  # Claude AI 部落格產生器

public/
├── logo-icon.png                     # 小 icon 28×28
├── logo-horizontal.png               # 橫式 Logo
├── favicon.ico / apple-touch-icon.png
└── screenshots/                      # 產品截圖
    ├── tms-*.png (6)                 # TMS 介面截圖
    └── erp-*.png (6)                 # ERP 介面截圖
```

## 頁面路由快速索引

| 路由 | 檔案 | 說明 |
|------|------|------|
| `/` | `app/page.tsx` | 首頁：Hero + 痛點 + 產品卡 + 工作流程 + 數據 + 技術棧 + CTA |
| `/products/tms` | `app/products/tms/page.tsx` | TMS 產品頁 |
| `/products/erp` | `app/products/erp/page.tsx` | ERP 產品頁 |
| `/blog` | `app/blog/page.tsx` | 部落格列表 |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | 部落格文章 |
| `/contact` | `app/contact/page.tsx` | 聯絡 / 預約 Demo |
| `/pricing` | `app/pricing/page.tsx` | 定價方案 |
| `/faq` | `app/faq/page.tsx` | 常見問答 |
| `/solutions` | `app/solutions/page.tsx` | 解決方案總覽 |
| `/about` | `app/about/page.tsx` | 關於我們 |
| `/privacy` | `app/privacy/page.tsx` | 隱私政策 |
| `/thank-you` | `app/thank-you/page.tsx` | 感謝頁 |
| `/api/contact` | `app/api/contact/route.ts` | POST：聯絡表單 API |
| `/sitemap.xml` | `app/sitemap.ts` | 動態 Sitemap |
| `/robots.txt` | `app/robots.ts` | Robots 設定 |
| `/llms.txt` | `app/llms.txt/route.ts` | LLM 探索端點 |

## 資料流

### 行銷內容
`lib/constants.ts` → 各 section 元件 → 頁面組合

### 部落格
`content/blog/*.md` → `lib/blog.ts`（gray-matter 解析）→ `blog/page.tsx` & `blog/[slug]/page.tsx`

### 聯絡表單
`contact-form.tsx`（client）→ `POST /api/contact` → Resend API → kevin@st-logistics.com.tw

### SEO
`lib/metadata.ts` → 每頁 `generateMetadata()` + `seo/json-ld.tsx` → 結構化資料

## 設計系統

### 色彩
- `--color-accent: #3B82F6`（主按鈕藍色）
- `--color-purple: #8B5CF6`（漸層副色）
- `--color-success: #22C55E`（綠色打勾）
- `--color-surface: #F8FAFC`（淺灰背景）
- `--color-dark: #0F172A`（深色區塊）

### 動畫
- `.gradient-text` — 藍紫漸層動畫文字
- `.hover-lift` — 懸停上浮 + 陰影
- `FadeIn` 元件 — 滾動淡入（Intersection Observer）

### 佈局
- 容器：`max-w-7xl mx-auto px-6`
- RWD 斷點：`md:` (768px)、`lg:` (1024px)
- 元件間距：`py-24` / `py-32`

## 重要注意事項

- 主要語言為繁體中文（zh_TW），英文用於品牌標語
- 所有行銷文案集中在 `lib/constants.ts`，修改文案請改這裡
- 部落格文章用 Markdown 放在 `content/blog/`，frontmatter 格式見上方
- 表單有 honeypot 欄位防垃圾信（`website` 欄位）
- OG 圖片是動態產生的，不需手動製作
- Railway 部署自動連結 GitHub，push 到 main 即自動部署
