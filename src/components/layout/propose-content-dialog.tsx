"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";

import { submitContentProposal } from "@/actions/proposals";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/lib/constants";
import type { ContentProposalInput } from "@/lib/validators/proposal";

const contentTypeOptions = [
  {
    value: "QUESTION",
    label: "Question",
    hint: "Include the prompt, answer options, correct answer, and explanation.",
  },
  {
    value: "CHALLENGE",
    label: "Challenge",
    hint: "Include the problem statement, starter code, solution idea, and sample test cases.",
  },
  {
    value: "QUIZ",
    label: "Quiz",
    hint: "Describe the quiz theme, difficulty, and the questions you want included.",
  },
] as const;

const detailPlaceholders: Record<ContentProposalInput["contentType"], string> = {
  QUESTION:
    "Example:\n- Type: Multiple choice\n- Difficulty: Intermediate\n- Answers: A) ..., B) ..., C) ...\n- Correct: B\n- Tags: closures, scope",
  CHALLENGE:
    "Example:\n- Difficulty: Beginner\n- Starter code: function solve(input) { ... }\n- Test cases: input [1,2,3] -> 6\n- Hints: use reduce",
  QUIZ:
    "Example:\n- Difficulty: Intermediate\n- Time limit: 10 minutes\n- Question ideas: event loop, promises, async/await",
};

export function ProposeContentDialog() {
  const [open, setOpen] = useState(false);
  const [contentType, setContentType] =
    useState<ContentProposalInput["contentType"]>("QUESTION");
  const [categorySlug, setCategorySlug] = useState<ContentProposalInput["categorySlug"]>(
    CATEGORIES[0]?.slug ?? "javascript",
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [submitterName, setSubmitterName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedType = contentTypeOptions.find((option) => option.value === contentType);

  function resetForm() {
    setContentType("QUESTION");
    setCategorySlug(CATEGORIES[0]?.slug ?? "javascript");
    setTitle("");
    setDescription("");
    setDetails("");
    setSubmitterName("");
    setSubmitterEmail("");
    setError(null);
    setSuccess(false);
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const result = await submitContentProposal({
      contentType,
      categorySlug,
      title,
      description,
      details: details || undefined,
      submitterName: submitterName || undefined,
      submitterEmail: submitterEmail || undefined,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess(true);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" />
        }
      >
        <Lightbulb className="size-4" />
        Propose content
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        {success ? (
          <>
            <DialogHeader>
              <DialogTitle>Proposal sent</DialogTitle>
              <DialogDescription>
                Thanks for contributing. Your proposal was emailed for review.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter showCloseButton={false}>
              <Button type="button" onClick={() => handleOpenChange(false)}>
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>Propose new content</DialogTitle>
              <DialogDescription>
                Suggest a question, coding challenge, or quiz. We will review your
                proposal by email.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="proposal-type">Content type</Label>
                <select
                  id="proposal-type"
                  value={contentType}
                  onChange={(event) =>
                    setContentType(event.target.value as ContentProposalInput["contentType"])
                  }
                  className="flex h-9 w-full rounded-md border bg-background px-3 text-sm"
                  required
                >
                  {contentTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal-category">Category</Label>
                <select
                  id="proposal-category"
                  value={categorySlug}
                  onChange={(event) =>
                    setCategorySlug(
                      event.target.value as ContentProposalInput["categorySlug"],
                    )
                  }
                  className="flex h-9 w-full rounded-md border bg-background px-3 text-sm"
                  required
                >
                  {CATEGORIES.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposal-title">Title</Label>
              <Input
                id="proposal-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="What is the closure output?"
                required
                maxLength={200}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposal-description">Description</Label>
              <Textarea
                id="proposal-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the content you want added and why it would be useful."
                rows={4}
                required
                maxLength={5000}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="proposal-details">Additional details</Label>
              <Textarea
                id="proposal-details"
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder={detailPlaceholders[contentType]}
                rows={5}
                maxLength={10000}
              />
              {selectedType ? (
                <p className="text-xs text-muted-foreground">{selectedType.hint}</p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="proposal-name">Your name (optional)</Label>
                <Input
                  id="proposal-name"
                  value={submitterName}
                  onChange={(event) => setSubmitterName(event.target.value)}
                  autoComplete="name"
                  maxLength={120}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposal-email">Your email (optional)</Label>
                <Input
                  id="proposal-email"
                  type="email"
                  value={submitterEmail}
                  onChange={(event) => setSubmitterEmail(event.target.value)}
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={320}
                />
              </div>
            </div>

            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}

            <DialogFooter showCloseButton={false}>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send proposal"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
