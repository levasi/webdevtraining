# App Cleanup Auditor — Project Reference

Project-specific context for leftover / refactor audits.

## App shape

| Area | Location |
|------|----------|
| App Router pages | `src/app/(app)`, `src/app/(admin)`, `src/app/(auth)` |
| API routes | `src/app/api/**` |
| UI | `src/components/**` |
| Domain logic | `src/lib/**` |
| Server actions | `src/actions/**` |
| Client stores | `src/stores/**` |
| Hooks | `src/hooks/**` |
| Seed / questions | `prisma/data/**`, `prisma/seed.ts` |

Entrypoints that look “unused” but are not: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`, `proxy.ts` / middleware, `instrumentation.ts`.

## Intentional dual surfaces (usually keep)

| Feature | Surfaces | Notes |
|---------|----------|-------|
| Ask AI | Widget (`ask-ai-widget`), `/chat` page, contextual `ask-ai-sheet` | Widget + `/chat` share `getSharedDeveloperChat()`; sheets are contextual and separate |
| Docs | `/docs` via `site-docs.ts` | Owned by App Docs Agent |
| Questions | Category panel + admin CRUD | Different audiences |
| Challenges | Browser + detail panel + playground | Expected composition |

Flag duplication only when two implementations no longer share state **and** one is clearly abandoned.

## Recent cleanup hotspots

Check these areas carefully for leftovers after feature churn:

- Quiz: full `/quiz/[id]` page and `quiz-sidebar-layout` / `quiz-question-card` were removed in favor of in-category quiz UX — verify no stale imports/links
- Chat: floating widget mounts from `app-shell`; ensure no obsolete sheet-only assumptions on global chat
- Completed filters: questions / quizzes / challenges — watch for unused props or query helpers
- AI Elements + shadcn adds (`accordion`, `sheet`, `button-group`, etc.): unused primitives are candidates **only if** nothing in `src/components` imports them (AI Elements may pull several)
- `src/lib/app-fonts.dev.ts` is **not** dead — `next.config.ts` turbopack-aliases `@/lib/app-fonts` to it in development

## High-signal search recipes

```bash
# Symbol usage
rg -n "SymbolName" src

# Import path usage
rg -n "from [\"']@/components/foo" src

# TODO / deprecated debris
rg -n "TODO|FIXME|@deprecated|XXX" src

# Orphaned page links in nav
rg -n "href=[\"']/[^\"']+" src/components/layout

# Prisma model usage
rg -n "prisma\\.[a-zA-Z]+" src prisma
```

## What not to delete casually

- `src/components/ui/*` shadcn primitives that AI Elements or future UI may need — prefer “unused primitive” under Needs confirmation
- `src/components/ai-elements/*` if imported by chat
- Auth, DB, and health routes even if rarely hit in UI
- Seed scripts and `questions:audit` tooling

## Good refactor targets in this repo

- Oversized category / challenge panels (`category-content.tsx`, challenge playground files)
- Repeated completion / bookmark mutation patterns across question & challenge UI
- Shared chat vs contextual chat boundaries (keep clear; don’t merge contexts accidentally)
- Nav config duplicated across `app-header`, `mobile-nav`, `app-footer`
