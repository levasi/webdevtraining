import type { SeedChallenge } from "../challenge-types";

export const objectChallenges: SeedChallenge[] = [
  {
    id: "seed-challenge-deep-clone",
    categorySlug: "javascript",
    title: "Deep Clone Object",
    description: "Return a deep clone of the input object.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return deep clone
}`,
    solutionCode: `function solve(input) {
  if (input === null || typeof input !== "object") return input;
  if (Array.isArray(input)) return input.map(deepClone);
  const clone = {};
  for (const key of Object.keys(input)) {
    clone[key] = deepClone(input[key]);
  }
  return clone;
}

function deepClone(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(deepClone);
  const clone = {};
  for (const key of Object.keys(value)) clone[key] = deepClone(value[key]);
  return clone;
}`,
    testCases: [
      { input: { a: 1, b: { c: 2 } }, expectedOutput: { a: 1, b: { c: 2 } } },
      { input: [1, [2, 3]], expectedOutput: [1, [2, 3]] },
      { input: { x: null }, expectedOutput: { x: null } },
    ],
    hints: ["Handle primitives, arrays, and objects separately.", "Recursively clone nested values."],
  },
  {
    id: "seed-challenge-shallow-clone",
    categorySlug: "javascript",
    title: "Shallow Clone Object",
    description: "Return a shallow clone of the input object (top-level only).",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return shallow clone
}`,
    solutionCode: `function solve(input) {
  if (Array.isArray(input)) return [...input];
  return { ...input };
}`,
    testCases: [
      { input: { a: 1, b: 2 }, expectedOutput: { a: 1, b: 2 } },
      { input: [1, 2, 3], expectedOutput: [1, 2, 3] },
      { input: {}, expectedOutput: {} },
    ],
    hints: ["Use spread for objects and arrays.", "Nested references are shared."],
  },
  {
    id: "seed-challenge-deep-equal",
    categorySlug: "javascript",
    title: "Deep Equal",
    description: "Return true if two values are deeply equal. Input is [a, b].",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const [a, b] = input;
  // return boolean
}`,
    solutionCode: `function solve(input) {
  return deepEqual(input[0], input[1]);
}

