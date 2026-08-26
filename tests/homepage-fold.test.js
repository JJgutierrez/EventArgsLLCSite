import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = () => readFileSync(new URL('../index.html', import.meta.url), 'utf8')

test('hero appears before metrics and before outcome/trust', () => {
  const source = html()
  const hero = source.indexOf('class="hero hero--atmosphere"')
  const metrics = source.indexOf('class="metrics-bar"')
  const outcome = source.indexOf('outcome-banner')
  const trust = source.indexOf('domain-trust-ribbon')
  assert.ok(hero !== -1 && metrics !== -1 && outcome !== -1 && trust !== -1)
  assert.ok(hero < metrics, 'hero before metrics')
  assert.ok(metrics < outcome, 'metrics before outcome')
  assert.ok(outcome < trust || trust > metrics, 'trust below metrics')
  assert.ok(metrics < trust, 'metrics before trust')
})

test('hero primary CTA uses contract label and contact href', () => {
  const source = html()
  assert.match(
    source,
    /href="\/contact"[^>]*class="[^"]*btn-primary[^"]*"[^>]*>\s*Schedule a technical feasibility call/,
  )
})
