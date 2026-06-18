"use client";

import { QuestionCompletionCheckbox } from "@/components/questions/question-completion-checkbox";
import { QuestionDetailPanel } from "@/components/questions/question-detail-panel";
import { ButtonLink } from "@/components/ui/button-link";
import type { QuestionWithAnswers } from "@/types";

type QuestionDetailClientProps = {
  question: QuestionWithAnswers;
  categorySlug: string;
  categoryName: string;
  isCompleted?: boolean;
};

export function QuestionDetailClient({
  question,
  categorySlug,
  categoryName,
  isCompleted = false,
}: QuestionDetailClientProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-4 flex justify-end">
        <QuestionCompletionCheckbox
          questionId={question.id}
          isCompleted={isCompleted}
        />
      </div>
      <QuestionDetailPanel
        question={question}
        showCategory={false}
        titleAs="h1"
      />
      <div className="mt-8">
        <ButtonLink href={`/categories/${categorySlug}`} variant="outline">
          Back to {categoryName}
        </ButtonLink>
      </div>
    </div>
  );
}
