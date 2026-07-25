"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import { ArrowDownIcon, MessageSquareIcon } from "lucide-react";

import { ConversationEmptyState } from "@/components/ai-elements/conversation";
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
import { Button } from "@/components/ui/button";
import type { ChatContentContext } from "@/lib/ai/types";
import { cn } from "@/lib/utils";

type DeveloperChatProps = {
  context?: ChatContentContext | null;
  className?: string;
  compact?: boolean;
};

function getLastUserMessageId(
  messages: Array<{ id: string; role: string }>,
): string | null {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    if (messages[index].role === "user") {
      return messages[index].id;
    }
  }
  return null;
}

export function DeveloperChat({
  context = null,
  className,
  compact = false,
}: DeveloperChatProps) {
  const contextRef = useRef(context);
  contextRef.current = context;

  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const lastPinnedUserIdRef = useRef<string | null>(null);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);

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
  const lastUserMessageId = getLastUserMessageId(messages);

  useEffect(() => {
    const scroller = scrollRef.current;
    const content = contentRef.current;
    if (!scroller) {
      return;
    }

    const updateJumpVisibility = () => {
      const remaining =
        scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      setShowJumpToLatest(remaining > 80);
    };

    updateJumpVisibility();
    scroller.addEventListener("scroll", updateJumpVisibility, { passive: true });
    const resizeObserver = new ResizeObserver(updateJumpVisibility);
    resizeObserver.observe(scroller);
    if (content) {
      resizeObserver.observe(content);
    }

    return () => {
      scroller.removeEventListener("scroll", updateJumpVisibility);
      resizeObserver.disconnect();
    };
  }, [messages.length]);

  // Pin the latest user prompt at the top of the viewport; do not follow the stream.
  useLayoutEffect(() => {
    if (!lastUserMessageId || lastPinnedUserIdRef.current === lastUserMessageId) {
      return;
    }

    const scroller = scrollRef.current;
    const spacer = spacerRef.current;
    const node = document.getElementById(`chat-message-${lastUserMessageId}`);
    if (!scroller || !spacer || !node) {
      return;
    }

    lastPinnedUserIdRef.current = lastUserMessageId;

    const topPadding = 16;
    const neededSpacer = Math.max(
      0,
      scroller.clientHeight - node.offsetHeight - topPadding * 2,
    );
    spacer.style.minHeight = `${neededSpacer}px`;

    const top =
      scroller.scrollTop +
      (node.getBoundingClientRect().top - scroller.getBoundingClientRect().top) -
      topPadding;

    scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [lastUserMessageId, messages.length]);

  // Drop the pin spacer once the assistant reply is finished.
  useEffect(() => {
    if (isBusy) {
      return;
    }

    const spacer = spacerRef.current;
    if (spacer?.style.minHeight) {
      spacer.style.removeProperty("min-height");
    }
  }, [isBusy, status]);

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col overflow-hidden rounded-xl border border-border/80 bg-card/80",
        compact ? "h-[min(70dvh,32rem)]" : "h-[min(75dvh,40rem)]",
        className,
      )}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden" role="log">
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto overscroll-contain [overflow-anchor:none]"
        >
          <div ref={contentRef} className="flex flex-col gap-8 p-4">
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
              <>
                {messages.map((message) => (
                  <Message
                    key={message.id}
                    id={`chat-message-${message.id}`}
                    from={message.role}
                    className={
                      message.role === "user" ? "scroll-mt-4" : undefined
                    }
                  >
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
                ))}
                {/* Lets the latest prompt scroll to the top even when the thread is short. */}
                <div
                  ref={spacerRef}
                  aria-hidden
                  className="pointer-events-none shrink-0"
                />
              </>
            )}
          </div>
        </div>

        {showJumpToLatest ? (
          <Button
            className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full dark:bg-background dark:hover:bg-muted"
            onClick={() => {
              scrollRef.current?.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth",
              });
            }}
            size="icon"
            type="button"
            variant="outline"
            aria-label="Jump to latest message"
          >
            <ArrowDownIcon className="size-4" />
          </Button>
        ) : null}
      </div>

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
