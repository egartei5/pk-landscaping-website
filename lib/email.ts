import nodemailer from 'nodemailer'
import { env } from './env'
import { buildFeedbackEmail, type FeedbackEmailData } from './feedbackEmail'
import { SMTP_TRANSPORT_TIMEOUTS } from './emailTransport'
import { sendResendEmail } from './resendEmail'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  ...SMTP_TRANSPORT_TIMEOUTS,
})

/**
 * All outbound mail goes through here. Callers treat email as best-effort,
 * so an unconfigured mailbox must produce a loud, specific log line instead
 * of a vague connection error buried in a .catch().
 */
type MailOptions = {
  from: string
  to: string | string[]
  subject: string
  html: string
}

async function send(options: MailOptions) {
  if (!env.emailConfigured || !env.emailProvider) {
    console.error(
      `[email] NOT SENT — "${options.subject}". Email delivery is not fully configured; ` +
        'check the Resend HTTPS or SMTP fallback variables.'
    )
    throw new Error('Email delivery is not fully configured')
  }

  if (env.emailProvider === 'resend') {
    await sendResendEmail(process.env.RESEND_API_KEY ?? '', options)
    return
  }

  await transporter.sendMail(options)
}

export async function sendQuoteNotification(data: {
  name: string
  phone?: string | null
  email: string
  service?: string | null
  message: string
}) {
  await send({
    from: `"PK Landscaping Website" <${env.emailFrom}>`,
    to: env.notificationEmail,
    subject: `New Quote Request from ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0f2910;">New Quote Request</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:120px;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.phone ?? 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.service ?? 'Not specified'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px;">${data.message.replace(/\n/g, '<br>')}</td></tr>
        </table>
        <p style="color:#888;font-size:12px;margin-top:24px;">Sent from pklandscapingmn.com</p>
      </div>
    `,
  })
}

export async function sendFeedbackNotification(data: FeedbackEmailData) {
  const content = buildFeedbackEmail(data)
  await send({
    from: `"PK Landscaping Website" <${env.emailFrom}>`,
    to: env.notificationEmail,
    ...content,
  })
}

export async function sendBookingConfirmationToCustomer(data: {
  name: string
  email: string
  service: string
  date: string
  timeSlot: string
}) {
  await send({
    from: `"PK Landscaping" <${env.emailFrom}>`,
    to: data.email,
    subject: `Booking Request Received — PK Landscaping`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:12px;">
        <h2 style="color:#0f2910;margin-top:0;">Hi ${data.name}, we got your booking request!</h2>
        <p style="color:#444;">We'll review your request and confirm within a few hours. Here's what you submitted:</p>
        <div style="background:#fff;border-radius:8px;padding:20px;margin:20px 0;border:1px solid #e0e0e0;">
          <p style="margin:8px 0;"><strong>Service:</strong> ${data.service}</p>
          <p style="margin:8px 0;"><strong>Date:</strong> ${data.date}</p>
          <p style="margin:8px 0;"><strong>Time:</strong> ${data.timeSlot}</p>
        </div>
        <p style="color:#444;">Questions? Call us at <a href="tel:+12189791154" style="color:#4caf50;">(218) 979-1154</a></p>
        <p style="color:#888;font-size:12px;margin-top:24px;">PK Landscaping Service — Fargo-Moorhead Area</p>
      </div>
    `,
  })
}

export async function sendBookingStatusEmail(data: {
  name: string
  email: string
  service: string
  date: string
  timeSlot: string
  status: 'accepted' | 'rejected'
}) {
  const accepted = data.status === 'accepted'
  await send({
    from: `"PK Landscaping" <${env.emailFrom}>`,
    to: data.email,
    subject: accepted
      ? `✅ Booking Confirmed — ${data.date}`
      : `Booking Update — PK Landscaping`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:12px;">
        <h2 style="color:${accepted ? '#2e7d32' : '#c62828'};margin-top:0;">
          ${accepted ? '✅ Your Booking is Confirmed!' : 'Unfortunately We Cannot Accommodate That Time'}
        </h2>
        <p style="color:#444;">Hi ${data.name},</p>
        ${accepted
          ? `<p style="color:#444;">Great news — your booking has been confirmed. We look forward to serving you!</p>`
          : `<p style="color:#444;">We're sorry, but the requested time slot is no longer available. Please visit our website to choose another time, or call us directly.</p>`
        }
        <div style="background:#fff;border-radius:8px;padding:20px;margin:20px 0;border:1px solid #e0e0e0;">
          <p style="margin:8px 0;"><strong>Service:</strong> ${data.service}</p>
          <p style="margin:8px 0;"><strong>Date:</strong> ${data.date}</p>
          <p style="margin:8px 0;"><strong>Time:</strong> ${data.timeSlot}</p>
          <p style="margin:8px 0;"><strong>Status:</strong> <span style="color:${accepted ? '#2e7d32' : '#c62828'};font-weight:bold;">${accepted ? 'CONFIRMED' : 'NOT AVAILABLE'}</span></p>
        </div>
        <p style="color:#444;">Call us: <a href="tel:+12189791154" style="color:#4caf50;">(218) 979-1154</a></p>
        ${!accepted ? `<a href="https://pklandscapingmn.com/book" style="display:inline-block;background:#4caf50;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:8px;">Book Another Time →</a>` : ''}
        <p style="color:#888;font-size:12px;margin-top:24px;">PK Landscaping Service — Fargo-Moorhead Area</p>
      </div>
    `,
  })
}

export async function sendBookingAlertToAdmin(data: {
  name: string
  phone?: string | null
  email: string
  service: string
  date: string
  timeSlot: string
  location?: string | null
  notes?: string | null
}) {
  await send({
    from: `"PK Landscaping Website" <${env.emailFrom}>`,
    to: env.notificationEmail,
    subject: `📅 New Booking Request — ${data.date} at ${data.timeSlot}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#0f2910;">New Booking Request</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;width:120px;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Phone</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.phone ?? 'Not provided'}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.email}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Service</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.service}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Date</td><td style="padding:8px;border-bottom:1px solid #eee;color:#2e7d32;font-weight:bold;">${data.date}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Time Slot</td><td style="padding:8px;border-bottom:1px solid #eee;color:#2e7d32;font-weight:bold;">${data.timeSlot}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Location</td><td style="padding:8px;border-bottom:1px solid #eee;">${data.location ?? 'Not specified'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top;">Notes</td><td style="padding:8px;">${data.notes ?? 'None'}</td></tr>
        </table>
        <a href="https://pklandscapingmn.com/admin/bookings" style="display:inline-block;background:#4caf50;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;margin-top:20px;">Accept or Reject in Admin →</a>
        <p style="color:#888;font-size:12px;margin-top:24px;">Sent from pklandscapingmn.com</p>
      </div>
    `,
  })
}
