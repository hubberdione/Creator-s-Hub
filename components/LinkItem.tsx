'use client'

import { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Link } from '@/lib/supabase'

type Props = {
  link: Link
  index: number
  isViewOnly: boolean
  onDelete: () => void
}

function getInstagramInfo(url: string): { type: string; shortcode: string; embedUrl: string; thumb: string } | null {
  const match = url.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
  if (!match) return null
  const [, type, shortcode] = match
  const embedUrl = `https://www.instagram.com/${type}/${shortcode}/embed/`
  const thumb = `https://image.thum.io/get/width/400/crop/400/viewPort/400x800/${embedUrl}`
  return { type, shortcode, embedUrl, thumb }
}

function shortUrl(url: string) {
  try {
    const u = new URL(url)
    const path = u.pathname.length > 20 ? u.pathname.slice(0, 20) + '…' : u.pathname
    return u.hostname.replace('www.', '') + path
  } catch {
    return url.slice(0, 35)
  }
}

export default function LinkItem({ link, index, isViewOnly, onDelete }: Props) {
  const [showEmbed, setShowEmbed] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const info = getInstagramInfo(link.url)

  async function handleDelete() {
    setDeleting(true)
    await onDelete()
  }

  return (
    <Draggable draggableId={link.id} index={index} isDragDisabled={isViewOnly}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`transition-all ${
            snapshot.isDragging
              ? 'bg-white shadow-2xl shadow-rose-100 rounded-2xl ring-2 ring-rose-300 z-50'
              : ''
          }`}
        >
          {/* Main row */}
          <div className="flex items-center gap-2 hover:bg-gray-50/50 transition-colors">
            {/* Drag handle */}
            {!isViewOnly && (
              <div
                {...provided.dragHandleProps}
                className="flex-shrink-0 pl-4 py-4 text-gray-300 hover:text-gray-400 cursor-grab active:cursor-grabbing"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="9" cy="5" r="1.5" />
                  <circle cx="15" cy="5" r="1.5" />
                  <circle cx="9" cy="12" r="1.5" />
                  <circle cx="15" cy="12" r="1.5" />
                  <circle cx="9" cy="19" r="1.5" />
                  <circle cx="15" cy="19" r="1.5" />
                </svg>
              </div>
            )}

            {/* Thumbnail — click to expand embed */}
            <div className={`flex-shrink-0 ${isViewOnly ? 'ml-4' : ''}`}>
              <button
                onClick={() => info && setShowEmbed(v => !v)}
                disabled={!info}
                className="relative w-[72px] h-[72px] my-3 rounded-2xl overflow-hidden flex-shrink-0 group"
              >
                {info && !imgError ? (
                  <>
                    {/* shimmer while Thum.io generates the screenshot */}
                    {!imgLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 animate-pulse" />
                    )}
                    <img
                      src={info.thumb}
                      alt=""
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgError(true)}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {/* play overlay — only show once image is ready */}
                    {imgLoaded && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        {showEmbed ? (
                          <svg className="w-4 h-4 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-white drop-shadow ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-sm shadow-rose-100">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                )}
              </button>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 py-3 pr-1">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-semibold text-gray-900 leading-snug hover:text-rose-600 transition-colors line-clamp-2"
              >
                {link.description}
              </a>
              <p className="text-xs text-gray-400 mt-1 truncate">{shortUrl(link.url)}</p>
            </div>

            {/* Delete */}
            {!isViewOnly && (
              <div className="flex-shrink-0 pr-4">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  title="Delete"
                  className="p-1.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                >
                  {deleting ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Expanded embed */}
          {showEmbed && info && (
            <div className="px-4 pb-4">
              <iframe
                src={info.embedUrl}
                className="w-full rounded-2xl"
                style={{ minHeight: 480, border: 'none' }}
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
              />
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}
