"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { QUESTION_COMPLETION_MODE, CHALLENGE_RESOLVED_MODE } from "@/lib/queries/progress";
import type { ActionResult } from "@/types";

async function getSessionUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return session.user;
}

export async function toggleBookmark(
  questionId: string,
): Promise<ActionResult<{ bookmarked: boolean }>> {
  const user = await getSessionUser();

  if (!user) {
    return { success: false, error: "You must be signed in to bookmark questions." };
  }

  const existing = await db.bookmark.findUnique({
    where: {
      userId_questionId: {
        userId: user.id,
        questionId,
      },
    },
  });

  if (existing) {
    await db.bookmark.delete({ where: { id: existing.id } });
    revalidatePath("/bookmarks");
    return { success: true, data: { bookmarked: false } };
  }

  await db.bookmark.create({
    data: {
      userId: user.id,
      questionId,
    },
  });

  revalidatePath("/bookmarks");
  return { success: true, data: { bookmarked: true } };
}

export async function toggleQuestionCompleted(
  questionId: string,
): Promise<ActionResult<{ completed: boolean }>> {
  const user = await getSessionUser();

  if (!user) {
    return {
      success: false,
      error: "You must be signed in to mark questions as completed.",
    };
  }

  const existing = await db.progress.findUnique({
    where: {
      userId_questionId_mode: {
        userId: user.id,
        questionId,
        mode: QUESTION_COMPLETION_MODE,
      },
    },
  });

  const isCompleted =
    existing?.status === "COMPLETED" || existing?.status === "MASTERED";

  if (isCompleted && existing) {
    await db.progress.delete({ where: { id: existing.id } });
    revalidatePath("/categories", "layout");
    revalidatePath(`/questions/${questionId}`);
    // Backwards compat: /progress redirects to /completed
    revalidatePath("/completed");
    revalidatePath("/progress");
    return { success: true, data: { completed: false } };
  }

  await db.progress.upsert({
    where: {
      userId_questionId_mode: {
        userId: user.id,
        questionId,
        mode: QUESTION_COMPLETION_MODE,
      },
    },
    create: {
      userId: user.id,
      questionId,
      mode: QUESTION_COMPLETION_MODE,
      status: "COMPLETED",
      attempts: 1,
      lastStudiedAt: new Date(),
    },
    update: {
      status: "COMPLETED",
      lastStudiedAt: new Date(),
    },
  });

  revalidatePath("/categories", "layout");
  revalidatePath(`/questions/${questionId}`);
  // Backwards compat: /progress redirects to /completed
  revalidatePath("/completed");
  revalidatePath("/progress");
  return { success: true, data: { completed: true } };
}

export async function toggleChallengeResolved(
  challengeId: string,
): Promise<ActionResult<{ resolved: boolean }>> {
  const user = await getSessionUser();

  if (!user) {
    return {
      success: false,
      error: "You must be signed in to mark challenges as resolved.",
    };
  }

  const existing = await db.progress.findUnique({
    where: {
      userId_challengeId_mode: {
        userId: user.id,
        challengeId,
        mode: CHALLENGE_RESOLVED_MODE,
      },
    },
  });

  const isResolved =
    existing?.status === "COMPLETED" || existing?.status === "MASTERED";

  if (isResolved && existing) {
    await db.progress.delete({ where: { id: existing.id } });
    revalidatePath("/categories", "layout");
    revalidatePath(`/challenges/${challengeId}`);
    // Backwards compat: /progress redirects to /completed
    revalidatePath("/completed");
    revalidatePath("/progress");
    return { success: true, data: { resolved: false } };
  }

  const challenge = await db.challenge.findUnique({
    where: { id: challengeId },
    select: { categoryId: true },
  });

  await db.progress.upsert({
    where: {
      userId_challengeId_mode: {
        userId: user.id,
        challengeId,
        mode: CHALLENGE_RESOLVED_MODE,
      },
    },
    create: {
      userId: user.id,
      challengeId,
      categoryId: challenge?.categoryId,
      mode: CHALLENGE_RESOLVED_MODE,
      status: "COMPLETED",
      attempts: 1,
      lastStudiedAt: new Date(),
    },
    update: {
      status: "COMPLETED",
      lastStudiedAt: new Date(),
    },
  });

  revalidatePath("/categories", "layout");
  revalidatePath(`/challenges/${challengeId}`);
  // Backwards compat: /progress redirects to /completed
  revalidatePath("/completed");
  revalidatePath("/progress");
  return { success: true, data: { resolved: true } };
}

export async function saveNote(
  questionId: string | undefined,
  content: string,
): Promise<ActionResult<{ id: string }>> {
  const user = await getSessionUser();

  if (!user) {
    return { success: false, error: "You must be signed in to save notes." };
  }

  const note = await db.note.create({
    data: {
      userId: user.id,
      questionId,
      content,
    },
  });

  revalidatePath("/notes");
  return { success: true, data: { id: note.id } };
}

export async function recordStudySession(input: {
  questionId?: string;
  mode: "FLASHCARD" | "QUIZ" | "CODING" | "API_CHALLENGE" | "INTERVIEW";
  duration?: number;
}): Promise<ActionResult> {
  const user = await getSessionUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  await db.studyHistory.create({
    data: {
      userId: user.id,
      questionId: input.questionId,
      mode: input.mode,
      duration: input.duration,
    },
  });

  if (input.questionId) {
    await db.progress.upsert({
      where: {
        userId_questionId_mode: {
          userId: user.id,
          questionId: input.questionId,
          mode: input.mode,
        },
      },
      create: {
        userId: user.id,
        questionId: input.questionId,
        mode: input.mode,
        status: "IN_PROGRESS",
        attempts: 1,
        lastStudiedAt: new Date(),
      },
      update: {
        attempts: { increment: 1 },
        lastStudiedAt: new Date(),
        status: "IN_PROGRESS",
      },
    });
  }

  revalidatePath("/progress");
  return { success: true, data: undefined };
}
