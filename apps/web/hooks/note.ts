import { api } from "@/lib/api"
import { getErrorMessage } from "@/lib/error-handler"
import { ApiResponse, INote } from "@mono-fun/types"
import { toast } from "sonner"

export async function getNotesById(id: string) {
  try {
    const response = await api.get<ApiResponse<INote>>(`/notes/${id}`)
    if (!response.data.success) {
      toast.error("Failed to fetch note. Please try again.")
      return null
    }
    return response.data.data
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    toast.error(errorMessage)
    return null
  }
}
