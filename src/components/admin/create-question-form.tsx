"use client";

import { useState, type ReactNode } from "react";
import { Plus, Trash2 } from "lucide-react";

import { createQuestion } from "@/actions/admin/questions";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { navigateTo } from "@/lib/navigation";
import { isRichTextEmpty } from "@/lib/rich-text";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
  plain?: boolean;
};

const difficultyOptions = [
  { value: "BEGINNER", label: "Beginner" },
  { value: "INTERMEDIATE", label: "Intermediate" },
  { value: "ADVANCED", label: "Advanced" },
] as const;

const typeOptions = [
  { value: "EXPLANATION", label: "Explanation" },
  { value: "MULTIPLE_CHOICE", label: "Multiple choice" },
  { value: "TRUE_FALSE", label: "True / false" },
  { value: "SHORT_ANSWER", label: "Short answer" },
  { value: "FLASHCARD", label: "Flashcard" },
] as const;

const defaultExplanationAnswer: AnswerField[] = [
  { content: "", isCorrect: true },
];

const defaultAnswers: AnswerField[] = [
  { content: "", isCorrect: true },
  { content: "", isCorrect: false },
];

function FormSection({
  title,
  description,
  children,
  action,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function NativeSelect({
  id,
  value,
  onChange,
  children,
  className,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        "flex h-9 w-full rounded-md border bg-background px-3 text-sm",
        className,
      )}
    >
      {children}
    </select>
  );
}

