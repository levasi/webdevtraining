import { afterEach, describe, expect, it } from "vitest";

import {
  getRuntimeDatabaseConnectionString,
  hasDatabaseConnectionString,
  normalizePostgresConnectionString,
} from "@/lib/database-url";

const ORIGINAL = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_UNPOOLED: process.env.DATABASE_URL_UNPOOLED,
  DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL,
};

afterEach(() => {
  for (const [key, value] of Object.entries(ORIGINAL)) {
    if (value == null) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
});

describe("database-url", () => {
  it("normalizes weak sslmode values to verify-full", () => {
    expect(
      normalizePostgresConnectionString(
        "postgresql://user:pass@host/db?sslmode=require",
      ),
    ).toContain("sslmode=verify-full");
  });

  it("leaves non-postgres urls untouched", () => {
    expect(normalizePostgresConnectionString("https://example.com")).toBe(
      "https://example.com",
    );
  });

  it("prefers DATABASE_URL for runtime connections", () => {
    process.env.DATABASE_URL = "postgresql://user:pass@db.example/app";
    process.env.DIRECT_DATABASE_URL = "postgresql://user:pass@direct.example/app";
    expect(getRuntimeDatabaseConnectionString()).toContain("db.example");
  });

  it("reports whether any database url is configured", () => {
    delete process.env.DATABASE_URL;
    delete process.env.DATABASE_URL_UNPOOLED;
    delete process.env.DIRECT_DATABASE_URL;
    expect(hasDatabaseConnectionString()).toBe(false);

    process.env.DATABASE_URL = "postgresql://user:pass@localhost/db";
    expect(hasDatabaseConnectionString()).toBe(true);
  });
});
