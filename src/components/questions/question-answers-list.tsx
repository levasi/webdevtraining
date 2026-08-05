import {
  getQuestionAnswerPreview,
  hasQuestionAnswerPreview,
} from "@/lib/questions/answer-preview";
import {
  coerceAnswerToRichHtml,
  isProbablyHtml,
  looksLikeMarkdown,
} from "@/lib/rich-text";
import { highlightSearchMatches } from "@/lib/search-highlight";
import { cn, wrapLongTextClass } from "@/lib/utils";
import { RichTextContent } from "@/components/editor/rich-text-content";
import type { QuestionWithAnswers } from "@/types";

type QuestionAnswersListProps = {
  question: QuestionWithAnswers;
  searchQuery?: string;
};

function shouldRenderAsRichText(
  question: QuestionWithAnswers,
  answer: string,
): boolean {
  return (
    question.type === "EXPLANATION" ||
    question.type === "FLASHCARD" ||
    isProbablyHtml(answer) ||
    looksLikeMarkdown(answer)
  );
}

export function QuestionAnswersList({
  question,
  searchQuery = "",
}: QuestionAnswersListProps) {
  if (!hasQuestionAnswerPreview(question)) {
    return (
      <p className="text-sm text-muted-foreground">
        No answer available for this question.
      </p>
    );
  }

  const { answers } = getQuestionAnswerPreview(question);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">
        {answers.length > 1 ? "Answers" : "Answer"}
      </h3>
      <ul className="space-y-2">
        {answers.map((answer) => {
          const rich = shouldRenderAsRichText(question, answer);

          return (
            <li
              key={answer}
              className={cn(
                "rounded-lg border border-border/80 bg-[#faf7f0] px-3 py-2.5 text-sm leading-relaxed text-foreground sm:bg-background sm:px-4 sm:py-3",
                !rich && "whitespace-pre-wrap",
                wrapLongTextClass,
              )}
            >
              {rich ? (
                <RichTextContent html={coerceAnswerToRichHtml(answer)} />
              ) : (
                <>
                  {answers.length > 1 ? (
                    <span className="mr-1.5 text-muted-foreground">•</span>
                  ) : null}
                  {highlightSearchMatches(answer, searchQuery)}
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
