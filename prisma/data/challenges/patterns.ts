import type { SeedChallenge } from "../challenge-types";
import { EVENT_EMITTER_HARNESS, TIMER_HARNESS } from "./harnesses";

export const patternChallenges: SeedChallenge[] = [
  {
    id: "seed-challenge-event-emitter",
    categorySlug: "javascript",
    title: "Implement EventEmitter",
    description:
      "Implement EventEmitter with on, off, emit. Input is { actions }. Return event log.",
    difficulty: "INTERMEDIATE",
    starterCode: `class EventEmitter {
  on(event, listener) {}
  off(event, listener) {}
  emit(event, ...args) {}
}

${EVENT_EMITTER_HARNESS}

function solve(input) {
  return runEventEmitterTest(input);
}`,
    solutionCode: `class EventEmitter {
  constructor() { this.events = {}; }
  on(event, listener) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
    return this;
  }
  off(event, listener) {
    if (!this.events[event]) return this;
    this.events[event] = this.events[event].filter((fn) => fn !== listener);
    return this;
  }
  emit(event, ...args) {
    const listeners = this.events[event];
    if (!listeners || listeners.length === 0) return false;
    listeners.forEach((listener) => listener(...args));
    return true;
  }
}

${EVENT_EMITTER_HARNESS}

function solve(input) {
  return runEventEmitterTest(input);
}`,
    testCases: [
      {
        input: { actions: [{ type: "on", id: "a", event: "data" }, { type: "emit", event: "data", args: [42] }] },
        expectedOutput: [{ event: "data", args: [42] }, { emitted: "data", success: true }],
      },
      {
        input: {
          actions: [
            { type: "on", id: "a", event: "msg" },
            { type: "on", id: "b", event: "msg" },
            { type: "emit", event: "msg", args: ["hi"] },
          ],
        },
        expectedOutput: [
          { event: "msg", args: ["hi"] },
          { event: "msg", args: ["hi"] },
          { emitted: "msg", success: true },
        ],
      },
      {
        input: {
          actions: [
            { type: "on", id: "a", event: "x" },
            { type: "off", id: "a", event: "x" },
            { type: "emit", event: "x", args: [1] },
          ],
        },
        expectedOutput: [{ emitted: "x", success: false }],
      },
    ],
    hints: ["Store listeners keyed by event.", "emit returns false when no listeners exist."],
  },
  {
    id: "seed-challenge-pub-sub",
    categorySlug: "javascript",
    title: "Implement Pub/Sub",
    description: "Implement PubSub with subscribe, unsubscribe, publish. Input is { actions }.",
    difficulty: "INTERMEDIATE",
    starterCode: `class PubSub {
  subscribe(topic, handler) {}
  unsubscribe(topic, handler) {}
  publish(topic, data) {}
}

function runPubSubTest(input) {
  const bus = new PubSub();
  const log = [];
  const handlers = new Map();
  for (const action of input.actions) {
    if (action.type === "subscribe") {
      const handler = (data) => log.push({ topic: action.topic, data });
      handlers.set(action.id, handler);
      bus.subscribe(action.topic, handler);
    } else if (action.type === "unsubscribe") {
      bus.unsubscribe(action.topic, handlers.get(action.id));
    } else if (action.type === "publish") {
      bus.publish(action.topic, action.data);
    }
  }
  return log;
}

function solve(input) {
  return runPubSubTest(input);
}`,
    solutionCode: `class PubSub {
  constructor() { this.topics = {}; }
  subscribe(topic, handler) {
    if (!this.topics[topic]) this.topics[topic] = [];
    this.topics[topic].push(handler);
  }
  unsubscribe(topic, handler) {
    if (!this.topics[topic]) return;
    this.topics[topic] = this.topics[topic].filter((h) => h !== handler);
  }
  publish(topic, data) {
    (this.topics[topic] || []).forEach((h) => h(data));
  }
}

function runPubSubTest(input) {
  const bus = new PubSub();
  const log = [];
  const handlers = new Map();
  for (const action of input.actions) {
    if (action.type === "subscribe") {
      const handler = (data) => log.push({ topic: action.topic, data });
      handlers.set(action.id, handler);
      bus.subscribe(action.topic, handler);
    } else if (action.type === "unsubscribe") {
      bus.unsubscribe(action.topic, handlers.get(action.id));
    } else if (action.type === "publish") {
      bus.publish(action.topic, action.data);
    }
  }
  return log;
}

function solve(input) {
  return runPubSubTest(input);
}`,
    testCases: [
      {
        input: {
          actions: [
            { type: "subscribe", id: "a", topic: "news" },
            { type: "publish", topic: "news", data: 1 },
          ],
        },
        expectedOutput: [{ topic: "news", data: 1 }],
      },
      {
        input: {
          actions: [
            { type: "subscribe", id: "a", topic: "x" },
            { type: "subscribe", id: "b", topic: "x" },
            { type: "publish", topic: "x", data: "hi" },
          ],
        },
        expectedOutput: [{ topic: "x", data: "hi" }, { topic: "x", data: "hi" }],
      },
      {
        input: {
          actions: [
            { type: "subscribe", id: "a", topic: "y" },
            { type: "unsubscribe", id: "a", topic: "y" },
            { type: "publish", topic: "y", data: 2 },
          ],
        },
        expectedOutput: [],
      },
    ],
    hints: ["Map topics to handler arrays.", "publish calls all subscribers for a topic."],
  },
  {
    id: "seed-challenge-observable",
    categorySlug: "javascript",
    title: "Implement Simple Observable",
    description: "Create observable from values. Input is { values }.",
    difficulty: "ADVANCED",
    starterCode: `function createObservable(subscribe) {
  // Return { subscribe(observer) }.
}

function solve(input) {
  const results = [];
  const obs = createObservable((observer) => {
    for (const v of input.values) observer.next(v);
    observer.complete();
  });
  obs.subscribe({
    next: (v) => results.push(v),
    complete: () => results.push("done"),
  });
  return results;
}`,
    solutionCode: `function createObservable(subscribe) {
  return {
    subscribe(observer) {
      subscribe(observer);
    },
  };
}

function solve(input) {
  const results = [];
  const obs = createObservable((observer) => {
    for (const v of input.values) observer.next(v);
    observer.complete();
  });
  obs.subscribe({
    next: (v) => results.push(v),
    complete: () => results.push("done"),
  });
  return results;
}`,
    testCases: [
      { input: { values: [1, 2, 3] }, expectedOutput: [1, 2, 3, "done"] },
      { input: { values: [] }, expectedOutput: ["done"] },
      { input: { values: ["a"] }, expectedOutput: ["a", "done"] },
    ],
    hints: ["subscribe receives an observer with next/complete.", "Call observer methods when emitting."],
  },
  {
    id: "seed-challenge-custom-iterator",
    categorySlug: "javascript",
    title: "Implement Custom Iterator",
    description: "Create a range iterable from start to end inclusive. Input is { from, to }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function createRange(from, to) {
  // Return iterable with Symbol.iterator.
}

function solve(input) {
  return [...createRange(input.from, input.to)];
}`,
    solutionCode: `function createRange(from, to) {
  return {
    [Symbol.iterator]() {
      let current = from;
      const end = to;
      return {
        next() {
          if (current <= end) return { value: current++, done: false };
          return { done: true };
        },
      };
    },
  };
}

function solve(input) {
  return [...createRange(input.from, input.to)];
}`,
    testCases: [
      { input: { from: 1, to: 3 }, expectedOutput: [1, 2, 3] },
      { input: { from: 5, to: 5 }, expectedOutput: [5] },
      { input: { from: 0, to: 2 }, expectedOutput: [0, 1, 2] },
    ],
    hints: ["Implement Symbol.iterator.", "Return { value, done } from next()."],
  },
  {
    id: "seed-challenge-generator-counter",
    categorySlug: "javascript",
    title: "Generator-Based Counter",
    description: "Create a generator yielding integers from start to end. Input is { start, end }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function* counter(start, end) {
  // yield integers from start to end inclusive
}

function solve(input) {
  return [...counter(input.start, input.end)];
}`,
    solutionCode: `function* counter(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function solve(input) {
  return [...counter(input.start, input.end)];
}`,
    testCases: [
      { input: { start: 1, end: 3 }, expectedOutput: [1, 2, 3] },
      { input: { start: 0, end: 0 }, expectedOutput: [0] },
      { input: { start: 5, end: 7 }, expectedOutput: [5, 6, 7] },
    ],
    hints: ["Use function* syntax.", "yield each integer in the range."],
  },
  {
    id: "seed-challenge-custom-set-interval",
    categorySlug: "javascript",
    title: "Custom setInterval",
    description: "Implement customSetInterval(fn, delay, times). Input is { delay, times }.",
    difficulty: "ADVANCED",
    starterCode: `function customSetInterval(fn, delay, times) {
  // Invoke fn up to times every delay ms. Return call count log.
}

${TIMER_HARNESS}

function solve(input) {
  return runTimerHarness(({ advance }) => {
    const log = [];
    customSetInterval(() => log.push("tick"), input.delay, input.times);
    advance(input.delay * input.times);
    return log;
  });
}`,
    solutionCode: `function customSetInterval(fn, delay, times) {
  let count = 0;
  const run = () => {
    fn();
    count += 1;
    if (count < times) setTimeout(run, delay);
  };
  setTimeout(run, delay);
}

${TIMER_HARNESS}

function solve(input) {
  return runTimerHarness(({ advance }) => {
    const log = [];
    customSetInterval(() => log.push("tick"), input.delay, input.times);
    advance(input.delay * input.times);
    return log;
  });
}`,
    testCases: [
      { input: { delay: 100, times: 3 }, expectedOutput: ["tick", "tick", "tick"] },
      { input: { delay: 50, times: 2 }, expectedOutput: ["tick", "tick"] },
      { input: { delay: 10, times: 1 }, expectedOutput: ["tick"] },
    ],
    hints: ["Use recursive setTimeout.", "Stop after times invocations."],
  },
  {
    id: "seed-challenge-custom-set-timeout",
    categorySlug: "javascript",
    title: "Custom setTimeout Behavior",
    description: "Implement delay(fn, ms) and return execution timestamp. Input is { ms }.",
    difficulty: "BEGINNER",
    starterCode: `function delay(fn, ms) {
  // Schedule fn after ms.
}

${TIMER_HARNESS}

function solve(input) {
  return runTimerHarness(({ advance }) => {
    let ranAt = null;
    let now = 0;
    const originalSetTimeout = globalThis.setTimeout;
    globalThis.setTimeout = (cb, ms) => originalSetTimeout.call(globalThis, () => { ranAt = now + ms; cb(); }, ms);
    delay(() => {}, input.ms);
    advance(input.ms);
    globalThis.setTimeout = originalSetTimeout;
    return { ranAt, ms: input.ms };
  });
}`,
    solutionCode: `function delay(fn, ms) {
  setTimeout(fn, ms);
}

${TIMER_HARNESS}

function solve(input) {
  return runTimerHarness(({ advance }) => {
    let ran = false;
    delay(() => { ran = true; }, input.ms);
    advance(input.ms);
    return { ran, ms: input.ms };
  });
}`,
    testCases: [
      { input: { ms: 100 }, expectedOutput: { ran: true, ms: 100 } },
      { input: { ms: 50 }, expectedOutput: { ran: true, ms: 50 } },
      { input: { ms: 0 }, expectedOutput: { ran: true, ms: 0 } },
    ],
    hints: ["Wrap setTimeout.", "Advance fake timers to verify execution."],
  },
  {
    id: "seed-challenge-task-scheduler",
    categorySlug: "javascript",
    title: "Task Scheduler",
    description: "Schedule tasks by delay. Input is { tasks: [{ id, delay }] }.",
    difficulty: "ADVANCED",
    starterCode: `function scheduleTasks(tasks) {
  // Return array of ids in execution order.
}

${TIMER_HARNESS}

function solve(input) {
  return runTimerHarness(({ advance }) => {
    const order = [];
    scheduleTasks(input.tasks, (id) => order.push(id));
    const maxDelay = Math.max(...input.tasks.map((t) => t.delay), 0);
    advance(maxDelay + 1);
    return order;
  });
}`,
    solutionCode: `function scheduleTasks(tasks, run) {
  for (const task of tasks) {
    setTimeout(() => run(task.id), task.delay);
  }
}

${TIMER_HARNESS}

function solve(input) {
  return runTimerHarness(({ advance }) => {
    const order = [];
    scheduleTasks(input.tasks, (id) => order.push(id));
    const maxDelay = Math.max(...input.tasks.map((t) => t.delay), 0);
    advance(maxDelay + 1);
    return order;
  });
}`,
    testCases: [
      {
        input: { tasks: [{ id: "b", delay: 100 }, { id: "a", delay: 50 }] },
        expectedOutput: ["a", "b"],
      },
      {
        input: { tasks: [{ id: "x", delay: 0 }, { id: "y", delay: 0 }] },
        expectedOutput: ["x", "y"],
      },
      { input: { tasks: [{ id: "only", delay: 10 }] }, expectedOutput: ["only"] },
    ],
    hints: ["setTimeout each task by its delay.", "Earlier delays run first."],
  },
  {
    id: "seed-challenge-priority-queue",
    categorySlug: "javascript",
    title: "Priority Queue",
    description: "Implement max-priority queue. Input is { operations }.",
    difficulty: "ADVANCED",
    starterCode: `class PriorityQueue {
  insert(value, priority) {}
  extractMax() {}
}

function runPriorityQueueTest(input) {
  const pq = new PriorityQueue();
  const results = [];
  for (const op of input.operations) {
    if (op.type === "insert") pq.insert(op.value, op.priority);
    else if (op.type === "extract") results.push(pq.extractMax());
  }
  return results;
}

function solve(input) {
  return runPriorityQueueTest(input);
}`,
    solutionCode: `class PriorityQueue {
  constructor() { this.items = []; }
  insert(value, priority) { this.items.push({ value, priority }); }
  extractMax() {
    if (this.items.length === 0) return null;
    let maxIndex = 0;
    for (let i = 1; i < this.items.length; i++) {
      if (this.items[i].priority > this.items[maxIndex].priority) maxIndex = i;
    }
    const [item] = this.items.splice(maxIndex, 1);
    return item.value;
  }
}

function runPriorityQueueTest(input) {
  const pq = new PriorityQueue();
  const results = [];
  for (const op of input.operations) {
    if (op.type === "insert") pq.insert(op.value, op.priority);
    else if (op.type === "extract") results.push(pq.extractMax());
  }
  return results;
}

function solve(input) {
  return runPriorityQueueTest(input);
}`,
    testCases: [
      {
        input: {
          operations: [
            { type: "insert", value: "a", priority: 1 },
            { type: "insert", value: "b", priority: 3 },
            { type: "extract" },
          ],
        },
        expectedOutput: ["b"],
      },
      {
        input: {
          operations: [
            { type: "insert", value: 1, priority: 2 },
            { type: "insert", value: 2, priority: 5 },
            { type: "insert", value: 3, priority: 1 },
            { type: "extract" },
            { type: "extract" },
          ],
        },
        expectedOutput: [2, 1],
      },
      {
        input: { operations: [{ type: "extract" }] },
        expectedOutput: [null],
      },
    ],
    hints: ["Store value and priority pairs.", "extractMax removes highest priority item."],
  },
  {
    id: "seed-challenge-lru-cache",
    categorySlug: "javascript",
    title: "LRU Cache",
    description: "Implement LRU cache with get/put. Input is { capacity, operations }.",
    difficulty: "ADVANCED",
    starterCode: `class LRUCache {
  constructor(capacity) {}
  get(key) {}
  put(key, value) {}
}

function runLruTest(input) {
  const cache = new LRUCache(input.capacity);
  const results = [];
  for (const op of input.operations) {
    if (op.type === "get") results.push(cache.get(op.key));
    else if (op.type === "put") cache.put(op.key, op.value);
  }
  return results;
}

function solve(input) {
  return runLruTest(input);
}`,
    solutionCode: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      const firstKey = this.map.keys().next().value;
      this.map.delete(firstKey);
    }
  }
}

function runLruTest(input) {
  const cache = new LRUCache(input.capacity);
  const results = [];
  for (const op of input.operations) {
    if (op.type === "get") results.push(cache.get(op.key));
    else if (op.type === "put") cache.put(op.key, op.value);
  }
  return results;
}

function solve(input) {
  return runLruTest(input);
}`,
    testCases: [
      {
        input: {
          capacity: 2,
          operations: [
            { type: "put", key: 1, value: 1 },
            { type: "put", key: 2, value: 2 },
            { type: "get", key: 1 },
            { type: "put", key: 3, value: 3 },
            { type: "get", key: 2 },
          ],
        },
        expectedOutput: [1, -1],
      },
      {
        input: {
          capacity: 1,
          operations: [
            { type: "put", key: 1, value: 10 },
            { type: "get", key: 1 },
            { type: "put", key: 2, value: 20 },
            { type: "get", key: 1 },
          ],
        },
        expectedOutput: [10, -1],
      },
      {
        input: { capacity: 2, operations: [{ type: "get", key: 1 }] },
        expectedOutput: [-1],
      },
    ],
    hints: ["Use Map for insertion order.", "Move accessed keys to the end; evict oldest when over capacity."],
  },
];
