"use client";

import { Badge } from "@/components/ui/badge";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import { QuestionAnswersList } from "@/components/questions/question-answers-list";
import type { QuestionWithAnswers } from "@/types";

const difficultyVariant = {
  BEGINNER: "secondary",
  INTERMEDIATE: "default",
  ADVANCED: "destructive",
} as const;

type QuestionDetailPanelProps = {
  question: QuestionWithAnswers;
  showCategory?: boolean;
  titleAs?: "h1" | "h2";
};

export function QuestionDetailPanel({
  question,
  showCategory = true,
  titleAs = "h2",
}: QuestionDetailPanelProps) {
  const TitleTag = titleAs;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={difficultyVariant[question.difficulty]}>
          {DIFFICULTY_LABELS[question.difficulty]}
        </Badge>
        {showCategory && (
          <Badge variant="outline">{question.category.name}</Badge>
        )}
        <Badge variant="secondary">
          {question.type.replace("_", " ")}
        </Badge>
      </div>

      <TitleTag className="text-2xl font-bold leading-snug tracking-tight">
        {question.title}
      </TitleTag>

      <p className="leading-relaxed whitespace-pre-wrap text-muted-foreground">
        {question.content}
      </p>

      <QuestionAnswersList question={question} />
    </div>
  );
}
