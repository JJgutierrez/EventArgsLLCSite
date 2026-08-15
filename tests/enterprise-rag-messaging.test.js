import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')

const TITLE = 'Enterprise RAG Knowledge Copilot (Backend Architecture)'
const SUBTITLE =
  'Production-grade retrieval-augmented generation pipeline with hybrid search, strict source grounding, and enterprise guardrails.'
const OVERVIEW =
  'For engineering and operations teams struggling with documentation sprawl across SharePoint, Confluence, and internal repositories, we engineer production-ready RAG systems. This solution implements a robust FastAPI and PostgreSQL/pgvector backend featuring Reciprocal Rank Fusion (RRF), semantic query routing, JWT/RBAC security, prompt-injection guardrails, and an automated LLM-judge evaluation workflow via LangSmith to enforce strict citation-grounded source verifiability.'

const PAGES = [
  'index.html',
  'case-studies.html',
  'case-study-knowledge-copilot.html',
]

test('case-studies listing uses canonical title, subtitle, overview, and section id', () => {
  const source = read('case-studies.html')
  assert.match(source, /id="enterprise-rag-knowledge-copilot"/)
  assert.ok(source.includes(TITLE))
  assert.ok(source.includes(SUBTITLE))
  assert.ok(source.includes(OVERVIEW))
  assert.ok(source.includes('FastAPI, PostgreSQL/pgvector, LangChain, LangSmith (LLM-judge eval), Python, JWT/RBAC.'))
  assert.ok(source.includes('Reciprocal Rank Fusion (RRF)'))
  assert.doesNotMatch(source, /id="legacy-knowledge-copilot"/)
})

test('homepage outcome banner and featured row use Enterprise RAG naming', () => {
  const source = read('index.html')
  assert.match(source, /Enterprise RAG Knowledge Copilot/)
  assert.ok(source.includes(TITLE))
  assert.match(source, /75%/)
  assert.match(source, /href="\/case-study-knowledge-copilot\.html"/)
})

test('flagship case study hero, stack story, and SVG labels are updated', () => {
  const source = read('case-study-knowledge-copilot.html')
  assert.ok(source.includes(TITLE))
  assert.ok(source.includes(SUBTITLE))
  assert.match(source, /PostgreSQL\/pgvector/)
  assert.match(source, /Reciprocal Rank Fusion|RRF/)
  assert.match(source, /LangSmith/)
  assert.match(source, /JWT\/RBAC/)
  assert.match(source, /SharePoint \/ Confluence \/ Repos/)
  assert.match(source, /Ingest Worker \(layout-aware parsing\)/)
  assert.match(source, /Embeddings \+ Chunk Metadata/)
  assert.match(source, /PostgreSQL\/pgvector Index/)
  assert.match(source, /User Query via Client \/ API/)
  assert.match(source, /FastAPI Gateway \(JWT\/RBAC\)/)
  assert.match(source, /Query Router \+ Guardrails \+ Prompt Compiler/)
  assert.match(source, /LLM Generation \(citation-bound\)/)
})

test('in-scope pages no longer use Legacy Knowledge Copilot / Retrieval labels', () => {
  for (const page of PAGES) {
    const source = read(page)
    assert.doesNotMatch(source, /Legacy Knowledge Copilot/)
    assert.doesNotMatch(source, /Legacy Knowledge Retrieval/)
  }
})

test('site surfaces do not present Azure AI Search as retrieval core', () => {
  for (const page of [
    'index.html',
    'services.html',
    'about.html',
    'case-studies.html',
    'case-study-knowledge-copilot.html',
  ]) {
    assert.doesNotMatch(read(page), /Azure AI Search/)
  }
})

test('homepage and services align on FastAPI / PostgreSQL/pgvector RAG story', () => {
  const home = read('index.html')
  const services = read('services.html')
  assert.match(home, /FastAPI/)
  assert.match(home, /PostgreSQL\/pgvector|pgvector/)
  assert.match(services, /FastAPI/)
  assert.match(services, /PostgreSQL\/pgvector|pgvector/)
  assert.match(read('about.html'), /PostgreSQL\/pgvector|pgvector/)
})

test('primary offer is named Enterprise RAG Knowledge Copilot Pilot', () => {
  const offer = 'Enterprise RAG Knowledge Copilot Pilot'
  assert.ok(read('services.html').includes(offer))
  assert.ok(read('index.html').includes(offer))
  assert.ok(read('contact.html').includes(offer))
  assert.doesNotMatch(read('services.html'), /Internal Knowledge Copilot Pilot/)
  assert.doesNotMatch(read('index.html'), /Internal Knowledge Copilot Pilot/)
  assert.doesNotMatch(read('contact.html'), /Internal Knowledge Copilot Pilot/)
})

test('footer services link uses Enterprise RAG Copilots label', () => {
  const layout = read('src/layout.js')
  assert.match(layout, /Enterprise RAG Copilots/)
  assert.doesNotMatch(layout, />Knowledge Copilots</)
})
