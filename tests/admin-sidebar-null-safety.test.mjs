import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

test('admin navigation treats a missing pathname as an empty path', async () => {
  const sidebar = await readFile(
    new URL('../components/admin/AdminSidebar.tsx', import.meta.url),
    'utf8',
  )

  assert.match(sidebar, /const pathname = usePathname\(\) \?\? ''/)
})

test('public navigation treats a missing pathname as an empty path', async () => {
  const header = await readFile(
    new URL('../components/layout/Header.tsx', import.meta.url),
    'utf8',
  )

  assert.match(header, /const pathname = usePathname\(\) \?\? ''/)
})
