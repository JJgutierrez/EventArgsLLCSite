***

## Goal

Upgrade the look, feel, and clarity of all pages on `eventargs.llc` to a modern, enterprise dark-mode experience while preserving the current messaging and multi-page structure. [eventargs](https://eventargs.llc/)

- Target visitor: IT directors, engineering leads, and Microsoft 365/Azure-heavy teams. [eventargs](https://www.eventargs.llc/)
- **Stack decision (locked):** Stay static — Vite multi-page HTML + Tailwind CSS + shared CSS/JS layout primitives. No React migration for this pass.
- **Theme decision (locked):** Enterprise dark as default — slate/charcoal surfaces with Azure-aligned blue accents (~#2563eb). No light-mode toggle in this pass.
- **Typography decision (locked):** IBM Plex Sans for headings and body (replace Outfit + Plus Jakarta Sans). Hierarchy via weight, size, and letter-spacing — not a second family.
- **Rollout decision (locked):** Wave 1 = homepage + contact + services (conversion path). Wave 2 = about + case studies (+ detail pages).
- **First-viewport decision (locked):** Hero + metrics only above the fold. Featured outcome banner and domain trust ribbon move below the fold (restyled, not removed).
- **Design approach (locked):** Atmospheric engineering — full-bleed dark hero with subtle depth, one-job sections, architecture proof visual, restrained CSS/JS motion. Not a quiet re-skin; not conversion-maximal clutter.
- Rationale: the site is brochure/conversion content; React adds JS weight and rewrite cost without meaningful wins for SEO, load, or conversion. Revisit React only if app-like interactive surfaces are needed later.
- Output: consistent design tokens, reusable static primitives (`ShellLayout`, `Section`, CTA classes), minimal polished motion (CSS / small vanilla JS), and clear fixed-scope offer paths. [tailwindcss](https://tailwindcss.com/docs/dark-mode)

***

## Phase 1 – Design System & Tokens

**Objective:** Establish a design system agents must follow before touching any page. [magicui](https://magicui.design/blog/tailwind-dark-mode)

1. **Create `design-system/DESIGN_SPEC.md`**
   - Document:
     - Color roles (background, surface, border, accent, success, warning, muted).
     - Typography stack: IBM Plex Sans for headings and body; hierarchy via weight/size/tracking (avoid Inter/Roboto/system defaults).
     - Spacing scale and radii.
   - Explicitly say: “Primary theme is slate/charcoal dark with Azure-aligned blue accents (around #2563eb), high contrast for body text, and minimal neutral grays.” [tailwindcss](https://tailwindcss.com/docs/dark-mode)

2. **Implement Tailwind theme on Vite**
   - Add Tailwind v4 (or current) to the existing Vite project.
   - Configure:
     - `dark` mode via class (`<html class="dark">`). [magicui](https://magicui.design/blog/tailwind-dark-mode)
     - `@theme` (or equivalent) tokens (e.g. `ea-bg`, `ea-surface`, `ea-accent`, `ea-muted`).
   - Add base typography utilities for headings, body, small, and “stat” text.
   - Migrate away from ad-hoc one-off CSS where tokens can replace it; keep `src/layout.js` as the shared shell injector.

3. **Set up core static UI primitives**
   - Build reusable HTML/CSS (and small JS helpers where needed) — not React/shadcn:
     - `ShellLayout` patterns in `src/layout.js` (header, main, footer, max-width container).
     - `Section` class variants: default, subtle, accent (standardized padding and background).
     - `btn-primary` / `btn-secondary` (PrimaryCTA / SecondaryCTA equivalents).
   - Motion without a React animation library:
     - CSS scroll-driven or IntersectionObserver fade-in/up for sections.
     - Soft hover/press transitions for buttons and interactive surfaces.

***

## Phase 2 – IDE & MCP Wiring

**Objective:** Make Cursor the control center that enforces the spec and auto-improves layouts.

1. **Configure MCP servers (Cursor)**
   - Use:
     - `Figma` MCP for reading design frames when present. [help.figma](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
     - `Playwright` MCP for layout verification and visual self-correction. [executeautomation.github](https://executeautomation.github.io/mcp-playwright/docs/intro)
     - Optional: `21st.dev` MCP for layout *inspiration* only — extract structure/spacing ideas and remimplement in static HTML + EventArgs Tailwind tokens (never paste React/shadcn wholesale).
   - Ensure `DESIGN_SPEC.md`, Tailwind entry/theme, `src/layout.js`, and `src/style.css` are always provided as context.

2. **Create SDD prompt contract**
   - In `DESIGN_SPEC.md`, define rules for agents:
     - Always respect design tokens and typography rules.
     - Stay static: no React, no SPA router, no component-framework migration unless explicitly approved.
     - Treat third-party UI patterns as references; remap to EventArgs tokens and existing HTML pages.
     - Use Figma frames as the layout source of truth when present.
     - After major changes, run Playwright MCP checks at multiple breakpoints and adjust spacing/overflow.

***

## Phase 3 – Homepage Refactor (eventargs.llc root)

**Objective:** Bring the current homepage up to the new system and improve clarity + visual hierarchy. [eventargs](https://eventargs.llc/)

1. **Hero + value metrics**
   - Rebuild hero using `Section` + `ShellLayout`:
     - Keep existing positioning: “Enterprise AI Engineering for Microsoft Ecosystems” and fixed-scope, senior-led messaging. [eventargs](https://www.eventargs.llc/)
     - First viewport = hero + metrics band only (75% / 60% / 4 weeks). Featured outcome and domain trust ribbon render below the fold.
     - Restyle the metrics band with design tokens; optionally borrow spacing/hierarchy ideas from reference patterns, then implement in static HTML.

2. **“Why Enterprise Teams Choose EventArgs”**
   - Convert current comparison into:
     - A lean, two-column comparison that is more visual, with strong headings and minimal text per bullet. [eventargs](https://www.eventargs.llc/)
     - Mobile-first stacked layout (CSS grid/flex), not card-framework components.

3. **Fixed-Scope Offers section**
   - Use a 3-column (stacking) layout for:
     - Internal Knowledge Copilot
     - Copilot Governance & Hardening
     - AI DevOps & PR Review Automation
   - Ensure each offer block has:
     - Clear outcome headline.
     - 3 concise bullets (as you already have). [eventargs](https://www.eventargs.llc/)
     - A “Discuss this engagement” sub-CTA or link to a feasibility call.

4. **Architecture proof section**
   - Introduce a new section showing a node-based architecture diagram:
     - Flow: “Docs & SharePoint → Ingestion & Chunking → Hybrid Vector Search → Policy & Guardrails → Copilot UI with citations.”
     - Design in Figma when useful; implement as responsive SVG or CSS grid via Tailwind. [developers.figma](https://developers.figma.com/docs/figma-mcp-server/)

5. **Case studies + process + testimonials**
   - Restyle current case studies and process steps:
     - Distinct sections with subtle CSS/JS motion.
     - Horizontal or vertical stepper for delivery (Feasibility → Blueprint → Sprints → Handoff).
   - Use Playwright MCP to ensure blocks don’t wrap awkwardly on tablet/mobile.

***

## Phase 4 – Global Conversion Path & Microcopy

**Objective:** Make the “technical feasibility call” path frictionless and visible across the site. [eventargs](https://www.eventargs.llc/)

1. **Primary CTA consistency**
   - Define a single primary CTA label: “Schedule a technical feasibility call.”
   - Ensure every major section has a visible CTA (hero, offers, case studies, bottom of page) using the shared `btn-primary` pattern.
   - Apply the same CTA label/pattern across other HTML pages (`services`, `contact`, case studies, etc.) as they are restyled.

2. **Microcopy audit**
   - Pass through all headings and subheadings and check for:
     - Clarity for non-AI-specialist IT leaders.
     - Focus on outcomes over implementation jargon while preserving trust-building details (.NET, LangGraph, MCP, Azure DevOps). [eventargs](https://eventargs.llc/)
   - Keep the existing strong copy but tighten redundant lines and ensure consistent tone.

***

## Phase 5 – Visual QA & Iteration Loop

**Objective:** Lock in the new look with automated visual checks and minor refinements.

1. **Playwright MCP visual passes**
   - Standard breakpoints: desktop 1440px, laptop 1024px, tablet 768px, mobile 390px.
   - For each breakpoint:
     - Capture screenshots / snapshots.
     - Fix: misaligned padding, inconsistent section spacing, poor line lengths, overlapping content or CTAs.

2. **Pattern polish (static adaptation)**
   - For any section that still feels plain:
     - Optionally review reference layouts (21st.dev or similar) for hierarchy ideas.
     - Reimplement with EventArgs tokens in static HTML — do not introduce React components.

3. **Figma sync**
   - Whenever a significant layout change is made in code, decide:
     - Either update Figma to match the live implementation, or
     - Re-sync code from a new Figma iteration via MCP.

***

## Phase 6 – Extend to Other Views (Wave 2)

**Wave 1 (this pass):** homepage + `services.html` + `contact.html` (conversion path).  
**Wave 2 (after Wave 1 ships):** `about.html`, `case-studies.html`, case-study detail pages, and any future pages.

- Reuse `ShellLayout`, `Section`, CTA classes, and the token set.
- Repeat the SDD loop: design/spec → static implementation → Playwright visual QA.
- Do **not** introduce React unless a future product surface clearly requires it.

***

## Out of scope (this pass)

- React / Next.js / SPA migration
- shadcn / Radix / Framer Motion as dependencies
- Wholesale replacement of messaging or offer structure
- Building authenticated or app-like product UI

***
