import DOMPurify from "isomorphic-dompurify";

const SANITIZE_OPTIONS = {
  ALLOWED_TAGS: [
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
  ],
  ALLOWED_ATTR: ["href", "target", "rel", "colspan", "rowspan"],
};

export function sanitizeRichText(html: string): string {
  return DOMPurify.sanitize(html, SANITIZE_OPTIONS);
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
