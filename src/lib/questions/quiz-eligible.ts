export function isQuizEligibleQuestion(
  question: { answers: Array<{ id: string }> },
) {
  return question.answers.length > 0;
}

export function filterQuizEligibleQuestions<T extends { answers: Array<{ id: string }> }>(
  questions: T[],
) {
  return questions.filter(isQuizEligibleQuestion);
}
