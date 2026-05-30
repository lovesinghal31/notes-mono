import { z } from "zod"

const createNoteSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(2500),
})

type CreateNoteSchemaType = z.infer<typeof createNoteSchema>

export { createNoteSchema }
export type { CreateNoteSchemaType }
