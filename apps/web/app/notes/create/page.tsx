"use client"

import { api } from "@/lib/api"
import { getErrorMessage } from "@/lib/error-handler"
import { ApiResponse, INote } from "@mono-fun/types"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import dynamic from "next/dynamic"
import React from "react"
import { toast } from "sonner"

const NoteEditor = dynamic(() => import("@/components/editor/note-editor"), {
  ssr: false,
})

export default function Page() {
  const [content, setContent] = React.useState(
    "Start writing your note here..."
  )
  const [title, setTitle] = React.useState("")

  const [saving, setSaving] = React.useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await api.post<ApiResponse<INote>>("/notes", {
        title,
        content,
      })
      if (response.data.success) {
        toast.success("Note created successfully!")
        // redirect to the note reader page
      }
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create Note</h1>
          </div>

          <Button onClick={handleSave} disabled={saving} className="min-w-24">
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
        {/* Title Input */}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Note Title"
            className="bg-background text-lg font-bold placeholder:text-muted-foreground focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* Editor */}
        <div className="rounded-2xl border bg-card shadow-sm">
          <NoteEditor initialContent={content} onChange={setContent} />
        </div>
      </div>
    </main>
  )
}
