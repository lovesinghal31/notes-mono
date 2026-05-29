"use client"

import { Button } from "@workspace/ui/components/button"
import dynamic from "next/dynamic"
import React from "react"

const NoteEditor = dynamic(() => import("@/components/editor/note-editor"), {
  ssr: false,
})

const note = {
  id: "1",
  title: "My First Note",
  content: `
# Welcome

This is a **markdown note**.

## Features

- Markdown support
- Lists
- Headings
- Code blocks

### Example Code

\`\`\`ts
const hello = "world"
console.log(hello)
\`\`\`

> This is a blockquote
`,
  updatedAt: new Date("2026-05-29T18:14:00"),
}

export default function Page() {
  const [content, setContent] = React.useState(note.content)

  const [saving, setSaving] = React.useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)

      console.log("Saving content:", content)

      // await saveNote(content)
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
            <h1 className="text-2xl font-bold tracking-tight">{note.title}</h1>

            <p className="text-sm text-muted-foreground">
              Last updated{" "}
              {new Intl.DateTimeFormat("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(note.updatedAt)}
            </p>
          </div>

          <Button onClick={handleSave} disabled={saving} className="min-w-24">
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>

        {/* Editor */}
        <div className="rounded-2xl border bg-card shadow-sm">
          <NoteEditor initialContent={content} onChange={setContent} />
        </div>
      </div>
    </main>
  )
}
