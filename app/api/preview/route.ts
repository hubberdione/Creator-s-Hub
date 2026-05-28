import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ image: null })

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: AbortSignal.timeout(8000),
    })

    const html = await res.text()

    const patterns = [
      /property="og:image"\s+content="([^"]+)"/,
      /content="([^"]+)"\s+property="og:image"/,
      /"og:image","url":"([^"]+)"/,
    ]

    let image: string | null = null
    for (const pattern of patterns) {
      const match = html.match(pattern)
      if (match?.[1]) {
        image = match[1].replace(/&amp;/g, '&')
        break
      }
    }

    return NextResponse.json({ image }, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
    })
  } catch {
    return NextResponse.json({ image: null })
  }
}
