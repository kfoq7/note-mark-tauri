import { useEditor } from '@/hooks/useEditor'

export function FloatingNoteTitle() {
  const { selectedNote, updateNoteTitle, autoRenameNote } = useEditor()

  if (!selectedNote) return null

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    updateNoteTitle(title)
    // autoRenameNote(title)
  }

  return (
    <div className="sticky top-0 flex items-center justify-center py-2 backdrop-blur-sm">
      <span className="absolute text-center text-gray-400">{selectedNote.title}</span>
      <input
        className="z-50 w-full bg-transparent px-2 text-center text-gray-400 text-transparent caret-gray-100/70 outline-none"
        value={selectedNote.title}
        onChange={handleTitle}
        placeholder=""
      />
    </div>
  )
}
