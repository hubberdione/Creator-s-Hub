'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { supabase, Category, Link } from '@/lib/supabase'
import CategoryCard from './CategoryCard'
import AddLinkModal from './AddLinkModal'

export default function CreatorHub() {
  const searchParams = useSearchParams()
  const isViewOnly = searchParams.get('view') === 'true'

  const [categories, setCategories] = useState<Category[]>([])
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(true)
  const [addingToCategory, setAddingToCategory] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const fetchData = useCallback(async () => {
    const [{ data: cats }, { data: lnks }] = await Promise.all([
      supabase.from('categories').select('*').order('position'),
      supabase.from('links').select('*').order('position'),
    ])
    setCategories(cats ?? [])
    setLinks(lnks ?? [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const newLinks = links.map(l => ({ ...l }))
    const movedLink = newLinks.find(l => l.id === draggableId)!

    const srcLinks = newLinks
      .filter(l => l.category_id === source.droppableId && l.id !== draggableId)
      .sort((a, b) => a.position - b.position)

    if (source.droppableId === destination.droppableId) {
      srcLinks.splice(destination.index, 0, movedLink)
      srcLinks.forEach((l, i) => { l.position = i })
      setLinks(newLinks)
      syncPositions(srcLinks)
    } else {
      movedLink.category_id = destination.droppableId
      const destLinks = newLinks
        .filter(l => l.category_id === destination.droppableId && l.id !== draggableId)
        .sort((a, b) => a.position - b.position)
      destLinks.splice(destination.index, 0, movedLink)
      srcLinks.forEach((l, i) => { l.position = i })
      destLinks.forEach((l, i) => { l.position = i })
      setLinks(newLinks)
      syncPositions([...srcLinks, ...destLinks])
    }
  }

  async function syncPositions(toUpdate: Link[]) {
    await Promise.all(toUpdate.map(l =>
      supabase.from('links').update({ category_id: l.category_id, position: l.position }).eq('id', l.id)
    ))
  }

  async function addLink(categoryId: string, url: string, description: string) {
    const position = links.filter(l => l.category_id === categoryId).length
    const { data, error } = await supabase
      .from('links')
      .insert({ category_id: categoryId, url, description, position })
      .select()
      .single()
    if (!error && data) setLinks(prev => [...prev, data])
    setAddingToCategory(null)
  }

  async function deleteLink(id: string) {
    await supabase.from('links').delete().eq('id', id)
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  async function editLink(id: string, description: string, url: string) {
    const { data, error } = await supabase
      .from('links')
      .update({ description, url })
      .eq('id', id)
      .select()
      .single()
    if (!error && data) setLinks(prev => prev.map(l => l.id === id ? data : l))
  }

  function handleShare() {
    const url = `${window.location.origin}${window.location.pathname}?view=true`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-rose-300 border-t-rose-500 rounded-full animate-spin" />
          <p className="text-sm text-rose-400 font-medium">Loading references…</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-rose-100/60">
        <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Creator Hub</h1>
            <p className="text-xs font-medium text-rose-400 mt-0.5">LEM Miami Swim Week</p>
          </div>
          {!isViewOnly && (
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors shadow-sm shadow-rose-200"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </>
              )}
            </button>
          )}
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-4 pb-12">
        {isViewOnly && (
          <div className="flex items-center justify-center gap-2 bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3 text-sm text-rose-500 font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View-only mode
          </div>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              category={category}
              links={links
                .filter(l => l.category_id === category.id)
                .sort((a, b) => a.position - b.position)}
              isViewOnly={isViewOnly}
              onAddLink={() => setAddingToCategory(category.id)}
              onDeleteLink={deleteLink}
              onEditLink={editLink}
            />
          ))}
        </DragDropContext>
      </main>

      {addingToCategory && (
        <AddLinkModal
          categoryId={addingToCategory}
          categoryName={categories.find(c => c.id === addingToCategory)?.name ?? ''}
          onAdd={addLink}
          onClose={() => setAddingToCategory(null)}
        />
      )}
    </div>
  )
}
