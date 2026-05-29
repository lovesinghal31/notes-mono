import { noteController } from "@/controllers/note.controller.js"
import { authMiddleware } from "@/middlewares/auth.js"
import { rateLimiter } from "@/middlewares/rateLimit.js"
import { Router, type Router as ExpressRouter } from "express"

const router: ExpressRouter = Router()

router.route("/").post(
  authMiddleware.verifyJWT,
  rateLimiter.limit({
    maxRequests: 20,
    windowSizeInSeconds: 60,
    endPointName: "note_create",
  }),
  noteController.createNote
)

export { router as noteRouter }
