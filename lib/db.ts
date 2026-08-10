import { PrismaClient } from '@prisma/client'
// Importing env here means every DB-backed route validates configuration at
// boot instead of failing with an opaque Prisma error mid-request.
import { env } from './env'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Two separate call sites rather than a ternary argument: PrismaClient's
// options parameter is generic, and passing `Options | undefined` confuses
// inference.
function createClient(): PrismaClient {
  if (env.databaseUrl) {
    return new PrismaClient({ datasources: { db: { url: env.databaseUrl } } })
  }
  return new PrismaClient()
}

export const db = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
