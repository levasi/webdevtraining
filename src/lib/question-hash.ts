const QUESTION_HASH_PREFIX = "question-";

export function questionElementId(questionId: string) {
  return `${QUESTION_HASH_PREFIX}${questionId}`;
}

export function getQuestionIdFromHash(hash: string): string | null {
  const normalized = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!normalized.startsWith(QUESTION_HASH_PREFIX)) {
    return null;
  }

  const questionId = normalized.slice(QUESTION_HASH_PREFIX.length);
  return questionId.length > 0 ? questionId : null;
}

export function categoryQuestionHref(categorySlug: string, questionId: string) {
  return `/categories/${categorySlug}#${questionElementId(questionId)}`;
}

export function scrollToQuestion(questionId: string) {
  const element = document.getElementById(questionElementId(questionId));
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}
