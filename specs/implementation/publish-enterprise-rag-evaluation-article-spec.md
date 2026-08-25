# Implementation Specification: Publish Enterprise RAG Evaluation Article

**Project:** EventArgs LLC website  
**Specification:** `specs/implementation/publish-enterprise-rag-evaluation-article-spec.md`  
**Date:** August 25, 2026  
**Status:** Approved for Implementation  

---

## 1. Repository Discovery & Architecture Inspection

- **Package Manager & Commands**:
  - Dev server: `npm run dev` (`vite`)
  - Production build: `npm run build` (`vite build`)
  - Test runner: `npm test` (`node --test tests/**/*.test.js`)
- **Framework & Renderer**:
  - Vite static multi-page HTML setup (`vite.config.js`).
  - Catalog parsing via Node scripts (`src/insights/catalog.js`, `src/insights/frontmatter.js`).
- **Styling & CSS**:
  - TailwindCSS v4 `@import "tailwindcss"` with `@theme` definitions in `src/style.css`.
  - Brand font families: IBM Plex Sans (`var(--font-sans)`) and IBM Plex Mono (`var(--font-mono)`).
  - Design system tokens: `bg-ea-bg`, `bg-ea-surface`, `border-ea-border`, `text-ea-text`, `btn-primary`, `insight-card`, `insight-table`, `insight-body`, `insight-toc`.
- **Source Locations**:
  - Markdown article catalog: `content/engineering-insights/`
  - HTML article pages: `engineering-insights/`
  - Engineering Insights Hub: `engineering-insights.html`
  - Sitemap: `public/sitemap.xml` (manually maintained XML)
  - Vite input entry points: `vite.config.js` (`rollupOptions.input`)
  - Test suite: `tests/insights-hub.test.js`
- **Reference Template**:
  - Reference article: `/engineering-insights/designing-citation-grounded-rag-microsoft-365.html`
  - Reference markdown: `content/engineering-insights/designing-citation-grounded-rag-microsoft-365.md`

---

## 2. Route & Content Contract

- **Route / URL**: `/engineering-insights/enterprise-rag-evaluation-microsoft-365.html`
- **Markdown File**: `content/engineering-insights/enterprise-rag-evaluation-microsoft-365.md`
- **HTML File**: `engineering-insights/enterprise-rag-evaluation-microsoft-365.html`

### 2.1 Metadata Contract
- **Title**: `Enterprise RAG Evaluation for Microsoft 365: A Practical Production Readiness Framework | EventArgs Engineering Insights`
- **Description**: `A practical evaluation framework for Microsoft 365 and Azure RAG copilots: golden test sets, authorization testing, citation validation, and CI/CD regression gates.`
- **Canonical URL**: `https://www.eventargs.llc/engineering-insights/enterprise-rag-evaluation-microsoft-365.html`
- **Publication Date**: `2026-08-25`
- **Reading Time**: `11 min read`
- **Topics**: `["RAG", "Evaluation", "Microsoft 365", "Azure"]`
- **CTA Label**: `Request a RAG Evaluation Sprint`
- **CTA Topic / Destination**: `contact.html?topic=rag-evaluation-sprint`

### 2.2 Structured Data (JSON-LD)
- Type: `BlogPosting`
- Context: `https://schema.org`
- Headline: `Enterprise RAG Evaluation for Microsoft 365: A Practical Production Readiness Framework`
- Author & Publisher: `EventArgs LLC`
- Main Entity: `https://www.eventargs.llc/engineering-insights/enterprise-rag-evaluation-microsoft-365.html`
- Keywords: `["RAG", "Evaluation", "Microsoft 365", "Azure"]`

---

## 3. Required File Modifications Plan

1. **`content/engineering-insights/enterprise-rag-evaluation-microsoft-365.md`** [NEW]
   - Frontmatter + summary abstract for catalog loader.
2. **`engineering-insights/enterprise-rag-evaluation-microsoft-365.html`** [NEW]
   - Complete styled HTML layout featuring metadata, sticky TOC (`data-insight-toc`), reading body (`insight-body`), responsive tables (`insight-table-wrap`), highlighted code blocks (`language-yaml`, `language-python`), cross-links, and contact CTA band.
3. **`engineering-insights.html`** [MODIFY]
   - Add new article card to the `insight-grid` in publication order.
4. **`public/sitemap.xml`** [MODIFY]
   - Add `<url>` entry for `https://www.eventargs.llc/engineering-insights/enterprise-rag-evaluation-microsoft-365.html` with lastmod `2026-08-25`.
5. **`vite.config.js`** [MODIFY]
   - Add `insightEvaluation: resolve(__dirname, 'engineering-insights/enterprise-rag-evaluation-microsoft-365.html')` to `rollupOptions.input`.
6. **`tests/insights-hub.test.js`** [MODIFY]
   - Update test expectations to verify the new article slug, title, sitemap entry, and HTML file assertions.

---

## 4. Verification & Validation Plan

- **Automated Verification**:
  - Execute `npm test` to ensure catalog loader, sitemap, HTML assertions, CTA contracts, and banned copy checks pass.
  - Execute `npm run build` to confirm clean Vite bundling and rollup transformation.
- **Visual & Layout Verification**:
  - Verify desktop, tablet, and mobile horizontal scrolling behavior for tables and code blocks.
  - Verify TOC navigation link generation (`data-insight-toc`).
  - Verify backlink to `/engineering-insights/designing-citation-grounded-rag-microsoft-365.html`.
  - Verify CTA query parameter handling (`/contact.html?topic=rag-evaluation-sprint`).
