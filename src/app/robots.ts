import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow legitimate search engines
      {
        userAgent: ['Googlebot', 'Bingbot', 'Yandex', 'DuckDuckBot'],
        allow: '/',
        disallow: ['/admin', '/api/', '/thank-you'],
      },
      // Block AI training crawlers
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'Google-Extended',
          'ClaudeBot',
          'Claude-Web',
          'Anthropic-AI',
          'PerplexityBot',
          'Bytespider',
          'CCBot',
          'Omgilibot',
          'FacebookBot',
          'Diffbot',
          'Applebot-Extended',
          'cohere-ai',
        ],
        disallow: '/',
      },
      // Block known malicious / aggressive crawlers
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'PetalBot',
          'BLEXBot',
          'DataForSeoBot',
          'Sogou',
          'MegaIndex',
          'Scrapy',
        ],
        disallow: '/',
      },
      // Default: allow (for any other legitimate crawlers)
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/thank-you'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  }
}
