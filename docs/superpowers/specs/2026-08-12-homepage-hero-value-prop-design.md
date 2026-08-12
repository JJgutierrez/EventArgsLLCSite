# Homepage Hero & Value Proposition — Messaging Design Spec

**Date:** 2026-08-12  
**Site:** https://www.eventargs.llc/  
**Status:** Approved for planning  
**Approach:** Copy-only cascade (no layout/CSS redesign)

## 1. Goal

Refresh homepage hero and value proposition messaging, reframe the multi-agent case study as custom engineering outcomes (not productized software), align the three fixed-scope offers, and reinforce a pure-play backend boundary — cascading consistently across related pages.

**Audience:** Engineering leads and Microsoft/Azure-heavy teams evaluating senior-led RAG copilots, governance, and workflow automation.

**Success criteria:**
1. Homepage H1 and SEO title use the locked RAG-inclusive headline
2. Offer 1 commercial name remains `Enterprise RAG Knowledge Copilot Pilot`
3. Offer 3 renamed to `AI Workflow & DevOps Automation` on homepage, services, contact, and footer
4. Multi-agent case study reframed as `Custom Engineering Workflow Automation` on homepage and case-studies listing
5. Delivery Commitments includes the Pure-Play Backend & Systems Engineering note
6. About page reinforces backend focus without contradicting existing Bad Fit language
7. No layout/CSS redesign; architecture diagram node 05 and React stack wording left unchanged

## 2. Locked decisions

| Decision | Choice |
|---|---|
| Primary headline | Option A variant: Secure Internal RAG AI Copilots & Backend Architecture for Microsoft & Azure Teams. |
| Offer 1 naming | Keep **Enterprise RAG Knowledge Copilot Pilot** (not “Internal Knowledge Copilot Pilot”) |
| Scope | Full messaging cascade: index, services, case-studies, about, SEO/meta, contact Offer 3 labels, footer |
| Frontend boundary treatment | Add Delivery Commitments note (+ about reinforcement); leave architecture diagram and React stack language unchanged |
| Implementation approach | Copy-only cascade |
| Case study anchor | Rename `#multi-agent-orchestrator` → `#custom-engineering-workflow-automation` and update homepage link |

## 3. Out of scope

- Layout, CSS, or visual redesign
- Architecture diagram node edits (including “Copilot UI with citations”)
- Removing or rewriting React from services technical environment
- Changing Offer 1 commercial name away from Enterprise RAG Knowledge Copilot Pilot
- New pages or new case-study detail pages
- Pricing changes

## 4. Canonical copy

### 4.1 Hero (index.html)

**H1**
> Secure Internal RAG AI Copilots & Backend Architecture for Microsoft & Azure Teams.

**Lead (unchanged structure; keep current technical lead)**
> Production-grade RAG, governance, and workflow automation for Microsoft 365 and Azure teams — often with FastAPI and PostgreSQL/pgvector, always with citation guardrails. Fixed-scope, senior-led delivery.

**CTAs:** unchanged

### 4.2 SEO / Open Graph / Twitter (index.html)

**Title**
> Secure Internal RAG AI Copilots & Backend Architecture for Microsoft & Azure Teams | EventArgs LLC

**Description (tighten to match)**
> EventArgs LLC helps Microsoft 365- and Azure-heavy teams design secure, source-grounded RAG AI copilots, backend architecture, governance workflows, and engineering automation engagements.

### 4.3 Service offers

#### Offer 1 — Enterprise RAG Knowledge Copilot Pilot (name unchanged)

Deploy a secure, grounded internal knowledge copilot connected directly to your company knowledge base with traceable source citations.

- SharePoint and Azure file sync
- Citation-first retrieval and answer grounding
- 4-week production-ready pilot rollout

#### Offer 2 — Copilot Governance & Hardening (name unchanged)

Audit, secure, and harden internal AI tools with enterprise-grade controls.

- Privacy and compliance reviews
- Access control boundaries
- Budget and rate-limit guardrails
- 2-week hardening engagement

#### Offer 3 — AI Workflow & DevOps Automation (rename)

Reduce engineering review latency and operational drag with custom AI-assisted workflow automation.

- Custom model context protocol (MCP) tooling
- Automated pull request analysis
- Secure CI/CD pipeline integration for GitHub and Azure DevOps
- 3-week custom workflow integration

