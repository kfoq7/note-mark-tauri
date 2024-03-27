import { useContext } from 'react'
import { NotesContext } from '@/providers/notes'
import { readNote, writeNote } from '@/services/notes.service'

export function useNotes() {
  const context = useContext(NotesContext)

  if (context == null) {
    throw new Error('useNotes must be used within a NotesProvider.')
  }

  const { notes, selectedNote, addOrUpdateNote, setSelectedNote, setOldTitle } = context

  const selectNote = async (title: string) => {
    const note = notes.find(note => note.title === title)
    if (!note) return
    const content = await readNote(note.title)
    const noteContent = { ...note, content }
    setSelectedNote(noteContent)
    setOldTitle(title)
  }

  const createEmptyNote = async () => {
    const now = Date.now()
    const newNote = {
      id: now,
      title: `Untitled-${now}`,
      content: '',
      lastEditTime: now
    }

    await writeNote(newNote)

    setSelectedNote(newNote)
    addOrUpdateNote(newNote)
    setOldTitle(newNote.title)
  }

  return {
    notes,
    selectedNote,
    selectNote,
    createEmptyNote
  }
}
