'use client'

import { useState, useEffect, useRef } from 'react'

type Props = {
  categoryId: string
  categoryName: string
  onAdd: (categoryId: string, url: string, description: string) => Promise<void>
  onClose: () => void
}

export default function AddLinkModal({ categoryId, categoryName, onAdd, onClose }: Props) {
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const descRef = useRef<HTMLInputElement>(null)

  useEffect(() => { descRef.current?.focus() }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim() || !description.trim()) return
    setSaving(true)
    await onAdd(categoryId, url.trim(), description.trim())
    setSaving(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-[#161616] border border-[#2a2a2a] rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-4 flex items-start justify-between border-b border-[#1e1e1e]">
          <div>
            <h3 className="text-base font-bold text-[#f0ebe3]">Add Reference</h3>
            <p className="text-xs text-[#555] mt-0.5 font-bold">Adding to <span className="text-[#888]">{categoryName}</span></p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-[#555] hover:text-[#888] hover:bg-[#222] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-[#555] uppercase tracking-widest mb-2">Description</label>
            <input
              ref={descRef}
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What's this reference about?"
              className="w-full px-4 py-3 rounded-2xl bg-[#111] border border-[#2a2a2a] focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78]/20 outline-none text-sm font-bold text-[#f0ebe3] placeholder:text-[#444] transition-all"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-[#555] uppercase tracking-widest mb-2">URL</label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://instagram.com/reel/..."
              className="w-full px-4 py-3 rounded-2xl bg-[#111] border border-[#2a2a2a] focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78]/20 outline-none text-sm text-[#888] placeholder:text-[#444] transition-all"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-[#2a2a2a] text-sm font-bold text-[#555] hover:text-[#888] hover:bg-[#1a1a1a] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !url.trim() || !description.trim()}
              className="flex-1 py-3 rounded-2xl bg-[#ff2d78] hover:bg-[#e0265e] disabled:opacity-40 text-white text-sm font-bold transition-colors"
            >
              {saving ? 'Adding…' : 'Add Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
