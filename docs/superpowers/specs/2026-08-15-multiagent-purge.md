# Multi-Agent Purge & Engineering Insights Hub

**Date:** 2026-08-15  
**Source:** `roadmapNewpage.md` v3.0  
**Status:** Approved for implementation (user: proceed)  
**Stack:** Static Vite MPA + Tailwind + vanilla JS. No React.

## Goal

Remove commercial multi-agent positioning and unverified triage claims from public pages, restore Offer 3 to **AI DevOps & PR Review Automation**, and launch `/engineering-insights` with three P0 technical articles.

## Public-route purge (indexable HTML, layout shell, sitemap, JSON-LD)

Remove these strings from public routes:

| Term | Treatment |
|---|---|
| `multi-agent`, `multi agent`, `agent orchestrator` | Delete. Reframe as custom PR / workflow engineering. |
| `orchestration` | Reword (API integration, answer assembly, LangGraph workflows). |
| `60%` repetitive triage / workflow overhead | Delete. Do not replace with another unverified percentage. |
| `zero hallucination` / `zero-hallucination` | Delete as a guarantee. Keep citation-first / abstention language. |
| Literal `guarantee` of model correctness | Reword to require / enforce / evaluate. |

Internal docs, roadmaps, and historical specs may retain the terms.

## Hero proof bar

Retain **75% internal lookup reduction** and **fixed 4-week flagship pilot**. Replace the 60% triage stat with verified PR automation scope: classification, review assist, and human-in-the-loop approval gates in Azure DevOps and GitHub.

## Offer 3 (canonical name)

**AI DevOps & PR Review Automation** on homepage cards, services, contact select, and footer. Focus: PR classification, review assistance, HITL approval gates.

## Engineering Insights

- Index: `/engineering-insights.html` (clean URL `/engineering-insights`)
- Featured full-width hero card + 2-column article grid
- Detail: `max-w-3xl` reading column, desktop sticky TOC, JSON-LD `BlogPosting`
- Bottom CTA: `/contact.html?topic={slug}`
- Nav + footer link; `layout.js` marks Insights active on `/engineering-insights*`

### P0 articles

1. `designing-citation-grounded-rag-microsoft-365` — Designing Citation-Grounded RAG for Microsoft 365: Permissions, Retrieval, and Evidence. CTA topic `rag-architecture-review`.
2. `why-enterprise-rag-pilots-fail` — Why Enterprise RAG Pilots Fail After the Demo (And How to Fix Retrieval Latency). CTA topic `rag-architecture-review`.
3. `ai-assisted-pr-review-azure-devops` — AI-Assisted PR Review in Azure DevOps: Approval Gates, Traceability, and Safe Adoption. CTA topic `pr-review-automation`.

Articles are authored as markdown with YAML frontmatter and published as static HTML. `src/insights/frontmatter.js` parses the YAML subset used by the catalog.

## Redirects

Vercel 301s for retired prototype paths (`/multi-agent`, `/multi-agent-orchestrator`, `/case-studies/multi-agent-orchestrator`) to `/services` or `/engineering-insights`.

## Tokens

Keep locked Wave 1 tokens (`#0B1220` / `#121A2B` / `#243049`). Insights primitives additionally document v3.0 slate aliases (`#090d16` / `#0f172a` / `#1e293b`). Accent remains `#2563eb`. IBM Plex Sans for UI; IBM Plex Mono for chips, dates, and code.

## Out of scope

React/SPA, light mode, changing Offer 1 name, inventing new outcome percentages.
