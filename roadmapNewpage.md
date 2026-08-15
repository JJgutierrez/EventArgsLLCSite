# EventArgs LLC Technical Roadmap: Multi-Agent Purge & Engineering Insights Hub

**Document Version:** 3.0

**Date:** August 15, 2026

**Methodology:** Spec-Driven Development (SDD) via Cursor Plugins (`Superpowers`, `Figma`, `Playwright`)

**Stack (Locked):** Static Vite Multi-Page HTML + Tailwind CSS + Vanilla JS Primitives (No React/SPA frameworks)

**Typography (Locked):** IBM Plex Sans (Headings & Body), IBM Plex Mono / JetBrains Mono (Metadata, Chips, & Code)

**Theme (Locked):** Enterprise Dark (`#090d16` / `#0f172a` slate surfaces with `#2563eb` Azure blue accents)

---

## 1. Executive Summary & Core Decisions

1. **Complete Multi-Agent Deprecation:** Remove all public positioning, service offerings, case-study claims, and metadata referring to packaged multi-agent products, multi-agent orchestration, and unverified outcome figures (including the 60% triage metric).


2. **AI DevOps Offer Consolidation:** Reframe the third core service as **AI DevOps & PR Review Automation**, focusing on PR classification, review assistance, and human-in-the-loop approval gates inside Azure DevOps and GitHub.


3. **Launch Engineering Insights:** Deploy an owned technical publishing hub at `/engineering-insights` dedicated to architecture teardowns, evaluation design, and production playbooks for enterprise Microsoft 365 and Azure environments.

---

## 2. Cursor Tooling & Plugin Integration

* **Superpowers:** Drives atomic SDD planning, change tracking, and task execution inside `docs/superpowers/specs/` and `docs/superpowers/plans/`.
* **Figma:** Ingests design tokens, card components, sticky TOC sidebars, and responsive typography hierarchies into `design-system/DESIGN_SPEC.md`.


* **Playwright:** Automates visual regression passes, validates responsive layouts across viewports (1440px, 1024px, 768px, 390px), and tests contact form attribution.



---

## 3. Phased Implementation Plan

### Phase 1 — Spec-Driven Audit & Multi-Agent Purge

**Tool:** `Superpowers`

* [ ] Generate atomic spec `docs/superpowers/specs/2026-08-15-multiagent-purge.md`.
* [ ] Audit all HTML templates, JS scripts, JSON-LD schemas, and sitemaps to remove occurrences of:
* `multi-agent`, `multi agent`, `agent orchestrator`, `orchestration`.
* The unverified `60% repetitive triage automation` claim.


* All literal guarantee or "zero hallucination" wording.


* [ ] Refactor the homepage hero proof bar:
* Retain **75% internal search reduction**.


* Retain **Fixed 4-week flagship pilot delivery**.


* Replace the triage stat with verified PR automation scope.




* [ ] Update Offer #3 across all cards to **AI DevOps & PR Review Automation**.


* [ ] Configure 301 redirects for any retired prototype or case-study URLs to `/services` or `/engineering-insights`.

### Phase 2 — Design System & Engineering Insights Components

**Tools:** `Figma` + `Tailwind CSS`

* [ ] Maintain token definitions in `design-system/DESIGN_SPEC.md`:


* Surface backgrounds: `#090d16` (base), `#0f172a` (surface/cards), `#1e293b` (subtle borders).


* Accent: `#2563eb` (Azure blue).


* Typography: `IBM Plex Sans` for UI/body; monospace for metadata chips (`[9 min read]`, topic tags, date stamps).




* [ ] Implement layout primitives in `src/layout.js`:


* **Featured Article Hero Card:** Full-width layout with title, technical summary, reading time, and topic badges.
* **Article Grid / Index:** 2-column responsive card layout with monospace metadata headers.
* **Article Detail Layout:** Max-width reading container (`max-w-3xl`) with desktop sticky Table of Contents (TOC).
* **Contextual Service CTA Block:** Bottom-of-article conversion card routing to `/contact?topic={slug}`.



### Phase 3 — Static Architecture & Initial Publishing Backlog

**Tools:** `Vite` + `Superpowers`

* [ ] Add `engineering-insights.html` and article detail routing into Vite's rollup input config.


* [ ] Implement a static frontmatter parser supporting:
```yaml
title: "Designing Citation-Grounded RAG for Microsoft 365"
slug: "designing-citation-grounded-rag-microsoft-365"
description: "Enterprise permissions, hybrid search, and evaluation gates in Azure environments."
date: "2026-08-15"
updated: "2026-08-15"
topics: ["RAG", "Microsoft 365", "Azure"]
readingTime: "9 min read"
featured: true
cta:
  label: "Request a RAG Architecture Review"
  topic: "rag-architecture-review"

```


* [ ] Draft and publish the 3 P0 cornerstone articles:
1. *Designing Citation-Grounded RAG for Microsoft 365: Permissions, Retrieval, and Evidence*.
2. *Why Enterprise RAG Pilots Fail After the Demo (And How to Fix Retrieval Latency)*.
3. *AI-Assisted PR Review in Azure DevOps: Approval Gates, Traceability, and Safe Adoption*.



### Phase 4 — Automated Testing & Quality Gates

**Tool:** `Playwright`

* [ ] **Visual Layout QA:** Execute automated screenshot tests across standard breakpoints (`1440px`, `1024px`, `768px`, `390px`) verifying no horizontal overflow from code blocks, node diagrams, or tables.


* [ ] **Link & Redirect Validation:** Assert zero dead links and verify all retired multi-agent URLs return valid 301 redirect headers.
* [ ] **Content Assertion:** Run an automated repo crawler ensuring zero occurrences of prohibited multi-agent search terms exist on public routes.
* [ ] **Conversion Flow:** Verify contact form pre-populates the query parameter when arriving from an article CTA (e.g., `/contact?topic=rag-architecture-review`).

---

## 4. Definition of Done

* No indexable page contains references to commercial multi-agent packages, products, or unverified triage metrics.


* `/engineering-insights` is live, linked in primary navigation and footer, and populated with 3 technical articles.
* All article pages pass mobile accessibility, render structured JSON-LD schema, and include topic-aligned CTAs.
* Playwright E2E test suite passes cleanly across all defined viewport sizes.