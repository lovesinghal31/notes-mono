import { api } from "@/lib/api"
import { getErrorMessage } from "@/lib/error-handler"
import { ApiResponse, IUser } from "@mono-fun/types"
import { toast } from "sonner"

export async function getCurrentUser() {
  try {
    const response = await api.get<ApiResponse<IUser>>("/users/profile")
    if (!response.data.success) {
      return null
    }
    return response.data.data
  } catch (error) {
    const message = getErrorMessage(error)
    toast.error("Failed to fetch user info. Please log in again.")
    return null
  }
}
