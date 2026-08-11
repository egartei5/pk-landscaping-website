export async function deliverEmail(
  label: string,
  operation: () => Promise<void>
): Promise<boolean> {
  try {
    await operation()
    return true
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown email error'
    console.error(`[email] ${label} failed: ${message}`)
    return false
  }
}
