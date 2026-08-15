import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')

test('layout.js includes Engineering Insights navigation and footer links', () => {
  const layout = read('src/layout.js')
  assert.match(layout, /Engineering Insights/)
  assert.match(layout, /href="\/engineering-insights\.html"/)
  assert.match(layout, /data-link="engineering-insights"/)
})

test('engineering-insights.html contains SEO metadata, hero, and launch article cards', () => {
  const hub = read('engineering-insights.html')
  assert.match(hub, /<title>Engineering Insights — Technical Architecture &amp; AI Playbooks \| EventArgs LLC<\/title>/)
  assert.match(hub, /rel="canonical" href="https:\/\/www\.eventargs\.llc\/engineering-insights\.html"/)
  assert.match(hub, /<h1>Engineering Insights<\/h1>|hero-title.*Engineering Insights/)
  assert.match(hub, /designing-citation-grounded-rag-microsoft-365\.html/)
  assert.match(hub, /why-enterprise-rag-pilots-fail\.html/)
  assert.match(hub, /ai-assisted-pr-review-azure-devops\.html/)
  assert.match(hub, /href="\/contact\.html\?topic=rag-architecture-review"/)
})

test('launch article 1 (M365 RAG) includes canonical URL, metadata, and CTA', () => {
  const article = read('engineering-insights/designing-citation-grounded-rag-microsoft-365.html')
  assert.match(article, /Designing Citation-Grounded RAG for Microsoft 365/)
  assert.match(article, /rel="canonical" href="https:\/\/www\.eventargs\.llc\/engineering-insights\/designing-citation-grounded-rag-microsoft-365\.html"/)
  assert.match(article, /Reciprocal Rank Fusion/)
  assert.match(article, /pgvector/)
  assert.match(article, /href="\/contact\.html\?topic=rag-architecture-review"/)
})

test('launch article 2 (RAG Failures) includes canonical URL, metadata, and CTA', () => {
  const article = read('engineering-insights/why-enterprise-rag-pilots-fail.html')
  assert.match(article, /Why Enterprise RAG Pilots Fail After the Demo/)
  assert.match(article, /rel="canonical" href="https:\/\/www\.eventargs\.llc\/engineering-insights\/why-enterprise-rag-pilots-fail\.html"/)
  assert.match(article, /Failure Mode #1/)
  assert.match(article, /href="\/contact\.html\?topic=rag-architecture-review"/)
})

test('launch article 3 (Azure DevOps PR Review) includes canonical URL, metadata, and CTA', () => {
  const article = read('engineering-insights/ai-assisted-pr-review-azure-devops.html')
  assert.match(article, /AI-Assisted PR Review in Azure DevOps/)
  assert.match(article, /rel="canonical" href="https:\/\/www\.eventargs\.llc\/engineering-insights\/ai-assisted-pr-review-azure-devops\.html"/)
  assert.match(article, /Model Context Protocol/)
  assert.match(article, /href="\/contact\.html\?topic=ai-workflow-devops"/)
})

test('vite.config.js registers Engineering Insights routes', () => {
  const viteConfig = read('vite.config.js')
  assert.match(viteConfig, /engineeringInsights: resolve\(__dirname, 'engineering-insights\.html'\)/)
  assert.match(viteConfig, /articleRagM365: resolve\(__dirname, 'engineering-insights\/designing-citation-grounded-rag-microsoft-365\.html'\)/)
  assert.match(viteConfig, /articleRagFailures: resolve\(__dirname, 'engineering-insights\/why-enterprise-rag-pilots-fail\.html'\)/)
  assert.match(viteConfig, /articlePrReview: resolve\(__dirname, 'engineering-insights\/ai-assisted-pr-review-azure-devops\.html'\)/)
})

test('public/sitemap.xml contains Engineering Insights URLs', () => {
  const sitemap = read('public/sitemap.xml')
  assert.match(sitemap, /https:\/\/www\.eventargs\.llc\/engineering-insights\.html/)
  assert.match(sitemap, /https:\/\/www\.eventargs\.llc\/engineering-insights\/designing-citation-grounded-rag-microsoft-365\.html/)
  assert.match(sitemap, /https:\/\/www\.eventargs\.llc\/engineering-insights\/why-enterprise-rag-pilots-fail\.html/)
  assert.match(sitemap, /https:\/\/www\.eventargs\.llc\/engineering-insights\/ai-assisted-pr-review-azure-devops\.html/)
})
