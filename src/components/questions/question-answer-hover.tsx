"use client";

import { RichTextContent } from "@/components/editor/rich-text-content";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  getQuestionAnswerPreview,
  hasQuestionAnswerPreview,
} from "@/lib/questions/answer-preview";
import {
  coerceAnswerToRichHtml,
  isProbablyHtml,
  looksLikeMarkdown,
} from "@/lib/rich-text";
import { cn } from "@/lib/utils";
import type { QuestionWithAnswers } from "@/types";

type QuestionAnswerHoverProps = {
  question: QuestionWithAnswers;
  children: React.ReactNode;
  className?: string;
};

export function QuestionAnswerHover({
  question,
  children,
  className,
}: QuestionAnswerHoverProps) {
  if (!hasQuestionAnswerPreview(question)) {
    return <div className={className}>{children}</div>;
  }

  const { answers } = getQuestionAnswerPreview(question);
  const renderRich =
    question.type === "EXPLANATION" ||
    question.type === "FLASHCARD" ||
    answers.some((answer) => isProbablyHtml(answer) || looksLikeMarkdown(answer));

  return (
    <HoverCard>
      <HoverCardTrigger
        delay={200}
        closeDelay={100}
        render={<div className={cn("block w-full cursor-default", className)} />}
      >
        {children}
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="start"
        className="w-80 max-w-[calc(100vw-2rem)] p-4"
      >
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Answer
          </p>
          <ul className="space-y-1.5">
            {answers.map((answer) => (
              <li
                key={answer}
                className={cn(
                  "leading-relaxed",
                  !renderRich && "whitespace-pre-wrap",
                )}
              >
                {renderRich ? (
                  <RichTextContent html={coerceAnswerToRichHtml(answer)} />
                ) : (
                  <>
                    {answers.length > 1 ? (
                      <span className="mr-1.5 text-muted-foreground">•</span>
                    ) : null}
                    {answer}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
