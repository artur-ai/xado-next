# XADO Kropyvnytskyi — Next.js frontend (rewrite from scratch)

## What this project is

New frontend for the XADO online store (motor oils, greases, auto chemicals, car cosmetics, technical fluids, revitalizants). Being rewritten from plain HTML/CSS/JS to Next.js. This is a **separate repository**, running in parallel with the old one — the old site stays live in production until the new one is ready to replace it.

- **Old repository (prod, not yet replaced):** `Xado.html` — github.com/artur-ai/Xado.html, deployed on Netlify, xado-krop.com.ua
- **This repository:** `xado-next` — new frontend, currently in local development

## IMPORTANT: commit and push often

This project has already lost work twice from switching computers with uncommitted changes sitting only in the local working directory (the entire catalog page + lib/products.ts once, and CLAUDE.md updates another time). Rule going forward: commit and push as soon as something works, not "at the end of the session." Never leave a working feature uncommitted overnight or before switching machines.

GitHub no longer accepts a plain password for `git push` over HTTPS. Use a Personal Access Token instead: github.com/settings/tokens → "Generate new token (classic)" → check the `repo` scope → use the token as the password when prompted. Save it in the OS credential manager (`git config --global credential.helper osxkeychain` on macOS) so it's not needed on every push.

## Stack

- Next.js (App Router, TypeScript, Turbopack)
- Tailwind CSS for styling (utility classes directly in markup, no separate `.css` file per component)
- Data source for now — Google Sheets, published as CSV (`pub?output=csv`), a separate `gid` per product category. Parsed with a small hand-written CSV parser in `lib/products.ts` (NOT PapaParse — see "Known non-bugs" below for why a naive line-split parser breaks on this data). Will later be replaced by a Java REST API + PostgreSQL.

## Data source (Google Sheets, for now)

Table columns are in Ukrainian: `ID`, `Назва` (Name), `Категорія` (sub-category/tag within a category tab), `Ціна` (Price), `Обєм` (Volume), `Картинка` (Image filename), `Опис` (Description), `Переваги` (Advantages), `Вимоги та допуски` (Requirements & approvals), `Технічна інформація` (Technical info).

Categories (= a separate `gid` each):

| Category slug | gid | Product image folder under `public/images/products/` |
|---|---|---|
| `olyvy` | `1130980914` | `olyvy` |
| `mastyla` | `364121324` | `mastyla` |
| `avtoXimia` | `1388474610` | `avtoXimia` |
| `avtoKosmetika` | `0` | `avtoKosmetika` |
| `technical_ridini` | `1042162916` | `technical_ridini` |
| `revitalizant` | `1497207436` | `revitalizant` |

**Rule:** all access to product data goes through a single module, `lib/products.ts`. Components never call Google Sheets/CSV directly — only through functions in this module. This is deliberate, so that later replacing Google Sheets with the Java API only requires changing this one file, not rewriting components.

**Future plan for Google Sheets → PostgreSQL migration:** Google Sheets is a temporary bridge, not a permanent data source. Once the Java backend + PostgreSQL + a basic admin panel exist, migrate fully off Google Sheets (one-time import of existing rows, then the store owner edits products through the admin panel instead of the spreadsheet). If a transition period with both in sync is needed, prefer a simple scheduled one-way import job (Sheets CSV → Postgres) over a real-time webhook — Google Sheets should remain the single source of truth only until the admin panel replaces it, never a permanent dual-write setup.

## Structure (App Router)

Note: the project was created WITHOUT a `src/` folder (modern `create-next-app` no longer adds it by default) — all code lives directly at the root, not under `src/app/`.

- `app/layout.tsx` — shared Header/Footer for every page
- `app/page.tsx` — home page
- `app/catalog/[category]/page.tsx` — category page (one template instead of 6 separate HTML files), with sub-category filter buttons generated dynamically from the data
- `app/product/[category]/[id]/page.tsx` — product detail page (NOT YET BUILT). Route uses both category and id (not just id) because product IDs are only guaranteed unique within a single category's Google Sheet tab, not globally.
- `lib/products.ts` — data access layer (types, CSV fetch + parse, category config)
- `components/ProductCard.tsx`, `components/ProductCatalog.tsx` — catalog UI
- `public/images/products/<category>/` — product images, copied from the old repo's `catalog/images_of_products/` folders (original filenames kept as-is for now; renaming to clean kebab-case is a separate future cleanup task, not done yet)

