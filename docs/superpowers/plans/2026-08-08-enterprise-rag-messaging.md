# Enterprise RAG Messaging Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite Legacy Knowledge Copilot messaging across the homepage, case-studies listing, and flagship case-study page so every in-scope surface tells one FastAPI / PostgreSQL/pgvector / RRF / JWT-RBAC / LangSmith story while preserving 45-minute → 75% and 100% citation outcomes.

**Architecture:** Static multi-page Vite HTML. No layout/CSS redesign. Add a Node contract test that locks canonical strings and forbids legacy names, then update copy and SVG text nodes on three HTML pages to match `docs/superpowers/specs/2026-08-08-enterprise-rag-messaging-design.md`.

**Tech Stack:** Vite 8, vanilla HTML/CSS/JS, Node built-in test runner (`node --test`). No React.

## Global Constraints

- Spec source of truth: `docs/superpowers/specs/2026-08-08-enterprise-rag-messaging-design.md`
- Canonical title (exact): `Enterprise RAG Knowledge Copilot (Backend Architecture)`
- Canonical subtitle (exact): `Production-grade retrieval-augmented generation pipeline with hybrid search, strict source grounding, and enterprise guardrails.`
- Retrieval core: PostgreSQL/pgvector hybrid search + RRF — not Azure AI Search
- Preserve outcomes: 45-minute lookup pain → 75% reduction; 100% citation coverage
- Keep URL/filename: `case-study-knowledge-copilot.html`
- Do not rename commercial offer: `Internal Knowledge Copilot Pilot`
- No layout/CSS redesign — copy and SVG labels only
- Out of scope: `services.html` offer naming, `contact.html` options, `about.html`, sitemap rename

---

## File structure (locked)

| File | Responsibility |
|---|---|
| `tests/enterprise-rag-messaging.test.js` | Contract: new title/stack present; legacy names absent on three pages |
| `case-studies.html` | Listing narrative + Technical Profile + section id |
| `index.html` | Outcome banner + featured case row |
| `case-study-knowledge-copilot.html` | Hero, SEO meta, body sections, SVG labels, CTA |

---

### Task 1: Messaging contract test

**Files:**
- Create: `tests/enterprise-rag-messaging.test.js`
- Test: `tests/enterprise-rag-messaging.test.js`

**Interfaces:**
- Consumes: none
- Produces: failing contract tests that Task 2–4 must satisfy

- [ ] **Step 1: Write the failing contract test**

Create `tests/enterprise-rag-messaging.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const read = (rel) => readFileSync(new URL(`../${rel}`, import.meta.url), 'utf8')

const TITLE = 'Enterprise RAG Knowledge Copilot (Backend Architecture)'
const SUBTITLE =
  'Production-grade retrieval-augmented generation pipeline with hybrid search, strict source grounding, and enterprise guardrails.'
const OVERVIEW =
  'For engineering and operations teams struggling with documentation sprawl across SharePoint, Confluence, and internal repositories, we engineer production-ready RAG systems. This solution implements a robust FastAPI and PostgreSQL/pgvector backend featuring Reciprocal Rank Fusion (RRF), semantic query routing, JWT/RBAC security, prompt-injection guardrails, and an automated LLM-judge evaluation workflow via LangSmith to guarantee zero-hallucination source citation.'

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

test('in-scope case study surfaces do not present Azure AI Search as retrieval core', () => {
  const listing = read('case-studies.html')
  const detail = read('case-study-knowledge-copilot.html')
  assert.doesNotMatch(listing, /Azure AI Search/)
  assert.doesNotMatch(detail, /Azure AI Search/)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/enterprise-rag-messaging.test.js`

Expected: FAIL — missing canonical title/section id; legacy strings still present.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/enterprise-rag-messaging.test.js
git commit -m "$(cat <<'EOF'
test: add Enterprise RAG messaging contract.

