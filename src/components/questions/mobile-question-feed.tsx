"use client";

import { useEffect, useRef, useState } from "react";

import { LazyQuestionDetailPanel } from "@/components/questions/lazy-question-detail-panel";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { getQuestionIdFromHash, questionElementId, scrollToQuestion } from "@/lib/question-hash";
import { cn, wrapLongTextClass } from "@/lib/utils";
import type { CategoryQuestionSummary, QuestionWithAnswers } from "@/types";

type MobileQuestionFeedProps = {
  questions: CategoryQuestionSummary[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  completedIds: Set<string>;
  onCompletionChange: (questionId: string, completed: boolean) => void;
  onQuestionChange?: (question: QuestionWithAnswers) => void;
  onQuestionDeleted?: (questionId: string) => void;
  emptyMessage?: string;
  canEdit?: boolean;
};

type MobileQuestionCardProps = {
  question: CategoryQuestionSummary;
  searchQuery: string;
  completedIds: Set<string>;
  onCompletionChange: (questionId: string, completed: boolean) => void;
  onQuestionChange?: (question: QuestionWithAnswers) => void;
  onQuestionDeleted?: (questionId: string) => void;
  canEdit?: boolean;
};

function MobileQuestionCard({
  question,
  searchQuery,
  completedIds,
  onCompletionChange,
  onQuestionChange,
  onQuestionDeleted,
  canEdit,
}: MobileQuestionCardProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [question.id]);

  return (
    <article
      ref={ref}
      id={questionElementId(question.id)}
      className={cn(
        "scroll-mt-20 space-y-4 bg-card border-t border-t-border py-4",
        wrapLongTextClass,
      )}
    >
      {isVisible ? (
        <LazyQuestionDetailPanel
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
      ) : (
        <div className="space-y-3 px-1" aria-hidden="true">
          <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-20 animate-pulse rounded-lg bg-muted/60" />
        </div>
      )}
    </article>
  );
}

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
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isMobile) {
      return;
    }

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
  }, [questions, isMobile]);

  if (!isMobile) {
    return null;
  }

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
            <MobileQuestionCard
              key={question.id}
              question={question}
              searchQuery={searchQuery}
              completedIds={completedIds}
              onCompletionChange={onCompletionChange}
              onQuestionChange={onQuestionChange}
              onQuestionDeleted={onQuestionDeleted}
              canEdit={canEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
