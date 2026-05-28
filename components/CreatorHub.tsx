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

type Props = { onBack?: () => void }

export default function CreatorHub({ onBack }: Props) {
  const searchParams = useSearchParams()
  const isViewOnly = searchParams.get('edit') !== 'true'

  const [categories, setCategories] = useState<Category[]>([])
  const [links, setLinks]           = useState<Link[]>([])
  const [loading, setLoading]       = useState(true)

  const [viewMode, setViewMode]               = useState<ViewMode>('gallery')
  const [managing, setManaging]               = useState(false)
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

  function handleShare() {
    const url = `${window.location.origin}${window.location.pathname}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#1e1e1e] border-t-[#ff2d78] rounded-full animate-spin" />
          <p className="text-sm text-[#444] font-bold tracking-widest uppercase">Loading</p>
        </div>
      </div>
    )
  }

  const totalLinks = links.length

  return (
    <div className="min-h-screen bg-[#0d0d0d]">

      {/* Thin pink accent line at very top */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ff2d78] via-[#ff2d78]/60 to-transparent" />

      {/* ── Header ─────────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-[#0d0d0d]/96 backdrop-blur-xl border-b border-[#1a1a1a]">
        <div className="max-w-xl mx-auto px-4 pt-5 pb-4">

          {/* Brand row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3 min-w-0">
              {/* Back button */}
              {onBack && (
                <button
                  onClick={onBack}
                  className="w-9 h-9 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center text-[#666] hover:text-[#f0ebe3] hover:border-[#333] active:scale-[.93] transition-all flex-shrink-0"
                  title="Back to brief"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              <div className="min-w-0">
                <p className="text-[10px] font-black text-[#b8ff3a] tracking-[0.2em] uppercase">
                  Hello Nancy x Miami Swim Week
                </p>
                <h1 className="text-2xl font-black tracking-tight text-[#f0ebe3] leading-none mt-1">
                  Script Library
                </h1>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {!isViewOnly && (
                <button
                  onClick={() => setManaging(v => !v)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border ${managing ? 'bg-[#ff2d78]/15 text-[#ff2d78] border-[#ff2d78]/30' : 'bg-[#1a1a1a] text-[#555] border-[#222] hover:text-[#888]'}`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
              {!isViewOnly && (
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 bg-[#ff2d78] hover:bg-[#e0265e] active:scale-[.95] text-white text-xs font-black px-3.5 py-2 rounded-xl transition-all tracking-wide"
                >
                  {copied ? '✓ Copied' : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Share
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Stats + toggle row */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#3a3a3a] font-bold">
              {totalLinks} videos · {categories.length} categories
            </p>

            <div className="flex items-center gap-2">
              {/* View-only pill */}
              {isViewOnly && (
                <span className="text-[10px] font-bold text-[#333] tracking-widest uppercase">View only</span>
              )}

              {/* Manage new category */}
              {managing && !isViewOnly && (
                <button
                  onClick={() => setAddingCategory(true)}
                  className="flex items-center gap-1.5 text-xs font-black bg-[#b8ff3a] text-[#0d0d0d] px-3 py-1.5 rounded-xl active:scale-[.97] transition-all"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  New
                </button>
              )}

              {/* View toggle */}
              <div className="flex bg-[#141414] border border-[#1e1e1e] rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode('gallery')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${viewMode === 'gallery' ? 'bg-[#222] text-[#f0ebe3]' : 'text-[#444] hover:text-[#666]'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${viewMode === 'list' ? 'bg-[#222] text-[#f0ebe3]' : 'text-[#444] hover:text-[#666]'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ── Content ────────────────────────────────────────────────────────────── */}
      <main className="max-w-xl mx-auto px-4 pt-5 pb-24 space-y-4">
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

        {categories.length === 0 && (
          <div className="pt-24 text-center">
            <p className="text-5xl mb-5">📂</p>
            <p className="text-lg font-black text-[#333]">No categories yet</p>
            {!isViewOnly && <p className="text-sm text-[#2a2a2a] mt-2">Open settings to add one</p>}
          </div>
        )}
      </main>

      {addingToCategory && (
        <AddLinkModal
          categoryId={addingToCategory}
          categoryName={categories.find(c => c.id === addingToCategory)?.name ?? ''}
          onAdd={addLink}
          onClose={() => setAddingToCategory(null)}
        />
      )}
      {addingCategory && (
        <AddCategoryModal onAdd={addCategory} onClose={() => setAddingCategory(false)} />
      )}
      {embedLink && (
        <EmbedModal link={embedLink} onClose={() => setEmbedLink(null)} />
      )}
    </div>
  )
}
