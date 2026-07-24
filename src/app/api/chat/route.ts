import { headers } from "next/headers";
import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { z } from "zod";

import { getAiChatModel } from "@/lib/ai/config";
import { formatAiChatError } from "@/lib/ai/format-error";
import { searchStudyContent } from "@/lib/ai/search-study-content";
import { buildDeveloperChatSystemPrompt } from "@/lib/ai/system-prompt";
import { auth } from "@/lib/auth";

export const maxDuration = 60;

const chatContextSchema = z.object({
  type: z.enum(["question", "challenge"]),
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  categorySlug: z.string().optional(),
});

const chatRequestSchema = z.object({
  messages: z.array(z.unknown()).min(1),
  context: chatContextSchema.optional().nullable(),
});

function getLastUserText(messages: UIMessage[]): string {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role !== "user") {
      continue;
    }

    return message.parts
      .filter(
        (part): part is { type: "text"; text: string } => part.type === "text",
      )
      .map((part) => part.text)
      .join(" ")
      .trim();
  }

  return "";
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(json);
  if (!parsed.success) {
    return Response.json({ error: "Invalid chat request." }, { status: 400 });
  }

  const messages = parsed.data.messages as UIMessage[];
  const context = parsed.data.context ?? null;
  const lastUserText = getLastUserText(messages);
  const searchQuery = [lastUserText, context?.title, context?.summary]
    .filter(Boolean)
    .join(" ");

  let sources;
  try {
    sources = await searchStudyContent(searchQuery);
  } catch (error) {
    return Response.json(
      { error: formatAiChatError(error) },
      { status: 502 },
    );
  }

  const system = buildDeveloperChatSystemPrompt({ sources, context });

  try {
    const result = streamText({
      model: getAiChatModel(),
      system,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      onError: (error) => formatAiChatError(error),
    });
  } catch (error) {
    return Response.json(
      { error: formatAiChatError(error) },
      { status: 502 },
    );
  }
}
