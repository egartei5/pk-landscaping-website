/**
 * Runs on every boot, after `prisma migrate deploy` and before Next starts.
 *
 * Idempotent. Its job is to guarantee that a freshly provisioned database is
 * immediately usable:
 *   1. the admin account exists, so /admin/login works
 *   2. the gallery table is populated with the project photos in data/gallery.json,
 *      so the public /gallery page is never empty
 *
 * Uses only production dependencies (@prisma/client, bcryptjs) so it works in
 * a pruned deploy image — unlike prisma/seed.ts, which needs ts-node.
 */
import { readFileSync } from 'node:fs'
import prismaPkg from '@prisma/client'
import bcrypt from 'bcryptjs'

const { PrismaClient } = prismaPkg
const db = new PrismaClient()

const ADMIN_EMAIL = process.env.ADMIN_SEED_EMAIL ?? 'admin@pklandscapingmn.com'
const ADMIN_PASSWORD = process.env.ADMIN_SEED_PASSWORD

async function ensureAdminUser() {
  const existing = await db.adminUser.findUnique({ where: { email: ADMIN_EMAIL } })
  if (existing) {
    console.log(`[bootstrap] Admin user ${ADMIN_EMAIL} already exists.`)
    return
  }

  if (!ADMIN_PASSWORD) {
    console.error(
      `[bootstrap] No admin user and ADMIN_SEED_PASSWORD is not set — /admin will be inaccessible. ` +
        `Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD and redeploy.`
    )
    return
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12)
  await db.adminUser.create({ data: { email: ADMIN_EMAIL, passwordHash } })
  console.log(`[bootstrap] Created admin user ${ADMIN_EMAIL}.`)
}

async function ensureGallery() {
  const count = await db.galleryImage.count()
  if (count > 0) {
    console.log(`[bootstrap] Gallery already has ${count} image(s) — leaving it alone.`)
    return
  }

  const file = new URL('../data/gallery.json', import.meta.url)
  const images = JSON.parse(readFileSync(file, 'utf8'))

  // createMany + skipDuplicates keeps this safe if two instances boot at once.
  const { count: created } = await db.galleryImage.createMany({
    data: images,
    skipDuplicates: true,
  })
  console.log(`[bootstrap] Seeded ${created} gallery image(s) from data/gallery.json.`)
}

async function main() {
  await ensureAdminUser()
  await ensureGallery()
}

main()
  .catch((err) => {
    // Never block the app from starting — a bootstrap failure should be loud
    // but recoverable, not a crash loop.
    console.error('[bootstrap] Failed:', err)
  })
  .finally(() => db.$disconnect())
