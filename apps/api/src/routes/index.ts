import type { Express } from "express"
import { userRouter } from "@/routes/user.route.js"

export const registerRoutes = (app: Express): void => {
  app.use("/api/v1/users", userRouter)
  app.get("/health", (_, res) => {
    res.status(200).send("OK")
  })
}
