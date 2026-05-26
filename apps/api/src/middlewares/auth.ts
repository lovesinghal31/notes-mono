import type { NextFunction, Request, Response } from "express"

import { prisma } from "@/lib/prisma.js"
import { cache } from "@/lib/cache.js"
import { jwtLib } from "@/lib/jwt.js"
import { ApiError } from "@mono-fun/types"
import type { IAccessTokenPayload, IUser } from "@mono-fun/types"

class AuthMiddleware {
  private static instance: AuthMiddleware

  private constructor() {}

  public static getInstance(): AuthMiddleware {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware()
    }

    return AuthMiddleware.instance
  }

  public verifyJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token =
        req.cookies?.accessToken ??
        req.header("Authorization")?.replace("Bearer ", "")

      if (!token) {
        throw new ApiError(401, "Access token is missing")
      }

      const decodedToken = jwtLib.verifyAccessToken(
        token
      ) as IAccessTokenPayload

      const cacheKey = `user:${decodedToken.id}`

      let user = await cache.get<IUser>(cacheKey)

      if (!user) {
        user = await prisma.user.findUnique({
          where: {
            id: decodedToken.id,
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        })

        if (!user) {
          throw new ApiError(404, "User not found")
        }

        await cache.set<IUser>(cacheKey, user, 15 * 60)
      }

      req.user = user

      next()
    } catch (error) {
      next(error)
    }
  }
}

export const authMiddleware = AuthMiddleware.getInstance()
