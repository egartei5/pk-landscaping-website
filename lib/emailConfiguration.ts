type Environment = Record<string, string | undefined>

export type EmailConfiguration = {
  provider: 'resend' | 'smtp'
  from: string
  notificationEmail: string
}

function present(value: string | undefined) {
  return Boolean(value?.trim())
}

function email(value: string | undefined) {
  return present(value) && value!.includes('@')
}

export function resolveEmailConfiguration(
  environment: Environment
): EmailConfiguration | null {
  if (
    present(environment.RESEND_API_KEY) &&
    email(environment.RESEND_FROM_EMAIL) &&
    email(environment.NOTIFICATION_EMAIL)
  ) {
    return {
      provider: 'resend',
      from: environment.RESEND_FROM_EMAIL!.trim(),
      notificationEmail: environment.NOTIFICATION_EMAIL!.trim(),
    }
  }

  if (
    present(environment.SMTP_HOST) &&
    /^\d+$/.test(environment.SMTP_PORT ?? '') &&
    email(environment.SMTP_USER) &&
    present(environment.SMTP_PASS) &&
    email(environment.NOTIFICATION_EMAIL)
  ) {
    return {
      provider: 'smtp',
      from: environment.SMTP_USER!.trim(),
      notificationEmail: environment.NOTIFICATION_EMAIL!.trim(),
    }
  }

  return null
}
