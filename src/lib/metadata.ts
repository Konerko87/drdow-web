import type { Metadata } from 'next'
import { SITE } from './constants'

export function createMetadata({
  title,
  description,
  path = '',
  image,
  keywords,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
}: {
  title: string
  description: string
  path?: string
  image?: string
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}): Metadata {
  const url = `${SITE.url}${path}`
  const ogImage = image || `${SITE.url}/og/default.png`

  return {
    title,
    description,
    ...(keywords && { keywords }),
    ...(authors && { authors: authors.map((name) => ({ name })) }),
    metadataBase: new URL(SITE.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      locale: 'zh_TW',
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: authors || [SITE.name],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
  }
}