Locks canonical title, stack story, and legacy-name absence before copy updates.
EOF
)"
```

---

### Task 2: Update `case-studies.html` listing + Technical Profile

**Files:**
- Modify: `case-studies.html:41-75`
- Test: `tests/enterprise-rag-messaging.test.js`

**Interfaces:**
- Consumes: canonical strings from Task 1 / spec §4
- Produces: listing section that satisfies listing + Technical Profile assertions

- [ ] **Step 1: Replace the first case-study section narrative and profile**

In `case-studies.html`, replace the Case Study 1 section content from the opening `<section id="legacy-knowledge-copilot"...>` through its closing `</section>` with:

```html
      <!-- Case Study 1 -->
      <section id="enterprise-rag-knowledge-copilot" class="section" style="border-top: 1px solid var(--border); background-color: var(--bg-card);">
        <div class="container">
          <div class="grid grid-2" style="gap: 4rem;">
            <div class="case-study-narrative">
              <span class="card-tag">Case Study</span>
              <h2 style="margin-bottom: 1rem;">Enterprise RAG Knowledge Copilot (Backend Architecture)</h2>
              <p style="font-size: 1.05rem; font-weight: 500; color: var(--text-primary);">Production-grade retrieval-augmented generation pipeline with hybrid search, strict source grounding, and enterprise guardrails.</p>
              <p>For engineering and operations teams struggling with documentation sprawl across SharePoint, Confluence, and internal repositories, we engineer production-ready RAG systems. This solution implements a robust FastAPI and PostgreSQL/pgvector backend featuring Reciprocal Rank Fusion (RRF), semantic query routing, JWT/RBAC security, prompt-injection guardrails, and an automated LLM-judge evaluation workflow via LangSmith to guarantee zero-hallucination source citation.</p>
              
              <div class="hero-ctas" style="justify-content: flex-start; margin-top: 2rem;">
                <a href="/case-study-knowledge-copilot.html" class="btn btn-primary">Read Flagship Case Study &rarr;</a>
              </div>
            </div>
            <div class="spec-grid" style="background-color: var(--bg-secondary);">
              <h3 style="margin-bottom: 1.25rem;">Technical Profile</h3>
              <ul class="spec-list" style="gap: 1.25rem;">
                <li>
                  <strong>Client Environment:</strong> Engineering and operations teams with documentation across SharePoint, Confluence, and internal repositories.
                </li>
                <li>
                  <strong>Business Problem:</strong> Staff lost an average of 45 minutes finding accurate procedures during outages due to documentation sprawl.
                </li>
                <li>
                  <strong>Constraints &amp; Governance:</strong> JWT/RBAC access control, prompt-injection guardrails, and zero hallucination tolerance with 100% citation coverage.
                </li>
                <li>
                  <strong>Solution Architecture:</strong> FastAPI retrieval service with hybrid vector + keyword search, Reciprocal Rank Fusion (RRF), and semantic query routing.
                </li>
                <li>
                  <strong>Quantified Outcome:</strong> 75% reduction in internal lookup times with verified inline citations.
                </li>
                <li>
                  <strong>Technical Stack:</strong> FastAPI, PostgreSQL/pgvector, LangChain, LangSmith (LLM-judge eval), Python, JWT/RBAC.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Run messaging tests**

Run: `npm test -- tests/enterprise-rag-messaging.test.js`

Expected: listing-related tests closer to green; homepage/flagship tests still FAIL.

- [ ] **Step 3: Commit**

```bash
git add case-studies.html
git commit -m "$(cat <<'EOF'
content: rewrite case-studies Enterprise RAG listing.

Aligns flagship listing narrative and Technical Profile with FastAPI/pgvector canon.
EOF
)"
```

---

### Task 3: Update homepage outcome banner + featured case row

**Files:**
- Modify: `index.html:81-90`
- Modify: `index.html:396-405`
- Test: `tests/enterprise-rag-messaging.test.js`

**Interfaces:**
- Consumes: canonical title; homepage short-form rules from spec §4.5
- Produces: homepage surfaces free of Legacy naming

- [ ] **Step 1: Replace outcome banner text**

Replace the outcome banner paragraph block with:

```html
        <p class="outcome-text">
          <strong>Enterprise RAG Knowledge Copilot:</strong> Built a source-grounded FastAPI and
          PostgreSQL/pgvector retrieval pipeline for technical documentation, reducing developer
          search lookup friction by 75%. <a href="/case-study-knowledge-copilot.html"
            class="outcome-link">View Case Study &rarr;</a>
        </p>
```

- [ ] **Step 2: Replace featured case row**

Replace the first `.case-row` (Legacy Knowledge Copilot) with:

