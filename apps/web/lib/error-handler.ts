import axios from "axios"

type ApiErrorResponse = {
  success: false
  message: string
  stack?: string
}

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data?.message ?? error.message ?? "Request failed"
  }

  if (error instanceof Error) {
    return error.message
  }

  return "Unexpected error occurred"
}
