import { nanoid } from "nanoid";

export const GENERATED_QUIZ_ID_PREFIX = "generated-";

export function isGeneratedQuizId(id: string) {
  return id.startsWith(GENERATED_QUIZ_ID_PREFIX);
}

export function createGeneratedQuizId() {
  return `${GENERATED_QUIZ_ID_PREFIX}${nanoid(12)}`;
}

/** Fisher–Yates shuffle, returns a new array. */
export function shuffleItems<T>(items: T[]): T[] {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = next[index];
    next[index] = next[swapIndex]!;
    next[swapIndex] = temp!;
  }
  return next;
}

export function pickRandomQuestionIds(
  questionIds: string[],
  count: number,
): string[] {
  if (questionIds.length === 0 || count <= 0) {
    return [];
  }
  return shuffleItems(questionIds).slice(
    0,
    Math.min(count, questionIds.length),
  );
}
