'use client'

import { NotePreviewCard } from './note-preview-card'
import { useNotes } from '@/hooks/useNotes'

export function Aside() {
  const { notes, selectedNote, selectNote } = useNotes()

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

      <ul className="notes-list my-2 flex flex-col items-center gap-y-2 overflow-y-auto pl-3 pr-2">
        {notes.map((note, index) => (
          <NotePreviewCard
            key={note.title}
            note={note}
            isSelected={note.id === selectedNote?.id}
            onClick={() => selectNote(note.title)}
          />
        ))}
      </ul>
    </aside>
  )
}
