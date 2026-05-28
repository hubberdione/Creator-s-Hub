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

  useEffect(() => {
    descRef.current?.focus()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!url.trim() || !description.trim()) return
    setSaving(true)
    await onAdd(categoryId, url.trim(), description.trim())
    setSaving(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Add Reference</h3>
            <p className="text-sm text-gray-500 mt-0.5">Adding to <span className="font-medium text-gray-700">{categoryName}</span></p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Description
            </label>
            <input
              ref={descRef}
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What's this reference about?"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              URL
            </label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://instagram.com/reel/..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none text-sm text-gray-900 placeholder:text-gray-400 transition-all"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !url.trim() || !description.trim()}
              className="flex-1 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-sm font-semibold transition-colors shadow-sm shadow-rose-200"
            >
              {saving ? 'Adding…' : 'Add Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
