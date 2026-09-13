import { describe, expect, it } from "vitest";

import { formatJavaScript } from "@/lib/playground/format-js";

describe("formatJavaScript", () => {
  it("formats messy javascript", async () => {
    const formatted = await formatJavaScript(
      "const x=1;function foo(a,b){return a+b}",
    );
    expect(formatted).toContain("const x = 1;");
    expect(formatted).toContain("function foo(a, b)");
  });

  it("throws on invalid syntax", async () => {
    await expect(formatJavaScript("const =")).rejects.toThrow();
  });
});
