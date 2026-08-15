import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync, readFileSync } from 'node:fs'

const ROOT = new URL('..', import.meta.url)
const PUBLIC_GLOBS = [
  'index.html',
  'services.html',
  'about.html',
  'contact.html',
  'case-studies.html',
  'case-study-knowledge-copilot.html',
  'engineering-insights.html',
  'src/layout.js',
  'public/sitemap.xml',
]

const BANNED = [
  /multi-agent/i,
  /multi agent/i,
  /agent orchestrator/i,
  /orchestration/i,
  /zero[- ]hallucination/i,
  /60%\s+of repetitive workflow/i,
]

function listInsightHtml() {
  const dir = new URL('../engineering-insights', import.meta.url)
  return readdirSync(dir)
    .filter((name) => name.endsWith('.html'))
    .map((name) => `engineering-insights/${name}`)
}

test('public routes contain no banned multi-agent or unverified triage copy', () => {
  const files = [...PUBLIC_GLOBS, ...listInsightHtml()]
  for (const rel of files) {
    const source = readFileSync(new URL(rel, ROOT), 'utf8')
    for (const pattern of BANNED) {
      assert.doesNotMatch(source, pattern, `${rel} matched ${pattern}`)
    }
    assert.doesNotMatch(source, /guarantee zero/i, `${rel} still uses guarantee wording`)
  }
})
