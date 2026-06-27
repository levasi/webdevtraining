import { getCategoryNav } from "@/lib/queries/content";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const data = await getCategoryNav(slug);

  if (data === null) {
    return Response.json({ error: "Category not found" }, { status: 404 });
  }

  return Response.json(data);
}
