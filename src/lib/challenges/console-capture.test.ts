import { describe, expect, it, vi } from "vitest";

import { withConsoleCapture } from "@/lib/challenges/console-capture";

describe("withConsoleCapture", () => {
  it("captures console.timeEnd output", async () => {
    const entries: Array<{ level: string; message: string }> = [];

    await withConsoleCapture(
      (entry) => {
        entries.push({ level: entry.level, message: entry.message });
      },
      () => {
        console.time("work");
        for (let i = 0; i < 1000; i += 1) {
          // burn a little time so duration is measurable
          Math.sqrt(i);
        }
        console.timeEnd("work");
      },
    );

    const timeEntry = entries.find((entry) => entry.level === "time");
    expect(timeEntry).toBeDefined();
    expect(timeEntry?.message).toMatch(/^work: /);
  });

  it("warns when timeEnd has no matching timer", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const entries: Array<{ level: string; message: string }> = [];

    await withConsoleCapture(
      (entry) => {
        entries.push({ level: entry.level, message: entry.message });
      },
      () => {
        console.timeEnd("missing");
      },
    );

    expect(entries.some((entry) => entry.level === "warn")).toBe(true);
    warn.mockRestore();
  });
});
