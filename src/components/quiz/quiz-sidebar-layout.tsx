"use client";

import { ContentSidebar } from "@/components/layout/content-sidebar";
import { SidebarDetailLayout } from "@/components/layout/sidebar-detail-layout";
import { QuizQuestionPlayer } from "@/components/quiz/quiz-question-player";
import type { QuestionWithAnswers } from "@/types";

type QuizSidebarLayoutProps = {
  question: QuestionWithAnswers;
  items: QuestionWithAnswers[];
};

export function QuizSidebarLayout({
  question,
  items,
}: QuizSidebarLayoutProps) {
  return (
    <SidebarDetailLayout
      sidebar={
        <ContentSidebar
          ariaLabel="Quiz questions"
          selectedId={question.id}
          hrefForItem={(id) => `/quiz/${id}`}
          items={items.map((item) => ({
            id: item.id,
            title: item.title,
            difficulty: item.difficulty,
            subtitle: item.category.name,
          }))}
        />
      }
    >
      <div className="p-4 sm:p-6">
        <QuizQuestionPlayer question={question} />
      </div>
    </SidebarDetailLayout>
  );
}
