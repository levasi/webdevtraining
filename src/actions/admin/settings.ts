"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin/require-admin";
import { db } from "@/lib/db";
import { isMainFontKey } from "@/lib/fonts";
import type { ActionResult } from "@/types";

const updateMainFontSchema = z.object({
  mainFont: z.string().min(1),
});

export async function updateMainFont(
  input: unknown,
): Promise<ActionResult<{ mainFont: string }>> {
  try {
    await requireAdmin();
    const { mainFont } = updateMainFontSchema.parse(input);

    if (!isMainFontKey(mainFont)) {
      return { success: false, error: "Invalid font selection." };
    }

    await db.siteSettings.upsert({
      where: { id: "singleton" },
      create: { id: "singleton", mainFont },
      update: { mainFont },
    });

    revalidatePath("/", "layout");

    return { success: true, data: { mainFont } };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update main font";
    return { success: false, error: message };
  }
}
