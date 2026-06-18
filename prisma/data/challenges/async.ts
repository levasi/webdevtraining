import type { SeedChallenge } from "../challenge-types";
import {
  PROMISE_ALL_HARNESS,
  PROMISE_RACE_HARNESS,
  PROMISE_ALL_SETTLED_HARNESS,
  PROMISE_ANY_HARNESS,
  TIMER_HARNESS,
} from "./harnesses";

export const asyncChallenges: SeedChallenge[] = [
  {
    id: "seed-challenge-retry-async",
    categorySlug: "javascript",
    title: "Retry Async Function",
    description: "Implement retry(fn, attempts) that retries on rejection. Input is { attempts, succeedOn }.",
    difficulty: "ADVANCED",
    starterCode: `function retry(fn, attempts) {
  // Return thenable that retries up to attempts times.
}

function runRetryTest(input) {
  let callCount = 0;
  const fn = () => ({
    then(onFulfilled, onRejected) {
      callCount++;
      if (callCount >= input.succeedOn) onFulfilled("ok");
      else onRejected("fail");
    },
  });
  let output;
  retry(fn, input.attempts).then((v) => { output = { value: v, callCount }; });
  return output;
}

function solve(input) {
  return runRetryTest(input);
}`,
    solutionCode: `function retry(fn, attempts) {
  return {
    then(onFulfilled, onRejected) {
      let remaining = attempts;
      const attempt = () => {
        fn().then(
          (value) => onFulfilled(value),
          () => {
            remaining -= 1;
            if (remaining <= 0) onRejected("exhausted");
            else attempt();
          },
        );
      };
      attempt();
    },
  };
}

function runRetryTest(input) {
  let callCount = 0;
  const fn = () => ({
    then(onFulfilled, onRejected) {
      callCount++;
      if (callCount >= input.succeedOn) onFulfilled("ok");
      else onRejected("fail");
    },
  });
  let output;
  retry(fn, input.attempts).then((v) => { output = { value: v, callCount }; });
  return output;
}

function solve(input) {
  return runRetryTest(input);
}`,
    testCases: [
      { input: { attempts: 3, succeedOn: 2 }, expectedOutput: { value: "ok", callCount: 2 } },
      { input: { attempts: 1, succeedOn: 1 }, expectedOutput: { value: "ok", callCount: 1 } },
      { input: { attempts: 4, succeedOn: 3 }, expectedOutput: { value: "ok", callCount: 3 } },
    ],
    hints: ["Wrap fn in a thenable.", "Decrement attempts on each failure."],
  },
  {
    id: "seed-challenge-promise-timeout",
    categorySlug: "javascript",
    title: "Timeout Wrapper for Promises",
    description: "Implement withTimeout(promise, ms). Input is { value, ms, timeout }.",
    difficulty: "ADVANCED",
    starterCode: `function withTimeout(promise, ms) {
  // Return thenable that rejects if ms elapses first.
}

${TIMER_HARNESS}

function runTimeoutTest(input) {
  return runTimerHarness(({ advance }) => {
    const promise = {
      then(onF) {
        globalThis.setTimeout(() => onF(input.value), input.delay);
      },
    };
    let output;
    withTimeout(promise, input.ms).then(
      (v) => { output = { status: "resolved", value: v }; },
      (e) => { output = { status: "rejected", error: e }; },
    );
    advance(input.ms + 1);
    return output;
  });
}

function solve(input) {
  return runTimeoutTest(input);
}`,
    solutionCode: `function withTimeout(promise, ms) {
  return {
    then(onFulfilled, onRejected) {
      let settled = false;
      const settle = (fn, value) => {
        if (settled) return;
        settled = true;
        fn(value);
      };
      promise.then(
        (v) => settle(onFulfilled, v),
        (e) => settle(onRejected, e),
      );
      setTimeout(() => settle(onRejected, "timeout"), ms);
    },
  };
}

${TIMER_HARNESS}

function runTimeoutTest(input) {
  return runTimerHarness(({ advance }) => {
    const promise = {
      then(onF) {
        globalThis.setTimeout(() => onF(input.value), input.delay);
      },
    };
    let output;
    withTimeout(promise, input.ms).then(
      (v) => { output = { status: "resolved", value: v }; },
      (e) => { output = { status: "rejected", error: e }; },
    );
    advance(input.ms + 1);
    return output;
  });
}

function solve(input) {
  return runTimeoutTest(input);
}`,
    testCases: [
      { input: { value: "fast", delay: 50, ms: 100 }, expectedOutput: { status: "resolved", value: "fast" } },
      { input: { value: "slow", delay: 200, ms: 100 }, expectedOutput: { status: "rejected", error: "timeout" } },
      { input: { value: 42, delay: 0, ms: 10 }, expectedOutput: { status: "resolved", value: 42 } },
    ],
    hints: ["Race the promise against a timeout.", "Reject with 'timeout' if timer fires first."],
  },
  {
    id: "seed-challenge-promise-all",
    categorySlug: "javascript",
    title: "Implement Promise.all",
    description: "Implement promiseAll(promises). Input is array of values or { values, rejectAt, error }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function promiseAll(promises) {
  // Return thenable resolving to all values or rejecting on first failure.
}

${PROMISE_ALL_HARNESS}

function solve(input) {
  return runPromiseAllTest(input);
}`,
    solutionCode: `function promiseAll(promises) {
  return {
    then(onFulfilled, onRejected) {
      const list = Array.from(promises);
      if (list.length === 0) { onFulfilled([]); return; }
      const results = new Array(list.length);
      let remaining = list.length;
      let rejected = false;
      list.forEach((promise, index) => {
        const settle = (value) => {
          if (rejected) return;
          results[index] = value;
          remaining -= 1;
          if (remaining === 0) onFulfilled(results);
        };
        const fail = (error) => {
          if (rejected) return;
          rejected = true;
          onRejected(error);
        };
        if (promise && typeof promise.then === "function") promise.then(settle, fail);
        else settle(promise);
      });
    },
  };
}

${PROMISE_ALL_HARNESS}

function solve(input) {
  return runPromiseAllTest(input);
}`,
    testCases: [
      { input: [1, 2, 3], expectedOutput: [1, 2, 3] },
      { input: [], expectedOutput: [] },
      { input: { values: [1, 2, 3], rejectAt: 1, error: "failed" }, expectedOutput: { rejected: true, error: "failed" } },
    ],
    hints: ["Return a thenable with then(onFulfilled, onRejected).", "Track settled count and result order."],
  },
  {
    id: "seed-challenge-promise-race",
    categorySlug: "javascript",
    title: "Implement Promise.race",
    description: "Implement promiseRace(promises). Input is { values, rejectAt, error }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function promiseRace(promises) {
  // Return thenable settling with first settled promise.
}

${PROMISE_RACE_HARNESS}

function solve(input) {
  return runPromiseRaceTest(input);
}`,
    solutionCode: `function promiseRace(promises) {
  return {
    then(onFulfilled, onRejected) {
      let settled = false;
      const settle = (fn, value) => {
        if (settled) return;
        settled = true;
        fn(value);
      };
      Array.from(promises).forEach((p) => {
        if (p && typeof p.then === "function") p.then((v) => settle(onFulfilled, v), (e) => settle(onRejected, e));
        else settle(onFulfilled, p);
      });
    },
  };
}

${PROMISE_RACE_HARNESS}

function solve(input) {
  return runPromiseRaceTest(input);
}`,
    testCases: [
      { input: { values: ["first", "second"], rejectAt: -1, error: "" }, expectedOutput: { fulfilled: true, value: "first" } },
      { input: { values: [1, 2], rejectAt: 0, error: "fail" }, expectedOutput: { fulfilled: false, error: "fail" } },
      { input: { values: [42], rejectAt: -1, error: "" }, expectedOutput: { fulfilled: true, value: 42 } },
    ],
    hints: ["Settle only once.", "Attach then to every input promise."],
  },
  {
    id: "seed-challenge-promise-all-settled",
    categorySlug: "javascript",
    title: "Implement Promise.allSettled",
    description: "Implement promiseAllSettled(promises). Input is { values, rejectAt, error }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function promiseAllSettled(promises) {
  // Return thenable with { status, value/reason } for each.
}

