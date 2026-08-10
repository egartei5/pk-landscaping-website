import { PrismaClient } from '@prisma/client'
// Importing env here means every DB-backed route validates configuration at
// boot instead of failing with an opaque Prisma error mid-request.
import { env } from './env'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db =
  globalForPrisma.prisma ??
  new PrismaClient(env.databaseUrl ? { datasources: { db: { url: env.databaseUrl } } } : undefined)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
