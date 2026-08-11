# Customer Request Notifications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reliably save every customer submission, automatically email it to `contact@pklandscapingmn.com`, and offer quote and booking customers a prefilled WhatsApp handoff to `+1 (218) 979-1154`.

**Architecture:** Keep PostgreSQL as the source of truth and make email delivery a bounded, awaited, best-effort step after each successful database write. Put message formatting in small pure helpers that can be unit tested without SMTP or a browser, then use a shared WhatsApp action component on the quote and booking success screens.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript 5, Prisma/PostgreSQL, Nodemailer SMTP, Zod, Node built-in test runner with `ts-node`.

## Global Constraints

- Base implementation on `origin/main` revision `1e08ef3` or its direct descendant; it contains the live PostgreSQL recovery and custom-domain persistence changes.
- Use `superpowers:using-git-worktrees` before execution and create an isolated feature branch from `origin/main`.
- Preserve the existing changes to `package.json` and `package-lock.json` in `/Users/enochgartei/Documents/Codex/pk-landscaping-website`; do not edit or discard them.
- Preserve the recovered Railway PostgreSQL service, volume, data, custom-domain settings, services, and apex forwarding.
- Do not add a database migration or schema change.
- Database writes happen before notifications, and notification failures never turn a saved request into a failed submission.
- Automatic business notifications go to the existing `NOTIFICATION_EMAIL`, verified in Railway as `contact@pklandscapingmn.com`.
- WhatsApp handoffs use `https://wa.me/12189791154` and require the customer to tap Send.
- Do not log SMTP credentials, environment values, or complete Nodemailer error objects.

---

### Task 1: Tested WhatsApp URL Builders

**Files:**
- Create: `lib/whatsapp.ts`
- Create: `tests/whatsapp.test.ts`

**Interfaces:**
- Produces: `buildQuoteWhatsAppUrl(data: QuoteWhatsAppData): string`
- Produces: `buildBookingWhatsAppUrl(data: BookingWhatsAppData): string`
- Both functions return an HTTPS `wa.me` URL for phone `12189791154` with a URL-encoded `text` query parameter.

- [ ] **Step 1: Write the failing URL-builder tests**

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildBookingWhatsAppUrl,
  buildQuoteWhatsAppUrl,
} from '../lib/whatsapp'

function messageFrom(url: string) {
  const parsed = new URL(url)
  assert.equal(parsed.origin, 'https://wa.me')
  assert.equal(parsed.pathname, '/12189791154')
  return parsed.searchParams.get('text')
}

test('buildQuoteWhatsAppUrl targets PK Landscaping with a complete quote summary', () => {
  const message = messageFrom(buildQuoteWhatsAppUrl({
    name: 'Jane Doe',
    phone: '(218) 555-0100',
    email: 'jane@example.com',
    service: 'Lawn Mowing',
    location: 'Fargo, ND',
    message: 'Please quote the front and back yard.',
  }))

  assert.match(message ?? '', /Quote request from Jane Doe/)
  assert.match(message ?? '', /Lawn Mowing/)
  assert.match(message ?? '', /Fargo, ND/)
  assert.match(message ?? '', /Please quote the front and back yard\./)
})

test('buildBookingWhatsAppUrl includes the selected appointment details', () => {
  const message = messageFrom(buildBookingWhatsAppUrl({
    name: 'Jane Doe',
    phone: '(218) 555-0100',
    email: 'jane@example.com',
    service: 'Snow Removal',
    date: '2026-08-20',
    timeSlot: '9:00 AM – 11:00 AM',
    location: 'Moorhead, MN',
    notes: 'Corner property',
  }))

  assert.match(message ?? '', /Booking request from Jane Doe/)
  assert.match(message ?? '', /2026-08-20/)
  assert.match(message ?? '', /9:00 AM – 11:00 AM/)
  assert.match(message ?? '', /Corner property/)
})
```

- [ ] **Step 2: Run the tests and verify they fail because the module does not exist**

Run:

```bash
TS_NODE_COMPILER_OPTIONS='{"module":"CommonJS","jsx":"react-jsx"}' node --test -r ts-node/register tests/whatsapp.test.ts
```

Expected: FAIL with `Cannot find module '../lib/whatsapp'`.

- [ ] **Step 3: Implement the minimal pure URL builders**

```ts
const WHATSAPP_NUMBER = '12189791154'

export interface QuoteWhatsAppData {
  name: string
  phone?: string
  email: string
  service?: string
  location?: string
  message: string
}

export interface BookingWhatsAppData {
  name: string
  phone?: string
  email: string
  service: string
  date: string
  timeSlot: string
  location?: string
  notes?: string
}

