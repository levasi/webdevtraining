import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "@/generated/prisma/client";
import { createDevTtlCache } from "@/lib/dev-cache";
import {
  getRuntimeDatabaseConnectionString,
  hasDatabaseConnectionString,
} from "@/lib/database-url";

const dbAvailabilityCache = createDevTtlCache<boolean>(60_000);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
  connectionString: string | undefined;
};

export function hasDatabaseUrl(): boolean {
  return hasDatabaseConnectionString();
}

function resetPrismaClient(): void {
  void globalForPrisma.pool?.end().catch(() => undefined);
  globalForPrisma.pool = undefined;
  globalForPrisma.prisma = undefined;
  globalForPrisma.connectionString = undefined;
}

function createPrismaClient(): PrismaClient {
  const connectionString = getRuntimeDatabaseConnectionString();

  if (
    globalForPrisma.connectionString &&
    globalForPrisma.connectionString !== connectionString
  ) {
    resetPrismaClient();
  }

  const pool =
    globalForPrisma.pool ??
    new Pool({
      connectionString,
      max: process.env.NODE_ENV === "development" ? 3 : undefined,
    });

  globalForPrisma.pool = pool;
  globalForPrisma.connectionString = connectionString;

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
    resetPrismaClient();
    dbAvailabilityCache.clear();
    return false;
  }
}
