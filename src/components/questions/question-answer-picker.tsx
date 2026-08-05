"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import {
  checkQuestionAnswer,
  markQuizQuestionCompleted,
} from "@/actions/questions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AnswerOption = {
  id: string;
  content: string;
};

type QuestionAnswerPickerProps = {
  questionId: string;
  answers: AnswerOption[];
  allowMultiple?: boolean;
  /** When set to QUIZ, correct answers are recorded as quiz progress. */
  progressMode?: "QUIZ";
  /** Called after a successful check. */
  onChecked?: (result: { isCorrect: boolean }) => void;
  /** Extra actions shown under answers after a result (e.g. Next question). */
  resultActions?: ReactNode;
};

export function QuestionAnswerPicker({
  questionId,
  answers,
  allowMultiple = false,
  progressMode,
  onChecked,
  resultActions,
}: QuestionAnswerPickerProps) {
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<string[]>([]);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    isCorrect: boolean;
    correctAnswerIds: string[];
    correctAnswerContents: string[];
    explanation: string | null;
  } | null>(null);

  function toggleAnswer(answerId: string) {
    if (result) {
      return;
    }

    setSelectedAnswerIds((current) => {
      if (allowMultiple) {
        return current.includes(answerId)
          ? current.filter((id) => id !== answerId)
          : [...current, answerId];
      }

      return current.includes(answerId) ? [] : [answerId];
    });
  }

  async function handleCheck() {
    if (selectedAnswerIds.length === 0) {
      return;
    }

    setChecking(true);
    setError(null);

    const response = await checkQuestionAnswer({
      questionId,
      answerIds: selectedAnswerIds,
    });

    if (!response.success) {
      setChecking(false);
      setError(response.error);
      return;
    }

    if (response.data.isCorrect && progressMode === "QUIZ") {
      await markQuizQuestionCompleted(questionId);
    }

    setChecking(false);
    setResult(response.data);
    onChecked?.({ isCorrect: response.data.isCorrect });
  }

  if (answers.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No answer options available for this question.
      </p>
    );
  }

  const correctAnswerIdSet = new Set(result?.correctAnswerIds ?? []);
  const selectedAnswerIdSet = new Set(selectedAnswerIds);

  return (
    <div className="space-y-4">
      {allowMultiple && !result && (
        <p className="text-sm text-muted-foreground">
          Select all answers that apply.
        </p>
      )}

      <div className="space-y-2">
        {answers.map((answer) => {
          const isSelected = selectedAnswerIdSet.has(answer.id);
          const isCorrectAnswer = result && correctAnswerIdSet.has(answer.id);
          const isIncorrectSelection =
            result && isSelected && !correctAnswerIdSet.has(answer.id);
          const isMissedCorrect =
            result && !isSelected && correctAnswerIdSet.has(answer.id);

          return (
            <button
              key={answer.id}
              type="button"
              disabled={!!result}
              onClick={() => toggleAnswer(answer.id)}
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-left text-sm whitespace-pre-wrap transition-colors",
                isSelected && !result && "border-primary bg-primary/5",
                !isSelected && !result && "hover:bg-muted",
                result &&
                  isCorrectAnswer &&
                  isSelected &&
                  "border-green-600 bg-green-500/10",
                isMissedCorrect && "border-green-600 bg-green-500/10",
                isIncorrectSelection && "border-destructive bg-destructive/10",
                result && !isSelected && !isCorrectAnswer && "opacity-60",
              )}
            >
              {answer.content}
            </button>
          );
        })}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {result && (
        <div className="space-y-3">
          <p
            className={cn(
              "text-sm font-medium",
              result.isCorrect
                ? "text-green-600 dark:text-green-400"
                : "text-destructive",
            )}
          >
            {result.isCorrect
              ? "Correct!"
              : `Incorrect. The correct answer${
                  result.correctAnswerContents.length > 1 ? "s are" : " is"
                }: ${result.correctAnswerContents.join(", ")}`}
          </p>
          {result.explanation ? (
            <p className="rounded-lg border border-border/70 bg-muted/40 px-3 py-2 text-sm leading-relaxed text-muted-foreground">
              {result.explanation}
            </p>
          ) : null}
        </div>
      )}

      {!result ? (
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => void handleCheck()}
            disabled={selectedAnswerIds.length === 0 || checking}
          >
            {checking ? "Checking..." : "Check answer"}
          </Button>
        </div>
      ) : resultActions ? (
        <div className="flex flex-wrap gap-2">{resultActions}</div>
      ) : null}
    </div>
  );
}
