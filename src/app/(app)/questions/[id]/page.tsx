import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { QuestionSidebarLayout } from "@/components/questions/question-sidebar-layout";
import { auth } from "@/lib/auth";
import { getPublishedQuestions, getQuestionById } from "@/lib/queries/content";
import { getCompletedQuestionIds } from "@/lib/queries/progress";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function QuestionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const question = await getQuestionById(id);

  if (!question) {
    notFound();
  }

  const siblings = await getPublishedQuestions({
    categorySlug: question.category.slug,
  });
  const session = await auth.api.getSession({ headers: await headers() });
  const completedQuestionIds = session?.user
    ? await getCompletedQuestionIds(session.user.id)
    : [];
  const isCompleted = completedQuestionIds.includes(question.id);

  return (
    <div className="w-full px-4 py-8 sm:px-6">
      <QuestionSidebarLayout
        question={question}
        items={siblings}
        isCompleted={isCompleted}
        completedQuestionIds={completedQuestionIds}
      />
    </div>
  );
}
