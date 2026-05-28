'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { supabase, Category, Link } from '@/lib/supabase'
import CategoryCard from './CategoryCard'
import AddLinkModal from './AddLinkModal'
import AddCategoryModal from './AddCategoryModal'
import EmbedModal from './EmbedModal'

type ViewMode = 'list' | 'gallery'

export default function CreatorHub() {
  const searchParams = useSearchParams()
  const isViewOnly = searchParams.get('view') === 'true'

  const [categories, setCategories] = useState<Category[]>([])
  const [links, setLinks]           = useState<Link[]>([])
  const [loading, setLoading]       = useState(true)

  const [viewMode, setViewMode]           = useState<ViewMode>('list')
  const [managing, setManaging]           = useState(false)
  const [addingToCategory, setAddingToCategory] = useState<string | null>(null)
  const [addingCategory, setAddingCategory]     = useState(false)
  const [embedLink, setEmbedLink]               = useState<Link | null>(null)
  const [copied, setCopied]                     = useState(false)

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

  // ── Drag & drop ──────────────────────────────────────────────────────────────
  function onDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    const newLinks = links.map(l => ({ ...l }))
    const movedLink = newLinks.find(l => l.id === draggableId)!
    const srcLinks = newLinks.filter(l => l.category_id === source.droppableId && l.id !== draggableId).sort((a, b) => a.position - b.position)

    if (source.droppableId === destination.droppableId) {
      srcLinks.splice(destination.index, 0, movedLink)
      srcLinks.forEach((l, i) => { l.position = i })
      setLinks(newLinks)
      syncPositions(srcLinks)
    } else {
      movedLink.category_id = destination.droppableId
      const destLinks = newLinks.filter(l => l.category_id === destination.droppableId && l.id !== draggableId).sort((a, b) => a.position - b.position)
      destLinks.splice(destination.index, 0, movedLink)
      srcLinks.forEach((l, i) => { l.position = i })
      destLinks.forEach((l, i) => { l.position = i })
      setLinks(newLinks)
      syncPositions([...srcLinks, ...destLinks])
    }
  }

  async function syncPositions(toUpdate: Link[]) {
    await Promise.all(toUpdate.map(l => supabase.from('links').update({ category_id: l.category_id, position: l.position }).eq('id', l.id)))
  }

  // ── Links CRUD ────────────────────────────────────────────────────────────────
  async function addLink(categoryId: string, url: string, description: string) {
    const position = links.filter(l => l.category_id === categoryId).length
    const { data, error } = await supabase.from('links').insert({ category_id: categoryId, url, description, position }).select().single()
    if (!error && data) setLinks(prev => [...prev, data])
    setAddingToCategory(null)
  }

  async function deleteLink(id: string) {
    await supabase.from('links').delete().eq('id', id)
    setLinks(prev => prev.filter(l => l.id !== id))
  }

  async function editLink(id: string, description: string, url: string) {
    const { data, error } = await supabase.from('links').update({ description, url }).eq('id', id).select().single()
    if (!error && data) setLinks(prev => prev.map(l => l.id === id ? data : l))
  }

  // ── Categories CRUD ───────────────────────────────────────────────────────────
  async function addCategory(name: string, icon: string, color: string) {
    const position = categories.length
    const { data, error } = await supabase.from('categories').insert({ name, icon, color, position }).select().single()
    if (!error && data) setCategories(prev => [...prev, data])
    setAddingCategory(false)
  }

  async function deleteCategory(id: string) {
    await supabase.from('categories').delete().eq('id', id)
    setCategories(prev => prev.filter(c => c.id !== id))
    setLinks(prev => prev.filter(l => l.category_id !== id))
  }

  // ── Share ─────────────────────────────────────────────────────────────────────
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
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-rose-100/60">
        <div className="max-w-xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-gray-900 leading-tight">Creator Hub</h1>
            <p className="text-xs font-medium text-rose-400">LEM Miami Swim Week</p>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* View toggle */}
            <div className="flex bg-gray-100 rounded-full p-0.5">
              <button
                onClick={() => setViewMode('list')}
                title="List view"
                className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                title="Gallery view"
                className={`p-1.5 rounded-full transition-all ${viewMode === 'gallery' ? 'bg-white shadow text-gray-700' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>

            {/* Manage categories */}
            {!isViewOnly && (
              <button
                onClick={() => setManaging(v => !v)}
                title="Manage categories"
                className={`p-2 rounded-full transition-all ${managing ? 'bg-rose-100 text-rose-500' : 'bg-gray-100 text-gray-400 hover:text-gray-600'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}

            {/* Share */}
            {!isViewOnly && (
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-3 py-2 rounded-full transition-colors shadow-sm shadow-rose-200"
              >
                {copied ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                )}
                {copied ? 'Copied!' : 'Share'}
              </button>
            )}
          </div>
        </div>

        {/* Manage categories banner */}
        {managing && !isViewOnly && (
          <div className="max-w-xl mx-auto px-4 pb-3 flex items-center justify-between">
            <p className="text-xs text-rose-500 font-medium">Tap 🗑 on any category to delete it</p>
            <button
              onClick={() => setAddingCategory(true)}
              className="flex items-center gap-1 text-xs font-semibold bg-rose-500 text-white px-3 py-1.5 rounded-full"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Category
            </button>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="max-w-xl mx-auto px-4 py-5 space-y-4 pb-16">
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
              links={links.filter(l => l.category_id === category.id).sort((a, b) => a.position - b.position)}
              viewMode={viewMode}
              isViewOnly={isViewOnly}
              managing={managing}
              onAddLink={() => setAddingToCategory(category.id)}
              onDeleteLink={deleteLink}
              onEditLink={editLink}
              onDeleteCategory={deleteCategory}
              onPreview={setEmbedLink}
            />
          ))}
        </DragDropContext>
      </main>

      {/* Modals */}
      {addingToCategory && (
        <AddLinkModal
          categoryId={addingToCategory}
          categoryName={categories.find(c => c.id === addingToCategory)?.name ?? ''}
          onAdd={addLink}
          onClose={() => setAddingToCategory(null)}
        />
      )}
      {addingCategory && (
        <AddCategoryModal
          onAdd={addCategory}
          onClose={() => setAddingCategory(false)}
        />
      )}
      {embedLink && (
        <EmbedModal
          link={embedLink}
          onClose={() => setEmbedLink(null)}
        />
      )}
    </div>
  )
}
