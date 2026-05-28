import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from "winston";
import { Environment, LogLevel } from "@/logger/types.js";
import { ApiError } from "@mono-fun/types"; 

const { combine, timestamp, printf, colorize } = format;

export class Logger {
  private env: Environment;
  private logger: WinstonLogger;

  constructor(env: Environment) {
    this.env = env;
    this.logger = this.createLogger();
  }

  private getFormat() {
    return printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}]: ${message}`;
    });
  }

  private createLogger(): WinstonLogger {
    if (this.env === "development") {
      return createLogger({
        level: "debug",
        format: combine(
          colorize(),
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          this.getFormat(),
        ),
        transports: [new transports.Console()],
      });
    }

    if (this.env === "production") {
      return createLogger({
        level: "info",
        format: combine(timestamp(), this.getFormat()),
        transports: [
          new transports.Console(),
          new transports.File({ filename: "./logs/error.log", level: "error" }),
          new transports.File({ filename: "./logs/combined.log" }),
        ],
      });
    }

    // exhaustive check (compile-time safety)
    // const _exhaustive: never = this.env;
    throw new ApiError(500, `Invalid environment: ${this.env}`);
  }

  public log(level: LogLevel, message: string): void {
    this.logger.log(level, message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }
}