function whatsappUrl(lines: string[]) {
  const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`)
  url.searchParams.set('text', lines.filter(Boolean).join('\n'))
  return url.toString()
}

function field(label: string, value?: string) {
  return value?.trim() ? `${label}: ${value.trim()}` : ''
}

export function buildQuoteWhatsAppUrl(data: QuoteWhatsAppData) {
  return whatsappUrl([
    `Quote request from ${data.name}`,
    field('Phone', data.phone),
    field('Email', data.email),
    field('Service', data.service),
    field('Location', data.location),
    field('Project', data.message),
  ])
}

export function buildBookingWhatsAppUrl(data: BookingWhatsAppData) {
  return whatsappUrl([
    `Booking request from ${data.name}`,
    field('Phone', data.phone),
    field('Email', data.email),
    field('Service', data.service),
    field('Date', data.date),
    field('Time', data.timeSlot),
    field('Location', data.location),
    field('Notes', data.notes),
  ])
}
```

- [ ] **Step 4: Run the URL-builder tests and verify they pass**

Run the command from Step 2.

Expected: 2 tests pass.

- [ ] **Step 5: Commit the tested builders**

```bash
git add lib/whatsapp.ts tests/whatsapp.test.ts
git commit -m "feat: build customer WhatsApp handoff links"
```

### Task 2: Shared WhatsApp Success Action

**Files:**
- Create: `components/ui/WhatsAppHandoff.tsx`
- Modify: `components/ui/QuoteForm.tsx`
- Modify: `components/booking/BookingForm.tsx`

**Interfaces:**
- Consumes: `buildQuoteWhatsAppUrl` and `buildBookingWhatsAppUrl` from Task 1.
- Produces: `WhatsAppHandoff({ href }: { href: string }): JSX.Element`.

- [ ] **Step 1: Create the reusable WhatsApp action**

```tsx
import { MessageCircle } from 'lucide-react'

export default function WhatsAppHandoff({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-bold text-white transition hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle size={18} aria-hidden="true" />
      Continue on WhatsApp
    </a>
  )
}
```

- [ ] **Step 2: Preserve the successful quote payload and render its WhatsApp link**

In `QuoteForm`, add `submittedData: FormData | null` state, set it only after `/api/quote` succeeds, and replace the boolean-only success condition with `if (submittedData)`. Build the link with `buildQuoteWhatsAppUrl(submittedData)` and render `WhatsAppHandoff` below the existing confirmation copy.

The success code must have this shape:

```tsx
const [submittedData, setSubmittedData] = useState<FormData | null>(null)

// after res.ok
setSubmittedData(data)

if (submittedData) {
  const whatsappUrl = buildQuoteWhatsAppUrl(submittedData)
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      {/* existing icon, heading, and response-time copy */}
      <WhatsAppHandoff href={whatsappUrl} />
      <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-500'}`}>
        WhatsApp will open with your request ready to review and send.
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Render the booking WhatsApp link from retained booking state**

In the existing `if (done)` branch, call:

```tsx
const whatsappUrl = buildBookingWhatsAppUrl({
  ...form,
  service,
  date: selectedDate,
  timeSlot: selectedSlot,
})
```

Render `<WhatsAppHandoff href={whatsappUrl} />` after the appointment summary and add the same explanation that WhatsApp opens a request ready for customer review and sending.

- [ ] **Step 4: Run static verification**

Run:

```bash
npx tsc --noEmit
npm run build
```

Expected: both commands exit 0 and both success components compile as client-side links.

- [ ] **Step 5: Commit the success-screen handoffs**

```bash
git add components/ui/WhatsAppHandoff.tsx components/ui/QuoteForm.tsx components/booking/BookingForm.tsx
git commit -m "feat: offer WhatsApp after customer submissions"
```

### Task 3: Tested Email Delivery Boundary and Feedback Email Content

**Files:**
- Create: `lib/notificationDelivery.ts`
- Create: `lib/feedbackEmail.ts`
- Create: `tests/email-notifications.test.ts`
- Modify: `lib/email.ts`

**Interfaces:**
- Produces: `deliverEmail(label: string, operation: () => Promise<void>): Promise<boolean>`.
- Produces: `buildFeedbackEmail(data: FeedbackEmailData): { subject: string; html: string }`.
- Produces: `sendFeedbackNotification(data: FeedbackEmailData): Promise<void>` from `lib/email.ts`.

- [ ] **Step 1: Write failing delivery and feedback-email tests**

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { buildFeedbackEmail } from '../lib/feedbackEmail'
import { deliverEmail } from '../lib/notificationDelivery'

