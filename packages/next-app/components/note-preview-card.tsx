import { clsx } from 'clsx'
import { formatDateFromMs } from '@/lib/utlis'
import type { NoteInfo } from '@/types'

interface Props {
  note: NoteInfo
  isSelected?: boolean
  onClick: () => void
}

export function NotePreviewCard({ note, isSelected, onClick }: Props) {
  const { title, lastEditTime } = note

  const formatedDate = formatDateFromMs(lastEditTime)

  return (
    <li
      onClick={onClick}
      className={clsx(
        'w-full cursor-pointer rounded-md border border-zinc-400/50 px-3 py-4 hover:border-zinc-400 hover:bg-zinc-400/20',
        {
          'bg-zinc-400/20': isSelected
        }
      )}
    >
      <h2 className="truncate font-bold">{title}</h2>

      <p className="mb-2 inline-block w-full text-xs font-light">{formatedDate}</p>
    </li>
  )
}
