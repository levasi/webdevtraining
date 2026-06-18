import { db } from "@/lib/db";

export const QUESTION_COMPLETION_MODE = "FLASHCARD" as const;
export const CHALLENGE_RESOLVED_MODE = "CODING" as const;

export async function getCompletedQuestionIds(
  userId: string,
): Promise<string[]> {
  const rows = await db.progress.findMany({
    where: {
      userId,
      questionId: { not: null },
      mode: QUESTION_COMPLETION_MODE,
      status: { in: ["COMPLETED", "MASTERED"] },
    },
    select: { questionId: true },
  });

  return rows
    .map((row) => row.questionId)
    .filter((questionId): questionId is string => questionId != null);
}

export async function isQuestionCompleted(
  userId: string,
  questionId: string,
): Promise<boolean> {
  const progress = await db.progress.findUnique({
    where: {
      userId_questionId_mode: {
        userId,
        questionId,
        mode: QUESTION_COMPLETION_MODE,
      },
    },
    select: { status: true },
  });

  return (
    progress?.status === "COMPLETED" || progress?.status === "MASTERED"
  );
}

export async function isChallengeResolved(
  userId: string,
  challengeId: string,
): Promise<boolean> {
  const progress = await db.progress.findUnique({
    where: {
      userId_challengeId_mode: {
        userId,
        challengeId,
        mode: CHALLENGE_RESOLVED_MODE,
      },
    },
    select: { status: true },
  });

  return (
    progress?.status === "COMPLETED" || progress?.status === "MASTERED"
  );
}
