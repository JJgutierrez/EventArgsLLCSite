import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const css = () => readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')

test('style.css imports tailwind', () => {
  assert.match(css(), /@import\s+["']tailwindcss["']/)
})

test('required ea color tokens exist with locked values', () => {
  const source = css()
  const required = {
    'ea-bg': '#0B1220',
    'ea-surface': '#121A2B',
    'ea-border': '#243049',
    'ea-accent': '#2563eb',
    'ea-accent-hover': '#3B82F6',
    'ea-text': '#F1F5F9',
    'ea-muted': '#94A3B8',
  }
  for (const [name, value] of Object.entries(required)) {
    assert.match(
      source,
      new RegExp(`${name}[^\\n]*${value.replace('#', '#')}`, 'i'),
      `missing token ${name}=${value}`,
    )
  }
})

test('IBM Plex Sans is the font family', () => {
  assert.match(css(), /IBM Plex Sans/)
})
