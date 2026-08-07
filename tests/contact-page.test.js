import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = readFileSync(new URL('../contact.html', import.meta.url), 'utf8')

test('contact page keeps form action', () => {
  assert.match(html, /id="contact-form"[^>]*action="\/api\/contact"/)
})

test('contact page keeps calendly booking target', () => {
  assert.match(html, /id="book-call-btn"[^>]*href="https:\/\/calendly\.com\/gutierrez014642"/)
})

test('contact page surfaces primary CTA label', () => {
  assert.match(html, /Schedule a technical feasibility call/)
})
