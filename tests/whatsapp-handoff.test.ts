import assert from 'node:assert/strict'
import test from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import WhatsAppHandoff from '../components/ui/WhatsAppHandoff'

test('WhatsAppHandoff renders a safe new-tab link with clear customer copy', () => {
  const html = renderToStaticMarkup(React.createElement(WhatsAppHandoff, {
    href: 'https://wa.me/12189791154?text=Quote+request',
  }))

  assert.match(html, /href="https:\/\/wa\.me\/12189791154\?text=Quote\+request"/)
  assert.match(html, /target="_blank"/)
  assert.match(html, /rel="noopener noreferrer"/)
  assert.match(html, />Continue on WhatsApp</)
})
