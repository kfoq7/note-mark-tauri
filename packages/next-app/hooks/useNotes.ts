import { useContext } from 'react'
import { NotesContext } from '@/providers/notes'
import { readNote, writeNote, removeNote } from '@/services/notes.service'

export function useNotes() {
  const context = useContext(NotesContext)

  if (context == null) {
    throw new Error('useNotes must be used within a NotesProvider.')
  }

  const { notes, selectedNote, addOrUpdateNote, setSelectedNote, setOldTitle, deleteNote } = context

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

  const deleteSelectedNote = async () => {
    console.log('Hello')
    if (!selectedNote) return

    await removeNote(selectedNote.title)

    setSelectedNote(null)
    setOldTitle('')
    deleteNote(selectedNote.title)
  }

  return {
    notes,
    selectedNote,
    selectNote,
    createEmptyNote,
    deleteSelectedNote
  }
}
