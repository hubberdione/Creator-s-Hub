import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Creator Hub — LEM Miami Swim Week',
  description: 'Content reference hub for creators at LEM Miami Swim Week',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
