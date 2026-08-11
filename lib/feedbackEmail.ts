export interface FeedbackEmailData {
  name: string
  email?: string
  rating: number
  service?: string
  review: string
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export function buildFeedbackEmail(data: FeedbackEmailData) {
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
}
