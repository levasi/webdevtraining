"use client";

import { useMemo, useRef } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { MessageSquareIcon } from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { getSharedDeveloperChat } from "@/components/chat/shared-developer-chat";
import { ButtonLink } from "@/components/ui/button-link";
import type { ChatContentContext } from "@/lib/ai/types";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

type DeveloperChatProps = {
  context?: ChatContentContext | null;
  className?: string;
  compact?: boolean;
};

export function DeveloperChat({
  context = null,
  className,
  compact = false,
}: DeveloperChatProps) {
  const { data: session, isPending } = useSession();
  const contextRef = useRef(context);
  contextRef.current = context;

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: () => ({ context: contextRef.current }),
      }),
    [],
  );

  // Global widget + /chat share one conversation; contextual sheets stay local.
  const chat = useMemo(
    () => (context ? undefined : getSharedDeveloperChat()),
    [context],
  );

  const { messages, sendMessage, status, error } = useChat(
    chat ? { chat } : { transport },
  );
  const isBusy = status === "submitted" || status === "streaming";

  if (isPending) {
    return (
      <div
        className={cn(
          "flex items-center justify-center text-sm text-muted-foreground",
          compact ? "min-h-64" : "min-h-[28rem]",
          className,
        )}
      >
        Loading chat…
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4 rounded-xl border border-border/80 bg-card/60 p-8 text-center",
          compact ? "min-h-64" : "min-h-[28rem]",
          className,
        )}
      >
        <MessageSquareIcon className="size-8 text-muted-foreground" />
        <div className="space-y-1">
          <h2 className="text-base font-medium">Sign in to Ask AI</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Get interview coaching grounded in your study content when matches
            are available.
          </p>
        </div>
        <ButtonLink href="/login" size="sm">
          Sign in
        </ButtonLink>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-xl border border-border/80 bg-card/80",
        compact ? "h-[min(70dvh,32rem)]" : "h-[min(75dvh,40rem)]",
        className,
      )}
    >
      <Conversation className="min-h-0">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquareIcon className="size-8" />}
              title={
                context
                  ? `Ask about "${context.title}"`
                  : "Ask a developer interview question"
              }
              description={
                context
                  ? "Get hints, explanations, and coaching for this item."
                  : "Ask about JS, React, Vue, CSS, Node, and more."
              }
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <MessageResponse
                          key={`${message.id}-${index}`}
                          isAnimating={
                            isBusy &&
                            message.role === "assistant" &&
                            index === message.parts.length - 1
                          }
                        >
                          {part.text}
                        </MessageResponse>
                      );
                    }
                    return null;
                  })}
                </MessageContent>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {error ? (
        <p className="border-t border-border/60 px-4 py-2 text-sm text-destructive">
          {error.message || "Something went wrong. Try again."}
        </p>
      ) : null}

      <div className="border-t border-border/60 p-3">
        <PromptInput
          onSubmit={async ({ text }) => {
            const trimmed = text.trim();
            if (!trimmed || isBusy) {
              return;
            }
            await sendMessage({ text: trimmed });
          }}
        >
          <PromptInputBody>
            <PromptInputTextarea
              placeholder={
                context
                  ? "Ask for a hint or explanation…"
                  : "Ask an interview question…"
              }
              disabled={isBusy}
            />
          </PromptInputBody>
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} disabled={isBusy} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