```html
          <div class="case-row">
            <div class="case-row-meta">
              <span class="card-tag">Case Study</span>
              <h3>Enterprise RAG Knowledge Copilot (Backend Architecture)</h3>
            </div>
            <p class="case-row-desc">Documentation sprawl across SharePoint, Confluence, and internal repositories slowed engineering lookups. We built a production FastAPI and PostgreSQL/pgvector RAG pipeline with hybrid search, Reciprocal Rank Fusion, and strict source citations. Lookup times dropped 75% with verified inline citations.</p>
            <a href="/case-study-knowledge-copilot.html" class="case-row-link">
              Read Case Study &rarr;
            </a>
          </div>
```

- [ ] **Step 3: Run messaging tests**

Run: `npm test -- tests/enterprise-rag-messaging.test.js`

Expected: homepage assertions PASS; flagship assertions still FAIL.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
content: align homepage with Enterprise RAG case study.

Updates outcome banner and featured case row to the FastAPI/pgvector narrative.
EOF
)"
```

---

### Task 4: Rewrite flagship case-study page (hero, SEO, body, SVG, CTA)

**Files:**
- Modify: `case-study-knowledge-copilot.html` (full in-scope copy + SVG labels)
- Test: `tests/enterprise-rag-messaging.test.js`

**Interfaces:**
- Consumes: SVG label map from spec §6; body guidance from spec §5.3
- Produces: flagship page satisfying remaining contract assertions

- [ ] **Step 1: Update SEO / Open Graph / Twitter head tags**

Replace the Primary SEO + OG + Twitter block in `<head>` with:

```html
    <!-- Primary SEO -->
    <title>Enterprise RAG Knowledge Copilot — Backend Architecture Case Study | EventArgs LLC</title>
    <meta name="description" content="How EventArgs LLC engineered a FastAPI and PostgreSQL/pgvector RAG pipeline with hybrid search, RRF, JWT/RBAC guardrails, and LangSmith evaluation — cutting documentation lookup time by 75%." />
    <link rel="canonical" href="https://www.eventargs.llc/case-study-knowledge-copilot.html" />

    <!-- Open Graph -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://www.eventargs.llc/case-study-knowledge-copilot.html" />
    <meta property="og:title" content="Enterprise RAG Knowledge Copilot — Backend Architecture Case Study | EventArgs LLC" />
    <meta property="og:description" content="How EventArgs LLC engineered a FastAPI and PostgreSQL/pgvector RAG pipeline with hybrid search, RRF, JWT/RBAC guardrails, and LangSmith evaluation — cutting documentation lookup time by 75%." />
    <meta property="og:image" content="https://www.eventargs.llc/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="EventArgs LLC" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Enterprise RAG Knowledge Copilot — Backend Architecture Case Study | EventArgs LLC" />
    <meta name="twitter:description" content="How EventArgs LLC engineered a FastAPI and PostgreSQL/pgvector RAG pipeline with hybrid search, RRF, JWT/RBAC guardrails, and LangSmith evaluation — cutting documentation lookup time by 75%." />
    <meta name="twitter:image" content="https://www.eventargs.llc/og-image.png" />
```

- [ ] **Step 2: Update hero meta, title, and subtitle**

Replace the hero meta + heading block with:

```html
          <div class="case-study-meta">
            <span class="offer-badge" style="margin-bottom: 0;">Case Study</span>
            <span>&bull;</span>
            <span>4-Week Delivery</span>
            <span>&bull;</span>
            <span>Enterprise RAG / Backend</span>
          </div>
          <h1 style="font-size: clamp(2rem, 5vw, 3rem); line-height: 1.2; margin-top: 1rem; margin-bottom: 0.75rem;">Enterprise RAG Knowledge Copilot (Backend Architecture)</h1>
          <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 0; line-height: 1.6; max-width: 750px;">Production-grade retrieval-augmented generation pipeline with hybrid search, strict source grounding, and enterprise guardrails.</p>
