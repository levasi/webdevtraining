"use client";

import { useEffect, useRef, useState } from "react";

import { questionHasAnswerContent } from "@/lib/questions/has-answer-content";
import type { CategoryQuestionSummary, QuestionWithAnswers } from "@/types";

type QuestionInput = CategoryQuestionSummary | QuestionWithAnswers;

function isAbortError(error: unknown) {
  return (
    (error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error &&
      (error.name === "AbortError" || /abort|cancel/i.test(error.message)))
  );
}

export function useFullQuestion(question: QuestionInput) {
  const questionId = question.id;
  const initialHasContent = questionHasAnswerContent(question);
  const [fullQuestion, setFullQuestion] = useState<QuestionWithAnswers | null>(
    initialHasContent ? (question as QuestionWithAnswers) : null,
  );
  const [loading, setLoading] = useState(!initialHasContent);
  const [error, setError] = useState<string | null>(null);
  const loadedIdRef = useRef<string | null>(
    initialHasContent ? questionId : null,
  );

  useEffect(() => {
    if (questionHasAnswerContent(question)) {
      setFullQuestion(question as QuestionWithAnswers);
      setLoading(false);
      setError(null);
      loadedIdRef.current = questionId;
      return;
    }

    // Same question id after a soft refresh — keep the loaded player mounted
    // so answer selection / results are not wiped.
    if (loadedIdRef.current === questionId) {
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    setLoading(true);
    setError(null);
    setFullQuestion(null);

    async function loadQuestion() {
      try {
        const response = await fetch(`/api/questions/${questionId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load question");
        }

        const data = (await response.json()) as QuestionWithAnswers;
        if (cancelled) {
          return;
        }
        setFullQuestion(data);
        loadedIdRef.current = questionId;
        setLoading(false);
      } catch (err) {
        if (cancelled || controller.signal.aborted || isAbortError(err)) {
          return;
        }
        setError("Could not load this question. Please try again.");
        setLoading(false);
      }
    }

    void loadQuestion();

    return () => {
      cancelled = true;
      controller.abort();
    };
    // Key only on questionId. Summary object identity changes on soft refresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- questionId
  }, [questionId]);

  return { question: fullQuestion, loading, error };
}