${PROMISE_ALL_SETTLED_HARNESS}

function solve(input) {
  return runPromiseAllSettledTest(input);
}`,
    solutionCode: `function promiseAllSettled(promises) {
  return {
    then(onFulfilled) {
      const list = Array.from(promises);
      if (list.length === 0) { onFulfilled([]); return; }
      const results = new Array(list.length);
      let remaining = list.length;
      list.forEach((p, i) => {
        const done = (result) => {
          results[i] = result;
          remaining -= 1;
          if (remaining === 0) onFulfilled(results);
        };
        if (p && typeof p.then === "function") {
          p.then((v) => done({ status: "fulfilled", value: v }), (e) => done({ status: "rejected", reason: e }));
        } else {
          done({ status: "fulfilled", value: p });
        }
      });
    },
  };
}

${PROMISE_ALL_SETTLED_HARNESS}

function solve(input) {
  return runPromiseAllSettledTest(input);
}`,
    testCases: [
      {
        input: { values: [1, 2], rejectAt: -1, error: "" },
        expectedOutput: [{ status: "fulfilled", value: 1 }, { status: "fulfilled", value: 2 }],
      },
      {
        input: { values: [1, 2, 3], rejectAt: 1, error: "err" },
        expectedOutput: [
          { status: "fulfilled", value: 1 },
          { status: "rejected", reason: "err" },
          { status: "fulfilled", value: 3 },
        ],
      },
      { input: { values: [], rejectAt: -1, error: "" }, expectedOutput: [] },
    ],
    hints: ["Never reject the outer promise.", "Collect fulfilled and rejected results."],
  },
  {
    id: "seed-challenge-promise-any",
    categorySlug: "javascript",
    title: "Implement Promise.any",
    description: "Implement promiseAny(promises). Input is { values, rejectAt }.",
    difficulty: "ADVANCED",
    starterCode: `function promiseAny(promises) {
  // Return thenable resolving with first fulfilled or AggregateError.
}

