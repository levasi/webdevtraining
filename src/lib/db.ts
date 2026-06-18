import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

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

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

export async function isDatabaseAvailable(): Promise<boolean> {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
