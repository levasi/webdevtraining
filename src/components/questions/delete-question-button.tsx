"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { deleteQuestion } from "@/actions/admin/questions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type DeleteQuestionButtonProps = {
  questionId: string;
  questionTitle: string;
  onDeleted?: (questionId: string) => void;
  size?: "sm" | "default";
  variant?: "outline" | "ghost" | "destructive";
  className?: string;
};

export function DeleteQuestionButton({
  questionId,
  questionTitle,
  onDeleted,
  size = "sm",
  variant = "outline",
  className,
}: DeleteQuestionButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);

    const result = await deleteQuestion({ questionId });

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setOpen(false);
    onDeleted?.(questionId);
    router.refresh();
  }

  return (
    <>
      <Button
        type="button"
        size={size}
        variant={variant}
        className={cn(className)}
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
      >
        <Trash2 className="size-3.5" />
        Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={!loading}>
          <DialogHeader>
            <DialogTitle>Delete question?</DialogTitle>
            <DialogDescription>
              This permanently removes &ldquo;{questionTitle}&rdquo; and its
              answers, bookmarks, notes, and progress. This cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
