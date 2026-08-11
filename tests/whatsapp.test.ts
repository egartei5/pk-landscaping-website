import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildBookingWhatsAppUrl,
  buildQuoteWhatsAppUrl,
  createBookingSubmission,
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

test('createBookingSubmission keeps the exact payload sent before later form edits', () => {
  const form = {
    name: 'Jane Doe',
    phone: '(218) 555-0100',
    email: 'jane@example.com',
    location: 'Moorhead, MN',
    notes: 'Corner property',
  }
  const submitted = createBookingSubmission(form, {
    service: 'Snow Removal',
    date: '2026-08-20',
    timeSlot: '9:00 AM – 11:00 AM',
  })

  form.name = 'Edited While Waiting'
  form.notes = 'Different notes'

  assert.equal(submitted.name, 'Jane Doe')
  assert.equal(submitted.notes, 'Corner property')
})
