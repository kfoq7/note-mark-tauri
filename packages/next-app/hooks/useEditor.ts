import { useContext } from 'react'
import { throttle } from 'lodash'
import { NotesContext } from '@/providers/notes'
import { AUTO_SAVE_TIME } from '@/lib/consts'

export function useEditor() {
  const context = useContext(NotesContext)

  if (context == null) {
    throw new Error('useNotes must be used within a NotesProvider.')
  }

  const { selectedNote } = context

  const autosave = throttle(
    async () => {
      if (!selectedNote) return

      // await saveNote(selected)
    },
    AUTO_SAVE_TIME,
    {
      leading: false,
      trailing: true
    }
  )

  const save = () => {
    if (!selectedNote) return

    autosave.cancel()
  }

  return {
    selectedNote,
    autosave,
    save
  }
}
