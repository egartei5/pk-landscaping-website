import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveEmailConfiguration } from '../lib/emailConfiguration'
import { sendResendEmail } from '../lib/resendEmail'

test('resolveEmailConfiguration prefers Resend when its HTTPS settings are complete', () => {
  assert.deepEqual(resolveEmailConfiguration({
    RESEND_API_KEY: 're_live_key',
    RESEND_FROM_EMAIL: 'contact@pklandscapingmn.com',
    NOTIFICATION_EMAIL: 'contact@pklandscapingmn.com',
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: '587',
    SMTP_USER: 'contact@pklandscapingmn.com',
    SMTP_PASS: 'app-password',
  }), {
    provider: 'resend',
    from: 'contact@pklandscapingmn.com',
    notificationEmail: 'contact@pklandscapingmn.com',
  })
})

test('resolveEmailConfiguration falls back to SMTP when Resend is absent', () => {
  assert.deepEqual(resolveEmailConfiguration({
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: '587',
    SMTP_USER: 'contact@pklandscapingmn.com',
    SMTP_PASS: 'app-password',
    NOTIFICATION_EMAIL: 'contact@pklandscapingmn.com',
  }), {
    provider: 'smtp',
    from: 'contact@pklandscapingmn.com',
    notificationEmail: 'contact@pklandscapingmn.com',
  })
})

test('resolveEmailConfiguration rejects incomplete email settings', () => {
  assert.equal(resolveEmailConfiguration({
    RESEND_API_KEY: 're_live_key',
    NOTIFICATION_EMAIL: 'contact@pklandscapingmn.com',
  }), null)
})

test('sendResendEmail sends the Resend HTTPS API contract', async () => {
  const calls: Array<{ input: string; init?: RequestInit }> = []

  await sendResendEmail(
    're_test_key',
    {
      from: 'PK Landscaping <contact@pklandscapingmn.com>',
      to: 'contact@pklandscapingmn.com',
      subject: 'New quote request',
      html: '<p>Customer details</p>',
    },
    async (input, init) => {
      calls.push({ input: String(input), init })
      return new Response(JSON.stringify({ id: 'email_123' }), { status: 200 })
    }
  )

  assert.equal(calls.length, 1)
  assert.equal(calls[0].input, 'https://api.resend.com/emails')
  assert.equal(calls[0].init?.method, 'POST')
  assert.deepEqual(calls[0].init?.headers, {
    Authorization: 'Bearer re_test_key',
    'Content-Type': 'application/json',
  })
  assert.deepEqual(JSON.parse(String(calls[0].init?.body)), {
    from: 'PK Landscaping <contact@pklandscapingmn.com>',
    to: ['contact@pklandscapingmn.com'],
    subject: 'New quote request',
    html: '<p>Customer details</p>',
  })
})

test('sendResendEmail reports a rejected API request without exposing the key', async () => {
  await assert.rejects(
    sendResendEmail(
      're_secret_key',
      {
        from: 'contact@pklandscapingmn.com',
        to: 'contact@pklandscapingmn.com',
        subject: 'Test',
        html: '<p>Test</p>',
      },
      async () => new Response(
        JSON.stringify({ message: 'Domain is not verified' }),
        { status: 403 }
      )
    ),
    (error: unknown) => {
      assert.match(String(error), /Resend rejected email \(403\): Domain is not verified/)
      assert.doesNotMatch(String(error), /re_secret_key/)
      return true
    }
  )
})

test('sendResendEmail requires an API key before making a request', async () => {
  let called = false

  await assert.rejects(
    sendResendEmail(
      '   ',
      {
        from: 'contact@pklandscapingmn.com',
        to: 'contact@pklandscapingmn.com',
        subject: 'Test',
        html: '<p>Test</p>',
      },
      async () => {
        called = true
        return new Response(null, { status: 200 })
      }
    ),
    /Resend API key is not configured/
  )

  assert.equal(called, false)
})
