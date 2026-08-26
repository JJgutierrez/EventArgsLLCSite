import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = readFileSync(new URL('../services.html', import.meta.url), 'utf8')

test('services page has primary CTA label', () => {
  assert.match(html, /Schedule a technical feasibility call/)
})

test('each engagement has discuss CTA with service query', () => {
  for (const service of ['copilot', 'governance', 'devops']) {
    assert.match(
      html,
      new RegExp(`href="/contact\\?service=${service}"[^>]*>\\s*Discuss this engagement`),
    )
  }
})
