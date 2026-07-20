import { config } from "dotenv";

/** Load `.env` then `.env.local` (same precedence as Next.js for local dev). */
export function loadProjectEnv(): void {
  config();
  config({ path: ".env.local", override: true });
}

function isPostgresUrl(url: string): boolean {
  return url.startsWith("postgresql://") || url.startsWith("postgres://");
}

function firstPostgresUrl(
  ...candidates: Array<string | undefined>
): string | undefined {
  for (const candidate of candidates) {
    if (candidate && isPostgresUrl(candidate)) {
      return normalizePostgresConnectionString(candidate);
    }
  }

  return undefined;
}

/** Avoid pg v8 deprecation warnings for sslmode=require|prefer|verify-ca. */
export function normalizePostgresConnectionString(url: string): string {
  if (!isPostgresUrl(url)) {
    return url;
  }

  try {
    const parsed = new URL(url);
    const sslmode = parsed.searchParams.get("sslmode");

    if (
      sslmode === "prefer" ||
      sslmode === "require" ||
      sslmode === "verify-ca"
    ) {
      parsed.searchParams.set("sslmode", "verify-full");
      return parsed.toString();
    }

    return url;
  } catch {
    return url;
  }
}

/**
 * Runtime connections (Next.js app, API routes): prefer pooled DATABASE_URL
 * so `.env.local` Neon credentials override a stale local DIRECT_DATABASE_URL in `.env`.
 */
export function getRuntimeDatabaseConnectionString(): string {
  const runtimeUrl = firstPostgresUrl(
    process.env.DATABASE_URL,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.DIRECT_DATABASE_URL,
  );

  if (runtimeUrl) {
    return runtimeUrl;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "Set DATABASE_URL (or DATABASE_URL_UNPOOLED / DIRECT_DATABASE_URL) before connecting.",
    );
  }

  if (databaseUrl.startsWith("prisma+postgres://")) {
    throw new Error(
      "DATABASE_URL uses prisma+postgres:// but no direct postgresql:// URL is configured. Run `npx prisma dev`, copy the printed postgres:// URL into DIRECT_DATABASE_URL, or set DATABASE_URL_UNPOOLED.",
    );
  }

  return normalizePostgresConnectionString(databaseUrl);
}

function isLocalPostgresUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1"
    );
  } catch {
    return false;
  }
}

/** Migrations and seed scripts: prefer direct/unpooled URLs when available. */
export function getDirectDatabaseConnectionString(): string {
  const preferred = firstPostgresUrl(
    process.env.DATABASE_URL_UNPOOLED,
    process.env.DIRECT_DATABASE_URL,
    process.env.DATABASE_URL,
  );

  // Skip a stale local prisma/dev proxy when Neon (or another remote) is configured.
  if (preferred && isLocalPostgresUrl(preferred)) {
    const remote = firstPostgresUrl(
      process.env.DATABASE_URL_UNPOOLED,
      process.env.DATABASE_URL,
    );
    if (remote && !isLocalPostgresUrl(remote)) {
      return remote;
    }
  }

  return preferred ?? getRuntimeDatabaseConnectionString();
}

/** @deprecated Use getRuntimeDatabaseConnectionString or getDirectDatabaseConnectionString. */
export function getDatabaseConnectionString(): string {
  return getRuntimeDatabaseConnectionString();
}

export function hasDatabaseConnectionString(): boolean {
  return Boolean(
    process.env.DATABASE_URL ??
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.DIRECT_DATABASE_URL,
  );
}