```

- [ ] **Step 3: Update Situation, Constraints, Approach sections**

Replace those three sections with:

```html
        <!-- Situation -->
        <section class="case-study-section">
          <h2>The Situation</h2>
          <p>For engineering and operations teams, critical knowledge is rarely located in a single, well-structured directory. In this engagement, operational guidelines, server modernization runbooks, and software API documentation were scattered across SharePoint sites, a Confluence instance, and internal repositories.</p>
          <p>As a result, engineers spent an average of 45 minutes finding accurate technical procedures during active systems outages. In addition, onboarding new technical staff took up to six weeks because of knowledge discovery friction.</p>
        </section>

        <!-- Constraints -->
        <section class="case-study-section">
          <h2>The Constraints</h2>
          <p>Security and platform owners established non-negotiable boundaries before any code was written:</p>
          <ul>
            <li><strong>JWT/RBAC Access Control:</strong> Every query path authenticated and authorized so users could only retrieve documentation they were permitted to see.</li>
            <li><strong>Prompt-Injection Guardrails:</strong> Untrusted user input could not override system instructions, exfiltrate secrets, or bypass retrieval policy.</li>
            <li><strong>Zero-Hallucination Guardrails:</strong> The system must only respond using verified retrieved source text. If a query could not be answered from document chunks, it had to state <em>"I do not know based on the available documentation."</em></li>
            <li><strong>100% Citation Coverage:</strong> Every factual claim required an inline source citation before the answer could reach the user.</li>
          </ul>
        </section>

        <!-- Approach -->
        <section class="case-study-section">
          <h2>The Approach</h2>
          <p>We deployed a layout-aware ingestion path in Python that preserves heading hierarchy, tables, and code blocks as structured chunk metadata — avoiding brittle character-count splits that destroy retrieval quality.</p>
          <p>For retrieval, we built a FastAPI service backed by PostgreSQL/pgvector hybrid vector and keyword search, fused with Reciprocal Rank Fusion (RRF) and semantic query routing. Generation was citation-bound, with prompt-injection defenses at the gateway. An automated LangSmith LLM-judge evaluation workflow scored answer faithfulness and citation coverage so regressions could not ship unnoticed.</p>
        </section>
```

- [ ] **Step 4: Update Architecture prose + SVG labels**

Replace the Architecture intro paragraph with:

```html
          <h2>Architecture & Technical Design</h2>
          <p>Below is the system architecture showing how documents are ingested into PostgreSQL/pgvector and how authenticated queries flow through FastAPI retrieval, guardrails, citation-bound generation, and LangSmith LLM-judge evaluation.</p>
```

Update SVG text nodes only (keep geometry):

| Find (exact text content) | Replace with |
|---|---|
| `SharePoint / Azure Files` | `SharePoint / Confluence / Repos` |
| `Azure Functions (Python Layout Parsing)` | `Ingest Worker (layout-aware parsing)` |
| `Semantic Embeddings (text-embedding-3-large)` | `Embeddings + Chunk Metadata` |
| `Azure AI Search Index` | `PostgreSQL/pgvector Index` |
| `Vector & Keyword Search (Tenant Bound)` | `Hybrid Vector + Keyword (RRF)` |
| `User Query via Web UI` | `User Query via Client / API` |
| `FastAPI Gateway (Azure AD Auth Check)` | `FastAPI Gateway (JWT/RBAC)` |
| `Prompt Compiler (Strict Citation Rules)` | `Query Router + Guardrails + Prompt Compiler` |
| `Azure OpenAI GPT-4o` | `LLM Generation (citation-bound)` |
| `Isolated LLM instance - Zero training exposure` | `Citation-bound answers + LangSmith eval` |

Replace the Architecture closing paragraph with:

```html
          <p>This layout keeps retrieval and generation behind JWT/RBAC controls, fuses hybrid candidates with RRF, and uses LangSmith LLM-judge evaluation to verify citation coverage, faithfulness, and regression risk before changes reach production.</p>
```

- [ ] **Step 5: Update Results and CTA**

Replace Results + final CTA section with:

```html
        <!-- Results -->
        <section class="case-study-section">
          <h2>The Results</h2>
          <ul>
            <li><strong>75% Retrieval Speed Increase:</strong> Average information discovery times fell from 45 minutes to under 10 seconds.</li>
            <li><strong>100% Citation Coverage:</strong> Response filters intercept answers lacking clear source links, preventing hallucinated output from reaching the team.</li>
            <li><strong>Controlled Access Boundary:</strong> Queries, embeddings, and chat histories remain inside the approved deployment boundary with JWT/RBAC enforcement on every request.</li>
          </ul>
        </section>

        <!-- Lessons Learned -->
        <section class="case-study-section" style="margin-bottom: 0;">
          <h2>Lessons Learned</h2>
          <p><strong>Ingestion is 90% of RAG:</strong> Standard recursive text splitting degrades the usability of tables and code blocks. Layout-aware chunking (e.g. keeping table rows linked to table headers) is essential for retrieval correctness.</p>
          <p><strong>System prompts aren't enough:</strong> Hybrid retrieval with RRF, relevance thresholds, prompt-injection defenses, and automated LLM-judge evaluation are what reliably force <em>"I do not know"</em> instead of convincing hallucinations when documentation is missing.</p>
        </section>
      </div>

      <!-- 3. CTA Block -->
      <section class="section" style="text-align: center; border-top: 1px solid var(--border); background-color: var(--bg-secondary);">
        <div class="container">
          <div style="max-width: 600px; margin: 0 auto;">
            <h2>Discuss a similar implementation.</h2>
            <p style="font-size: 1.1rem; margin-bottom: 2rem; color: var(--text-secondary);">Find out how a secure, citation-first Enterprise RAG knowledge copilot can fit into your SharePoint, Confluence, or internal repository environment.</p>
            <a href="/contact.html?service=copilot" class="btn btn-primary" style="padding: 1rem 2rem;">Discuss a similar implementation</a>
          </div>
        </div>
      </section>
