# Homepage Hero & Value Proposition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cascade the approved hero, offer, case-study, and backend-boundary messaging across homepage, services, case studies, about, contact, and footer without layout/CSS changes.

**Architecture:** Static multi-page Vite HTML. Copy and label edits only. Extend the existing Node contract tests so each surface change is locked before HTML/JS edits. Preserve Offer 1 commercial name, architecture diagram node 05, React stack wording, and contact `value="devops"`.

**Tech Stack:** Vite 8, vanilla HTML/CSS/JS, Node built-in test runner (`node --test`). No React app layer.

## Global Constraints

- Spec source of truth: `docs/superpowers/specs/2026-08-12-homepage-hero-value-prop-design.md`
- Exact H1: `Secure Internal RAG AI Copilots & Backend Architecture for Microsoft & Azure Teams.`
- Exact SEO title: `Secure Internal RAG AI Copilots & Backend Architecture for Microsoft & Azure Teams | EventArgs LLC`
- Offer 1 commercial name (exact, unchanged): `Enterprise RAG Knowledge Copilot Pilot`
- Offer 3 rename (exact): `AI Workflow & DevOps Automation`
- Case study title (exact): `Custom Engineering Workflow Automation`
- Case study section id (exact): `custom-engineering-workflow-automation`
- Do not edit architecture diagram node 05 or React stack language
- No layout/CSS redesign — copy and labels only
- Keep contact option `value="devops"`

---

## File structure (locked)

| File | Responsibility |
|---|---|
| `tests/homepage-hero-value-prop.test.js` | Contract tests for this messaging pass |
| `index.html` | Hero, SEO, offers, Delivery Commitments, featured case row |
| `services.html` | Offer copy alignment + Offer 3 rename + meta blurbs |
| `case-studies.html` | Custom Engineering Workflow Automation listing |
| `about.html` | Pure-play backend boundary reinforcement |
| `contact.html` | Offer 3 select label |
| `src/layout.js` | Footer services link label |

---

### Task 1: Messaging contract test

**Files:**
- Create: `tests/homepage-hero-value-prop.test.js`
- Test: `tests/homepage-hero-value-prop.test.js`

**Interfaces:**
- Consumes: none
- Produces: failing contract tests that Tasks 2–6 must satisfy

- [ ] **Step 1: Write the failing contract test**

Create `tests/homepage-hero-value-prop.test.js`:

```js
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
  assert.ok(source.includes('access control boundaries'))
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
  assert.ok(home.includes('60%'))
  assert.ok(listing.includes('60%'))
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- tests/homepage-hero-value-prop.test.js`

Expected: FAIL — current `index.html` still has `Enterprise AI Engineering for Microsoft Ecosystems.` and `Multi-Agent Engineering Orchestrator`; Offer 3 still `AI DevOps & PR Review Automation`.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/homepage-hero-value-prop.test.js
git commit -m "$(cat <<'EOF'
test: add homepage hero and value proposition messaging contracts.

EOF
)"
```

---

### Task 2: Homepage hero and SEO

**Files:**
- Modify: `index.html` (head meta + hero `<h1>`)
- Test: `tests/homepage-hero-value-prop.test.js`

**Interfaces:**
- Consumes: locked `H1`, `SEO_TITLE`, `META_DESC` from Task 1
- Produces: homepage hero/SEO strings required by later tasks

- [ ] **Step 1: Update `<title>`, OG, Twitter, and meta description**

In `index.html` head, replace the three title strings and both description strings:

```html
<title>Secure Internal RAG AI Copilots &amp; Backend Architecture for Microsoft &amp; Azure Teams | EventArgs LLC</title>
<meta name="description"
  content="EventArgs LLC helps Microsoft 365- and Azure-heavy teams design secure, source-grounded RAG AI copilots, backend architecture, governance workflows, and engineering automation engagements." />
```

Apply the same title to `og:title` and `twitter:title`, and the same description to `og:description` and `twitter:description`.

- [ ] **Step 2: Update hero H1**

Replace:

```html
<h1>Enterprise AI Engineering for Microsoft Ecosystems.</h1>
```

with:

```html
<h1>Secure Internal RAG AI Copilots &amp; Backend Architecture for Microsoft &amp; Azure Teams.</h1>
```

Leave the existing `.lead` paragraph and CTAs unchanged.

- [ ] **Step 3: Run focused tests**

Run: `npm test -- tests/homepage-hero-value-prop.test.js`

Expected: the hero/SEO test PASSes; offer/case-study/about tests still FAIL.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
content: lock homepage hero and SEO to Secure Internal RAG AI Copilots.

EOF
)"
```

