"use client";

import { useState } from "react";

import { saveQuizAttempt } from "@/actions/quizzes";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { QuizQuestionPlayer } from "@/components/quiz/quiz-question-player";
import type { QuizPackDetail } from "@/lib/queries/quizzes";

type QuizPackPlayerProps = {
  quiz: QuizPackDetail;
};

export function QuizPackPlayer({ quiz }: QuizPackPlayerProps) {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<
    Array<{ questionId: string; isCorrect: boolean }>
  >([]);
  const [awaitingNext, setAwaitingNext] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const question = quiz.questions[index];
  const isLast = index >= quiz.questions.length - 1;

  async function finishPack(
    finalAnswers: Array<{ questionId: string; isCorrect: boolean }>,
  ) {
    const correct = finalAnswers.filter((entry) => entry.isCorrect).length;
    setCorrectCount(correct);
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

  if (finished) {
    const percent =
      answers.length === 0
        ? 0
        : Math.round((correctCount / answers.length) * 100);

    return (
      <div className="mx-auto max-w-xl space-y-6 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Quiz complete</h2>
          <p className="text-muted-foreground">
            You scored{" "}
            <span className="font-semibold text-foreground">
              {correctCount}/{answers.length}
            </span>{" "}
            ({percent}%) on {quiz.title}.
          </p>
          {saving ? (
            <p className="text-sm text-muted-foreground">Saving attempt…</p>
          ) : null}
          {saveError ? (
            <p className="text-sm text-destructive">{saveError}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            type="button"
            onClick={() => {
              setIndex(0);
              setCorrectCount(0);
              setAnswers([]);
              setAwaitingNext(false);
              setLastCorrect(false);
              setFinished(false);
              setSaveError(null);
            }}
          >
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
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <p>
          Question {index + 1} of {quiz.questions.length}
        </p>
        <p>
          Checked correct so far:{" "}
          {answers.filter((entry) => entry.isCorrect).length}
        </p>
      </div>

      <QuizQuestionPlayer
        key={question.id}
        question={question}
        showBackLink={false}
        onChecked={handleChecked}
      />

      {awaitingNext ? (
        <div className="flex justify-end">
          <Button type="button" onClick={() => void handleContinue()}>
            {isLast ? "Finish quiz" : "Next question"}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
