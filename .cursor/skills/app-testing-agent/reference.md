# App Testing Agent — Reference

## Commands

```bash
npm test
npm run test:watch
npm run test:e2e
```

Playwright starts `npm run dev` on `http://localhost:3000` unless a server is already running.

## Live routes & assert text

| Route | Assert |
|-------|--------|
| `/` | heading `/prepare for technical interviews/i` |
| `/categories` | heading `Categories` |
| `/categories/javascript` | heading `JavaScript` (seeded) |
| `/challenges` | heading `Coding Challenges` |
| `/quiz` | heading `Quiz Mode` |
| `/docs` | heading `Docs` |
| `/resources` | heading `Resources` |
| `/chat` | heading `Ask AI` |
| `/login` | text/heading `Sign in` |
| `/register` | text/heading `Create account` |
| `/completed` (anon) | URL `/login` |
| `/read-later` (anon) | URL `/login` |

Admin routes need an admin session — skip unless fixtures exist.

## Priority unit modules

1. `src/lib/questions/sort.ts`
2. `src/lib/questions/quiz-eligible.ts`
3. `src/lib/questions/has-answer-content.ts`
4. `src/lib/questions/answer-preview.ts`
5. `src/lib/question-hash.ts` (pure helpers only)
6. `src/lib/challenges/challenge-meta.ts`
7. `src/lib/challenges/draft-storage.ts`
8. `src/lib/challenges/run-locally.ts` (if pure enough)
9. `src/lib/database-url.ts`
10. `src/lib/app-url.ts`
11. `src/lib/auth-providers.ts`
12. `src/lib/user-avatar.ts`
13. `src/lib/ai/*` (keep existing)
14. `src/lib/validators/*` (keep existing)
15. `src/lib/docs/site-docs.ts` — smoke: sections non-empty + unique ids

## Out of scope

- Empty folders: `bookmarks/`, `dashboard/`, `flashcards/`, `questions/`, `books/`
- Prisma client / live DB queries
- Full challenge Monaco UI flows
- Streaming Ask AI conversations (unit the prompt/config/errors instead)

## File layout

```
e2e/
  home.spec.ts          # landing + categories (legacy)
  public-pages.spec.ts  # public smokes
  auth-gates.spec.ts    # anon redirects
src/lib/**/*.test.ts    # colocate with modules
src/test/setup.ts       # jest-dom
```