---

### Task 3: Homepage offers and Delivery Commitments

**Files:**
- Modify: `index.html` (offers section + Delivery Commitments list)
- Test: `tests/homepage-hero-value-prop.test.js`

**Interfaces:**
- Consumes: `OFFER1`, `OFFER3`, `BACKEND_NOTE` from Task 1
- Produces: homepage offer + boundary copy for services/about alignment

- [ ] **Step 1: Refresh Offer 1 body (keep title)**

Keep `<h3 class="card-title">Enterprise RAG Knowledge Copilot Pilot</h3>`.

Set description to:

```html
<p class="card-desc">Deploy a secure, grounded internal knowledge copilot connected directly to your company
  knowledge base with traceable source citations.</p>
```

Checklist labels (text only; keep existing SVG markup):

1. `SharePoint and Azure file sync`
2. `Citation-first retrieval and answer grounding`
3. `4-week production-ready pilot rollout`

- [ ] **Step 2: Refresh Offer 2 body (keep title)**

Keep `Copilot Governance & Hardening`.

Because the homepage offer cards use a three-bullet checklist, put access/budget/rate-limit in the description and keep three bullets:

```html
<p class="card-desc">Audit, secure, and harden internal AI tools with enterprise-grade controls for privacy,
  compliance, access boundaries, budget, and rate-limit guardrails.</p>
```

Checklist labels:

1. `Privacy and compliance reviews`
2. `Access control boundaries`
3. `2-week hardening engagement`

- [ ] **Step 3: Rename and rewrite Offer 3**

Replace title:

```html
<h3 class="card-title">AI Workflow &amp; DevOps Automation</h3>
```

Description:

```html
<p class="card-desc">Reduce engineering review latency and operational drag with custom AI-assisted workflow
  automation for GitHub and Azure DevOps.</p>
```

Exact three-slot Offer 3 checklist:

1. `Custom model context protocol (MCP) tooling`
2. `Automated pull request analysis`
3. `3-week custom workflow integration`

- [ ] **Step 4: Add Pure-Play Backend Delivery Commitment**

Inside the Delivery Commitments `<ul class="spec-list">`, append:

```html
<li>
  <strong>Pure-Play Backend &amp; Systems Engineering:</strong> We specialize exclusively in robust backend
  architecture, vector databases, API orchestration, and secure AI infrastructure. We do not build front-end web
  interfaces—allowing us to focus 100% of our energy on high-performance data pipelines, security guardrails, and
  rock-solid system reliability.
</li>
```

- [ ] **Step 5: Run focused tests**

Run: `npm test -- tests/homepage-hero-value-prop.test.js`

Expected: homepage offers + Delivery Commitments tests PASS; case-study/services/about may still FAIL.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
content: refresh homepage offers and add pure-play backend commitment.

EOF
)"
```

---

### Task 4: Custom Engineering Workflow Automation case study

**Files:**
- Modify: `index.html` (featured case row for multi-agent)
- Modify: `case-studies.html` (`#multi-agent-orchestrator` section)
- Test: `tests/homepage-hero-value-prop.test.js`

**Interfaces:**
- Consumes: `CASE_TITLE`, section id `custom-engineering-workflow-automation`
- Produces: consistent homepage + listing case study framing

- [ ] **Step 1: Update homepage featured case row**

Replace the second `.case-row` block content with:

```html
<div class="case-row">
  <div class="case-row-meta">
    <span class="card-tag">Case Study</span>
    <h3>Custom Engineering Workflow Automation</h3>
  </div>
  <p class="case-row-desc">Complex development workflows suffered from context loss, high latency, and repetitive
    manual triage across distributed codebases. We engineered a custom, stateful multi-agent orchestration pipeline
    with graph-based coordination for task routing and code review triage—automating 60% of repetitive workflow
    overhead while keeping senior engineers in the execution loop.</p>
  <a href="/case-studies.html#custom-engineering-workflow-automation" class="case-row-link">
    Read Case Study &rarr;
  </a>
</div>
```

- [ ] **Step 2: Update case-studies listing section**

Change:

```html
<section id="multi-agent-orchestrator" ...>
```

