"use client"
import { getNotesById } from "@/hooks/note"
import { INote } from "@mono-fun/types"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import NoteEditForm from "@/components/editor/note-edit-form"

export default function NoteEditFormWrapper({ id }: { id: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [note, setNote] = useState<INote | null>(null)
  useEffect(() => {
    const fetchNote = async () => {
      setIsLoading(true)
      const note = await getNotesById(id)
      if (!note) {
        router.push("/notes")
        return
      }
      setNote(note)
      setIsLoading(false)
    }
    fetchNote()
  }, [id])

  if (isLoading || !note) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Skeleton className="mb-4 h-10 w-1/2" />
        <Skeleton className="mb-8 h-6 w-1/4" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-5/6" />
      </div>
    )
  }

  return <NoteEditForm note={note} />
}
