/**
 * Normalizes question text for duplicate comparison.
 * Trims, lowercases, and collapses whitespace.
 */
export function normalizeQuestionText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Builds a stable dedupe key for a question within a category.
 * Same category + same title OR same content => duplicate.
 */
export function buildQuestionDedupeKey(title: string, content: string): string {
  return `${normalizeQuestionText(title)}::${normalizeQuestionText(content)}`;
}
