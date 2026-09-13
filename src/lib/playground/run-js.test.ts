import { describe, expect, it } from "vitest";

import { executeJavaScript } from "@/lib/playground/run-js";

describe("executeJavaScript", () => {
  it("runs code without throwing", async () => {
    const result = await executeJavaScript("const x = 1 + 1;");
    expect(result.error).toBeUndefined();
  });

  it("reports runtime errors", async () => {
    const result = await executeJavaScript("throw new Error('boom');");
    expect(result.error).toMatch(/boom/);
  });

  it("supports top-level await", async () => {
    const result = await executeJavaScript(
      "await Promise.resolve(1); const ok = true;",
    );
    expect(result.error).toBeUndefined();
  });
});
