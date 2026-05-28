'use client'

import { useState, useEffect, useRef } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Link } from '@/lib/supabase'

type Props = {
  link: Link
  index: number
  isViewOnly: boolean
  onDelete: () => void
  onEdit: (id: string, description: string, url: string) => Promise<void>
}

type LinkInfo = {
  embedUrl: string | null
  thumb: string
}

function getLinkInfo(url: string): LinkInfo {
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

  // Generic — screenshot the page directly, open in new tab (no embed)
  return { embedUrl: null, thumb: `https://image.thum.io/get/width/400/crop/400/${url}` }
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

export default function LinkItem({ link, index, isViewOnly, onDelete, onEdit }: Props) {
  const [showEmbed, setShowEmbed] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [deleting, setDeleting] = useState(false)

  // Edit state
  const [editing, setEditing] = useState(false)
  const [editDesc, setEditDesc] = useState(link.description)
  const [editUrl, setEditUrl]   = useState(link.url)
  const [saving, setSaving]     = useState(false)
  const descRef = useRef<HTMLInputElement>(null)

  // Recompute info when URL changes (edit saved)
  const info = getLinkInfo(link.url)

  // Reset thumbnail states if URL changes after edit
  useEffect(() => {
    setImgLoaded(false)
    setImgError(false)
  }, [link.url])

  useEffect(() => {
    if (editing) descRef.current?.focus()
  }, [editing])

  async function handleDelete() {
    setDeleting(true)
    await onDelete()
  }

  async function handleSave() {
    if (!editDesc.trim() || !editUrl.trim()) return
    setSaving(true)
    await onEdit(link.id, editDesc.trim(), editUrl.trim())
    setSaving(false)
    setEditing(false)
  }

  function handleCancelEdit() {
    setEditDesc(link.description)
    setEditUrl(link.url)
    setEditing(false)
  }

  return (
    <Draggable draggableId={link.id} index={index} isDragDisabled={isViewOnly || editing}>
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

            {/* Drag handle — hidden while editing */}
            {!isViewOnly && !editing && (
              <div
                {...provided.dragHandleProps}
                className="flex-shrink-0 pl-4 py-4 text-gray-300 hover:text-gray-400 cursor-grab active:cursor-grabbing"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="9" cy="5" r="1.5" /><circle cx="15" cy="5" r="1.5" />
                  <circle cx="9" cy="12" r="1.5" /><circle cx="15" cy="12" r="1.5" />
                  <circle cx="9" cy="19" r="1.5" /><circle cx="15" cy="19" r="1.5" />
                </svg>
              </div>
            )}
            {/* Spacer when editing so layout doesn't shift */}
            {!isViewOnly && editing && <div className="w-4 pl-4 flex-shrink-0" />}

            {/* Thumbnail */}
            <div className={`flex-shrink-0 ${isViewOnly ? 'ml-4' : ''}`}>
              <button
                onClick={() => !editing && info.embedUrl && setShowEmbed(v => !v)}
                disabled={editing || !info.embedUrl}
                className="relative w-[72px] h-[72px] my-3 rounded-2xl overflow-hidden flex-shrink-0 group"
              >
                {!imgError ? (
                  <>
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
                    {imgLoaded && info.embedUrl && !editing && (
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
                  <div className="w-full h-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                )}
              </button>
            </div>

            {/* Text / Edit form */}
            {editing ? (
              <div className="flex-1 min-w-0 py-3 pr-2 space-y-1.5">
                <input
                  ref={descRef}
                  value={editDesc}
                  onChange={e => setEditDesc(e.target.value)}
                  placeholder="Description"
                  className="w-full text-sm font-semibold bg-white border border-rose-300 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-rose-200 text-gray-900"
                />
                <input
                  value={editUrl}
                  onChange={e => setEditUrl(e.target.value)}
                  placeholder="URL"
                  className="w-full text-xs bg-white border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-rose-100 text-gray-700"
                />
                <div className="flex gap-2 pt-0.5">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="text-xs font-semibold bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg border border-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
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
            )}

            {/* Actions */}
            {!isViewOnly && !editing && (
              <div className="flex items-center gap-0.5 flex-shrink-0 pr-3">
                {/* Edit */}
                <button
                  onClick={() => setEditing(true)}
                  title="Edit"
                  className="p-1.5 rounded-xl text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                {/* Delete */}
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
          {showEmbed && info.embedUrl && !editing && (
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
