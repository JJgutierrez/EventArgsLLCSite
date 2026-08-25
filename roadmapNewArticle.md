# Roadmap: Publish Enterprise RAG Evaluation Article

**Project:** EventArgs LLC website  
**Method:** Specification-Driven Development (SDD)  
**Status:** Proposed  
**Implementation scope:** New Engineering Insights article and required discovery updates

## 1. Goal

Publish the article:

> Enterprise RAG Evaluation for Microsoft 365: A Practical Production Readiness Framework

The new page must match the established EventArgs Engineering Insights structure, visual language, responsive behavior, metadata conventions, internal-link patterns, and deployment workflow.

This work must not introduce a new design system, CSS framework, rendering approach, or routing convention. It must reuse the repository’s existing implementation patterns.

## 2. Acceptance Criteria

The work is complete only when all conditions below are true:

- A new article page is available at the approved final URL.
- The article uses the same header, footer, typography, spacing, cards, tables, code blocks, CTA treatment, and responsive behavior as the existing Engineering Insights articles.
- The article is discoverable from the Engineering Insights hub.
- Internal links resolve correctly in the local production build.
- Metadata, canonical URL, social metadata, and structured data follow existing site conventions.
- Sitemap behavior is updated only if the repository uses a manually maintained sitemap.
- The build, linting, and existing automated checks pass.
- The article is visually reviewed at mobile, tablet, and desktop widths.
- No unverified framework, file-path, component, or CSS assumptions are introduced.

## 3. Discovery Phase

Before editing files, inspect the repository and document findings in:

`specs/implementation/publish-enterprise-rag-evaluation-article-spec.md`

### 3.1 Required repository inspection

Identify and record:

- Package manager and build commands from `package.json`.
- Framework and renderer in use: static HTML, Vite, React, Astro, Next.js, or another implementation.
- CSS and styling approach: Tailwind, custom CSS, CSS modules, component library, or another approach.
- Source location for the Engineering Insights hub.
- Source location and routing convention for individual article pages.
- The current reusable article template or closest matching article.
- Current header, footer, CTA, table, code-block, tag, and metadata patterns.
- Sitemap ownership: generated at build/deploy time or maintained manually.
- Whether `robots.txt` is static, generated, or contains a sitemap directive.
- Existing JSON-LD type and fields used by other articles.
- Existing reading-time calculation method, if any.
- Existing validation commands: build, lint, tests, link checker, and formatting.

### 3.2 Source-of-truth reference article

Use the closest existing RAG article as the structural and visual reference:

`/engineering-insights/designing-citation-grounded-rag-microsoft-365.html`

The new article should link back to:

`/engineering-insights/designing-citation-grounded-rag-microsoft-365.html`

Do not use `secure-sharepoint-rag-architecture.html` unless repository inspection confirms that page exists and is the intended canonical destination.

## 4. Content Contract

### 4.1 Proposed route

Proposed route:

`/engineering-insights/enterprise-rag-evaluation-microsoft-365.html`

Confirm this route conforms to the existing routing and filename pattern before implementation.

### 4.2 Metadata contract

Use the site’s established metadata format. Proposed values:

- **Title:** Enterprise RAG Evaluation for Microsoft 365: A Practical Production Readiness Framework | EventArgs Engineering Insights
- **Description:** A practical evaluation framework for Microsoft 365 and Azure RAG copilots: golden test sets, authorization testing, citation validation, and CI/CD regression gates.
- **Canonical URL:** `https://www.eventargs.llc/engineering-insights/enterprise-rag-evaluation-microsoft-365.html`
- **Tags:** RAG, Evaluation, Microsoft 365, Azure
- **Publication date:** Use the actual publication date at deployment time.
- **Reading time:** Calculate from final rendered content using the project’s existing convention.

### 4.3 Structured data

Follow the existing article schema convention.

If no established convention exists, add one standards-compliant `TechArticle` or `BlogPosting` JSON-LD object with:

- `@context`
- `@type`
- `headline`
- `description`
- `datePublished`
- `dateModified`
- `author`
- `publisher`
- `mainEntityOfPage`
- `image`, only if a valid page image already exists
- `keywords`, if consistent with the rest of the site

Do not invent an image, author URL, logo URL, or schema field that is not supported by current site assets and content.

### 4.4 Required article sections

Use the approved Markdown article as the content source. Preserve its technical distinctions:

1. Why “It Answered Correctly Once” Fails
2. Build a 40-Question Golden Set
3. Measure the Pipeline, Not Just Answers
4. Failure Cases to Test Before Rollout
5. Put Evaluation in CI/CD
6. Validate the Real Authorization Path
7. Evaluation Must Be Versioned
8. Hardening Before Deployment

Implementation requirements:

