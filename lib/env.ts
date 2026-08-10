import { z } from 'zod'

/**
 * Startup environment validation.
 *
 * Previously a missing DATABASE_URL crashed every page at request time with
 * an opaque Prisma error, and missing SMTP settings failed silently because
 * notification emails are fire-and-forget. This module surfaces both classes
 * of problem at boot instead.
 *
 * Fatal vars abort the process. Optional-but-important vars (email delivery)
 * only log a loud warning, so a misconfigured mailbox can never take the
 * whole site down.
 */

const fatalSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, 'DATABASE_URL is required')
    .refine(
      (v) => v.startsWith('postgres://') || v.startsWith('postgresql://'),
      'DATABASE_URL must be a PostgreSQL connection string. SQLite (file:...) is not supported — ' +
        'Railway containers are ephemeral and the database file is destroyed on every deploy.'
    ),
  NEXTAUTH_SECRET: z
    .string()
    .min(16, 'NEXTAUTH_SECRET must be at least 16 characters (generate with: openssl rand -base64 32)'),
})

const emailSchema = z.object({
  SMTP_HOST: z.string().min(1),
  SMTP_PORT: z.string().regex(/^\d+$/, 'SMTP_PORT must be a number'),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  NOTIFICATION_EMAIL: z.string().min(3).includes('@', { message: 'NOTIFICATION_EMAIL must be an email address' }),
})

// During `next build` the app is only being compiled, not served, so a
// missing runtime secret shouldn't fail the build.
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'

// Typed structurally rather than as z.ZodError so it doesn't depend on the
// generic parameter, which differs between zod v3 and v4.
type IssueList = { issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey>; message: string }> }

function formatIssues(error: IssueList): string {
  return error.issues
    .map((i) => `  - ${i.path.map(String).join('.') || '(root)'}: ${i.message}`)
    .join('\n')
}

function validate() {
  const fatal = fatalSchema.safeParse(process.env)
  if (!fatal.success) {
    const message = `Invalid environment configuration:\n${formatIssues(fatal.error)}`
    if (isBuildPhase) {
      console.warn(`[env] ${message}\n[env] Continuing because this is a build, but the app will not start without these.`)
    } else {
      throw new Error(message)
    }
  }

  const email = emailSchema.safeParse(process.env)
  if (!email.success) {
    console.warn(
      `[env] Email delivery is not fully configured — quote and booking notifications will not be sent:\n${formatIssues(email.error)}`
    )
  }

  if (!process.env.REDIS_URL) {
    console.warn('[env] REDIS_URL is not set — rate limiting falls back to per-process memory and will not be enforced across instances.')
  }

  return {
    databaseUrl: process.env.DATABASE_URL ?? '',
    nextAuthSecret: process.env.NEXTAUTH_SECRET ?? '',
    emailConfigured: email.success,
    redisUrl: process.env.REDIS_URL ?? null,
  }
}

export const env = validate()
