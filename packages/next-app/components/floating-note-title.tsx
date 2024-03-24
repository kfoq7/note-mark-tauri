import { useNotes } from '@/hooks/useNotes'

export function FloatingNoteTitle() {
  const { selectedNote } = useNotes()

  if (!selectedNote) return null

  return (
    <div className="sticky top-0 flex justify-center py-2 backdrop-blur-sm">
      <span className="text-gray-400">{selectedNote.title}</span>
    </div>
  )
}
