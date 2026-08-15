import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))

test('retired multi-agent paths permanently redirect', () => {
  const redirects = vercel.redirects || []
  const bySource = Object.fromEntries(redirects.map((rule) => [rule.source, rule]))
  assert.equal(bySource['/multi-agent']?.destination, '/services')
  assert.equal(bySource['/multi-agent']?.permanent, true)
  assert.equal(bySource['/multi-agent-orchestrator']?.destination, '/engineering-insights')
  assert.equal(bySource['/multi-agent-orchestrator']?.permanent, true)
  assert.equal(bySource['/case-studies/multi-agent-orchestrator']?.destination, '/case-studies')
  assert.equal(bySource['/case-studies/multi-agent-orchestrator']?.permanent, true)
})
