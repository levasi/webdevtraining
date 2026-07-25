export type DocsSection = {
  id: string;
  title: string;
  markdown: string;
};

export const DOCS_PAGE = {
  title: "Docs",
  description:
    "How Web Dev Training is built, what you can do in the app, and how the stack fits together.",
} as const;

/**
 * Public product documentation for `/docs`.
 * Owned by the App Docs Agent (`.cursor/skills/app-docs-agent`).
 */
export const DOCS_SECTIONS: DocsSection[] = [
  {
    id: "overview",
    title: "Overview",
    markdown: `Web Dev Training is an interview-prep app for frontend, backend, and full-stack developers.

Practice **questions**, **quizzes**, and **coding challenges** by topic, track what you have completed, save items for later, and get coaching from **Ask AI** grounded in the study bank when a match exists.

The app is a Next.js App Router project deployed on **Vercel**, with data in **PostgreSQL** (Neon) via **Prisma**, and auth via **Better Auth**.`,
  },
  {
    id: "stack",
    title: "Stack",
    markdown: `| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| UI | Tailwind CSS, shadcn/ui, Lucide icons |
| Data | PostgreSQL, Prisma ORM |
| Auth | Better Auth (email + Google OAuth when configured) |
| Server state | TanStack Query (where needed) |
| UI state | Zustand (minimal — e.g. mobile nav) |
| AI | Vercel AI SDK + Groq (\`@ai-sdk/groq\`) |
| Editors | Monaco (challenges), TipTap (rich text) |
| Testing | Vitest, Playwright |
| Deploy | Vercel + Analytics |

Key packages live in \`package.json\`. Prefer that file over this table when versions matter.`,
  },
  {
    id: "features",
    title: "Features & routes",
    markdown: `| Feature | Route | Notes |
| --- | --- | --- |
| Categories | \`/categories\`, \`/categories/[slug]\` | Questions, quizzes, articles, and challenges per topic; completed filters |
| Quizzes | \`/quiz\` and in-category quiz player | Multiple-choice style practice |
| Challenges | \`/challenges\`, \`/challenges/[id]\` | In-browser playground (JS/TS and Vue runners) |
| Ask AI | \`/chat\` + floating widget | Available without sign-in; shared conversation between widget and full page |
| Contextual Ask AI | Question / challenge panels | Sheet with item-specific context |
| Read later | \`/read-later\` | Bookmarked questions |
| Completed | \`/completed\` | Finished study items |
| Progress | \`/progress\` | Progress overview |
| Resources | \`/resources\` | Curated learning links |
| Articles | \`/articles/[id]\` | Full article view (also previewed in category) |
| Docs | \`/docs\` | This page |
| Auth | \`/login\`, \`/register\` | Session required for AI and personal progress |
| Admin | \`/admin\` | Question management and settings (admin users) |`,
  },
  {
    id: "architecture",
    title: "Architecture",
    markdown: `- **Route groups**: \`(app)\` for the main shell, \`(auth)\` for login/register, \`(admin)\` for admin UI.
- **Server Components** load data through \`src/lib/queries/*\`.
- **Server Actions** in \`src/actions/*\` handle mutations (progress, bookmarks, admin CRUD, proposals).
- **Route Handlers** under \`src/app/api/*\` cover auth, chat, challenge run, and small user APIs.
- **Prisma** models cover users/sessions, categories, questions/answers, quizzes, challenges, articles, bookmarks, notes, and progress.
- **Seed content** lives in \`prisma/data/*.ts\` and is applied with \`npm run db:seed\`.

Design goal: one Next.js app — no separate backend service.`,
  },
  {
    id: "ask-ai",
    title: "Ask AI",
    markdown: `Ask AI is interview coaching for web developers.

**Surfaces**

- Floating **Ask AI** widget (bottom-right) on most app pages
- Full page at \`/chat\` (same shared conversation as the widget)
- **Ask AI** sheets on question and challenge detail panels (contextual; separate from the global chat)

**Behavior**

- Available without sign-in
- Uses \`POST /api/chat\` with the AI SDK UI message stream
- Retrieves related study snippets (hybrid keyword search) to ground answers when possible
- When citing study questions or articles, replies include markdown links to those items
- Widget size is resizable and remembered in \`localStorage\`

**Configuration**

| Variable | Required | Purpose |
| --- | --- | --- |
| \`GROQ_API_KEY\` | Yes | Groq API key ([console.groq.com/keys](https://console.groq.com/keys)) |
| \`AI_CHAT_MODEL\` | No | Override model id (default \`llama-3.1-8b-instant\`) |

Set these in \`.env.local\` for local dev and in the **Vercel project Environment Variables** for Production. Redeploy after changing Production secrets.

Keys must be plain ASCII. Polluted env values (for example tip text mixed into the secret) cause header/ByteString failures.`,
  },
  {
    id: "local-production",
    title: "Local & production",
    markdown: `**Common scripts**

| Script | Purpose |
| --- | --- |
| \`npm run dev\` | Local Next.js dev server |
| \`npm run build\` / \`npm start\` | Production build & serve |
| \`npm run db:migrate\` / \`db:push\` | Schema updates |
| \`npm run db:seed\` | Seed categories and questions |
| \`npm run questions:audit\` | Audit interview question bank |
| \`npm test\` | Vitest unit tests (\`src/**/*.test.ts\`) |
| \`npm run test:e2e\` | Playwright smoke tests (\`e2e/\`) |

**Also expect** database URL vars (\`DATABASE_URL\` / Neon-style aliases), Better Auth secrets (\`BETTER_AUTH_SECRET\`, \`BETTER_AUTH_URL\`), and optional Google OAuth client id/secret for social login.

Production runs on Vercel. After adding or rotating secrets, trigger a new deployment so serverless functions pick them up.`,
  },
  {
    id: "testing",
    title: "Testing",
    markdown: `Automated tests cover core product logic and public route smokes.

| Kind | Tool | Command | Location |
| --- | --- | --- | --- |
| Unit | Vitest (jsdom) | \`npm test\` | \`src/**/*.{test,spec}.{ts,tsx}\` |
| E2E | Playwright (Chromium) | \`npm run test:e2e\` | \`e2e/*.spec.ts\` |

**Unit focus:** question sort/eligibility/preview helpers, challenge meta + local runner + draft storage, AI config/prompt/errors, validators, database/app URL helpers, docs content integrity.

**E2E focus:** public pages (\`/\`, categories, challenges, quiz, docs, resources, chat, auth screens), seeded category (\`/categories/javascript\`), and anonymous redirects from \`/completed\` and \`/read-later\` to login.

Owned by the **App Testing Agent** (\`.cursor/skills/app-testing-agent\`). Gaps still include authenticated flows, admin UI, and full Ask AI streaming conversations.`,
  },
  {
    id: "agents",
    title: "Repo agents",
    markdown: `Cursor project skills under \`.cursor/skills/\` help maintain this repo:

| Agent | Role |
| --- | --- |
| **App Docs Agent** | Owns \`/docs\` and \`src/lib/docs/site-docs.ts\` (this page) |
| **App Testing Agent** | Owns Vitest + Playwright coverage across features |
| **App Cleanup Auditor** | Finds leftover files, dead exports, and refactor opportunities |
| **Interview Question Generator** | Adds unique questions to \`prisma/data\` and seeds |

Invoke them from chat when you want docs refreshed, more tests, a cleanup audit, or new interview questions.`,
  },
];
