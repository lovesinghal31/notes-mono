import { env } from "@/config/env.js"
import { Logger } from "@/logger/logger.js"
import { Environment } from "@/logger/types.js"

const loggerEnv = (env.NODE_ENV ?? "development") as Environment

export const logger = new Logger(loggerEnv)
