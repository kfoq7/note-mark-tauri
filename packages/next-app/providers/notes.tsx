'use client'

import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { getNotes } from '@/services/notes.service'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import type { NoteInfo, Note } from '@/types'

export type NotesContextType = {
  oldTitle: string
  notes: NoteInfo[]
  selectedNote: Note | null
  addOrUpdateNote: (note: Note) => void
  setOldTitle: Dispatch<SetStateAction<string>>
  setSelectedNote: Dispatch<SetStateAction<Note | null>>
}

interface Props {
  children: React.ReactNode
}

export const NotesContext = createContext<NotesContextType | null>(null)

export default function NotesProvider({ children }: Props) {
  const [initialNotes, setNoteState] = useLocalStorage<NoteInfo[]>('notes', [])
  const [notes, setNotes] = useState<NoteInfo[]>(initialNotes)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [oldTitle, setOldTitle] = useState('')

  const addOrUpdateNote = (note: Note) => {
    setNotes(prevNotes => {
      const newNotes = prevNotes.map(prevNote => {
        if (prevNote.id === note.id) {
          return note
        }

        return prevNote
      })

      setNoteState(newNotes)
      return newNotes
    })
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
    <NotesContext.Provider
      value={{ notes, selectedNote, oldTitle, setOldTitle, addOrUpdateNote, setSelectedNote }}
    >
      {children}
    </NotesContext.Provider>
  )
}
