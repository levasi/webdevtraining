import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { QuizPackPlayer } from "@/components/quiz/quiz-pack-player";
import { DIFFICULTY_LABELS } from "@/lib/constants";
import { getQuizById } from "@/lib/queries/quizzes";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const quiz = await getQuizById(id);
  return { title: quiz?.title ?? "Quiz" };
}

export default async function QuizDetailPage({ params }: PageProps) {
  const { id } = await params;
  const quiz = await getQuizById(id);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="w-full space-y-6 px-2 py-8 sm:px-6">
      <div className="space-y-3">
        <ButtonLink href="/quiz" variant="ghost" size="sm" className="-ml-2">
          ← All quizzes
        </ButtonLink>
        <div className="flex flex-wrap items-center gap-2">
          {quiz.difficulty ? (
            <Badge variant="secondary">
              {DIFFICULTY_LABELS[quiz.difficulty]}
            </Badge>
          ) : null}
          {quiz.category ? (
            <Badge variant="outline">{quiz.category.name}</Badge>
          ) : null}
          <Badge variant="secondary">
            {quiz.questions.length} question
            {quiz.questions.length === 1 ? "" : "s"}
          </Badge>
        </div>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{quiz.title}</h1>
          {quiz.description ? (
            <p className="text-muted-foreground">{quiz.description}</p>
          ) : null}
        </div>
      </div>

      <QuizPackPlayer quiz={quiz} />
    </div>
  );
}
