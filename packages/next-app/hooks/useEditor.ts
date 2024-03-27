'use client'

import { useContext, useRef, useState } from 'react'
import { throttle } from 'lodash'
import { AUTO_SAVE_TIME } from '@/lib/consts'
import { NotesContext } from '@/providers/notes'
import { renameNote, writeNote } from '@/services/notes.service'
import type { MDXEditorMethods } from '@mdxeditor/editor'

export function useEditor() {
  const context = useContext(NotesContext)
  const editorRef = useRef<MDXEditorMethods>(null)
  const [error, setError] = useState(false)

  if (context == null) {
    throw new Error('useEditor must be used within a NotesProvider.')
  }

  const { selectedNote, oldTitle, setOldTitle, updateSelectedNote } = context

  const autoSaveNote = throttle(
    async (content: string) => {
      if (!selectedNote) return

      updateSelectedNote()
      await writeNote({ title: selectedNote.title, content })
    },
    AUTO_SAVE_TIME,
    {
      leading: false,
      trailing: true
    }
  )

  const saveNote = async () => {
    if (!selectedNote) return

    autoSaveNote.cancel()

    const content = editorRef.current?.getMarkdown() ?? ''
    await writeNote({ title: selectedNote.title, content })
  }

  const updateNoteTitle = async (title: string) => {
    if (!selectedNote) return

    const isInvalidFilaname = /[~"#%&*:<>?/\\{|}]+/.test(title)
    setError(isInvalidFilaname)
    if (isInvalidFilaname) return

    updateSelectedNote({ title })
  }

  const autoSaveTitle = async (title: string) => {
    if (!selectedNote) return

    setError(false)

    await renameNote(oldTitle, title)
    setOldTitle(title)
  }

  return {
    error,
    editorRef,
    selectedNote,
    autoSaveNote,
    autoSaveTitle,
    updateNoteTitle,
    saveNote
  }
}
