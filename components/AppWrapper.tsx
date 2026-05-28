'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import BriefPage from './BriefPage'
import CreatorHub from './CreatorHub'

export default function AppWrapper() {
  const searchParams = useSearchParams()
  const isEdit = searchParams.get('edit') === 'true'

  // Edit mode skips the brief; view mode shows brief first
  const [showHub, setShowHub] = useState(isEdit)

  if (!showHub) {
    return <BriefPage onEnter={() => setShowHub(true)} />
  }

  return <CreatorHub />
}
