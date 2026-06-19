import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { getAppUrl } from "@/lib/app-url";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
  baseURL: getAppUrl(),
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signOut, useSession } = authClient;
