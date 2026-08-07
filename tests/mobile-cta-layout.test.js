import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const css = () => readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')

test('mobile hero CTAs stack and use the available width', () => {
  const source = css()
  assert.match(
    source,
    /@media \(max-width: 576px\)\s*\{[\s\S]*?\.hero-ctas\s*\{\s*flex-direction:\s*column;/,
  )
  assert.match(
    source,
    /@media \(max-width: 576px\)\s*\{[\s\S]*?\.hero-ctas \.btn\s*\{\s*width:\s*100%;/,
  )
})
