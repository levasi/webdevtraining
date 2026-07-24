# App Docs Agent — Reference

## Live routes (verify with `find` before editing)

Document only routes that have a `page.tsx` (or `route.ts` for APIs).

Typical app routes under `src/app/(app)/`:

| Path | Purpose |
|------|---------|
| `/categories` | Category grid |
| `/categories/[slug]` | Questions / quizzes / articles / challenges for a topic |
| `/quiz` | Quiz browser |
| `/challenges`, `/challenges/[id]` | Challenge browser + detail |
| `/chat` | Full-page Ask AI |
| `/read-later` | Bookmarked questions |
| `/completed` | Completed study items |
| `/progress` | Progress overview |
| `/resources` | Curated learning resources |
| `/articles/[id]` | Full article page |
| `/docs` | This documentation |

Auth: `/login`, `/register`. Admin: `/admin/*`.

## Empty folders (do not document as features)

These often exist without pages — ignore until implemented:

- `src/app/(app)/bookmarks`
- `src/app/(app)/dashboard`
- `src/app/(app)/flashcards`
- `src/app/(app)/questions`
- `src/app/(app)/books`

## Ask AI surfaces

| Surface | Path / component | Notes |
|---------|------------------|-------|
| Floating widget | `AskAiWidget` in `app-shell` | Shared chat singleton |
| Full page | `/chat` | Same shared conversation as widget |
| Contextual sheet | `AskAiSheet` on question/challenge panels | Separate chat + content context |
| API | `POST /api/chat` | Groq via `@ai-sdk/groq` |

Env: `GROQ_API_KEY` (required), `AI_CHAT_MODEL` (optional). Never commit values.

## Content module shape

`src/lib/docs/site-docs.ts` exports:

- `DOCS_PAGE` — title + description for the page chrome
- `DOCS_SECTIONS` — ordered `{ id, title, markdown }[]`

Markdown is rendered with the same GFM approach as articles.

## Related repo docs

- `ARCHITECTURE.md` — planning / historical; may lag
- `AGENTS.md` — Next.js agent notes
- `.cursor/skills/*` — specialized agents

Prefer codebase inventory over copying ARCHITECTURE verbatim.
