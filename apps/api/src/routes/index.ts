import type { Express } from "express"
import { userRouter } from "@/routes/user.route.js"
import { noteRouter } from "@/routes/note.route.js"

export const registerRoutes = (app: Express): void => {
  app.use("/api/v1/users", userRouter)
  app.use("/api/v1/notes", noteRouter)
  app.get("/health", (_, res) => {
    res.status(200).send("OK")
  })
}
