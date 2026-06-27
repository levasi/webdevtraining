import { getQuestionNavContext } from "@/lib/queries/content";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const question = await getQuestionNavContext(id);

  if (!question) {
    return Response.json({ error: "Question not found" }, { status: 404 });
  }

  return Response.json({
    questionId: question.id,
    category: question.category,
  });
}
