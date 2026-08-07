# EventArgs Front Redesign (Wave 1) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver an atmospheric enterprise-dark redesign for homepage, services, and contact on the existing static Vite site (no React), with shared tokens, shell, CTAs, and restrained motion.

**Architecture:** Keep multi-page HTML + `src/layout.js` shell injection. Add Tailwind v4 via the Vite plugin for tokens/utilities, migrate visual system into `src/style.css` (`@theme` + primitives), add a tiny `src/motion.js` helper, and refactor Wave 1 HTML to the approved composition. Verify with Node tests (CTA/token contracts) + `vite build` + Playwright MCP breakpoint passes.

**Tech Stack:** Vite 8, Tailwind CSS v4 (`@tailwindcss/vite`), vanilla HTML/CSS/JS, Node built-in test runner (`node --test`), Playwright MCP for visual QA. No React, shadcn, Radix, or Framer Motion.

## Global Constraints

- Stack stays static: Vite multi-page HTML + Tailwind + shared CSS/JS — no React/SPA
- Theme: enterprise dark; `ea-bg` `#0B1220`, `ea-surface` `#121A2B`, `ea-border` `#243049`, `ea-accent` `#2563eb`, `ea-accent-hover` `#3B82F6`, `ea-text` `#F1F5F9`, `ea-muted` `#94A3B8`
- Typography: IBM Plex Sans only (headings + body)
- Primary CTA label (exact): `Schedule a technical feasibility call`
- First viewport: hero + metrics only; featured outcome + domain trust below fold
- Wave 1 pages only for structural refactor: `index.html`, `services.html`, `contact.html` (+ shared `src/*`)
- Wave 2 pages (`about.html`, `case-studies.html`, case-study detail) may inherit dark tokens via global CSS but must not be structurally redesigned in this plan
- Atmosphere: subtle hero gradient/grid only; no purple, no glow stacks, no neon
- Motion: exactly 3 intentional moments; honor `prefers-reduced-motion`
- Spec source of truth: `docs/superpowers/specs/2026-08-07-eventargs-front-redesign-design.md`
- Roadmap companion: `RoadmapFront.md`

---

## File structure (locked)

| File | Responsibility |
|---|---|
| `design-system/DESIGN_SPEC.md` | Agent-facing token/primitive/CTA contract |
| `package.json` | Add Tailwind + test script |
| `vite.config.js` | Register `@tailwindcss/vite` plugin |
| `src/style.css` | `@import "tailwindcss"`, `@theme` tokens, base, primitives, page styles |
| `src/cta.js` | Exported primary CTA label constant + helper for nav/footer |
| `src/motion.js` | Hero load + section fade-up; reduced-motion safe |
| `src/layout.js` | Shell header/footer; use CTA constant; dark-ready markup |
| `src/main.js` | Import CSS, init layout + motion |
| `index.html` | Homepage composition per spec §5 |
| `services.html` | Services restyle per spec §6.2 |
| `contact.html` | Contact restyle per spec §6.3 |
| `tests/cta-contract.test.js` | Assert CTA label + Wave 1 file usage |
| `tests/tokens-contract.test.js` | Assert token values exist in CSS |
| `scripts/visual-qa.md` | Playwright breakpoint checklist for agents |

---

### Task 1: Design-system doc + Tailwind tokens + CTA contract tests

**Files:**
- Create: `design-system/DESIGN_SPEC.md`
- Create: `src/cta.js`
- Create: `tests/cta-contract.test.js`
- Create: `tests/tokens-contract.test.js`
- Modify: `package.json`
- Modify: `vite.config.js`
- Modify: `src/style.css` (replace light `:root` theme with Tailwind + dark `@theme`; keep temporarily unused legacy class hooks if needed so Wave 2 does not crash)
- Modify: Wave 1 HTML `<html>` tags to `class="dark"` (index/services/contact) — also set on all HTML pages so shell/tokens are consistent: `index.html`, `services.html`, `contact.html`, `about.html`, `case-studies.html`, `case-study-knowledge-copilot.html`

