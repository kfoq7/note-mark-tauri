'use client'

import { useContext, useRef } from 'react'
import { debounce, throttle } from 'lodash'
import { AUTO_SAVE_TIME } from '@/lib/consts'
import { NotesContext } from '@/providers/notes'
import { renameNote, saveNote } from '@/services/notes.service'
import type { MDXEditorMethods } from '@mdxeditor/editor'

export function useEditor() {
  const context = useContext(NotesContext)
  const editorRef = useRef<MDXEditorMethods>(null)

  if (context == null) {
    throw new Error('useEditor must be used within a NotesProvider.')
  }

  const { selectedNote, oldTitle, setSelectedNote, setOldTitle, addOrUpdateNote } = context

  const autoSaveNote = throttle(
    async (content: string) => {
      if (!selectedNote) return

      await saveNote({ title: selectedNote.title, content })
    },
    AUTO_SAVE_TIME,
    {
      leading: false,
      trailing: true
    }
  )

  const save = async () => {
    if (!selectedNote) return

    autoSaveNote.cancel()

    const content = editorRef.current?.getMarkdown() ?? ''
    await saveNote({ title: selectedNote.title, content })
  }

  const autoRenameNote = debounce(async (title: string) => {
    if (!selectedNote) return

    console.log('Updated title', title)

    await renameNote(oldTitle, title)
    setOldTitle(title)
  })

  const updateNoteTitle = async (title: string) => {
    if (!selectedNote) return

    setSelectedNote(prev => {
      if (!prev) return prev

      const updateTitle = { ...prev, title }
      addOrUpdateNote(updateTitle)
      return updateTitle
    })

    await renameNote(oldTitle, title)
    setOldTitle(title)
  }

  const onblur = async (title: string) => {
    if (!selectedNote) return

    autoRenameNote.cancel()

    await renameNote(oldTitle, title)
    setOldTitle(title)
  }

  return {
    editorRef,
    selectedNote,
    autoSaveNote,
    autoRenameNote,
    save,
    updateNoteTitle,
    onblur
  }
}
