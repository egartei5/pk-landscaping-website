export const DEFAULT_EMAIL_DELIVERY_TIMEOUT_MS = 15_000

export async function deliverEmail(
  label: string,
  operation: () => Promise<void>,
  timeoutMs = DEFAULT_EMAIL_DELIVERY_TIMEOUT_MS
): Promise<boolean> {
  let timeout: ReturnType<typeof setTimeout> | undefined

  try {
    const deadline = new Promise<never>((_, reject) => {
      timeout = setTimeout(
        () => reject(new Error(`timed out after ${timeoutMs}ms`)),
        timeoutMs
      )
    })

    await Promise.race([operation(), deadline])
    return true
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown email error'
    console.error(`[email] ${label} failed: ${message}`)
    return false
  } finally {
    if (timeout) clearTimeout(timeout)
  }
}