function deepEqual(a, b) {
  if (a === b) return true;
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => deepEqual(a[key], b[key]));
}`,
    testCases: [
      { input: [{ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }], expectedOutput: true },
      { input: [{ a: 1 }, { a: 2 }], expectedOutput: false },
      { input: [[1, 2], [1, 2]], expectedOutput: true },
    ],
    hints: ["Compare primitives with ===.", "Recursively compare object keys and array elements."],
  },
  {
    id: "seed-challenge-deep-merge",
    categorySlug: "javascript",
    title: "Deep Merge Objects",
    description: "Deep merge two objects. Input is [target, source].",
    difficulty: "ADVANCED",
    starterCode: `function solve(input) {
  const [target, source] = input;
  // return merged object
}`,
    solutionCode: `function solve(input) {
  return deepMerge(input[0], input[1]);
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(target[key], source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}`,
    testCases: [
      { input: [{ a: 1 }, { b: 2 }], expectedOutput: { a: 1, b: 2 } },
      { input: [{ a: { x: 1 } }, { a: { y: 2 } }], expectedOutput: { a: { x: 1, y: 2 } } },
      { input: [{ a: 1 }, { a: 2 }], expectedOutput: { a: 2 } },
    ],
    hints: ["Copy target first.", "Recursively merge nested plain objects."],
  },
  {
    id: "seed-challenge-flatten-object",
    categorySlug: "javascript",
    title: "Flatten Object",
    description: "Flatten nested object keys with dot notation.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return flat object
}`,
    solutionCode: `function solve(input) {
  const result = {};
  function flatten(obj, prefix) {
    for (const key of Object.keys(obj)) {
      const path = prefix ? prefix + "." + key : key;
      if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        flatten(obj[key], path);
      } else {
        result[path] = obj[key];
      }
    }
  }
  flatten(input, "");
  return result;
}`,
    testCases: [
      { input: { a: 1, b: { c: 2 } }, expectedOutput: { a: 1, "b.c": 2 } },
      { input: { x: { y: { z: 3 } } }, expectedOutput: { "x.y.z": 3 } },
      { input: { a: 1 }, expectedOutput: { a: 1 } },
    ],
    hints: ["Build dot-separated key paths.", "Recursively flatten nested objects."],
  },
  {
    id: "seed-challenge-unflatten-object",
    categorySlug: "javascript",
    title: "Unflatten Object",
    description: "Convert dot-notation keys back to nested object.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return nested object
}`,
    solutionCode: `function solve(input) {
  const result = {};
  for (const key of Object.keys(input)) {
    const parts = key.split(".");
    let current = result;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) current[part] = input[key];
      else {
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    }
  }
  return result;
}`,
    testCases: [
      { input: { a: 1, "b.c": 2 }, expectedOutput: { a: 1, b: { c: 2 } } },
      { input: { "x.y.z": 3 }, expectedOutput: { x: { y: { z: 3 } } } },
      { input: { a: 1 }, expectedOutput: { a: 1 } },
    ],
    hints: ["Split keys on dots.", "Walk/create nested objects for each segment."],
  },
  {
    id: "seed-challenge-get-by-path",
    categorySlug: "javascript",
    title: "Get Nested Value by Path",
    description: "Get value at dot path. Input is { obj, path }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const { obj, path } = input;
  // return value
}`,
    solutionCode: `function solve(input) {
  const { obj, path } = input;
  return path.split(".").reduce((acc, key) => (acc == null ? null : acc[key]), obj) ?? null;
}`,
    testCases: [
      { input: { obj: { a: { b: 2 } }, path: "a.b" }, expectedOutput: 2 },
      { input: { obj: { x: 1 }, path: "x" }, expectedOutput: 1 },
      { input: { obj: { a: 1 }, path: "a.b" }, expectedOutput: null },
    ],
    hints: ["Split path by dots.", "Use reduce to walk the object."],
  },
  {
    id: "seed-challenge-set-by-path",
    categorySlug: "javascript",
    title: "Set Nested Value by Path",
    description: "Set value at dot path immutably. Input is { obj, path, value }.",
    difficulty: "ADVANCED",
    starterCode: `function solve(input) {
  const { obj, path, value } = input;
  // return new object
}`,
    solutionCode: `function solve(input) {
  const { obj, path, value } = input;
  const parts = path.split(".");
  function setAt(current, index) {
    if (index === parts.length - 1) return { ...current, [parts[index]]: value };
    const key = parts[index];
    return { ...current, [key]: setAt(current[key] || {}, index + 1) };
  }
  return setAt(obj, 0);
}`,
    testCases: [
      { input: { obj: { a: { b: 1 } }, path: "a.b", value: 2 }, expectedOutput: { a: { b: 2 } } },
      { input: { obj: {}, path: "x.y", value: 5 }, expectedOutput: { x: { y: 5 } } },
      { input: { obj: { a: 1 }, path: "a", value: 9 }, expectedOutput: { a: 9 } },
    ],
    hints: ["Split the path into segments.", "Recursively clone and set the final key."],
  },
  {
    id: "seed-challenge-remove-empty-values",
    categorySlug: "javascript",
    title: "Remove Empty Values",
    description: "Remove null, undefined, empty string, empty array, and empty object values.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  // return cleaned object
}`,
    solutionCode: `function solve(input) {
  const isEmpty = (v) =>
    v === null ||
    v === undefined ||
    v === "" ||
    (Array.isArray(v) && v.length === 0) ||
    (typeof v === "object" && v !== null && !Array.isArray(v) && Object.keys(v).length === 0);
  const result = {};
  for (const key of Object.keys(input)) {
    if (!isEmpty(input[key])) result[key] = input[key];
  }
  return result;
}`,
    testCases: [
      { input: { a: 1, b: null, c: "", d: [], e: {} }, expectedOutput: { a: 1 } },
      { input: { a: 0, b: false }, expectedOutput: { a: 0, b: false } },
      { input: { a: "hi" }, expectedOutput: { a: "hi" } },
    ],
    hints: ["Define what counts as empty.", "Filter top-level keys."],
  },
  {
    id: "seed-challenge-object-to-query-string",
    categorySlug: "javascript",
    title: "Object to Query String",
    description: "Convert a flat object to a URL query string.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return query string
}`,
    solutionCode: `function solve(input) {
  return Object.keys(input)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(String(input[key])))
    .join("&");
}`,
    testCases: [
      { input: { a: 1, b: "hello" }, expectedOutput: "a=1&b=hello" },
      { input: { x: "a b" }, expectedOutput: "x=a%20b" },
      { input: {}, expectedOutput: "" },
    ],
    hints: ["Map each key=value pair.", "Join with &."],
  },
  {
    id: "seed-challenge-query-string-to-object",
    categorySlug: "javascript",
    title: "Query String to Object",
    description: "Parse a URL query string into an object.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return object
}`,
    solutionCode: `function solve(input) {
  if (!input) return {};
  return input.split("&").reduce((acc, pair) => {
    const [key, value] = pair.split("=");
    acc[decodeURIComponent(key)] = decodeURIComponent(value ?? "");
    return acc;
  }, {});
}`,
    testCases: [
      { input: "a=1&b=hello", expectedOutput: { a: "1", b: "hello" } },
      { input: "x=a%20b", expectedOutput: { x: "a b" } },
      { input: "", expectedOutput: {} },
    ],
    hints: ["Split on & then on =.", "Decode URI components."],
  },
  {
    id: "seed-challenge-is-empty-object",
    categorySlug: "javascript",
    title: "Is Empty Object",
    description: "Return true if the value is a plain object with no own keys.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return boolean
}`,
    solutionCode: `function solve(input) {
  return (
    input !== null &&
    typeof input === "object" &&
    !Array.isArray(input) &&
    Object.keys(input).length === 0
  );
}`,
    testCases: [
      { input: {}, expectedOutput: true },
      { input: { a: 1 }, expectedOutput: false },
      { input: [], expectedOutput: false },
    ],
    hints: ["Check typeof object and not array.", "Object.keys length === 0."],
  },
  {
    id: "seed-challenge-pick-keys",
    categorySlug: "javascript",
    title: "Pick Keys",
    description: "Return object with only specified keys. Input is { obj, keys }.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const { obj, keys } = input;
  // return picked object
}`,
    solutionCode: `function solve(input) {
  const { obj, keys } = input;
  const result = {};
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
}`,
    testCases: [
      { input: { obj: { a: 1, b: 2, c: 3 }, keys: ["a", "c"] }, expectedOutput: { a: 1, c: 3 } },
      { input: { obj: { x: 1 }, keys: ["y"] }, expectedOutput: {} },
      { input: { obj: { a: 1, b: 2 }, keys: ["a", "b"] }, expectedOutput: { a: 1, b: 2 } },
    ],
    hints: ["Loop over requested keys.", "Copy only keys that exist on obj."],
  },
  {
    id: "seed-challenge-omit-keys",
    categorySlug: "javascript",
    title: "Omit Keys",
    description: "Return object without specified keys. Input is { obj, keys }.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  const { obj, keys } = input;
  // return omitted object
}`,
    solutionCode: `function solve(input) {
  const { obj, keys } = input;
  const omit = new Set(keys);
  const result = {};
  for (const key of Object.keys(obj)) {
    if (!omit.has(key)) result[key] = obj[key];
  }
  return result;
}`,
    testCases: [
      { input: { obj: { a: 1, b: 2, c: 3 }, keys: ["b"] }, expectedOutput: { a: 1, c: 3 } },
      { input: { obj: { a: 1 }, keys: ["a"] }, expectedOutput: {} },
      { input: { obj: { a: 1, b: 2 }, keys: [] }, expectedOutput: { a: 1, b: 2 } },
    ],
    hints: ["Put omit keys in a Set.", "Copy keys not in the omit set."],
  },
  {
    id: "seed-challenge-invert-object",
    categorySlug: "javascript",
    title: "Invert Object",
    description: "Swap keys and values. Values must be strings or numbers usable as keys.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return inverted object
}`,
    solutionCode: `function solve(input) {
  const result = {};
  for (const key of Object.keys(input)) {
    result[input[key]] = key;
  }
  return result;
}`,
    testCases: [
      { input: { a: "1", b: "2" }, expectedOutput: { 1: "a", 2: "b" } },
      { input: { x: "y" }, expectedOutput: { y: "x" } },
      { input: {}, expectedOutput: {} },
    ],
    hints: ["Loop over entries.", "Assign value as key and key as value."],
  },
  {
    id: "seed-challenge-count-property-occurrences",
    categorySlug: "javascript",
    title: "Count Property Occurrences",
    description: "Count occurrences of values for a property across objects. Input is { items, key }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const { items, key } = input;
  // return counts
}`,
    solutionCode: `function solve(input) {
  const { items, key } = input;
  return items.reduce((acc, item) => {
    const val = item[key];
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
}`,
    testCases: [
      {
        input: { items: [{ role: "admin" }, { role: "user" }, { role: "admin" }], key: "role" },
        expectedOutput: { admin: 2, user: 1 },
      },
      { input: { items: [{ x: 1 }, { x: 1 }], key: "x" }, expectedOutput: { 1: 2 } },
      { input: { items: [], key: "id" }, expectedOutput: {} },
    ],
    hints: ["Extract item[key] for each object.", "Increment counts in a map object."],
  },
  {
    id: "seed-challenge-deep-freeze",
    categorySlug: "javascript",
    title: "Freeze Object Deeply",
    description: "Deep freeze an object and return freeze status report.",
    difficulty: "ADVANCED",
    starterCode: `function solve(input) {
  // return freeze report
}`,
    solutionCode: `function solve(input) {
  function deepFreeze(obj) {
    Object.freeze(obj);
    for (const value of Object.values(obj)) {
      if (value && typeof value === "object") deepFreeze(value);
    }
    return obj;
  }
  const frozen = deepFreeze(JSON.parse(JSON.stringify(input)));
  return {
    top: Object.isFrozen(frozen),
    nested: Object.isFrozen(frozen.nested),
  };
}`,
    testCases: [
      { input: { a: 1, nested: { b: 2 } }, expectedOutput: { top: true, nested: true } },
      { input: { x: 1 }, expectedOutput: { top: true, nested: true } },
      { input: { nested: { y: 2 } }, expectedOutput: { top: true, nested: true } },
    ],
    hints: ["Call Object.freeze on the object.", "Recursively freeze nested objects."],
  },
  {
    id: "seed-challenge-custom-assign",
    categorySlug: "javascript",
    title: "Custom Object.assign",
    description: "Assign properties from sources to target. Input is { target, sources }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const { target, sources } = input;
  // return assigned target
}`,
    solutionCode: `function solve(input) {
  const { target, sources } = input;
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      target[key] = source[key];
    }
  }
  return target;
}`,
    testCases: [
      { input: { target: { a: 1 }, sources: [{ b: 2 }] }, expectedOutput: { a: 1, b: 2 } },
      { input: { target: {}, sources: [{ x: 1 }, { y: 2 }] }, expectedOutput: { x: 1, y: 2 } },
      { input: { target: { a: 1 }, sources: [{ a: 2 }] }, expectedOutput: { a: 2 } },
    ],
    hints: ["Loop over each source object.", "Copy enumerable own keys to target."],
  },
  {
    id: "seed-challenge-array-to-object",
    categorySlug: "javascript",
    title: "Array to Object",
    description: "Transform array of objects into object keyed by property. Input is { items, key }.",
    difficulty: "INTERMEDIATE",
    starterCode: `function solve(input) {
  const { items, key } = input;
  // return object
}`,
    solutionCode: `function solve(input) {
  const { items, key } = input;
  return items.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}`,
    testCases: [
      {
        input: { items: [{ id: 1, name: "a" }, { id: 2, name: "b" }], key: "id" },
        expectedOutput: { 1: { id: 1, name: "a" }, 2: { id: 2, name: "b" } },
      },
      { input: { items: [{ k: "x", v: 1 }], key: "k" }, expectedOutput: { x: { k: "x", v: 1 } } },
      { input: { items: [], key: "id" }, expectedOutput: {} },
    ],
    hints: ["Use item[key] as the object key.", "Store the full item as the value."],
  },
  {
    id: "seed-challenge-group-users-by-role",
    categorySlug: "javascript",
    title: "Group Users by Role",
    description: "Group users by their role property.",
    difficulty: "BEGINNER",
    starterCode: `function solve(input) {
  // return grouped users
}`,
    solutionCode: `function solve(input) {
  return input.reduce((acc, user) => {
    const role = user.role;
    if (!acc[role]) acc[role] = [];
    acc[role].push(user);
    return acc;
  }, {});
}`,
    testCases: [
      {
        input: [{ name: "A", role: "admin" }, { name: "B", role: "user" }, { name: "C", role: "admin" }],
        expectedOutput: {
          admin: [{ name: "A", role: "admin" }, { name: "C", role: "admin" }],
          user: [{ name: "B", role: "user" }],
        },
      },
      { input: [{ name: "X", role: "guest" }], expectedOutput: { guest: [{ name: "X", role: "guest" }] } },
      { input: [], expectedOutput: {} },
    ],
    hints: ["Use reduce to build groups.", "Key by user.role and push into arrays."],
  },
];
