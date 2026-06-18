import { notFound } from "next/navigation";

import { QuizSidebarLayout } from "@/components/quiz/quiz-sidebar-layout";
import { getPublishedQuestions, getQuestionById } from "@/lib/queries/content";
import { filterQuizEligibleQuestions } from "@/lib/questions/quiz-eligible";

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

  if (!question) {
    notFound();
  }

  const categoryQuestions = await getPublishedQuestions({
    categorySlug: question.category.slug,
  });
  const siblings = filterQuizEligibleQuestions(categoryQuestions);

  if (!siblings.some((item) => item.id === question.id)) {
    notFound();
  }

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <QuizSidebarLayout question={question} items={siblings} />
    </div>
  );
}
