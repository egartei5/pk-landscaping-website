const RESEND_EMAILS_URL = 'https://api.resend.com/emails'

export interface ResendEmailMessage {
  from: string
  to: string | string[]
  subject: string
  html: string
}

type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>

function responseMessage(payload: unknown) {
  if (
    payload &&
    typeof payload === 'object' &&
    'message' in payload &&
    typeof payload.message === 'string'
  ) {
    return payload.message.slice(0, 300)
  }

  return 'Unknown API error'
}

export async function sendResendEmail(
  apiKey: string,
  message: ResendEmailMessage,
  fetchImpl: FetchLike = fetch
) {
  if (!apiKey.trim()) {
    throw new Error('Resend API key is not configured')
  }

  const response = await fetchImpl(RESEND_EMAILS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...message,
      to: Array.isArray(message.to) ? message.to : [message.to],
    }),
  })

  if (!response.ok) {
    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      payload = null
    }

    throw new Error(
      `Resend rejected email (${response.status}): ${responseMessage(payload)}`
    )
  }
}
