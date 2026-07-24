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
    message.includes("groq") &&
    (message.includes("api key") ||
      message.includes("unauthorized") ||
      message.includes("401") ||
      message.includes("invalid"))
  ) {
    return "Groq is not configured. Add GROQ_API_KEY from https://console.groq.com/keys to .env.local and restart the app.";
  }

  if (
    message.includes("missing") &&
    message.includes("api") &&
    message.includes("key")
  ) {
    return "Groq is not configured. Add GROQ_API_KEY from https://console.groq.com/keys to .env.local and restart the app.";
  }

  if (message.includes("unauthorized") || message.includes("api key")) {
    return "AI provider is not configured. Set GROQ_API_KEY in .env.local (from https://console.groq.com/keys) and restart.";
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
