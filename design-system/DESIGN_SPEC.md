# EventArgs Design System

This document is the implementation contract for the EventArgs LLC static site redesign.

## Locked tokens

| Token | Value | Role |
|---|---|---|
| `ea-bg` | `#0B1220` | Page background |
| `ea-surface` | `#121A2B` | Raised bands / form panels |
| `ea-border` | `#243049` | Dividers and offer block edges |
| `ea-accent` | `#2563eb` | Links, primary buttons, and focus |
| `ea-accent-hover` | `#3B82F6` | Interactive hover |
| `ea-text` | `#F1F5F9` | Primary text |
| `ea-muted` | `#94A3B8` | Secondary text |
| `ea-success` | `#22c55e` | Form success feedback only |
| `ea-warning` | `#f59e0b` | Form warning feedback only |

Use Tailwind utility-facing forms such as `bg-ea-bg`, `bg-ea-surface`,
`border-ea-border`, `bg-ea-accent`, and `text-ea-text`. The theme is enterprise
dark only: no light-mode toggle, purple theme, glow stacks, or neon.

## Typography and layout

Use **IBM Plex Sans** for both headings and body copy. Display text is semibold
or bold with tight tracking; body copy is regular or medium with a roughly
60–75ch measure. Do not use Inter, Roboto, Arial, or anonymous system stacks as
the primary face.

Use 6–12px radii, generous desktop section spacing (approximately 4 / 6 / 8rem)
with reduced mobile spacing, and content widths around 1100–1200px. Hero
content sits on a full-bleed visual plane, not an inset media card.

## Static primitives

- `section`: default section variant.
- `section section--subtle`: raised, quieter `ea-surface` band.
- `section section--accent`: accent-led CTA or emphasis band.
- `btn`: shared button base class.
- `btn btn-primary`: primary conversion action using `ea-accent`.
- `btn btn-secondary`: contextual secondary action.

### Engineering Insights primitives (v3.0)

Insights surfaces may use documented slate aliases without replacing Wave 1
locked tokens:

| Alias | Value | Role |
|---|---|---|
| `insight-bg` | `#090d16` | Optional insights canvas |
| `insight-surface` | `#0f172a` | Featured card / article surface |
| `insight-border` | `#1e293b` | Subtle card edges |

- `insight-featured`: full-width featured article hero card.
- `insight-grid`: 2-column responsive article index.
- `insight-card`: index card with IBM Plex Mono metadata chips.
- `insight-article`: detail layout with `max-w-3xl` reading column.
- `insight-toc`: desktop sticky table of contents.
- `insight-chip`: monospace topic, date, and reading-time chips.

The implementation remains static Vite multi-page HTML with shared CSS and
vanilla JavaScript. Do not introduce React or an SPA without explicit approval.

## CTA contract

The primary CTA label is exactly:

`Schedule a technical feasibility call`

It links to `/contact.html` and uses `btn-primary` in hero, offer, and closing
CTA contexts. Secondary labels remain contextual, such as `Explore fixed-scope
pilots`.

## Motion

Use exactly three intentional moments:

1. Hero content fades/rises once on load.
2. Sections fade up lightly on scroll via `IntersectionObserver`.
3. Buttons and offer rows use CSS hover/press only.

Respect `prefers-reduced-motion: reduce` by disabling non-essential motion.

## Agent rules

- Respect this document's locked tokens and typography.
- Stay static; do not add React/SPA patterns unless explicitly approved.
- Treat third-party patterns (including 21st.dev) as inspiration only; remap
  them to static HTML and EventArgs tokens.
- Use Figma frames as the layout source of truth when present.
- After major changes, run Playwright checks at 1440, 1024, 768, and 390px,
  fixing overflow, spacing, CTA visibility, and mobile architecture stacking.
