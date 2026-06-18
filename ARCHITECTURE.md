# WebDevTraining — Architecture & MVP Plan

Technical interview preparation platform for frontend, backend, and full-stack developers. Optimized for Vercel deployment.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router |
| UI | React, TypeScript, Tailwind CSS, shadcn/ui |
| Data mutations | Server Actions |
| APIs | Route Handlers |
| Database | PostgreSQL (Neon / Supabase) |
| ORM | Prisma |
| Auth | Better Auth |
| Server state | TanStack Query |
| UI state | Zustand (minimal) |
| Testing | Vitest, Playwright |
| Deployment | Vercel + Analytics |

---

## 1. Recommended Folder Structure

```
src/
├── app/
│   ├── (admin)/admin/          # Admin-only routes
│   ├── (app)/                  # Main authenticated/public app
│   │   ├── categories/
│   │   ├── challenges/
│   │   ├── dashboard/
│   │   ├── flashcards/
│   │   ├── quiz/
│   │   ├── bookmarks/
│   │   └── progress/
│   ├── (auth)/                 # login, register
│   ├── api/
│   │   ├── auth/[...all]/      # Better Auth handler
│   │   ├── challenges/[id]/run/
│   │   └── health/
│   ├── layout.tsx
│   └── page.tsx                # Marketing landing
├── actions/
│   ├── admin/questions.ts      # Server Actions (admin)
│   └── user.ts                 # bookmarks, notes, progress
├── components/
│   ├── ui/                     # shadcn primitives
│   ├── layout/
│   ├── categories/
│   ├── questions/
│   ├── flashcards/
│   ├── challenges/
│   └── providers/
├── lib/
│   ├── auth.ts                 # Better Auth server config
│   ├── auth-client.ts          # Client auth hooks
│   ├── db.ts                   # Prisma singleton
│   ├── constants.ts
│   ├── queries/content.ts      # Server-side data access
│   └── validators/content.ts   # Zod schemas
├── stores/
│   └── ui-store.ts             # Zustand (sidebar, flashcard flip)
├── types/
│   └── index.ts
└── generated/prisma/           # Prisma client output

prisma/
├── schema.prisma
├── seed.ts
└── migrations/

e2e/                            # Playwright tests
```

**Design principles**

- **Route groups** `(app)`, `(auth)`, `(admin)` organize layouts without affecting URLs.
- **Server Components** fetch data via `lib/queries/*`.
- **Server Actions** handle mutations with auth + validation.
- **Route Handlers** for auth callbacks and code execution APIs.
- **No separate backend** — everything lives in the Next.js app.

---

## 2. Prisma Schema

See [`prisma/schema.prisma`](./prisma/schema.prisma).

Core models:

- **User, Session, Account, Verification** — Better Auth
- **Category** — 18 interview topics
- **Question, Answer** — question bank
- **Quiz, QuizQuestion, QuizAttempt** — quiz mode
- **Challenge, ChallengeAttempt** — coding playground
- **Bookmark, Note, Progress, StudyHistory** — user features

---

## 3. Database Relationships

```
User
 ├── bookmarks ──► Question
 ├── notes ──────► Question (optional)
 ├── progress ───► Question | Challenge | Category
 ├── quizAttempts ► Quiz
 ├── challengeAttempts ► Challenge
 └── studyHistory ► Question (optional)

Category
 ├── questions
 ├── challenges
 └── quizzes

Question
 ├── answers (1:N)
 ├── bookmarks
 ├── notes
 ├── progress
 └── quizQuestions ──► Quiz

Quiz
 ├── quizQuestions (M:N via join)
 └── quizAttempts

Challenge
 ├── challengeAttempts
 └── progress
```

**Key constraints**

- `Bookmark`: unique `(userId, questionId)`
- `Progress`: unique per `(userId, questionId, mode)` or `(userId, challengeId, mode)`
- `QuizQuestion`: unique `(quizId, questionId)`
- Cascading deletes on content owned by categories/questions

---

## 4. Seed Data

Run after migrating:

```bash
cp .env.example .env
# Set DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL
npm run db:migrate
npm run db:seed
```

Seed includes:

- All 18 categories (JavaScript → System Design)
- Sample questions (closures, event loop, React keys)
- 2 coding challenges (sum array, palindrome)
- 1 JavaScript basics quiz

---

## 5. Authentication Flow

**Provider:** Better Auth with email/password + Prisma adapter.

```
Register/Login (client)
    │
    ▼
authClient.signUp.email / signIn.email
    │
    ▼
POST /api/auth/[...all]  (Better Auth handler)
    │
    ▼
Prisma → user, session, account tables
    │
    ▼
HTTP-only session cookie
    │
    ▼
Server Components / Actions call auth.api.getSession({ headers })
```

