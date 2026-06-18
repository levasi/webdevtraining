import { createAuthClient } from "better-auth/react";

import { getAppUrl } from "@/lib/app-url";

export const authClient = createAuthClient({
  baseURL: getAppUrl(),
});

export const { signIn, signOut, useSession } = authClient;
