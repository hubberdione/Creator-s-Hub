'use client'

import { Link } from '@/lib/supabase'
import { getLinkInfo } from '@/lib/linkInfo'

type Props = {
  link: Link
  onClose: () => void
}

export default function EmbedModal({ link, onClose }: Props) {
  const info = getLinkInfo(link.url)

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex flex-col"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 pt-safe pt-4 pb-3">
        <button
          onClick={onClose}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="text-white font-semibold text-sm line-clamp-1 flex-1">{link.description}</p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          Open ↗
        </a>
      </div>

      {/* Embed */}
      <div className="flex-1 px-4 pb-6 flex items-center justify-center">
        {info.embedUrl ? (
          <iframe
            src={info.embedUrl}
            className="w-full max-w-sm rounded-2xl"
            style={{ height: 560, border: 'none' }}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading="lazy"
          />
        ) : (
          <div className="text-center">
            <p className="text-white/60 text-sm mb-4">No embed available for this link.</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-500 text-white px-6 py-3 rounded-full font-semibold text-sm"
            >
              Open link ↗
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