**Offer 3 rename cascade targets:**
- `index.html` offer block title + body
- `services.html` offer heading + related meta/description blurbs that say “AI DevOps”
- `contact.html` select option label
- `src/layout.js` footer services link (`AI DevOps` → `AI Workflow & DevOps`)

### 4.4 Case study: Custom Engineering Workflow Automation

**Title:** Custom Engineering Workflow Automation

**Problem:** Complex development workflows suffered from context loss, high latency, and repetitive manual triage across distributed codebases.

**Solution:** Engineered a custom, stateful multi-agent orchestration pipeline (utilizing advanced graph-based coordination) that automates developer task routing and code review triage.

**Outcome:** Automated 60% of repetitive workflow overhead while keeping senior engineers fully in control of the execution loop. Delivered with clean source code, native Azure/GitHub integration, and zero junior hand-offs.

**Homepage short form:** Title + 2–3 sentence blurb combining problem → custom orchestration outcome (60%), without productized “off-the-shelf” framing. Link to `/case-studies.html#custom-engineering-workflow-automation`.

**case-studies.html:** Update section id, title, subtitle/overview, and Technical Profile fields to match Problem / Solution / Outcome while preserving existing two-column listing layout. Keep stack facts where still accurate (e.g. LangGraph, Python, FastAPI, Docker) unless they conflict with the new framing.

### 4.5 Pure-Play Backend boundary

**Delivery Commitments (index.html) — add list item:**
> **Pure-Play Backend & Systems Engineering:** We specialize exclusively in robust backend architecture, vector databases, API orchestration, and secure AI infrastructure. We do not build front-end web interfaces—allowing us to focus 100% of our energy on high-performance data pipelines, security guardrails, and rock-solid system reliability.

**about.html:** Reinforce the same boundary in the senior-practitioner model copy and/or Bad Fit list (already includes standalone front-end). Do not edit architecture diagram or React stack lines in this pass.

## 5. Page-by-page changes

### 5.1 `index.html`
- Hero H1 + SEO/OG/Twitter title & description
- Three offer blocks (Offer 1/2 body refresh; Offer 3 rename + body)
- Featured case row: Multi-Agent → Custom Engineering Workflow Automation
- Delivery Commitments: add Pure-Play Backend item

### 5.2 `services.html`
- Align Offer 1/2 body language with §4.3 where it currently diverges
- Rename Offer 3 heading and supporting copy
- Update page meta descriptions that still say “AI DevOps automation” to “AI workflow & DevOps automation” (or equivalent)

### 5.3 `case-studies.html`
- Reframe multi-agent section per §4.4
- Rename section id; update any internal references

### 5.4 `about.html`
- Add/reinforce pure-play backend boundary language

### 5.5 `contact.html`
- Update Offer 3 select option label to AI Workflow & DevOps Automation (3 Weeks)
- Keep `value="devops"` query-param value for link stability unless a rename is trivial and all inbound links are updated in the same pass (prefer keep value)

### 5.6 `src/layout.js`
- Footer services link label for devops → AI Workflow & DevOps

### 5.7 Tests
- Update/extend messaging tests for new H1, Offer 3 name, case study title/id, and absence of productized “Multi-Agent Engineering Orchestrator” on homepage/case-studies where replaced
- Preserve existing assertion that Offer 1 remains `Enterprise RAG Knowledge Copilot Pilot`

## 6. Consistency rules

- Hero and SEO must include **RAG** in the copilots phrase (`Secure Internal RAG AI Copilots…`)
- Do not reintroduce `Internal Knowledge Copilot Pilot` as the commercial offer name
- Position orchestration as **custom engineering**, not off-the-shelf multi-agent product
- Backend boundary note is expectation-setting copy only; do not strip UI/React mentions elsewhere in this pass
- Preserve quantified outcomes: 75% lookup reduction (RAG flagship); 60% workflow overhead/triage automation (workflow case)

## 7. Implementation notes

- Static multi-page Vite HTML site under `EventArgsLLCSite/`
- Copy and label edits only
- After implementation, grep for `Multi-Agent Engineering Orchestrator` and `AI DevOps & PR Review Automation` on updated surfaces to verify rename completeness
