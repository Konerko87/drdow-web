export async function GET() {
  return new Response(
    '# This site does not permit AI training or scraping.\n# See robots.txt for details.\n',
    {
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noai, noimageai',
      },
    }
  )
}
