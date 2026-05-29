import { prisma } from "@/lib/prisma.js"

export class NoteRepository {
  private readonly noteSelect = {
    id: true,
    user_id: true,
    title: true,
    content: true,
    created_at: true,
    updated_at: true,
  }
  public async create(title: string, content: string, user_id: string) {
    return prisma.note.create({
      data: {
        title,
        content,
        user_id,
      },
      select: this.noteSelect,
    })
  }
}