test('deliverEmail reports success after awaiting the operation', async () => {
  let completed = false
  const delivered = await deliverEmail('quote notification', async () => {
    completed = true
  })
  assert.equal(completed, true)
  assert.equal(delivered, true)
})

test('deliverEmail contains an error and returns false', async () => {
  const original = console.error
  const messages: string[] = []
  console.error = (...args) => messages.push(args.join(' '))
  try {
    const delivered = await deliverEmail('feedback notification', async () => {
      throw new Error('mailbox unavailable')
    })
    assert.equal(delivered, false)
    assert.deepEqual(messages, ['[email] feedback notification failed: mailbox unavailable'])
  } finally {
    console.error = original
  }
})

test('buildFeedbackEmail includes customer feedback and escapes HTML', () => {
  const email = buildFeedbackEmail({
    name: '<Jane>',
    email: 'jane@example.com',
    rating: 5,
    service: 'Seasonal Cleanup',
    review: 'Great work & fast service.',
  })
  assert.equal(email.subject, 'New 5-star Customer Feedback from <Jane>')
  assert.match(email.html, /&lt;Jane&gt;/)
  assert.match(email.html, /jane@example\.com/)
  assert.match(email.html, /Great work &amp; fast service\./)
})
```

- [ ] **Step 2: Run the tests and verify missing-module failures**

Run:

```bash
TS_NODE_COMPILER_OPTIONS='{"module":"CommonJS","jsx":"react-jsx"}' node --test -r ts-node/register tests/email-notifications.test.ts
```

Expected: FAIL because `lib/feedbackEmail.ts` and `lib/notificationDelivery.ts` do not exist.

- [ ] **Step 3: Implement the delivery boundary**

```ts
export async function deliverEmail(
  label: string,
  operation: () => Promise<void>
): Promise<boolean> {
  try {
    await operation()
    return true
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown email error'
    console.error(`[email] ${label} failed: ${message}`)
    return false
  }
}
```

- [ ] **Step 4: Implement escaped feedback-email content**

Create `FeedbackEmailData` with `name`, optional `email`, `rating`, optional `service`, and `review`. Implement a private `escapeHtml` that replaces `&`, `<`, `>`, `"`, and `'`. `buildFeedbackEmail` must use escaped values in an HTML table and return the exact tested subject.

The builder's return must include:

```ts
return {
  subject: `New ${data.rating}-star Customer Feedback from ${data.name}`,
  html: `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
      <h2 style="color:#0f2910;">New Customer Feedback</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email || 'Not provided')}</p>
      <p><strong>Rating:</strong> ${data.rating}/5</p>
      <p><strong>Service:</strong> ${escapeHtml(data.service || 'Not specified')}</p>
      <p><strong>Feedback:</strong><br>${escapeHtml(data.review).replace(/\n/g, '<br>')}</p>
      <p style="color:#888;font-size:12px;margin-top:24px;">Sent from pklandscapingmn.com</p>
    </div>
  `,
}
```

- [ ] **Step 5: Connect the builder to Nodemailer**

In `lib/email.ts`, import `buildFeedbackEmail` and `FeedbackEmailData`, then add:

