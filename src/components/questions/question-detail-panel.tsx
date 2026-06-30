"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { updateQuestion, getQuestionFormCategories } from "@/actions/admin/questions";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { DeleteQuestionButton } from "@/components/questions/delete-question-button";
import { QuestionAnswersList } from "@/components/questions/question-answers-list";
import { QuestionCompletionCheckbox } from "@/components/questions/question-completion-checkbox";
import { QuestionReadLaterButton } from "@/components/questions/question-read-later-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import { loadQuestionFormCategories } from "@/lib/question-form-categories-cache";
import { getQuestionAnswerPreview } from "@/lib/questions/answer-preview";
import { isRichTextEmpty } from "@/lib/rich-text";
import { highlightSearchMatches } from "@/lib/search-highlight";
import { cn, wrapLongTextClass } from "@/lib/utils";
import type { QuestionWithAnswers } from "@/types";

const difficultyVariant = {
  BEGINNER: "secondary",
  INTERMEDIATE: "default",
  ADVANCED: "destructive",
} as const;

type QuestionDetailPanelProps = {
  question: QuestionWithAnswers;
  showCategory?: boolean;
  titleAs?: "h1" | "h2";
  onQuestionChange?: (question: QuestionWithAnswers) => void;
  searchQuery?: string;
  isCompleted?: boolean;
  onCompletionChange?: (questionId: string, completed: boolean) => void;
  isReadLater?: boolean;
  onReadLaterChange?: (questionId: string, readLater: boolean) => void;
  canEdit?: boolean;
  onQuestionDeleted?: (questionId: string) => void;
};

type EditableAnswer = {
  id: string;
  content: string;
};

function getEditableAnswers(question: QuestionWithAnswers): EditableAnswer[] {
  return [...question.answers]
    .filter((answer) => answer.isCorrect)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((answer) => ({
      id: answer.id,
      content: answer.content,
    }));
}

