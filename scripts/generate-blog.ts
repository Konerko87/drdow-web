/**
 * AI 自動 SEO 文章產生器
 *
 * 功能：
 * 1. 用 Claude 搜尋本週物流/ERP/TMS/CRM 產業新聞
 * 2. 結合 Dr.Dow AI 的 SEO 需求，自動生成繁體中文文章
 * 3. 存成 markdown 到 content/blog/
 *
 * 使用方式：
 *   ANTHROPIC_API_KEY=sk-xxx npx tsx scripts/generate-blog.ts
 *
 * 自動化（GitHub Actions / cron）：
 *   每週一早上 9:00 自動執行
 */

import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

const SEO_CONTEXT = `
你是 Dr.Dow AI 的內容行銷專家。Dr.Dow AI 是一家台灣的 AI 軟體解決方案公司，
主要產品是物流派車系統（TMS）和物流財務系統（ERP）。

目標讀者：台灣中小型物流公司老闆、物流主管、IT 負責人
SEO 目標關鍵字群：物流數位轉型、TMS 系統、物流 ERP、派車系統、物流管理軟體、
AI 物流、自動對帳、運輸管理系統、車隊管理、物流 SaaS

品牌語調：專業但親切、用數據說話、強調「自動」和「AI 替你做」
`.trim()

const ARTICLE_PROMPT = `
請根據以下本週物流/企業軟體產業動態，寫一篇 SEO 優化的繁體中文部落格文章。

要求：
1. 標題：吸引人但包含關鍵字，30 字以內
2. 內文：800-1200 字，分 3-4 個小節
3. 每個小節要有 ## 標題
4. 自然帶入以下 SEO 關鍵字（不要硬塞）：物流數位轉型、TMS、ERP、AI、自動化
5. 在適當位置提到 Dr.Dow AI 的解決方案（不超過 2 次，要自然不要像廣告）
6. 結尾要有行動呼籲，引導讀者預約 Demo，連結用 [預約 Demo](/contact)
7. 語氣：像一個懂物流的朋友在分享觀點，不要太正式
8. Dr.Dow AI 官網連結一律用 https://drdowai.com

回傳格式必須是 YAML frontmatter + Markdown：

---
title: "文章標題"
description: "50-100字的摘要，包含主要關鍵字"
slug: "english-slug-for-url"
date: "YYYY-MM-DD"
tags: ["標籤1", "標籤2", "標籤3"]
keywords: "SEO 關鍵字, 用逗號分隔"
unsplashQuery: "2-3 個英文關鍵字，用來搜 Unsplash 封面圖"
---

slug 欄位規則：用英文、全小寫、用 - 連接、3-6 個英文單字概括文章主題。
unsplashQuery 範例："logistics warehouse technology"、"truck fleet management"、"AI automation office"

（正文 Markdown）
`.trim()

async function searchRecentNews(client: Anthropic): Promise<string> {
  console.log('🔍 搜尋本週物流/企業軟體產業新聞...')

  const today = new Date()
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const dateRange = `${weekAgo.toISOString().split('T')[0]} to ${today.toISOString().split('T')[0]}`

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    tools: [{
      type: 'web_search_20250305' as const,
      name: 'web_search' as const,
    }],
    messages: [{
      role: 'user',
      content: `請搜尋 ${dateRange} 期間的以下新聞（繁體中文和英文都搜）：

1. 台灣物流業最新動態（新法規、產業趨勢、重大事件）
2. 全球 TMS / WMS / ERP / CRM 軟體產業新聞（新功能、併購、趨勢）
3. AI 在物流/供應鏈的最新應用案例
4. 台灣中小企業數位轉型相關新聞

請列出 5-8 則最相關的新聞，每則包含：標題、來源、重點摘要（2-3句）。
只列出確實存在的新聞，不要捏造。`,
    }],
  })

  // Extract text from response
  const textBlocks = response.content.filter(
    (block): block is Anthropic.TextBlock => block.type === 'text'
  )
  return textBlocks.map((b) => b.text).join('\n')
}

