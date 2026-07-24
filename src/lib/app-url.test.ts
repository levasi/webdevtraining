/** @vitest-environment node */
import { afterEach, describe, expect, it } from "vitest";

import { getAppUrl, getAuthClientBaseUrl } from "@/lib/app-url";

const KEYS = [
  "NODE_ENV",
  "PORT",
  "BETTER_AUTH_URL",
  "VERCEL",
  "VERCEL_ENV",
  "VERCEL_URL",
  "VERCEL_PROJECT_PRODUCTION_URL",
  "NEXT_PUBLIC_APP_URL",
] as const;

const ORIGINAL = Object.fromEntries(
  KEYS.map((key) => [key, process.env[key]]),
) as Record<(typeof KEYS)[number], string | undefined>;

afterEach(() => {
  for (const key of KEYS) {
    const value = ORIGINAL[key];
    if (value == null) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
});

describe("app-url", () => {
  it("uses localhost in development", () => {
    process.env.NODE_ENV = "development";
    delete process.env.BETTER_AUTH_URL;
    process.env.PORT = "3000";
    expect(getAppUrl()).toBe("http://localhost:3000");
  });

  it("uses production Better Auth URL when not local", () => {
    process.env.NODE_ENV = "production";
    process.env.BETTER_AUTH_URL = "https://app.example.com/";
    expect(getAppUrl()).toBe("https://app.example.com");
  });

  it("uses Vercel production URL when configured", () => {
    process.env.NODE_ENV = "production";
    delete process.env.BETTER_AUTH_URL;
    process.env.VERCEL = "1";
    process.env.VERCEL_ENV = "production";
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "webdev.vercel.app";
    expect(getAppUrl()).toBe("https://webdev.vercel.app");
  });

  it("mirrors getAppUrl on the server for auth client base URL", () => {
    process.env.NODE_ENV = "development";
    delete process.env.BETTER_AUTH_URL;
    expect(getAuthClientBaseUrl()).toBe(getAppUrl());
  });
});
