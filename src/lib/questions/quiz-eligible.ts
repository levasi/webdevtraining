const QUIZ_ELIGIBLE_TYPES = new Set(["MULTIPLE_CHOICE", "TRUE_FALSE"]);

export function isQuizEligibleQuestion(question: {
  type: string;
  answers: Array<{ id: string }>;
}) {
  return (
    QUIZ_ELIGIBLE_TYPES.has(question.type) && question.answers.length >= 2
  );
}

export function filterQuizEligibleQuestions<
  T extends { type: string; answers: Array<{ id: string }> },
>(questions: T[]) {
  return questions.filter(isQuizEligibleQuestion);
}

/** Study/interview questions — excludes MC/TF items reserved for Quizzes. */
export function filterStudyQuestions<
  T extends { type: string; answers: Array<{ id: string }> },
>(questions: T[]) {
  return questions.filter((question) => !isQuizEligibleQuestion(question));
}