${PROMISE_ANY_HARNESS}

function solve(input) {
  return runPromiseAnyTest(input);
}`,
    solutionCode: `function promiseAny(promises) {
  return {
    then(onFulfilled, onRejected) {
      const list = Array.from(promises);
      if (list.length === 0) { onRejected([]); return; }
      let settled = false;
      let rejections = 0;
      const errors = [];
      const settle = (fn, value) => {
        if (settled) return;
        settled = true;
        fn(value);
      };
      list.forEach((p, i) => {
        if (p && typeof p.then === "function") {
          p.then(
            (v) => settle(onFulfilled, v),
            (e) => {
              errors[i] = e;
              rejections += 1;
              if (rejections === list.length) onRejected(errors);
            },
          );
        } else {
          settle(onFulfilled, p);
        }
      });
    },
  };
}

${PROMISE_ANY_HARNESS}

function solve(input) {
  return runPromiseAnyTest(input);
}`,
    testCases: [
      { input: { values: ["a", "b"], rejectAt: [] }, expectedOutput: { fulfilled: true, value: "a" } },
      { input: { values: [1, 2], rejectAt: [0] }, expectedOutput: { fulfilled: true, value: 2 } },
      { input: { values: [1], rejectAt: [0] }, expectedOutput: { fulfilled: false, error: ["fail"] } },
    ],
    hints: ["Resolve on first fulfillment.", "Reject only when all promises reject."],
  },
  {
    id: "seed-challenge-run-sequential",
    categorySlug: "javascript",
    title: "Run Promises Sequentially",
    description: "Run tasks in order. Input is array of values to resolve in sequence.",
    difficulty: "INTERMEDIATE",
    starterCode: `function runSequential(tasks) {
  // Return thenable resolving to ordered results.
}

function runSequentialTest(values) {
  const tasks = values.map((v) => ({ then(onF) { onF(v); } }));
  let output;
  runSequential(tasks).then((r) => { output = r; });
  return output;
}

function solve(input) {
  return runSequentialTest(input);
}`,
    solutionCode: `function runSequential(tasks) {
  return {
    then(onFulfilled) {
      const results = [];
      let index = 0;
      const next = () => {
        if (index >= tasks.length) { onFulfilled(results); return; }
        const task = tasks[index++];
        task.then((value) => { results.push(value); next(); });
      };
      next();
    },
  };
}

function runSequentialTest(values) {
  const tasks = values.map((v) => ({ then(onF) { onF(v); } }));
  let output;
  runSequential(tasks).then((r) => { output = r; });
  return output;
}

function solve(input) {
  return runSequentialTest(input);
}`,
    testCases: [
      { input: [1, 2, 3], expectedOutput: [1, 2, 3] },
      { input: ["a"], expectedOutput: ["a"] },
      { input: [], expectedOutput: [] },
    ],
    hints: ["Chain tasks one after another.", "Push each result before starting the next."],
  },
  {
    id: "seed-challenge-parallel-limit",
    categorySlug: "javascript",
    title: "Parallel Limit",
    description: "Run promises with concurrency limit. Input is { values, limit }.",
    difficulty: "ADVANCED",
    starterCode: `function parallelLimit(tasks, limit) {
  // Return thenable with all results in order.
}

