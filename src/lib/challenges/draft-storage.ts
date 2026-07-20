const STORAGE_PREFIX = "webdevtraining-challenge-draft:";

export function draftStorageKey(challengeId: string): string {
  return `${STORAGE_PREFIX}${challengeId}`;
}

export function loadChallengeDraft(
  challengeId: string,
  starterCode: string,
): string {
  if (typeof window === "undefined") return starterCode;
  try {
    const saved = window.localStorage.getItem(draftStorageKey(challengeId));
    return saved ?? starterCode;
  } catch {
    return starterCode;
  }
}

export function saveChallengeDraft(
  challengeId: string,
  code: string,
  starterCode: string,
): void {
  if (typeof window === "undefined") return;
  try {
    const key = draftStorageKey(challengeId);
    if (code === starterCode) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, code);
    }
  } catch {
    // Ignore quota / private mode errors.
  }
}

export function clearChallengeDraft(challengeId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(draftStorageKey(challengeId));
  } catch {
    // Ignore.
  }
}
