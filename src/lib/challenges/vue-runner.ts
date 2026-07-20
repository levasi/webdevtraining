import type { LoadedModule } from "@/lib/challenges/load-challenge-module";
import { vueSfcSuites } from "@/lib/challenges/vue-browser-suites";

export type SuiteCaseResult = {
  name: string;
  passed: boolean;
  error?: string;
};

export type SuiteResult = {
  passed: number;
  failed: number;
  cases: SuiteCaseResult[];
};

type AssertFn = (condition: unknown, message?: string) => void;
type Suite = (
  mod: LoadedModule,
  assert: AssertFn,
) => Promise<SuiteCaseResult[]> | SuiteCaseResult[];

function assert(
  condition: unknown,
  message = "Assertion failed",
): asserts condition {
  if (!condition) throw new Error(message);
}

function assertEqual<T>(actual: T, expected: T, message?: string) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a !== e) {
    throw new Error(message ?? `Expected ${e}, got ${a}`);
  }
}

async function runCase(
  name: string,
  fn: () => void | Promise<void>,
): Promise<SuiteCaseResult> {
  try {
    await fn();
    return { name, passed: true };
  } catch (err) {
    return {
      name,
      passed: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

const composableSuites: Record<string, Suite> = {
  "vue-05-composable": async (mod) => {
    const useToggle = mod.useToggle as (initial?: boolean) => {
      value: { value: boolean };
      toggle: () => void;
      setTrue: () => void;
      setFalse: () => void;
    };

    return [
      await runCase("initial value", () => {
        assertEqual(useToggle().value.value, false);
        assertEqual(useToggle(true).value.value, true);
      }),
      await runCase("toggle", () => {
        const { value, toggle } = useToggle(false);
        toggle();
        assertEqual(value.value, true);
        toggle();
        assertEqual(value.value, false);
      }),
      await runCase("setTrue / setFalse", () => {
        const { value, setTrue, setFalse } = useToggle();
        setTrue();
        assertEqual(value.value, true);
        setFalse();
        assertEqual(value.value, false);
      }),
    ];
  },

  "vue-19-local-storage": async (mod) => {
    const useLocalStorage = mod.useLocalStorage as <T>(
      key: string,
      initial: T,
    ) => { value: { value: T }; clear: () => void };

    localStorage.clear();

    return [
      await runCase("initial when empty", () => {
        const { value } = useLocalStorage("bl-count", 0);
        assertEqual(value.value, 0);
      }),
      await runCase("reads existing", () => {
        localStorage.setItem("bl-user", JSON.stringify({ name: "Ada" }));
        const { value } = useLocalStorage("bl-user", { name: "" });
        assertEqual(value.value, { name: "Ada" });
      }),
      await runCase("writes on change", () => {
        const { value } = useLocalStorage("bl-n", 1);
        value.value = 5;
        assertEqual(JSON.parse(localStorage.getItem("bl-n")!), 5);
      }),
      await runCase("clear", () => {
        const { value, clear } = useLocalStorage("bl-clear", 1);
        value.value = 9;
        clear();
        assertEqual(localStorage.getItem("bl-clear"), null);
        assertEqual(value.value, 1);
      }),
    ];
  },
};

const suites: Record<string, Suite> = {
  ...composableSuites,
  ...vueSfcSuites,
};

export function hasVueBrowserTests(suiteId: string): boolean {
  return suiteId in suites;
}

export async function runVueBrowserTests(
  suiteId: string,
  mod: LoadedModule,
): Promise<SuiteResult> {
  const suite = suites[suiteId];
  if (!suite) {
    return { passed: 0, failed: 0, cases: [] };
  }
  const cases = await suite(mod, assert);
  const passed = cases.filter((c) => c.passed).length;
  const failed = cases.length - passed;
  return { passed, failed, cases };
}
