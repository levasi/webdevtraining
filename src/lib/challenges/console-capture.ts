export type LogLevel =
  | "log"
  | "info"
  | "warn"
  | "error"
  | "debug"
  | "system"
  | "time";

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

function formatDuration(ms: number): string {
  if (ms < 1) return `${(ms * 1000).toFixed(0)} µs`;
  if (ms < 1000) return `${ms.toFixed(3)} ms`;
  return `${(ms / 1000).toFixed(3)} s`;
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

  const originalTime = console.time.bind(console);
  const originalTimeEnd = console.timeEnd.bind(console);
  const originalTimeLog = console.timeLog.bind(console);

  const timers = new Map<string, number>();

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

  console.time = (label = "default") => {
    originalTime(label);
    timers.set(label, performance.now());
  };

  console.timeLog = (label = "default", ...args: unknown[]) => {
    originalTimeLog(label, ...args);
    const started = timers.get(label);
    if (started == null) {
      onEntry({
        level: "warn",
        message: `Timer '${label}' does not exist`,
        time: Date.now(),
      });
      return;
    }
    const elapsed = formatDuration(performance.now() - started);
    const extra = args.length > 0 ? ` ${formatArgs(args)}` : "";
    onEntry({
      level: "time",
      message: `${label}: ${elapsed}${extra}`,
      time: Date.now(),
    });
  };

  console.timeEnd = (label = "default") => {
    originalTimeEnd(label);
    const started = timers.get(label);
    if (started == null) {
      onEntry({
        level: "warn",
        message: `Timer '${label}' does not exist`,
        time: Date.now(),
      });
      return;
    }
    const elapsed = formatDuration(performance.now() - started);
    timers.delete(label);
    onEntry({
      level: "time",
      message: `${label}: ${elapsed}`,
      time: Date.now(),
    });
  };

  try {
    return await fn();
  } finally {
    for (const method of methods) {
      console[method] = originals[method] as typeof console.log;
    }
    console.time = originalTime;
    console.timeEnd = originalTimeEnd;
    console.timeLog = originalTimeLog;
  }
}
