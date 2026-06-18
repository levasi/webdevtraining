# WebDevTraining

Modern technical interview preparation platform for frontend, backend, and full-stack developers.

## Quick start

```bash
npm install
cp .env.example .env
# Configure DATABASE_URL and Better Auth secrets
npm run db:migrate
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:seed` | Seed categories, questions, challenges |
| `npm test` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright E2E tests |

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for folder structure, database design, auth flow, MVP plan, and deployment guide.

## Stack

Next.js · React · TypeScript · Tailwind · shadcn/ui · Prisma · PostgreSQL · Better Auth · TanStack Query · Zustand · Vitest · Playwright · Vercel
