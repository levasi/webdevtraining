"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { normalizeQuestionText } from "@/lib/questions/dedup";
import { createQuestionSchema } from "@/lib/validators/content";
import type { ActionResult } from "@/types";

async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return session.user;
}

export async function createQuestion(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const data = createQuestionSchema.parse(input);

    const normalizedTitle = normalizeQuestionText(data.title);
    const normalizedContent = normalizeQuestionText(data.content);

    const categoryQuestions = await db.question.findMany({
      where: { categoryId: data.categoryId },
      select: { id: true, title: true, content: true },
    });

    const duplicate = categoryQuestions.find(
      (question) =>
        normalizeQuestionText(question.title) === normalizedTitle ||
        normalizeQuestionText(question.content) === normalizedContent,
    );

    if (duplicate) {
      return {
        success: false,
        error: `Duplicate question in this category: "${duplicate.title}". Edit the existing question instead.`,
      };
    }

    const question = await db.question.create({
      data: {
        categoryId: data.categoryId,
        title: data.title,
        content: data.content,
        explanation: data.explanation,
        difficulty: data.difficulty,
        type: data.type,
        tags: data.tags,
        isPublished: data.isPublished,
        answers: {
          create: data.answers.map((answer, index) => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
            sortOrder: index,
          })),
        },
      },
    });

    revalidatePath("/admin/questions");
    revalidatePath("/categories");
    return { success: true, data: { id: question.id } };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create question";
    return { success: false, error: message };
  }
}

export async function toggleQuestionPublished(
  questionId: string,
  isPublished: boolean,
): Promise<ActionResult> {
  try {
    await requireAdmin();

    await db.question.update({
      where: { id: questionId },
      data: { isPublished },
    });

    revalidatePath("/admin/questions");
    return { success: true, data: undefined };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update question";
    return { success: false, error: message };
  }
}
