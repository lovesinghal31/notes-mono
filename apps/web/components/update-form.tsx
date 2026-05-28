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
  userUpdateSchema,
  type UserUpdateSchemaType,
} from "@mono-fun/types"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getErrorMessage } from "@/lib/error-handler"
import { Input } from "@workspace/ui/components/input"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"
import Link from "next/link"
import { api } from "@/lib/api"

export function UpdateForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const form = useForm<UserUpdateSchemaType>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  async function onSubmit(data: UserUpdateSchemaType) {
    try {
      setIsSubmitting(true)
      const response = await api.put<ApiResponse<IUser>>("/users/update", data)
      if (response.data.success) {
        toast.success("Profile updated successfully!")
        router.push("/dashboard/me")
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
        <CardTitle className="text-base font-semibold">
          Update Profile
        </CardTitle>
        <CardDescription className="text-sm/relaxed">
          Update your profile information at any time.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <form id="form-update" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-sm" htmlFor="form-update-name">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-update-name"
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
                  <FieldLabel className="text-sm" htmlFor="form-update-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="form-update-email"
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
                  <FieldLabel htmlFor="form-update-password">
                    Password
                  </FieldLabel>
                  <InputGroup
                    className="h-9 sm:h-8"
                    data-invalid={fieldState.invalid}
                  >
                    <InputGroupInput
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="form-update-password"
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
            form="form-update"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </Field>
      </CardFooter>
      <div className="px-4 pb-4 text-center text-sm text-muted-foreground sm:px-6 sm:pb-6">
        <Link
          href="/dashboard/me"
          className="text-sm text-primary hover:underline"
        >
          Back to Profile
        </Link>
      </div>
    </Card>
  )
}
