"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { QuestionCompletionCheckbox } from "@/components/questions/question-completion-checkbox";
import { QuestionDetailPanel } from "@/components/questions/question-detail-panel";
import { Input } from "@/components/ui/input";
import type { QuestionWithAnswers } from "@/types";

type MobileQuestionFeedProps = {
  questions: QuestionWithAnswers[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  completedIds: Set<string>;
  onCompletionChange: (questionId: string, completed: boolean) => void;
  onQuestionChange?: (question: QuestionWithAnswers) => void;
  emptyMessage?: string;
};

export function MobileQuestionFeed({
  questions,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  completedIds,
  onCompletionChange,
  onQuestionChange,
  emptyMessage = "No questions match the current filter.",
}: MobileQuestionFeedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef(new Map<string, HTMLElement>());
  const isProgrammaticScroll = useRef(false);
  const previousQuestionsKey = useRef("");
  const questionsKey = questions.map((question) => question.id).join(",");

  const scrollToQuestion = useCallback((id: string, behavior: ScrollBehavior) => {
    const container = containerRef.current;
    const slide = slideRefs.current.get(id);
    if (!container || !slide) {
      return;
    }

    isProgrammaticScroll.current = true;
    container.scrollTo({
      top: slide.offsetTop,
      behavior,
    });

    window.setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, behavior === "smooth" ? 400 : 0);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || questions.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScroll.current) {
          return;
        }

        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!mostVisible) {
          return;
        }

        const id = mostVisible.target.getAttribute("data-question-id");
        if (id && id !== selectedId) {
          onSelect(id);
        }
      },
      {
        root: container,
        threshold: [0.35, 0.55, 0.75],
      },
    );

    for (const slide of slideRefs.current.values()) {
      observer.observe(slide);
    }

    return () => observer.disconnect();
  }, [questionsKey, onSelect, selectedId]);

  useEffect(() => {
    if (questions.length === 0) {
      previousQuestionsKey.current = questionsKey;
      return;
    }

    if (previousQuestionsKey.current === questionsKey) {
      return;
    }

    previousQuestionsKey.current = questionsKey;

    const targetId =
      selectedId && questions.some((question) => question.id === selectedId)
        ? selectedId
        : questions[0].id;

    scrollToQuestion(targetId, "auto");
  }, [questionsKey, questions, scrollToQuestion, selectedId]);

  const selectedIndex = questions.findIndex(
    (question) => question.id === selectedId,
  );
  const position = selectedIndex >= 0 ? selectedIndex + 1 : 1;

  if (questions.length === 0) {
    return (
      <div className="lg:hidden">
        <div className="border-b p-3">
          <Input
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search questions..."
            aria-label="Search questions"
          />
        </div>
        <p className="p-4 text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="lg:hidden sticky top-16 z-20 -mx-4 flex h-[calc(100dvh-4rem)] flex-col border-y bg-background sm:-mx-6">
      <div className="shrink-0 space-y-2 border-b p-3">
        <Input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search questions..."
          aria-label="Search questions"
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {position} / {questions.length}
          </span>
          <span>Swipe up or down</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
        aria-label="Question feed"
      >
        {questions.map((question, index) => {
          const isNearSelected = Math.abs(index - selectedIndex) <= 1;

          return (
          <article
            key={question.id}
            ref={(element) => {
              if (element) {
                slideRefs.current.set(question.id, element);
              } else {
                slideRefs.current.delete(question.id);
              }
            }}
            data-question-id={question.id}
            className="flex min-h-full snap-start snap-always flex-col border-b last:border-b-0"
          >
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {isNearSelected ? (
                <>
                  <div className="flex justify-end">
                    <QuestionCompletionCheckbox
                      questionId={question.id}
                      isCompleted={completedIds.has(question.id)}
                      onCompletionChange={onCompletionChange}
                    />
                  </div>
                  <QuestionDetailPanel
                    question={question}
                    showCategory={false}
                    titleAs="h2"
                    searchQuery={searchQuery}
                    onQuestionChange={onQuestionChange}
                  />
                  <Link
                    href={`/questions/${question.id}`}
                    className="inline-block text-sm text-primary hover:underline"
                  >
                    Open full page →
                  </Link>
                </>
              ) : (
                <div className="flex min-h-[50dvh] items-center justify-center px-4 text-center">
                  <p className="line-clamp-3 text-sm font-medium text-muted-foreground">
                    {question.title}
                  </p>
                </div>
              )}
            </div>
          </article>
          );
        })}
      </div>
    </div>
  );
}
