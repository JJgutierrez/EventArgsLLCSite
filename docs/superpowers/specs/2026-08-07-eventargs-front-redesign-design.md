# EventArgs Front Redesign — Design Spec

**Date:** 2026-08-07  
**Site:** https://www.eventargs.llc/  
**Status:** Approved  
**Companion roadmap:** `RoadmapFront.md`

## 1. Goal

Upgrade look, feel, and clarity of EventArgs LLC pages to a modern enterprise dark experience while preserving current messaging and multi-page structure.

**Audience:** IT directors, engineering leads, and Microsoft 365 / Azure-heavy teams.

**Success criteria:**
- Wave 1 pages feel cohesive under one dark token system
- First viewport is clearer (hero + metrics only)
- Primary CTA is consistent and obvious on conversion pages
- No React migration; static Vite site remains the delivery model

## 2. Locked decisions

| Decision | Choice |
|---|---|
| Stack | Static Vite multi-page HTML + Tailwind + shared CSS/JS primitives |
| Theme | Enterprise dark (slate/charcoal) + Azure blue accent `~#2563eb`; no light toggle |
| Typography | IBM Plex Sans for headings and body; hierarchy via weight/size/tracking |
| Rollout | Wave 1: home + services + contact. Wave 2: about + case studies (+ detail) |
| First viewport | Hero + metrics only; featured outcome + domain trust move below fold |
| Approach | Atmospheric engineering (not quiet re-skin, not conversion-maximal clutter) |

## 3. Out of scope

- React / Next.js / SPA migration
- shadcn, Radix, Framer Motion as dependencies
- Light-mode toggle
- Wave 2 page restyles until Wave 1 ships
- Messaging overhaul beyond CTA consistency and light copy tightening
- Authenticated or app-like product UI

## 4. Visual system & tokens

### 4.1 Color roles

| Token | Role | Target |
|---|---|---|
| `ea-bg` | Page background | Deep charcoal/slate ≈ `#0B1220` |
| `ea-surface` | Raised bands / form panels | ≈ `#121A2B` (one step above `ea-bg`) |
| `ea-border` | Dividers, offer block edges | ≈ `#243049` |
| `ea-accent` | Links, primary buttons, focus | `#2563eb` |
| `ea-accent-hover` | Interactive hover | ≈ `#3B82F6` |
| `ea-text` | Primary text | ≈ `#F1F5F9` |
| `ea-muted` | Secondary text | ≈ `#94A3B8` (keep WCAG-friendly contrast on `ea-bg`) |
| `ea-success` / `ea-warning` | Form feedback only | Not decorative accents |

**Atmosphere:** Subtle radial/linear gradient + faint technical grid in the **hero only**. No purple themes, no glow stacks, no neon.

### 4.2 Typography

- Family: **IBM Plex Sans** (headings + body)
- Display: semibold/bold, tight tracking
- Body: regular/medium, ~60–75ch measure
- Stat numerals: larger weight for metrics band
- Avoid Inter, Roboto, Arial, and anonymous system stacks as the primary face

### 4.3 Spacing, radius, layout

- Section padding scale (approx.): generous desktop (e.g. 4 / 6 / 8rem), reduced on mobile
- Radii: 6–12px (professional; avoid pill-heavy UI)
- Content max-width: ~1100–1200px
- Hero: full-bleed visual plane behind content (not an inset media card)

### 4.4 Static primitives

| Primitive | Implementation |
|---|---|
| `ShellLayout` | Existing `src/layout.js` header/main/footer injector, restyled |
| `Section` | Variants: `default` \| `subtle` \| `accent` |
| Primary / secondary CTA | Shared `btn-primary` / `btn-secondary` classes |
| Motion helper | Small vanilla JS + CSS; IntersectionObserver fade-up |

## 5. Homepage composition

Preserve messaging; tighten hierarchy.

### 5.1 First viewport

1. Full-bleed dark hero — brand/name as a strong signal (not only nav text)
2. One headline: “Enterprise AI Engineering for Microsoft Ecosystems”
3. One support line (fixed-scope, senior-led)
4. One CTA group:
   - Primary: **Schedule a technical feasibility call**
   - Secondary: explore fixed-scope pilots / services
5. Metrics band (75% / 60% / 4 weeks) immediately under hero — still in first viewport on desktop

### 5.2 Below the fold (order)

1. Featured outcome + domain trust (restyled, quieter)
2. Why EventArgs — lean two-column comparison; stacks on mobile
3. Fixed-scope offers — three offer blocks (border/spacing for scanability; avoid heavy card chrome)
4. Architecture proof — Docs & SharePoint → Ingestion & Chunking → Hybrid Vector Search → Policy & Guardrails → Copilot UI with citations (SVG or CSS grid; stacks on mobile)
5. Case studies + process stepper (Feasibility → Blueprint → Sprints → Handoff)
6. Closing CTA band with the same primary label

### 5.3 Section rules

- One job per section: one headline + short support line
- No pill clusters, floating hero badges, or extra stat strips outside the metrics band
- Keep existing copy; trim redundancy only where tone stays intact

## 6. Services + Contact (Wave 1)

### 6.1 Shared shell

Same dark shell, tokens, type, and CTA classes as homepage. Restyle `layout.js` once; apply across Wave 1 pages.

### 6.2 Services

- Outcome-focused intro; keep fixed-scope pilots framing
- Three engagements matching homepage offer structure: outcome headline, 3 bullets, “Discuss this engagement” → contact (optional context via query/hash)
- Persistent primary CTA label as defined below
- No new offer types in this pass

### 6.3 Contact

- Single job: book the technical feasibility call
- Form on `ea-surface` with high-contrast labels, accent focus rings, success/error via status tokens
- Keep `api/contact.js` behavior; visual/UX only unless a small a11y fix is required
- Short trust line under the form; no extra marketing sections

### 6.4 CTA contract

- Primary label (exact): `Schedule a technical feasibility call`
- Secondary: contextual (`Explore fixed-scope pilots`, etc.)
- Use shared `btn-primary` in hero, offers, and page bottoms

## 7. Motion

Exactly three intentional moments:

1. Hero content: short fade/rise on load (once)
2. Sections: light fade-up on scroll via IntersectionObserver
3. Buttons / offer rows: CSS hover/press only

Respect `prefers-reduced-motion: reduce` (disable non-essential motion).

## 8. Agent / MCP contract

- Always respect tokens and typography in `design-system/DESIGN_SPEC.md` (to be created in implementation)
- Stay static: no React/SPA unless explicitly approved
- Third-party UI patterns (e.g. 21st.dev) are **inspiration only** — reimplement in static HTML + EventArgs tokens
- Figma frames are layout source of truth when present
- After major changes, run Playwright checks at 1440 / 1024 / 768 / 390 and fix overflow, spacing, CTA visibility, and mobile architecture stacking

## 9. Delivery sequence (for implementation plan)

1. Write `design-system/DESIGN_SPEC.md` and wire Tailwind tokens on Vite
2. Build/restyle primitives: shell, sections, CTAs, motion helper
3. Homepage refactor per §5
4. Services + contact per §6
5. Microcopy pass (CTA label + light trim)
6. Playwright visual QA loop
7. Wave 2 (separate plan): about + case studies

## 10. Testing

- Manual + Playwright MCP visual passes on Wave 1 pages
- Verify reduced-motion path
- Verify contact form still submits via existing API
- Confirm primary CTA label consistency across Wave 1

## 11. Relationship to `RoadmapFront.md`

This spec is the design source of truth for Wave 1. `RoadmapFront.md` remains the phased execution roadmap and must stay aligned with these locked decisions.
