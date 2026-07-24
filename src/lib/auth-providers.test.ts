import { afterEach, describe, expect, it } from "vitest";

import { isGoogleAuthEnabled } from "@/lib/auth-providers";
import { getGoogleAvatarUrl } from "@/lib/user-avatar";

const ORIGINAL = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
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

describe("auth providers", () => {
  it("requires both Google client id and secret", () => {
    delete process.env.GOOGLE_CLIENT_ID;
    delete process.env.GOOGLE_CLIENT_SECRET;
    expect(isGoogleAuthEnabled()).toBe(false);

    process.env.GOOGLE_CLIENT_ID = "id";
    process.env.GOOGLE_CLIENT_SECRET = "secret";
    expect(isGoogleAuthEnabled()).toBe(true);
  });
});

describe("getGoogleAvatarUrl", () => {
  it("returns undefined for empty values", () => {
    expect(getGoogleAvatarUrl(null)).toBeUndefined();
    expect(getGoogleAvatarUrl("")).toBeUndefined();
  });

  it("appends a thumbnail size for googleusercontent urls", () => {
    expect(getGoogleAvatarUrl("https://lh3.googleusercontent.com/a/ABC")).toBe(
      "https://lh3.googleusercontent.com/a/ABC=s96-c",
    );
  });

  it("leaves other urls unchanged", () => {
    expect(getGoogleAvatarUrl("https://cdn.example.com/me.png")).toBe(
      "https://cdn.example.com/me.png",
    );
  });
});
