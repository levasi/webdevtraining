export type LogLevel = "log" | "info" | "warn" | "error" | "debug" | "system";

export type ConsoleEntry = {
  id: number;
  level: LogLevel;
  message: string;
  time: number;
};

type ConsoleMethod = "log" | "info" | "warn" | "error" | "debug";

function formatArg(arg: unknown): string {
  if (typeof arg === "string") return arg;
  if (arg instanceof Error) return arg.stack ?? `${arg.name}: ${arg.message}`;
  try {
    return JSON.stringify(arg, null, 2) ?? String(arg);
  } catch {
    return String(arg);
  }
}

function formatArgs(args: unknown[]): string {
  return args.map(formatArg).join(" ");
}

/**
 * Capture console output into a list while `fn` runs.
 * Always restores the original console methods afterwards.
 */
export async function withConsoleCapture<T>(
  onEntry: (entry: Omit<ConsoleEntry, "id">) => void,
  fn: () => Promise<T> | T,
): Promise<T> {
  const methods: ConsoleMethod[] = ["log", "info", "warn", "error", "debug"];
  const originals = Object.fromEntries(
    methods.map((method) => [method, console[method].bind(console)]),
  ) as Record<ConsoleMethod, (...args: unknown[]) => void>;

  for (const method of methods) {
    console[method] = (...args: unknown[]) => {
      originals[method](...args);
      onEntry({
        level: method,
        message: formatArgs(args),
        time: Date.now(),
      });
    };
  }

  try {
    return await fn();
  } finally {
    for (const method of methods) {
      console[method] = originals[method] as typeof console.log;
    }
  }
}
