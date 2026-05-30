import NoteEditFormWrapper from "@/components/editor/note-edit-form-wrapper"

export default async function NoteEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!id) {
    return <div>Note ID is required</div>
  }
  return <NoteEditFormWrapper id={id} />
}
