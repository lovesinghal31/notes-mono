"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  ApiResponse,
  IUser,
  userSignUpSchema,
  type UserSignUpSchemaType,
} from "@mono-fun/types"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getErrorMessage } from "@/lib/error-handler"
import { Input } from "@workspace/ui/components/input"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"
import Link from "next/link"

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const form = useForm<UserSignUpSchemaType>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  async function onSubmit(data: UserSignUpSchemaType) {
    try {
      setIsSubmitting(true)
      const response = await axios.post<ApiResponse<IUser>>(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"}/users/register`,
        data,
        {
          withCredentials: true,
        }
      )
      if (response.data.success) {
        toast.success("Registration successful! Please log in.")
        router.push("/auth/login")
      }
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
    form.reset()
  }
  return (
    <Card className="w-full max-w-md text-sm/relaxed">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-base font-semibold">Register</CardTitle>
        <CardDescription className="text-sm/relaxed">
          Create an account to manage your notes and access all features.
          It&apos;s quick and easy!
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form id="form-register" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm" htmlFor="form-register-name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-name"
                    aria-invalid={fieldState.invalid}
                    className="h-9 px-3 text-base sm:h-8 md:text-sm/relaxed"
                    placeholder="Enter your name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm" htmlFor="form-register-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="form-register-email"
                    aria-invalid={fieldState.invalid}
                    className="h-9 px-3 text-base sm:h-8 md:text-sm/relaxed"
                    placeholder="Enter your email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-password">
                    Password
                  </FieldLabel>
                  <InputGroup
                    className="h-9 sm:h-8"
                    data-invalid={fieldState.invalid}
                  >
                    <InputGroupInput
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="form-register-password"
                      aria-invalid={fieldState.invalid}
                      className="h-9 px-3 text-base sm:h-8 md:text-sm/relaxed"
                      placeholder="Enter your password"
                      autoComplete="off"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        size="icon-sm"
                        tabIndex={-1}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <InputGroup
                    className="h-9 sm:h-8"
                    data-invalid={fieldState.invalid}
                  >
                    <InputGroupInput
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      id="form-register-confirm-password"
                      aria-invalid={fieldState.invalid}
                      className="h-9 px-3 text-base sm:h-8 md:text-sm/relaxed"
                      placeholder="Confirm your password"
                      autoComplete="off"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        size="icon-sm"
                        tabIndex={-1}
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setShowConfirmPassword((v) => !v)}
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="px-4 sm:px-6">
        <Field
          orientation="horizontal"
          className="w-full flex-wrap justify-start gap-2"
        >
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="flex-1 sm:flex-none"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            size="lg"
            type="submit"
            className="flex-1 sm:flex-none"
            form="form-register"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Field>
      </CardFooter>
      <div className="px-4 pb-4 text-center text-sm text-muted-foreground sm:px-6 sm:pb-6">
        <Link href="/login" className="text-sm text-primary hover:underline">
          Already have an account? Log in
        </Link>
      </div>
    </Card>
  )
}
