"use client";

import { useState } from "react";

import { checkQuestionAnswer } from "@/actions/questions";
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
};

export function QuestionAnswerPicker({
  questionId,
  answers,
  allowMultiple = false,
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

    setChecking(false);

    if (!response.success) {
      setError(response.error);
      return;
    }

    setResult(response.data);
  }

  function handleTryAgain() {
    setSelectedAnswerIds([]);
    setResult(null);
    setError(null);
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
                "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                isSelected && !result && "border-primary bg-primary/5",
                !isSelected && !result && "hover:bg-muted",
                result && isCorrectAnswer && isSelected && "border-green-600 bg-green-500/10",
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
          {result.explanation && (
            <p className="rounded-md bg-muted p-3 text-sm leading-relaxed text-muted-foreground">
              {result.explanation}
            </p>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {!result ? (
          <Button
            onClick={() => void handleCheck()}
            disabled={selectedAnswerIds.length === 0 || checking}
          >
            {checking ? "Checking..." : "Check answer"}
          </Button>
        ) : (
          <Button variant="outline" onClick={handleTryAgain}>
            Try again
          </Button>
        )}
      </div>
    </div>
  );
}
