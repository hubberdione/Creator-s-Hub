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
    <div className="bg-[#161616] rounded-2xl border border-[#222] overflow-hidden">

      {/* ── Category header ─────────────────────────────────────────────────── */}
      <button
        className="w-full px-4 py-4 flex items-center justify-between gap-3 active:bg-[#1a1a1a] transition-colors text-left"
        onClick={() => !managing && setCollapsed(v => !v)}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Icon bubble */}
          <div className="w-10 h-10 rounded-xl bg-[#1e1e1e] flex items-center justify-center flex-shrink-0 text-2xl leading-none">
            {category.icon}
          </div>

          <div className="min-w-0">
            <h2 className="text-base font-bold text-[#f0ebe3] leading-tight">{category.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-[#b8ff3a] bg-[#b8ff3a]/10 border border-[#b8ff3a]/20 px-2 py-0.5 rounded-full">
                {links.length} ref{links.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Delete category (manage mode) */}
          {managing && !isViewOnly && (
            confirmDelete ? (
              <div
                className="flex items-center gap-1.5 bg-[#1a1a1a] rounded-full px-2.5 py-1.5 border border-[#2a2a2a]"
                onClick={e => e.stopPropagation()}
              >
                <span className="text-xs text-[#888] font-bold">Delete?</span>
                <button onClick={() => onDeleteCategory(category.id)} className="text-xs font-bold text-[#ff2d78]">Yes</button>
                <button onClick={() => setConfirmDelete(false)} className="text-xs text-[#555]">No</button>
              </div>
            ) : (
              <button
                onClick={e => { e.stopPropagation(); setConfirmDelete(true) }}
                className="w-8 h-8 rounded-xl bg-[#1a1a1a] hover:bg-[#ff2d78]/10 text-[#444] hover:text-[#ff2d78] flex items-center justify-center transition-colors border border-[#2a2a2a]"
                title="Delete category"
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
              className="flex items-center gap-1.5 text-[#b8ff3a] text-xs font-bold px-3 py-1.5 rounded-xl transition-all border border-[#b8ff3a]/25 bg-[#b8ff3a]/8 hover:bg-[#b8ff3a]/15 active:scale-[.97]"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          )}

          {/* Collapse chevron */}
          {!managing && (
            <svg
              className={`w-4 h-4 text-[#333] transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          )}
        </div>
      </button>

      {/* ── Content (collapsible) ────────────────────────────────────────────── */}
      {!collapsed && (
        <>
          {/* Gallery view */}
          {viewMode === 'gallery' && (
            links.length === 0 ? (
              <div className="border-t border-[#1e1e1e] py-10 text-center">
                <p className="text-2xl mb-2">🎬</p>
                <p className="text-sm font-bold text-[#333]">No references yet</p>
                {!isViewOnly && <p className="text-xs text-[#2a2a2a] mt-1">Add one above</p>}
              </div>
            ) : (
              <div
                className="gallery-scroll flex gap-2.5 overflow-x-auto px-3 pt-3 pb-4 border-t border-[#1e1e1e]"
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
                  className={`divide-y divide-[#1e1e1e] min-h-[4rem] transition-colors duration-150 border-t border-[#1e1e1e] ${snapshot.isDraggingOver ? 'bg-[#ff2d78]/5' : ''}`}
                >
                  {links.length === 0 && !snapshot.isDraggingOver ? (
                    <div className="py-10 text-center">
                      <p className="text-2xl mb-2">🎬</p>
                      <p className="text-sm font-bold text-[#333]">No references yet</p>
                      {!isViewOnly && <p className="text-xs text-[#2a2a2a] mt-1">Add one above</p>}
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
        </>
      )}
    </div>
  )
}