async function generateArticle(client: Anthropic, newsContext: string): Promise<string> {
  console.log('✍️  AI 正在撰寫文章...')

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 3000,
    system: SEO_CONTEXT,
    messages: [{
      role: 'user',
      content: `${ARTICLE_PROMPT}\n\n## 本週產業動態\n\n${newsContext}`,
    }],
  })

  const textBlocks = response.content.filter(
    (block): block is Anthropic.TextBlock => block.type === 'text'
  )
  return textBlocks.map((b) => b.text).join('\n')
}

async function fetchUnsplashCover(query: string): Promise<{ url: string; credit: string } | null> {
  console.log(`🖼️  搜尋 Unsplash 封面圖：${query}`)

  try {
    // Unsplash source URL (no API key needed, free)
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`
    const accessKey = process.env.UNSPLASH_ACCESS_KEY

    if (accessKey) {
      // Use official API if key available
      const res = await fetch(searchUrl, {
        headers: { Authorization: `Client-ID ${accessKey}` },
      })
      const data = await res.json()
      if (data.results?.[0]) {
        const photo = data.results[0]
        return {
          url: `${photo.urls.raw}&w=1200&h=630&fit=crop`,
          credit: `${photo.user.name} / Unsplash`,
        }
      }
    }

    // Fallback: use Unsplash Source (no API key needed)
    return {
      url: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=630&fit=crop&q=80`,
      credit: 'Unsplash',
    }
  } catch (err) {
    console.log('⚠️  Unsplash 搜尋失敗，使用預設圖片')
    return {
      url: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=630&fit=crop&q=80`,
      credit: 'Unsplash',
    }
  }
}

async function saveArticle(content: string): Promise<string> {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }

  // Extract frontmatter fields
  const slugMatch = content.match(/slug:\s*"(.+)"/)
  const dateMatch = content.match(/date:\s*"(\d{4}-\d{2}-\d{2})"/)
  const unsplashMatch = content.match(/unsplashQuery:\s*"(.+)"/)

  const date = dateMatch?.[1] || new Date().toISOString().split('T')[0]
  const rawSlug = slugMatch?.[1] || 'untitled'
  const unsplashQuery = unsplashMatch?.[1] || 'logistics technology'

  // Fetch cover image
  const cover = await fetchUnsplashCover(unsplashQuery)

  // Add coverImage to frontmatter (insert before closing ---)
  if (cover) {
    // Remove unsplashQuery line and add coverImage
    content = content
      .replace(/unsplashQuery:\s*"[^"]*"\n/, '')
      .replace(/^---\n/m, `---\ncoverImage: "${cover.url}"\ncoverCredit: "${cover.credit}"\n`)
    // Fix: only replace the second --- (end of frontmatter)
    // Actually the above replaces the first ---, let's fix the double ---
    content = content.replace(/^---\ncoverImage:/, '---\ncoverImage:')
  }

  // Generate filename
  const slug = `${date}-${rawSlug
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .slice(0, 60)}`

  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  fs.writeFileSync(filePath, content, 'utf-8')

  console.log(`✅ 文章已儲存：${filePath}`)
  return filePath
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('❌ 請設定 ANTHROPIC_API_KEY 環境變數')
    console.error('   ANTHROPIC_API_KEY=sk-xxx npx tsx scripts/generate-blog.ts')
    process.exit(1)
  }

  const client = new Anthropic({ apiKey })

  try {
    // Step 1: Search news
    const news = await searchRecentNews(client)
    console.log('\n📰 找到的新聞摘要：')
    console.log(news.slice(0, 500) + '...\n')

    // Step 2: Generate article
    const article = await generateArticle(client, news)

    // Step 3: Save (with Unsplash cover)
    const filePath = await saveArticle(article)

    console.log('\n🎉 完成！文章已產生。')
    console.log(`   檔案：${filePath}`)
    console.log('   下一步：npm run build 重新建構網站')
  } catch (error) {
    console.error('❌ 發生錯誤：', error)
    process.exit(1)
  }
}

main()