## Design direction: "clean premium"

As of the catalog + product page milestone, the project moved away from pixel-matching the old site's heavy red design toward a "clean premium" look (whitespace-forward, red used sparingly as an accent, like Apple/premium retail — not a full red header block). This applies to ALL new UI going forward (cart, checkout, etc.), not just the pages already redesigned.

Color tokens (arbitrary Tailwind values, used consistently across components):
- Page background: white / `#fafafa`
- Primary text: `#1a1a1a` (near-black, not pure black)
- Secondary/muted text: `#6b7280`
- Borders: `#e5e5e5` (thin, 1px) — replaces the old thick colored left-border-on-cards pattern
- Accent red (price, hover states, one CTA per view): `#c81e1e` — NOT the brighter `#d62828`/`#d50000` from the old site; slightly deeper, used sparingly
- Header: white/near-white background with a thin bottom border, not a solid red bar
- Buttons: dark charcoal fill for primary actions, outlined/ghost for secondary — not red-filled buttons everywhere
- Cards: white bg, thin gray border, hover = border darkens + subtle lift/shadow — no colored side-stripe

## Conventions

- Code/variable language — English, even though the data source (Google Sheets) is in Ukrainian — normalize into typed fields inside `lib/products.ts`.
- Product images: kebab-case, Latin characters, no spaces is the target convention for NEW assets (hero/category images already follow this). Existing product photos copied from the old repo still have messy original names — cleanup is a deferred task, not urgent.
- Styling — Tailwind only, no separate `.css` files per component.
- Do not create static/hardcoded product pages — everything goes through the dynamic `product/[category]/[id]/page.tsx` + data from `lib/products.ts`.

## Known "non-bugs"

- Folder names with square brackets (e.g. `[category]`) are LITERAL — the brackets themselves must be typed as characters in the folder name for Next.js to treat it as a dynamic route segment. A folder just named `category` (no brackets) is treated as a static path and will 404 for anything else.
- The Google Sheets CSV export can contain real newline characters INSIDE a quoted cell (e.g. a multi-line description). A naive parser that splits the whole CSV text on `\n` before handling quotes will misalign columns for every row after that point. `lib/products.ts` uses a character-by-character parser that only treats `\n` as a row separator when it's outside quotes — don't replace it with a naive split-based version.
- The subcategory filter buttons on `/catalog/[category]` correctly reflect the raw "Категорія" column from Google Sheets — if a filter shows products that don't visually match (e.g. clicking "5W40" shows a 10W-40 product), or a price looks like text instead of a number (e.g. "52500 - 320(за 1л)"), that's a data-entry mistake in the spreadsheet itself, not a bug in `ProductCatalog.tsx` or `lib/products.ts`. Fix by correcting the source row in Google Sheets, not the frontend code.
- Next.js dev mode sometimes shows `Console Error: A tree hydrated but some attributes...` with a `bis_skin_checked` attribute in the diff — this is not a project bug, it's the Bitdefender browser extension injecting its own attribute into the DOM before React hydration. Ignore it, or disable the extension for `localhost`.
- If code changes (especially in `globals.css` or styles) don't show up in the browser even after saving the file and a hard refresh (`Cmd+Shift+R`) — first diagnostic step: stop the dev server (`Ctrl+C`), delete the cache with `rm -rf .next`, and run `npm run dev` again. The Turbopack cache regularly gets "stuck" on an old version of a file after a series of quick edits.

## Store contact info (for footer/contact info)

- Phone: +38 (050) 585-07-26
- Email: xado.krop@ukr.net
- Address: Kropyvnytskyi, vul. Kropyvnytskoho 184
- Hours: Mon–Sat 09:00–16:00, Sun 09:00–13:00