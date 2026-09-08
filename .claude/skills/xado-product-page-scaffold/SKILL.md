---
name: xado-product-page-scaffold
description: Use this skill when creating a new page or route in xado-next's app/ directory — especially anything related to products, categories, or product details — or when tempted to hardcode a page for a specific product/category instead of using the dynamic route.
---

# Dynamic routing conventions for xado-next

This project was created WITHOUT a `src/` folder — all code lives directly at the repo root (`app/`, `lib/`, `components/`), not under `src/app/`. Keep new files at the root level to match.

## No hardcoded product/category pages

Do not create static pages for individual products or categories (e.g. a one-off `app/olyvy/page.tsx` hand-written for the oils category). Everything goes through:

- `app/catalog/[category]/page.tsx` — one template for all 6 categories, with sub-category filter buttons generated dynamically from the data (not hand-listed)
- `app/product/[category]/[id]/page.tsx` — product detail page. The route intentionally uses BOTH `category` and `id`, not just `id`, because product IDs are only guaranteed unique within a single category's Google Sheet tab, not globally across categories.

If asked to "add a page for [specific product]" or "add the [specific category] page," the right move is almost always confirming the dynamic route handles it already, not writing a new static file.

## Bracket folders are literal, not a typo

Folder names like `[category]` or `[id]` need the literal square brackets typed as characters — that's what tells Next.js to treat the segment as dynamic. A folder just named `category` (no brackets) is a static path and will 404 for anything else. Don't "fix" the brackets by removing them.

## Data still goes through lib/products.ts

New pages fetch product/category data only via functions from `lib/products.ts` — see the `xado-data-layer` skill for the full rule and why.

## Dev-server cache gotcha

If a new page's changes don't show up in the browser even after saving and a hard refresh (`Cmd+Shift+R`), stop the dev server (`Ctrl+C`), delete the cache with `rm -rf .next`, and run `npm run dev` again — the Turbopack cache can get stuck on an old file version after quick successive edits. This isn't a code bug.