**Interfaces:**
- Consumes: none
- Produces:
  - `export const PRIMARY_CTA_LABEL = 'Schedule a technical feasibility call'`
  - `export const PRIMARY_CTA_HREF = '/contact.html'`
  - CSS theme tokens: `--color-ea-bg`, `--color-ea-surface`, `--color-ea-border`, `--color-ea-accent`, `--color-ea-accent-hover`, `--color-ea-text`, `--color-ea-muted`, `--color-ea-success`, `--color-ea-warning`
  - Utility-facing colors via Tailwind: `bg-ea-bg`, `text-ea-text`, `bg-ea-accent`, etc.

- [ ] **Step 1: Write failing CTA contract test**

Create `tests/cta-contract.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { PRIMARY_CTA_LABEL, PRIMARY_CTA_HREF } from '../src/cta.js'

test('PRIMARY_CTA_LABEL is exact contract string', () => {
  assert.equal(PRIMARY_CTA_LABEL, 'Schedule a technical feasibility call')
})

test('PRIMARY_CTA_HREF points to contact', () => {
  assert.equal(PRIMARY_CTA_HREF, '/contact.html')
})

test('Wave 1 pages include primary CTA label', () => {
  for (const file of ['index.html', 'services.html', 'contact.html']) {
    const html = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
    assert.match(html, /Schedule a technical feasibility call/)
  }
})
```

- [ ] **Step 2: Write failing tokens contract test**

