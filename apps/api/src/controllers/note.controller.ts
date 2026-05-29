import type { Request, Response, NextFunction } from "express"
import { ApiError, ApiResponse, createNoteSchema, INote } from "@mono-fun/types"
import { NoteService } from "@/services/note.service.js"
import { cache } from "@/lib/cache.js"
import { logger } from "@/logger/index.js"

export class NoteController {
  private readonly noteService = new NoteService()

  public createNote = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user_id = req.user?.id
      logger.info(`Creating note for user: ${user_id}`)
      const { title, content } = req.body
      const parsedData = createNoteSchema.safeParse({ title, content })
      if (!parsedData.success) {
        const errorMessages = parsedData.error.issues.map(
          (issue) => issue.message
        )
        throw new ApiError(400, errorMessages.join(", "))
      }
      const newNote = await this.noteService.create(title, content, user_id)
      cache.set<INote>(`note:${newNote.id}`, newNote, 3600)
      return res
        .status(201)
        .json(
          new ApiResponse<INote>(true, "Note created successfully", newNote)
        )
    } catch (error) {
      next(error)
    }
  }
}

export const noteController = new NoteController()
