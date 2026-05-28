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

const userUpdateSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
  name: z.string().min(2).optional(),
})

const userDeleteSchema = z.object({
  id: z.string().uuid(),
})

export { userSignUpSchema, userLoginSchema, userUpdateSchema, userDeleteSchema }
export type { UserSignUpSchemaType, UserLoginSchemaType }
