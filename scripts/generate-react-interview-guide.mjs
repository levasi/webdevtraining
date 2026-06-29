/**
 * One-off generator for prisma/data/react-interview-guide.ts
 * Run: node scripts/generate-react-interview-guide.mjs
 */
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {Array<{n:number,slug:string,title:string,content:string,answer:string,difficulty:string,tags?:string[]}>} */
const QUESTIONS = [
  {
    n: 3,
    slug: "what-is-component",
    title: "What is a React component?",
    content: "What is a React component?",
    difficulty: "BEGINNER",
    answer: `<p>A component is one of the core building blocks of React. Every React application is made up of pieces called components. Components make building UIs much easier.</p>
<p>React has two main types of components:</p>
<ul>
<li><strong>Functional components</strong> — JavaScript functions. With Hooks, they can use state, side effects, and other features once limited to classes.</li>
<li><strong>Class components</strong> — ES6 classes extending <code>React.Component</code>. They manage state, lifecycle methods, and pass data via props.</li>
</ul>`,
  },
  {
    n: 4,
    slug: "functional-vs-class",
    title: "Difference between functional and class components",
    content: "What is the difference between functional and class components in React?",
    difficulty: "BEGINNER",
    answer: `<table>
<thead><tr><th>Functional Components</th><th>Class Components</th></tr></thead>
<tbody>
<tr><td>Plain JavaScript function accepting props</td><td>Extend <code>React.Component</code> with a <code>render()</code> method</td></tr>
<tr><td>No <code>render()</code> method — return JSX directly</td><td>Must implement <code>render()</code> returning JSX</td></tr>
<tr><td>State via Hooks (<code>useState</code>, etc.)</td><td>State via <code>this.state</code> and <code>this.setState</code></td></tr>
<tr><td>No constructor</td><td>Constructor often initializes state</td></tr>
<tr><td>Lifecycle replaced by Hooks like <code>useEffect</code></td><td>Lifecycle methods like <code>componentDidMount</code></td></tr>
</tbody>
</table>
<p>Modern React favors functional components with Hooks; class components remain supported but are rarely used in new code.</p>`,
  },
  {
    n: 5,
    slug: "props-default-props",
    title: "Props and default props",
    content: "What are props and default props in React?",
    difficulty: "BEGINNER",
    answer: `<p><strong>Props</strong> (properties) pass information from a parent to a child component. Props are read-only objects available inside the component.</p>
<pre><code>function Greeting({ name }) {
  return &lt;p&gt;Hello, {name}&lt;/p&gt;;
}</code></pre>
<p>In class components: <code>this.props.propName</code>.</p>
<p><strong>Default props</strong> are fallback values when the parent omits a prop:</p>
<ul>
<li>Class: <code>ComponentName.defaultProps = { propName: defaultValue }</code></li>
<li>Functional: default parameter values — <code>function Btn({ label = "Click" }) { ... }</code></li>
</ul>`,
  },
  {
    n: 6,
    slug: "state-and-updates",
    title: "State in React and how to update it",
    content: "What is state in React and how do you update it?",
    difficulty: "BEGINNER",
    answer: `<p><strong>State</strong> is internal, mutable data that controls a component's behavior and rendering. When state changes, React re-renders the component.</p>
<ul>
<li>Class components: <code>this.setState()</code></li>
<li>Functional components: setter from <code>useState</code></li>
</ul>
<p>Updates are asynchronous. When the next state depends on the previous state, use the functional form:</p>
<pre><code>setCount(prev =&gt; prev + 1);</code></pre>`,
  },
  {
    n: 7,
    slug: "props-vs-state",
    title: "Difference between props and state",
    content: "What is the difference between props and state in React?",
    difficulty: "BEGINNER",
    answer: `<table>
<thead><tr><th>Props</th><th>State</th></tr></thead>
<tbody>
<tr><td>Passed from parent to child</td><td>Managed within the component</td></tr>
<tr><td>Immutable (read-only)</td><td>Mutable via setters</td></tr>
<tr><td>Used in functional and class components</td><td>Available in all modern components via Hooks or class state</td></tr>
</tbody>
</table>
<p>Example props: passing a title or <code>onClick</code> handler. Example state: a counter value updated on button click.</p>`,
  },
  {
    n: 8,
    slug: "fragments",
    title: "Fragments in React",
    content: "What are fragments in React?",
    difficulty: "BEGINNER",
    answer: `<p>Fragments group multiple elements without adding extra DOM nodes.</p>
<ul>
<li>Short syntax: <code>&lt;&gt; ... &lt;/&gt;</code> (no attributes)</li>
<li>Full syntax: <code>&lt;React.Fragment key={id}&gt;</code> (supports <code>key</code>)</li>
</ul>
<p>Useful in lists, tables, and anywhere a wrapper <code>&lt;div&gt;</code> would clutter the DOM.</p>`,
  },
  {
    n: 9,
    slug: "controlled-vs-uncontrolled",
    title: "Controlled vs uncontrolled components",
    content: "What is the difference between controlled and uncontrolled components?",
    difficulty: "BEGINNER",
    answer: `<table>
<thead><tr><th>Controlled</th><th>Uncontrolled</th></tr></thead>
<tbody>
<tr><td>React state controls the input value</td><td>DOM manages the input value</td></tr>
<tr><td>Updates via <code>onChange</code></td><td>Read value via <code>ref</code> when needed</td></tr>
<tr><td>Full control — validation, conditional UI</td><td>Simpler for basic forms</td></tr>
</tbody>
</table>`,
  },
  {
    n: 10,
    slug: "uncontrolled-dom",
    title: "DOM management in uncontrolled components",
    content: "How does the DOM manage the input value in uncontrolled components?",
    difficulty: "BEGINNER",
    answer: `<p>React does not store the input value in state. The browser DOM holds it.</p>
<ul>
<li>Access current value with <code>useRef</code> or <code>createRef</code></li>
<li>Useful when you don't need to react to every keystroke</li>
<li>Good for simple forms and file inputs</li>
</ul>`,
  },
  {
    n: 11,
    slug: "hooks-intro",
    title: "What are Hooks and why were they introduced?",
    content: "What are Hooks in React and why were they introduced?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "hooks"],
    answer: `<p>Hooks are functions that let functional components use state, lifecycle behavior, and other React features.</p>
<p><strong>Why introduced:</strong></p>
<ul>
<li>Reduce class boilerplate and complex patterns (HOCs, render props)</li>
<li>Enable reusable logic via custom hooks</li>
<li>Simpler, composable functional components</li>
</ul>
<pre><code>const [count, setCount] = useState(0);</code></pre>`,
  },
  {
    n: 12,
    slug: "usestate",
    title: "How useState works",
    content: "How does the useState hook work?",
    difficulty: "BEGINNER",
    tags: ["react", "hooks", "useState"],
    answer: `<p><code>useState</code> returns a state value and a setter. Calling the setter schedules a re-render with the new value.</p>
<pre><code>const [count, setCount] = useState(0);
// count — current value
// setCount — updater
// 0 — initial value on mount</code></pre>`,
  },
  {
    n: 13,
    slug: "useeffect",
    title: "useEffect and the dependency array",
    content: "What is useEffect in React and what is the role of its dependency array?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "hooks", "useEffect"],
    answer: `<p><code>useEffect</code> runs side effects after render (fetching, subscriptions, DOM updates).</p>
<p><strong>Dependency array:</strong></p>
<ul>
<li><code>[]</code> — run once after mount</li>
<li><code>[dep1, dep2]</code> — run when dependencies change</li>
<li>Omitted — run after every render</li>
</ul>
<p>Return a cleanup function for teardown on unmount or before re-running the effect.</p>`,
  },
  {
    n: 14,
    slug: "useeffect-vs-uselayouteffect",
    title: "useEffect vs useLayoutEffect",
    content: "What is the difference between useEffect and useLayoutEffect?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "hooks"],
    answer: `<table>
<thead><tr><th>useEffect</th><th>useLayoutEffect</th></tr></thead>
<tbody>
<tr><td>Runs after paint</td><td>Runs before paint, after DOM updates</td></tr>
<tr><td>Non-blocking</td><td>Blocking</td></tr>
<tr><td>Data fetching, subscriptions, timers</td><td>DOM measurements, synchronous layout reads</td></tr>
</tbody>
</table>
<p>Prefer <code>useEffect</code> unless you need to measure or mutate layout before the browser paints.</p>`,
  },
  {
    n: 15,
    slug: "usecontext",
    title: "useContext hook",
    content: "What is the useContext hook and when should you use it?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "hooks", "context"],
    answer: `<p><code>useContext</code> consumes a Context value without prop drilling.</p>
<p><strong>Use when:</strong></p>
<ul>
<li>Sharing theme, auth, or locale across many components</li>
<li>Multiple components need the same global-ish data</li>
<li>Avoiding passing props through intermediate layers</li>
</ul>`,
  },
  {
    n: 16,
    slug: "usereducer",
    title: "useReducer vs useState",
    content: "What is the useReducer hook and when is it preferred over useState?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "hooks", "useReducer"],
    answer: `<p><code>useReducer(reducer, initialState)</code> returns <code>[state, dispatch]</code>. The reducer handles actions and returns new state — similar to Redux locally.</p>
<p><strong>Prefer over useState when:</strong></p>
<ul>
<li>State logic is complex or has multiple related fields</li>
<li>Next state depends on previous state in non-trivial ways</li>
<li>You want predictable, centralized transitions</li>
</ul>`,
  },
  {
    n: 17,
    slug: "useref",
    title: "useRef hook and use cases",
    content: "What is the useRef hook and what are its common use cases?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "hooks", "useRef"],
    answer: `<p><code>useRef</code> holds a mutable value across renders without causing re-renders.</p>
<p><strong>Common uses:</strong></p>
<ul>
<li>DOM access (focus, scroll, measure)</li>
<li>Storing mutable values (timers, previous values)</li>
<li>Uncontrolled form inputs</li>
</ul>
<pre><code>const inputRef = useRef(null);
inputRef.current?.focus();</code></pre>`,
  },
  {
    n: 18,
    slug: "usememo-vs-usecallback",
    title: "useMemo vs useCallback",
    content: "Explain the difference between useMemo and useCallback.",
    difficulty: "INTERMEDIATE",
    tags: ["react", "hooks", "performance"],
    answer: `<table>
<thead><tr><th>useMemo</th><th>useCallback</th></tr></thead>
<tbody>
<tr><td>Memoizes a <em>computed value</em></td><td>Memoizes a <em>function reference</em></td></tr>
<tr><td><code>useMemo(() =&gt; compute(a, b), [a, b])</code></td><td><code>useCallback(() =&gt; fn(id), [id])</code></td></tr>
<tr><td>Avoids expensive recalculation</td><td>Stable callback for memoized children</td></tr>
</tbody>
</table>`,
  },
  {
    n: 19,
    slug: "custom-hooks",
    title: "Custom hooks",
    content: "What are custom hooks in React and how do you create one?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "hooks"],
    answer: `<p>Custom hooks extract reusable logic. Names must start with <code>use</code> and may call other hooks.</p>
<pre><code>function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() =&gt; {
    fetch(url).then(r =&gt; r.json()).then(setData).finally(() =&gt; setLoading(false));
  }, [url]);
  return { data, loading };
}</code></pre>`,
  },
  {
    n: 20,
    slug: "rules-of-hooks",
    title: "Rules of Hooks",
    content: "What are the rules of hooks and why are they important?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "hooks"],
    answer: `<ol>
<li>Only call hooks at the top level — not inside loops, conditions, or nested functions.</li>
<li>Only call hooks from React function components or custom hooks.</li>
<li>Custom hooks must start with <code>use</code>.</li>
</ol>
<p>These rules preserve hook call order between renders so React can associate state correctly.</p>`,
  },
  {
    n: 21,
    slug: "local-vs-global-state",
    title: "State management: local vs global",
    content: "What is state management in React and what is the difference between local and global state?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "state-management"],
    answer: `<p>State management is how data flows and updates across components.</p>
<table>
<thead><tr><th>Local State</th><th>Global State</th></tr></thead>
<tbody>
<tr><td>Inside one component</td><td>Shared across many components</td></tr>
<tr><td><code>useState</code> / <code>useReducer</code></td><td>Context, Redux, Zustand, etc.</td></tr>
<tr><td>Forms, modals, toggles</td><td>Auth, theme, cart</td></tr>
</tbody>
</table>`,
  },
  {
    n: 22,
    slug: "state-management-solutions",
    title: "Popular state management solutions",
    content: "What are some popular state management solutions in React/Next.js?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "state-management"],
    answer: `<ul>
<li><strong>Built-in:</strong> <code>useState</code>, <code>useReducer</code>, Context API</li>
<li><strong>Redux / Redux Toolkit</strong> — large apps, DevTools, predictable updates</li>
<li><strong>Zustand</strong> — lightweight global store</li>
<li><strong>Jotai / Recoil / MobX</strong> — atomic or observable patterns</li>
<li><strong>Server state:</strong> TanStack Query, SWR, Server Actions in Next.js</li>
</ul>`,
  },
  {
    n: 23,
    slug: "redux-vs-context",
    title: "Redux vs Context API",
    content: "When should you use Redux over Context API?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "state-management", "redux"],
    answer: `<p><strong>Use Redux when:</strong> the app is large, state updates are frequent, you need DevTools/time-travel debugging, or many unrelated components share complex state.</p>
<p><strong>Use Context when:</strong> the app is small/medium and you only need simple shared values (theme, locale, user) with infrequent updates.</p>`,
  },
  {
    n: 24,
    slug: "client-vs-server-state",
    title: "Client state vs server state",
    content: "What is the difference between client state and server state?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "state-management"],
    answer: `<table>
<thead><tr><th>Client State</th><th>Server State</th></tr></thead>
<tbody>
<tr><td>Lives in the browser</td><td>Lives on the server/DB</td></tr>
<tr><td><code>useState</code>, UI toggles</td><td>API responses, cached with React Query/SWR</td></tr>
<tr><td>Session-scoped</td><td>Persistent across users/sessions</td></tr>
</tbody>
</table>`,
  },
  {
    n: 25,
    slug: "context-api",
    title: "Context API explained",
    content: "Explain the Context API in React.",
    difficulty: "INTERMEDIATE",
    tags: ["react", "context"],
    answer: `<p><code>createContext()</code> defines a context. A <code>Provider</code> supplies a value; descendants read it with <code>useContext</code>.</p>
<p>Best for global values like theme or auth. Often paired with <code>useState</code>/<code>useReducer</code> in the provider for updates.</p>`,
  },
  {
    n: 26,
    slug: "usereducer-state-management",
    title: "useReducer in state management",
    content: "What is the role of useReducer in state management?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "useReducer", "state-management"],
    answer: `<p><code>useReducer</code> centralizes state transitions in a reducer function, making complex updates predictable — useful for forms, wizards, and lists with many action types.</p>`,
  },
  {
    n: 27,
    slug: "persistent-state",
    title: "Persistent state in React apps",
    content: "How do you handle persistent state in React apps?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "state-management"],
    answer: `<ul>
<li><code>localStorage</code> / <code>sessionStorage</code> synced via <code>useEffect</code></li>
<li>IndexedDB for larger client data</li>
<li>Backend APIs for authoritative persistence</li>
<li>Redux-persist, Zustand persist middleware</li>
<li>Cookies for small tokens (auth)</li>
</ul>`,
  },
  {
    n: 28,
    slug: "derived-vs-computed-state",
    title: "Derived state vs computed state",
    content: "What is the difference between derived state and computed state in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "state-management"],
    answer: `<p><strong>Derived state</strong> stored in state but calculated from props/other state — often an anti-pattern; prefer computing during render.</p>
<p><strong>Computed values</strong> calculated on the fly in render or with <code>useMemo</code> — no redundant stored copy.</p>`,
  },
  {
    n: 29,
    slug: "optimize-state-updates",
    title: "Optimizing state updates for performance",
    content: "How can you optimize state updates for performance in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "performance"],
    answer: `<ul>
<li>Colocate state to the smallest component that needs it</li>
<li>Use <code>useMemo</code> / <code>useCallback</code> where profiling shows benefit</li>
<li>Batch updates (React 18 automatic batching)</li>
<li>Avoid deep nested state — normalize data</li>
<li>Use selectors in Redux/Zustand to limit re-renders</li>
</ul>`,
  },
  {
    n: 30,
    slug: "async-state-updates",
    title: "Asynchronous state updates",
    content: "How do you handle asynchronous state updates in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "state-management"],
    answer: `<p>State updates are asynchronous and may be batched. Use functional updaters when depending on previous state: <code>setCount(c =&gt; c + 1)</code>.</p>
<p>Use <code>useEffect</code> to react to state changes. For complex sequences, prefer <code>useReducer</code>.</p>`,
  },
  {
    n: 31,
    slug: "virtual-dom",
    title: "Virtual DOM",
    content: "Can you explain what the Virtual DOM is and how React uses it?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "rendering"],
    answer: `<p>The Virtual DOM is an in-memory representation of the UI. On state/prop changes, React builds a new VDOM tree, diffs it against the previous tree, and applies minimal updates to the real DOM.</p>
<p>This reduces expensive DOM operations and keeps updates efficient.</p>`,
  },
  {
    n: 32,
    slug: "reconciliation",
    title: "Reconciliation in React",
    content: "What do you understand by reconciliation in React? Why is it important?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "rendering"],
    answer: `<p>Reconciliation is React's process of comparing the new Virtual DOM with the previous one and updating only what changed in the real DOM. It enables fast, responsive UIs without full page re-renders.</p>`,
  },
  {
    n: 33,
    slug: "react-memo",
    title: "React.memo performance",
    content: "How does React.memo help improve performance?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "performance"],
    answer: `<p><code>React.memo</code> memoizes a component and skips re-render when props are shallowly equal. Useful for list items or expensive pure components where parent re-renders often but child props stay the same.</p>`,
  },
  {
    n: 34,
    slug: "optimize-slow-app",
    title: "Techniques to optimize a slow React app",
    content: "If I ask you to optimize a slow React application, what techniques would you use?",
    difficulty: "ADVANCED",
    tags: ["react", "performance"],
    answer: `<ul>
<li><code>React.memo</code>, <code>useMemo</code>, <code>useCallback</code> after profiling</li>
<li>Code splitting with <code>React.lazy</code> and <code>Suspense</code></li>
<li>List virtualization (<code>react-window</code>)</li>
<li>Stable callbacks; avoid inline functions in hot paths</li>
<li>Colocate state; cache server data (React Query/SWR)</li>
<li>Correct <code>key</code> props on lists</li>
</ul>`,
  },
  {
    n: 35,
    slug: "code-splitting-lazy-loading",
    title: "Code splitting and lazy loading",
    content: "What do you mean by code splitting and lazy loading in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "performance"],
    answer: `<p><strong>Code splitting</strong> breaks the bundle into chunks loaded on demand. <strong>Lazy loading</strong> loads components when needed.</p>
<pre><code>const Page = React.lazy(() =&gt; import('./Page'));
&lt;Suspense fallback={&lt;Spinner /&gt;}&gt;
  &lt;Page /&gt;
&lt;/Suspense&gt;</code></pre>`,
  },
  {
    n: 36,
    slug: "optimize-react-application",
    title: "How to optimize a React application",
    content: "How would you optimize a slow React application?",
    difficulty: "ADVANCED",
    tags: ["react", "performance"],
    answer: `<p>Profile first (React DevTools Profiler), then apply targeted fixes: memoization, lazy routes, virtualized lists, server-state caching, state colocation, and avoiding unnecessary context subscriptions.</p>`,
  },
  {
    n: 37,
    slug: "purecomponent-vs-component",
    title: "PureComponent vs Component",
    content: "What is the difference between React.PureComponent and React.Component?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "class-components"],
    answer: `<p><code>Component</code> re-renders when <code>setState</code> is called. <code>PureComponent</code> shallow-compares props and state and skips render if nothing changed.</p>`,
  },
  {
    n: 38,
    slug: "rerender-on-change",
    title: "Re-rendering when state or props change",
    content: "How does React handle re-rendering when state or props change?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "rendering"],
    answer: `<p>State or prop changes trigger a render. React builds a new VDOM, diffs against the previous tree, and patches the real DOM. Parent re-renders typically re-render children unless memoized.</p>`,
  },
  {
    n: 39,
    slug: "controlled-uncontrolled-rendering",
    title: "Controlled vs uncontrolled rendering",
    content: "What is the difference between controlled and uncontrolled components in terms of rendering?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "forms"],
    answer: `<p><strong>Controlled:</strong> value in React state; every change updates state and re-renders — UI always in sync.</p>
<p><strong>Uncontrolled:</strong> DOM holds value; React reads via ref on demand — fewer renders during typing.</p>`,
  },
  {
    n: 40,
    slug: "usememo-usecallback-performance",
    title: "useMemo and useCallback for performance",
    content: "How do useMemo and useCallback help improve performance in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "performance", "hooks"],
    answer: `<p>They cache values and function references between renders when dependencies are unchanged, avoiding expensive recomputation and preventing memoized children from re-rendering due to new function references.</p>`,
  },
  {
    n: 41,
    slug: "render-list",
    title: "Rendering a list in React",
    content: "How do you render a list of items in React?",
    difficulty: "BEGINNER",
    tags: ["react", "lists"],
    answer: `<p>Use <code>.map()</code> to transform data into JSX. Each item needs a stable <code>key</code>.</p>
<pre><code>{fruits.map(fruit =&gt; &lt;li key={fruit}&gt;{fruit}&lt;/li&gt;)}</code></pre>`,
  },
  {
    n: 42,
    slug: "key-prop",
    title: "Importance of the key prop",
    content: "Why is the key prop important in React lists?",
    difficulty: "BEGINNER",
    tags: ["react", "lists"],
    answer: `<p>Keys help React identify which items changed, were added, or removed so it can update efficiently. Prefer stable unique IDs over array indices when the list can reorder.</p>`,
  },
  {
    n: 43,
    slug: "index-as-key",
    title: "Using array index as key",
    content: "What happens if we use the array index as a key in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "lists"],
    answer: `<p>Index keys work for static lists but break when items reorder, insert, or delete — React may reuse the wrong component instance. Use item IDs when the list is dynamic.</p>`,
  },
  {
    n: 44,
    slug: "conditional-list-items",
    title: "Conditionally rendering list items",
    content: "How do you conditionally render list items in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "lists"],
    answer: `<p>Filter before mapping, or use conditional inside <code>map</code>:</p>
<pre><code>{users.filter(u =&gt; u.active).map(u =&gt; &lt;li key={u.id}&gt;{u.name}&lt;/li&gt;)}</code></pre>`,
  },
  {
    n: 45,
    slug: "update-remove-list-item",
    title: "Update or remove a list item in state",
    content: "How do you update or remove an item from a list in React state?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "lists"],
    answer: `<p>Never mutate state arrays. Create a new array:</p>
<pre><code>setList(list.filter(i =&gt; i !== item));
setList(list.map(i =&gt; i.id === id ? { ...i, done: true } : i));</code></pre>`,
  },
  {
    n: 46,
    slug: "large-list-performance",
    title: "Performance tips for large lists",
    content: "What are some performance tips when rendering large lists in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "lists", "performance"],
    answer: `<ul>
<li>Virtualization (<code>react-window</code>)</li>
<li>Stable keys and <code>React.memo</code> on row components</li>
<li>Pagination or infinite scroll</li>
<li>Avoid rendering thousands of DOM nodes at once</li>
</ul>`,
  },
  {
    n: 47,
    slug: "nested-list",
    title: "Rendering nested lists",
    content: "How would you render a nested list in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "lists"],
    answer: `<p>Nested <code>.map()</code> calls — outer for categories, inner for items. Each level needs its own <code>key</code>.</p>`,
  },
  {
    n: 48,
    slug: "dynamic-list-addition",
    title: "Dynamic addition of list items",
    content: "How do you handle dynamic addition of items in a list?",
    difficulty: "BEGINNER",
    tags: ["react", "lists"],
    answer: `<pre><code>setList([...list, newItem]);</code></pre>
<p>Spread the previous array into a new one with the added item, then call the setter.</p>`,
  },
  {
    n: 49,
    slug: "sort-filter-lists",
    title: "Sorting and filtering lists",
    content: "How do you handle dynamic sorting or filtering of lists in React?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "lists"],
    answer: `<p>Derive sorted/filtered arrays from state during render (or store filter/sort criteria in state):</p>
<pre><code>const filtered = users.filter(u =&gt; u.age &gt; 24);
const sorted = [...users].sort((a, b) =&gt; a.name.localeCompare(b.name));</code></pre>`,
  },
  {
    n: 50,
    slug: "map-vs-foreach",
    title: "map() vs forEach() for lists",
    content: "What is the difference between rendering lists with map() vs forEach()?",
    difficulty: "BEGINNER",
    tags: ["react", "lists"],
    answer: `<p><code>map()</code> returns a new array of JSX elements — use it for rendering. <code>forEach()</code> returns <code>undefined</code> and is for side effects only, not for producing render output.</p>`,
  },
  {
    n: 51,
    slug: "forms-react-vs-html",
    title: "Forms in React vs plain HTML",
    content: "How are forms handled in React compared to plain HTML?",
    difficulty: "BEGINNER",
    tags: ["react", "forms"],
    answer: `<p>React typically uses <strong>controlled components</strong>: input <code>value</code> tied to state, <code>onChange</code> updates state, <code>onSubmit</code> with <code>preventDefault</code> handles submission.</p>`,
  },
  {
    n: 52,
    slug: "prevent-default-form",
    title: "Prevent default form submission",
    content: "How do you prevent the default form submission behavior in React?",
    difficulty: "BEGINNER",
    tags: ["react", "forms"],
    answer: `<pre><code>const handleSubmit = (e) =&gt; {
  e.preventDefault();
};</code></pre>`,
  },
  {
    n: 53,
    slug: "event-bubbling",
    title: "Event bubbling in React",
    content: "What is event bubbling and how can you stop it in React?",
    difficulty: "BEGINNER",
    tags: ["react", "events"],
    answer: `<p>Events propagate from child to parent in the DOM. Call <code>e.stopPropagation()</code> in the handler to prevent parent handlers from firing.</p>`,
  },
  {
    n: 54,
    slug: "multiple-input-fields",
    title: "Multiple input fields in one form",
    content: "How do you handle multiple input fields in a single form in React?",
    difficulty: "BEGINNER",
    tags: ["react", "forms"],
    answer: `<pre><code>const [form, setForm] = useState({ name: "", email: "" });
const handleChange = (e) =&gt; {
  setForm({ ...form, [e.target.name]: e.target.value });
};</code></pre>`,
  },
  {
    n: 55,
    slug: "reset-form-fields",
    title: "Reset form fields after submission",
    content: "How do you reset form fields after submission in React?",
    difficulty: "BEGINNER",
    tags: ["react", "forms"],
    answer: `<p>Reset the state object to initial values after successful submit:</p>
<pre><code>setFormData({ name: "", email: "" });</code></pre>`,
  },
  {
    n: 56,
    slug: "react-router-intro",
    title: "What is React Router?",
    content: "What is React Router and why is it used?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "routing"],
    answer: `<p>React Router enables client-side routing in SPAs — navigation between views without full page reloads, keeping the app fast and smooth.</p>`,
  },
  {
    n: 57,
    slug: "link-vs-anchor",
    title: "Link vs anchor tag",
    content: "What is the difference between the <a> tag and <Link> in React Router?",
    difficulty: "BEGINNER",
    tags: ["react", "routing"],
    answer: `<p><code>&lt;a&gt;</code> triggers a full page load. <code>&lt;Link&gt;</code> updates the URL and swaps components client-side (SPA navigation).</p>`,
  },
  {
    n: 58,
    slug: "react-router-components",
    title: "Main React Router components",
    content: "What are the main components of React Router?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "routing"],
    answer: `<ul>
<li><code>BrowserRouter</code> — enables routing</li>
<li><code>Routes</code> / <code>Route</code> — path-to-component mapping</li>
<li><code>Link</code> / <code>NavLink</code> — navigation</li>
<li><code>useNavigate</code> — programmatic navigation</li>
<li><code>useParams</code> — dynamic route segments</li>
</ul>`,
  },
  {
    n: 59,
    slug: "usehistory-vs-usenavigate",
    title: "useHistory vs useNavigate",
    content: "What is the difference between useHistory and useNavigate?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "routing"],
    answer: `<p>React Router v5 used <code>useHistory()</code>. v6 replaced it with <code>useNavigate()</code>:</p>
<pre><code>const navigate = useNavigate();
navigate("/dashboard");</code></pre>`,
  },
  {
    n: 60,
    slug: "nested-routes",
    title: "Nested routes in React Router",
    content: "How do you implement nested routes in React Router?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "routing"],
    answer: `<pre><code>&lt;Route path="/dashboard" element={&lt;Dashboard /&gt;}&gt;
  &lt;Route path="profile" element={&lt;Profile /&gt;} /&gt;
&lt;/Route&gt;</code></pre>
<p>Child routes render inside the parent's <code>&lt;Outlet /&gt;</code>.</p>`,
  },
  {
    n: 61,
    slug: "route-parameters",
    title: "Route parameters",
    content: "What are route parameters and how do you access them?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "routing"],
    answer: `<pre><code>&lt;Route path="/users/:id" element={&lt;User /&gt;} /&gt;
const { id } = useParams();</code></pre>`,
  },
  {
    n: 62,
    slug: "redirect-react-router",
    title: "Redirecting users in React Router",
    content: "How do you redirect a user in React Router?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "routing"],
    answer: `<ul>
<li>Declarative: <code>&lt;Navigate to="/new" replace /&gt;</code></li>
<li>Imperative: <code>navigate("/new")</code> from <code>useNavigate</code></li>
</ul>`,
  },
  {
    n: 63,
    slug: "client-vs-server-routing",
    title: "Client-side vs server-side routing",
    content: "What is the difference between client-side routing and server-side routing?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "routing"],
    answer: `<p><strong>Client-side:</strong> first load fetches the SPA bundle; subsequent navigations are handled in the browser by JavaScript (no full reload).</p>
<p><strong>Server-side:</strong> each URL request hits the server, which returns HTML for that route and the browser reloads.</p>`,
  },
  {
    n: 64,
    slug: "switch-vs-routes",
    title: "Switch vs Routes",
    content: "What is the difference between <Switch> and <Routes> in React Router?",
    difficulty: "INTERMEDIATE",
    tags: ["react", "routing"],
    answer: `<p><code>Switch</code> (v5) rendered the first matching route; order mattered; needed <code>exact</code>.</p>
<p><code>Routes</code> (v6+) uses a ranking algorithm for the best match, supports nested routes cleanly, and uses the <code>element</code> prop. <code>Switch</code> is deprecated.</p>`,
  },
];

function summaryFromHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 220);
}

const lines = [
  `import type { SeedDifficulty, SeedQuestion } from "./types";`,
  ``,
  `function summaryFromHtml(html: string): string {`,
  `  return html`,
  `    .replace(/<[^>]+>/g, " ")`,
  `    .replace(/\\s+/g, " ")`,
  `    .trim()`,
  `    .slice(0, 220);`,
  `}`,
  ``,
  `function guideQuestion(`,
  `  num: number,`,
  `  slug: string,`,
  `  title: string,`,
  `  content: string,`,
  `  answerHtml: string,`,
  `  difficulty: SeedDifficulty,`,
  `  tags: string[] = ["react", "interview"],`,
  `): SeedQuestion {`,
  `  const explanation = summaryFromHtml(answerHtml);`,
  `  return {`,
  `    id: \`seed-react-guide-\${String(num).padStart(2, "0")}-\${slug}\`,`,
  `    categorySlug: "react",`,
  `    title,`,
  `    content,`,
  `    explanation,`,
  `    difficulty,`,
  `    type: "EXPLANATION",`,
  `    tags,`,
  `    answers: [{ content: answerHtml, isCorrect: true }],`,
  `  };`,
  `}`,
  ``,
  `export const reactInterviewGuideQuestions: SeedQuestion[] = [`,
];

for (const q of QUESTIONS) {
  const tags = JSON.stringify(q.tags ?? ["react", "interview"]);
  const esc = (s) =>
    s
      .replace(/\\/g, "\\\\")
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");
  lines.push(
    `  guideQuestion(${q.n}, ${JSON.stringify(q.slug)}, ${JSON.stringify(q.title)}, ${JSON.stringify(q.content)}, \`${esc(q.answer)}\`, "${q.difficulty}", ${tags}),`,
  );
}

lines.push(`];`, ``);

const outPath = join(__dirname, "../prisma/data/react-interview-guide.ts");
writeFileSync(outPath, lines.join("\n"), "utf8");
console.log(`Wrote ${QUESTIONS.length} questions to ${outPath}`);
