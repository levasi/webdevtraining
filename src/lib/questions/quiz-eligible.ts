import type { QuestionWithAnswers } from "@/types";

export function isQuizEligibleQuestion(
  question: Pick<QuestionWithAnswers, "answers">,
) {
  return question.answers.length > 0;
}

export function filterQuizEligibleQuestions<T extends Pick<QuestionWithAnswers, "answers">>(
  questions: T[],
) {
  return questions.filter(isQuizEligibleQuestion);
}
