'use client'

import { Droppable } from '@hello-pangea/dnd'
import { Category, Link } from '@/lib/supabase'
import LinkItem from './LinkItem'

type Props = {
  category: Category
  links: Link[]
  isViewOnly: boolean
  onAddLink: () => void
  onDeleteLink: (id: string) => void
}

export default function CategoryCard({ category, links, isViewOnly, onAddLink, onDeleteLink }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ backgroundColor: category.color ?? '#fff1f2' }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none">{category.icon}</span>
          <div>
            <h2 className="font-bold text-gray-900 leading-tight">{category.name}</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {links.length} reference{links.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        {!isViewOnly && (
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

      {/* Droppable link list */}
      <Droppable droppableId={category.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`divide-y divide-gray-50 min-h-[4rem] transition-colors duration-150 ${
              snapshot.isDraggingOver ? 'bg-rose-50/60' : ''
            }`}
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
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
