import { z } from "zod"

const userSignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type UserSignUpSchemaType = z.infer<typeof userSignUpSchema>

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type UserLoginSchemaType = z.infer<typeof userLoginSchema>

const optionalField = <T extends z.ZodTypeAny>(schema: T) =>
  schema.optional().or(z.literal("").transform(() => undefined))

const userUpdateSchema = z.object({
  email: optionalField(z.string().email()),
  password: optionalField(z.string().min(8)),
  name: optionalField(z.string().min(2)),
})

type UserUpdateSchemaType = z.infer<typeof userUpdateSchema>

const userDeleteSchema = z.object({
  id: z.string().uuid(),
})

export { userSignUpSchema, userLoginSchema, userUpdateSchema, userDeleteSchema }
export type { UserSignUpSchemaType, UserLoginSchemaType, UserUpdateSchemaType }
