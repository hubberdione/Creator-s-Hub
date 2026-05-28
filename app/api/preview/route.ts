import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  if (!url) return NextResponse.json({ image: null })

  try {
    const res = await fetch(
      `https://api.microlink.io?url=${encodeURIComponent(url)}&video=false`,
      { signal: AbortSignal.timeout(12000) }
    )
    const data = await res.json()

    const image =
      data?.data?.image?.url ??
      data?.data?.logo?.url ??
      null

    return NextResponse.json({ image }, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' },
    })
  } catch {
    return NextResponse.json({ image: null })
  }
}
