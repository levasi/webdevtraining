"use client";

import { useEffect, useState, useTransition } from "react";

import { toggleChallengeResolved } from "@/actions/user";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "@/lib/auth-client";

type ChallengeResolvedCheckboxProps = {
  challengeId: string;
  isResolved?: boolean;
};

export function ChallengeResolvedCheckbox({
  challengeId,
  isResolved = false,
}: ChallengeResolvedCheckboxProps) {
  const { data: session } = useSession();
  const [resolved, setResolved] = useState(isResolved);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setResolved(isResolved);
  }, [isResolved]);

  function handleToggleResolved() {
    if (!session?.user) {
      setError("Sign in to track resolved challenges.");
      return;
    }

    setError(null);
    startTransition(async () => {
      const result = await toggleChallengeResolved(challengeId);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setResolved(result.data.resolved);
    });
  }

  return (
    <div className="relative inline-flex items-center">
      <Checkbox
        variant="completed"
        checked={resolved}
        onCheckedChange={handleToggleResolved}
        disabled={isPending}
        aria-label={
          resolved ? "Mark challenge as unresolved" : "Mark challenge as resolved"
        }
        title={
          resolved ? "Mark challenge as unresolved" : "Mark challenge as resolved"
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
