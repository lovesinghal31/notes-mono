import type { NextFunction, Request, Response } from "express"

import { redis } from "@/lib/redis.js"
import { ApiError } from "@mono-fun/types"

interface RateLimitOptions {
  windowSizeInSeconds: number
  maxRequests: number
  endPointName?: string
}

class RateLimiterMiddleware {
  private static instance: RateLimiterMiddleware

  private constructor() {}

  public static getInstance(): RateLimiterMiddleware {
    if (!RateLimiterMiddleware.instance) {
      RateLimiterMiddleware.instance = new RateLimiterMiddleware()
    }

    return RateLimiterMiddleware.instance
  }

  private sanitizeEndpointName(name?: string): string | null {
    if (!name) {
      return null
    }

    return name.trim().replace(/\s+/g, "_").replace(/[^\w]/g, "_").toLowerCase()
  }

  private getRateLimitKey(req: Request, endPointName?: string): string {
    const ip = req.ip ?? req.socket.remoteAddress ?? "unknown"

    const sanitizedEndpoint = this.sanitizeEndpointName(endPointName)

    return `rate_limit:${ip}${sanitizedEndpoint ? `:${sanitizedEndpoint}` : ""}`
  }

  public limit = ({
    windowSizeInSeconds,
    maxRequests,
    endPointName,
  }: RateLimitOptions) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        const key = this.getRateLimitKey(req, endPointName)

        const current = await redis.get(key)

        const currentCount = Number(current ?? 0)

        if (currentCount >= maxRequests) {
          const ttl = await redis.ttl(key)

          res.setHeader("Retry-After", ttl)

          throw new ApiError(429, "Too many requests. Please try again later.")
        }

        const pipeline = redis.multi()

        pipeline.incr(key)

        if (!current) {
          pipeline.expire(key, windowSizeInSeconds)
        }

        await pipeline.exec()

        const remaining = maxRequests - currentCount - 1

        res.setHeader("X-RateLimit-Limit", maxRequests)

        res.setHeader("X-RateLimit-Remaining", Math.max(remaining, 0))

        res.setHeader("X-RateLimit-Reset", windowSizeInSeconds)

        next()
      } catch (error) {
        next(error)
      }
    }
  }
}

export const rateLimiter = RateLimiterMiddleware.getInstance()
