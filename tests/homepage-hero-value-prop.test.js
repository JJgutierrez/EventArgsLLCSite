import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')

const H1_HTML =
  'Secure Internal RAG AI Copilots &amp; Backend Architecture for Microsoft &amp; Azure Teams.'
const SEO_TITLE_HTML =
  'Secure Internal RAG AI Copilots &amp; Backend Architecture for Microsoft &amp; Azure Teams | EventArgs LLC'
const META_DESC =
  'EventArgs LLC helps Microsoft 365- and Azure-heavy teams design secure, source-grounded RAG AI copilots, backend architecture, governance workflows, and engineering automation engagements.'
const OFFER1 = 'Enterprise RAG Knowledge Copilot Pilot'
const OFFER3_HTML = 'AI Workflow &amp; DevOps Automation'
const CASE_TITLE = 'Custom Engineering Workflow Automation'
const BACKEND_NOTE_HTML = 'Pure-Play Backend &amp; Systems Engineering'

test('homepage hero H1 and SEO use locked RAG-inclusive headline', () => {
  const source = read('index.html')
  assert.ok(source.includes(`<h1>${H1_HTML}</h1>`))
  assert.ok(source.includes(`<title>${SEO_TITLE_HTML}</title>`))
  assert.ok(source.includes(META_DESC))
  assert.ok(source.includes(`property="og:title" content="${SEO_TITLE_HTML}"`))
  assert.match(
    source,
    new RegExp(
      `property="og:description"[\\s\\S]*?content="${META_DESC.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
    ),
  )
  assert.match(
    source,
    new RegExp(
      `name="twitter:title"[\\s\\S]*?content="${SEO_TITLE_HTML.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
    ),
  )
  assert.match(
    source,
    new RegExp(
      `name="twitter:description"[\\s\\S]*?content="${META_DESC.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
    ),
  )
  assert.match(source, /Secure Internal RAG AI Copilots/)
  assert.doesNotMatch(source, /<h1>Enterprise AI Engineering for Microsoft Ecosystems\.<\/h1>/)
})

test('homepage offers keep Offer 1 name and rename Offer 3', () => {
  const source = read('index.html')
  assert.ok(source.includes(OFFER1))
  assert.ok(source.includes(OFFER3_HTML) || source.includes('AI Workflow & DevOps Automation'))
  assert.ok(source.includes('traceable source citations'))
  assert.ok(source.includes('SharePoint and Azure file sync'))
  assert.ok(source.includes('Citation-first retrieval and answer grounding'))
  assert.ok(source.includes('4-week production-ready pilot rollout'))
  assert.ok(source.includes('Access control boundaries'))
  assert.ok(source.includes('Custom model context protocol (MCP) tooling'))
  assert.ok(source.includes('3-week custom workflow integration'))
  assert.doesNotMatch(source, /AI DevOps &amp; PR Review Automation|AI DevOps & PR Review Automation/)
  assert.doesNotMatch(source, /Internal Knowledge Copilot Pilot/)
})

test('homepage Delivery Commitments include pure-play backend note', () => {
  const source = read('index.html')
  assert.ok(source.includes(BACKEND_NOTE_HTML) || source.includes('Pure-Play Backend & Systems Engineering'))
  assert.ok(source.includes('We do not build front-end web interfaces'))
})

test('homepage and case-studies reframe multi-agent as custom engineering workflow', () => {
  const home = read('index.html')
  const listing = read('case-studies.html')
  assert.ok(home.includes(CASE_TITLE))
  assert.ok(listing.includes(CASE_TITLE))
  assert.match(listing, /id="custom-engineering-workflow-automation"/)
  assert.match(home, /href="\/case-studies\.html#custom-engineering-workflow-automation"/)
  assert.doesNotMatch(home, /60%/)
  assert.doesNotMatch(listing, /60%/)
  assert.doesNotMatch(home, /Multi-Agent Engineering Orchestrator/)
  assert.doesNotMatch(listing, /Multi-Agent Engineering Orchestrator/)
  assert.doesNotMatch(listing, /id="multi-agent-orchestrator"/)
})

test('services, contact, and footer cascade Offer 3 rename', () => {
  const services = read('services.html')
  const contact = read('contact.html')
  const layout = read('src/layout.js')
  assert.ok(services.includes(OFFER3_HTML) || services.includes('AI Workflow & DevOps Automation'))
  assert.ok(
    contact.includes('AI Workflow &amp; DevOps Automation (3 Weeks)') ||
      contact.includes('AI Workflow & DevOps Automation (3 Weeks)'),
  )
  assert.match(contact, /value="devops"/)
  assert.match(layout, /AI Workflow &amp; DevOps/)
  assert.doesNotMatch(services, /AI DevOps &amp; PR Review Automation/)
  assert.doesNotMatch(contact, /AI DevOps &amp; PR Review Automation/)
  assert.doesNotMatch(layout, />AI DevOps</)
})

test('services page meta descriptions use AI workflow DevOps framing', () => {
  const source = read('services.html')
  const descriptions = [
    source.match(/name="description"\s*\n?\s*content="([^"]*)"/)?.[1],
    source.match(/property="og:description"\s*\n?\s*content="([^"]*)"/)?.[1],
    source.match(/name="twitter:description"\s*\n?\s*content="([^"]*)"/)?.[1],
  ]
  for (const desc of descriptions) {
    assert.ok(desc, 'expected meta description')
    assert.match(desc, /AI workflow/i)
    assert.doesNotMatch(desc, /AI DevOps automation/)
  }
})

test('about page reinforces pure-play backend boundary', () => {
  const source = read('about.html')
  assert.match(source, /do not build front-end web interfaces/i)
  assert.ok(source.includes('Standalone front-end design'))
})

test('Offer 1 commercial name remains Enterprise RAG Knowledge Copilot Pilot', () => {
  for (const page of ['index.html', 'services.html', 'contact.html']) {
    assert.ok(read(page).includes(OFFER1))
    assert.doesNotMatch(read(page), /Internal Knowledge Copilot Pilot/)
  }
})
