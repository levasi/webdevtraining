"use client";

import { useEffect, useState } from "react";

import { questionHasAnswerContent } from "@/lib/questions/has-answer-content";
import type { CategoryQuestionSummary, QuestionWithAnswers } from "@/types";

type QuestionInput = CategoryQuestionSummary | QuestionWithAnswers;

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

    let cancelled = false;

    async function loadQuestion() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/questions/${question.id}`);

        if (!response.ok) {
          throw new Error("Failed to load question");
        }

        const data = (await response.json()) as QuestionWithAnswers;

        if (!cancelled) {
          setFullQuestion(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) {
          setError("Could not load this question. Please try again.");
          setLoading(false);
        }
      }
    }

    void loadQuestion();

    return () => {
      cancelled = true;
    };
  }, [question]);

  return { question: fullQuestion, loading, error };
}
