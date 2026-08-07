import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('architecture proof nodes appear in order', () => {
  const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const nodes = [
    'Docs & SharePoint',
    'Ingestion & Chunking',
    'Hybrid Vector Search',
    'Policy & Guardrails',
    'Copilot UI with citations',
  ]
  let cursor = -1
  for (const node of nodes) {
    const idx = source.indexOf(node)
    assert.ok(idx !== -1, `missing node: ${node}`)
    assert.ok(idx > cursor, `out of order: ${node}`)
    cursor = idx
  }
})
