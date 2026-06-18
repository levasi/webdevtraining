import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { QuestionDetailClient } from "@/components/questions/question-detail-client";
import { auth } from "@/lib/auth";
import { getQuestionById } from "@/lib/queries/content";
import { isQuestionCompleted } from "@/lib/queries/progress";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function QuestionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const question = await getQuestionById(id);

  if (!question) {
    notFound();
  }

  const session = await auth.api.getSession({ headers: await headers() });
  const isCompleted = session?.user
    ? await isQuestionCompleted(session.user.id, question.id)
    : false;

  return (
    <QuestionDetailClient
      question={question}
      categorySlug={question.category.slug}
      categoryName={question.category.name}
      isCompleted={isCompleted}
    />
  );
}
