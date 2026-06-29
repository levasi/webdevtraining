import { describe, expect, it } from "vitest";

import {
  getRichTextPlainText,
  isRichTextEmpty,
  sanitizeRichText,
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
});
