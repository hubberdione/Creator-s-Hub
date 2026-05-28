'use client'

import React, { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
import { Category, Link } from '@/lib/supabase'
import LinkItem from './LinkItem'
import GalleryItem from './GalleryItem'

type Props = {
  category: Category
  links: Link[]
  viewMode: 'list' | 'gallery'
  isViewOnly: boolean
  managing: boolean
  onAddLink: () => void
  onDeleteLink: (id: string) => void
  onEditLink: (id: string, description: string, url: string) => Promise<void>
  onDeleteCategory: (id: string) => void
  onPreview: (link: Link) => void
}

export default function CategoryCard({
  category, links, viewMode, isViewOnly, managing,
  onAddLink, onDeleteLink, onEditLink, onDeleteCategory, onPreview,
}: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [collapsed, setCollapsed]         = useState(false)

  return (
    <div className="bg-[#111] rounded-2xl border border-[#1a1a1a] overflow-hidden">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <button
        className="w-full px-5 py-5 flex items-center justify-between gap-4 active:bg-[#161616] transition-colors text-left group"
        onClick={() => !managing && setCollapsed(v => !v)}
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Large emoji */}
          <span className="text-3xl leading-none flex-shrink-0">{category.icon}</span>

          <div className="min-w-0">
            <h2 className="text-xl font-black text-[#f0ebe3] leading-tight tracking-tight">{category.name}</h2>
            <p className="text-xs font-bold text-[#b8ff3a] mt-1 tracking-wide">
              {links.length} reference{links.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Delete (manage mode) */}
          {managing && !isViewOnly && (
            confirmDelete ? (
              <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl px-3 py-2 border border-[#2a2a2a]"
                onClick={e => e.stopPropagation()}>
                <span className="text-xs text-[#888] font-bold">Delete?</span>
                <button onClick={() => onDeleteCategory(category.id)} className="text-xs font-black text-[#ff2d78]">Yes</button>
                <button onClick={() => setConfirmDelete(false)} className="text-xs text-[#555]">No</button>
              </div>
            ) : (
              <button
                onClick={e => { e.stopPropagation(); setConfirmDelete(true) }}
                className="w-8 h-8 rounded-xl bg-[#1a1a1a] hover:bg-[#ff2d78]/10 text-[#444] hover:text-[#ff2d78] flex items-center justify-center transition-colors border border-[#222]"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )
          )}

          {/* Add link */}
          {!isViewOnly && !managing && (
            <button
              onClick={e => { e.stopPropagation(); onAddLink() }}
              className="flex items-center gap-1.5 text-[#b8ff3a] text-xs font-black px-3 py-2 rounded-xl border border-[#b8ff3a]/20 bg-[#b8ff3a]/5 hover:bg-[#b8ff3a]/10 active:scale-[.95] transition-all"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          )}

          {/* Chevron */}
          {!managing && (
            <svg
              className={`w-5 h-5 text-[#2a2a2a] group-active:text-[#444] transition-transform duration-300 ease-in-out ${collapsed ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          )}
        </div>
      </button>

      {/* ── Content — animated collapse ──────────────────────────────────────── */}
      <div className={`grid transition-all duration-300 ease-in-out ${collapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}>
        <div className="overflow-hidden">
          <div className="border-t border-[#1a1a1a]">

            {/* Gallery view */}
            {viewMode === 'gallery' && (
              links.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-3xl mb-3">🎬</p>
                  <p className="text-sm font-bold text-[#2a2a2a]">No references yet</p>
                </div>
              ) : (
                <div
                  className="gallery-scroll flex gap-3 overflow-x-auto px-5 pt-4 pb-5"
                  style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
                >
                  {links.map(link => (
                    <GalleryItem
                      key={link.id}
                      link={link}
                      isViewOnly={isViewOnly}
                      onDelete={() => onDeleteLink(link.id)}
                      onEdit={onEditLink}
                      onPreview={onPreview}
                    />
                  ))}
                </div>
              )
            )}

            {/* List view */}
            {viewMode === 'list' && (
              <Droppable droppableId={category.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`divide-y divide-[#161616] min-h-[4rem] transition-colors duration-150 ${snapshot.isDraggingOver ? 'bg-[#ff2d78]/5' : ''}`}
                  >
                    {links.length === 0 && !snapshot.isDraggingOver ? (
                      <div className="py-12 text-center">
                        <p className="text-3xl mb-3">🎬</p>
                        <p className="text-sm font-bold text-[#2a2a2a]">No references yet</p>
                      </div>
                    ) : (
                      links.map((link, index) => (
                        <LinkItem
                          key={link.id}
                          link={link}
                          index={index}
                          isViewOnly={isViewOnly}
                          onDelete={() => onDeleteLink(link.id)}
                          onEdit={onEditLink}
                        />
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}

          </div>
        </div>
      </div>

    </div>
  )
}
