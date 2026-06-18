"use client";

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
};

export function QuizQuestionPlayer({ question }: QuizQuestionPlayerProps) {
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

      <div className="space-y-2">
        <h1 className="text-2xl font-bold leading-snug tracking-tight">
          {question.title}
        </h1>
        <p className="leading-relaxed whitespace-pre-wrap text-muted-foreground">
          {question.content}
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-medium">Choose an answer</h2>
        <QuestionAnswerPicker
          key={question.id}
          questionId={question.id}
          allowMultiple={allowMultiple}
          answers={question.answers.map((answer) => ({
            id: answer.id,
            content: answer.content,
          }))}
        />
      </div>

      <ButtonLink
        href={`/categories/${question.category.slug}`}
        variant="outline"
      >
        Back to {question.category.name}
      </ButtonLink>
    </div>
  );
}
