class ApiError extends Error {
  success: boolean
  statusCode: number

  constructor(statusCode: number, message: string) {
    super(message)

    this.success = false
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}

export { ApiError }
