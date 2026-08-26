import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { loadInsightArticles } from '../src/insights/catalog.js'

const html = readFileSync(new URL('../engineering-insights/secure-sharepoint-rag-architecture.html', import.meta.url), 'utf8')

test('SharePoint RAG article uses TechArticle schema', () => {
  assert.match(html, /"@type": "TechArticle"/)
  assert.match(html, /2026-08-18/)
})

test('SharePoint RAG article has primary pilot CTA', () => {
  assert.match(html, /href="\/contact\?topic=rag-architecture-review"/)
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

test('catalog featured article is the Enterprise RAG Evaluation guide', () => {
  const articles = loadInsightArticles()
  const featured = articles.find((article) => article.featured)
  assert.equal(featured.slug, 'enterprise-rag-evaluation-microsoft-365')
  assert.equal(featured.cta.topic, 'rag-evaluation-sprint')
  assert.equal(articles.length, 5)
})
