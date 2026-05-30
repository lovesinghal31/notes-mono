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

router.route("/:id").get(
  authMiddleware.verifyJWT,
  rateLimiter.limit({
    maxRequests: 50,
    windowSizeInSeconds: 60,
    endPointName: "note_get",
  }),
  noteController.getNoteByIdAndUserId
)

router.route("/:id").put(
  authMiddleware.verifyJWT,
  rateLimiter.limit({
    maxRequests: 20,
    windowSizeInSeconds: 60,
    endPointName: "note_update",
  }),
  noteController.editNote
)

export { router as noteRouter }
