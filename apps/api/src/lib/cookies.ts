import type { CookieOptions } from "express"
import { env } from "@/config/env.js"

class Cookies {
  private static instance: Cookies

  private constructor() {}

  public static getInstance(): Cookies {
    if (!Cookies.instance) {
      Cookies.instance = new Cookies()
    }

    return Cookies.instance
  }

  public get accessToken(): CookieOptions {
    return {
      httpOnly: true,
      secure:
        env.NODE_ENV ===
        "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    }
  }

  public get refreshToken(): CookieOptions {
    return {
      httpOnly: true,
      secure:
        env.NODE_ENV ===
        "production",
      sameSite: "lax",
      maxAge:
        7 * 24 * 60 * 60 * 1000,
      path: "/",
    }
  }
}

export const cookies =
  Cookies.getInstance()