'use client'

import { createContext, useEffect, useState } from 'react'
import { getNotes } from '@/services/notes.service'
import type { NoteInfo, Note } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export type NotesContextType = {
  notes: NoteInfo[]
  selectedNote: Note | null
  addNote: (note: NoteInfo) => void
  setSelectedNote: (note: Note) => void
}

interface Props {
  children: React.ReactNode
}

export const NotesContext = createContext<NotesContextType | null>(null)

export default function NotesProvider({ children }: Props) {
  const [initialNotes, setNoteState] = useLocalStorage<NoteInfo[]>('notes', [])
  const [notes, setNotes] = useState<NoteInfo[]>(initialNotes)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  const addNote = (note: NoteInfo) => {
    // TODO: add notes that were create
    const { title } = note
    const newNotes = [note, ...notes]

    setNotes(
      newNotes.map(note => {
        if (note.title === title) {
          return {
            ...note,
            lastEditTime: Date.now()
          }
        }

        return note
      })
    )

    setNoteState(newNotes)
  }

  useEffect(() => {
    getNotes()
      .then(noteResult => {
        if (noteResult.length !== notes.length) {
          setNoteState(noteResult)
          setNotes(noteResult)
        }
      })
      .catch(console.error)
  }, [])

  return (
    <NotesContext.Provider value={{ notes, selectedNote, addNote, setSelectedNote }}>
      {children}
    </NotesContext.Provider>
  )
}
