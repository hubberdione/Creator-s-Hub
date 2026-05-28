'use client'

import { useState, useEffect, useRef } from 'react'
import { Link } from '@/lib/supabase'
import { getLinkInfo } from '@/lib/linkInfo'

type Props = {
  link: Link
  isViewOnly: boolean
  onDelete: () => void
  onEdit: (id: string, description: string, url: string) => Promise<void>
  onPreview: (link: Link) => void
}

export default function GalleryItem({ link, isViewOnly, onDelete, onEdit, onPreview }: Props) {
  const info = getLinkInfo(link.url)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError]   = useState(false)
  const [deleting, setDeleting]   = useState(false)
  const [editing, setEditing]     = useState(false)
  const [editDesc, setEditDesc]   = useState(link.description)
  const [editUrl, setEditUrl]     = useState(link.url)
  const [saving, setSaving]       = useState(false)
  const descRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setImgLoaded(false)
    setImgError(false)
    setEditDesc(link.description)
    setEditUrl(link.url)
  }, [link.url, link.description])

  useEffect(() => { if (editing) descRef.current?.focus() }, [editing])

  async function handleSave() {
    if (!editDesc.trim() || !editUrl.trim()) return
    setSaving(true)
    await onEdit(link.id, editDesc.trim(), editUrl.trim())
    setSaving(false)
    setEditing(false)
  }

  async function handleDelete() {
    setDeleting(true)
    await onDelete()
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {/* Thumbnail */}
      <button
        onClick={() => !editing && onPreview(link)}
        className="relative w-full aspect-square group block overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100"
      >
        {!imgError ? (
          <>
            {!imgLoaded && <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 animate-pulse" />}
            <img
              src={info.thumb}
              alt=""
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        )}
        {/* Play overlay */}
        {imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
              <svg className="w-5 h-5 text-rose-500 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        )}
      </button>

      {/* Info / Edit form */}
      <div className="p-2.5">
        {editing ? (
          <div className="space-y-1.5">
            <input
              ref={descRef}
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              placeholder="Description"
              className="w-full text-xs font-semibold border border-rose-300 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-rose-200 text-gray-900"
            />
            <input
              value={editUrl}
              onChange={e => setEditUrl(e.target.value)}
              placeholder="URL"
              className="w-full text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-rose-100 text-gray-600"
            />
            <div className="flex gap-1.5">
              <button onClick={handleSave} disabled={saving} className="flex-1 text-xs font-semibold bg-rose-500 text-white py-1 rounded-lg disabled:opacity-50">
                {saving ? '…' : 'Save'}
              </button>
              <button onClick={() => setEditing(false)} className="flex-1 text-xs text-gray-500 py-1 rounded-lg border border-gray-200">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">{link.description}</p>
            {!isViewOnly && (
              <div className="flex items-center justify-end gap-0.5 mt-1.5">
                <button onClick={() => setEditing(true)} className="p-1 rounded-lg text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={handleDelete} disabled={deleting} className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40">
                  {deleting ? (
                    <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
