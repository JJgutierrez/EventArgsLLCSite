# Final Whole-Branch Review Fixes

- Replaced credential badge pill styling with the small shared radius token.
- Removed hover/lift behavior from generic cards and credential badges; button and offer-row interactions remain unchanged.
- Changed the contact intake form submit control to the secondary button treatment, leaving booking as the sole primary CTA.
- Verification: `npm test` and `npm run build`.
- Set `.offer-badge` `border-radius` to `var(--radius-sm)` instead of pill `50px`; offer-block hover translate unchanged.
- Verification: `npm test` and `npm run build`.
