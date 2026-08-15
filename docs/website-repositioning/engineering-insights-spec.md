# Engineering Insights Specification

**Status:** Approved  
**Public Route:** `/engineering-insights`  
**Nav Label:** `Engineering Insights`  
**SEO Title Pattern:** `{Article Title} | Engineering Insights | EventArgs LLC`

---

## 1. Information Architecture & Navigation

- **Desktop Nav Order:** Home | Services | Engineering Insights | Case Studies | About | Find your AI fit | Schedule call CTA
- **Mobile Nav Order:** Home | Services | Engineering Insights | Case Studies | About | Find your AI fit | Schedule call CTA
- **Footer Placement:** Present under both Services & Company links.

---

## 2. Hub Content Model & Metadata

Every article page must include:
- `H1` Title & Subtitle / Short Summary
- Author Byline: `EventArgs LLC Engineering Team`
- Publish & Updated Dates
- Estimated Reading Time
- Open Graph (`og:title`, `og:description`, `og:url`, `og:type="article"`)
- Canonical URL pointing to `https://www.eventargs.llc/engineering-insights/{slug}`
- Targeted Consultation CTA at bottom (routing to `/contact.html?topic={service-topic}`)

---

## 3. Initial Article Backlog

| Priority | Article Slug | Title | Targeted CTA Link |
|---|---|---|---|
| P0 | `designing-citation-grounded-rag-microsoft-365` | Designing Citation-Grounded RAG for Microsoft 365: Permissions, Retrieval, and Evidence | `/contact.html?topic=rag-architecture-review` |
| P0 | `why-enterprise-rag-pilots-fail` | Why Enterprise RAG Pilots Fail After the Demo | `/contact.html?topic=rag-architecture-review` |
| P0 | `ai-assisted-pr-review-azure-devops` | AI-Assisted PR Review in Azure DevOps: Approval Gates, Traceability, and Safe Adoption | `/contact.html?topic=ai-workflow-devops` |
