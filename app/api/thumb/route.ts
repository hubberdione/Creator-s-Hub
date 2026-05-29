import { NextRequest, NextResponse } from 'next/server'

/**
 * Proxy TikTok thumbnail URLs via their public oEmbed API.
 * Called as: /api/thumb?url=https://www.tiktok.com/@user/video/123
 * Redirects to the real CDN thumbnail URL returned by TikTok.
 */
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')
  if (!url) return new NextResponse(null, { status: 400 })

  try {
    const oembedRes = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`,
      {
        headers: { Accept: 'application/json' },
        // Cache the oEmbed response for 24 h so we don't hammer TikTok
        next: { revalidate: 86400 },
      }
    )
    if (oembedRes.ok) {
      const data = await oembedRes.json()
      if (data.thumbnail_url) {
        // Redirect the browser straight to the TikTok CDN image
        return NextResponse.redirect(data.thumbnail_url)
      }
    }
  } catch {
    // fall through to 404
  }

  return new NextResponse(null, { status: 404 })
}
