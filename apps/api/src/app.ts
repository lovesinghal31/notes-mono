import express, { type Express } from "express"

import { configureExpress } from "@/config/express.js"
import { registerRoutes } from "@/routes/index.js"
import { errorMiddleware } from "@/middlewares/errorHandler.js"

const app: Express = express()

configureExpress(app)

registerRoutes(app)

app.use(errorMiddleware.handle)

export { app }