to:

```html
<section id="custom-engineering-workflow-automation" ...>
```

Replace title/subtitle/overview:

```html
<h2 style="margin-bottom: 1rem;">Custom Engineering Workflow Automation</h2>
<p style="font-size: 1.05rem; font-weight: 500; color: var(--text-primary);">Custom multi-agent orchestration for developer task routing and review triage—not off-the-shelf product software.</p>
<p>Complex development workflows suffered from context loss, high latency, and repetitive manual triage across distributed codebases. We engineered a custom, stateful multi-agent orchestration pipeline (utilizing advanced graph-based coordination) that automates developer task routing and code review triage. The outcome: automated 60% of repetitive workflow overhead while keeping senior engineers fully in control of the execution loop, with clean source code, native Azure/GitHub integration, and zero junior hand-offs.</p>
```

Update Technical Profile bullets to:

- **Client Environment:** Mid-market software development organization with distributed codebases and high triage volume.
- **Business Problem:** Context loss, high latency, and repetitive manual triage across complex development workflows.
- **Constraints & Governance:** Human-in-the-loop validation; senior engineers remain in the execution loop.
- **Solution Architecture:** Custom stateful graph-based multi-agent orchestration for task routing and code review triage.
- **Quantified Outcome:** Automated 60% of repetitive workflow overhead.
- **Technical Stack:** LangGraph, Python, FastAPI, Docker.

- [ ] **Step 3: Run focused tests**

Run: `npm test -- tests/homepage-hero-value-prop.test.js`

Expected: case-study reframe test PASSes.

- [ ] **Step 4: Commit**

```bash
git add index.html case-studies.html
git commit -m "$(cat <<'EOF'
content: reframe multi-agent case as custom engineering workflow automation.

EOF
)"
```

---

### Task 5: Services, contact, and footer Offer 3 cascade

**Files:**
- Modify: `services.html` (meta + Offer 1/2 touch-ups + Offer 3 heading/outcome)
- Modify: `contact.html` (select option label only)
- Modify: `src/layout.js` (footer link label)
- Test: `tests/homepage-hero-value-prop.test.js`

**Interfaces:**
- Consumes: `OFFER3` exact string; keep `value="devops"` and `href="/services.html#devops"`
- Produces: sitewide Offer 3 rename complete

- [ ] **Step 1: Update services meta descriptions**

Replace each occurrence of:

`AI DevOps automation`

with:

`AI workflow &amp; DevOps automation`

in `services.html` title/description meta tags (name/description, og:description, twitter:description). Keep the page `<title>` unless it literally contains the old Offer 3 product name.

- [ ] **Step 2: Align Offer 1 / Offer 2 lead language on services where cheap**

For Offer 1, ensure the engagement outcome/intro still describes a secure grounded internal knowledge copilot with citations (do not rename the H2 away from `Enterprise RAG Knowledge Copilot Pilot`).

For Offer 2, ensure the intro mentions enterprise-grade controls / access boundaries if missing; do not rename the H2.

Do not remove React from Technical Environment.

- [ ] **Step 3: Rename Offer 3 on services**

Replace:

```html
<h2>AI DevOps &amp; PR Review Automation</h2>
```

with:

```html
<h2>AI Workflow &amp; DevOps Automation</h2>
```

Replace engagement outcome with:

```html
<p class="engagement-outcome">
  Reduce engineering review latency and operational drag with custom AI-assisted workflow automation.
</p>
```

In “What We Deliver”, ensure MCP tooling is visible — either rename deliverable 1/2 headings or add MCP into an existing deliverable paragraph, e.g. change “Pull request classification” supporting text to mention custom MCP tooling where natural, or rename item 1 to:

```html
<h4>Custom MCP tooling</h4>
<p>Model Context Protocol tooling that securely exposes repository and pipeline context to AI-assisted workflows.</p>
```

Keep GitHub/Azure DevOps integration deliverable and 3-week timeline packaging metadata.

- [ ] **Step 4: Update contact select label**

Replace:

```html
<option value="devops">AI DevOps &amp; PR Review Automation (3 Weeks)</option>
```

with:

```html
<option value="devops">AI Workflow &amp; DevOps Automation (3 Weeks)</option>
```

Do not change `value="devops"`.

- [ ] **Step 5: Update footer label in layout.js**

Replace:

