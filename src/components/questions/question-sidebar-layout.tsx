"use client";

import { ContentSidebar } from "@/components/layout/content-sidebar";
import { SidebarDetailLayout } from "@/components/layout/sidebar-detail-layout";
import { QuestionCompletionCheckbox } from "@/components/questions/question-completion-checkbox";
import { QuestionDetailPanel } from "@/components/questions/question-detail-panel";
import type { QuestionWithAnswers } from "@/types";

type QuestionSidebarLayoutProps = {
  question: QuestionWithAnswers;
  items: QuestionWithAnswers[];
  isCompleted?: boolean;
  onCompletionChange?: (questionId: string, completed: boolean) => void;
  completedQuestionIds?: string[];
};

export function QuestionSidebarLayout({
  question,
  items,
  isCompleted = false,
  onCompletionChange,
  completedQuestionIds = [],
}: QuestionSidebarLayoutProps) {
  const completedIds = new Set(completedQuestionIds);
  return (
    <SidebarDetailLayout
      sidebar={
        <ContentSidebar
          ariaLabel="Questions"
          selectedId={question.id}
          hrefForItem={(id) => `/questions/${id}`}
          items={items.map((item) => ({
            id: item.id,
            title: item.title,
            difficulty: item.difficulty,
            subtitle: item.category.name,
            trailing: completedIds ? (
              <QuestionCompletionCheckbox
                questionId={item.id}
                isCompleted={completedIds.has(item.id)}
                onCompletionChange={onCompletionChange}
              />
            ) : undefined,
          }))}
        />
      }
    >
      <div className="space-y-4 p-4 sm:p-6">
        <div className="flex justify-end">
          <QuestionCompletionCheckbox
            questionId={question.id}
            isCompleted={isCompleted}
            onCompletionChange={onCompletionChange}
          />
        </div>
        <QuestionDetailPanel question={question} titleAs="h1" />
      </div>
    </SidebarDetailLayout>
  );
}
