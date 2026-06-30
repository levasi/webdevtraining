"use client";

import { useFullQuestion } from "@/hooks/use-full-question";
import { QuestionDetailPanel } from "@/components/questions/question-detail-panel";
import type { CategoryQuestionSummary, QuestionWithAnswers } from "@/types";

type LazyQuestionDetailPanelProps = {
  question: CategoryQuestionSummary | QuestionWithAnswers;
  showCategory?: boolean;
  titleAs?: "h1" | "h2";
  onQuestionChange?: (question: QuestionWithAnswers) => void;
  searchQuery?: string;
  isCompleted?: boolean;
  onCompletionChange?: (questionId: string, completed: boolean) => void;
  isReadLater?: boolean;
  onReadLaterChange?: (questionId: string, readLater: boolean) => void;
  canEdit?: boolean;
  onQuestionDeleted?: (questionId: string) => void;
};

export function LazyQuestionDetailPanel({
  question,
  ...props
}: LazyQuestionDetailPanelProps) {
  const { question: fullQuestion, loading, error } = useFullQuestion(question);

  if (loading) {
    return (
      <div className="space-y-4" aria-busy="true" aria-label="Loading question">
        <div className="h-6 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-24 animate-pulse rounded-lg bg-muted/60" />
      </div>
    );
  }

  if (error || !fullQuestion) {
    return <p className="text-sm text-destructive">{error ?? "Question unavailable."}</p>;
  }

  return <QuestionDetailPanel question={fullQuestion} {...props} />;
}