```ts
export async function sendFeedbackNotification(data: FeedbackEmailData) {
  const content = buildFeedbackEmail(data)
  await send({
    from: `"PK Landscaping Website" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFICATION_EMAIL,
    ...content,
  })
}
```

Change the unconfigured branch in the private `send` function to throw a short configuration error after its existing safe log line. This lets `deliverEmail` return `false` without exposing credentials:

```ts
throw new Error('SMTP is not fully configured')
```

- [ ] **Step 6: Run the email tests and verify they pass**

Run the command from Step 2.

Expected: 3 tests pass.

- [ ] **Step 7: Commit the tested email primitives**

```bash
git add lib/notificationDelivery.ts lib/feedbackEmail.ts lib/email.ts tests/email-notifications.test.ts
git commit -m "feat: add reliable feedback email notifications"
```

### Task 4: Wire Awaited Email Attempts After Database Writes

**Files:**
- Modify: `lib/validation.ts`
- Modify: `app/api/quote/route.ts`
- Modify: `app/api/bookings/route.ts`
- Modify: `app/api/feedback/route.ts`

**Interfaces:**
- Consumes: `deliverEmail` from Task 3.
- Consumes: `sendQuoteNotification`, `sendBookingAlertToAdmin`, `sendBookingConfirmationToCustomer`, and `sendFeedbackNotification` from `lib/email.ts`.
- API response contracts remain unchanged.

- [ ] **Step 1: Accept the optional feedback email already submitted by the UI**

Add this property to `testimonialSchema`:

```ts
email: z.union([
  z.string().email('Please enter a valid email address'),
  z.literal(''),
]).optional(),
```

The value is used only for the notification and is not added to the database schema.

- [ ] **Step 2: Await quote notification after saving the lead**

Replace the fire-and-forget `.catch` call with:

```ts
await deliverEmail('quote notification', () =>
  sendQuoteNotification({ name, phone, email, service, message })
)
```

Keep the database create and its 500 response before this call.

- [ ] **Step 3: Await both booking emails after saving the booking**

Replace both fire-and-forget calls with:

```ts
await Promise.all([
  deliverEmail('booking admin notification', () => sendBookingAlertToAdmin(booking)),
  deliverEmail('booking customer confirmation', () =>
    sendBookingConfirmationToCustomer({
      name: booking.name,
      email: booking.email,
      service: booking.service,
      date: booking.date,
      timeSlot: booking.timeSlot,
    })
  ),
])
```

Keep conflict detection and the database create before these calls.

- [ ] **Step 4: Send feedback notification after saving the testimonial**

Destructure `email` from validated feedback and add this after the successful database create:

```ts
await deliverEmail('feedback notification', () =>
  sendFeedbackNotification({ name, email, rating, service, review })
)
```

The API still returns `{ success: true }` whether the notification returns `true` or `false`.

- [ ] **Step 5: Run all unit and static checks**

Run:

```bash
TS_NODE_COMPILER_OPTIONS='{"module":"CommonJS","jsx":"react-jsx"}' node --test -r ts-node/register tests/*.test.ts
npx tsc --noEmit
npm run build
```

Expected: 12 unit tests pass, TypeScript exits 0, and the production build exits 0.

- [ ] **Step 6: Commit the API wiring**

```bash
git add lib/validation.ts app/api/quote/route.ts app/api/bookings/route.ts app/api/feedback/route.ts
git commit -m "feat: deliver form notifications after database writes"
```

### Task 5: Review, Deploy, and Verify the Live Customer Flow

**Files:**
- Verify only; no planned source changes.

**Interfaces:**
- Consumes the completed feature branch and the existing Railway production environment.
- Produces a verified deployment on `https://www.pklandscapingmn.com`.

- [ ] **Step 1: Review the exact feature diff and workspace isolation**

Run:

```bash
git status --short
git diff --check origin/main...HEAD
git diff --stat origin/main...HEAD
git log --oneline origin/main..HEAD
```

Expected: clean feature worktree; no database, migration, custom-domain, forwarding, or unrelated package-file changes.

- [ ] **Step 2: Run the final local verification suite from a clean state**

Run the unit-test, TypeScript, and production-build commands from Task 4 Step 5 again. Do not claim success unless their fresh output exits 0.

- [ ] **Step 3: Push the verified feature revision to the Railway deployment branch**

Confirm `origin/main` has not advanced with `git fetch origin` and `git merge-base --is-ancestor origin/main HEAD`. Then push the exact reviewed HEAD to `origin/main`. Do not force-push.

- [ ] **Step 4: Wait for Railway deployment success and inspect safe logs**

Verify the new deployment reaches `SUCCESS`. Inspect application logs for startup, Prisma migration, SMTP configuration, and runtime errors without printing environment values.

- [ ] **Step 5: Submit uniquely labeled production tests**

Through the public HTTPS site, submit one quote, one future booking, and one feedback entry labeled `Codex notification verification 2026-08-11`. Use `contact@pklandscapingmn.com` as the controlled email address and avoid a date/time already accepted by another customer.

Expected:

- Each API returns a 2xx response.
- The quote and booking success screens show “Continue on WhatsApp.”
- Each WhatsApp link opens `12189791154` with the correct prefilled summary; do not tap Send during verification.
- The booking customer-confirmation attempt and all three business-notification attempts complete without a Railway SMTP error.

- [ ] **Step 6: Verify persistence and delivery evidence**

Confirm the quote, booking, and unpublished feedback exist in the recovered PostgreSQL database/admin views. Confirm notification mail is accepted by the SMTP provider for `contact@pklandscapingmn.com`; if authenticated inbox access is available, also confirm the messages arrived in the inbox.

- [ ] **Step 7: Verify the public domains remain healthy**

Check fresh HTTPS responses for both `https://www.pklandscapingmn.com` and `https://pklandscapingmn.com`, including the intended canonical redirect behavior. Confirm neither the Railway service/database nor domain records were replaced.

- [ ] **Step 8: Report exact outcomes and any remaining external dependency**

Report the deployed commit, successful checks, form persistence evidence, SMTP acceptance/inbox evidence, WhatsApp link behavior, and domain status. If SMTP rejects credentials or the mailbox cannot be inspected, keep the saved-request feature live and report the exact provider-side action still required.
