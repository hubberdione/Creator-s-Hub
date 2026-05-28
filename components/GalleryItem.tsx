'use client'

import React, { useState, useEffect, useRef } from 'react'
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

  const THUMB_W = editing ? 180 : 130

  return (
    <div
      className="flex-shrink-0 transition-all duration-200"
      style={{ width: THUMB_W, scrollSnapAlign: 'start' } as React.CSSProperties}
    >
      {/* Portrait thumbnail */}
      <button
        onClick={() => !editing && onPreview(link)}
        disabled={editing}
        className="group relative w-full block overflow-hidden rounded-2xl bg-[#1a1a1a] active:scale-[.97] transition-transform duration-150"
        style={{ aspectRatio: '9/16' }}
      >
        {/* Shimmer */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e] to-[#161616] animate-pulse" />
        )}

        {!imgError ? (
          <img
            src={info.thumb}
            alt=""
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-all duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'} group-active:scale-105`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d78] via-[#d4245f] to-[#8b0a35] flex items-center justify-center">
            <svg className="w-8 h-8 text-white/80 ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
        )}

        {/* Gradient overlay — always on, darker at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Play button — bottom centre */}
        {!editing && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center transition-all duration-200 group-active:scale-110 group-active:bg-white/30">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        )}
      </button>

      {/* Caption */}
      <div className="mt-2 px-0.5">
        {editing ? (
          <div className="space-y-1.5">
            <input
              ref={descRef}
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
              placeholder="Description"
              className="w-full text-xs font-bold bg-[#161616] border border-[#2a2a2a] rounded-xl px-3 py-2 focus:outline-none focus:border-[#ff2d78] text-[#f0ebe3] placeholder:text-[#444]"
            />
            <input
              value={editUrl}
              onChange={e => setEditUrl(e.target.value)}
              placeholder="URL"
              className="w-full text-xs bg-[#161616] border border-[#2a2a2a] rounded-xl px-3 py-2 focus:outline-none focus:border-[#444] text-[#666] placeholder:text-[#333]"
            />
            <div className="flex gap-1.5">
              <button onClick={handleSave} disabled={saving}
                className="flex-1 text-xs font-black bg-[#ff2d78] text-white py-2 rounded-xl disabled:opacity-50 active:scale-[.97] transition-all">
                {saving ? '…' : 'Save'}
              </button>
              <button onClick={() => setEditing(false)}
                className="flex-1 text-xs font-bold text-[#555] py-2 rounded-xl border border-[#222] active:scale-[.97] transition-all">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-xs font-bold text-[#666] line-clamp-2 leading-snug">{link.description}</p>
            {!isViewOnly && (
              <div className="flex items-center gap-1 mt-1.5">
                <button onClick={() => setEditing(true)}
                  className="p-1 rounded-lg text-[#333] hover:text-[#b8ff3a] hover:bg-[#b8ff3a]/5 transition-colors" title="Edit">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={handleDelete} disabled={deleting}
                  className="p-1 rounded-lg text-[#333] hover:text-[#ff2d78] hover:bg-[#ff2d78]/5 transition-colors disabled:opacity-40" title="Delete">
                  {deleting ? (
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
