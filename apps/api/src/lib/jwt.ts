import jwt from "jsonwebtoken"
import { env } from "@/config/env.js"
import type {
  IAccessTokenPayload,
  IRefreshTokenPayload,
  IUser,
} from "@mono-fun/types"

class Jwt {
  private static instance: Jwt

  private constructor() {}

  public static getInstance(): Jwt {
    if (!Jwt.instance) {
      Jwt.instance = new Jwt()
    }

    return Jwt.instance
  }

  public generateAccessToken(
    user: IUser
  ): string {
    return jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      } satisfies IAccessTokenPayload,
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    )
  }

  public generateRefreshToken(
    user: IUser
  ): string {
    return jwt.sign(
      {
        id: user.id,
      } satisfies IRefreshTokenPayload,
      env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    )
  }

  public generateTokens(user: IUser) {
    return {
      accessToken:
        this.generateAccessToken(user),

      refreshToken:
        this.generateRefreshToken(user),
    }
  }

  public verifyAccessToken(
    token: string
  ): IAccessTokenPayload {
    return jwt.verify(
      token,
      env.ACCESS_TOKEN_SECRET
    ) as IAccessTokenPayload
  }

  public verifyRefreshToken(
    token: string
  ): IRefreshTokenPayload {
    return jwt.verify(
      token,
      env.REFRESH_TOKEN_SECRET
    ) as IRefreshTokenPayload
  }
}

export const jwtLib =
  Jwt.getInstance()