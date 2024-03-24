import { useContext } from 'react'
import { NotesContext } from '@/providers/notes'
import { readNote } from '@/services/notes.service'

export function useNotes() {
  const context = useContext(NotesContext)

  if (context == null) {
    throw new Error('useNotes must be used within a NotesProvider.')
  }

  const { notes, selectedNote, setSelectedNote } = context

  const selectNote = async (title: string) => {
    const note = notes.find(note => note.title === title)
    if (!note) return
    const content = await readNote(note.title)
    const noteContent = { ...note, content }
    setSelectedNote(noteContent)
  }

  return {
    notes,
    selectedNote,
    selectNote
  }
}
