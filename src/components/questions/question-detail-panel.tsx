"use client";

import { memo, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { updateQuestion } from "@/actions/admin/questions";
import { QuestionAnswersList } from "@/components/questions/question-answers-list";
import { QuestionCompletionCheckbox } from "@/components/questions/question-completion-checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import { getQuestionAnswerPreview } from "@/lib/questions/answer-preview";
import { highlightSearchMatches } from "@/lib/search-highlight";
import { cn, wrapLongTextClass } from "@/lib/utils";
import { useSession } from "@/lib/auth-client";
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
}: QuestionDetailPanelProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const TitleTag = titleAs;
  const [displayQuestion, setDisplayQuestion] = useState(question);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(question.title);
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
    setEditableAnswers(getEditableAnswers(question));
    setEditing(false);
    setError(null);
  }, [question]);

  function handleQuestionChange(updatedQuestion: QuestionWithAnswers) {
    setDisplayQuestion(updatedQuestion);
    onQuestionChange?.(updatedQuestion);
  }

  function resetDraft() {
    setTitle(displayQuestion.title);
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
      title,
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
      answers: displayQuestion.answers.map((answer) => {
        const edited = editableAnswers.find((item) => item.id === answer.id);
        return edited ? { ...answer, content: edited.content } : answer;
      }),
    };

    handleQuestionChange(updatedQuestion);
    setEditing(false);
    router.refresh();
  }

  return (
    <div className={cn("space-y-6", wrapLongTextClass)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={difficultyVariant[displayQuestion.difficulty]}>
            {DIFFICULTY_LABELS[displayQuestion.difficulty]}
          </Badge>
          {showCategory && (
            <Badge variant="outline">{displayQuestion.category.name}</Badge>
          )}
          <Badge variant="secondary">
            {displayQuestion.type.replace("_", " ")}
          </Badge>
        </div>
        <QuestionCompletionCheckbox
          questionId={displayQuestion.id}
          isCompleted={isCompleted}
          onCompletionChange={onCompletionChange}
        />
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor={`question-title-${displayQuestion.id}`}>
              Question name
            </Label>
            <Input
              id={`question-title-${displayQuestion.id}`}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="space-y-3">
            <Label>{answerLabel}</Label>
            {editableAnswers.length > 0 ? (
              editableAnswers.map((answer) => (
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
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                This question has no editable answer text.
              </p>
            )}
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" size="sm" disabled={loading}>
              {loading ? "Saving..." : "Save changes"}
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
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <TitleTag
              className={cn(
                "text-2xl font-bold leading-snug tracking-tight",
                wrapLongTextClass,
              )}
            >
              {highlightSearchMatches(displayQuestion.title, searchQuery)}
            </TitleTag>
            {isAdmin ? (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="shrink-0"
                onClick={() => {
                  resetDraft();
                  setEditing(true);
                }}
              >
                <Pencil className="size-3.5" />
                Edit
              </Button>
            ) : null}
          </div>

          <QuestionAnswersList
            question={displayQuestion}
            searchQuery={searchQuery}
          />
        </>
      )}
    </div>
  );
});
