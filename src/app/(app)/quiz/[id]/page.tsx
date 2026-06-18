import { notFound } from "next/navigation";

import { QuizQuestionPlayer } from "@/components/quiz/quiz-question-player";
import { getQuestionById } from "@/lib/queries/content";
import { isQuizEligibleQuestion } from "@/lib/questions/quiz-eligible";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const question = await getQuestionById(id);
  return { title: question ? `Quiz: ${question.title}` : "Quiz" };
}

export default async function QuizQuestionPage({ params }: PageProps) {
  const { id } = await params;
  const question = await getQuestionById(id);

  if (!question || !isQuizEligibleQuestion(question)) {
    notFound();
  }

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <QuizQuestionPlayer question={question} />
    </div>
  );
}
