"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Clock, Trophy } from "lucide-react";

import { submitQuizAttempt } from "@/actions/quiz";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { QuizSubmitResult } from "@/lib/validators/quiz";
import type { QuizPlayerData } from "@/types";
import { cn } from "@/lib/utils";

type QuizPlayerProps = {
  quiz: QuizPlayerData;
};

type QuizPhase = "intro" | "playing" | "results";

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

export function QuizPlayer({ quiz }: QuizPlayerProps) {
  const [phase, setPhase] = useState<QuizPhase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(
    quiz.timeLimit ?? null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<QuizSubmitResult | null>(null);

  const currentQuestion = quiz.questions[currentIndex];
  const answeredCount = Object.keys(selections).length;
  const progressValue =
    quiz.questions.length > 0
      ? Math.round((answeredCount / quiz.questions.length) * 100)
      : 0;

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setError(null);

    const response = await submitQuizAttempt({
      quizId: quiz.id,
      answers: quiz.questions.map((question) => ({
        questionId: question.id,
        answerId: selections[question.id] ?? "",
      })),
      startedAt: startedAt ?? undefined,
    });

    setSubmitting(false);

    if (!response.success) {
      setError(response.error);
      return;
    }

    setResults(response.data);
    setPhase("results");
  }, [quiz.id, quiz.questions, selections, startedAt]);

  useEffect(() => {
    if (phase !== "playing" || secondsLeft === null) {
      return;
    }

    if (secondsLeft <= 0) {
      void handleSubmit();
      return;
    }

    const timer = window.setTimeout(() => {
      setSecondsLeft((value) => (value === null ? value : value - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [phase, secondsLeft, handleSubmit]);

  const unansweredQuestions = useMemo(
    () =>
      quiz.questions.filter((question) => !selections[question.id]).length,
    [quiz.questions, selections],
  );

  if (quiz.questions.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-muted-foreground">
          This quiz has no published questions yet.
        </CardContent>
      </Card>
    );
  }

  if (phase === "intro") {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>{quiz.title}</CardTitle>
          <CardDescription>
            {quiz.description ?? "Answer all questions to complete the quiz."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <p>{quiz.questions.length} questions</p>
            <p>
              {quiz.timeLimit
                ? `Time limit: ${formatTime(quiz.timeLimit)}`
                : "No time limit"}
            </p>
          </div>
          <Button
            onClick={() => {
              setPhase("playing");
              setStartedAt(new Date().toISOString());
              setSecondsLeft(quiz.timeLimit ?? null);
            }}
          >
            Start quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (phase === "results" && results) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-primary">
              <Trophy className="size-5" />
              <CardTitle>Quiz complete</CardTitle>
            </div>
            <CardDescription>
              You scored {results.correctCount} out of {results.totalQuestions}{" "}
              ({results.score}%)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={results.score} />
            {!results.saved && (
              <p className="text-sm text-muted-foreground">
                Results are shown locally.{" "}
                <Link href="/login" className="text-primary underline">
                  Sign in
                </Link>{" "}
                to save attempts and track progress.
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/quiz">Back to quizzes</ButtonLink>
              <ButtonLink href="/completed" variant="outline">
                View completed
              </ButtonLink>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          {quiz.questions.map((question, index) => {
            const result = results.results.find(
              (entry) => entry.questionId === question.id,
            );
            const selectedAnswer = question.answers.find(
              (answer) => answer.id === result?.answerId,
            );
            const correctAnswer = question.answers.find(
              (answer) => answer.id === result?.correctAnswerId,
            );

            return (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-base">
                    {index + 1}. {question.title}
                  </CardTitle>
                  <CardDescription
                    className={cn(
                      result?.isCorrect
                        ? "text-green-600 dark:text-green-400"
                        : "text-destructive",
                    )}
                  >
                    {result?.isCorrect ? "Correct" : "Incorrect"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-muted-foreground">{question.content}</p>
                  {selectedAnswer && (
                    <p>
                      Your answer: <strong>{selectedAnswer.content}</strong>
                    </p>
                  )}
                  {!result?.isCorrect && correctAnswer && (
                    <p>
                      Correct answer:{" "}
                      <strong>{correctAnswer.content}</strong>
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{quiz.title}</p>
          <h2 className="text-lg font-semibold">
            Question {currentIndex + 1} of {quiz.questions.length}
          </h2>
        </div>
        {secondsLeft !== null && (
          <div className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm">
            <Clock className="size-4" />
            {formatTime(secondsLeft)}
          </div>
        )}
      </div>

      <Progress value={progressValue} />

      <Card>
        <CardHeader>
          <CardTitle>{currentQuestion.title}</CardTitle>
          <CardDescription>{currentQuestion.content}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.answers.map((answer) => {
            const selected = selections[currentQuestion.id] === answer.id;

            return (
              <button
                key={answer.id}
                type="button"
                onClick={() =>
                  setSelections((current) => ({
                    ...current,
                    [currentQuestion.id]: answer.id,
                  }))
                }
                className={cn(
                  "w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                  selected
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted",
                )}
              >
                {answer.content}
              </button>
            );
          })}
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive/40">
          <CardContent className="py-4 text-sm text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>

        <p className="text-sm text-muted-foreground">
          {unansweredQuestions} unanswered
        </p>

        {currentIndex < quiz.questions.length - 1 ? (
          <Button
            onClick={() =>
              setCurrentIndex((index) =>
                Math.min(quiz.questions.length - 1, index + 1),
              )
            }
            disabled={!selections[currentQuestion.id]}
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={() => void handleSubmit()}
            disabled={submitting || unansweredQuestions > 0}
          >
            {submitting ? "Submitting..." : "Submit quiz"}
          </Button>
        )}
      </div>
    </div>
  );
}
