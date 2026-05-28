'use client'

import { useState } from 'react'

const COLOR_PRESETS = [
  { label: 'Rose',    value: '#fff1f2' },
  { label: 'Purple',  value: '#fdf4ff' },
  { label: 'Amber',   value: '#fff7ed' },
  { label: 'Pink',    value: '#fdf2f8' },
  { label: 'Green',   value: '#f0fdf4' },
  { label: 'Blue',    value: '#eff6ff' },
  { label: 'Teal',    value: '#f0fdfa' },
  { label: 'Yellow',  value: '#fefce8' },
]

const ICON_SUGGESTIONS = ['🎤','📱','🛍️','💕','🎬','🌴','🍦','📸','✨','🔥','💫','🎯','🎉','🎵','🌊','👑']

type Props = {
  onAdd: (name: string, icon: string, color: string) => Promise<void>
  onClose: () => void
}

export default function AddCategoryModal({ onAdd, onClose }: Props) {
  const [name, setName]   = useState('')
  const [icon, setIcon]   = useState('📁')
  const [color, setColor] = useState('#fff1f2')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    await onAdd(name.trim(), icon, color)
    setSaving(false)
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="px-6 pt-6 pb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">New Category</h3>
            <p className="text-sm text-gray-500 mt-0.5">Add a section to organise your references</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          {/* Preview */}
          <div className="rounded-2xl px-4 py-3 flex items-center gap-3" style={{ backgroundColor: color }}>
            <span className="text-2xl">{icon}</span>
            <span className="font-bold text-gray-900">{name || 'Category name…'}</span>
          </div>

          {/* Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name</label>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Behind the Scenes"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-rose-400 focus:ring-2 focus:ring-rose-100 outline-none text-sm text-gray-900"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Icon</label>
            <div className="flex flex-wrap gap-2">
              {ICON_SUGGESTIONS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setIcon(e)}
                  className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all ${
                    icon === e ? 'ring-2 ring-rose-400 bg-rose-50 scale-110' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Color</label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_PRESETS.map(c => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setColor(c.value)}
                  title={c.label}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    color === c.value ? 'border-rose-400 scale-110' : 'border-gray-200 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving || !name.trim()} className="flex-1 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
              {saving ? 'Adding…' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
