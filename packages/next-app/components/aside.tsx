'use client'

import { NotePreviewList } from './note-preview-list'

export function Aside() {
  return (
    <aside className="flex h-screen w-[290px] flex-col">
      <div className="flex items-center justify-between p-3">
        <button className="rounded-md border border-zinc-400/50 px-2 py-1 transition-colors duration-100 hover:bg-zinc-600/50">
          New
        </button>
        <button className="rounded-md border border-zinc-400/50 px-2 py-1 transition-colors duration-100 hover:bg-zinc-600/50">
          Delete
        </button>
      </div>

      <NotePreviewList />
    </aside>
  )
}
