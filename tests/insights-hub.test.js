import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { loadInsightArticles } from '../src/insights/catalog.js'

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')

const PAGES = {
  index: 'engineering-insights.html',
  sharepoint: 'engineering-insights/secure-sharepoint-rag-architecture.html',
  rag: 'engineering-insights/designing-citation-grounded-rag-microsoft-365.html',
  pilots: 'engineering-insights/why-enterprise-rag-pilots-fail.html',
  pr: 'engineering-insights/ai-assisted-pr-review-azure-devops.html',
  evaluation: 'engineering-insights/enterprise-rag-evaluation-microsoft-365.html',
}

test('insights index uses featured hero, 2-column grid, and nav target', () => {
  const source = read(PAGES.index)
  const layout = read('src/layout.js')
  assert.match(source, /class="insight-featured"/)
  assert.match(source, /class="insight-grid"/)
  assert.match(source, /Secure SharePoint RAG Architecture/)
  assert.match(source, /Enterprise RAG Evaluation for Microsoft 365/)
  assert.match(source, /Designing Citation-Grounded RAG for Microsoft 365/)
  assert.match(source, /Why Enterprise RAG Pilots Fail After the Demo/)
  assert.match(source, /AI-Assisted PR Review in Azure DevOps/)
  assert.match(layout, /engineering-insights\.html/)
  assert.match(layout, /data-link="insights"/)
  assert.match(read('vite.config.js'), /engineering-insights\.html/)
})

test('article pages include reading column, TOC hook, JSON-LD, and topic CTAs', () => {
  const sharepoint = read(PAGES.sharepoint)
  const rag = read(PAGES.rag)
  const pilots = read(PAGES.pilots)
  const pr = read(PAGES.pr)
  const evaluation = read(PAGES.evaluation)
  for (const page of [sharepoint, rag, pilots, pr, evaluation]) {
    assert.match(page, /class="insight-body"/)
    assert.match(page, /data-insight-toc/)
    assert.match(page, /"@type": "(BlogPosting|Article)"/)
    assert.match(page, /max-w-3xl|max-width: 48rem/)
  }
  assert.match(sharepoint, /\/services\/rag-knowledge-copilot-pilot/)
  assert.match(rag, /contact\.html\?topic=rag-architecture-review/)
  assert.match(pilots, /contact\.html\?topic=rag-architecture-review/)
  assert.match(pr, /contact\.html\?topic=pr-review-automation/)
  assert.match(evaluation, /contact\.html\?topic=rag-evaluation-sprint/)
  assert.match(pilots, /retrieval latency/i)
})

test('published HTML titles match catalog frontmatter', () => {
  const articles = loadInsightArticles()
  const htmlBySlug = {
    'secure-sharepoint-rag-architecture': read(PAGES.sharepoint),
    'designing-citation-grounded-rag-microsoft-365': read(PAGES.rag),
    'why-enterprise-rag-pilots-fail': read(PAGES.pilots),
    'ai-assisted-pr-review-azure-devops': read(PAGES.pr),
    'enterprise-rag-evaluation-microsoft-365': read(PAGES.evaluation),
  }
  for (const article of articles) {
    assert.ok(htmlBySlug[article.slug].includes(article.title))
    const ctaMarker = article.cta.href || article.cta.topic
    assert.ok(ctaMarker, `${article.slug} is missing a CTA marker`)
    assert.ok(htmlBySlug[article.slug].includes(ctaMarker))
  }
})

test('sitemap lists insights index and published articles', () => {
  const sitemap = read('public/sitemap.xml')
  assert.match(sitemap, /engineering-insights\.html/)
  assert.match(sitemap, /secure-sharepoint-rag-architecture\.html/)
  assert.match(sitemap, /designing-citation-grounded-rag-microsoft-365\.html/)
  assert.match(sitemap, /why-enterprise-rag-pilots-fail\.html/)
  assert.match(sitemap, /ai-assisted-pr-review-azure-devops\.html/)
  assert.match(sitemap, /enterprise-rag-evaluation-microsoft-365\.html/)
})
