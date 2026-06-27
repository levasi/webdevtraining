"use client";

import { useEffect, useState, useTransition } from "react";

import { toggleQuestionCompleted } from "@/actions/user";
import { ButtonLink } from "@/components/ui/button-link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  function handleToggleCompleted() {
    if (!session?.user) {
      setLoginPromptOpen(true);
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
      <Dialog open={loginPromptOpen} onOpenChange={setLoginPromptOpen}>
        <DialogContent showCloseButton className="gap-5 p-6 sm:p-7">
          <DialogHeader>
            <DialogTitle>Sign in to track progress</DialogTitle>
            <DialogDescription>
              Sign in to mark questions as completed and keep your progress
              synced across devices.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-row justify-end gap-2 border-t-0 bg-transparent p-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setLoginPromptOpen(false)}
            >
              Cancel
            </Button>
            <ButtonLink href="/login" size="sm">
              Sign in
            </ButtonLink>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
