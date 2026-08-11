import assert from 'node:assert/strict'
import test from 'node:test'
import { testimonialSchema } from '../lib/validation'

const feedback = {
  name: 'Jane Doe',
  rating: 5,
  review: 'PK Landscaping did excellent work.',
  service: 'Seasonal Cleanup',
}

test('testimonialSchema preserves a valid optional customer email', () => {
  const result = testimonialSchema.safeParse({
    ...feedback,
    email: 'jane@example.com',
  })

  assert.equal(result.success, true)
  if (result.success) assert.equal(result.data.email, 'jane@example.com')
})

test('testimonialSchema rejects a malformed customer email', () => {
  const result = testimonialSchema.safeParse({
    ...feedback,
    email: 'not-an-email',
  })

  assert.equal(result.success, false)
})
