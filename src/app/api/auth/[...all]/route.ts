import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { isDatabaseAvailable } from "@/lib/db";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export async function GET(request: Request) {
  if (!(await isDatabaseAvailable())) {
    return NextResponse.json(null);
  }

  try {
    return await handler.GET(request);
  } catch {
    return NextResponse.json(null);
  }
}

export async function POST(request: Request) {
  if (!(await isDatabaseAvailable())) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }

  try {
    return await handler.POST(request);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Authentication failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
