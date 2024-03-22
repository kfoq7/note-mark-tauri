'use client'

import { useNotes } from '@/hooks/useNotes'
import { NotePreviewCard } from './note-preview-card'

export function NotePreviewList() {
  const { notes, selectedNote, selectNote } = useNotes()

  if (notes.length === 0) {
    return <span className="pt-4 text-center text-lg">No Notes Yet!</span>
  }

  return (
    <ul className="notes-list my-2 flex flex-col items-center gap-y-2 overflow-y-auto pl-3 pr-2">
      {notes.map(note => {
        const { id, title } = note

        return (
          <NotePreviewCard
            key={title}
            note={note}
            isSelected={id === selectedNote?.id}
            onClick={() => selectNote(note.title)}
          />
        )
      })}
    </ul>
  )
}
