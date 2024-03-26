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
  updateSelectedNote: (note?: Partial<Note>) => void
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

  // Update the selected note with the last edit time and save it to local storage.
  // If necessary, pass an argument to update the title or content.
  const updateSelectedNote = (note?: Partial<Note>) => {
    setSelectedNote(prev => {
      if (!prev) return prev

      const updatedTitle = { ...prev, ...note, lastEditTime: Date.now() }
      addOrUpdateNote(updatedTitle)
      return updatedTitle
    })
  }

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
      value={{
        notes,
        selectedNote,
        oldTitle,
        setOldTitle,
        addOrUpdateNote,
        setSelectedNote,
        updateSelectedNote
      }}
    >
      {children}
    </NotesContext.Provider>
  )
}
