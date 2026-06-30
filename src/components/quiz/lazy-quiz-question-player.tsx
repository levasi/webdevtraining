"use client";

import { useFullQuestion } from "@/hooks/use-full-question";
import { QuizQuestionPlayer } from "@/components/quiz/quiz-question-player";
import type { CategoryQuestionSummary, QuestionWithAnswers } from "@/types";

type LazyQuizQuestionPlayerProps = {
  question: CategoryQuestionSummary | QuestionWithAnswers;
  showBackLink?: boolean;
};

export function LazyQuizQuestionPlayer({
  question,
  showBackLink,
}: LazyQuizQuestionPlayerProps) {
  const { question: fullQuestion, loading, error } = useFullQuestion(question);

  if (loading) {
    return (
      <div className="space-y-4" aria-busy="true" aria-label="Loading quiz question">
        <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-32 animate-pulse rounded-lg bg-muted/60" />
      </div>
    );
  }

  if (error || !fullQuestion) {
    return <p className="text-sm text-destructive">{error ?? "Question unavailable."}</p>;
  }

  return <QuizQuestionPlayer question={fullQuestion} showBackLink={showBackLink} />;
}
