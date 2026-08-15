import test from 'node:test'
import assert from 'node:assert/strict'
import { parseFrontmatter } from '../src/insights/frontmatter.js'
import { getFeaturedArticle, loadInsightArticles } from '../src/insights/catalog.js'

const SAMPLE = `---
title: "Designing Citation-Grounded RAG for Microsoft 365"
slug: "designing-citation-grounded-rag-microsoft-365"
description: "Enterprise permissions, hybrid search, and evaluation gates in Azure environments."
date: "2026-08-15"
updated: "2026-08-15"
topics: ["RAG", "Microsoft 365", "Azure"]
readingTime: "9 min read"
featured: true
cta:
  label: "Request a RAG Architecture Review"
  topic: "rag-architecture-review"
---

Body paragraph.
`

test('parseFrontmatter reads scalars, arrays, and nested cta', () => {
  const { data, content } = parseFrontmatter(SAMPLE)
  assert.equal(data.title, 'Designing Citation-Grounded RAG for Microsoft 365')
  assert.equal(data.slug, 'designing-citation-grounded-rag-microsoft-365')
  assert.deepEqual(data.topics, ['RAG', 'Microsoft 365', 'Azure'])
  assert.equal(data.featured, true)
  assert.equal(data.cta.label, 'Request a RAG Architecture Review')
  assert.equal(data.cta.topic, 'rag-architecture-review')
  assert.equal(content.trim(), 'Body paragraph.')
})

test('catalog loads three P0 articles with featured RAG note', () => {
  const articles = loadInsightArticles()
  assert.equal(articles.length, 3)
  const slugs = articles.map((article) => article.slug).sort()
  assert.deepEqual(slugs, [
    'ai-assisted-pr-review-azure-devops',
    'designing-citation-grounded-rag-microsoft-365',
    'why-enterprise-rag-pilots-fail',
  ])
  const featured = getFeaturedArticle(articles)
  assert.equal(featured.slug, 'designing-citation-grounded-rag-microsoft-365')
  assert.equal(featured.cta.topic, 'rag-architecture-review')
})
