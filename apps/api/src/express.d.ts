import type { IUser } from "@mono-fun/types"

declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}

export {}
