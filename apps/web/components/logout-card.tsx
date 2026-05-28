"use client"

import * as React from "react"

import { LoaderCircleIcon } from "lucide-react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { getErrorMessage } from "@/lib/error-handler"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api"
import { ApiResponse } from "@mono-fun/types"

export function LogoutCard() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function onLogoutHandler() {
    try {
      setIsSubmitting(true)
      const response = await api.post<ApiResponse>("/users/logout")
      if (response.data.success) {
        toast.success("Logout successful!")
        router.push("/auth/login")
      }
    } catch (error) {
      const message = getErrorMessage(error)
      console.error("Logout error:", message)
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md text-sm/relaxed">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-base font-semibold">Logout</CardTitle>
        <CardDescription className="text-sm/relaxed">
          Logout of your account to end your session.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => onLogoutHandler()}
        >
          {isSubmitting ? (
            <>
              <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </Button>
      </CardContent>
      <CardFooter className="px-4 sm:px-6">
        <div className="text-center text-sm text-muted-foreground">
          <Link
            href="/dashboard/me"
            className="text-sm text-primary hover:underline"
          >
            Back to Profile page
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
