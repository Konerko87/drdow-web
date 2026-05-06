import Script from 'next/script'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const AW_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

export function Analytics() {
  const tagId = GA_ID || AW_ID
  if (!tagId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${tagId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            'analytics_storage': 'granted'
          });
          ${GA_ID ? `gtag('config', '${GA_ID}', { page_path: window.location.pathname });` : ''}
          ${AW_ID ? `gtag('config', '${AW_ID}');` : ''}
        `}
      </Script>
    </>
  )
}
