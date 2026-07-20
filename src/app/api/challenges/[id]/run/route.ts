import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { getChallengeRunnerMeta } from "@/lib/challenges/challenge-meta";
import { db } from "@/lib/db";
import { runChallengeSchema } from "@/lib/validators/content";
import type { TestCase, TestResult } from "@/types";
import type { Prisma } from "@/generated/prisma/client";

function runUserCode(code: string, input: unknown): unknown {
  // MVP: isolated Function constructor. Replace with a proper sandbox for production.
  const fn = new Function(
    "input",
    `"use strict";\n${code}\nreturn typeof solve === "function" ? solve(input) : undefined;`,
  );
  return fn(input);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json();
  const parsed = runChallengeSchema.safeParse({
    challengeId: id,
    code: body.code,
    clientPassed: body.clientPassed,
    clientResults: body.clientResults,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const challenge = await db.challenge.findUnique({
    where: { id, isPublished: true },
  });

  if (!challenge) {
    return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
  }

  const testCases = challenge.testCases as TestCase[];
  const meta = getChallengeRunnerMeta(testCases);

  let results: TestResult[];
  let passed: boolean;

  if (meta.runner === "vue") {
    if (!parsed.data.clientResults) {
      return NextResponse.json(
        { error: "Vue challenges require clientResults from the browser suite" },
        { status: 400 },
      );
    }
    results = parsed.data.clientResults;
    passed =
      parsed.data.clientPassed ??
      (results.length > 0 && results.every((result) => result.passed));
  } else {
    const gradeCases = testCases.filter(
      (testCase) => testCase.description !== "__meta__",
    );
    results = gradeCases.map((testCase) => {
      try {
        const actualOutput = runUserCode(parsed.data.code, testCase.input);
        const casePassed =
          JSON.stringify(actualOutput) ===
          JSON.stringify(testCase.expectedOutput);

        return {
          ...testCase,
          passed: casePassed,
          actualOutput,
        };
      } catch (error) {
        return {
          ...testCase,
          passed: false,
          error: error instanceof Error ? error.message : "Runtime error",
        };
      }
    });
    passed = results.every((result) => result.passed);
  }

  await db.challengeAttempt.create({
    data: {
      userId: session.user.id,
      challengeId: challenge.id,
      code: parsed.data.code,
      passed,
      testResults: results as Prisma.InputJsonValue,
    },
  });

  await db.progress.upsert({
    where: {
      userId_challengeId_mode: {
        userId: session.user.id,
        challengeId: challenge.id,
        mode: "CODING",
      },
    },
    create: {
      userId: session.user.id,
      challengeId: challenge.id,
      categoryId: challenge.categoryId,
      mode: "CODING",
      status: passed ? "COMPLETED" : "IN_PROGRESS",
      score: passed ? 100 : 0,
      attempts: 1,
      lastStudiedAt: new Date(),
    },
    update: {
      attempts: { increment: 1 },
      status: passed ? "COMPLETED" : "IN_PROGRESS",
      score: passed ? 100 : undefined,
      lastStudiedAt: new Date(),
    },
  });

  return NextResponse.json({ passed, results });
}