Create `tests/tokens-contract.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const css = () => readFileSync(new URL('../src/style.css', import.meta.url), 'utf8')

test('style.css imports tailwind', () => {
  assert.match(css(), /@import\s+["']tailwindcss["']/)
})

test('required ea color tokens exist with locked values', () => {
  const source = css()
  const required = {
    'ea-bg': '#0B1220',
    'ea-surface': '#121A2B',
    'ea-border': '#243049',
    'ea-accent': '#2563eb',
    'ea-accent-hover': '#3B82F6',
    'ea-text': '#F1F5F9',
    'ea-muted': '#94A3B8',
  }
  for (const [name, value] of Object.entries(required)) {
    assert.match(
      source,
      new RegExp(`${name}[^\\n]*${value.replace('#', '#')}`, 'i'),
      `missing token ${name}=${value}`,
    )
  }
})

test('IBM Plex Sans is the font family', () => {
  assert.match(css(), /IBM Plex Sans/)
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `node --test tests/cta-contract.test.js tests/tokens-contract.test.js`  
Expected: FAIL (module/CSS/HTML contracts missing)

- [ ] **Step 4: Install Tailwind and wire Vite**

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Update `vite.config.js`:

```js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        caseStudies: resolve(__dirname, 'case-studies.html'),
        caseStudyKnowledgeCopilot: resolve(__dirname, 'case-study-knowledge-copilot.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
```

Add to `package.json` scripts:

```json
"test": "node --test tests/**/*.test.js"
```

- [ ] **Step 5: Create `src/cta.js`**

```js
export const PRIMARY_CTA_LABEL = 'Schedule a technical feasibility call'
export const PRIMARY_CTA_HREF = '/contact.html'
```

- [ ] **Step 6: Write `design-system/DESIGN_SPEC.md`**

Include locked tokens table, IBM Plex Sans rule, section variants (`section`, `section--subtle`, `section--accent`), button classes (`btn`, `btn-primary`, `btn-secondary`), CTA contract, motion rules, agent rules (static only; remap third-party patterns; Playwright breakpoints 1440/1024/768/390). Copy values verbatim from the design spec.

- [ ] **Step 7: Replace theme foundation in `src/style.css`**

At top of `src/style.css`, replace the Google Fonts Outfit/Jakarta import and light `:root` block with:

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

@theme {
  --color-ea-bg: #0B1220;
  --color-ea-surface: #121A2B;
  --color-ea-border: #243049;
  --color-ea-accent: #2563eb;
  --color-ea-accent-hover: #3B82F6;
  --color-ea-text: #F1F5F9;
  --color-ea-muted: #94A3B8;
  --color-ea-success: #22c55e;
  --color-ea-warning: #f59e0b;
  --font-sans: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
  --radius-sm: 6px;
  --radius-md: 12px;
  --max-width-content: 1120px;
}

:root {
  --bg-primary: var(--color-ea-bg);
  --bg-secondary: var(--color-ea-surface);
  --bg-card: var(--color-ea-surface);
  --text-primary: var(--color-ea-text);
  --text-secondary: var(--color-ea-muted);
  --text-light: var(--color-ea-text);
  --accent: var(--color-ea-accent);
  --accent-light: color-mix(in srgb, var(--color-ea-accent) 16%, transparent);
  --accent-hover: var(--color-ea-accent-hover);
  --border: var(--color-ea-border);
  --border-focus: var(--color-ea-accent);
  --success: var(--color-ea-success);
  --font-heading: var(--font-sans);
  --font-body: var(--font-sans);
  --max-width: var(--max-width-content);
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 0 rgba(255, 255, 255, 0.03);
  --shadow-md: 0 12px 40px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 24px 60px rgba(0, 0, 0, 0.45);
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

html.dark,
html {
  color-scheme: dark;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

Keep the rest of existing component CSS for now so the site still builds; later tasks restyle primitives/pages. Map any remaining light-only assumptions (white cards, dark text on light) so defaults are dark-readable.

- [ ] **Step 8: Add `class="dark"` on all page `<html>` elements**

Example: `<html lang="en" class="dark">` in every HTML entry listed above.

- [ ] **Step 9: Temporarily satisfy CTA HTML test for this task**

In `index.html`, `services.html`, and `contact.html`, ensure the exact string `Schedule a technical feasibility call` appears at least once (nav will be updated in Task 2; pages can use a visible primary button or closing CTA). Prefer updating the most obvious primary CTA on each page now so tests pass; Task 5/6 will finish microcopy consistency.

- [ ] **Step 10: Run tests and build**

Run:
```bash
npm test
npm run build
```
Expected: tests PASS; build succeeds.

- [ ] **Step 11: Commit**

```bash
git add design-system/DESIGN_SPEC.md src/cta.js src/style.css package.json package-lock.json vite.config.js tests index.html services.html contact.html about.html case-studies.html case-study-knowledge-copilot.html
git commit -m "$(cat <<'EOF'
feat: add dark design tokens, Tailwind, and CTA contract

EOF
)"
```

---

### Task 2: Shell, section/button primitives, and motion helper

**Files:**
- Create: `src/motion.js`
- Modify: `src/layout.js`
- Modify: `src/main.js`
- Modify: `src/style.css` (`.section*`, `.btn*`, header/footer, hero atmosphere utilities)
- Modify: `tests/cta-contract.test.js` (assert layout.js embeds primary CTA label)

**Interfaces:**
- Consumes: `PRIMARY_CTA_LABEL`, `PRIMARY_CTA_HREF` from `src/cta.js`
- Produces:
  - `export function initMotion(root = document): void`
  - `export function initLayout(): void` (existing; now CTA-aware)
  - CSS classes: `.section`, `.section--subtle`, `.section--accent`, `.btn`, `.btn-primary`, `.btn-secondary`, `.hero--atmosphere`, `.reveal`, `.reveal.is-visible`

- [ ] **Step 1: Extend CTA test for layout shell**

Add to `tests/cta-contract.test.js`:

```js
test('layout.js nav CTA uses PRIMARY_CTA_LABEL', async () => {
  const layout = readFileSync(new URL('../src/layout.js', import.meta.url), 'utf8')
  assert.match(layout, /PRIMARY_CTA_LABEL/)
  assert.match(layout, /PRIMARY_CTA_HREF/)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/cta-contract.test.js`  
Expected: FAIL on layout.js assertion

- [ ] **Step 3: Update `src/layout.js` to import CTA constants**

```js
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from './cta.js'

export function initLayout() {
  const app = document.getElementById('app')
  if (!app) return

  const header = document.createElement('header')
  header.className = 'site-header'
  header.innerHTML = `
    <div class="container nav-container">
      <a href="/" class="logo">EventArgs<span>LLC</span></a>
      <button class="menu-toggle" aria-label="Toggle Menu" type="button">
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <nav id="nav-menu">
        <ul>
          <li><a href="/" data-link="home">Home</a></li>
          <li><a href="/services.html" data-link="services">Services</a></li>
          <li><a href="/case-studies.html" data-link="case-studies">Case Studies</a></li>
          <li><a href="/about.html" data-link="about">About</a></li>
          <li><a href="/qualify" data-link="qualify">Find your AI fit</a></li>
          <li><a href="${PRIMARY_CTA_HREF}" class="btn btn-primary btn-nav" data-link="contact">${PRIMARY_CTA_LABEL}</a></li>
        </ul>
      </nav>
    </div>
  `
  document.body.insertBefore(header, app)

  const footer = document.createElement('footer')
  footer.className = 'site-footer'
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-logo">EventArgs<span>LLC</span></div>
          <p class="footer-desc">Senior-led AI engineering consultancy building secure, grounded internal knowledge copilots and automated developer workflows.</p>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="/services.html#copilot">Knowledge Copilots</a></li>
            <li><a href="/services.html#governance">AI Governance</a></li>
            <li><a href="/services.html#devops">AI DevOps</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <ul>
            <li><a href="/about.html">About</a></li>
            <li><a href="/case-studies.html">Case Studies</a></li>
            <li><a href="/qualify">Find your AI fit</a></li>
            <li><a href="${PRIMARY_CTA_HREF}">${PRIMARY_CTA_LABEL}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} EventArgs LLC. All rights reserved.</p>
        <p>Grounded Answers. Safer Rollout.</p>
      </div>
    </div>
  `
  document.body.appendChild(footer)

  const currentPath = window.location.pathname
  header.querySelectorAll('nav a').forEach((link) => {
    const href = link.getAttribute('href')
    if (href === currentPath || (currentPath === '/' && href === '/') || (href !== '/' && currentPath.endsWith(href))) {
      link.classList.add('active')
    }
  })

  const menuToggle = header.querySelector('.menu-toggle')
  const navMenu = header.querySelector('#nav-menu')
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'))
  }

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20)
  })
}
```

- [ ] **Step 4: Create `src/motion.js`**

```js
export function initMotion(root = document) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const hero = root.querySelector('[data-motion="hero"]')
  if (hero) {
    if (reduce) hero.classList.add('is-visible')
    else requestAnimationFrame(() => hero.classList.add('is-visible'))
  }

  if (reduce) {
    root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  )

  root.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
}
```

- [ ] **Step 5: Update `src/main.js`**

```js
import './style.css'
import { initLayout } from './layout.js'
import { initMotion } from './motion.js'

initLayout()
initMotion()
```

- [ ] **Step 6: Add primitive CSS**

In `src/style.css`, ensure buttons/sections/header/footer/hero atmosphere match dark tokens. Required rules (adapt into file; replace conflicting light `.btn-primary` / `.hero` blocks):

```css
.section {
  padding: clamp(3rem, 6vw, 6rem) 0;
  background: var(--color-ea-bg);
}

.section--subtle {
  background: var(--color-ea-surface);
  border-top: 1px solid var(--color-ea-border);
  border-bottom: 1px solid var(--color-ea-border);
}

.section--accent {
  background:
    radial-gradient(1200px 400px at 50% -10%, color-mix(in srgb, var(--color-ea-accent) 18%, transparent), transparent 70%),
    var(--color-ea-bg);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.35rem;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid transparent;
  transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast), color var(--transition-fast);
}

.btn:active {
  transform: translateY(1px);
}

.btn-primary {
  background: var(--color-ea-accent);
  color: #fff;
}

.btn-primary:hover {
  background: var(--color-ea-accent-hover);
  color: #fff;
}

.btn-secondary {
  background: transparent;
  color: var(--color-ea-text);
  border-color: var(--color-ea-border);
}

.btn-secondary:hover {
  border-color: color-mix(in srgb, var(--color-ea-accent) 55%, var(--color-ea-border));
  color: #fff;
}

.hero--atmosphere {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(900px 480px at 70% -10%, color-mix(in srgb, var(--color-ea-accent) 22%, transparent), transparent 60%),
    linear-gradient(180deg, #0E1729 0%, var(--color-ea-bg) 70%);
}

.hero--atmosphere::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--color-ea-border) 55%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--color-ea-border) 55%, transparent) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, rgba(0,0,0,.55), transparent 75%);
  pointer-events: none;
  opacity: 0.35;
}

[data-motion="hero"],
.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-motion="hero"].is-visible,
.reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  [data-motion="hero"],
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

Also restyle `.site-header`, `.logo`, `.site-footer`, `.container` for dark surfaces and readable nav.

- [ ] **Step 7: Run tests and build**

```bash
npm test
npm run build
```
Expected: PASS / build OK. Smoke `npm run dev` and confirm header CTA text matches contract.

- [ ] **Step 8: Commit**

```bash
git add src/layout.js src/motion.js src/main.js src/style.css tests/cta-contract.test.js
git commit -m "$(cat <<'EOF'
feat: restyle shell primitives and add motion helper

EOF
)"
```

---

### Task 3: Homepage first viewport (hero + metrics)

**Files:**
- Modify: `index.html` (hero through metrics band only)
- Modify: `src/style.css` (`.metrics-bar`, hero type hierarchy)

**Interfaces:**
- Consumes: `.hero--atmosphere`, `.btn-primary`, `.btn-secondary`, `data-motion="hero"`
- Produces: first-viewport markup order locked as hero → metrics

- [ ] **Step 1: Write structural assertion test**

Create `tests/homepage-fold.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = () => readFileSync(new URL('../index.html', import.meta.url), 'utf8')

test('hero appears before metrics and before outcome/trust', () => {
  const source = html()
  const hero = source.indexOf('class="hero hero--atmosphere"')
  const metrics = source.indexOf('class="metrics-bar"')
  const outcome = source.indexOf('outcome-banner')
  const trust = source.indexOf('domain-trust-ribbon')
  assert.ok(hero !== -1 && metrics !== -1 && outcome !== -1 && trust !== -1)
  assert.ok(hero < metrics, 'hero before metrics')
  assert.ok(metrics < outcome, 'metrics before outcome')
  assert.ok(outcome < trust || trust > metrics, 'trust below metrics')
  assert.ok(metrics < trust, 'metrics before trust')
})

test('hero primary CTA uses contract label and contact href', () => {
  const source = html()
  assert.match(
    source,
    /href="\/contact\.html"[^>]*class="[^"]*btn-primary[^"]*"[^>]*>\s*Schedule a technical feasibility call/,
  )
})
```

- [ ] **Step 2: Run test to verify fail/pass baseline**

Run: `node --test tests/homepage-fold.test.js`  
Expected: likely FAIL until markup updated

- [ ] **Step 3: Rewrite homepage hero + metrics in `index.html`**

Replace the current hero + metrics blocks with:

```html
<section class="hero hero--atmosphere">
  <div class="container hero-inner" data-motion="hero">
    <p class="brand-mark">EventArgs LLC</p>
    <h1>Enterprise AI Engineering for Microsoft Ecosystems.</h1>
    <p class="lead">Production-grade RAG, governance, and workflow automation built on Azure and Microsoft 365. Fixed-scope, senior-led delivery.</p>
    <div class="hero-ctas">
      <a href="/contact.html" class="btn btn-primary">Schedule a technical feasibility call</a>
      <a href="/services.html" class="btn btn-secondary">Explore fixed-scope pilots</a>
    </div>
  </div>
</section>

<div class="metrics-bar" aria-label="Delivery outcomes">
  <div class="container metrics-container">
    <div class="metric-item">
      <div class="metric-number">75%</div>
      <div class="metric-label">Reduction in internal lookup time</div>
    </div>
    <div class="metric-item">
      <div class="metric-number">60%</div>
      <div class="metric-label">Reduction in repetitive triage</div>
    </div>
    <div class="metric-item">
      <div class="metric-number">4 Weeks</div>
      <div class="metric-label">Flagship pilot delivery (fixed-scope)</div>
    </div>
  </div>
</div>
```

Keep `outcome-banner` and `domain-trust-ribbon` immediately after metrics (below fold). Remove the old `hero-tag` eyebrow-as-primary pattern; brand mark is the hero brand signal.

- [ ] **Step 4: Style metrics for dark first viewport**

Update `.metrics-bar` / `.metric-number` in `src/style.css` to sit on `ea-surface`, use `ea-border` separators, large IBM Plex stat numerals, and remain visually attached under the hero on desktop.

- [ ] **Step 5: Run tests + build**

```bash
npm test
npm run build
```
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add index.html src/style.css tests/homepage-fold.test.js
git commit -m "$(cat <<'EOF'
feat: rebuild homepage hero and metrics first viewport

EOF
)"
```

---

### Task 4: Homepage below-fold sections + architecture proof

**Files:**
- Modify: `index.html` (from outcome banner through closing CTA)
- Modify: `src/style.css` (comparison, offers, architecture flow, stepper, closing CTA)

**Interfaces:**
- Consumes: `.section`, `.section--subtle`, `.section--accent`, `.reveal`, offer block classes
- Produces: architecture flow markup with nodes in locked order

- [ ] **Step 1: Write architecture order test**

Create `tests/homepage-architecture.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('architecture proof nodes appear in order', () => {
  const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  const nodes = [
    'Docs & SharePoint',
    'Ingestion & Chunking',
    'Hybrid Vector Search',
    'Policy & Guardrails',
    'Copilot UI with citations',
  ]
  let cursor = -1
  for (const node of nodes) {
    const idx = source.indexOf(node)
    assert.ok(idx !== -1, `missing node: ${node}`)
    assert.ok(idx > cursor, `out of order: ${node}`)
    cursor = idx
  }
})
```

- [ ] **Step 2: Run test — expect FAIL**

Run: `node --test tests/homepage-architecture.test.js`

- [ ] **Step 3: Restyle/restructure below-fold homepage**

In `index.html`, apply:

1. Quiet `outcome-banner` + `domain-trust-ribbon` (add `reveal` class wrappers)
2. Replace comparison `<table>` with lean two-column layout (`.compare-grid` with `.compare-col` Generic vs EventArgs); keep the same five contrast points from current table copy
3. Convert offer `.card` blocks to `.offer-block` (border/spacing, not heavy shadows); each offer CTA becomes `Discuss this engagement` linking to `/contact.html?service=copilot|governance|devops` (keep details link optional secondary)
4. Insert new architecture section after offers:

```html
<section class="section section--subtle reveal" id="architecture">
  <div class="container">
    <div class="section-header">
      <h2>Architecture that stays grounded</h2>
      <p>A production path from Microsoft content stores to citation-backed answers.</p>
    </div>
    <ol class="arch-flow">
      <li class="arch-node">Docs & SharePoint</li>
      <li class="arch-node">Ingestion & Chunking</li>
      <li class="arch-node">Hybrid Vector Search</li>
      <li class="arch-node">Policy & Guardrails</li>
      <li class="arch-node">Copilot UI with citations</li>
    </ol>
  </div>
</section>
```

5. Restyle case studies + process into stepper (Feasibility → Blueprint → Sprints → Handoff) using existing process copy
6. Closing band:

```html
<section class="section section--accent reveal">
  <div class="container cta-band">
    <h2>Ready to scope a fixed engagement?</h2>
    <p>Talk through constraints, data boundaries, and pilot fit with a senior engineer.</p>
    <a href="/contact.html" class="btn btn-primary">Schedule a technical feasibility call</a>
  </div>
</section>
```

Preserve who-this-is-for / authority content if already present; restyle with section primitives rather than deleting proof content. Do not invent new offers.

- [ ] **Step 4: Add CSS for compare/offers/arch/stepper**

```css
.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
@media (max-width: 768px) {
  .compare-grid { grid-template-columns: 1fr; }
}
.offer-block {
  border: 1px solid var(--color-ea-border);
  border-radius: var(--radius-md);
  padding: 1.75rem;
  background: transparent;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}
.offer-block:hover {
  border-color: color-mix(in srgb, var(--color-ea-accent) 45%, var(--color-ea-border));
}
.arch-flow {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;
  padding: 0;
}
.arch-node {
  border: 1px solid var(--color-ea-border);
  border-radius: var(--radius-sm);
  padding: 1rem;
  background: var(--color-ea-bg);
  font-weight: 600;
  font-size: 0.92rem;
}
@media (max-width: 1024px) {
  .arch-flow { grid-template-columns: 1fr; }
}
```

- [ ] **Step 5: Run tests + build**

```bash
npm test
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add index.html src/style.css tests/homepage-architecture.test.js
git commit -m "$(cat <<'EOF'
feat: restyle homepage sections and add architecture proof

EOF
)"
```

---

### Task 5: Services page Wave 1 restyle

**Files:**
- Modify: `services.html`
- Modify: `src/style.css` (only if shared service-block styles needed)
- Modify: `tests/cta-contract.test.js` if service discuss links need coverage

**Interfaces:**
- Consumes: section/button primitives, `PRIMARY_CTA` label
- Produces: three engagements with “Discuss this engagement” → `/contact.html?service=...`

- [ ] **Step 1: Write services CTA test**

Create `tests/services-cta.test.js`:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = readFileSync(new URL('../services.html', import.meta.url), 'utf8')

test('services page has primary CTA label', () => {
  assert.match(html, /Schedule a technical feasibility call/)
})

test('each engagement has discuss CTA with service query', () => {
  for (const service of ['copilot', 'governance', 'devops']) {
    assert.match(
      html,
      new RegExp(`href="/contact\\.html\\?service=${service}"[^>]*>\\s*Discuss this engagement`),
    )
  }
})
```

- [ ] **Step 2: Run test — expect FAIL**

- [ ] **Step 3: Restyle `services.html`**

- Use `.section` / `.section--subtle` instead of inline light backgrounds
- Keep existing offer copy; normalize structure: badge, outcome headline, short description, 3 bullets, `Discuss this engagement` primary + optional details already on page
- Replace per-offer primary buttons (`Start Copilot Pilot`, etc.) with `Discuss this engagement`
- Add page-level hero CTA group and bottom CTA band with `Schedule a technical feasibility call`
- Remove heavy card shadows / colored top borders that fight the dark system

- [ ] **Step 4: Run tests + build**

```bash
npm test
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add services.html src/style.css tests/services-cta.test.js
git commit -m "$(cat <<'EOF'
feat: restyle services page for dark conversion path

EOF
)"
```

---

### Task 6: Contact page restyle + Wave 1 microcopy pass

**Files:**
- Modify: `contact.html`
- Modify: `index.html` / `services.html` only if residual old CTA strings remain in Wave 1
- Modify: `src/style.css` (form controls on dark surface)
- Create: `tests/contact-page.test.js`

**Interfaces:**
- Consumes: existing `#contact-form` → `/api/contact` and Calendly link (`#book-call-btn`)
- Produces: dark form styles; primary booking label uses CTA contract on the main page heading/CTA; Calendly button may read `Schedule a technical feasibility call` (preferred) while keeping the same Calendly URL

