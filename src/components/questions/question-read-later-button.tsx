"use client";

import { useEffect, useState, useTransition } from "react";
import { Bookmark } from "lucide-react";

import { toggleBookmark } from "@/actions/user";
import { ButtonLink } from "@/components/ui/button-link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type QuestionReadLaterButtonProps = {
  questionId: string;
  isReadLater?: boolean;
  onReadLaterChange?: (questionId: string, readLater: boolean) => void;
  iconOnlyOnMobile?: boolean;
};

export function QuestionReadLaterButton({
  questionId,
  isReadLater = false,
  onReadLaterChange,
  iconOnlyOnMobile = false,
}: QuestionReadLaterButtonProps) {
  const { data: session } = useSession();
  const [readLater, setReadLater] = useState(isReadLater);
  const [error, setError] = useState<string | null>(null);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setReadLater(isReadLater);
  }, [isReadLater]);

  function handleToggle() {
    if (!session?.user) {
      setLoginPromptOpen(true);
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await toggleBookmark(questionId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setReadLater(result.data.bookmarked);
      onReadLaterChange?.(questionId, result.data.bookmarked);
    });
  }

  return (
    <div className="relative inline-flex items-center">
      <Button
        type="button"
        variant={readLater ? "secondary" : "outline"}
        size="sm"
        onClick={handleToggle}
        disabled={isPending}
        aria-pressed={readLater}
        aria-label={
          readLater ? "Remove from read later" : "Mark question as read later"
        }
        title={
          readLater ? "Remove from read later" : "Mark question as read later"
        }
        className={cn(iconOnlyOnMobile && "px-2 sm:px-3")}
      >
        <Bookmark className={cn("size-3.5", readLater && "fill-current")} />
        <span className={cn(iconOnlyOnMobile && "hidden sm:inline")}>
          {readLater ? "Saved" : "Read later"}
        </span>
      </Button>
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
            <DialogTitle>Sign in to save questions</DialogTitle>
            <DialogDescription>
              Sign in to mark questions as read later and revisit them from your
              saved list.
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
