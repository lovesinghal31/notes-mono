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
}
