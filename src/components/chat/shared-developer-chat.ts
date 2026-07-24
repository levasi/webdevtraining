"use client";

import { Chat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

const SHARED_CHAT_ID = "ask-ai-shared";

let sharedChat: Chat<UIMessage> | null = null;

/** Singleton chat used by the floating widget and `/chat` page. */
export function getSharedDeveloperChat(): Chat<UIMessage> {
  if (!sharedChat) {
    sharedChat = new Chat({
      id: SHARED_CHAT_ID,
      transport: new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ context: null }),
      }),
    });
  }

  return sharedChat;
}
