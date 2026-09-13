/**
 * Evaluate freeform JavaScript in the browser (strict mode).
 * Supports top-level `await` via an async function wrapper.
 */
export async function executeJavaScript(
  code: string,
): Promise<{ error?: string }> {
  try {
    // AsyncFunction lets playground scripts use await without an IIFE.
    const AsyncFunction = Object.getPrototypeOf(async function () {})
      .constructor as new (
      ...args: string[]
    ) => (...args: unknown[]) => Promise<unknown>;
    await new AsyncFunction(`"use strict";\n${code}`)();
    return {};
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Runtime error",
    };
  }
}
