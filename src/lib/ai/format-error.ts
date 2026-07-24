function readErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "";
}

function readNestedMessage(error: unknown): string {
  if (!error || typeof error !== "object") {
    return "";
  }

  const withCause = error as {
    message?: string;
    cause?: unknown;
    data?: { error?: { message?: string; type?: string } };
  };

  const fromData = withCause.data?.error?.message;
  if (fromData) {
    return fromData;
  }

  if (withCause.cause) {
    return readErrorMessage(withCause.cause) || readNestedMessage(withCause.cause);
  }

  return withCause.message ?? "";
}

/**
 * Maps AI Gateway / provider failures to a short user-facing message.
 */
export function formatAiChatError(error: unknown): string {
  const message = `${readErrorMessage(error)} ${readNestedMessage(error)}`.toLowerCase();

  if (
    message.includes("credit card") ||
    message.includes("customer_verification_required")
  ) {
    return "AI Gateway needs a credit card on your Vercel team to unlock free credits. Add one in the Vercel AI Gateway settings, then try again.";
  }

  if (
    message.includes("bytestring") ||
    message.includes("greater than 255")
  ) {
    return "GROQ_API_KEY looks corrupted (non-ASCII characters in an HTTP header). Re-add a clean key in Vercel env from https://console.groq.com/keys, then redeploy.";
  }

  if (
    message.includes("groq") &&
    (message.includes("api key") ||
      message.includes("unauthorized") ||
      message.includes("401") ||
      message.includes("invalid"))
  ) {
    return "Groq is not configured. Set GROQ_API_KEY in the Vercel project env (Production) from https://console.groq.com/keys, then redeploy. For local, add it to .env.local and restart.";
  }

  if (
    message.includes("missing") &&
    message.includes("api") &&
    message.includes("key")
  ) {
    return "Groq is not configured. Set GROQ_API_KEY in the Vercel project env (Production) from https://console.groq.com/keys, then redeploy. For local, add it to .env.local and restart.";
  }

  if (message.includes("unauthorized") || message.includes("api key")) {
    return "AI provider is not configured. Set GROQ_API_KEY in Vercel env (or .env.local locally) from https://console.groq.com/keys.";
  }

  if (message.includes("rate limit") || message.includes("429")) {
    return "The free AI model is rate-limited right now. Wait a moment and try again.";
  }

  const short = readErrorMessage(error) || readNestedMessage(error);
  if (short && short.length < 180 && !short.includes("[object Object]")) {
    return short;
  }

  return "The AI service failed to respond. Please try again in a moment.";
}
