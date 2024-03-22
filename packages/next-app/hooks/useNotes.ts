'use client'

import { useContext } from 'react'
import { NotesContext } from '@/providers/notes'

export function useNotes() {
  const context = useContext(NotesContext)

  if (context == null) {
    throw new Error('useNotes must be used within a NotesProvider.')
  }

  const { notes, addNote, selectedNote, setSelectedNote } = context

  const selectNote = (title: string) => {
    const note = notes.find(note => note.title === title)
    if (!note) return
    const content = ''
    const noteContent = { ...note, content }
    setSelectedNote(noteContent)
  }

  return {
    notes,
    selectedNote,
    addNote,
    selectNote
  }
}
