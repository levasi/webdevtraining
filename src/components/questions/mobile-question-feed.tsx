"use client";

import { useEffect } from "react";

import { QuestionDetailPanel } from "@/components/questions/question-detail-panel";
import { Input } from "@/components/ui/input";
import { getQuestionIdFromHash, questionElementId, scrollToQuestion } from "@/lib/question-hash";
import { cn, wrapLongTextClass } from "@/lib/utils";
import type { QuestionWithAnswers } from "@/types";

type MobileQuestionFeedProps = {
  questions: QuestionWithAnswers[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  completedIds: Set<string>;
  onCompletionChange: (questionId: string, completed: boolean) => void;
  onQuestionChange?: (question: QuestionWithAnswers) => void;
  onQuestionDeleted?: (questionId: string) => void;
  emptyMessage?: string;
  canEdit?: boolean;
};

export function MobileQuestionFeed({
  questions,
  searchQuery,
  onSearchChange,
  completedIds,
  onCompletionChange,
  onQuestionChange,
  onQuestionDeleted,
  emptyMessage = "No questions match the current filter.",
  canEdit = false,
}: MobileQuestionFeedProps) {
  useEffect(() => {
    function scrollToHashQuestion() {
      const questionId = getQuestionIdFromHash(window.location.hash);
      if (!questionId) {
        return;
      }

      scrollToQuestion(questionId);
    }

    scrollToHashQuestion();
    window.addEventListener("hashchange", scrollToHashQuestion);
    return () => window.removeEventListener("hashchange", scrollToHashQuestion);
  }, [questions]);

  return (
    <div className={cn("space-y-4 lg:hidden", wrapLongTextClass)}>
      <Input
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search questions..."
        aria-label="Search questions"
      />

      {questions.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      ) : (
        <div className="space-y-6" aria-label="Questions in category">
          {questions.map((question) => (
            <article
              key={question.id}
              id={questionElementId(question.id)}
              className={cn(
                "scroll-mt-20 space-y-4 bg-card border-t border-t-border py-4",
                wrapLongTextClass,
              )}
            >
              <QuestionDetailPanel
                question={question}
                showCategory={false}
                titleAs="h2"
                searchQuery={searchQuery}
                isCompleted={completedIds.has(question.id)}
                onCompletionChange={onCompletionChange}
                onQuestionChange={onQuestionChange}
                onQuestionDeleted={onQuestionDeleted}
                canEdit={canEdit}
              />
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
