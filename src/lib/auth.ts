import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { db } from "@/lib/db";

const appUrl =
  process.env.BETTER_AUTH_URL ??
  process.env.NEXT_PUBLIC_APP_URL ??
  "http://localhost:3000";

export const auth = betterAuth({
  secret:
    process.env.BETTER_AUTH_SECRET ??
    (process.env.NODE_ENV === "production"
      ? undefined
      : "dev-only-secret-change-me-before-production"),
  baseURL: appUrl,
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // Match poetryhub / Google Cloud redirect URIs: /api/auth/google/callback
      redirectURI: `${appUrl}/api/auth/google/callback`,
      prompt: "select_account",
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
      // Allow linking when an older email/password user has emailVerified: false
      requireLocalEmailVerified: false,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        input: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
});

export type Session = typeof auth.$Infer.Session;
