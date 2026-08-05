import { describe, expect, it } from "vitest";

import {
  coerceAnswerToRichHtml,
  getRichTextPlainText,
  isRichTextEmpty,
  looksLikeCodeSnippet,
  looksLikeMarkdown,
  plainTextToRichHtml,
  sanitizeRichText,
  shouldPreferPlainTextPaste,
} from "@/lib/rich-text";

describe("rich-text helpers", () => {
  it("sanitizes unsafe markup", () => {
    const html = sanitizeRichText(
      '<p>Hello</p><script>alert("x")</script><img src=x onerror=alert(1) />',
    );

    expect(html).toContain("Hello");
    expect(html).not.toContain("script");
    expect(html).not.toContain("img");
  });

  it("preserves safe table markup", () => {
    const html = sanitizeRichText(
      "<table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>2</td></tr></tbody></table>",
    );

    expect(html).toContain("<table");
    expect(html).toContain("<th");
    expect(html).toContain("<td");
    expect(html).toContain("A");
  });

  it("detects empty rich text", () => {
    expect(isRichTextEmpty("<p></p>")).toBe(true);
    expect(isRichTextEmpty("<p><br></p>")).toBe(true);
    expect(isRichTextEmpty("<p>Answer</p>")).toBe(false);
  });

  it("extracts plain text from html", () => {
    expect(getRichTextPlainText("<p>One</p><ul><li>Two</li></ul>")).toContain(
      "One",
    );
    expect(getRichTextPlainText("<p>One</p><ul><li>Two</li></ul>")).toContain(
      "Two",
    );
  });

  it("converts prose paste into paragraphs with hard breaks", () => {
    const html = plainTextToRichHtml("Hello\nworld\n\nNext para");
    expect(html).toContain("<p>Hello<br />world</p>");
    expect(html).toContain("<p>Next para</p>");
  });

  it("converts code-like paste into a pre/code block", () => {
    const snippet = "function example() {\n  return 1;\n}";
    expect(looksLikeCodeSnippet(snippet)).toBe(true);
    const html = plainTextToRichHtml(snippet);
    expect(html).toContain("<pre><code>");
    expect(html).toContain("function example()");
    expect(html).toContain("  return 1;");
  });

  it("converts markdown paste into rich HTML", () => {
    const markdown = [
      "**`var`**",
      "",
      "- Function scoped",
      "",
      "```javascript",
      "var x = 1;",
      "```",
    ].join("\n");

    expect(looksLikeMarkdown(markdown)).toBe(true);
    expect(looksLikeCodeSnippet(markdown)).toBe(false);

    const html = plainTextToRichHtml(markdown);
    expect(html).toContain("<strong>");
    expect(html).toContain("<code>");
    expect(html).toContain("<li>");
    expect(html).toContain("<pre>");
    expect(html).not.toContain("```");
    expect(html).not.toContain("**");
  });

  it("coerces stored markdown answers into rich HTML", () => {
    const html = coerceAnswerToRichHtml("Use `const` for **immutable** bindings.");
    expect(html).toContain("<code>const</code>");
    expect(html).toContain("<strong>immutable</strong>");
  });

  it("prefers plain text for Word-like clipboard HTML", () => {
    expect(shouldPreferPlainTextPaste('<p class="MsoNormal">Hi</p>')).toBe(
      true,
    );
    expect(shouldPreferPlainTextPaste("<p>Hi</p>")).toBe(false);
  });
});
