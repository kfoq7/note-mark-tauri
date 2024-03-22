'use client'

import { createContext, useState } from 'react'
import { notes as initialNotes } from '@/lib/data'
import type { NoteInfo, Note } from '@/types'

export type NotesContextType = {
  notes: NoteInfo[]
  selectedNote: Note | null
  addNote?: (note: NoteInfo) => void
  setSelectedNote: (note: Note) => void
}

export const NotesContext = createContext<NotesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export function NotesProvider({ children }: Props) {
  const [notes, setNotes] = useState<NoteInfo[]>(initialNotes)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const addNote = (note: NoteInfo) => {
    setNotes([...notes, note])
  }

  return (
    <NotesContext.Provider value={{ notes, selectedNote, addNote, setSelectedNote }}>
      {children}
    </NotesContext.Provider>
  )
}
