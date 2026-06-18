"use client";

import { useEffect, useState, useTransition } from "react";

import { toggleQuestionCompleted } from "@/actions/user";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "@/lib/auth-client";

type QuestionCompletionCheckboxProps = {
  questionId: string;
  isCompleted?: boolean;
  onCompletionChange?: (questionId: string, completed: boolean) => void;
};

export function QuestionCompletionCheckbox({
  questionId,
  isCompleted = false,
  onCompletionChange,
}: QuestionCompletionCheckboxProps) {
  const { data: session } = useSession();
  const [completed, setCompleted] = useState(isCompleted);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  function handleToggleCompleted() {
    if (!session?.user) {
      setError("Sign in to track completed questions.");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await toggleQuestionCompleted(questionId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setCompleted(result.data.completed);
      onCompletionChange?.(questionId, result.data.completed);
    });
  }

  return (
    <div className="relative inline-flex items-center">
      <Checkbox
        variant="completed"
        checked={completed}
        onCheckedChange={handleToggleCompleted}
        disabled={isPending}
        aria-label={
          completed ? "Mark question as incomplete" : "Mark question as completed"
        }
        title={
          completed ? "Mark question as incomplete" : "Mark question as completed"
        }
      />
      {error ? (
        <p
          className="absolute right-0 top-full z-10 mt-1 max-w-48 text-right text-xs text-destructive"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