export function CreateQuestionForm({
  categories,
  onSuccess,
  onCancel,
  plain = false,
}: CreateQuestionFormProps) {
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [difficulty, setDifficulty] =
    useState<CreateQuestionInput["difficulty"]>("BEGINNER");
  const [type, setType] =
    useState<CreateQuestionInput["type"]>("EXPLANATION");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [answers, setAnswers] = useState<AnswerField[]>(defaultExplanationAnswer);
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

  function handleTypeChange(nextType: CreateQuestionInput["type"]) {
    setType(nextType);

    if (nextType === "EXPLANATION") {
      setAnswers(defaultExplanationAnswer);
    } else if (type === "EXPLANATION") {
      setAnswers(defaultAnswers);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (showExplanationRules && isRichTextEmpty(answers[0]?.content ?? "")) {
      setError("Write an explanation before saving.");
      setLoading(false);
      return;
    }

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

  const showExplanationRules = type === "EXPLANATION";
  const showMultipleChoiceRules = type === "MULTIPLE_CHOICE";
  const showTrueFalseRules = type === "TRUE_FALSE";
  const showAnswerControls = !showExplanationRules;

  const answerHelpText = showExplanationRules
    ? "Write the model answer or explanation for this question."
    : showMultipleChoiceRules
      ? "Add at least two options and mark one or more as correct."
      : showTrueFalseRules
        ? "Add at least two options and mark exactly one as correct."
        : "Add at least one correct answer.";

  const actions = (
    <div className={cn("flex flex-wrap gap-3", plain && "justify-end")}>
      {plain ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => (onCancel ? onCancel() : navigateTo("/admin/questions"))}
          disabled={loading}
        >
          Cancel
        </Button>
      ) : null}
      <Button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create question"}
      </Button>
      {!plain ? (
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            onCancel ? onCancel() : navigateTo("/admin/questions")
          }
        >
          Cancel
        </Button>
      ) : null}
    </div>
  );

  const metadataFields = plain ? (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={categoryId}
          items={categories.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
          onValueChange={(value) => value && setCategoryId(value)}
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Question type</Label>
        <Select
          value={type}
          items={typeOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          onValueChange={(value) =>
            value && handleTypeChange(value as CreateQuestionInput["type"])
          }
        >
          <SelectTrigger id="type" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty">Difficulty</Label>
        <Select
          value={difficulty}
          items={difficultyOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          onValueChange={(value) =>
            value && setDifficulty(value as CreateQuestionInput["difficulty"])
          }
        >
          <SelectTrigger id="difficulty" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {difficultyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ) : (
    <>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="category">Category</Label>
        <NativeSelect id="category" value={categoryId} onChange={setCategoryId}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="type">Question type</Label>
        <NativeSelect
          id="type"
          value={type}
          onChange={(value) =>
            handleTypeChange(value as CreateQuestionInput["type"])
          }
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="difficulty">Difficulty</Label>
        <NativeSelect
          id="difficulty"
          value={difficulty}
          onChange={(value) =>
            setDifficulty(value as CreateQuestionInput["difficulty"])
          }
        >
          {difficultyOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </div>
    </>
  );

  const answerFields = answers.map((answer, index) => (
    <div
      key={index}
      className={cn(
        "grid gap-3",
        !plain && "rounded-lg border p-4",
        showAnswerControls ? "md:grid-cols-[auto_1fr_auto]" : "md:grid-cols-[1fr]",
      )}
    >
      {showAnswerControls ? (
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
      ) : null}
      {showExplanationRules ? (
        <RichTextEditor
          id="explanation-answer"
          value={answer.content}
          onChange={(html) => updateAnswer(index, { content: html })}
          placeholder="Write the detailed explanation or model answer..."
          className="md:col-span-full"
        />
      ) : (
        <Input
          value={answer.content}
          onChange={(event) =>
            updateAnswer(index, { content: event.target.value })
          }
          placeholder={`Answer ${index + 1}`}
          required
        />
      )}
      {showAnswerControls ? (
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
      ) : null}
    </div>
  ));

  if (plain) {
    return (
      <form onSubmit={handleSubmit} className="space-y-8">
        <FormSection title="Details">
          <div className="space-y-4">
            {metadataFields}
            <div className="space-y-2">
              <Label htmlFor="title">Sidebar label</Label>
              <Input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="What is a closure in JavaScript?"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Full question</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className="min-h-24 resize-y"
                placeholder="Explain what a closure is and when it is useful."
                required
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="min-w-0 flex-1 space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(event) => setTags(event.target.value)}
                  placeholder="closures, scope, javascript"
                />
              </div>
              <label className="flex items-center gap-2.5 pb-2 text-sm">
                <Checkbox
                  checked={isPublished}
                  onCheckedChange={(checked) => setIsPublished(checked === true)}
                />
                Publish immediately
              </label>
            </div>
          </div>
        </FormSection>

        <Separator />

        <FormSection
          title={showExplanationRules ? "Explanation" : "Answers"}
          description={answerHelpText}
          action={
            showAnswerControls ? (
              <Button type="button" variant="outline" size="sm" onClick={addAnswer}>
                <Plus className="size-4" />
                Add answer
              </Button>
            ) : null
          }
        >
          <div className="space-y-3">{answerFields}</div>
        </FormSection>

        {error ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <div className="sticky bottom-0 -mx-6 bg-popover/95 px-6 py-4 backdrop-blur-sm">
          {actions}
        </div>
      </form>
    );
  }

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
          {metadataFields}

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="title">Sidebar label</Label>
            <Input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="What is a closure in JavaScript?"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="content">Full question</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="min-h-28"
              placeholder="Explain what a closure is and when it is useful."
              required
            />
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
            <CardTitle>
              {showExplanationRules ? "Explanation" : "Answers"}
            </CardTitle>
            <CardDescription>{answerHelpText}</CardDescription>
          </div>
          {showAnswerControls ? (
            <Button type="button" variant="outline" size="sm" onClick={addAnswer}>
              <Plus className="size-4" />
              Add answer
            </Button>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-3">{answerFields}</CardContent>
      </Card>

      {error ? (
        <Card className="border-destructive/40">
          <CardContent className="py-4 text-sm text-destructive">{error}</CardContent>
        </Card>
      ) : null}

      {actions}
    </form>
  );
}
