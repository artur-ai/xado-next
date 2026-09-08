---
name: xado-design-review
description: Use this skill whenever writing or reviewing UI/JSX/Tailwind classes for xado-next — new components, restyling existing ones, building the cart/checkout, or any page that will be visible to store visitors. Checks against the project's "clean premium" design direction so new UI doesn't drift back toward the old site's heavy red look.
---

# XADO "clean premium" design review

As of the catalog + product page milestone, xado-next moved away from the old site's heavy red design toward "clean premium": whitespace-forward, red used sparingly as an accent (Apple/premium-retail feel), not a full red header block. This applies to ALL new UI going forward — cart, checkout, account pages, everything — not just the pages already redesigned.

## Color tokens (use these exact values, Tailwind arbitrary values)

- Page background: white / `#fafafa`
- Primary text: `#1a1a1a` (near-black, never pure `#000`)
- Secondary/muted text: `#6b7280`
- Borders: `#e5e5e5`, thin 1px — no thick colored left-border-on-card pattern (that was the old site)
- Accent red (price, hover states, at most one CTA per view): `#c81e1e` — specifically NOT `#d62828` or `#d50000` from the old site; this is a deliberately deeper, more restrained red
- Header: white/near-white background with a thin bottom border — never a solid red bar
- Buttons: dark charcoal fill for primary actions; outlined/ghost style for secondary actions — not red-filled buttons everywhere
- Cards: white background, thin gray border, hover state = border darkens + subtle lift/shadow — no colored side-stripe on hover

## What to flag in review

- Any new component using `bg-red-...`, `border-red-...`, or similar Tailwind default red instead of the exact `#c81e1e` token
- More than one prominent red CTA visible in the same view
- A card or section using a colored left-border accent (a leftover pattern from the old site)
- Pure black text (`#000` / `text-black`) instead of `#1a1a1a`
- A separate `.css` file for component styling — this project uses Tailwind utility classes directly in markup, no per-component stylesheets

## Style is consistency, not decoration

The goal isn't "make it look nicer" in isolation — it's staying visually consistent with the catalog and product pages that already ship this look. When in doubt, check how `ProductCard.tsx` or the catalog page handles color/spacing/borders and match that, rather than introducing a new pattern.
