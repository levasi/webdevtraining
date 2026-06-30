import { db } from "@/lib/db";

export async function getReadLaterQuestionIds(userId: string): Promise<string[]> {
  const rows = await db.bookmark.findMany({
    where: { userId },
    select: { questionId: true },
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => row.questionId);
}
