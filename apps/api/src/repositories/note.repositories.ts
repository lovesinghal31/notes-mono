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

  public async getByIdAndUserId(id: string, user_id: string) {
    return prisma.note.findUnique({
      where: {
        id: id,
        user_id: user_id,
      },
      select: this.noteSelect,
    })
  }

  public async edit(
    id: string,
    user_id: string,
    data: Partial<{
      title: string
      content: string
    }>
  ) {
    return prisma.note.update({
      where: {
        id: id,
        user_id: user_id,
      },
      data,
      select: this.noteSelect,
    })
  }
}
