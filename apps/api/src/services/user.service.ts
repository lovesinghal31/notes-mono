import { UserRepository } from "@/repositories/user.repositories.js"
import { bcryptLib } from "@/lib/bcrypt.js"
import { jwtLib } from "@/lib/jwt.js"
import { ApiError } from "@mono-fun/types"

export class UserService {
  private readonly userRepository = new UserRepository()

  public register = async (name: string, email: string, password: string) => {
    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new ApiError(400, "Email already in use")
    }
    const hashedPassword = await bcryptLib.hash(password)
    const newUser = await this.userRepository.create(
      name,
      email,
      hashedPassword
    )
    return newUser
  }

  public login = async (email: string, password: string) => {
    const user = await this.userRepository.findByEmailWithPassword(email)
    if (!user) {
      throw new ApiError(400, "Account does not exist with this email")
    }
    const passwordMatch = await bcryptLib.compare(password, user.password_hash)
    if (!passwordMatch) {
      throw new ApiError(400, "Password is incorrect")
    }
    const { accessToken, refreshToken } = jwtLib.generateTokens({
      id: user.id,
      name: user.name,
      email: user.email,
    })
    return {
      id: user.id,
      accessToken,
      refreshToken,
    }
  }

  public update = async (
    id: string,
    data: Partial<{
      name: string
      email: string
      password: string
    }>
  ) => {
    if (data.password) {
      const password_hash = await bcryptLib.hash(data.password)
      const updatedUser = await this.userRepository.update(id, {
        email: data.email,
        name: data.name,
        password_hash,
      })
      return updatedUser
    }
    const updatedUser = await this.userRepository.update(id, data)
    return updatedUser
  }

  public delete = async (id: string) => {
    await this.userRepository.delete(id)
    return { message: "User deleted successfully" }
  }

  public refreshTokens = async (refreshToken: string) => {
    const decodedToken = jwtLib.verifyRefreshToken(refreshToken)
    const user = await this.userRepository.findById(decodedToken.id)
    if (!user) {
      throw new ApiError(401, "Invalid refresh token")
    }
    const { accessToken, refreshToken: newRefreshToken } =
      jwtLib.generateTokens({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    return {
      id: user.id,
      accessToken,
      refreshToken: newRefreshToken,
    }
  }

  public getUserById = async (id: string) => {
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new ApiError(404, "User not found")
    }
    return user
  }
}
