const DRAFT_KEY = "wdt:js-playground-draft";

export const PLAYGROUND_STARTER = `// Write JavaScript and click Run.
// Use console.log to print to the console below.

const greeting = "Hello from the playground";
console.log(greeting);
`;

export function loadPlaygroundDraft(fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    return raw != null && raw.length > 0 ? raw : fallback;
  } catch {
    return fallback;
  }
}

export function savePlaygroundDraft(code: string, starter: string) {
  if (typeof window === "undefined") return;
  try {
    if (code === starter) {
      window.localStorage.removeItem(DRAFT_KEY);
    } else {
      window.localStorage.setItem(DRAFT_KEY, code);
    }
  } catch {
    // Ignore quota / private mode failures.
  }
}

export function clearPlaygroundDraft() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Ignore.
  }
}
