import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin
} from '@mdxeditor/editor'
import { useEditor } from '@/hooks/useEditor'

export default function Editor() {
  const { editorRef, selectedNote, autoSaveNote, saveNote } = useEditor()

  if (selectedNote == null) return null

  return (
    <MDXEditor
      key={selectedNote.title}
      ref={editorRef}
      markdown={selectedNote.content ?? ''}
      onChange={autoSaveNote}
      onBlur={saveNote}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
      contentEditableClassName="prose prose-invert prose-p:my-3 prose-p:leading-relaxed prose-headings:my-4 prose-headings:text-balance prose-blockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-red-500 prose-code:before:content-[''] prose-code:after:content-[''] h-[calc(100vh-41px)] max-w-none px-8 py-5 text-lg caret-yellow-500 outline-none"
    />
  )
}
