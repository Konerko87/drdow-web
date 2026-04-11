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
        logo: `${SITE.url}/logo-icon.png`,
        slogan: SITE.tagline,
        foundingDate: '2026',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'TW',
          addressLocality: '台灣',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Service',
          email: SITE.email,
          availableLanguage: ['zh-TW'],
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
          availability: 'https://schema.org/OnlineOnly',
          description: '免費諮詢，依需求報價',
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

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: SITE.name,
        description: SITE.description,
        url: SITE.url,
        email: SITE.email,
        image: `${SITE.url}/logo-icon.png`,
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'TW',
          addressLocality: '台灣',
        },
        areaServed: {
          '@type': 'Country',
          name: '台灣',
        },
        priceRange: '$$',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
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