```html
<li><a href="/services.html#devops">AI DevOps</a></li>
```

with:

```html
<li><a href="/services.html#devops">AI Workflow &amp; DevOps</a></li>
```

- [ ] **Step 6: Run focused tests**

Run: `npm test -- tests/homepage-hero-value-prop.test.js`

Expected: services/contact/footer cascade test PASSes.

- [ ] **Step 7: Commit**

```bash
git add services.html contact.html src/layout.js
git commit -m "$(cat <<'EOF'
content: cascade AI Workflow & DevOps Automation rename sitewide.

EOF
)"
```

---

### Task 6: About page backend boundary reinforcement

**Files:**
- Modify: `about.html`
- Test: `tests/homepage-hero-value-prop.test.js`

**Interfaces:**
- Consumes: Pure-Play Backend boundary language from spec §4.5
- Produces: about-page reinforcement without architecture/React edits

- [ ] **Step 1: Add boundary sentence to senior-practitioner bio**

After the paragraph that ends with “traceable citations.” (or inside that paragraph’s close), insert a clear reinforcement sentence:

```html
<p style="margin-bottom: 2rem;">We are a pure-play backend and systems engineering practice: robust backend architecture, vector databases, API orchestration, and secure AI infrastructure. We do not build front-end web interfaces, so delivery stays focused on high-performance data pipelines, security guardrails, and system reliability.</p>
```

If that creates two consecutive `margin-bottom: 2rem` paragraphs, keep only one with `margin-bottom: 2rem` and set the earlier bio paragraph to `margin-bottom: 1.25rem`.

Keep the existing Bad Fit bullet: `Standalone front-end design, UI refresh, or brand-only redesign projects.`

- [ ] **Step 2: Run focused tests**

Run: `npm test -- tests/homepage-hero-value-prop.test.js`

Expected: all tests in `homepage-hero-value-prop.test.js` PASS.

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "$(cat <<'EOF'
content: reinforce pure-play backend boundary on about page.

EOF
)"
```

---

### Task 7: Full-suite verification and rename grep

**Files:**
- Test: `tests/**/*.test.js`
- Verify: in-scope HTML/JS surfaces

**Interfaces:**
- Consumes: all prior task outputs
- Produces: green full test suite + rename completeness evidence

- [ ] **Step 1: Run full test suite**

Run: `npm test`

Expected: all tests PASS, including existing `tests/enterprise-rag-messaging.test.js` and new `tests/homepage-hero-value-prop.test.js`.

- [ ] **Step 2: Grep for stale productized names on updated surfaces**

Run:

```bash
rg -n "Multi-Agent Engineering Orchestrator|AI DevOps & PR Review Automation|AI DevOps &amp; PR Review Automation" index.html services.html case-studies.html contact.html src/layout.js about.html
```

Expected: no matches.

Also confirm Offer 1 name still present and Internal Knowledge Copilot Pilot absent:

```bash
rg -n "Enterprise RAG Knowledge Copilot Pilot|Internal Knowledge Copilot Pilot" index.html services.html contact.html
```

Expected: Enterprise RAG present; Internal Knowledge Copilot Pilot absent.

- [ ] **Step 3: Confirm out-of-scope surfaces untouched**

Run:

```bash
rg -n "Copilot UI with citations|Python/FastAPI \+ React" index.html services.html
```

Expected: both still present (architecture node 05 + React stack unchanged).

- [ ] **Step 4: Commit only if Step 2/3 required tiny follow-up fixes; otherwise no empty commit**

If follow-up fixes were needed:

```bash
git add <touched-files>
git commit -m "$(cat <<'EOF'
fix: finish hero value-prop messaging rename cleanup.

EOF
)"
```

---

## Spec coverage checklist (self-review)

| Spec requirement | Task |
|---|---|
| H1 + SEO title/description | Task 2 |
| Offer 1 body refresh; name unchanged | Task 3 + Task 5 + Task 1 asserts |
| Offer 2 body refresh | Task 3 (+ light services align in Task 5) |
| Offer 3 rename cascade | Task 3 + Task 5 |
| Case study reframe + anchor rename | Task 4 |
| Delivery Commitments backend note | Task 3 |
| About reinforcement | Task 6 |
| Tests for H1/Offer3/case/id/Offer1 | Task 1 + Task 7 |
| No layout/CSS; no arch node 05 / React edits | Global Constraints + Task 7 Step 3 |
