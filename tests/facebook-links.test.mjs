import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const verifiedFacebookUrl = 'https://www.facebook.com/profile.php?id=100071527000701'

test('website uses one verified Facebook URL in the footer and contact page', async () => {
  const socialLinks = await readFile(new URL('../lib/social-links.ts', import.meta.url), 'utf8')
  const footer = await readFile(new URL('../components/layout/Footer.tsx', import.meta.url), 'utf8')
  const contact = await readFile(new URL('../app/contact/page.tsx', import.meta.url), 'utf8')

  assert.ok(socialLinks.includes(`FACEBOOK_URL = '${verifiedFacebookUrl}'`))
  assert.match(footer, /href=\{FACEBOOK_URL\}/)
  assert.match(contact, /href=\{FACEBOOK_URL\}/)
  assert.match(contact, /Follow us on Facebook/)
})

test('Facebook links use safe new-tab attributes', async () => {
  const footer = await readFile(new URL('../components/layout/Footer.tsx', import.meta.url), 'utf8')
  const contact = await readFile(new URL('../app/contact/page.tsx', import.meta.url), 'utf8')

  for (const source of [footer, contact]) {
    assert.match(source, /target="_blank"/)
    assert.match(source, /rel="noopener noreferrer"/)
  }
})
