import assert from 'node:assert/strict'
import test from 'node:test'
import { buildFeedbackEmail } from '../lib/feedbackEmail'
import { deliverEmail } from '../lib/notificationDelivery'
import { SMTP_TRANSPORT_TIMEOUTS } from '../lib/emailTransport'

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

test('deliverEmail stops waiting when an email operation stalls', async () => {
  const original = console.error
  const messages: string[] = []
  console.error = (...args) => messages.push(args.join(' '))

  try {
    const delivered = await deliverEmail(
      'stalled notification',
      () => new Promise<void>(() => {}),
      5
    )

    assert.equal(delivered, false)
    assert.deepEqual(messages, ['[email] stalled notification failed: timed out after 5ms'])
  } finally {
    console.error = original
  }
})

test('SMTP transport stages are bounded below the delivery deadline', () => {
  assert.deepEqual(SMTP_TRANSPORT_TIMEOUTS, {
    dnsTimeout: 5_000,
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 12_000,
  })
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
