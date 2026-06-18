"use client";

import { useMemo, useState } from "react";

import { ContentSidebar } from "@/components/layout/content-sidebar";
import { SidebarDetailLayout } from "@/components/layout/sidebar-detail-layout";
import { QuizQuestionPlayer } from "@/components/quiz/quiz-question-player";
import type { QuestionWithAnswers } from "@/types";

type QuizBrowserProps = {
  questions: QuestionWithAnswers[];
};

export function QuizBrowser({ questions }: QuizBrowserProps) {
  const [selectedId, setSelectedId] = useState(questions[0]?.id ?? null);
  const selectedQuestion = useMemo(
    () => questions.find((question) => question.id === selectedId),
    [questions, selectedId],
  );

  if (questions.length === 0) {
    return (
      <p className="text-muted-foreground">No quiz questions are available yet.</p>
    );
  }

  return (
    <SidebarDetailLayout
      sidebar={
        <ContentSidebar
          ariaLabel="Quiz questions"
          selectedId={selectedId}
          onSelect={setSelectedId}
          items={questions.map((question) => ({
            id: question.id,
            title: question.title,
            difficulty: question.difficulty,
            subtitle: question.category.name,
          }))}
        />
      }
    >
      {selectedQuestion ? (
        <div className="p-4 sm:p-6">
          <QuizQuestionPlayer question={selectedQuestion} showBackLink={false} />
        </div>
      ) : (
        <div className="flex h-full min-h-48 items-center justify-center p-6 text-sm text-muted-foreground">
          Select a quiz question from the list.
        </div>
      )}
    </SidebarDetailLayout>
  );
}