function runParallelLimitTest(input) {
  const tasks = input.values.map((v) => ({ then(onF) { onF(v); } }));
  let output;
  parallelLimit(tasks, input.limit).then((r) => { output = r; });
  return output;
}

function solve(input) {
  return runParallelLimitTest(input);
}`,
    solutionCode: `function parallelLimit(tasks, limit) {
  return {
    then(onFulfilled) {
      const results = new Array(tasks.length);
      let nextIndex = 0;
      let running = 0;
      let completed = 0;
      const runNext = () => {
        while (running < limit && nextIndex < tasks.length) {
          const i = nextIndex++;
          running += 1;
          tasks[i].then((value) => {
            results[i] = value;
            running -= 1;
            completed += 1;
            if (completed === tasks.length) onFulfilled(results);
            else runNext();
          });
        }
      };
      if (tasks.length === 0) onFulfilled([]);
      else runNext();
    },
  };
}

function runParallelLimitTest(input) {
  const tasks = input.values.map((v) => ({ then(onF) { onF(v); } }));
  let output;
  parallelLimit(tasks, input.limit).then((r) => { output = r; });
  return output;
}

function solve(input) {
  return runParallelLimitTest(input);
}`,
    testCases: [
      { input: { values: [1, 2, 3], limit: 2 }, expectedOutput: [1, 2, 3] },
      { input: { values: [5], limit: 1 }, expectedOutput: [5] },
      { input: { values: [], limit: 3 }, expectedOutput: [] },
    ],
    hints: ["Track running and completed counts.", "Start new tasks when below the limit."],
  },
  {
    id: "seed-challenge-sleep",
    categorySlug: "javascript",
    title: "Sleep / Delay",
    description: "Implement sleep(ms) returning a thenable. Input is { ms }.",
    difficulty: "BEGINNER",
    starterCode: `function sleep(ms) {
  // Return thenable that resolves after ms.
}

${TIMER_HARNESS}

function solve(input) {
  return runTimerHarness(({ advance }) => {
    let resolvedAt = null;
    sleep(input.ms).then(() => { resolvedAt = "done"; });
    advance(input.ms);
    return { resolvedAt, ms: input.ms };
  });
}`,
    solutionCode: `function sleep(ms) {
  return {
    then(onFulfilled) {
      setTimeout(() => onFulfilled(undefined), ms);
    },
  };
}

${TIMER_HARNESS}

function solve(input) {
  return runTimerHarness(({ advance }) => {
    let resolvedAt = null;
    sleep(input.ms).then(() => { resolvedAt = "done"; });
    advance(input.ms);
    return { resolvedAt, ms: input.ms };
  });
}`,
    testCases: [
      { input: { ms: 100 }, expectedOutput: { resolvedAt: "done", ms: 100 } },
      { input: { ms: 50 }, expectedOutput: { resolvedAt: "done", ms: 50 } },
      { input: { ms: 0 }, expectedOutput: { resolvedAt: "done", ms: 0 } },
    ],
    hints: ["Return a thenable.", "Use setTimeout to delay resolution."],
  },
  {
    id: "seed-challenge-async-queue",
    categorySlug: "javascript",
    title: "Async Queue",
    description: "Process tasks FIFO. Input is { tasks } array of values.",
    difficulty: "ADVANCED",
    starterCode: `function createQueue() {
  // Return { enqueue(task), drain() } where drain returns thenable of results.
}

function runQueueTest(input) {
  const queue = createQueue();
  for (const v of input.tasks) {
    queue.enqueue({ then(onF) { onF(v); } });
  }
  let output;
  queue.drain().then((r) => { output = r; });
  return output;
}

function solve(input) {
  return runQueueTest(input);
}`,
    solutionCode: `function createQueue() {
  const items = [];
  return {
    enqueue(task) { items.push(task); },
    drain() {
      return {
        then(onFulfilled) {
          const results = [];
          let index = 0;
          const next = () => {
            if (index >= items.length) { onFulfilled(results); return; }
            items[index++].then((v) => { results.push(v); next(); });
          };
          next();
        },
      };
    },
  };
}

