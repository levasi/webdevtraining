import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function requireAdmin() {
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
