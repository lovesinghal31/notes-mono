"use client"

import React from "react"
import dynamic from "next/dynamic"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { api } from "@/lib/api"
import { getErrorMessage } from "@/lib/error-handler"

import {
  ApiResponse,
  createNoteSchema,
  CreateNoteSchemaType,
  INote,
} from "@mono-fun/types"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"

const NoteEditor = dynamic(() => import("@/components/editor/note-editor"), {
  ssr: false,
})

export default function Page() {
  const router = useRouter()
  const [saving, setSaving] = React.useState(false)

  const form = useForm<CreateNoteSchemaType>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      content: "Start writing your note here...",
    },
  })

  const onSubmit = async (data: CreateNoteSchemaType) => {
    try {
      setSaving(true)

      const response = await api.post<ApiResponse<INote>>("/notes", data)

      if (response.data.success) {
        toast.success("Note created successfully!")
      }
      router.push(`/notes/${response.data.data?.id}`)
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

          <Button
            form="create-note-form"
            type="submit"
            disabled={saving}
            className="min-w-24"
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>

        <form id="create-note-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Title */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="note-title">Title</FieldLabel>

                  <Input
                    {...field}
                    id="note-title"
                    type="text"
                    placeholder="Note Title"
                    aria-invalid={fieldState.invalid}
                    className="bg-background text-lg font-bold placeholder:text-muted-foreground"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Editor */}
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Content</FieldLabel>

                  {/* <div className="rounded-xl border bg-card shadow-sm"> */}
                  <NoteEditor
                    initialContent={field.value}
                    onChange={field.onChange}
                  />
                  {/* </div> */}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>
    </main>
  )
}
