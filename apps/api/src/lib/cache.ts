import { redis } from "@/lib/redis.js"
import { logger } from "@/logger/index.js"

class Cache {
  private static instance: Cache

  private constructor() {}

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }

    return Cache.instance
  }

  public async get<T>(
    key: string
  ): Promise<T | null> {
    try {
      const cached = await redis.get(key)

      if (!cached) {
        return null
      }

      return JSON.parse(cached) as T
    } catch (error) {
      logger.error(
        `Cache GET error for key "${key}": ${
          error instanceof Error
            ? error.stack
            : String(error)
        }`
      )

      return null
    }
  }

  public async set<T>(
    key: string,
    data: T,
    ttlSeconds?: number
  ): Promise<void> {
    try {
      const value = JSON.stringify(data)

      if (ttlSeconds) {
        await redis.set(
          key,
          value,
          "EX",
          ttlSeconds
        )
      } else {
        await redis.set(key, value)
      }
    } catch (error) {
      logger.error(
        `Cache SET error for key "${key}": ${
          error instanceof Error
            ? error.stack
            : String(error)
        }`
      )
    }
  }

  public async delete(
    ...keys: string[]
  ): Promise<void> {
    try {
      if (keys.length === 0) {
        return
      }

      await redis.del(...keys)
    } catch (error) {
      logger.error(
        `Cache DELETE error for keys "${keys.join(", ")}": ${
          error instanceof Error
            ? error.stack
            : String(error)
        }`
      )
    }
  }

  public async exists(
    key: string
  ): Promise<boolean> {
    try {
      const exists = await redis.exists(key)
      return exists === 1
    } catch (error) {
      logger.error(
        `Cache EXISTS error for key "${key}": ${
          error instanceof Error
            ? error.stack
            : String(error)
        }`
      )

      return false
    }
  }

  public async flush(): Promise<void> {
    try {
      await redis.flushdb()
      logger.info(
        "Redis cache cleared successfully"
      )
    } catch (error) {
      logger.error(
        `Cache FLUSH error: ${
          error instanceof Error
            ? error.stack
            : String(error)
        }`
      )
    }
  }
}

export const cache = Cache.getInstance()