- [ ] **Step 1: Write contact tests**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const html = readFileSync(new URL('../contact.html', import.meta.url), 'utf8')

test('contact page keeps form action', () => {
  assert.match(html, /id="contact-form"[^>]*action="\/api\/contact"/)
})

test('contact page keeps calendly booking target', () => {
  assert.match(html, /id="book-call-btn"[^>]*href="https:\/\/calendly\.com\/gutierrez014642"/)
})

test('contact page surfaces primary CTA label', () => {
  assert.match(html, /Schedule a technical feasibility call/)
})
```

- [ ] **Step 2: Run test — expect FAIL on label if missing**

- [ ] **Step 3: Restyle contact page**

- H1 / lead: single job — schedule technical feasibility call
- Booking panel + form on `ea-surface`, accent focus rings, success/warning tokens for status messages (keep existing JS status handling)
- Trust line under form: senior-led Microsoft 365/Azure delivery
- Set `#book-call-btn` text to `Schedule a technical feasibility call`
- Strip light-theme inline styles that force white cards

- [ ] **Step 4: Grep Wave 1 for old CTA strings and replace**

Search in `index.html`, `services.html`, `contact.html`, `src/layout.js` for:
- `Book Architecture Review`
- `Book a Discovery Call` (heading may become “Schedule a technical feasibility call” or “Technical feasibility call”)
- Inconsistent primary labels

