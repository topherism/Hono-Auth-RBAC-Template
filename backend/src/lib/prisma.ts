import { envConfig } from "@/env"
import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      envConfig.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"], // only log errors in prod
  })

if (envConfig.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
