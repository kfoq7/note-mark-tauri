'use client'

import { useCallback, useContext, useRef, useState } from 'react'
import { debounce, throttle } from 'lodash'
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

  const autoSaveNote = useCallback(
    throttle(
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
    ),
    []
  )

  const save = async () => {
    if (!selectedNote) return

    autoSaveNote.cancel()

    const content = editorRef.current?.getMarkdown() ?? ''
    await writeNote({ title: selectedNote.title, content })
  }

  const autoUpdateTitle = useCallback(
    debounce(async (title: string) => {
      if (!selectedNote) return

      const isValidFilename = /^[^\x00-\x1F\\/?%*:|"<>\.]+$/
      if (!isValidFilename.test(title)) {
        console.log('Character is not valid on change.')
        return
      }

      await renameNote(oldTitle, title)
      setOldTitle(title)
    }, AUTO_SAVE_TIME),
    [oldTitle]
  )

  const autoSaveTitle = async (title: string) => {
    if (!selectedNote) return

    const isValidFilename = /[~"#%&*:<>?/\\{|}]+/.test(title)
    setError(isValidFilename)
    if (isValidFilename) return

    updateSelectedNote({ title })
  }

  // const autoSaveTitle = (title: string) => {
  //   autoUpdateTitle(title)
  //   updateTitle(title)
  // }

  const updateNoteTitle = async (title: string) => {
    if (!selectedNote) return

    setError(false)

    autoUpdateTitle.cancel()

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
    save
  }
}
