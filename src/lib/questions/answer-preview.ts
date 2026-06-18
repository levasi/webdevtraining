import type { QuestionWithAnswers } from "@/types";

export function getQuestionAnswerPreview(question: QuestionWithAnswers): {
  answers: string[];
  explanation: string | null;
} {
  const answers = question.answers
    .filter((answer) => answer.isCorrect)
    .map((answer) => answer.content);

  return {
    answers,
    explanation: question.explanation,
  };
}

export function hasQuestionAnswerPreview(question: QuestionWithAnswers): boolean {
  const { answers, explanation } = getQuestionAnswerPreview(question);
  return answers.length > 0 || Boolean(explanation);
}
