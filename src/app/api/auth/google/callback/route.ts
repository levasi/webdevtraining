import { NextResponse } from "next/server";
import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";
import { isDatabaseAvailable } from "@/lib/db";

const { GET: authGet, POST: authPost } = toNextJsHandler(auth);

function toBetterAuthCallbackRequest(request: Request) {
  const url = new URL(request.url);
  url.pathname = "/api/auth/callback/google";

  return new Request(url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    duplex: "half",
  } as RequestInit);
}

export async function GET(request: Request) {
  if (!(await isDatabaseAvailable())) {
    return NextResponse.json(
      { error: "Database is not configured." },
      { status: 503 },
    );
  }

  try {
    return await authGet(toBetterAuthCallbackRequest(request));
  } catch {
    return NextResponse.json(
      { error: "Google sign-in failed." },
      { status: 500 },
    );
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
    return await authPost(toBetterAuthCallbackRequest(request));
  } catch {
    return NextResponse.json(
      { error: "Google sign-in failed." },
      { status: 500 },
    );
  }
}
