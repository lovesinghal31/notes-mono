"use client"

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  tablePlugin,
  linkPlugin,
  imagePlugin,
  ListsToggle,
  CreateLink,
  InsertTable,
  InsertThematicBreak,
  BlockTypeSelect,
  CodeToggle,
  InsertCodeBlock,
  InsertImage,
  Separator,
} from "@mdxeditor/editor"

import { oneDark } from "@codemirror/theme-one-dark"

type Props = {
  initialContent: string
  onChange: (content: string) => void
}

export default function NoteEditor({ initialContent, onChange }: Props) {
  return (
    <div className="rounded-lg border bg-background">
      <MDXEditor
        markdown={initialContent}
        onChange={onChange}
        className="mdx-editor"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          tablePlugin(),
          linkPlugin(),
          imagePlugin(),

          codeBlockPlugin({
            defaultCodeBlockLanguage: "js",
          }),

          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              ts: "TypeScript",
              jsx: "React JSX",
              tsx: "React TSX",
              json: "JSON",
              css: "CSS",
              html: "HTML",
              bash: "Bash",
            },
            autoLoadLanguageSupport: true,
            codeMirrorExtensions: [oneDark],
          }),

          toolbarPlugin({
            toolbarContents: () => (
              <>
                <UndoRedo />

                <Separator />

                <BlockTypeSelect />

                <Separator />

                <BoldItalicUnderlineToggles />

                <CodeToggle />

                <Separator />

                <ListsToggle />

                <Separator />

                <CreateLink />

                <InsertImage />

                <Separator />

                <InsertTable />

                <InsertThematicBreak />

                <Separator />

                <InsertCodeBlock />
              </>
            ),
          }),
        ]}
      />
    </div>
  )
}
