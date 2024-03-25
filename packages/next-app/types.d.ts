export interface NoteInfo {
  id: number
  title: string
  lastEditTime: number
}

export interface Note extends NoteInfo {
  content: string
}
