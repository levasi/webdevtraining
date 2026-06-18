export const ARRAY_OPS = `const ARRAY_OPS = {
  double: (x) => x * 2,
  increment: (x) => x + 1,
  even: (x) => x % 2 === 0,
  sum: (acc, x) => acc + x,
  gt3: (x) => x > 3,
  lt10: (x) => x < 10,
  eq2: (x) => x === 2,
  isPositive: (x) => x > 0,
};`;

export const DEBOUNCE_HARNESS = `function runDebounceTest(delay, waits) {
  let now = 0;
  let nextId = 0;
  const timers = new Map();
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  globalThis.setTimeout = (callback, ms) => {
    const id = ++nextId;
    timers.set(id, { callback, at: now + ms });
    return id;
  };
  globalThis.clearTimeout = (id) => { timers.delete(id); };
  function runTimers(until) {
    while (true) {
      let earliestId = null;
      let earliestAt = Infinity;
      for (const [id, timer] of timers) {
        if (timer.at <= until && timer.at < earliestAt) {
          earliestAt = timer.at;
          earliestId = id;
        }
      }
      if (earliestId === null) return;
      now = earliestAt;
      const timer = timers.get(earliestId);
      timers.delete(earliestId);
      timer.callback();
    }
  }
  const calls = [];
  const debounced = debounce((value) => { calls.push({ at: now, value }); }, delay);
  for (const wait of waits) {
    debounced(1);
    now += wait;
    runTimers(now);
  }
  now += delay;
  runTimers(now + delay);
  globalThis.setTimeout = originalSetTimeout;
  globalThis.clearTimeout = originalClearTimeout;
  return calls;
}`;

export const THROTTLE_HARNESS = `function runThrottleTest(delay, waits) {
  let now = 0;
  let nextId = 0;
  const timers = new Map();
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  globalThis.setTimeout = (callback, ms) => {
    const id = ++nextId;
    timers.set(id, { callback, at: now + ms });
    return id;
  };
  globalThis.clearTimeout = (id) => { timers.delete(id); };
  function runTimers(until) {
    while (true) {
      let earliestId = null;
      let earliestAt = Infinity;
      for (const [id, timer] of timers) {
        if (timer.at <= until && timer.at < earliestAt) {
          earliestAt = timer.at;
          earliestId = id;
        }
      }
      if (earliestId === null) return;
      now = earliestAt;
      const timer = timers.get(earliestId);
      timers.delete(earliestId);
      timer.callback();
    }
  }
  const calls = [];
  const throttled = throttle((value) => { calls.push({ at: now, value }); }, delay);
  for (const wait of waits) {
    throttled(1);
    now += wait;
    runTimers(now);
  }
  now += delay;
  runTimers(now + delay);
  globalThis.setTimeout = originalSetTimeout;
  globalThis.clearTimeout = originalClearTimeout;
  return calls;
}`;

export const PROMISE_ALL_HARNESS = `function runPromiseAllTest(input) {
  if (Array.isArray(input)) {
    const promises = input.map((value) => ({ then(onFulfilled) { onFulfilled(value); } }));
    let output;
    promiseAll(promises).then((result) => { output = result; });
    return output;
  }
  const { values, rejectAt, error } = input;
  const promises = values.map((value, index) => ({
    then(onFulfilled, onRejected) {
      if (index === rejectAt) { onRejected(error); return; }
      onFulfilled(value);
    },
  }));
  let output;
  promiseAll(promises).then(
    (result) => { output = result; },
    (reason) => { output = { rejected: true, error: reason }; },
  );
  return output;
}`;

export const PROMISE_RACE_HARNESS = `function runPromiseRaceTest(input) {
  const { values, rejectAt, error } = input;
  const promises = values.map((value, index) => ({
    then(onFulfilled, onRejected) {
      if (index === rejectAt) { onRejected(error); return; }
      onFulfilled(value);
    },
  }));
  let output;
  promiseRace(promises).then(
    (result) => { output = { fulfilled: true, value: result }; },
    (reason) => { output = { fulfilled: false, error: reason }; },
  );
  return output;
}`;

export const PROMISE_ALL_SETTLED_HARNESS = `function runPromiseAllSettledTest(input) {
  const { values, rejectAt, error } = input;
  const promises = values.map((value, index) => ({
    then(onFulfilled, onRejected) {
      if (index === rejectAt) { onRejected(error); return; }
      onFulfilled(value);
    },
  }));
  let output;
  promiseAllSettled(promises).then((result) => { output = result; });
  return output;
}`;

export const PROMISE_ANY_HARNESS = `function runPromiseAnyTest(input) {
  const { values, rejectAt } = input;
  const promises = values.map((value, index) => ({
    then(onFulfilled, onRejected) {
      if (rejectAt.includes(index)) { onRejected("fail"); return; }
      onFulfilled(value);
    },
  }));
  let output;
  promiseAny(promises).then(
    (result) => { output = { fulfilled: true, value: result }; },
    (reason) => { output = { fulfilled: false, error: reason }; },
  );
  return output;
}`;

export const EVENT_EMITTER_HARNESS = `function runEventEmitterTest(input) {
  const { actions } = input;
  const emitter = new EventEmitter();
  const log = [];
  const listeners = new Map();
  for (const action of actions) {
    if (action.type === "on") {
      const listener = (...args) => { log.push({ event: action.event, args }); };
      listeners.set(action.id, listener);
      emitter.on(action.event, listener);
    } else if (action.type === "off") {
      emitter.off(action.event, listeners.get(action.id));
    } else if (action.type === "emit") {
      const success = emitter.emit(action.event, ...(action.args ?? []));
      log.push({ emitted: action.event, success });
    }
  }
  return log;
}`;

export const TIMER_HARNESS = `function runTimerHarness(callback) {
  let now = 0;
  let nextId = 0;
  const timers = new Map();
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const originalSetInterval = globalThis.setInterval;
  const originalClearInterval = globalThis.clearInterval;
  globalThis.setTimeout = (cb, ms) => {
    const id = ++nextId;
    timers.set(id, { callback: cb, at: now + ms, interval: null });
    return id;
  };
  globalThis.clearTimeout = (id) => { timers.delete(id); };
  globalThis.setInterval = (cb, ms) => {
    const id = ++nextId;
    timers.set(id, { callback: cb, at: now + ms, interval: ms });
    return id;
  };
  globalThis.clearInterval = (id) => { timers.delete(id); };
  function runTimers(until) {
    while (true) {
      let earliestId = null;
      let earliestAt = Infinity;
      for (const [id, timer] of timers) {
        if (timer.at <= until && timer.at < earliestAt) {
          earliestAt = timer.at;
          earliestId = id;
        }
      }
      if (earliestId === null) return;
      now = earliestAt;
      const timer = timers.get(earliestId);
      timer.callback();
      if (timer.interval !== null) {
        timer.at = now + timer.interval;
      } else {
        timers.delete(earliestId);
      }
    }
  }
  const result = callback({ now: () => now, advance: (ms) => { now += ms; runTimers(now); }, runTimers: () => runTimers(now) });
  globalThis.setTimeout = originalSetTimeout;
  globalThis.clearTimeout = originalClearTimeout;
  globalThis.setInterval = originalSetInterval;
  globalThis.clearInterval = originalClearInterval;
  return result;
}`;
