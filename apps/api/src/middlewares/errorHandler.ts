import type { NextFunction, Request, Response } from "express"

import { env } from "@/config/env.js"
import { logger } from "@/logger/index.js"
import { ApiError } from "@mono-fun/types"

class ErrorMiddleware {
  private static instance: ErrorMiddleware

  private constructor() {}

  public static getInstance(): ErrorMiddleware {
    if (!ErrorMiddleware.instance) {
      ErrorMiddleware.instance = new ErrorMiddleware()
    }

    return ErrorMiddleware.instance
  }

  private logError(err: unknown, req: Request): void {
    const requestInfo = [
      `[${req.method}]`,
      req.originalUrl,
      `IP: ${req.ip}`,
    ].join(" ")

    if (err instanceof Error) {
      logger.error(`${requestInfo}\n${err.stack}`)
    } else {
      logger.error(`${requestInfo}\n${String(err)}`)
    }
  }

  public handle = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    this.logError(err, req)

    // Custom API errors
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        ...(env.NODE_ENV === "development" && {
          stack: err.stack,
        }),
      })
    }

    // JWT errors
    if (err instanceof Error && err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      })
    }

    if (err instanceof Error && err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      })
    }

    // Unknown errors
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      ...(env.NODE_ENV === "development" && {
        stack: err instanceof Error ? err.stack : String(err),
      }),
    })
  }
}

export const errorMiddleware = ErrorMiddleware.getInstance()
