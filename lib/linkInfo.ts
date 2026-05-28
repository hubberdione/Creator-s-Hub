export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'other'

export type LinkInfo = {
  embedUrl: string | null
  thumb: string
  platform: Platform
  openUrl: string
}

export function getLinkInfo(url: string): LinkInfo {
  const clean = url.trim()

  // ── Instagram (post / reel / tv) ──────────────────────────────────────────
  const ig = clean.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
  if (ig) {
    const embedUrl = `https://www.instagram.com/${ig[1]}/${ig[2]}/embed/`
    return {
      platform: 'instagram',
      embedUrl,
      openUrl: `https://www.instagram.com/${ig[1]}/${ig[2]}/`,
      thumb: `https://image.thum.io/get/width/400/crop/400/viewPort/400x800/${embedUrl}`,
    }
  }

  // ── TikTok (standard @user/video/ID) ──────────────────────────────────────
  const tt = clean.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/)
  if (tt) {
    const embedUrl = `https://www.tiktok.com/embed/v2/${tt[1]}`
    return {
      platform: 'tiktok',
      embedUrl,
      openUrl: clean,
      thumb: `https://image.thum.io/get/width/400/crop/400/viewPort/400x800/${embedUrl}`,
    }
  }

  // ── YouTube (watch, shorts, youtu.be) ─────────────────────────────────────
  const yt = clean.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]+)/)
  if (yt) {
    const id = yt[1]
    return {
      platform: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`,
      openUrl: `https://www.youtube.com/watch?v=${id}`,
      // Direct YouTube thumbnail CDN — fast and reliable
      thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    }
  }

  // ── Generic fallback ──────────────────────────────────────────────────────
  return {
    platform: 'other',
    embedUrl: null,
    openUrl: clean,
    thumb: `https://image.thum.io/get/width/400/crop/400/${clean}`,
  }
}
