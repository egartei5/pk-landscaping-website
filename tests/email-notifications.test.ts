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
