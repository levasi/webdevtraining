import type { QuestionWithAnswers } from "@/types";

export function getQuestionAnswerPreview(question: QuestionWithAnswers): {
  answers: string[];
} {
  const answers = question.answers
    .filter((answer) => answer.isCorrect)
    .map((answer) => answer.content);

  return { answers };
}

export function hasQuestionAnswerPreview(question: QuestionWithAnswers): boolean {
  return getQuestionAnswerPreview(question).answers.length > 0;
}
