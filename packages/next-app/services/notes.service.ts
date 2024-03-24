import {
  readDir,
  exists,
  writeFile,
  writeTextFile,
  readTextFile,
  BaseDirectory
} from '@tauri-apps/api/fs'
import { invoke } from '@tauri-apps/api/tauri'
import { formatDateFromUnix, type FileMetadata } from '@/lib/utlis'
import type { NoteInfo } from '@/types'

const parseNoteFromFile = async (filename: string): Promise<NoteInfo> => {
  const { homeDir } = await import('@tauri-apps/api/path')
  const HOME_DIR = await homeDir()
  const filestat = await invoke<FileMetadata>('get_modified_time', {
    filePath: `${HOME_DIR}/NoteMark/${filename}`
  })

  return {
    id: 0,
    title: filename.replace(/\.md$/, ''),
    lastEditTime: formatDateFromUnix(filestat)
  }
}

export const getNotes = async (): Promise<NoteInfo[]> => {
  const notesFilename = await readDir('NoteMark', { dir: BaseDirectory.Home })

  const notes = notesFilename
    .filter(({ name }) => typeof name !== 'undefined' && name.endsWith('.md'))
    .map(({ name }) => name ?? '')

  return Promise.all(notes.map(parseNoteFromFile))
}
