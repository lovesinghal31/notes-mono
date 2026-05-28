"use client"

import * as React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"
import { toast } from "sonner"
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
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Button } from "@workspace/ui/components/button"
import axios from "axios"
import { getErrorMessage } from "@/lib/error-handler"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ApiResponse,
  ILoginResponse,
  userLoginSchema,
  type UserLoginSchemaType,
} from "@mono-fun/types"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<UserLoginSchemaType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: UserLoginSchemaType) {
    try {
      setIsSubmitting(true)
      const response = await axios.post<ApiResponse<ILoginResponse>>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      )
      if (response.data.success) {
        toast.success("Login successful!")
        router.push("/dashboard/me")
      }
    } catch (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
    form.reset()
    // setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-md text-sm/relaxed">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-base font-semibold">Login</CardTitle>
        <CardDescription className="text-sm/relaxed">
          Login to your account to start taking notes and organizing your
          thoughts!
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm" htmlFor="form-login-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-login-email"
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
                  <FieldLabel htmlFor="form-login-password">
                    Password
                  </FieldLabel>
                  <InputGroup
                    className="h-9 sm:h-8"
                    data-invalid={fieldState.invalid}
                  >
                    <InputGroupInput
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="form-login-password"
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
            form="form-login"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Field>
      </CardFooter>
      <div className="px-4 pb-4 text-center text-sm text-muted-foreground sm:px-6 sm:pb-6">
        <Link
          href="/auth/register"
          className="text-sm text-primary hover:underline"
        >
          Don&apos;t have an account? Register here.
        </Link>
      </div>
    </Card>
  )
}
