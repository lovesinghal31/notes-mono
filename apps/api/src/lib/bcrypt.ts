import bcrypt from "bcrypt"
import { env } from "@/config/env.js"

class Bcrypt {
  private static instance: Bcrypt

  private constructor() {}

  public static getInstance(): Bcrypt {
    if (!Bcrypt.instance) {
      Bcrypt.instance = new Bcrypt()
    }

    return Bcrypt.instance
  }

  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, env.SALT_ROUNDS)
  }

  public async compare(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}

export const bcryptLib = Bcrypt.getInstance()