export type Platform = 'instagram' | 'tiktok' | 'youtube' | 'other'

export type LinkInfo = {
  embedUrl: string | null
  /** null → no image available, show platform branded fallback card */
  thumb: string | null
  platform: Platform
  openUrl: string
}

export function getLinkInfo(url: string): LinkInfo {
  const clean = url.trim()

  // ── Instagram (post / reel / tv) ──────────────────────────────────────────
  const ig = clean.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
  if (ig) {
    return {
      platform: 'instagram',
      embedUrl: `https://www.instagram.com/${ig[1]}/${ig[2]}/embed/`,
      openUrl: `https://www.instagram.com/${ig[1]}/${ig[2]}/`,
      thumb: null, // Instagram blocks all third-party thumbnail access → branded fallback
    }
  }

  // ── TikTok (standard @user/video/ID) ──────────────────────────────────────
  const tt = clean.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/)
  if (tt) {
    return {
      platform: 'tiktok',
      embedUrl: `https://www.tiktok.com/embed/v2/${tt[1]}`,
      openUrl: clean,
      // Our /api/thumb route proxies TikTok's oEmbed API to get the real CDN thumbnail
      thumb: `/api/thumb?url=${encodeURIComponent(clean)}`,
    }
  }

  // ── YouTube (watch / shorts / youtu.be) ───────────────────────────────────
  const yt = clean.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]+)/)
  if (yt) {
    const id = yt[1]
    return {
      platform: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`,
      openUrl: `https://www.youtube.com/watch?v=${id}`,
      thumb: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
    }
  }

  // ── Generic fallback ──────────────────────────────────────────────────────
  return {
    platform: 'other',
    embedUrl: null,
    openUrl: clean,
    thumb: null,
  }
}
