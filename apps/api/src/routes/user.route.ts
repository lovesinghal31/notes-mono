import { userController } from "@/controllers/user.controller.js"
import { authMiddleware } from "@/middlewares/auth.js"
import { rateLimiter } from "@/middlewares/rateLimit.js"
import { Router, type Router as ExpressRouter } from "express"

const router: ExpressRouter = Router()

router.route("/register").post(
  rateLimiter.limit({
    maxRequests: 5,
    windowSizeInSeconds: 60,
    endPointName: "user_register",
  }),
  userController.register
)
router.route("/login").post(
  rateLimiter.limit({
    maxRequests: 10,
    windowSizeInSeconds: 60,
    endPointName: "user_login",
  }),
  userController.login
)
router.route("/refresh-tokens").post(
  rateLimiter.limit({
    maxRequests: 5,
    windowSizeInSeconds: 60,
    endPointName: "user_refresh_tokens",
  }),
  userController.refreshTokens
)

router.route("/update").put(
  authMiddleware.verifyJWT,
  rateLimiter.limit({
    maxRequests: 5,
    windowSizeInSeconds: 60,
    endPointName: "user_update",
  }),
  userController.update
)

router.route("/logout").post(
  authMiddleware.verifyJWT,
  rateLimiter.limit({
    maxRequests: 5,
    windowSizeInSeconds: 60,
    endPointName: "user_logout",
  }),
  userController.logout
)

router.route("/delete").delete(
  authMiddleware.verifyJWT,
  rateLimiter.limit({
    maxRequests: 5,
    windowSizeInSeconds: 60,
    endPointName: "user_delete",
  }),
  userController.delete
)

router.route("/profile").get(
  authMiddleware.verifyJWT,
  rateLimiter.limit({
    maxRequests: 10,
    windowSizeInSeconds: 60,
    endPointName: "user_profile",
  }),
  userController.getUser
)

export { router as userRouter }
