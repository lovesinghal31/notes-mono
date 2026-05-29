import { NoteRepository } from "@/repositories/note.repositories.js"

export class NoteService {
  private readonly noteRepository = new NoteRepository()

  public create = async (title: string, content: string, user_id: string) => {
    const newNote = await this.noteRepository.create(title, content, user_id)
    return newNote
  }
}
