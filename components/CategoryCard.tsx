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

  return (
    <div className="bg-[#161616] rounded-2xl border border-[#222] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3.5 flex items-center justify-between border-b border-[#1e1e1e]">
        <div className="flex items-center gap-3">
          <span className="text-xl leading-none">{category.icon}</span>
          <div>
            <h2 className="font-bold text-[#f0ebe3] leading-tight text-sm">{category.name}</h2>
            <p className="text-[10px] text-[#555] mt-0.5 font-bold tracking-wide">{links.length} reference{links.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Delete category (manage mode) */}
          {managing && !isViewOnly && (
            confirmDelete ? (
              <div className="flex items-center gap-1.5 bg-[#1a1a1a] rounded-full px-2.5 py-1.5 border border-[#2a2a2a]">
                <span className="text-xs text-[#888] font-bold">Delete?</span>
                <button onClick={() => onDeleteCategory(category.id)} className="text-xs font-bold text-[#ff2d78] hover:text-red-400">Yes</button>
                <button onClick={() => setConfirmDelete(false)} className="text-xs text-[#555] hover:text-[#888]">No</button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-7 h-7 rounded-full bg-[#1a1a1a] hover:bg-[#ff2d78]/10 text-[#555] hover:text-[#ff2d78] flex items-center justify-center transition-colors border border-[#2a2a2a]"
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
              onClick={onAddLink}
              className="flex items-center gap-1 text-[#b8ff3a] text-xs font-bold px-3 py-1.5 rounded-full transition-colors border border-[#b8ff3a]/25 bg-[#b8ff3a]/8 hover:bg-[#b8ff3a]/15"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
          )}
        </div>
      </div>

      {/* Gallery view — horizontal scroll */}
      {viewMode === 'gallery' && (
        links.length === 0 ? (
          <p className="py-8 text-center text-xs text-[#555] font-bold tracking-wide px-5">
            {isViewOnly ? 'No references yet' : 'No references yet — switch to list view to add'}
          </p>
        ) : (
          <div
            className="gallery-scroll flex gap-2.5 overflow-x-auto px-3 pt-3 pb-4"
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
              className={`divide-y divide-[#1e1e1e] min-h-[4rem] transition-colors duration-150 ${snapshot.isDraggingOver ? 'bg-[#ff2d78]/5' : ''}`}
            >
              {links.length === 0 && !snapshot.isDraggingOver ? (
                <div className="px-5 py-8 text-center text-xs text-[#555] font-bold tracking-wide">
                  {isViewOnly ? 'No references yet' : 'No references yet — add one above'}
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
  )
}
