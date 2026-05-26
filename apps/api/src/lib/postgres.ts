class Postgres {
  private static instance: Postgres

  private constructor() {}

  public static getInstance(): Postgres {
    if (!Postgres.instance) {
      Postgres.instance =
        new Postgres()
    }

    return Postgres.instance
  }

  public getError(
    error: unknown
  ): {
    code?: string
    message?: string
  } | null {
    if (
      typeof error === "object" &&
      error !== null &&
      "cause" in error
    ) {
      const cause = (
        error as {
          cause?: unknown
        }
      ).cause

      if (
        typeof cause === "object" &&
        cause !== null &&
        "code" in cause
      ) {
        return cause as {
          code?: string
          message?: string
        }
      }
    }

    return null
  }
}

export const postgres =
  Postgres.getInstance()