import { useEditor } from '@/hooks/useEditor'

export function FloatingNoteTitle() {
  const { selectedNote, updateNoteTitle, autoSaveTitle } = useEditor()

  if (!selectedNote) return null

  return (
    <div className="sticky top-0 flex items-center justify-center py-2 backdrop-blur-sm">
      <input
        className="z-50 w-full bg-transparent px-2 text-center text-gray-400 caret-gray-100/70 outline-none"
        value={selectedNote.title}
        onChange={e => autoSaveTitle(e.target.value)}
        onBlur={e => updateNoteTitle(e.target.value)}
        placeholder=""
      />
    </div>
  )
}