Replace Wave 1 user-facing primary CTAs with the contract string. Do not change Wave 2 page copy in this task except inherited nav/footer from `layout.js` (already updated).

- [ ] **Step 5: Run tests + build**

```bash
npm test
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add contact.html index.html services.html src/style.css tests/contact-page.test.js
git commit -m "$(cat <<'EOF'
feat: restyle contact page and unify Wave 1 CTA microcopy

EOF
)"
```

---

### Task 7: Playwright visual QA loop + checklist

**Files:**
- Create: `scripts/visual-qa.md`
- Modify: any Wave 1 HTML/CSS files only as needed to fix QA findings

**Interfaces:**
- Consumes: local `npm run dev` or `npm run preview`
- Produces: documented pass/fail notes in `scripts/visual-qa.md` (agent fills results)

- [ ] **Step 1: Write checklist file**

Create `scripts/visual-qa.md` with:

```md
# Wave 1 Visual QA

Breakpoints: 1440, 1024, 768, 390
Pages: `/`, `/services.html`, `/contact.html`

For each page × breakpoint:
- [ ] No horizontal overflow
- [ ] Hero brand + headline readable
- [ ] Primary CTA visible
- [ ] Section spacing consistent
- [ ] Architecture flow stacks cleanly (homepage, mobile/tablet)
- [ ] Contact form usable; labels readable on dark surface

Reduced motion:
- [ ] With `prefers-reduced-motion: reduce`, hero/sections appear without fade animation
```

