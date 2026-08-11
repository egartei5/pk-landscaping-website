import assert from 'node:assert/strict'
import test from 'node:test'
import { feedbackSubmissionSchema, testimonialSchema } from '../lib/validation'

const feedback = {
  name: 'Jane Doe',
  rating: 5,
  review: 'PK Landscaping did excellent work.',
  service: 'Seasonal Cleanup',
}

test('feedbackSubmissionSchema preserves a valid optional customer email', () => {
  const result = feedbackSubmissionSchema.safeParse({
    ...feedback,
    email: 'jane@example.com',
  })

  assert.equal(result.success, true)
  if (result.success) assert.equal(result.data.email, 'jane@example.com')
})

test('feedbackSubmissionSchema rejects a malformed customer email', () => {
  const result = feedbackSubmissionSchema.safeParse({
    ...feedback,
    email: 'not-an-email',
  })

  assert.equal(result.success, false)
})

test('testimonialSchema never forwards notification-only email to persistence', () => {
  const result = testimonialSchema.safeParse({
    ...feedback,
    email: 'jane@example.com',
  })

  assert.equal(result.success, true)
  if (result.success) assert.equal('email' in result.data, false)
})