**Protected routes (MVP):** bookmarks, progress, admin — redirect to `/login` if no session.

**Admin:** `User.role === "ADMIN"` checked in admin pages and admin Server Actions.

**Env vars:**

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 6. Main Pages & Routes

| Route | Purpose | Auth |
|-------|---------|------|
| `/` | Landing page | Public |
| `/login`, `/register` | Auth | Public |
| `/dashboard` | Study hub + stats | Public (personalized when signed in) |
| `/categories` | Category grid | Public |
| `/categories/[slug]` | Questions + challenges per topic | Public |
| `/questions/[id]` | Question detail | Public |
| `/flashcards` | Flashcard deck | Public |
| `/quiz` | Quiz list | Public |
| `/quiz/[id]` | Quiz player (next) | Public |
| `/challenges` | Challenge list | Public |
| `/challenges/[id]` | Code playground | Public (save attempts when signed in) |
| `/bookmarks` | Saved questions | Required |
| `/progress` | Study progress | Required |
| `/admin` | Admin dashboard | Admin |
| `/admin/questions` | Manage questions | Admin |
| `/api/auth/[...all]` | Auth API | — |
| `/api/challenges/[id]/run` | Run code tests | Required |
| `/api/health` | Health check | Public |

---

## 7. MVP Implementation Plan

### MVP scope (ship first)

1. **Content browsing** — categories, questions, challenges (read-only)
2. **Flashcards** — flip cards from question bank
3. **Coding playground** — run JS against test cases
4. **Auth** — register, login, session
5. **User tracking** — bookmarks, progress, challenge attempts
6. **Admin read** — list questions, basic counts
7. **Deploy** — Vercel + Neon Postgres

### Post-MVP (phase 2)

- Full quiz player with scoring + `QuizAttempt`
- Admin create/edit forms
- Interview simulation mode
- API challenge mode (mock REST endpoints)
- Notes UI
- Search and filters
- Vercel Cron for analytics aggregation
- Proper code sandbox (isolate-vm or external runner)

---

## 8. Step-by-Step Development Order

1. **Scaffold** — Next.js, Tailwind, shadcn, Prisma, env setup
2. **Database** — schema, migrate, seed categories + sample content
3. **Public browse** — landing, categories, question detail
4. **Learning modes** — flashcards, challenge list + playground
5. **Auth** — Better Auth, login/register, session in layout
6. **User features** — bookmarks, progress, study history actions
7. **Admin** — role check, question list, create action
8. **Quiz mode** — quiz player component + attempts
9. **Polish** — responsive nav, loading states, error boundaries
10. **Testing** — Vitest unit tests, Playwright smoke tests
11. **Deploy** — Vercel project, Neon DB, env vars, Analytics

---

## 9. Example Components

| Component | Location | Role |
|-----------|----------|------|
| `CategoryGrid` | `components/categories/category-grid.tsx` | Category cards with counts |
| `QuestionCard` | `components/questions/question-card.tsx` | Question preview card |
| `FlashcardDeck` | `components/flashcards/flashcard-deck.tsx` | Flip + navigate cards |
| `CodePlayground` | `components/challenges/code-playground.tsx` | Editor + run tests (TanStack Query) |
| `AppHeader` | `components/layout/app-header.tsx` | Top nav + mobile menu |
| `QueryProvider` | `components/providers/query-provider.tsx` | TanStack Query wrapper |

---

## 10. Example Server Actions & Route Handlers

### Server Actions

- `toggleBookmark(questionId)` — `src/actions/user.ts`
- `saveNote(questionId, content)` — `src/actions/user.ts`
- `recordStudySession({ questionId, mode })` — `src/actions/user.ts`
- `createQuestion(input)` — `src/actions/admin/questions.ts`
- `toggleQuestionPublished(id, isPublished)` — `src/actions/admin/questions.ts`

### Route Handlers

- `GET/POST /api/auth/[...all]` — Better Auth
- `POST /api/challenges/[id]/run` — validate + execute code, save attempt
- `GET /api/health` — DB connectivity check

---

## Local Development

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
```

## Vercel Deployment

1. Create Neon (or Supabase) Postgres database
2. Import repo to Vercel
3. Set environment variables from `.env.example`
4. Build command: `npm run build` (runs `prisma generate`)
5. Run migrations against production DB: `npx prisma migrate deploy`
6. Seed production once: `npm run db:seed`

## Security Notes (MVP)

- Code execution uses `Function` constructor — **replace with a proper sandbox** before opening to untrusted users at scale.
- Admin routes check role server-side in every action.
- All user mutations validate session via Better Auth.
- Use Zod for input validation on actions and API routes.
