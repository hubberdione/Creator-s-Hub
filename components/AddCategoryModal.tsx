'use client'

import { useState } from 'react'

const ICON_SUGGESTIONS = ['🎤','📱','🛍️','💕','🎬','🌴','🍦','📸','✨','🔥','💫','🎯','🎉','🎵','🌊','👑']

type Props = {
  onAdd: (name: string, icon: string, color: string) => Promise<void>
  onClose: () => void
}

export default function AddCategoryModal({ onAdd, onClose }: Props) {
  const [name, setName]     = useState('')
  const [icon, setIcon]     = useState('📁')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    await onAdd(name.trim(), icon, '#161616')
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
            <h3 className="text-base font-bold text-[#f0ebe3]">New Category</h3>
            <p className="text-xs text-[#555] mt-0.5 font-bold">Add a section to organise your references</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-[#555] hover:text-[#888] hover:bg-[#222] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5 space-y-4">
          {/* Preview */}
          <div className="bg-[#1a1a1a] border border-[#222] rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="text-xl">{icon}</span>
            <span className="font-bold text-[#f0ebe3] text-sm">{name || 'Category name…'}</span>
          </div>

          {/* Name */}
          <div>
            <label className="block text-[10px] font-bold text-[#555] uppercase tracking-widest mb-2">Name</label>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Behind the Scenes"
              className="w-full px-4 py-3 rounded-2xl bg-[#111] border border-[#2a2a2a] focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78]/20 outline-none text-sm font-bold text-[#f0ebe3] placeholder:text-[#444] transition-all"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-[10px] font-bold text-[#555] uppercase tracking-widest mb-2">Icon</label>
            <div className="flex flex-wrap gap-2">
              {ICON_SUGGESTIONS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setIcon(e)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all border ${
                    icon === e
                      ? 'border-[#ff2d78] bg-[#ff2d78]/10 scale-110'
                      : 'border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#444]'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
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
              disabled={saving || !name.trim()}
              className="flex-1 py-3 rounded-2xl bg-[#b8ff3a] hover:bg-[#a8ef2a] disabled:opacity-40 text-[#0d0d0d] text-sm font-bold transition-colors"
            >
              {saving ? 'Adding…' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
