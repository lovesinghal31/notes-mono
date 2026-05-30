import { z } from "zod"

const optionalField = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().or(z.literal("").transform(() => undefined))

const createNoteSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(2500),
})

type CreateNoteSchemaType = z.infer<typeof createNoteSchema>

const editNoteSchema = z.object({
  id: z.string().uuid(),
  title: optionalField(z.string().min(1).max(255)),
  content: optionalField(z.string().min(1).max(2500)),
})

type EditNoteSchemaType = z.infer<typeof editNoteSchema>

export { createNoteSchema, editNoteSchema }
export type { CreateNoteSchemaType, EditNoteSchemaType }
