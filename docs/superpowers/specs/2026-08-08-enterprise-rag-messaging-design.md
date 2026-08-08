# Enterprise RAG Knowledge Copilot — Messaging Consistency Design Spec

**Date:** 2026-08-08  
**Site:** https://www.eventargs.llc/  
**Status:** Approved for planning  
**Scope:** Canonical rewrite of Legacy Knowledge Copilot messaging to Enterprise RAG (Backend Architecture)

## 1. Goal

Replace inconsistent “Legacy Knowledge Copilot” messaging with a single production-grade Enterprise RAG narrative centered on FastAPI, PostgreSQL/pgvector, hybrid search with Reciprocal Rank Fusion (RRF), JWT/RBAC, prompt-injection guardrails, and LangSmith LLM-judge evaluation — while preserving quantified business outcomes.

**Audience:** Engineering leads and operations stakeholders evaluating source-grounded RAG systems.

**Success criteria:**
1. No remaining user-facing “Legacy Knowledge Copilot” / “Legacy Knowledge Retrieval” strings on `index.html`, `case-studies.html`, or `case-study-knowledge-copilot.html`
2. Technical Profile + flagship Approach/Architecture/Results/SVG tell the same FastAPI / pgvector / RRF / JWT-RBAC / LangSmith story
3. Business outcomes preserved: 45-minute lookup pain → 75% reduction; 100% citation coverage
4. Service offer naming elsewhere (“Internal Knowledge Copilot Pilot”) left unchanged
5. No layout/CSS redesign — copy and diagram labels only

## 2. Locked decisions

| Decision | Choice |
|---|---|
| Approach | Canonical rewrite (one source of truth across listing, homepage, flagship page) |
| Technical Profile | Keep business outcomes; rewrite Architecture + Technical Stack (and related governance language) |
| Flagship depth | Hero + Approach/Architecture/Results/CTA + SEO meta + SVG diagram labels |
| Client environment framing | SharePoint / Confluence / internal repositories (not Azure-only) |
| Retrieval core | PostgreSQL/pgvector hybrid search + RRF (not Azure AI Search as the core) |
| URL / filename | Keep `case-study-knowledge-copilot.html` (no redirects in this pass) |
| Section id | `legacy-knowledge-copilot` → `enterprise-rag-knowledge-copilot` |

## 3. Out of scope

- Services offer naming (“Internal Knowledge Copilot Pilot”)
- Contact form option labels
- `about.html` general positioning copy
- Sitemap URL / filename changes
- Layout, CSS, or visual redesign
- New case studies or additional pages

## 4. Canonical copy

### 4.1 Title

Enterprise RAG Knowledge Copilot (Backend Architecture)

### 4.2 Subtitle

Production-grade retrieval-augmented generation pipeline with hybrid search, strict source grounding, and enterprise guardrails.

### 4.3 Overview (case-studies left column)

For engineering and operations teams struggling with documentation sprawl across SharePoint, Confluence, and internal repositories, we engineer production-ready RAG systems. This solution implements a robust FastAPI and PostgreSQL/pgvector backend featuring Reciprocal Rank Fusion (RRF), semantic query routing, JWT/RBAC security, prompt-injection guardrails, and an automated LLM-judge evaluation workflow via LangSmith to guarantee zero-hallucination source citation.

### 4.4 Technical Profile

| Field | Copy |
|---|---|
| Client Environment | Engineering and operations teams with documentation across SharePoint, Confluence, and internal repositories. |
| Business Problem | Staff lost an average of 45 minutes finding accurate procedures during outages due to documentation sprawl. |
| Constraints & Governance | JWT/RBAC access control, prompt-injection guardrails, and zero hallucination tolerance with 100% citation coverage. |
| Solution Architecture | FastAPI retrieval service with hybrid vector + keyword search, Reciprocal Rank Fusion (RRF), and semantic query routing. |
| Quantified Outcome | 75% reduction in internal lookup times with verified inline citations. |
| Technical Stack | FastAPI, PostgreSQL/pgvector, LangChain, LangSmith (LLM-judge eval), Python, JWT/RBAC. |

### 4.5 Homepage short forms

Derived from the canon; not the full overview paragraph.

- **Featured case row:** Same title; 2–3 sentence blurb emphasizing hybrid RAG, source grounding, and 75% lookup reduction; link unchanged.
- **Outcome banner:** Rename “Legacy Knowledge Retrieval” → “Enterprise RAG Knowledge Copilot”; keep the 75% outcome and case-study link.

## 5. Page-by-page changes

### 5.1 `case-studies.html`

- Update section id to `enterprise-rag-knowledge-copilot`
- Replace title, subtitle, overview with canonical copy
- Replace Technical Profile bullets with §4.4
- Keep CTA label: “Read Flagship Case Study →”
- Keep link to `/case-study-knowledge-copilot.html`

### 5.2 `index.html`

- Featured case row: new title + short grounded blurb + same case-study link
- Outcome banner: rename to Enterprise RAG Knowledge Copilot; keep 75% outcome

### 5.3 `case-study-knowledge-copilot.html`

| Area | Change |
|---|---|
| Hero | New title + subtitle; meta badge may become “Enterprise RAG / Backend” |
| SEO / OG / Twitter | Rename from Internal/Legacy Knowledge Copilot to Enterprise RAG framing; retain 75% where useful |
| Situation | Keep sprawl / 45-minute business problem; light naming consistency only |
| Constraints | Fold in JWT/RBAC + prompt-injection guardrails alongside citation / “I do not know” behavior |
| Approach | Hybrid search + RRF + semantic query routing + citation enforcement + LangSmith LLM-judge eval |
| Architecture prose | FastAPI + PostgreSQL/pgvector backend (not Azure AI Search as retrieval core) |
| Results | Keep 75% / 100% citation; reframe boundary language as controlled deployment + RBAC (not Azure-subscription-only) |
| CTA | Broaden beyond “Microsoft 365 or Azure environment” to enterprise knowledge environments; SharePoint/Confluence sources may still be mentioned |
| Filename / URL | Unchanged |

## 6. Architecture diagram (SVG label map)

Preserve the existing two-column SVG layout; update labels only:

| Current | Proposed |
|---|---|
| SharePoint / Azure Files | SharePoint / Confluence / Repos |
| Azure Functions (Python Layout Parsing) | Ingest Worker (layout-aware parsing) |
| Semantic Embeddings (text-embedding-3-large) | Embeddings + Chunk Metadata |
| Azure AI Search Index / Vector & Keyword | PostgreSQL/pgvector Index / Hybrid Vector + Keyword |
| User Query via Web UI | User Query via Client / API |
| FastAPI Gateway (Azure AD Auth Check) | FastAPI Gateway (JWT/RBAC) |
| Prompt Compiler (Strict Citation Rules) | Query Router + Guardrails + Prompt Compiler |
| Azure OpenAI GPT-4o | LLM Generation (citation-bound) |
| (prose / diagram emphasis) | LangSmith LLM-judge evaluation loop |

## 7. Consistency rules

- One stack story everywhere in scope: FastAPI + PostgreSQL/pgvector + RRF + JWT/RBAC + LangSmith.
- Do not leave Azure AI Search as the retrieval core on updated surfaces.
- Preserve quantified outcomes (45 minutes → 75% reduction; 100% citation coverage).
- Do not rename the commercial offer “Internal Knowledge Copilot Pilot” in this pass.

## 8. Implementation notes

- Static multi-page Vite HTML site under `EventArgsLLCSite/`
- Edits are copy and SVG text nodes only
- After implementation, grep for `Legacy Knowledge` across the three target pages to verify acceptance criterion 1
