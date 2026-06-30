"use client";

import { Expand } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import { QuestionAnswerHover } from "@/components/questions/question-answer-hover";
import { QuestionCompletionCheckbox } from "@/components/questions/question-completion-checkbox";
import { QuestionDetailPanel } from "@/components/questions/question-detail-panel";
import type { QuestionWithAnswers } from "@/types";

type QuestionCardProps = {
  question: QuestionWithAnswers;
  showCategory?: boolean;
  isCompleted?: boolean;
  onCompletionChange?: (questionId: string, completed: boolean) => void;
};

const difficultyVariant = {
  BEGINNER: "secondary",
  INTERMEDIATE: "default",
  ADVANCED: "destructive",
} as const;

function QuestionDetailModal({
  question,
  showCategory,
}: Pick<QuestionCardProps, "question" | "showCategory">) {
  return (
    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
      <DialogHeader className="sr-only">
        <DialogTitle>{question.title}</DialogTitle>
      </DialogHeader>
      <QuestionDetailPanel
        question={question}
        showCategory={showCategory}
        titleAs="h2"
      />
    </DialogContent>
  );
}

export function QuestionCard({
  question,
  showCategory = true,
  isCompleted = false,
  onCompletionChange,
}: QuestionCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={difficultyVariant[question.difficulty]}>
              {DIFFICULTY_LABELS[question.difficulty]}
            </Badge>
            {showCategory && (
              <Badge variant="outline">{question.category.name}</Badge>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1 self-center">
            <QuestionCompletionCheckbox
              questionId={question.id}
              isCompleted={isCompleted}
              onCompletionChange={onCompletionChange}
            />
            <Dialog>
              <DialogTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Expand question"
                  />
                }
              >
                <Expand className="size-4" />
              </DialogTrigger>
              <QuestionDetailModal
                question={question}
                showCategory={showCategory}
              />
            </Dialog>
          </div>
        </div>
        <QuestionAnswerHover question={question}>
          <div className="space-y-2">
            <CardTitle className="text-lg">{question.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {question.content}
            </CardDescription>
            <p className="text-xs text-muted-foreground">
              {question.answers.length} answers
              {question.type !== "EXPLANATION"
                ? ` · ${question.type.replace("_", " ")}`
                : null}
            </p>
          </div>
        </QuestionAnswerHover>
      </CardHeader>
    </Card>
  );
}
