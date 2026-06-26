import type { ReactNode } from "react";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getSearchTerms(query: string): string[] {
  return [
    ...new Set(
      query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    ),
  ];
}

export function highlightSearchMatches(
  text: string,
  query: string,
): ReactNode {
  const terms = getSearchTerms(query);
  if (terms.length === 0) {
    return text;
  }

  const pattern = terms.map(escapeRegExp).join("|");
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (terms.includes(part.toLowerCase())) {
      return (
        <mark
          key={index}
          className="rounded-sm bg-yellow-200 text-foreground dark:bg-yellow-400/35"
        >
          {part}
        </mark>
      );
    }

    return part;
  });
}
