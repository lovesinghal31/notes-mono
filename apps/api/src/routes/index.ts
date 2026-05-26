import type {
  Express,
} from "express"

export const registerRoutes = (
  app: Express
): void => {
  app.get("/health", (_, res) => {
    res.status(200).send("OK")
  })
}