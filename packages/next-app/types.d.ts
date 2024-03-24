export interface NoteInfo {
  id: string
  title: string
  lastEditTime: number
}

export interface Note extends NoteInfo {
  content: string
}
