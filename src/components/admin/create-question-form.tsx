"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { createQuestion } from "@/actions/admin/questions";
import { navigateTo } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CreateQuestionInput } from "@/lib/validators/content";

type AnswerField = {
  content: string;
  isCorrect: boolean;
};

type CategoryOption = {
  id: string;
  name: string;
};

type CreateQuestionFormProps = {
  categories: CategoryOption[];
  onSuccess?: () => void;
  onCancel?: () => void;
};

const difficultyOptions = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
] as const;

const typeOptions = [
  { value: "MULTIPLE_CHOICE", label: "Multiple choice" },
  { value: "TRUE_FALSE", label: "True / false" },
  { value: "SHORT_ANSWER", label: "Short answer" },
  { value: "FLASHCARD", label: "Flashcard" },
] as const;

const defaultAnswers: AnswerField[] = [
  { content: "", isCorrect: true },
  { content: "", isCorrect: false },
];

export function CreateQuestionForm({
  categories,
  onSuccess,
  onCancel,
}: CreateQuestionFormProps) {
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] =
    useState<CreateQuestionInput["difficulty"]>("BEGINNER");
  const [type, setType] =
    useState<CreateQuestionInput["type"]>("MULTIPLE_CHOICE");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [answers, setAnswers] = useState<AnswerField[]>(defaultAnswers);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function updateAnswer(index: number, patch: Partial<AnswerField>) {
    setAnswers((current) =>
      current.map((answer, answerIndex) =>
        answerIndex === index ? { ...answer, ...patch } : answer,
      ),
    );
  }

  function setCorrectAnswer(index: number) {
    setAnswers((current) =>
      current.map((answer, answerIndex) => ({
        ...answer,
        isCorrect: answerIndex === index,
      })),
    );
  }

  function toggleCorrectAnswer(index: number) {
    setAnswers((current) =>
      current.map((answer, answerIndex) =>
        answerIndex === index
          ? { ...answer, isCorrect: !answer.isCorrect }
          : answer,
      ),
    );
  }

  function addAnswer() {
    setAnswers((current) => [...current, { content: "", isCorrect: false }]);
  }

  function removeAnswer(index: number) {
    setAnswers((current) => {
      if (current.length <= 1) {
        return current;
      }

      const next = current.filter((_, answerIndex) => answerIndex !== index);
      if (!next.some((answer) => answer.isCorrect)) {
        next[0].isCorrect = true;
      }
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const payload: CreateQuestionInput = {
      categoryId,
      title,
      content,
      difficulty,
      type,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isPublished,
      answers,
    };

    const result = await createQuestion(payload);

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    if (onSuccess) {
      onSuccess();
      return;
    }

    navigateTo("/admin/questions");
  }

  const showMultipleChoiceRules = type === "MULTIPLE_CHOICE";
  const showTrueFalseRules = type === "TRUE_FALSE";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Question details</CardTitle>
          <CardDescription>
            Create a new interview question for the public question bank.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="flex h-9 w-full rounded-md border bg-background px-3 text-sm"
              required
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What is a closure in JavaScript?"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="content">Question prompt</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="min-h-28"
              placeholder="Explain what a closure is and when it is useful."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(event) =>
                setDifficulty(
                  event.target.value as CreateQuestionInput["difficulty"],
                )
              }
              className="flex h-9 w-full rounded-md border bg-background px-3 text-sm"
            >
              {difficultyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Question type</Label>
            <select
              id="type"
              value={type}
              onChange={(event) =>
                setType(event.target.value as CreateQuestionInput["type"])
              }
              className="flex h-9 w-full rounded-md border bg-background px-3 text-sm"
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="closures, scope, javascript"
            />
            <p className="text-xs text-muted-foreground">
              Comma-separated tags for filtering and search later.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm md:col-span-2">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(event) => setIsPublished(event.target.checked)}
              className="size-4 rounded border"
            />
            Publish immediately
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Answers</CardTitle>
            <CardDescription>
              {showMultipleChoiceRules
                ? "Add at least two options and mark one or more as correct."
                : showTrueFalseRules
                  ? "Add at least two options and mark exactly one as correct."
                  : "Add at least one correct answer."}
            </CardDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addAnswer}>
            <Plus className="size-4" />
            Add answer
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {answers.map((answer, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-lg border p-4 md:grid-cols-[auto_1fr_auto]"
            >
              <label className="flex items-center gap-2 text-sm">
                <input
                  type={type === "MULTIPLE_CHOICE" ? "checkbox" : "radio"}
                  name="correct-answer"
                  checked={answer.isCorrect}
                  onChange={() =>
                    type === "MULTIPLE_CHOICE"
                      ? toggleCorrectAnswer(index)
                      : setCorrectAnswer(index)
                  }
                />
                Correct
              </label>
              <Input
                value={answer.content}
                onChange={(event) =>
                  updateAnswer(index, { content: event.target.value })
                }
                placeholder={`Answer ${index + 1}`}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => removeAnswer(index)}
                disabled={answers.length <= 1}
                aria-label={`Remove answer ${index + 1}`}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive/40">
          <CardContent className="py-4 text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create question"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            onCancel ? onCancel() : navigateTo("/admin/questions")
          }
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
