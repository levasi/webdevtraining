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
    th: ["colspan", "rowspan"],
    td: ["colspan", "rowspan"],
  },
};

export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, SANITIZE_OPTIONS);
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
