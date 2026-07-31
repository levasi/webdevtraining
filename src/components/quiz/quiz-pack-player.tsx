"use client";

import { useState } from "react";

import { saveQuizAttempt } from "@/actions/quizzes";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { QuizQuestionPlayer } from "@/components/quiz/quiz-question-player";
import type { QuizPackDetail } from "@/lib/queries/quizzes";
import { cn } from "@/lib/utils";

type QuizPackPlayerProps = {
  quiz: QuizPackDetail;
};

type AnswerResult = {
  questionId: string;
  isCorrect: boolean;
};

function QuizProgressStrip({
  total,
  results,
  currentIndex,
  pendingResult,
}: {
  total: number;
  results: Array<boolean | null>;
  currentIndex: number;
  pendingResult: boolean | null;
}) {
  return (
    <div
      className="flex flex-wrap justify-center gap-1.5"
      role="list"
      aria-label="Quiz progress"
    >
      {Array.from({ length: total }, (_, index) => {
        const answered = results[index];
        const isCurrent = index === currentIndex;
        const status =
          answered !== null && answered !== undefined
            ? answered
            : isCurrent
              ? pendingResult
              : null;

        return (
          <div
            key={index}
            role="listitem"
            title={`Question ${index + 1}${
              status === true
                ? " — correct"
                : status === false
                  ? " — incorrect"
                  : isCurrent
                    ? " — current"
                    : " — unanswered"
            }`}
            aria-label={`Question ${index + 1}${
              status === true
                ? ", correct"
                : status === false
                  ? ", incorrect"
                  : isCurrent
                    ? ", current"
                    : ", unanswered"
            }`}
            className={cn(
              "flex size-7 items-center justify-center rounded-md border text-xs font-medium tabular-nums transition-colors",
              status === true &&
                "border-green-600 bg-green-500/15 text-green-700 dark:text-green-400",
              status === false &&
                "border-destructive bg-destructive/15 text-destructive",
              status === null &&
                isCurrent &&
                "border-primary bg-primary/10 text-primary",
              status === null &&
                !isCurrent &&
                "border-border/80 bg-muted/40 text-muted-foreground",
            )}
          >
            {index + 1}
          </div>
        );
      })}
    </div>
  );
}

export function QuizPackPlayer({ quiz }: QuizPackPlayerProps) {
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Array<boolean | null>>(() =>
    Array.from({ length: quiz.questions.length }, () => null),
  );
  const [answers, setAnswers] = useState<AnswerResult[]>([]);
  const [awaitingNext, setAwaitingNext] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const question = quiz.questions[index];
  const isLast = index >= quiz.questions.length - 1;
  const correctCount = answers.filter((entry) => entry.isCorrect).length;

  async function finishPack(finalAnswers: AnswerResult[]) {
    const correct = finalAnswers.filter((entry) => entry.isCorrect).length;
    setFinished(true);
    setSaving(true);
    setSaveError(null);

    const response = await saveQuizAttempt({
      quizId: quiz.id,
      score: finalAnswers.length === 0 ? 0 : correct / finalAnswers.length,
      totalQuestions: finalAnswers.length,
      answers: finalAnswers,
    });

    setSaving(false);
    if (!response.success) {
      setSaveError(response.error);
    }
  }

  function handleChecked({ isCorrect }: { isCorrect: boolean }) {
    if (!question || awaitingNext || finished) {
      return;
    }

    setLastCorrect(isCorrect);
    setAwaitingNext(true);
  }

  async function handleContinue() {
    if (!question || !awaitingNext) {
      return;
    }

    const nextResults = [...results];
    nextResults[index] = lastCorrect;
    setResults(nextResults);

    const nextAnswers = [
      ...answers,
      { questionId: question.id, isCorrect: lastCorrect },
    ];
    setAnswers(nextAnswers);
    setAwaitingNext(false);

    if (isLast) {
      await finishPack(nextAnswers);
      return;
    }

    setIndex((current) => current + 1);
  }

  function handleRetake() {
    setIndex(0);
    setResults(Array.from({ length: quiz.questions.length }, () => null));
    setAnswers([]);
    setAwaitingNext(false);
    setLastCorrect(false);
    setFinished(false);
    setSaveError(null);
  }

  const progressStrip = (
    <QuizProgressStrip
      total={quiz.questions.length}
      results={results}
      currentIndex={finished ? -1 : index}
      pendingResult={awaitingNext ? lastCorrect : null}
    />
  );

  if (finished) {
    const percent =
      answers.length === 0
        ? 0
        : Math.round((correctCount / answers.length) * 100);
    const wrongAnswers = answers.filter((entry) => !entry.isCorrect);
    const wrongQuestions = wrongAnswers
      .map((entry) =>
        quiz.questions.find((item) => item.id === entry.questionId),
      )
      .filter((item): item is NonNullable<typeof item> => item != null);

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        {progressStrip}

        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Quiz complete</h2>
          <p className="text-muted-foreground">
            You scored{" "}
            <span className="font-semibold text-foreground">
              {correctCount}/{answers.length}
            </span>{" "}
            ({percent}%).
          </p>
          {saving ? (
            <p className="text-sm text-muted-foreground">Saving attempt…</p>
          ) : null}
          {saveError ? (
            <p className="text-sm text-destructive">{saveError}</p>
          ) : null}
        </div>

        {wrongQuestions.length > 0 ? (
          <section className="space-y-4">
            <h3 className="text-base font-semibold tracking-tight">
              Review incorrect answers
            </h3>
            <div className="space-y-4">
              {wrongQuestions.map((item) => {
                const correctAnswers = item.answers.filter(
                  (answer) => answer.isCorrect,
                );
                return (
                  <div
                    key={item.id}
                    className="space-y-2 rounded-xl border border-border/80 bg-card/60 p-4"
                  >
                    <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                      {item.content}
                    </p>
                    <p className="text-sm text-destructive">
                      Correct answer
                      {correctAnswers.length > 1 ? "s" : ""}:{" "}
                      {correctAnswers.map((answer) => answer.content).join(", ")}
                    </p>
                    {item.explanation ? (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.explanation}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <p className="text-center text-sm text-green-700 dark:text-green-400">
            Perfect run — nothing to review.
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-2">
          <Button type="button" onClick={handleRetake}>
            Retake quiz
          </Button>
          <ButtonLink href="/quiz" variant="outline">
            Back to quizzes
          </ButtonLink>
        </div>
      </div>
    );
  }

  if (!question) {
    return (
      <p className="text-sm text-muted-foreground">
        This quiz has no playable questions.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {progressStrip}

      <QuizQuestionPlayer
        key={question.id}
        question={question}
        showBackLink={false}
        onChecked={handleChecked}
        resultActions={
          awaitingNext ? (
            <Button type="button" onClick={() => void handleContinue()}>
              {isLast ? "Finish quiz" : "Next question"}
            </Button>
          ) : null
        }
      />
    </div>
  );
}
