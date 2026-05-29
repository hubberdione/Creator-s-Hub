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
  other: 'Link',
}

const PLATFORM_COLOR: Record<Platform, string> = {
  instagram: '#e1306c',
  tiktok: '#f0ebe3',
  youtube: '#ff4444',
  other: '#888',
}

export default function EmbedModal({ link, onClose }: Props) {
  const info    = getLinkInfo(link.url)
  const [loading, setLoading] = useState(true)

  // TikTok and Instagram are vertical (9:16); YouTube is landscape (16:9)
  const isPortrait = info.platform === 'tiktok' || info.platform === 'instagram'

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex-shrink-0 flex items-center gap-3 px-4 pt-5 pb-3 border-b border-white/5">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-xl bg-white/8 hover:bg-white/12 active:scale-[.93] flex items-center justify-center transition-all flex-shrink-0"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm leading-tight line-clamp-1">{link.description}</p>
          <p className="text-xs font-bold mt-0.5" style={{ color: PLATFORM_COLOR[info.platform] }}>
            {PLATFORM_LABEL[info.platform]}
          </p>
        </div>

        {/* Always-visible open button */}
        <a
          href={info.openUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1.5 border border-white/15 hover:border-white/30 active:scale-[.95] text-white/80 text-xs font-bold px-3 py-2 rounded-xl transition-all"
        >
          Open in app ↗
        </a>
      </div>

      {/* ── Embed ──────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-4 min-h-0">
        {info.embedUrl ? (
          <div className="relative w-full h-full flex items-center justify-center">

            {/* Loading spinner */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-8 h-8 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
              </div>
            )}

            {isPortrait ? (
              /* Portrait — 9:16 fixed height */
              <iframe
                key={info.embedUrl}
                src={info.embedUrl}
                onLoad={() => setLoading(false)}
                allow="autoplay; fullscreen; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  border: 'none',
                  borderRadius: '16px',
                  height: 'min(72vh, 560px)',
                  width: 'min(calc(72vh * 9 / 16), calc(560px * 9 / 16))',
                  display: 'block',
                  opacity: loading ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              />
            ) : (
              /* Landscape — 16:9 full width */
              <div
                className="w-full"
                style={{ maxWidth: '640px' }}
              >
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                  <iframe
                    key={info.embedUrl}
                    src={info.embedUrl}
                    onLoad={() => setLoading(false)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      border: 'none',
                      borderRadius: '16px',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: loading ? 0 : 1,
                      transition: 'opacity 0.3s ease',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* No embed URL — open externally */
          <div className="text-center px-8">
            <p className="text-5xl mb-5">🎬</p>
            <p className="text-white font-bold text-base mb-2">Watch on {PLATFORM_LABEL[info.platform]}</p>
            <p className="text-white/30 text-sm mb-6 leading-relaxed">This video can't be embedded — tap below to open it directly.</p>
            <a
              href={info.openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#ff2d78] hover:bg-[#e0265e] active:scale-[.97] text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all"
            >
              Open {PLATFORM_LABEL[info.platform]} ↗
            </a>
          </div>
        )}
      </div>

      {/* ── Bottom hint ────────────────────────────────────── */}
      {info.embedUrl && (
        <div className="flex-shrink-0 pb-8 pt-2 text-center">
          <p className="text-xs text-white/20">
            Not playing?{' '}
            <a
              href={info.openUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 underline underline-offset-2"
            >
              Open in {PLATFORM_LABEL[info.platform]}
            </a>
          </p>
        </div>
      )}

    </div>
  )
}
