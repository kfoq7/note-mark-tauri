import { useEffect, useState, useRef } from 'react'
import { EditorState } from '@codemirror/state'
import { defaultKeymap } from '@codemirror/commands'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { EditorView, keymap, highlightActiveLine } from '@codemirror/view'

export const theme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent',
    width: '100%'
  }
})

interface Props {
  initialDoc: string
  onChange?: (state: EditorState) => void
}

export function useCodemirror<T extends Element>({}: Props) {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()

  useEffect(() => {
    if (!refContainer.current) return

    const startState = EditorState.create({
      doc: 'Welcome ',
      extensions: [
        keymap.of([...defaultKeymap]),
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          addKeymap: true
        }),
        theme
      ]
    })

    const view = new EditorView({
      state: startState,
      parent: refContainer.current
    })

    setEditorView(view)
  }, [refContainer])

  return {
    refContainer,
    editorView
  }
}
