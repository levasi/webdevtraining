"use client";

import { useState } from "react";

import { GenerateQuizButton } from "@/components/quiz/generate-quiz-button";
import { QuizBrowser } from "@/components/quiz/quiz-browser";
import { QuizPackList } from "@/components/quiz/quiz-pack-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { QuizPackSummary } from "@/lib/queries/quizzes";
import type { QuestionWithAnswers } from "@/types";

type QuizSurfaceTabsProps = {
  questions: QuestionWithAnswers[];
  packs: QuizPackSummary[];
  packsEmptyMessage?: string;
  categorySlug?: string;
  categoryName?: string;
};

type QuizSubTab = "practice" | "packs";

export function QuizSurfaceTabs({
  questions,
  packs,
  packsEmptyMessage = "No quiz packs are available yet. Generate one to get started.",
  categorySlug,
  categoryName,
}: QuizSurfaceTabsProps) {
  const hasPractice = questions.length > 0;
  const canShowPacks = packs.length > 0 || hasPractice;

  const [subTab, setSubTab] = useState<QuizSubTab>(() =>
    hasPractice ? "practice" : "packs",
  );

  if (!hasPractice && packs.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No quiz questions or packs are available yet.
      </p>
    );
  }

  return (
    <Tabs
      value={subTab}
      onValueChange={(value) => {
        if (value === "practice" || value === "packs") {
          setSubTab(value);
        }
      }}
      className="gap-4"
    >
      <TabsList>
        {hasPractice ? (
          <TabsTrigger value="practice">Practice questions</TabsTrigger>
        ) : null}
        {canShowPacks ? (
          <TabsTrigger value="packs">Quiz packs</TabsTrigger>
        ) : null}
      </TabsList>

      {hasPractice ? (
        <TabsContent value="practice" className="mt-0 space-y-3">
          <p className="text-sm text-muted-foreground">
            Multiple-choice and true/false items one at a time.
          </p>
          <QuizBrowser questions={questions} />
        </TabsContent>
      ) : null}

      {canShowPacks ? (
        <TabsContent value="packs" className="mt-0 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              Curated sets, or generate a random pack from the question bank.
            </p>
            {hasPractice ? (
              <GenerateQuizButton
                categorySlug={categorySlug}
                categoryName={categoryName}
              />
            ) : null}
          </div>
          <QuizPackList quizzes={packs} emptyMessage={packsEmptyMessage} />
        </TabsContent>
      ) : null}
    </Tabs>
  );
}
