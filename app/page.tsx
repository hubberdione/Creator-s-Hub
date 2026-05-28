import { Suspense } from 'react'
import CreatorHub from '@/components/CreatorHub'

export default function Home() {
  return (
    <Suspense>
      <CreatorHub />
    </Suspense>
  )
}
