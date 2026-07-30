"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SparklesIcon } from "lucide-react";

import { generateQuiz } from "@/actions/quizzes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, DIFFICULTY_LABELS } from "@/lib/constants";

const COUNT_OPTIONS = [5, 10, 15] as const;

type GenerateQuizButtonProps = {
  /** Lock generation to one category (category Quizzes tab). */
  categorySlug?: string;
  categoryName?: string;
  className?: string;
};

export function GenerateQuizButton({
  categorySlug,
  categoryName,
  className,
}: GenerateQuizButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<(typeof COUNT_OPTIONS)[number]>(10);
  const [difficulty, setDifficulty] = useState<
    "ALL" | "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  >("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categorySlug ?? "ALL",
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleGenerate() {
    setError(null);
    startTransition(async () => {
      const result = await generateQuiz({
        count,
        categorySlug:
          categorySlug ??
          (selectedCategory === "ALL" ? undefined : selectedCategory),
        difficulty: difficulty === "ALL" ? undefined : difficulty,
      });

      if (!result.success) {
        setError(result.error);
        return;
      }

      setOpen(false);
      router.push(`/quiz/${result.data.quizId}`);
      router.refresh();
    });
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={className}
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
      >
        <SparklesIcon className="size-3.5" />
        Generate quiz
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate a quiz</DialogTitle>
            <DialogDescription>
              Build a random pack from existing multiple-choice and true/false
              questions
              {categoryName ? ` in ${categoryName}` : ""}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="generate-quiz-count">Questions</Label>
              <Select
                value={String(count)}
                onValueChange={(value) => {
                  const next = Number(value);
                  if (next === 5 || next === 10 || next === 15) {
                    setCount(next);
                  }
                }}
              >
                <SelectTrigger id="generate-quiz-count" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNT_OPTIONS.map((option) => (
                    <SelectItem key={option} value={String(option)}>
                      {option} questions
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!categorySlug ? (
              <div className="grid gap-1.5">
                <Label htmlFor="generate-quiz-category">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    if (typeof value === "string") {
                      setSelectedCategory(value);
                    }
                  }}
                >
                  <SelectTrigger id="generate-quiz-category" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All topics</SelectItem>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category.slug} value={category.slug}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}

            <div className="grid gap-1.5">
              <Label htmlFor="generate-quiz-difficulty">Difficulty</Label>
              <Select
                value={difficulty}
                onValueChange={(value) => {
                  if (
                    value === "ALL" ||
                    value === "BEGINNER" ||
                    value === "INTERMEDIATE" ||
                    value === "ADVANCED"
                  ) {
                    setDifficulty(value);
                  }
                }}
              >
                <SelectTrigger id="generate-quiz-difficulty" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Any difficulty</SelectItem>
                  {(
                    Object.keys(DIFFICULTY_LABELS) as Array<
                      keyof typeof DIFFICULTY_LABELS
                    >
                  ).map((key) => (
                    <SelectItem key={key} value={key}>
                      {DIFFICULTY_LABELS[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleGenerate} disabled={pending}>
              {pending ? "Generating…" : "Generate & start"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
