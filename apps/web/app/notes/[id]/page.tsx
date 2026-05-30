import NoteReaderWrapper from "@/components/editor/note-reader-wrapper"

export default async function NoteReaderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!id) {
    return <div>Note ID is required</div>
  }
  return <NoteReaderWrapper id={id} />
}