function runQueueTest(input) {
  const queue = createQueue();
  for (const v of input.tasks) {
    queue.enqueue({ then(onF) { onF(v); } });
  }
  let output;
  queue.drain().then((r) => { output = r; });
  return output;
}

function solve(input) {
  return runQueueTest(input);
}`,
    testCases: [
      { input: { tasks: [1, 2, 3] }, expectedOutput: [1, 2, 3] },
      { input: { tasks: ["a"] }, expectedOutput: ["a"] },
      { input: { tasks: [] }, expectedOutput: [] },
    ],
    hints: ["Store tasks in a FIFO array.", "Process sequentially in drain()."],
  },
  {
    id: "seed-challenge-cancelable-promise",
    categorySlug: "javascript",
    title: "Cancelable Promise",
    description: "Create cancelable promise. Input is { cancel: boolean }.",
    difficulty: "ADVANCED",
    starterCode: `function makeCancelable(executor) {
  // Return { promise, cancel }.
}

function runCancelableTest(input) {
  let output;
  const { promise, cancel } = makeCancelable((resolve) => {
    setTimeout(() => resolve("done"), 100);
  });
  promise.then(
    (v) => { output = { status: "resolved", value: v }; },
    (e) => { output = { status: "rejected", error: e }; },
  );
  if (input.cancel) cancel();
  return output ?? { status: "pending" };
}

function solve(input) {
  return runCancelableTest(input);
}`,
    solutionCode: `function makeCancelable(executor) {
  let onFulfilled;
  let onRejected;
  let canceled = false;
  const promise = {
    then(onF, onR) {
      onFulfilled = onF;
      onRejected = onR;
      executor(
        (value) => { if (!canceled) onFulfilled(value); },
        (error) => { if (!canceled) onRejected(error); },
      );
    },
  };
  return {
    promise,
    cancel: () => {
      canceled = true;
      onRejected("canceled");
    },
  };
}

function runCancelableTest(input) {
  let output;
  const { promise, cancel } = makeCancelable((resolve) => {
    if (!input.cancel) resolve("done");
  });
  promise.then(
    (v) => { output = { status: "resolved", value: v }; },
    (e) => { output = { status: "rejected", error: e }; },
  );
  if (input.cancel) cancel();
  return output;
}

function solve(input) {
  return runCancelableTest(input);
}`,
    testCases: [
      { input: { cancel: false }, expectedOutput: { status: "resolved", value: "done" } },
      { input: { cancel: true }, expectedOutput: { status: "rejected", error: "canceled" } },
      { input: { cancel: false }, expectedOutput: { status: "resolved", value: "done" } },
    ],
    hints: ["Expose a cancel function.", "Reject with 'canceled' when cancelled."],
  },
  {
    id: "seed-challenge-poll-until",
    categorySlug: "javascript",
    title: "Poll Until Condition",
    description: "Poll fetcher until predicate passes. Input is { values, predicate }.",
    difficulty: "ADVANCED",
    starterCode: `function pollUntil(fetcher, predicate) {
  // Return thenable with first value matching predicate.
}

function runPollTest(input) {
  let i = 0;
  const fetcher = () => ({
    then(onF) { onF(input.values[i++]); },
  });
  let output;
  pollUntil(fetcher, (v) => v >= input.predicate).then((v) => { output = v; });
  return output;
}

function solve(input) {
  return runPollTest(input);
}`,
    solutionCode: `function pollUntil(fetcher, predicate) {
  return {
    then(onFulfilled) {
      const attempt = () => {
        fetcher().then((value) => {
          if (predicate(value)) onFulfilled(value);
          else attempt();
        });
      };
      attempt();
    },
  };
}

function runPollTest(input) {
  let i = 0;
  const fetcher = () => ({
    then(onF) { onF(input.values[i++]); },
  });
  let output;
  pollUntil(fetcher, (v) => v >= input.predicate).then((v) => { output = v; });
  return output;
}

function solve(input) {
  return runPollTest(input);
}`,
    testCases: [
      { input: { values: [1, 2, 5], predicate: 5 }, expectedOutput: 5 },
      { input: { values: [10], predicate: 10 }, expectedOutput: 10 },
      { input: { values: [1, 3, 7], predicate: 3 }, expectedOutput: 3 },
    ],
    hints: ["Call fetcher repeatedly.", "Stop when predicate returns true."],
  },
];
