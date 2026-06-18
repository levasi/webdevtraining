import Link from "next/link";

import { ButtonLink } from "@/components/ui/button-link";

export function AuthUnavailableMessage() {
  return (
    <div className="space-y-4 text-sm text-muted-foreground">
      <p>
        Google sign-in is not configured for this deployment yet. You can still
        browse categories, questions, and challenges without an account.
      </p>
      <div className="flex flex-wrap gap-2">
        <ButtonLink href="/categories" size="sm">
          Browse categories
        </ButtonLink>
        <ButtonLink href="/" size="sm" variant="outline">
          Back to home
        </ButtonLink>
      </div>
      <p>
        Already signed in elsewhere?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Try again
        </Link>{" "}
        after the admin adds Google OAuth credentials.
      </p>
    </div>
  );
}
