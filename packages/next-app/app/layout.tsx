import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import { monoSpaced } from '@/lib/fonts'
import { Aside } from '@/components/aside'

const NotesProvider = dynamic(() => import('@/providers/notes'), { ssr: false })

export const metadata: Metadata = {
  title: 'NoteMarkTauri',
  description:
    'Note mark using Tauri and Next.js, powered by Tailwind CSS, and using the markdown extension to store the note content in the database. This is a demo project, so it is not a production project. The note content is stored in the markdown file. The .md and mdx field.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={monoSpaced.className}>
        <NotesProvider>
          <div className="flex min-h-screen divide-x-2 divide-zinc-900/50">
            <Aside />

            {children}
          </div>
        </NotesProvider>
      </body>
    </html>
  )
}
