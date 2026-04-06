import { SITE } from '@/lib/constants'

type JsonLdProps = {
  data: Record<string, unknown>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE.name,
        description: SITE.description,
        url: SITE.url,
        email: SITE.email,
        slogan: SITE.tagline,
        foundingDate: '2026',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'TW',
        },
      }}
    />
  )
}

export function SoftwareApplicationJsonLd({
  name,
  description,
  url,
  category,
}: {
  name: string
  description: string
  url: string
  category: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name,
        description,
        url,
        applicationCategory: category,
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'TWD',
          description: '價格洽詢',
        },
        provider: {
          '@type': 'Organization',
          name: SITE.name,
          url: SITE.url,
        },
      }}
    />
  )
}

export function FAQPageJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${SITE.url}${item.url}`,
        })),
      }}
    />
  )
}
