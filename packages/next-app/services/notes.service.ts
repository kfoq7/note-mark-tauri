import { readDir, writeTextFile, readTextFile, BaseDirectory, renameFile } from '@tauri-apps/api/fs'
import { invoke } from '@tauri-apps/api/tauri'
import { formatDateFromUnix, type FileMetadata } from '@/lib/utlis'
import type { NoteInfo } from '@/types'

const getHomeDir = async () => {
  const { homeDir } = await import('@tauri-apps/api/path')
  return await homeDir()
}

const parseNoteFromFile = async (filename: string): Promise<NoteInfo> => {
  const HOME_DIR = await getHomeDir()
  const filestat = await invoke<FileMetadata>('get_modified_time', {
    filePath: `${HOME_DIR}/NoteMark/${filename}`
  })

  const title = filename.replace(/\.md$/, '')
  const lastEdit = formatDateFromUnix(filestat)

  return {
    id: lastEdit,
    title,
    lastEditTime: lastEdit
  }
}

export const getNotes = async (): Promise<NoteInfo[]> => {
  const notesFilename = await readDir('NoteMark', { dir: BaseDirectory.Home })

  const notes = notesFilename
    .filter(({ name }) => typeof name !== 'undefined' && name.endsWith('.md'))
    .map(({ name }) => name ?? '')

  return Promise.all(notes.map(parseNoteFromFile))
}

export const readNote = async (title: string) => {
  const HOME_DIR = await getHomeDir()
  const { resolve } = await import('@tauri-apps/api/path')
  const resolvePath = await resolve(HOME_DIR, 'NoteMark', `${title}.md`)
  const content = await readTextFile(resolvePath, { dir: BaseDirectory.Home })
  return content
}

export const renameNote = async (oldName: string, newName: string) => {
  if (oldName === newName) return

  const HOME_DIR = await getHomeDir()
  const { resolve } = await import('@tauri-apps/api/path')

  const [oldPath, newPath] = await Promise.all([
    resolve(HOME_DIR, 'NoteMark', `${oldName}.md`),
    resolve(HOME_DIR, 'NoteMark', `${newName}.md`)
  ])
  await renameFile(oldPath, newPath, { dir: BaseDirectory.Home })
}

export const saveNote = async ({ title, content }: { title: string; content: string }) => {
  await writeTextFile(`NoteMark/${title}.md`, content, { dir: BaseDirectory.Home })
}
