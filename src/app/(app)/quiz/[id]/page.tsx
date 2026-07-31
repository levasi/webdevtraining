import { notFound } from "next/navigation";

import { ButtonLink } from "@/components/ui/button-link";
import { QuizPackPlayer } from "@/components/quiz/quiz-pack-player";
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
      <ButtonLink href="/quiz" variant="ghost" size="sm" className="-ml-2">
        ← All quizzes
      </ButtonLink>

      <QuizPackPlayer quiz={quiz} />
    </div>
  );
}
