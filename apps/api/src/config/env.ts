import { ApiError } from "@mono-fun/types"
import dotenv from "dotenv"

dotenv.config({
  path: "./.env",
})

type Environment = "development" | "production"

class Env {
  private static instance: Env

  public readonly NODE_ENV: Environment
  public readonly PORT: number
  public readonly CORS_ORIGIN: string
  public readonly SALT_ROUNDS: number
  public readonly REDIS_HOST: string
  public readonly REDIS_PORT: number
  public readonly REDIS_USERNAME: string
  public readonly REDIS_PASSWORD: string
  public readonly ACCESS_TOKEN_SECRET: string
  public readonly REFRESH_TOKEN_SECRET: string
  public readonly DATABASE_URL: string

  private constructor() {
    this.NODE_ENV = (this.getEnv("NODE_ENV") as Environment) || "development"
    this.PORT = Number(this.getEnv("PORT"))
    this.CORS_ORIGIN = this.getEnv("CORS_ORIGIN")
    this.SALT_ROUNDS = Number(this.getEnv("SALT_ROUNDS"))
    this.REDIS_HOST = this.getEnv("REDIS_HOST")
    this.REDIS_PORT = Number(this.getEnv("REDIS_PORT"))
    this.REDIS_USERNAME = this.getEnv("REDIS_USERNAME", "")
    this.REDIS_PASSWORD = this.getEnv("REDIS_PASSWORD", "")
    this.ACCESS_TOKEN_SECRET = this.getEnv("ACCESS_TOKEN_SECRET")
    this.REFRESH_TOKEN_SECRET = this.getEnv("REFRESH_TOKEN_SECRET")
    this.DATABASE_URL = this.getEnv("DATABASE_URL")

    this.validate()
  }

  public static getInstance(): Env {
    if (!Env.instance) {
      Env.instance = new Env()
    }
    return Env.instance
  }

  private getEnv(key: string, defaultValue?: string): string {
    const value = process.env[key] || defaultValue
    if (!value) {
      throw new ApiError(
        500,
        `Environment variable ${key} is required but not defined.`
      )
    }
    return value
  }

  private validate() {
    if (!["development", "production"].includes(this.NODE_ENV)) {
      throw new ApiError(
        500,
        `Invalid NODE_ENV value: ${this.NODE_ENV}. Must be 'development' or 'production'.`
      )
    }
    if (isNaN(this.PORT) || this.PORT <= 0 || this.PORT > 65535) {
      throw new ApiError(
        500,
        `Invalid PORT value: ${this.PORT}. Must be a number between 1 and 65535.`
      )
    }
    if (
      isNaN(this.REDIS_PORT) ||
      this.REDIS_PORT <= 0 ||
      this.REDIS_PORT > 65535
    ) {
      throw new ApiError(
        500,
        `Invalid REDIS_PORT value: ${this.REDIS_PORT}. Must be a number between 1 and 65535.`
      )
    }
  }
}

export const env = Env.getInstance()
