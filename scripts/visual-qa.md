# Wave 1 Visual QA

Breakpoints: 1440, 1024, 768, 390  
Pages: `/`, `/services.html`, `/contact.html`

## Results

| Page | 1440 | 1024 | 768 | 390 |
| --- | --- | --- | --- | --- |
| `/` | ✅ | ✅ | ✅ | ✅ |
| `/services.html` | ✅ | ✅ | ✅ | ✅ |
| `/contact.html` | ✅ | ✅ | ✅ | ✅ |

For every page × breakpoint:
- [x] No horizontal overflow
- [x] Hero brand + headline readable
- [x] Primary CTA visible
- [x] Section spacing consistent
- [x] Architecture flow stacks cleanly (homepage, mobile/tablet)
- [x] Contact form usable; labels readable on dark surface

## Finding and fix

At 390px, the homepage's two hero CTAs shared one flex row, causing each label to wrap to two or three lines. The mobile rule now stacks the CTAs and gives each button the available width. Rechecked at 390px: both are visible at 342 × 54px, with no horizontal overflow.

## Reduced motion

- [x] With `prefers-reduced-motion: reduce`, the homepage hero and all revealed sections render with `opacity: 1`, `transform: none`, and `transition-duration: 0s`.

## Evidence

Playwright snapshots and full-page screenshots were captured for all page/breakpoint combinations against `http://127.0.0.1:4173/`.
