import { env } from "@/config/env.js"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/generated/prisma/client.js"
import { ApiError } from "@mono-fun/types"

const connectionString = `${env.DATABASE_URL}`

const adapter = new PrismaPg({
  connectionString,
  // ssl: { ca: env.DATABASE_CA_CERT },
})

const prisma = new PrismaClient({ adapter })

export { prisma }
