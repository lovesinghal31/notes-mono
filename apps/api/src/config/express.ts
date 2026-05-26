import express, { type Express } from "express"

import cors from "cors"
import cookieParser from "cookie-parser"

import { env } from "@/config/env.js"
import { rateLimiter } from "@/middlewares/rateLimit.js"

export const configureExpress = (app: Express): void => {
  app.set("trust proxy", 1)

  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    })
  )

  app.use(
    express.json({
      limit: "16kb",
    })
  )

  app.use(
    express.urlencoded({
      extended: true,
      limit: "16kb",
    })
  )

  app.use(express.static("public"))

  app.use(cookieParser())

  app.use(
    rateLimiter.limit({
      windowSizeInSeconds: 60,
      maxRequests: 300,
    })
  )
}
