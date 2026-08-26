import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')

const H1_HTML =
  'Enterprise RAG Pilots, AI Governance &amp; PR Automation for Microsoft &amp; Azure Teams.'
const SEO_TITLE_HTML =
  'Enterprise RAG Pilots, AI Governance &amp; PR Automation for Microsoft &amp; Azure Teams | EventArgs LLC'
const META_DESC =
  'Fixed-scope delivery of citation-grounded internal copilots, AI usage and cost guardrails, and GitHub/Azure DevOps pull-request review workflows—senior-led and production-ready.'
const LEAD_HTML =
  'Fixed-scope delivery of citation-grounded internal copilots, AI usage and cost guardrails, and GitHub/Azure DevOps pull-request review workflows—senior-led and production-ready.'
const OFFER1 = 'Enterprise RAG Knowledge Copilot Pilot'
const OFFER3_HTML = 'AI DevOps &amp; PR Review Automation'
const CASE_TITLE = 'Custom Engineering Workflow Automation'
const BACKEND_NOTE_HTML = 'Pure-Play Backend &amp; Systems Engineering'

test('homepage hero H1 and SEO use locked RAG-inclusive headline', () => {
  const source = read('index.html')
  assert.ok(source.includes(`<h1>${H1_HTML}</h1>`))
  assert.ok(source.includes(`<p class="lead">${LEAD_HTML}</p>`))
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
  assert.match(source, /Enterprise RAG Pilots, AI Governance/)
  assert.doesNotMatch(source, /Secure Internal RAG AI Copilots/)
  assert.doesNotMatch(source, /<h1>Enterprise AI Engineering for Microsoft Ecosystems\.<\/h1>/)
})

test('homepage offers keep Offer 1 name and rename Offer 3', () => {
  const source = read('index.html')
  assert.ok(source.includes(OFFER1))
  assert.ok(source.includes(OFFER3_HTML) || source.includes('AI DevOps & PR Review Automation'))
  assert.ok(source.includes('traceable source citations'))
  assert.ok(source.includes('SharePoint and Azure file sync'))
  assert.ok(source.includes('Citation-first retrieval and answer grounding'))
  assert.ok(source.includes('4-week production-ready pilot rollout'))
  assert.ok(source.includes('Access control boundaries'))
  assert.ok(source.includes('Custom model context protocol (MCP) tooling'))
  assert.ok(source.includes('3-week custom workflow integration'))
  assert.doesNotMatch(source, /AI Workflow &amp; DevOps Automation|AI Workflow & DevOps Automation/)
  assert.doesNotMatch(source, /Internal Knowledge Copilot Pilot/)
})

test('homepage Delivery Commitments include pure-play backend note', () => {
  const source = read('index.html')
  assert.ok(source.includes(BACKEND_NOTE_HTML) || source.includes('Pure-Play Backend & Systems Engineering'))
  assert.ok(source.includes('We do not build front-end web interfaces'))
})

test('homepage and case-studies keep custom engineering workflow without multi-agent claims', () => {
  const home = read('index.html')
  const listing = read('case-studies.html')
  assert.ok(home.includes(CASE_TITLE))
  assert.ok(listing.includes(CASE_TITLE))
  assert.match(listing, /id="custom-engineering-workflow-automation"/)
  assert.match(home, /href="\/case-studies#custom-engineering-workflow-automation"/)
  assert.ok(home.includes('60%'))
  assert.ok(home.includes('Reduction in repetitive triage'))
  assert.ok(home.includes('75%'))
  assert.doesNotMatch(listing, /60%/)
  assert.doesNotMatch(home, /multi-agent|Multi-Agent Engineering Orchestrator/i)
  assert.doesNotMatch(listing, /multi-agent|Multi-Agent Engineering Orchestrator/i)
  assert.doesNotMatch(listing, /id="multi-agent-orchestrator"/)
})

test('services, contact, and footer cascade Offer 3 rename', () => {
  const services = read('services.html')
  const contact = read('contact.html')
  const layout = read('src/layout.js')
  assert.ok(services.includes(OFFER3_HTML) || services.includes('AI DevOps & PR Review Automation'))
  assert.ok(
    contact.includes('AI DevOps &amp; PR Review Automation (3 Weeks)') ||
      contact.includes('AI DevOps & PR Review Automation (3 Weeks)'),
  )
  assert.match(contact, /value="devops"/)
  assert.match(layout, /AI DevOps &amp; PR Review/)
  assert.doesNotMatch(services, /AI Workflow &amp; DevOps Automation/)
  assert.doesNotMatch(contact, /AI Workflow &amp; DevOps Automation/)
  assert.doesNotMatch(layout, /AI Workflow &amp; DevOps/)
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
    assert.match(desc, /AI DevOps/i)
    assert.doesNotMatch(desc, /AI workflow &amp; DevOps automation/i)
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
