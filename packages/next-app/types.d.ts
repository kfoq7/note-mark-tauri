export type NoteInfo = {
  title: string
  lastEditTime: number
}

export type NoteContent = string

export type Note = NoteInfo & NoteContent
