interface IUser {
  id: string
  name: string
  email: string
}

interface IAccessTokenPayload {
  id: string
  name: string
  email: string
}

interface IRefreshTokenPayload {
  id: string
}

interface ILoginResponse {
  id: string
  accessToken: string
}

export type { IUser, IAccessTokenPayload, IRefreshTokenPayload, ILoginResponse }