- [ ] **Step 2: Run preview server**

```bash
npm run build && npm run preview -- --host 127.0.0.1 --port 4173
```

- [ ] **Step 3: Playwright MCP passes**

For each breakpoint, navigate to home/services/contact, snapshot/screenshot, and fix issues in CSS/HTML (padding, line length, wrapping, overlapping CTAs). Re-check after each fix cluster.

- [ ] **Step 4: Final verification**

```bash
npm test
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add scripts/visual-qa.md index.html services.html contact.html src/style.css
git commit -m "$(cat <<'EOF'
fix: visual QA pass for Wave 1 breakpoints

EOF
)"
```

---

## Spec coverage checklist (plan self-review)

| Spec requirement | Task |
|---|---|
| DESIGN_SPEC.md + tokens | Task 1 |
| Tailwind dark theme + IBM Plex Sans | Task 1 |
| ShellLayout / Section / CTA primitives | Task 2 |
| Motion (3 moments + reduced motion) | Task 2 |
| Hero + metrics first viewport | Task 3 |
| Below-fold outcome/trust, compare, offers | Task 4 |
| Architecture proof nodes | Task 4 |
| Process stepper + closing CTA | Task 4 |
| Services discuss CTAs + primary CTA | Task 5 |
| Contact form/API preserved + dark UX | Task 6 |
| CTA microcopy contract | Tasks 1–6 |
| Playwright breakpoints QA | Task 7 |
| No React / Wave 2 structural deferral | Global constraints |

## Placeholder / consistency scan

- CTA label string identical everywhere: `Schedule a technical feasibility call`
- Token hex values match design spec
- `initMotion` / `PRIMARY_CTA_*` names consistent across tasks
- No TBD/TODO steps remain
