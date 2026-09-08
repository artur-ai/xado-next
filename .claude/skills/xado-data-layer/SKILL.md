---
name: xado-data-layer
description: Use this skill whenever touching product data in xado-next — reading/writing components that show products, editing lib/products.ts, adding a new product category, or debugging why a product/category/filter looks wrong. Also use when someone suggests replacing the CSV parser with PapaParse or a simple string.split parser.
---

# XADO data layer rules

This project's product data currently lives in Google Sheets, published as CSV. Everything about how that data is fetched and parsed is centralized in `lib/products.ts`. This skill exists so that rule doesn't get silently broken as the codebase grows.

## Hard rule: single access point

Components (`ProductCard.tsx`, `ProductCatalog.tsx`, any page under `app/`) must NEVER fetch or parse the Google Sheets CSV directly. All access goes through functions exported from `lib/products.ts`.

Why: the CSV source will later be replaced by a Java REST API + PostgreSQL. If every component talks to Sheets directly, that migration means rewriting every component. If only `lib/products.ts` talks to Sheets, the migration means rewriting one file.

When reviewing or writing code: if you see a `fetch(...)` to a `docs.google.com/.../pub?output=csv` URL anywhere outside `lib/products.ts`, flag it and move the logic into `lib/products.ts` instead.

## Categories (gid map)

| Category slug | gid | Image folder under `public/images/products/` |
|---|---|---|
| `olyvy` | 1130980914 | `olyvy` |
| `mastyla` | 364121324 | `mastyla` |
| `avtoXimia` | 1388474610 | `avtoXimia` |
| `avtoKosmetika` | 0 | `avtoKosmetika` |
| `technical_ridini` | 1042162916 | `technical_ridini` |
| `revitalizant` | 1497207436 | `revitalizant` |

Sheet columns are in Ukrainian (`ID`, `Назва`, `Категорія`, `Ціна`, `Обєм`, `Картинка`, `Опис`, `Переваги`, `Вимоги та допуски`, `Технічна інформація`) — they get normalized into typed English fields inside `lib/products.ts`. Don't leak raw Ukrainian keys into component props; map them in the data layer.

## The CSV parser is intentionally custom — don't "simplify" it

The Google Sheets CSV export can contain real newline characters INSIDE a quoted cell (multi-line descriptions). A parser that splits the whole text on `\n` before handling quotes will misalign every column after the first multi-line cell.

`lib/products.ts` uses a character-by-character parser that only treats `\n` as a row separator when outside quotes. If asked to "clean up" or "simplify" this by swapping in PapaParse or a naive split-based parser, push back and explain why — this is a known non-bug, not leftover complexity.

## Data-quality issues are spreadsheet issues

If a subcategory filter shows a mismatched product, or a price renders as text instead of a number (e.g. `"52500 - 320(за 1л)"`), that's almost always a data-entry mistake in the Google Sheet, not a bug in `ProductCatalog.tsx` or `lib/products.ts`. Check the raw sheet value before "fixing" the frontend code.

## New categories or fields

Adding a new product category means: a new `gid`, an entry in the category config in `lib/products.ts`, and a matching folder under `public/images/products/`. Don't hardcode a new category's product list as a static page — it should flow through `app/catalog/[category]/page.tsx` like the rest.
