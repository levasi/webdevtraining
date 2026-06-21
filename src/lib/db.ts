import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "@/generated/prisma/client";
import { createDevTtlCache } from "@/lib/dev-cache";

const dbAvailabilityCache = createDevTtlCache<boolean>(60_000);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

export function hasDatabaseUrl(): boolean {
  return Boolean(process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL);
}

function getDatabaseUrl(): string {
  const directUrl = process.env.DIRECT_DATABASE_URL;
  if (directUrl) {
    return directUrl;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (
    databaseUrl.startsWith("postgresql://") ||
    databaseUrl.startsWith("postgres://")
  ) {
    return databaseUrl;
  }

  if (databaseUrl.startsWith("prisma+postgres://")) {
    throw new Error(
      "DATABASE_URL uses prisma+postgres:// but DIRECT_DATABASE_URL is missing. Run `npx prisma dev`, copy the printed postgres:// URL into DIRECT_DATABASE_URL, then restart the app.",
    );
  }

  return databaseUrl;
}

function createPrismaClient() {
  const connectionString = getDatabaseUrl();

  const pool =
    globalForPrisma.pool ??
    new Pool({
      connectionString,
      max: process.env.NODE_ENV === "development" ? 3 : undefined,
    });

  if (!globalForPrisma.pool) {
    globalForPrisma.pool = pool;
  }

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = createPrismaClient();
  globalForPrisma.prisma = client;

  return client;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = Reflect.get(client as object, prop) as unknown;

    if (typeof value === "function") {
      return value.bind(client);
    }

    return value;
  },
});

export async function isDatabaseAvailable(): Promise<boolean> {
  const cached = dbAvailabilityCache.get();
  if (cached !== null) {
    return cached;
  }

  if (!hasDatabaseUrl()) {
    dbAvailabilityCache.set(false);
    return false;
  }

  try {
    await db.$queryRaw`SELECT 1`;
    dbAvailabilityCache.set(true);
    return true;
  } catch {
    dbAvailabilityCache.set(false);
    return false;
  }
}
