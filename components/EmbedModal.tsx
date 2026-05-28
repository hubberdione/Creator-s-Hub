'use client'

import { useState } from 'react'
import { Link } from '@/lib/supabase'
import { getLinkInfo, Platform } from '@/lib/linkInfo'

type Props = {
  link: Link
  onClose: () => void
}

const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
  other: 'Original',
}

const PLATFORM_COLOR: Record<Platform, string> = {
  instagram: '#e1306c',
  tiktok: '#f0ebe3',
  youtube: '#ff0000',
  other: '#888',
}

export default function EmbedModal({ link, onClose }: Props) {
  const info = getLinkInfo(link.url)
  const [embedFailed, setEmbedFailed] = useState(false)

  // Portrait for short-form vertical content, landscape for YouTube
  const isPortrait = info.platform === 'tiktok' || info.platform === 'instagram'

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-4 flex-shrink-0">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15 active:scale-[.93] flex items-center justify-center transition-all flex-shrink-0"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm line-clamp-1">{link.description}</p>
          <p className="text-xs font-bold mt-0.5" style={{ color: PLATFORM_COLOR[info.platform] }}>
            {PLATFORM_LABEL[info.platform]}
          </p>
        </div>

        <a
          href={info.openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1.5 bg-white/10 hover:bg-white/15 active:scale-[.95] text-white text-xs font-bold px-3 py-2 rounded-xl transition-all"
        >
          Open ↗
        </a>
      </div>

      {/* ── Embed area ───────────────────────────────────────────────────────── */}
      <div className="flex-1 px-4 pb-6 flex flex-col items-center justify-center gap-4 min-h-0">
        {info.embedUrl && !embedFailed ? (
          <>
            {isPortrait ? (
              // Portrait — constrained width, fills height
              <div className="h-full max-h-[75vh] w-full flex items-center justify-center">
                <iframe
                  key={info.embedUrl}
                  src={info.embedUrl}
                  className="rounded-2xl"
                  style={{
                    height: '100%',
                    maxHeight: '75vh',
                    width: '100%',
                    maxWidth: 'calc(75vh * 9 / 16)',
                    border: 'none',
                  }}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  referrerPolicy="no-referrer-when-downgrade"
                  loading="lazy"
                  onError={() => setEmbedFailed(true)}
                />
              </div>
            ) : (
              // Landscape — full width, 16:9 height
              <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <iframe
                  key={info.embedUrl}
                  src={info.embedUrl}
                  className="w-full h-full"
                  style={{ border: 'none' }}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                  onError={() => setEmbedFailed(true)}
                />
              </div>
            )}

            {/* Fallback hint */}
            <p className="text-xs text-white/30 text-center">
              Not loading?{' '}
              <a
                href={info.openUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 underline underline-offset-2"
              >
                Watch on {PLATFORM_LABEL[info.platform]} ↗
              </a>
            </p>
          </>
        ) : (
          // No embed / failed — full fallback
          <div className="text-center px-6">
            <p className="text-4xl mb-4">🎬</p>
            <p className="text-white font-bold text-base mb-2">Can't play inline</p>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              This video needs to be watched on {PLATFORM_LABEL[info.platform]}.
            </p>
            <a
              href={info.openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ff2d78] hover:bg-[#e0265e] active:scale-[.97] text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all"
            >
              Watch on {PLATFORM_LABEL[info.platform]} ↗
            </a>
          </div>
        )}
      </div>

    </div>
  )
}
