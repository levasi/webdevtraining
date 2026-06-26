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
      return process.env.BETTER_AUTH_URL;
    }

    return getLocalDevAppUrl();
  }

  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return getLocalDevAppUrl();
}

export function getAuthClientBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return getAppUrl();
}
