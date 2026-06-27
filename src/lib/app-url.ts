function getLocalDevAppUrl(): string {
  const port = process.env.PORT ?? "3000";
  return `http://localhost:${port}`;
}

function isLocalAppUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function normalizeAppUrl(url: string): string {
  return url.replace(/\/$/, "");
}

/**
 * Canonical app URL for Better Auth and OAuth redirects.
 * In the browser, always use the current origin so local dev never calls production.
 */
export function getAppUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  if (process.env.NODE_ENV === "development") {
    if (process.env.BETTER_AUTH_URL && isLocalAppUrl(process.env.BETTER_AUTH_URL)) {
      return normalizeAppUrl(process.env.BETTER_AUTH_URL);
    }

    return getLocalDevAppUrl();
  }

  if (process.env.BETTER_AUTH_URL && !isLocalAppUrl(process.env.BETTER_AUTH_URL)) {
    return normalizeAppUrl(process.env.BETTER_AUTH_URL);
  }

  if (process.env.VERCEL === "1") {
    if (
      process.env.VERCEL_ENV === "production" &&
      process.env.VERCEL_PROJECT_PRODUCTION_URL
    ) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    }

    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
  }

  if (
    process.env.NEXT_PUBLIC_APP_URL &&
    !isLocalAppUrl(process.env.NEXT_PUBLIC_APP_URL)
  ) {
    return normalizeAppUrl(process.env.NEXT_PUBLIC_APP_URL);
  }

  return getLocalDevAppUrl();
}

export function getAuthClientBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return getAppUrl();
}

/** Redirect URI registered in Google Cloud Console for this app. */
export function getGoogleOAuthRedirectUri(appUrl = getAppUrl()): string {
  return `${normalizeAppUrl(appUrl)}/api/auth/google/callback`;
}