- Render tables using the project’s existing responsive table pattern.
- Render YAML and Python as accessible syntax-highlighted code blocks using the existing code-block approach.
- Keep the code examples labeled as illustrative.
- Use semantic headings in a single logical hierarchy.
- Preserve inline math notation only if the project supports it; otherwise express metrics as plain text, such as “Recall at K.”
- Ensure the CTA matches the existing EventArgs contact-banner design.

## 5. Internal Linking Contract

### 5.1 Required links

- Backlink to the existing citation-grounded RAG article:  
  `/engineering-insights/designing-citation-grounded-rag-microsoft-365.html`
- CTA destination:  
  `/contact.html?topic=rag-evaluation-sprint`
- Engineering Insights hub:  
  Use the existing repository route and link convention.

### 5.2 Link quality rules

- Do not create links to pages not confirmed in the repository.
- Use existing internal-link conventions: absolute root-relative or relative paths, as established by the project.
- Validate all article links after the production build.
- Confirm query-string handling on the contact page before relying on the CTA topic parameter.

## 6. Implementation Plan

### Phase 1: Write the specification

Create:

`specs/implementation/publish-enterprise-rag-evaluation-article-spec.md`

Include:

- Repository discovery findings
- Confirmed file locations
- Confirmed framework and build commands
- Final route and URL
- Metadata payload
- JSON-LD decision
- Hub-card specification
- Sitemap decision
- Validation plan
- Rollback plan

**Exit criterion:** No implementation assumption remains unverified.

### Phase 2: Create the article page

- Duplicate or adapt the confirmed article template.
- Add the approved article content.
- Reuse existing layout, semantic HTML, classes, components, and responsive conventions.
- Add metadata, canonical URL, Open Graph tags, and JSON-LD only in the pattern used by current pages.
- Add the existing contact CTA component or markup pattern.
- Ensure code blocks can scroll horizontally on narrow viewports without causing page-wide horizontal overflow.

**Exit criterion:** The page renders locally with visual parity to the reference article.

### Phase 3: Update hub and discovery

- Add the article card to the Engineering Insights hub using the current card structure.
- Place it according to the project’s existing ordering rule, such as publication date descending.
- Use this hub-card summary:

  > Golden test sets, authorization isolation, citation validation, and CI/CD regression gates for enterprise RAG copilots.

- Update `sitemap.xml` only if inspection confirms it is manually maintained.
- Do not edit `robots.txt` unless required by the project’s actual crawl or sitemap configuration.

**Exit criterion:** The hub links to the article and discovery files match current project conventions.

### Phase 4: Verify and review

Run the project’s confirmed commands. At minimum:

```bash
npm run build
```

Also run any repository-provided commands for linting, tests, formatting, and link validation.

Perform manual checks:

- Desktop viewport
- Tablet viewport
- Narrow mobile viewport
- Dark and light modes, only if the current site supports both
- Long table overflow behavior
- YAML and Python code-block readability
- Header and footer parity
- Article hub-card appearance
- Canonical URL and Open Graph output
- JSON-LD validation
- Internal links and contact CTA query parameter

**Exit criterion:** Build passes, no broken links are found, and visual review confirms parity with the current site.

## 7. Deliverables

- New article source file at the confirmed route.
- Updated Engineering Insights hub source.
- Updated sitemap only if applicable.
- Specification document with discovery results.
- Screenshot or written verification notes for responsive review.
- Pull request containing a concise test summary.

## 8. Pull Request Checklist

- [ ] Article path matches established project convention.
- [ ] Article matches the existing Engineering Insights visual system.
- [ ] Metadata and canonical URL are correct.
- [ ] Publication date reflects actual release date.
- [ ] Reading time is calculated, not guessed.
- [ ] JSON-LD matches the site’s established schema pattern.
- [ ] Hub card is present and uses existing component/styling conventions.
- [ ] All internal links resolve in the production build.
- [ ] Sitemap is updated only when manual maintenance is required.
- [ ] `robots.txt` is unchanged unless inspection documented a required change.
- [ ] Build, lint, test, and link-validation commands pass.
- [ ] Mobile, tablet, and desktop rendering have been reviewed.

## 9. Antigravity IDE Execution Prompt

> First inspect the repository and create the SDD specification at `specs/implementation/publish-enterprise-rag-evaluation-article-spec.md`. Do not modify production website files until the specification documents the actual framework, styling system, article template, hub source, sitemap ownership, robots configuration, routing convention, and validation commands. Use the existing RAG article as the source-of-truth design reference. Reuse existing components and styling; do not introduce a new framework, dependency, or design pattern. After the spec is complete, implement only the approved file changes, run the confirmed validation commands, and report each changed file, build result, link-check result, and visual-review result.
