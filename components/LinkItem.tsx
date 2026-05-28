'use client'

import { useState, useRef, useEffect } from 'react'
import { Link, Category } from '@/lib/supabase'

type Props = {
  link: Link
  allCategories: Category[]
  isViewOnly: boolean
  onDelete: () => void
  onMove: (categoryId: string) => void
}

function shortUrl(url: string) {
  try {
    const u = new URL(url)
    const path = u.pathname.length > 22 ? u.pathname.slice(0, 22) + '…' : u.pathname
    return u.hostname.replace('www.', '') + path
  } catch {
    return url.slice(0, 40)
  }
}

export default function LinkItem({ link, allCategories, isViewOnly, onDelete, onMove }: Props) {
  const [showMove, setShowMove] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const moveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moveRef.current && !moveRef.current.contains(e.target as Node)) {
        setShowMove(false)
      }
    }
    if (showMove) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showMove])

  async function handleDelete() {
    setDeleting(true)
    await onDelete()
  }

  const otherCategories = allCategories.filter(c => c.id !== link.category_id)

  return (
    <div className="px-5 py-4 flex items-start gap-3 hover:bg-gray-50/50 transition-colors">
      {/* Play icon bubble */}
      <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-sm shadow-rose-100">
        <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-sm font-medium text-gray-900 leading-snug hover:text-rose-600 transition-colors"
        >
          {link.description}
        </a>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{shortUrl(link.url)}</p>
      </div>

      {/* Admin actions */}
      {!isViewOnly && (
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Move to category */}
          {otherCategories.length > 0 && (
            <div className="relative" ref={moveRef}>
              <button
                onClick={() => setShowMove(v => !v)}
                title="Move to category"
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>

              {showMove && (
                <div className="absolute right-0 top-9 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-30 min-w-[180px]">
                  <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Move to
                  </p>
                  {otherCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { onMove(cat.id); setShowMove(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2.5 transition-colors"
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={deleting}
            title="Delete"
            className="p-1.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
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
  )
}
