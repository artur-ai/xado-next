# XADO Kropyvnytskyi — Next.js frontend (rewrite from scratch)

## What this project is

New frontend for the XADO online store (motor oils, greases, auto chemicals, car cosmetics, technical fluids, revitalizants). Being rewritten from plain HTML/CSS/JS to Next.js. This is a **separate repository**, running in parallel with the old one — the old site stays live in production until the new one is ready to replace it.

- **Old repository (prod, not yet replaced):** `Xado.html` — github.com/artur-ai/Xado.html, deployed on Netlify, xado-krop.com.ua
- **This repository:** `xado-next` — new frontend, currently in local development

## Stack

- Next.js (App Router, TypeScript, Turbopack)
- Tailwind CSS for styling (utility classes directly in markup, no separate `.css` file per component)
- Data source for now — Google Sheets, published as CSV (`pub?output=csv`), a separate `gid` per product category, parsed with PapaParse. Will later be replaced by a Java REST API + PostgreSQL.

## Data source (Google Sheets, for now)

Table columns are in Ukrainian: `ID`, `Назва` (Name), `Категорія` (Category), `Ціна` (Price), `Обєм` (Volume), `Картинка` (Image), `Опис` (Description), `Переваги` (Advantages), `Вимоги та допуски` (Requirements & approvals), `Технічна інформація` (Technical info), `Посилання` (Link).

Categories (= a separate `gid` each): `olyvy` (oils), `mastyla` (greases), `avtoXimia` (auto chemicals), `avtoKosmetika` (car cosmetics), `technical_ridini` (technical fluids), `revitalizant` (revitalizants).

**Rule:** all access to product data goes through a single module, `lib/products.ts`. Components never call Google Sheets/CSV directly — only through functions in this module. This is deliberate, so that later replacing Google Sheets with the Java API only requires changing this one file, not rewriting components.

## Structure (App Router)

Note: the project was created WITHOUT a `src/` folder (modern `create-next-app` no longer adds it by default) — all code lives directly at the root, not under `src/app/`.

- `app/layout.tsx` — shared Header/Footer for every page
- `app/page.tsx` — home page
- `app/catalog/[category]/page.tsx` — category page (one template instead of 6 separate HTML files)
- `app/product/[id]/page.tsx` — product page (one template instead of ~170 old static HTML files)
- `lib/products.ts` — data access layer
- `public/` — static product images

## Conventions

- Code/variable language — English, even though the data source (Google Sheets) is in Ukrainian — normalize into typed fields inside `lib/products.ts`.
- Product images: kebab-case, Latin characters, no spaces (old names like `"anyway 150.jpg"` should be renamed on migration).
- Styling — Tailwind only, no separate `.css` files per component.
- Do not create static/hardcoded product pages — everything goes through the dynamic `product/[id]/page.tsx` + data from `lib/products.ts`.

## Known "non-bugs"

- Next.js dev mode sometimes shows `Console Error: A tree hydrated but some attributes...` with a `bis_skin_checked` attribute in the diff — this is not a project bug, it's the Bitdefender browser extension injecting its own attribute into the DOM before React hydration. Ignore it, or disable the extension for `localhost`.
- If code changes (especially in `globals.css` or styles) don't show up in the browser even after saving the file and a hard refresh (`Cmd+Shift+R`) — first diagnostic step: stop the dev server (`Ctrl+C`), delete the cache with `rm -rf .next`, and run `npm run dev` again. The Turbopack cache regularly gets "stuck" on an old version of a file after a series of quick edits.

## Store contact info (for footer/contact info)

- Phone: +38 (050) 585-07-26
- Email: xado.krop@ukr.net
- Address: Kropyvnytskyi, vul. Kropyvnytskoho 184
- Hours: Mon–Sat 09:00–16:00, Sun 09:00–13:00