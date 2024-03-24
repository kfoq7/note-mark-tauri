'use client'

import { useContext, useRef } from 'react'
import { throttle } from 'lodash'
import { AUTO_SAVE_TIME } from '@/lib/consts'
import { NotesContext } from '@/providers/notes'
import { saveNote } from '@/services/notes.service'
import type { MDXEditorMethods } from '@mdxeditor/editor'

export function useEditor() {
  const context = useContext(NotesContext)
  const editorRef = useRef<MDXEditorMethods>(null)

  if (context == null) {
    throw new Error('useEditor must be used within a NotesProvider.')
  }

  const { selectedNote } = context

  const autosave = throttle(
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

    autosave.cancel()

    const content = editorRef.current?.getMarkdown() ?? ''
    await saveNote({ title: selectedNote.title, content })
  }

  return {
    editorRef,
    selectedNote,
    autosave,
    save
  }
}
