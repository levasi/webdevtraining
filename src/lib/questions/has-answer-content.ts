import type { CategoryQuestionSummary, QuestionWithAnswers } from "@/types";

type QuestionLike = CategoryQuestionSummary | QuestionWithAnswers;

export function questionHasAnswerContent(question: QuestionLike): boolean {
  return question.answers.some(
    (answer) => typeof (answer as { content?: string }).content === "string",
  );
}
