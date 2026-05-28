import { Suspense } from 'react'
import AppWrapper from '@/components/AppWrapper'

export default function Home() {
  return (
    <Suspense>
      <AppWrapper />
    </Suspense>
  )
}
