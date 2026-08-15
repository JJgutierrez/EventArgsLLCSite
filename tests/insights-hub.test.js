import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { loadInsightArticles } from '../src/insights/catalog.js'

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')

const PAGES = {
  index: 'engineering-insights.html',
  rag: 'engineering-insights/designing-citation-grounded-rag-microsoft-365.html',
  pilots: 'engineering-insights/why-enterprise-rag-pilots-fail.html',
  pr: 'engineering-insights/ai-assisted-pr-review-azure-devops.html',
}

test('insights index uses featured hero, 2-column grid, and nav target', () => {
  const source = read(PAGES.index)
  const layout = read('src/layout.js')
  assert.match(source, /class="insight-featured"/)
  assert.match(source, /class="insight-grid"/)
  assert.match(source, /Designing Citation-Grounded RAG for Microsoft 365/)
  assert.match(source, /Why Enterprise RAG Pilots Fail After the Demo/)
  assert.match(source, /AI-Assisted PR Review in Azure DevOps/)
  assert.match(layout, /engineering-insights\.html/)
  assert.match(layout, /data-link="insights"/)
  assert.match(read('vite.config.js'), /engineering-insights\.html/)
})

test('article pages include reading column, TOC hook, JSON-LD, and topic CTAs', () => {
  const rag = read(PAGES.rag)
  const pilots = read(PAGES.pilots)
  const pr = read(PAGES.pr)
  for (const page of [rag, pilots, pr]) {
    assert.match(page, /class="insight-body"/)
    assert.match(page, /data-insight-toc/)
    assert.match(page, /"@type": "BlogPosting"/)
    assert.match(page, /max-w-3xl|max-width: 48rem/)
  }
  assert.match(rag, /contact\.html\?topic=rag-architecture-review/)
  assert.match(pilots, /contact\.html\?topic=rag-architecture-review/)
  assert.match(pr, /contact\.html\?topic=pr-review-automation/)
  assert.match(pilots, /retrieval latency/i)
})

test('published HTML titles match catalog frontmatter', () => {
  const articles = loadInsightArticles()
  const htmlBySlug = {
    'designing-citation-grounded-rag-microsoft-365': read(PAGES.rag),
    'why-enterprise-rag-pilots-fail': read(PAGES.pilots),
    'ai-assisted-pr-review-azure-devops': read(PAGES.pr),
  }
  for (const article of articles) {
    assert.ok(htmlBySlug[article.slug].includes(article.title))
    assert.ok(htmlBySlug[article.slug].includes(article.cta.topic))
  }
})

test('sitemap lists insights index and three articles', () => {
  const sitemap = read('public/sitemap.xml')
  assert.match(sitemap, /engineering-insights\.html/)
  assert.match(sitemap, /designing-citation-grounded-rag-microsoft-365\.html/)
  assert.match(sitemap, /why-enterprise-rag-pilots-fail\.html/)
  assert.match(sitemap, /ai-assisted-pr-review-azure-devops\.html/)
})
