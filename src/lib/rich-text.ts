import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "s",
  "code",
  "pre",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "h2",
  "h3",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
];

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ALLOWED_TAGS,
  allowedAttributes: {
    a: ["href", "target", "rel"],
    code: ["class"],
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
  },
};

marked.setOptions({
  gfm: true,
  breaks: true,
});

export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}

export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isProbablyHtml(text: string): boolean {
  return /<\/?(?:p|div|br|ul|ol|li|pre|code|h[1-6]|table|strong|em)\b/i.test(
    text.trim(),
  );
}

/** Detect markdown syntax commonly pasted from docs / ChatGPT. */
export function looksLikeMarkdown(text: string): boolean {
  const normalized = text.replace(/\r\n/g, "\n");
  return (
    /(^|\n)\s*```/.test(normalized) ||
    /(^|\n)\s{0,3}#{1,6}\s+\S/.test(normalized) ||
    /\*\*[^*]+\*\*/.test(normalized) ||
    /__[^_]+__/.test(normalized) ||
    /`[^`\n]+`/.test(normalized) ||
    /(^|\n)\s*[-*+]\s+\S/.test(normalized) ||
    /(^|\n)\s*\d+\.\s+\S/.test(normalized)
  );
}

/** Heuristic: multi-line pasted snippets that look like source code (not markdown). */
export function looksLikeCodeSnippet(text: string): boolean {
  if (looksLikeMarkdown(text)) {
    return false;
  }

  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n");
  if (lines.length < 2) {
    return false;
  }

  const indented = lines.filter((line) => /^\s{2,}|\t/.test(line)).length;
  const codeSignals =
    /[{};=<>]|function\b|const\b|let\b|var\b|class\b|import\b|return\b|=>|console\.|<\/?[a-z]/i.test(
      normalized,
    );

  return indented >= 1 || (codeSignals && lines.length >= 2);
}

export function markdownToRichHtml(text: string): string {
  const html = marked.parse(text, { async: false }) as string;
  return sanitizeRichText(html);
}

/**
 * Convert clipboard plain text into tidy rich-text HTML.
 * Markdown → rendered HTML; code-like pastes → <pre><code>; else paragraphs.
 */
export function plainTextToRichHtml(text: string): string {
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  if (!normalized.trim()) {
    return "<p></p>";
  }

  if (looksLikeMarkdown(normalized)) {
    return markdownToRichHtml(normalized);
  }

  if (looksLikeCodeSnippet(normalized)) {
    const code = escapeHtml(normalized.replace(/\n$/, ""));
    return `<pre><code>${code}</code></pre>`;
  }

  return normalized
    .split(/\n{2,}/)
    .map((paragraph) => {
      const body = escapeHtml(paragraph).replace(/\n/g, "<br />");
      return `<p>${body || "<br />"}</p>`;
    })
    .join("");
}

/** Normalize stored answer content (HTML, markdown, or plain) into rich HTML. */
export function coerceAnswerToRichHtml(content: string): string {
  if (!content.trim()) {
    return "";
  }
  if (isProbablyHtml(content)) {
    return sanitizeRichText(content);
  }
  return plainTextToRichHtml(content);
}

/** Prefer plain-text paste when clipboard HTML is from Word/Docs/IDEs. */
export function shouldPreferPlainTextPaste(html: string): boolean {
  if (!html.trim()) {
    return true;
  }

  if (
    /MsoNormal|xmlns:o=|docs-internal-guid|Apple-converted-space|Slack-copy/i.test(
      html,
    )
  ) {
    return true;
  }

  return (html.match(/<span[\s>]/gi) ?? []).length >= 3;
}

export function getRichTextPlainText(html: string): string {
  return sanitizeRichText(html)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function isRichTextEmpty(html: string): boolean {
  return getRichTextPlainText(html).length === 0;
}
