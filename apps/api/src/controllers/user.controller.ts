import type { Request, Response, NextFunction } from "express"
import { ApiError, ApiResponse } from "@mono-fun/types"
import {
  userSignUpSchema,
  userLoginSchema,
  userUpdateSchema,
  userDeleteSchema,
} from "@mono-fun/types"
import { UserService } from "@/services/user.service.js"
import type { ILoginResponse, IUser } from "@mono-fun/types"
import { cookies } from "@/lib/cookies.js"
import { cache } from "@/lib/cache.js"
import { logger } from "@/logger/index.js"

export class UserController {
  private readonly userService = new UserService()

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Registering user with email: ${req.body.email}`)
      const { name, email, password, confirmPassword } = req.body
      const parsedData = userSignUpSchema.safeParse({
        name,
        email,
        password,
        confirmPassword,
      })
      if (!parsedData.success) {
        const errorMessages = parsedData.error.issues.map(
          (issue) => issue.message
        )
        throw new ApiError(400, errorMessages.join(", "))
      }
      const user = await this.userService.register(
        parsedData.data.name,
        parsedData.data.email,
        parsedData.data.password
      )
      return res
        .status(201)
        .json(
          new ApiResponse<IUser>(true, "User registered successfully", user)
        )
    } catch (error) {
      next(error)
    }
  }

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`User login attempt with email: ${req.body.email}`)
      const { email, password } = req.body
      const parsedData = userLoginSchema.safeParse({
        email,
        password,
      })
      if (!parsedData.success) {
        const errorMessages = parsedData.error.issues.map(
          (issue) => issue.message
        )
        throw new ApiError(400, errorMessages.join(", "))
      }
      const loginResult = await this.userService.login(
        parsedData.data.email,
        parsedData.data.password
      )
      return res
        .cookie("accessToken", loginResult.accessToken, cookies.accessToken)
        .cookie("refreshToken", loginResult.refreshToken, cookies.refreshToken)
        .status(200)
        .json(
          new ApiResponse<ILoginResponse>(true, "Login successful", {
            id: loginResult.id,
            accessToken: loginResult.accessToken,
          })
        )
    } catch (error) {
      next(error)
    }
  }

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Updating user with ID: ${req.user?.id}`)
      const userId = req.user?.id
      if (!userId) {
        throw new ApiError(401, "Unauthorized")
      }
      const { name, email, password } = req.body
      const parsedData = userUpdateSchema.safeParse({
        name,
        email,
        password,
      })
      if (!parsedData.success) {
        const errorMessages = parsedData.error.issues.map(
          (issue) => issue.message
        )
        throw new ApiError(400, errorMessages.join(", "))
      }
      const updatedUser = await this.userService.update(userId, {
        name: parsedData.data.name,
        email: parsedData.data.email,
        password: parsedData.data.password,
      })
      return res
        .status(200)
        .json(
          new ApiResponse<IUser>(true, "User updated successfully", updatedUser)
        )
    } catch (error) {
      next(error)
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Deleting user with ID: ${req.user?.id}`)
      const userId = req.user?.id
      if (!userId) {
        throw new ApiError(401, "Unauthorized")
      }
      const parsedData = userDeleteSchema.safeParse({
        id: userId,
      })
      if (!parsedData.success) {
        const errorMessages = parsedData.error.issues.map(
          (issue) => issue.message
        )
        throw new ApiError(400, errorMessages.join(", "))
      }
      const { message } = await this.userService.delete(parsedData.data.id)
      return res.status(200).json(new ApiResponse(true, message))
    } catch (error) {
      next(error)
    }
  }

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`User logout attempt with ID: ${req.user?.id}`)
      const userId = req.user?.id
      if (!userId) {
        throw new ApiError(401, "Unauthorized")
      }
      return res
        .clearCookie("accessToken", cookies.accessToken)
        .clearCookie("refreshToken", cookies.refreshToken)
        .status(200)
        .json(new ApiResponse(true, "Logout successful"))
    } catch (error) {
      next(error)
    }
  }

  public refreshTokens = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      logger.info(`Refreshing tokens for user`)
      const refreshToken = req.cookies?.refreshToken ?? req.body?.refreshToken
      if (!refreshToken) {
        throw new ApiError(401, "Refresh token is required")
      }
      const refreshResult = await this.userService.refreshTokens(refreshToken)
      return res
        .cookie("accessToken", refreshResult.accessToken, cookies.accessToken)
        .cookie(
          "refreshToken",
          refreshResult.refreshToken,
          cookies.refreshToken
        )
        .status(200)
        .json(
          new ApiResponse<ILoginResponse>(
            true,
            "Tokens refreshed successfully",
            {
              id: refreshResult.id,
              accessToken: refreshResult.accessToken,
            }
          )
        )
    } catch (error) {
      next(error)
    }
  }

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info(`Retrieving profile for user with ID: ${req.user?.id}`)
      const userId = req.user?.id
      if (!userId) {
        throw new ApiError(401, "Unauthorized")
      }
      let user = await cache.get<IUser>(`user:${userId}`)
      if (!user) {
        user = await this.userService.getUserById(userId)
        await cache.set(`user:${userId}`, user, 15 * 60) // Cache for 15 minutes
      }
      return res
        .status(200)
        .json(new ApiResponse<IUser>(true, "User retrieved successfully", user))
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController()
