"use client";

import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { QuestionAnswerPicker } from "@/components/questions/question-answer-picker";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import type { QuestionWithAnswers } from "@/types";

const difficultyVariant = {
  BEGINNER: "secondary",
  INTERMEDIATE: "default",
  ADVANCED: "destructive",
} as const;

type QuizQuestionPlayerProps = {
  question: QuestionWithAnswers;
  showBackLink?: boolean;
  onChecked?: (result: { isCorrect: boolean }) => void;
  resultActions?: ReactNode;
};

export function QuizQuestionPlayer({
  question,
  showBackLink = true,
  onChecked,
  resultActions,
}: QuizQuestionPlayerProps) {
  const allowMultiple =
    question.type === "MULTIPLE_CHOICE" &&
    question.answers.filter((answer) => answer.isCorrect).length > 1;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={difficultyVariant[question.difficulty]}>
          {DIFFICULTY_LABELS[question.difficulty]}
        </Badge>
        <Badge variant="outline">{question.category.name}</Badge>
        <Badge variant="secondary">{question.type.replace("_", " ")}</Badge>
      </div>

      <h1 className="text-2xl font-bold leading-snug tracking-tight whitespace-pre-wrap">
        {question.content}
      </h1>

      <div className="space-y-2">
        <h2 className="text-sm font-medium">Choose an answer</h2>
        <QuestionAnswerPicker
          key={question.id}
          questionId={question.id}
          allowMultiple={allowMultiple}
          progressMode="QUIZ"
          onChecked={onChecked}
          resultActions={resultActions}
          answers={question.answers.map((answer) => ({
            id: answer.id,
            content: answer.content,
          }))}
        />
      </div>

      {showBackLink ? (
        <ButtonLink
          href={`/categories/${question.category.slug}`}
          variant="outline"
        >
          Back to {question.category.name}
        </ButtonLink>
      ) : null}
    </div>
  );
}
