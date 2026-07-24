"use client";

import { MessageSquareIcon } from "lucide-react";

import { DeveloperChat } from "@/components/chat/developer-chat";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ChatContentContext } from "@/lib/ai/types";
import { cn } from "@/lib/utils";

type AskAiSheetProps = {
  context: ChatContentContext;
  triggerClassName?: string;
  iconOnlyOnMobile?: boolean;
};

export function AskAiSheet({
  context,
  triggerClassName,
  iconOnlyOnMobile = false,
}: AskAiSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            type="button"
            size="sm"
            variant="outline"
            className={cn(triggerClassName)}
            aria-label="Ask AI"
            title="Ask AI"
          />
        }
      >
        <MessageSquareIcon className="size-3.5" />
        <span className={cn(iconOnlyOnMobile && "hidden sm:inline")}>
          Ask AI
        </span>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-4 data-[side=right]:sm:max-w-lg"
      >
        <SheetHeader>
          <SheetTitle>Ask AI</SheetTitle>
          <SheetDescription className="line-clamp-2">
            Coaching for {context.title}
          </SheetDescription>
        </SheetHeader>
        <DeveloperChat context={context} compact className="min-h-0 flex-1" />
      </SheetContent>
    </Sheet>
  );
}