export const QuestionDetailPanel = memo(function QuestionDetailPanel({
  question,
  showCategory = true,
  titleAs = "h2",
  onQuestionChange,
  searchQuery = "",
  isCompleted = false,
  onCompletionChange,
  isReadLater = false,
  onReadLaterChange,
  canEdit = false,
  onQuestionDeleted,
}: QuestionDetailPanelProps) {
  const router = useRouter();
  const TitleTag = titleAs;
  const [displayQuestion, setDisplayQuestion] = useState(question);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(question.title);
  const [content, setContent] = useState(question.content);
  const [categoryId, setCategoryId] = useState(question.category.id);
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [editableAnswers, setEditableAnswers] = useState<EditableAnswer[]>(() =>
    getEditableAnswers(question),
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const answerLabel = useMemo(() => {
    const { answers } = getQuestionAnswerPreview(displayQuestion);
    return answers.length > 1 ? "Answers" : "Answer";
  }, [displayQuestion]);

  useEffect(() => {
    setDisplayQuestion(question);
    setTitle(question.title);
    setContent(question.content);
    setCategoryId(question.category.id);
    setEditableAnswers(getEditableAnswers(question));
    setEditing(false);
    setError(null);
  }, [question]);

  useEffect(() => {
    if (!editing || !canEdit) {
      return;
    }

    let cancelled = false;

    async function loadCategories() {
      setLoadingCategories(true);
      const result = await loadQuestionFormCategories(getQuestionFormCategories);

      if (cancelled) {
        return;
      }

      setLoadingCategories(false);

      if (result.categories) {
        setCategories(result.categories);
      }
    }

    void loadCategories();

    return () => {
      cancelled = true;
    };
  }, [editing, canEdit]);

  function handleQuestionChange(updatedQuestion: QuestionWithAnswers) {
    setDisplayQuestion(updatedQuestion);
    onQuestionChange?.(updatedQuestion);
  }

  function resetDraft() {
    setTitle(displayQuestion.title);
    setContent(displayQuestion.content);
    setCategoryId(displayQuestion.category.id);
    setEditableAnswers(getEditableAnswers(displayQuestion));
    setError(null);
  }

  function updateAnswerContent(id: string, content: string) {
    setEditableAnswers((current) =>
      current.map((answer) =>
        answer.id === id ? { ...answer, content } : answer,
      ),
    );
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (
      displayQuestion.type === "EXPLANATION" &&
      editableAnswers.some((answer) => isRichTextEmpty(answer.content))
    ) {
      setError("Write an explanation before saving.");
      setLoading(false);
      return;
    }

    const answers = displayQuestion.answers
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((answer) => {
        const edited = editableAnswers.find((item) => item.id === answer.id);
        return {
          id: answer.id,
          content: edited?.content ?? answer.content,
        };
      });

    const result = await updateQuestion({
      questionId: displayQuestion.id,
      categoryId,
      title,
      content,
      answers,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    const updatedQuestion: QuestionWithAnswers = {
      ...displayQuestion,
      title,
      content,
      category: result.data.category,
      answers: displayQuestion.answers.map((answer) => {
        const edited = editableAnswers.find((item) => item.id === answer.id);
        return edited ? { ...answer, content: edited.content } : answer;
      }),
    };

    handleQuestionChange(updatedQuestion);
    setEditing(false);
    router.refresh();
  }

  const actionButtons = canEdit ? (
    <div className="flex flex-wrap items-center gap-2">
      {editing ? (
        <>
          <Button type="submit" size="sm" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              resetDraft();
              setEditing(false);
            }}
            disabled={loading}
          >
            Cancel
          </Button>
          <DeleteQuestionButton
            questionId={displayQuestion.id}
            questionTitle={displayQuestion.title}
            onDeleted={onQuestionDeleted}
          />
        </>
      ) : (
        <>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => {
              resetDraft();
              setEditing(true);
            }}
          >
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <DeleteQuestionButton
            questionId={displayQuestion.id}
            questionTitle={displayQuestion.title}
            onDeleted={onQuestionDeleted}
          />
        </>
      )}
    </div>
  ) : null;

  const badgeRow = (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={difficultyVariant[displayQuestion.difficulty]}>
          {DIFFICULTY_LABELS[displayQuestion.difficulty]}
        </Badge>
        {showCategory && (
          <Badge variant="outline">{displayQuestion.category.name}</Badge>
        )}
        {displayQuestion.type !== "EXPLANATION" ? (
          <Badge variant="secondary">
            {displayQuestion.type.replace("_", " ")}
          </Badge>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {actionButtons}
        <QuestionReadLaterButton
          questionId={displayQuestion.id}
          isReadLater={isReadLater}
          onReadLaterChange={onReadLaterChange}
        />
        <QuestionCompletionCheckbox
          questionId={displayQuestion.id}
          isCompleted={isCompleted}
          onCompletionChange={onCompletionChange}
        />
      </div>
    </div>
  );

  return (
    <div className={cn("space-y-6", wrapLongTextClass)}>
      {editing ? (
        <form onSubmit={handleSave} className="space-y-6">
          {badgeRow}

          <div className="space-y-2">
            <Label htmlFor={`question-category-${displayQuestion.id}`}>
              Category
            </Label>
            <Select
              value={categoryId}
              items={categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              onValueChange={(value) => value && setCategoryId(value)}
              disabled={loadingCategories || categories.length === 0}
            >
              <SelectTrigger
                id={`question-category-${displayQuestion.id}`}
                className="w-full"
              >
                <SelectValue
                  placeholder={
                    loadingCategories ? "Loading categories..." : "Select category"
                  }
                />
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
            <Label htmlFor={`question-sidebar-label-${displayQuestion.id}`}>
              Sidebar label
            </Label>
            <Input
              id={`question-sidebar-label-${displayQuestion.id}`}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Short label shown in the category list"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`question-content-${displayQuestion.id}`}>
              Full question
            </Label>
            <Textarea
              id={`question-content-${displayQuestion.id}`}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="min-h-24 resize-y"
              placeholder="The full question shown in the detail panel"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>{answerLabel}</Label>
            {editableAnswers.length > 0 ? (
              editableAnswers.map((answer) =>
                displayQuestion.type === "EXPLANATION" ? (
                  <RichTextEditor
                    key={answer.id}
                    id={`answer-${answer.id}`}
                    value={answer.content}
                    onChange={(html) => updateAnswerContent(answer.id, html)}
                    placeholder="Write the detailed explanation or model answer..."
                  />
                ) : (
                  <Textarea
                    key={answer.id}
                    id={`answer-${answer.id}`}
                    value={answer.content}
                    onChange={(event) =>
                      updateAnswerContent(answer.id, event.target.value)
                    }
                    className="min-h-20"
                    required
                  />
                ),
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                This question has no editable answer text.
              </p>
            )}
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </form>
      ) : (
        <>
          {badgeRow}

          <TitleTag
            className={cn(
              "text-2xl font-bold leading-snug tracking-tight",
              wrapLongTextClass,
            )}
          >
            {highlightSearchMatches(displayQuestion.content, searchQuery)}
          </TitleTag>

          <QuestionAnswersList
            question={displayQuestion}
            searchQuery={searchQuery}
          />
        </>
      )}
    </div>
  );
});
