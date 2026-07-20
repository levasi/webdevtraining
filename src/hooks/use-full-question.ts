"use client";

import { useEffect, useState } from "react";

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
  const hasContent = questionHasAnswerContent(question);
  const [fullQuestion, setFullQuestion] = useState<QuestionWithAnswers | null>(
    hasContent ? (question as QuestionWithAnswers) : null,
  );
  const [loading, setLoading] = useState(!hasContent);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (questionHasAnswerContent(question)) {
      setFullQuestion(question as QuestionWithAnswers);
      setLoading(false);
      setError(null);
      return;
    }

    const questionId = question.id;
    const controller = new AbortController();

    async function loadQuestion() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/questions/${questionId}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load question");
        }

        const data = (await response.json()) as QuestionWithAnswers;
        setFullQuestion(data);
        setLoading(false);
      } catch (err) {
        if (controller.signal.aborted || isAbortError(err)) {
          return;
        }
        setError("Could not load this question. Please try again.");
        setLoading(false);
      }
    }

    void loadQuestion();

    return () => {
      controller.abort();
    };
  }, [question]);

  return { question: fullQuestion, loading, error };
}
