'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { FloatingNoteTitle } from '@/components/floating-note-title'

const MarkdownEditor = dynamic(() => import('@/components/markdown-editor'), { ssr: false })

export default function App() {
  return (
    <main className="flex-1 overflow-y-auto bg-zinc-900/50 [scrollbar-gutter:stable]">
      <FloatingNoteTitle />

      <Suspense fallback={null}>
        <MarkdownEditor />
      </Suspense>
    </main>
  )
}
