export type LinkInfo = {
  embedUrl: string | null
  thumb: string
}

export function getLinkInfo(url: string): LinkInfo {
  // Instagram
  const ig = url.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
  if (ig) {
    const embedUrl = `https://www.instagram.com/${ig[1]}/${ig[2]}/embed/`
    return { embedUrl, thumb: `https://image.thum.io/get/width/400/crop/400/viewPort/400x800/${embedUrl}` }
  }
  // TikTok
  const tt = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/)
  if (tt) {
    const embedUrl = `https://www.tiktok.com/embed/v2/${tt[1]}`
    return { embedUrl, thumb: `https://image.thum.io/get/width/400/crop/400/viewPort/400x800/${embedUrl}` }
  }
  // YouTube
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]+)/)
  if (yt) {
    const embedUrl = `https://www.youtube.com/embed/${yt[1]}`
    return { embedUrl, thumb: `https://image.thum.io/get/width/400/crop/400/viewPort/400x800/${embedUrl}` }
  }
  // Generic
  return { embedUrl: null, thumb: `https://image.thum.io/get/width/400/crop/400/${url}` }
}
