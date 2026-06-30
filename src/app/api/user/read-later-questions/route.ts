import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { getReadLaterQuestionIds } from "@/lib/queries/bookmarks";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ questionIds: [] });
  }

  const questionIds = await getReadLaterQuestionIds(session.user.id);
  return NextResponse.json({ questionIds });
}
