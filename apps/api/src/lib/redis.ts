import { env } from "@/config/env.js"
import { logger } from "@/logger/index.js"
import { Redis } from "ioredis"

class RedisClient {
  private static instance: RedisClient
  private client: Redis

  private constructor() {
    logger.info("Initializing Redis configuration")

    logger.info(`REDIS_HOST: ${env.REDIS_HOST}`)
    logger.info(`REDIS_PORT: ${env.REDIS_PORT}`)
    logger.info(`REDIS_USERNAME: ${env.REDIS_USERNAME}`)

    this.client = new Redis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      username: env.REDIS_USERNAME || undefined,
      password: env.REDIS_PASSWORD || undefined,
      // tls: {},
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
    })

    this.initializeEvents()
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient()
    }

    return RedisClient.instance
  }

  private initializeEvents(): void {
    this.client.on("connect", () => {
      logger.info("Connected to Redis successfully")
    })

    this.client.on("error", (error: Error) => {
      logger.error(`Redis error: ${error.message}`)
    })

    this.client.on("reconnecting", () => {
      logger.warn("Reconnecting to Redis...")
    })

    this.client.on("close", () => {
      logger.warn("Redis connection closed")
    })
  }

  public getClient(): Redis {
    return this.client
  }

  public async disconnect(): Promise<void> {
    await this.client.quit()
    logger.info("Redis disconnected")
  }
}

export const redis = RedisClient.getInstance().getClient()