```

Keep the Delivery Model section text unless it still hard-requires Azure staging as the only environment; if it does, change only the environment phrase to:

```html
          <p>We executed this project in a <strong>4-week fixed-scope sprint</strong>. We worked directly as senior partners, with daily check-ins on Slack and weekly iterations demonstrating working code in the client's staging environment. Because we bypass administrative layers and junior engineers, we moved from blueprint draft to a fully functional pilot in 20 engineering days.</p>
```

- [ ] **Step 6: Run messaging tests + full suite**

Run:

```bash
npm test -- tests/enterprise-rag-messaging.test.js
npm test
```

Expected: all Enterprise RAG messaging tests PASS; full suite PASS (no regressions in existing CTA/fold/token tests).

- [ ] **Step 7: Grep verification**

Run:

```bash
rg "Legacy Knowledge" index.html case-studies.html case-study-knowledge-copilot.html
rg "Azure AI Search" case-studies.html case-study-knowledge-copilot.html
```

Expected: no matches.

- [ ] **Step 8: Commit**

```bash
git add case-study-knowledge-copilot.html
git commit -m "$(cat <<'EOF'
content: rewrite flagship Enterprise RAG case study.

Updates hero, SEO, architecture narrative, SVG labels, and CTA to the FastAPI/pgvector stack story.
EOF
)"
```

---

### Task 5: Final acceptance pass

**Files:**
- Verify only (no intentional product edits unless a Task 1–4 assertion still fails)
- Test: `tests/enterprise-rag-messaging.test.js` + full `npm test`

**Interfaces:**
- Consumes: all prior task outputs
- Produces: acceptance evidence against spec success criteria

- [ ] **Step 1: Confirm acceptance checklist**

Manually confirm against the spec:

1. No `Legacy Knowledge Copilot` / `Legacy Knowledge Retrieval` on the three pages
2. Technical Profile + Approach/Architecture/Results/SVG share FastAPI / pgvector / RRF / JWT-RBAC / LangSmith story
3. 45 minutes and 75% / 100% citation outcomes preserved
4. `Internal Knowledge Copilot Pilot` still present on services/contact (unchanged)
5. No CSS/layout redesign beyond SVG text

- [ ] **Step 2: Run final verification commands**

```bash
npm test
rg "Legacy Knowledge" index.html case-studies.html case-study-knowledge-copilot.html || true
rg "Azure AI Search" case-studies.html case-study-knowledge-copilot.html || true
npm run build
```

Expected: tests PASS; both ripgrep scans empty; Vite build succeeds.

- [ ] **Step 3: Commit only if Step 2 required a tiny fix**

If a fix was needed:

```bash
git add <touched-files>
git commit -m "$(cat <<'EOF'
fix: close remaining Enterprise RAG messaging gaps.

Satisfies final acceptance checks for legacy-name removal and stack consistency.
EOF
)"
```

If no fix was needed, skip this commit.

---

## Plan self-review

**Spec coverage:**
- §4 Canonical copy → Tasks 2–4
- §4.4 Technical Profile → Task 2
- §4.5 Homepage short forms → Task 3
- §5.1–5.3 page changes → Tasks 2–4
- §6 SVG label map → Task 4 Step 4
- §1 success criteria → Task 1 contract + Task 5
- Out of scope surfaces intentionally untouched

**Placeholder scan:** none

**Consistency:** Title/subtitle/overview strings in Task 1 match Task 2 and Task 4 replacements exactly.
