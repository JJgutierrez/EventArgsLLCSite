import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { loadInsightArticles } from '../src/insights/catalog.js'

const html = readFileSync(new URL('../engineering-insights/secure-sharepoint-rag-architecture.html', import.meta.url), 'utf8')

test('SharePoint RAG article uses Article and BreadcrumbList schema', () => {
  assert.match(html, /"@type": "Article"/)
  assert.match(html, /"@type": "BreadcrumbList"/)
  assert.match(html, /Juan J\. Gutierrez/)
  assert.match(html, /2026-08-18/)
})

test('SharePoint RAG article has one primary pilot CTA', () => {
  const matches = html.match(/Scope a 4-week RAG Knowledge Copilot Pilot/g) || []
  assert.equal(matches.length, 1)
  assert.match(html, /href="\/services\/rag-knowledge-copilot-pilot"/)
  assert.doesNotMatch(html, /contact\.html\?topic=/)
})

test('SharePoint RAG article keeps documented Microsoft claims qualified', () => {
  assert.match(html, /deleted<\/code> facet/)
  assert.match(html, /Retry-After/)
  assert.match(html, /HTTP 410 Gone/)
  assert.match(html, /learn\.microsoft\.com\/en-us\/graph\/api\/driveitem-delta/)
  assert.match(html, /learn\.microsoft\.com\/en-us\/entra\/identity-platform\/v2-oauth2-on-behalf-of-flow/)
  assert.match(html, /learn\.microsoft\.com\/en-us\/azure\/search\/hybrid-search-ranking/)
  assert.doesNotMatch(html, /<15 ms|zero hallucinations|guaranteed accuracy/i)
})

test('catalog featured article is the SharePoint RAG field guide', () => {
  const articles = loadInsightArticles()
  const featured = articles.find((article) => article.featured)
  assert.equal(featured.slug, 'secure-sharepoint-rag-architecture')
  assert.equal(featured.cta.href, '/services/rag-knowledge-copilot-pilot')
  assert.equal(articles.length, 4)
})
