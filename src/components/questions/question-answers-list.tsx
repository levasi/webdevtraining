import {
  getQuestionAnswerPreview,
  hasQuestionAnswerPreview,
} from "@/lib/questions/answer-preview";
import { highlightSearchMatches } from "@/lib/search-highlight";
import type { QuestionWithAnswers } from "@/types";

type QuestionAnswersListProps = {
  question: QuestionWithAnswers;
  searchQuery?: string;
};

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

  const { answers, explanation } = getQuestionAnswerPreview(question);
  const showExplanation =
    Boolean(explanation) &&
    !answers.some((answer) => answer === explanation);

  return (
    <div className="space-y-4">
      {answers.length > 0 ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">
            {answers.length > 1 ? "Answers" : "Answer"}
          </h3>
          <ul className="space-y-2">
            {answers.map((answer) => (
              <li
                key={answer}
                className="rounded-lg border bg-muted/30 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
              >
                {answers.length > 1 ? (
                  <span className="mr-1.5 text-muted-foreground">•</span>
                ) : null}
                {highlightSearchMatches(answer, searchQuery)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {showExplanation ? (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">
            {answers.length > 0 ? "Explanation" : "Answer"}
          </h3>
          <p className="rounded-lg border bg-muted/30 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap text-muted-foreground">
            {highlightSearchMatches(explanation ?? "", searchQuery)}
          </p>
        </div>
      ) : null}
    </div>
  );
}
