# Interview Question Generator — Repository Reference

## Question database location

Questions are **TypeScript seed data**, not markdown files.

| Path | Purpose |
|------|---------|
| `prisma/data/types.ts` | `SeedQuestion` type definition |
| `prisma/data/index.ts` | Aggregates `ALL_SEED_QUESTIONS` |
| `prisma/data/*.ts` | Category question arrays |
| `src/lib/constants.ts` | `CATEGORIES` slugs and display names |
| `prisma/seed.ts` | Upserts questions into PostgreSQL |
| `src/lib/questions/dedup.ts` | Duplicate key helpers |

## Category → file mapping

| Category slug | Source file | Export name |
|---------------|-------------|-------------|
| `javascript` | `prisma/data/javascript.ts` | `javascriptQuestions` |
| `typescript` | `prisma/data/typescript-react.ts` | `typescriptQuestions` |
| `react` | `prisma/data/typescript-react.ts` | `reactQuestions` |
| `nextjs` | `prisma/data/frontend-frameworks.ts` | `nextjsQuestions` |
| `vue` | `prisma/data/frontend-frameworks.ts` | `vueQuestions` |
| `nuxt` | `prisma/data/frontend-frameworks.ts` | `nuxtQuestions` |
| `html` | `prisma/data/html-css.ts` | `htmlQuestions` |
| `css` | `prisma/data/html-css.ts` | `cssQuestions` |
| `nodejs` | `prisma/data/backend.ts` | `nodejsQuestions` |
| `express` | `prisma/data/backend.ts` | `expressQuestions` |
| `rest-apis` | `prisma/data/backend.ts` | `restApiQuestions` |
| `sql` | `prisma/data/data-ops.ts` | `sqlQuestions` |
| `postgresql` | `prisma/data/data-ops.ts` | `postgresqlQuestions` |
| `git` | `prisma/data/data-ops.ts` | `gitQuestions` |
| `testing` | `prisma/data/quality-architecture.ts` | `testingQuestions` |
| `security` | `prisma/data/quality-architecture.ts` | `securityQuestions` |
| `performance` | `prisma/data/quality-architecture.ts` | `performanceQuestions` |
| `system-design` | `prisma/data/quality-architecture.ts` | `systemDesignQuestions` |

### Topics without a dedicated category

Use the closest existing category and descriptive tags until a new category is added:

| Requested topic | Use category | Example tags |
|-----------------|--------------|--------------|
| Playwright, Jest, Cypress | `testing` | `playwright`, `jest`, `cypress` |
| WebSockets, GraphQL | `rest-apis` or `nodejs` | `websockets`, `graphql` |
| Accessibility | `html` | `a11y`, `accessibility` |
| Frontend Architecture | `system-design` | `architecture`, `microfrontends` |
| CI/CD | `git` or `system-design` | `ci-cd`, `github-actions` |
| AI Assisted Development | `testing` or `system-design` | `ai`, `copilot` |
| Angular | Add category first (see below) | `angular` |

### Adding a new category

1. Add entry to `CATEGORIES` in `src/lib/constants.ts`
2. Create or extend a file under `prisma/data/`
3. Export array and append to `ALL_SEED_QUESTIONS` in `prisma/data/index.ts`
4. Run `npm run db:seed`

## Difficulty mapping

| User request | `SeedDifficulty` |
|--------------|------------------|
| junior | `BEGINNER` |
| mid | `INTERMEDIATE` |
| senior | `ADVANCED` |
| advanced | `ADVANCED` |

## ID conventions

Format: `seed-{prefix}-{topic-slug}`

Examples: `seed-js-closure`, `seed-react-memo`, `seed-sd-microfrontends`

Before creating IDs:

1. `rg 'id: "seed-' prisma/data` — find existing IDs for the category
2. Never reuse an ID
3. Keep slugs short, descriptive, kebab-case

## Field mapping (rich interview questions)

Map the agent's conceptual fields to `SeedQuestion`:

| Agent field | Seed field | Notes |
|-------------|------------|-------|
| id | `id` | Unique, `seed-*` prefix |
| title | `title` | Sidebar label; concise |
| category | `categorySlug` | Slug from `CATEGORIES` |
| difficulty | `difficulty` | `BEGINNER` \| `INTERMEDIATE` \| `ADVANCED` |
| tags | `tags` | Lowercase kebab-case strings |
| question | `content` | Scenario or prompt (right panel, above answer) |
| shortAnswer | `explanation` | One-paragraph summary |
| detailedAnswer + example + interviewerExpectations | `answers[0].content` | Structured sections (see template) |
| — | `type` | Use `FLASHCARD` for interview Q&A |
| — | `answers[0].isCorrect` | Always `true` for FLASHCARD |

### Answer body template (`answers[0].content`)

```
Short Answer
{one paragraph}

Detailed Answer
{multi-paragraph explanation}

Example
{code or scenario}

What The Interviewer Expects
• Point 1
• Point 2
• Point 3
```

Use `whitespace-pre-wrap` rendering — plain text with clear section headers, not markdown.

## Question types

| Type | When to use |
|------|-------------|
| `FLASHCARD` | Interview Q&A, scenario + detailed answer (default for this agent) |
| `MULTIPLE_CHOICE` | Quiz with 3–4 options, one correct |
| `TRUE_FALSE` | Binary factual checks |
| `SHORT_ANSWER` | Brief text response only |

## UI behavior

- Category page: `/categories/{slug}` — sidebar lists `title`, right panel shows `content` + answer
- Detail page: `/questions/{id}`

## Company simulation mode

Adjust topic focus when the user names a company type:

| Company type | Emphasis |
|--------------|----------|
| Google | Algorithms, performance, scalability, browser internals, architecture |
| Meta | React, frontend performance, rendering, UX at scale |
| Fintech | Security, authentication, transactions, validation, accessibility |
| E-commerce | Checkout flows, SSR, SEO, performance, caching |
| iGaming | WebSockets, real-time state, performance, animations, payments, dashboards |
| Vue/Nuxt agency | SSR, SSG, hydration, Pinia, API integration, reusable architecture |

## Audit commands

```bash
# Count questions, list duplicates
npm run questions:audit

# Search existing questions before adding
npm run questions:audit -- --search "closure"
npm run questions:audit -- --search "microfrontend"
```

After adding questions:

```bash
npm run db:seed
npm run questions:audit
```
