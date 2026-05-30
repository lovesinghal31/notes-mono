import { NoteRepository } from "@/repositories/note.repositories.js"
import { ApiError } from "@mono-fun/types"

export class NoteService {
  private readonly noteRepository = new NoteRepository()

  public create = async (title: string, content: string, user_id: string) => {
    const newNote = await this.noteRepository.create(title, content, user_id)
    return newNote
  }

  public getByIdAndUserId = async (id: string, user_id: string) => {
    const note = await this.noteRepository.getByIdAndUserId(id, user_id)
    return note
  }

  public edit = async (
    id: string,
    user_id: string,
    data: Partial<{
      title: string
      content: string
    }>
  ) => {
    const editedNote = await this.noteRepository.edit(id, user_id, data)
    if (!editedNote) {
      throw new ApiError(404, "Note not found")
    }
    return editedNote
  }
}
