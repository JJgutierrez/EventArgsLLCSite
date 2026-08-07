import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PRIMARY_CTA_LABEL, PRIMARY_CTA_HREF } from '../src/cta.js'

test('PRIMARY_CTA_LABEL is exact contract string', () => {
  assert.equal(PRIMARY_CTA_LABEL, 'Schedule a technical feasibility call')
})

test('PRIMARY_CTA_HREF points to contact', () => {
  assert.equal(PRIMARY_CTA_HREF, '/contact.html')
})

test('Wave 1 pages include primary CTA label', () => {
  for (const file of ['index.html', 'services.html', 'contact.html']) {
    const html = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
    assert.match(html, /Schedule a technical feasibility call/)
  }
})

test('layout.js nav CTA uses PRIMARY_CTA_LABEL', async () => {
  const layout = readFileSync(new URL('../src/layout.js', import.meta.url), 'utf8')
  assert.match(layout, /PRIMARY_CTA_LABEL/)
  assert.match(layout, /PRIMARY_CTA_HREF/)
})
