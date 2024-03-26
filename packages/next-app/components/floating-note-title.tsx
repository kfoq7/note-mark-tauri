import { useEditor } from '@/hooks/useEditor'

export function FloatingNoteTitle() {
  const { selectedNote, updateNoteTitle, autoSaveTitle, error } = useEditor()

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

      {error && (
        <div className="pointer-events-none absolute right-8 top-10 z-10 rounded-md bg-white text-xs text-black">
          <div className="flex flex-col px-3 py-2">
            A file name can't contain any of the following characters:
            {/* Equivalent HTML entities <span>{'\\/:*?"<>|'}</span> */}
            <span>\&#47;&#58;&#42;&#63;&#34;&lt;&gt;&#124;</span>
          </div>
        </div>
      )}
    </div>
  )
}
