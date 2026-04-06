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
6. 結尾要有行動呼籲，引導讀者預約 Demo
7. 語氣：像一個懂物流的朋友在分享觀點，不要太正式

回傳格式必須是 YAML frontmatter + Markdown：

---
title: "文章標題"
description: "50-100字的摘要，包含主要關鍵字"
date: "YYYY-MM-DD"
tags: ["標籤1", "標籤2", "標籤3"]
keywords: "SEO 關鍵字, 用逗號分隔"
---

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

function saveArticle(content: string): string {
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true })
  }

  // Extract title from frontmatter for slug
  const titleMatch = content.match(/title:\s*"(.+)"/)
  const dateMatch = content.match(/date:\s*"(\d{4}-\d{2}-\d{2})"/)

  const date = dateMatch?.[1] || new Date().toISOString().split('T')[0]
  const title = titleMatch?.[1] || 'untitled'

  // Generate slug from date + simplified title
  const slug = `${date}-${title
    .replace(/[^\u4e00-\u9fff\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
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

    // Step 3: Save
    const filePath = saveArticle(article)

    console.log('\n🎉 完成！文章已產生。')
    console.log(`   檔案：${filePath}`)
    console.log('   下一步：npm run build 重新建構網站')
  } catch (error) {
    console.error('❌ 發生錯誤：', error)
    process.exit(1)
  }
}

main()
