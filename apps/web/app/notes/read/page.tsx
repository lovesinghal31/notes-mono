import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{
    id: string
  }>
}

async function getNote(id: string) {
  /**
   * Replace with DB call
   * Example:
   * prisma.note.findUnique(...)
   */

  const note = {
    id,
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
    updatedAt: new Date(),
  }

  return note
}

export default async function Page({ params }: Props) {
  const { id } = await params

  const note = await getNote(id)

  if (!note) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{note.title}</h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Updated{" "}
            {new Intl.DateTimeFormat("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(note.updatedAt)}
          </p>
        </div>

        <Link
          href={`/notes/${id}/edit`}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Edit
        </Link>
      </div>

      {/* Markdown Content */}
      <article className="prose max-w-none prose-neutral dark:prose-invert prose-headings:scroll-mt-20 prose-blockquote:border-l-zinc-300 dark:prose-blockquote:border-l-zinc-700 prose-pre:rounded-xl prose-pre:border dark:prose-pre:border-zinc-800 dark:prose-pre:bg-zinc-900">
        <MDXRemote source={note.content} />
      </article>
    </main>
  )
}
