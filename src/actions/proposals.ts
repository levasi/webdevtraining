"use server";

import { headers } from "next/headers";
import { ZodError } from "zod";

import { auth } from "@/lib/auth";
import { sendProposalEmail } from "@/lib/email/send-proposal-email";
import { contentProposalSchema } from "@/lib/validators/proposal";
import type { ActionResult } from "@/types";

export async function submitContentProposal(
  input: unknown,
): Promise<ActionResult> {
  const parsed = contentProposalSchema.safeParse(input);

  if (!parsed.success) {
    const message =
      parsed.error.issues[0]?.message ?? "Please check the proposal form.";
    return { success: false, error: message };
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    await sendProposalEmail({
      ...parsed.data,
      submitterEmail: parsed.data.submitterEmail || undefined,
      submitterName: parsed.data.submitterName || undefined,
      submittedByUser: session?.user
        ? {
            name: session.user.name,
            email: session.user.email,
          }
        : undefined,
    });

    return { success: true, data: undefined };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.issues[0]?.message ?? "Please check the proposal form.",
      };
    }

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Unable to send your proposal." };
  }
}
