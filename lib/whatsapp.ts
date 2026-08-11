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

export function createBookingSubmission(
  form: Omit<BookingWhatsAppData, 'service' | 'date' | 'timeSlot'>,
  appointment: Pick<BookingWhatsAppData, 'service' | 'date' | 'timeSlot'>
): BookingWhatsAppData {
  return { ...form, ...appointment }
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
