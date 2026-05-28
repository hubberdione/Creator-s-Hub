'use client'

import { useState } from 'react'
import React from 'react'
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
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: category.color ?? '#fff1f2' }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none">{category.icon}</span>
          <div>
            <h2 className="font-bold text-gray-900 leading-tight">{category.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{links.length} reference{links.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Delete category (manage mode) */}
          {managing && !isViewOnly && (
            confirmDelete ? (
              <div className="flex items-center gap-1.5 bg-white/80 rounded-full px-2 py-1">
                <span className="text-xs text-gray-600 font-medium">Delete?</span>
                <button onClick={() => onDeleteCategory(category.id)} className="text-xs font-bold text-red-500 hover:text-red-700">Yes</button>
                <button onClick={() => setConfirmDelete(false)} className="text-xs text-gray-400 hover:text-gray-600">No</button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-7 h-7 rounded-full bg-white/70 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-colors"
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
              className="flex items-center gap-1 bg-white/70 hover:bg-white text-gray-700 text-sm font-semibold px-3 py-1.5 rounded-full transition-colors border border-white/50"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
          <p className="py-8 text-center text-sm text-gray-400 px-5">
            {isViewOnly ? 'No references yet' : 'No references yet — switch to list view to add'}
          </p>
        ) : (
          <div
            className="flex gap-2.5 overflow-x-auto px-3 pt-3 pb-4"
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
              className={`divide-y divide-gray-50 min-h-[4rem] transition-colors duration-150 ${snapshot.isDraggingOver ? 'bg-rose-50/60' : ''}`}
            >
              {links.length === 0 && !snapshot.isDraggingOver ? (
                <div className="px-5 py-8 text-center text-sm text-gray-400">
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
