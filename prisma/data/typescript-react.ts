import type { SeedQuestion } from "./types";

export const typescriptQuestions: SeedQuestion[] = [
  {
    id: "seed-ts-vs-js",
    categorySlug: "typescript",
    title: "TypeScript vs JavaScript",
    content: "What does TypeScript add on top of JavaScript?",
    explanation:
      "TypeScript is a superset that adds static typing, interfaces, enums, and compile-time checks.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["basics"],
    answers: [
      {
        content: "Static typing and compile-time type checking on top of JavaScript.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-ts-interface-type",
    categorySlug: "typescript",
    title: "interface vs type",
    content: "When might you prefer interface over type alias?",
    explanation:
      "Interfaces support declaration merging and are often preferred for object shapes; types are more flexible for unions and primitives.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["types", "interfaces"],
    answers: [
      {
        content: "Extending/merging object shapes across modules",
        isCorrect: true,
      },
      { content: "Union of string literals only types can do", isCorrect: false },
      { content: "Mapping over tuple elements", isCorrect: false },
      { content: "Runtime type reflection", isCorrect: false },
    ],
  },
  {
    id: "seed-ts-unknown",
    categorySlug: "typescript",
    title: "unknown vs any",
    content: "Why prefer unknown over any?",
    explanation:
      "unknown forces type narrowing before use, preserving type safety.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["types", "safety"],
    answers: [
      {
        content: "unknown requires narrowing before operations; any disables checking.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-ts-generics",
    categorySlug: "typescript",
    title: "What are generics?",
    content: "What problem do generics solve in TypeScript?",
    explanation:
      "Generics let you write reusable components/functions while preserving type relationships.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["generics"],
    answers: [
      {
        content: "Type parameters that keep input/output types related while staying reusable.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-ts-enum",
    categorySlug: "typescript",
    title: "TypeScript enums",
    content: "What do numeric enums compile to in JavaScript?",
    explanation: "Numeric enums generate a reverse mapping object at runtime.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["enums"],
    answers: [
      { content: "A runtime object with forward and reverse mappings", isCorrect: true },
      { content: "They are erased completely", isCorrect: false },
      { content: "Only string constants", isCorrect: false },
      { content: "Private class fields", isCorrect: false },
    ],
  },
  {
    id: "seed-ts-never",
    categorySlug: "typescript",
    title: "never type",
    content: "When is never used as a return type?",
    explanation:
      "never represents values that never occur, such as functions that always throw or infinite loops.",
    difficulty: "ADVANCED",
    type: "MULTIPLE_CHOICE",
    tags: ["types"],
    answers: [
      { content: "Functions that never return normally", isCorrect: true },
      { content: "Optional properties", isCorrect: false },
      { content: "Empty arrays", isCorrect: false },
      { content: "Async functions that resolve void", isCorrect: false },
    ],
  },
  {
    id: "seed-ts-strict",
    categorySlug: "typescript",
    title: "strict mode in tsconfig",
    content: "What does enabling strict in tsconfig.json do?",
    explanation:
      "strict enables a family of stricter type-checking options like noImplicitAny and strictNullChecks.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["compiler"],
    answers: [
      {
        content: "Turns on stricter checks including strictNullChecks and noImplicitAny.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-ts-utility-partial",
    categorySlug: "typescript",
    title: "Partial<T>",
    content: "What does the Partial utility type do?",
    explanation: "Makes all properties of T optional.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["utility-types"],
    answers: [
      { content: "Makes all properties optional", isCorrect: true },
      { content: "Makes all properties readonly", isCorrect: false },
      { content: "Picks a subset of keys", isCorrect: false },
      { content: "Removes null and undefined", isCorrect: false },
    ],
  },
];

export const reactQuestions: SeedQuestion[] = [
  {
    id: "seed-react-keys",
    categorySlug: "react",
    title: "Why do lists need stable keys?",
    content: "Why should React list items have stable, unique keys?",
    explanation:
      "Keys help React reconcile list updates and preserve component state correctly.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["lists", "reconciliation"],
    answers: [
      {
        content:
          "Keys identify items across renders so React can update efficiently and preserve state.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-virtual-dom",
    categorySlug: "react",
    title: "What is the virtual DOM?",
    content: "What role does the virtual DOM play in React?",
    explanation:
      "React keeps a lightweight tree in memory and diffs it against the previous tree to minimize real DOM updates.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["reconciliation"],
    answers: [
      {
        content:
          "An in-memory representation used to compute minimal DOM updates via reconciliation.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-usestate",
    categorySlug: "react",
    title: "useState behavior",
    content: "When you call setState with the same value, what happens?",
    explanation:
      "React bails out of re-rendering if Object.is comparison shows no change (except in Strict Mode dev double-invoke nuances).",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["hooks", "state"],
    answers: [
      { content: "React may skip re-render if value unchanged", isCorrect: true },
      { content: "Always forces a re-render", isCorrect: false },
      { content: "Resets all hooks", isCorrect: false },
      { content: "Throws in production", isCorrect: false },
    ],
  },
  {
    id: "seed-react-useeffect-deps",
    categorySlug: "react",
    title: "useEffect dependency array",
    content: "What happens if you omit the dependency array in useEffect?",
    explanation: "The effect runs after every render.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["hooks", "effects"],
    answers: [
      { content: "Runs after every render", isCorrect: true },
      { content: "Runs only once on mount", isCorrect: false },
      { content: "Never runs", isCorrect: false },
      { content: "Runs only on unmount", isCorrect: false },
    ],
  },
  {
    id: "seed-react-controlled",
    categorySlug: "react",
    title: "Controlled components",
    content: "What defines a controlled input in React?",
    explanation:
      "The input value is driven by React state and updated via onChange.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["forms"],
    answers: [
      {
        content: "Form element value is controlled by React state via props.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-memo",
    categorySlug: "react",
    title: "React.memo purpose",
    content: "What does React.memo do?",
    explanation:
      "Memo wraps a component to skip re-render when props are shallowly equal.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["performance"],
    answers: [
      { content: "Memoizes component to skip render on same props", isCorrect: true },
      { content: "Caches fetch results", isCorrect: false },
      { content: "Replaces useMemo for values", isCorrect: false },
      { content: "Prevents state updates", isCorrect: false },
    ],
  },
  {
    id: "seed-react-error-boundary",
    categorySlug: "react",
    title: "Error boundaries",
    content: "Can a function component be an error boundary?",
    explanation:
      "As of React 19 there is no hook equivalent; class components or framework boundaries are still common.",
    difficulty: "ADVANCED",
    type: "TRUE_FALSE",
    tags: ["errors"],
    answers: [
      { content: "False (without a library wrapper)", isCorrect: true },
      { content: "True", isCorrect: false },
    ],
  },
  {
    id: "seed-react-fragment",
    categorySlug: "react",
    title: "React Fragments",
    content: "Why use a Fragment instead of a div wrapper?",
    explanation: "Fragments group children without adding extra DOM nodes.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["jsx"],
    answers: [
      {
        content: "Avoid extra DOM nodes while grouping multiple children.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-lifting-state",
    categorySlug: "react",
    title: "Lifting state up",
    content: "When should you lift state up in React?",
    explanation:
      "When sibling components need to share and stay in sync on the same data.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["state", "architecture"],
    answers: [
      {
        content: "When multiple components need to share and synchronize the same state.",
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-useref",
    categorySlug: "react",
    title: "useRef vs useState",
    content: "When is useRef preferable to useState?",
    explanation:
      "useRef stores mutable values that do not trigger re-renders, like DOM refs or timers.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["hooks"],
    answers: [
      { content: "Storing mutable values without causing re-render", isCorrect: true },
      { content: "Any value displayed in UI", isCorrect: false },
      { content: "Replacing context", isCorrect: false },
      { content: "Server-side data fetching", isCorrect: false },
    ],
  },
  {
    id: "seed-react-rerender-investigation",
    categorySlug: "react",
    title: "Investigating unnecessary re-renders",
    content:
      "You notice that a React page re-renders every time a parent state changes even though a child component's displayed data did not change. How would you investigate and optimize it?",
    explanation:
      "Profile with React DevTools, trace prop identity changes, then apply memoization or state colocation where appropriate.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["performance", "rendering", "memoization", "interview"],
    answers: [
      {
        content: `Short Answer
Use React DevTools Profiler to find components re-rendering without prop or state changes, then fix unstable props, colocate state, or apply React.memo / useMemo / useCallback selectively.

Detailed Answer
Start by reproducing the interaction and recording a Profiler session. Highlight updates to see which components rendered and why (props changed, hooks changed, parent rendered). Common causes: new object/array/function references passed as props on every parent render, context value changes broadcasting to all consumers, or state stored too high in the tree.

Fix strategies in order of preference: (1) colocate state so only the subtree that needs it re-renders, (2) pass primitive or stable props instead of inline objects, (3) wrap expensive pure children in React.memo with stable callbacks via useCallback, (4) split context into smaller providers. Avoid blanket memoization—it adds complexity and can hide bugs.

Example
// Problem: new config object every render
function Parent() {
  const [count, setCount] = useState(0);
  return <ExpensiveChart config={{ theme: "dark" }} />;
}

// Fix: stable reference
const config = useMemo(() => ({ theme: "dark" }), []);
return <ExpensiveChart config={config} />;

What The Interviewer Expects
• Mentions React DevTools Profiler (or similar)
• Explains referential equality and why inline objects break memo
• Prefers state colocation before memo everywhere
• Discusses trade-offs of premature optimization`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-stale-closure",
    categorySlug: "react",
    title: "Stale closure in useEffect",
    content:
      "A component polls an API every 5 seconds with setInterval inside useEffect. The request always sends userId=1 even after the user logs in as a different account. What went wrong and how do you fix it?",
    explanation:
      "The effect closed over a stale userId; fix with correct dependencies, a ref, or cleanup that restarts the interval when userId changes.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["hooks", "useEffect", "closures", "interview"],
    answers: [
      {
        content: `Short Answer
The interval callback captured a stale userId from the render when the effect last ran. Add userId to the dependency array (with proper cleanup) or read the latest value from a ref.

Detailed Answer
useEffect callbacks form closures over props and state from the render that scheduled them. If the effect runs once (empty deps) but reads userId inside setInterval, every tick uses the initial userId. This is the classic stale closure bug.

Fix options: (1) include userId in the dependency array, clear the old interval in cleanup, and start a new one when userId changes; (2) store userId in a ref updated each render and read ref.current inside the interval; (3) avoid manual polling—use a data library with keyed queries (TanStack Query refetches when userId changes).

Always return a cleanup function that clearsInterval to prevent leaks and duplicate timers.

Example
useEffect(() => {
  const id = setInterval(() => {
    fetch(\`/api/user/\${userId}/feed\`);
  }, 5000);
  return () => clearInterval(id);
}, [userId]);

What The Interviewer Expects
• Identifies stale closure, not a React "bug"
• Mentions dependency array and cleanup
• Offers ref pattern or query library as alternatives
• Notes memory leak risk without cleanup`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-usereducer-vs-usestate",
    categorySlug: "react",
    title: "useReducer vs useState for complex forms",
    content:
      "A checkout form has twelve interdependent fields (shipping method changes tax, coupon affects totals, country toggles validation rules). useState with many setters is becoming unmaintainable. When do you reach for useReducer?",
    explanation:
      "useReducer fits when the next state depends on the previous state through multiple related transitions and you want centralized update logic.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["hooks", "state", "useReducer", "interview"],
    answers: [
      {
        content: `Short Answer
Use useReducer when several fields update together through explicit actions, state transitions are easier to express as a reducer than many setState calls, or you need predictable, testable state logic.

Detailed Answer
useState works for independent values. When updates are coupled—changing shippingMethod recalculates tax, clears invalid coupons, and updates validation errors—a reducer consolidates rules in one function(action) switch. Benefits: single state object, action types document intent (APPLY_COUPON, SET_COUNTRY), easier unit tests without rendering, and easier to log/debug transitions.

Consider alternatives: react-hook-form for validation-heavy forms, or a small state machine (XState) when flows have many guarded transitions. useReducer is not mandatory for "many fields" alone—only when update logic is intertwined.

Example
function reducer(state, action) {
  switch (action.type) {
    case "SET_COUNTRY":
      return { ...state, country: action.payload, tax: calcTax(action.payload, state.subtotal) };
    case "APPLY_COUPON":
      return { ...state, coupon: action.payload, total: calcTotal(state, action.payload) };
    default:
      return state;
  }
}

What The Interviewer Expects
• Contrasts independent vs coupled state updates
• Names testability and centralized transitions as benefits
• Does not recommend useReducer for every large form blindly
• Mentions form libraries or state machines for complex flows`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-context-performance",
    categorySlug: "react",
    title: "Context causing widespread re-renders",
    content:
      "You put theme, auth user, and shopping cart into one React Context. Any cart item change re-renders the entire app including static layout chrome. How do you restructure without abandoning Context entirely?",
    explanation:
      "Split contexts by update frequency, memoize provider values, or move fast-changing state to a dedicated store with selectors.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["context", "performance", "state", "interview"],
    answers: [
      {
        content: `Short Answer
Split into separate contexts (Theme, Auth, Cart), memoize each provider value, and consume only the context each component needs—or use a store with selectors for high-frequency cart updates.

Detailed Answer
A single context value object changes reference whenever any field changes, so all consumers re-render. Theme rarely changes; cart changes often. Split ThemeProvider, AuthProvider, and CartProvider so layout only subscribes to theme.

For the cart: avoid value={{ items, addItem, removeItem }} recreated each render—memoize with useMemo and stable callbacks with useCallback. For large apps with frequent granular updates, Context is a poor fit; use Zustand, Jotai, or Redux Toolkit with selectors so components subscribe to slices.

Pattern: React Context for low-frequency global config (locale, theme); external store for high-frequency shared state.

Example
// Bad: one provider, everything re-renders on cart change
<AppContext.Provider value={{ theme, user, cart }}>

// Better: split providers
<ThemeProvider>
  <AuthProvider>
    <CartProvider>{children}</CartProvider>
  </AuthProvider>
</ThemeProvider>

What The Interviewer Expects
• Explains that context consumers re-render on any value change
• Proposes splitting contexts or selector-based stores
• Mentions memoizing provider value and stable callbacks
• Matches tool to update frequency, not "never use Context"`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-memoization-tradeoffs",
    categorySlug: "react",
    title: "When useMemo and useCallback help",
    content:
      "A junior developer wrapped every function and computed value in useCallback and useMemo across the codebase. Build times and complexity increased but Lighthouse scores barely moved. How do you decide what to memoize?",
    explanation:
      "Memoize only when profiling shows expensive work or referential stability is required for memoized children—not by default.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["performance", "useMemo", "useCallback", "interview"],
    answers: [
      {
        content: `Short Answer
Memoize after measuring: use useMemo for expensive derived data, useCallback for functions passed to React.memo children or hook dependency lists—not for every handler by default.

Detailed Answer
useMemo caches a computed value between renders when dependencies are unchanged. useCallback caches a function reference. Both have cost: memory, dependency tracking, and code noise. Wrapping trivial operations (string concat, simple filters on 10 items) often costs more than it saves.

Memoize when: (1) a child wrapped in React.memo re-renders due to new function/object props, (2) a computation is measurably expensive (large list sort/filter), (3) a stable reference is required in useEffect/useMemo dependency arrays. Do not memoize to "make React faster" without evidence.

Process: Profiler first → identify hot paths → apply targeted memo → verify improvement.

Example
// Worth it: expensive filter on 10k rows
const visible = useMemo(() => rows.filter(matchesQuery), [rows, query]);

// Usually not worth it:
const onClick = useCallback(() => setOpen(true), []); // unless child is memoized

What The Interviewer Expects
• Rejects memoize-everything as an anti-pattern
• Ties decisions to profiling and referential stability
• Distinguishes useMemo (values) vs useCallback (functions)
• Acknowledges maintenance cost of over-memoization`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-custom-hook-extraction",
    categorySlug: "react",
    title: "Extracting a custom hook from a god component",
    content:
      "A 600-line dashboard component mixes data fetching, WebSocket subscriptions, filter state, and chart rendering. Tests are brittle. How do you refactor using custom hooks without changing behavior?",
    explanation:
      "Extract cohesive logic into named hooks (useDashboardFilters, useLiveMetrics) that return state and actions; leave the component as composition and JSX.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["hooks", "architecture", "refactoring", "interview"],
    answers: [
      {
        content: `Short Answer
Identify independent concerns, move each into a custom hook with a clear return API, test hooks with renderHook, and keep the component as a thin orchestrator.

Detailed Answer
Custom hooks share stateful logic—not JSX. Group by reason to change: useDashboardFilters (URL + local filter state), useLiveMetrics (WebSocket connect/subscribe/cleanup), useChartData (fetch + transform). Each hook owns its useEffect cleanups and loading/error state.

Rules: hooks must start with "use", call hooks at top level only, return the minimal surface (data, status, actions). The dashboard becomes: const filters = useDashboardFilters(); const metrics = useLiveMetrics(filters.range); which reads as documentation.

Test hooks in isolation with @testing-library/react renderHook and fake timers/mock sockets instead of mounting the full 600-line tree.

Example
function useLiveMetrics(range) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const ws = connectMetricsSocket(range);
    ws.onmessage = (e) => setData(JSON.parse(e.data));
    return () => ws.close();
  }, [range]);
  return data;
}

What The Interviewer Expects
• Separates concerns by cohesive logic, not arbitrary line count
• Mentions renderHook for testing
• Emphasizes cleanup inside hooks (effects, sockets)
• Keeps component as composition layer`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-usetransition-ux",
    categorySlug: "react",
    title: "Keeping search responsive with useTransition",
    content:
      "Typing in a search box filters 5,000 table rows. Each keystroke blocks input because filtering is synchronous and the UI feels laggy. How do you use concurrent React features to improve perceived performance?",
    explanation:
      "Wrap the expensive state update in startTransition so React keeps the input responsive and defers the heavy filter render.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["concurrent", "useTransition", "performance", "interview"],
    answers: [
      {
        content: `Short Answer
Keep query state urgent (instant input) and mark the expensive filtered results update as a transition with useTransition so React can interrupt and prioritize typing.

Detailed Answer
React 18+ concurrent rendering lets you label updates urgent (user input) vs transitional (derived list). useTransition returns [isPending, startTransition]. On change: setQuery(e.target.value) immediately; startTransition(() => setFiltered(heavyFilter(rows, value))).

The input stays responsive; the table may briefly show stale results with a pending indicator. Combine with useDeferredValue as an alternative for deferring a value derived from props/state. For truly heavy work, move filtering to a Web Worker or server-side search.

Example
const [query, setQuery] = useState("");
const [filtered, setFiltered] = useState(rows);
const [isPending, startTransition] = useTransition();

function onChange(e) {
  const value = e.target.value;
  setQuery(value);
  startTransition(() => {
    setFiltered(heavyFilter(rows, value));
  });
}

What The Interviewer Expects
• Distinguishes urgent vs non-urgent updates
• Names useTransition or useDeferredValue
• Suggests pending UI feedback
• Knows when client-side filtering 5k rows may still need Web Worker/server`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-suspense-boundaries",
    categorySlug: "react",
    title: "Suspense boundaries for data loading",
    content:
      "A page has a slow comments section and a fast product header. Today one isLoading flag hides the entire page. How do you use Suspense so each section loads independently?",
    explanation:
      "Wrap async child trees in Suspense boundaries with fallbacks so only the slow section shows loading UI.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["suspense", "data-fetching", "loading", "interview"],
    answers: [
      {
        content: `Short Answer
Replace page-level loading with nested Suspense boundaries—each async component throws a promise (or uses a Suspense-enabled data source) and shows its own fallback while siblings render immediately.

Detailed Answer
A single isLoading gate couples unrelated sections. Suspense lets React render completed UI while waiting on async data. Structure: render ProductHeader synchronously; wrap Comments in <Suspense fallback={<CommentsSkeleton />}><Comments postId={id} /></Suspense>.

In React 19 / frameworks: Server Components stream HTML; client islands suspend independently. With TanStack Query v5+ or Relay, integrate suspense queries. Error boundaries pair with Suspense for failure states per section.

Avoid waterfall: fetch comments in parallel with product data at the route level when possible (Promise.all or parallel server fetches).

Example
<>
  <ProductHeader product={product} />
  <Suspense fallback={<CommentsSkeleton />}>
    <Comments postId={product.id} />
  </Suspense>
</>

What The Interviewer Expects
• Explains granular fallbacks vs full-page spinner
• Describes Suspense boundary placement
• Mentions pairing with Error Boundaries
• Notes parallel fetching to avoid waterfalls`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-hydration-mismatch",
    categorySlug: "react",
    title: "Debugging hydration mismatch errors",
    content:
      "After enabling SSR, production logs show 'Hydration failed because the initial UI does not match what was rendered on the server' on a component that displays 'Last updated: 2 seconds ago' and reads window.localStorage for theme. How do you fix it?",
    explanation:
      "Server and client HTML must match on first paint; avoid non-deterministic or browser-only values during initial render.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["ssr", "hydration", "nextjs", "interview"],
    answers: [
      {
        content: `Short Answer
Ensure server and client render the same initial markup: remove Date.now()/relative time on first render, read localStorage only after mount, or use suppressHydrationWarning only as a last resort for known harmless diffs.

Detailed Answer
Hydration attaches event listeners to server HTML. If the client render differs (theme from localStorage, random IDs, Date formatting, browser-only APIs), React warns and may discard server markup—bad for performance and SEO.

Fixes: (1) render placeholder on server and client first paint, then useEffect to apply theme from localStorage; (2) pass theme from server via cookie so SSR matches; (3) use dynamic import with ssr: false for purely client widgets; (4) for relative timestamps, render static ISO on server or update after mount.

suppressHydrationWarning on <html> for theme is acceptable in some design systems when the flash is intentional and documented.

Example
// Bad: different on server vs client
const theme = localStorage.getItem("theme") ?? "light";

// Good: cookie/server read or post-mount
const [theme, setTheme] = useState("light");
useEffect(() => {
  setTheme(localStorage.getItem("theme") ?? "light");
}, []);

What The Interviewer Expects
• Explains why mismatch occurs (server has no window/localStorage/time)
• Prefers cookie/server theme or useEffect after mount
• Warns against careless suppressHydrationWarning
• Connects to SSR/Next.js hydration model`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-compound-components",
    categorySlug: "react",
    title: "Compound components vs prop drilling",
    content:
      "You are building a reusable Tabs component. Passing activeTab, onTabChange, ids, and aria props through every Tab and Panel creates messy APIs. How do compound components help and how do you implement them?",
    explanation:
      "Compound components share implicit state via Context so consumers compose Tabs, TabList, Tab, and TabPanel without prop drilling.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["patterns", "composition", "architecture", "interview"],
    answers: [
      {
        content: `Short Answer
Expose Tabs as a family of components (Tabs, Tabs.List, Tabs.Tab, Tabs.Panel) sharing internal state through Context, so callers compose declaratively without wiring every prop manually.

Detailed Answer
Prop drilling forces consumers to know wiring details (which index, which id). Compound components encode the relationship: <Tabs defaultValue="profile"><Tabs.List>...</Tabs.List><Tabs.Panel value="profile">...</Tabs.Panel></Tabs>. A private TabsContext holds selectedValue, setValue, and generated ids for a11y.

Benefits: flexible layout, readable JSX, encapsulated a11y (role, aria-selected, aria-controls). Similar patterns: Select, Accordion, Menu (Radix, Headless UI). Implementation: createContext, provider on root, useTabsContext hook that throws if used outside provider.

Alternative: render props or a single component with items array—less flexible layout but simpler for basic cases.

Example
const TabsContext = createContext(null);

function Tabs({ children, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      {children}
    </TabsContext.Provider>
  );
}

What The Interviewer Expects
• Names compound component pattern and Context for shared state
• Mentions accessibility (ARIA linking tab to panel)
• Compares to prop drilling / config array APIs
• References real libraries (Radix) as prior art`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-react-forms-server-actions",
    categorySlug: "react",
    title: "Progressive enhancement with form actions",
    content:
      "A React form submits user feedback. Product requires it to work without JavaScript (accessibility, slow networks) but you also want instant validation feedback when JS is available. How do you approach this in a modern React stack?",
    explanation:
      "Use native form action with server handler; enhance client-side with useActionState/useFormStatus for pending and validation states.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["forms", "server-actions", "accessibility", "interview"],
    answers: [
      {
        content: `Short Answer
Build the form as a native HTML form with a server action (or API POST) as baseline, then layer client enhancements: useActionState for errors, useFormStatus for pending UI, and client validation as progressive enhancement.

Detailed Answer
Progressive enhancement means the form submits via standard HTTP when JS fails. In Next.js App Router, action={submitFeedback} on <form> posts to a Server Action; the page revalidates or redirects. With JS, React hydrates and the same action runs without full page reload.

useActionState (React 19) returns [state, formAction, isPending] for inline errors. useFormStatus in a child SubmitButton shows loading without prop drilling. Client-side Zod validation can run onSubmit but must not be the only validation—server must re-validate.

Avoid onClick-only submit handlers with fetch—they break no-JS users.

Example
<form action={formAction}>
  <input name="message" required />
  {state?.error && <p role="alert">{state.error}</p>}
  <SubmitButton />
</form>

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? "Sending…" : "Send"}</button>;
}

What The Interviewer Expects
• Prioritizes native form submission for no-JS baseline
• Names useActionState / useFormStatus or framework equivalent
• Insists on server-side validation
• Frames client validation as enhancement, not replacement`,
        isCorrect: true,
      },
    ],
  },
];
