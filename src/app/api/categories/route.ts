import { getCategories } from "@/lib/queries/content";

export async function GET() {
  const categories = await getCategories();

  return Response.json(
    categories.map((category) => ({
      name: category.name,
      slug: category.slug,
      questionCount: category._count.questions,
    })),
  );
}
