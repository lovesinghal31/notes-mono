"use client"

import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { INote } from "@mono-fun/types"

type Props = {
  note: INote
}

export default function NoteReader({ note }: Props) {
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
            }).format(new Date(note.updated_at))}
          </p>
        </div>

        <Link
          href={`/notes/${note.id}/edit`}
          className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Edit
        </Link>
      </div>

      {/* Markdown */}
      <article className="prose max-w-none prose-neutral dark:prose-invert prose-headings:scroll-mt-20 prose-blockquote:border-l-zinc-300 dark:prose-blockquote:border-l-zinc-700 prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border dark:prose-pre:border-zinc-800 dark:prose-pre:bg-zinc-900">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            pre({ children }) {
              return (
                <pre className="overflow-x-auto rounded-xl p-4">{children}</pre>
              )
            },

            code({ className, children, ...props }) {
              const isInline = !className

              if (isInline) {
                return (
                  <code
                    className="rounded bg-muted px-1.5 py-0.5 text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                )
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {note.content}
        </ReactMarkdown>
      </article>
    </main>
  )
}
