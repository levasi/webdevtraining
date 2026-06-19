import type { SeedQuestion } from "./types";

export const testingQuestions: SeedQuestion[] = [
  {
    id: "seed-test-unit",
    categorySlug: "testing",
    title: "Unit tests",
    content: "What do unit tests typically isolate?",
    explanation: "A single function/module with dependencies mocked.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["unit"],
    answers: [
      { content: "Smallest testable unit with dependencies mocked or stubbed.", isCorrect: true },
    ],
  },
  {
    id: "seed-test-integration",
    categorySlug: "testing",
    title: "Integration tests",
    content: "How do integration tests differ from unit tests?",
    explanation: "They verify interaction between modules or real dependencies like DB.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["integration"],
    answers: [
      { content: "Test multiple components or real services together", isCorrect: true },
      { content: "Always run in browser only", isCorrect: false },
      { content: "Never touch database", isCorrect: false },
      { content: "Replace all assertions", isCorrect: false },
    ],
  },
  {
    id: "seed-test-e2e",
    categorySlug: "testing",
    title: "E2E tests",
    content: "What do end-to-end tests validate?",
    explanation: "Full user flows through the real UI and backend stack.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["e2e"],
    answers: [
      { content: "Complete user journeys across UI, API, and data layers.", isCorrect: true },
    ],
  },
  {
    id: "seed-test-mock",
    categorySlug: "testing",
    title: "Mocks vs stubs",
    content: "What extra capability do mocks have over stubs?",
    explanation: "Mocks verify interactions (calls, args) in addition to return values.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["mocking"],
    answers: [
      { content: "Verify how dependencies were called", isCorrect: true },
      { content: "Always run slower", isCorrect: false },
      { content: "Only work in E2E", isCorrect: false },
      { content: "Replace production code", isCorrect: false },
    ],
  },
  {
    id: "seed-test-tdd",
    categorySlug: "testing",
    title: "TDD cycle",
    content: "What are the three steps of TDD?",
    explanation: "Red, Green, Refactor.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["tdd"],
    answers: [
      { content: "Red, Green, Refactor", isCorrect: true },
      { content: "Plan, Code, Deploy", isCorrect: false },
      { content: "Write, Review, Merge", isCorrect: false },
      { content: "Mock, Test, Ship", isCorrect: false },
    ],
  },
  {
    id: "seed-test-coverage",
    categorySlug: "testing",
    title: "Code coverage limits",
    content: "Is 100% coverage sufficient for quality?",
    explanation: "Coverage measures lines executed, not correctness of assertions.",
    difficulty: "INTERMEDIATE",
    type: "TRUE_FALSE",
    tags: ["coverage"],
    answers: [
      { content: "False", isCorrect: true },
      { content: "True", isCorrect: false },
    ],
  },
  {
    id: "seed-test-snapshot",
    categorySlug: "testing",
    title: "Snapshot testing",
    content: "What is a common pitfall of snapshot tests?",
    explanation: "Developers may blindly update snapshots without reviewing changes.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["snapshots"],
    answers: [
      { content: "Easy to accept regressions by updating snapshots without review.", isCorrect: true },
    ],
  },
  {
    id: "seed-test-arrange-act-assert",
    categorySlug: "testing",
    title: "AAA pattern",
    content: "What does Arrange-Act-Assert mean?",
    explanation: "Setup test data, execute behavior, verify outcome.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["patterns"],
    answers: [
      { content: "Setup fixtures, execute code under test, assert expected outcome.", isCorrect: true },
    ],
  },
];

export const securityQuestions: SeedQuestion[] = [
  {
    id: "seed-sec-xss",
    categorySlug: "security",
    title: "XSS prevention",
    content: "How do you mitigate reflected XSS in React apps?",
    explanation: "React escapes by default; avoid dangerouslySetInnerHTML; sanitize HTML.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["xss"],
    answers: [
      { content: "Escape output, avoid unsafe HTML, sanitize when needed", isCorrect: true },
      { content: "Store passwords in localStorage", isCorrect: false },
      { content: "Disable HTTPS", isCorrect: false },
      { content: "Use GET for mutations", isCorrect: false },
    ],
  },
  {
    id: "seed-sec-csrf",
    categorySlug: "security",
    title: "CSRF",
    content: "What is a CSRF attack?",
    explanation: "Tricks a user's browser into making authenticated unwanted requests.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["csrf"],
    answers: [
      { content: "Forges authenticated requests from a victim's browser session.", isCorrect: true },
    ],
  },
  {
    id: "seed-sec-sql-injection",
    categorySlug: "security",
    title: "SQL injection",
    content: "Best defense against SQL injection?",
    explanation: "Parameterized queries / ORM prepared statements.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["injection"],
    answers: [
      { content: "Parameterized queries / prepared statements", isCorrect: true },
      { content: "String concatenation with escaping only", isCorrect: false },
      { content: "Hide SQL errors from users only", isCorrect: false },
      { content: "Use GET requests", isCorrect: false },
    ],
  },
  {
    id: "seed-sec-jwt-storage",
    categorySlug: "security",
    title: "JWT storage",
    content: "Why avoid storing JWTs in localStorage?",
    explanation: "Accessible to any XSS script on the page.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["auth", "jwt"],
    answers: [
      { content: "XSS can read localStorage; prefer httpOnly secure cookies.", isCorrect: true },
    ],
  },
  {
    id: "seed-sec-cors",
    categorySlug: "security",
    title: "CORS is not auth",
    content: "Does CORS protect your API from unauthorized access?",
    explanation: "CORS is a browser policy; server must still authenticate requests.",
    difficulty: "INTERMEDIATE",
    type: "TRUE_FALSE",
    tags: ["cors"],
    answers: [
      { content: "False", isCorrect: true },
      { content: "True", isCorrect: false },
    ],
  },
  {
    id: "seed-sec-hash-password",
    categorySlug: "security",
    title: "Password hashing",
    content: "Which algorithm should you use to hash passwords?",
    explanation: "Adaptive algorithms like bcrypt, scrypt, or Argon2.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["passwords"],
    answers: [
      { content: "bcrypt, scrypt, or Argon2", isCorrect: true },
      { content: "MD5", isCorrect: false },
      { content: "SHA-256 alone", isCorrect: false },
      { content: "Base64 encoding", isCorrect: false },
    ],
  },
  {
    id: "seed-sec-rate-limit",
    categorySlug: "security",
    title: "Rate limiting",
    content: "Why rate limit login endpoints?",
    explanation: "Mitigate brute-force and credential stuffing attacks.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["rate-limiting"],
    answers: [
      { content: "Slow brute-force and automated credential attacks.", isCorrect: true },
    ],
  },
  {
    id: "seed-sec-https",
    categorySlug: "security",
    title: "HTTPS everywhere",
    content: "What does HTTPS protect on the wire?",
    explanation: "Confidentiality and integrity via TLS encryption.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["tls"],
    answers: [
      { content: "Encrypts data in transit", isCorrect: true },
      { content: "Encrypts data at rest in database", isCorrect: false },
      { content: "Prevents all XSS", isCorrect: false },
      { content: "Removes need for auth", isCorrect: false },
    ],
  },
];

export const performanceQuestions: SeedQuestion[] = [
  {
    id: "seed-perf-lcp",
    categorySlug: "performance",
    title: "Largest Contentful Paint",
    content: "What does LCP measure?",
    explanation: "Time until largest visible content element renders.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["web-vitals"],
    answers: [
      { content: "Largest visible content paint time", isCorrect: true },
      { content: "Time to first byte only", isCorrect: false },
      { content: "JavaScript parse time", isCorrect: false },
      { content: "Server CPU usage", isCorrect: false },
    ],
  },
  {
    id: "seed-perf-cls",
    categorySlug: "performance",
    title: "Cumulative Layout Shift",
    content: "What causes poor CLS scores?",
    explanation: "Unexpected layout shifts like images without dimensions or late ads.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["web-vitals"],
    answers: [
      { content: "Content shifting after load without reserved space.", isCorrect: true },
    ],
  },
  {
    id: "seed-perf-lazy-loading",
    categorySlug: "performance",
    title: "Lazy loading images",
    content: "How do you native lazy load images in HTML?",
    explanation: "loading='lazy' attribute on img.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["images"],
    answers: [
      { content: 'loading="lazy"', isCorrect: true },
      { content: 'defer="true"', isCorrect: false },
      { content: 'async="lazy"', isCorrect: false },
      { content: "data-lazy only", isCorrect: false },
    ],
  },
  {
    id: "seed-perf-code-splitting",
    categorySlug: "performance",
    title: "Code splitting",
    content: "What is code splitting in frontend apps?",
    explanation: "Load JavaScript in smaller chunks on demand.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["bundling"],
    answers: [
      { content: "Split bundles so users download only code needed for current route.", isCorrect: true },
    ],
  },
  {
    id: "seed-perf-cdn",
    categorySlug: "performance",
    title: "CDN benefits",
    content: "Why use a CDN for static assets?",
    explanation: "Serve content from edge locations closer to users.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["cdn"],
    answers: [
      { content: "Reduce latency by caching assets geographically near users.", isCorrect: true },
    ],
  },
  {
    id: "seed-perf-debounce",
    categorySlug: "performance",
    title: "Debounce vs throttle",
    content: "When use debounce on search input?",
    explanation: "Wait until user stops typing before firing expensive search.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["javascript"],
    answers: [
      { content: "Delay execution until input pauses", isCorrect: true },
      { content: "Run at fixed intervals while typing", isCorrect: false },
      { content: "Run only once ever", isCorrect: false },
      { content: "Replace server caching", isCorrect: false },
    ],
  },
  {
    id: "seed-perf-memoization",
    categorySlug: "performance",
    title: "Memoization",
    content: "When is memoization helpful?",
    explanation: "Expensive pure computations called repeatedly with same inputs.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["caching"],
    answers: [
      { content: "Cache results of expensive pure functions with repeated inputs.", isCorrect: true },
    ],
  },
  {
    id: "seed-perf-db-n-plus-one",
    categorySlug: "performance",
    title: "N+1 query problem",
    content: "What is the N+1 query problem?",
    explanation: "One query for list plus N queries per item instead of a join/include.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["database"],
    answers: [
      { content: "1 query for parents + N queries for each child instead of batching.", isCorrect: true },
    ],
  },
];

export const systemDesignQuestions: SeedQuestion[] = [
  {
    id: "seed-sd-load-balancer",
    categorySlug: "system-design",
    title: "Load balancer role",
    content: "What does a load balancer do?",
    explanation: "Distributes traffic across multiple servers.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["infrastructure"],
    answers: [
      { content: "Distribute incoming requests across healthy backend instances.", isCorrect: true },
    ],
  },
  {
    id: "seed-sd-horizontal-vertical",
    categorySlug: "system-design",
    title: "Horizontal vs vertical scaling",
    content: "Difference between horizontal and vertical scaling?",
    explanation: "Horizontal adds machines; vertical adds resources to one machine.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["scaling"],
    answers: [
      { content: "Horizontal adds nodes; vertical adds power to one node", isCorrect: true },
      { content: "They mean the same", isCorrect: false },
      { content: "Vertical only applies to CDN", isCorrect: false },
      { content: "Horizontal removes redundancy", isCorrect: false },
    ],
  },
  {
    id: "seed-sd-cache",
    categorySlug: "system-design",
    title: "Caching layers",
    content: "Why add Redis in front of a database?",
    explanation: "Reduce read latency and database load for hot data.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["caching"],
    answers: [
      { content: "Speed up reads and reduce load on primary database.", isCorrect: true },
    ],
  },
  {
    id: "seed-sd-cdn",
    categorySlug: "system-design",
    title: "CDN in system design",
    content: "Where does a CDN sit in a typical web architecture?",
    explanation: "Between users and origin for static/cacheable content.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["cdn"],
    answers: [
      { content: "Edge layer in front of origin for static assets", isCorrect: true },
      { content: "Inside the database", isCorrect: false },
      { content: "Replacing application servers", isCorrect: false },
      { content: "Only for CI/CD", isCorrect: false },
    ],
  },
  {
    id: "seed-sd-cap",
    categorySlug: "system-design",
    title: "CAP theorem",
    content: "In CAP, what must a distributed system trade off during a partition?",
    explanation: "Consistency vs availability.",
    difficulty: "ADVANCED",
    type: "MULTIPLE_CHOICE",
    tags: ["distributed-systems"],
    answers: [
      { content: "Consistency vs availability", isCorrect: true },
      { content: "Latency vs bandwidth", isCorrect: false },
      { content: "Security vs usability only", isCorrect: false },
      { content: "Nothing; all three always hold", isCorrect: false },
    ],
  },
  {
    id: "seed-sd-microservices",
    categorySlug: "system-design",
    title: "Microservices trade-offs",
    content: "One downside of microservices vs monolith?",
    explanation: "Operational complexity, network latency, distributed debugging.",
    difficulty: "INTERMEDIATE",
    type: "MULTIPLE_CHOICE",
    tags: ["architecture"],
    answers: [
      { content: "Higher operational and networking complexity", isCorrect: true },
      { content: "Impossible to scale", isCorrect: false },
      { content: "No independent deployments", isCorrect: false },
      { content: "Cannot use HTTP", isCorrect: false },
    ],
  },
  {
    id: "seed-sd-message-queue",
    categorySlug: "system-design",
    title: "Message queues",
    content: "When use a message queue like RabbitMQ or SQS?",
    explanation: "Decouple producers/consumers and smooth traffic spikes.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["messaging"],
    answers: [
      { content: "Async work, decoupling services, and buffering traffic spikes.", isCorrect: true },
    ],
  },
  {
    id: "seed-sd-sharding",
    categorySlug: "system-design",
    title: "Database sharding",
    content: "What is database sharding?",
    explanation: "Splitting data across multiple database instances by shard key.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["database"],
    answers: [
      { content: "Partition data across multiple DB nodes using a shard key.", isCorrect: true },
    ],
  },
  {
    id: "seed-sd-microfrontends",
    categorySlug: "system-design",
    title: "Microfrontends Architecture",
    content:
      "You work on a large e-commerce platform where the Product, Checkout, and Account teams release features frequently. Because everything is inside a single frontend application, teams constantly block each other. How would you solve this problem?",
    explanation:
      "Microfrontends solve frontend team-scaling and deployment challenges by splitting a large app into independently developed and deployed domain-focused applications.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["architecture", "microfrontends", "interview"],
    answers: [
      {
        content: `What are Microfrontends?

Microfrontends are an architectural approach where a large frontend application is split into smaller, independently developed and deployed applications. Each team owns a specific business domain such as Checkout, Product Catalog, User Account, or Admin.

Problem

In a traditional frontend monolith, all teams work within the same codebase.

Common issues:
• Slow releases
• Large pull requests
• Merge conflicts
• Teams blocking each other
• Difficult testing
• Long build times
• Risk of one bug affecting the entire application
• Difficult scalability as the application grows

Suggested Solution

I would consider a Microfrontend architecture where the application is divided by business domains.

Architecture Example:

Shell Application
├── Product Microfrontend
├── Cart Microfrontend
├── Checkout Microfrontend
├── Account Microfrontend
└── Admin Microfrontend

The Shell Application is responsible for:
• Routing
• Authentication
• Global layout
• Navigation
• Shared configuration
• Loading microfrontends

Each Microfrontend owns:
• User Interface
• State management
• API integrations
• Testing
• Deployment pipeline

Implementation Approaches

1. Module Federation
The shell application loads remote applications at runtime.
Examples: products.company.com, checkout.company.com, account.company.com
Advantages: Independent deployments, team autonomy, runtime composition, suitable for large organizations

2. Route-Based Microfrontends
Each route belongs to a different application.
Examples: /products → Product App, /cart → Cart App, /checkout → Checkout App, /account → Account App
Advantages: Simple architecture, easy to understand, lower complexity

3. Web Components
Each microfrontend exposes custom HTML elements.
Advantages: Framework agnostic, Vue/React/Angular can coexist, good encapsulation

4. Iframe-Based Integration
Each application is loaded inside an iframe.
Advantages: Strong isolation, useful for legacy applications
Disadvantages: Difficult communication, styling limitations, SEO challenges, potential UX issues

Common Challenges
• Shared state management
• Authentication
• Consistent design
• Dependency duplication
• Performance optimization
• Routing conflicts
• Error handling
• Testing strategies
• Version management

How to Solve These Challenges

Shared Design System
Create reusable UI components: buttons, forms, modals, typography, colors, spacing.

Communication Between Microfrontends
Use custom events, an event bus, URL parameters, shared authentication, or backend APIs.

Example:
window.dispatchEvent(
  new CustomEvent('cart:updated', { detail: { itemsCount: 3 } })
)

Listening:
window.addEventListener('cart:updated', (event) => {
  console.log(event.detail.itemsCount)
})

Best Interview Answer

"I would not adopt Microfrontends simply because they are a popular trend. First, I would validate whether the organization truly has a team-scaling and deployment problem. If multiple teams need to work independently and release frequently, I would split the application by business domains rather than technical layers.

I would introduce a shell application responsible for routing, authentication, and shared configuration. Each microfrontend would own a specific business area such as Checkout, Product Catalog, or Account Management.

To maintain consistency, I would establish a shared design system and define clear contracts between applications through APIs, events, or shared TypeScript types. Depending on the complexity, I would start with route-based microfrontends or Module Federation while carefully managing performance, dependency sharing, and testing."

Key Takeaway

Microfrontends solve frontend team-scaling and deployment challenges by breaking a large frontend application into smaller, independently developed and deployed domain-focused applications.`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-sd-ms-bounded-context",
    categorySlug: "system-design",
    title: "Decomposing a monolith by bounded context",
    content:
      "Your team is splitting a monolithic e-commerce backend into microservices. Product managers want services aligned to 'Users', 'Database', and 'APIs'. How would you challenge this decomposition and propose a better service boundary strategy?",
    explanation:
      "Split by business capability and bounded context (e.g. Catalog, Orders, Payments), not technical layers.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["microservices", "architecture", "bounded-context", "interview"],
    answers: [
      {
        content: `Short Answer
Reject layer-based splits. Decompose around business capabilities and bounded contexts so each service owns its data, releases independently, and maps to how the organization actually operates.

Detailed Answer
Services named Users, Database, or APIs are technical layers, not domains. A Database service becomes a shared bottleneck; an APIs service is meaningless ownership. Instead, identify bounded contexts from domain-driven design: Catalog (products, pricing), Inventory, Cart, Orders, Payments, Notifications, and Identity.

Each context should have a clear ubiquitous language, autonomous persistence (database per service), and minimal coupling. Conway's Law applies: team structure should align with service boundaries. Start with the most painful coupling in the monolith—often checkout or inventory—and extract one service at a time with clear API contracts.

Example
Poor boundaries:
• User Service, Database Service, Cache Service

Better boundaries:
• Product Catalog Service — owns SKU, price, descriptions
• Order Service — owns order lifecycle and line items
• Payment Service — owns payment intents and provider webhooks
• Identity Service — owns auth tokens and user profiles

What The Interviewer Expects
• Mentions bounded context or business capability, not technical layers
• References database-per-service and independent deployment
• Acknowledges Conway's Law or team alignment
• Describes incremental extraction rather than big-bang rewrite`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-sd-ms-saga-checkout",
    categorySlug: "system-design",
    title: "Saga pattern for distributed checkout",
    content:
      "In a microservices checkout flow, Order, Inventory, and Payment are separate services. Payment succeeds but Inventory reservation fails afterward. You cannot use a single database transaction across services. How do you keep the system consistent?",
    explanation:
      "Use a saga (choreography or orchestration) with compensating transactions to undo completed steps on failure.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["microservices", "saga", "distributed-transactions", "interview"],
    answers: [
      {
        content: `Short Answer
Implement a saga: a sequence of local transactions with compensating actions. If a later step fails, run compensations (e.g. refund payment, release inventory) instead of relying on two-phase commit across services.

Detailed Answer
Cross-service ACID transactions (2PC) are fragile at scale—locks, coordinator failures, and tight coupling. A saga models the checkout as steps: reserve inventory → create order → charge payment → confirm order. Each step commits in its own service database.

If payment succeeds but inventory confirmation fails, execute compensations in reverse order: refund payment, cancel order, release reservation. Sagas can be choreographed (services react to events) or orchestrated (a central coordinator issues commands). Choose orchestration when the flow is complex; choreography when teams want loose coupling.

Trade-offs: eventual consistency, idempotent compensations, and visible intermediate states. Users may see 'payment processing' while compensations run. Design for at-least-once delivery and duplicate-safe handlers.

Example
Happy path:
1. Inventory.reserve(orderId) → reserved
2. Orders.create(orderId) → created
3. Payments.charge(orderId) → charged
4. Orders.confirm(orderId) → confirmed

Failure after step 3:
• Payments.refund(orderId)
• Orders.cancel(orderId)
• Inventory.release(orderId)

What The Interviewer Expects
• Explains why 2PC is often avoided in microservices
• Describes compensating transactions, not just rollback
• Compares choreography vs orchestration at a high level
• Mentions eventual consistency and idempotency`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-sd-ms-circuit-breaker",
    categorySlug: "system-design",
    title: "Circuit breaker for failing dependencies",
    content:
      "Your Order service calls Payment and Recommendation services. Payment is timing out intermittently, causing thread pool exhaustion and cascading failures across the platform. What pattern do you introduce and how does it behave?",
    explanation:
      "Apply a circuit breaker with open, half-open, and closed states to fail fast and allow recovery.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["microservices", "resilience", "circuit-breaker", "interview"],
    answers: [
      {
        content: `Short Answer
Add circuit breakers (and timeouts) on outbound calls so repeated failures trip the breaker to fail fast, protect upstream resources, and periodically probe for recovery.

Detailed Answer
Without protection, slow Payment responses block Order worker threads; retries amplify load; the outage spreads to unrelated endpoints. A circuit breaker tracks failure rate or latency. Closed: calls pass through. Open: calls fail immediately (return fallback or error) without waiting. Half-open: allow a probe request; success closes the breaker, failure reopens it.

Combine with timeouts shorter than client patience, bounded retries with jitter, and bulkheads (separate thread pools per dependency). For recommendations—a non-critical path—return cached or default results when the breaker is open. For payments—critical—surface a clear error and queue for retry rather than silently skipping.

Example
States:
• CLOSED — normal calls to Payment API
• OPEN — 50% failures in 10s → reject calls for 30s, return 503 + retry-after
• HALF_OPEN — one test call; if OK → CLOSED, else → OPEN

What The Interviewer Expects
• Names circuit breaker and describes three states
• Connects problem to cascading failure / thread exhaustion
• Distinguishes critical vs non-critical dependency handling
• Mentions timeouts, retries, or bulkheads as complementary`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-sd-ms-api-gateway",
    categorySlug: "system-design",
    title: "API Gateway in microservices",
    content:
      "Mobile and web clients currently call six internal microservices directly, each with different auth, rate limits, and URL structures. Product wants a single public API. What role does an API Gateway play and what should it not do?",
    explanation:
      "The gateway is the edge entry point for routing, auth, rate limiting, and aggregation—not business logic.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["microservices", "api-gateway", "architecture", "interview"],
    answers: [
      {
        content: `Short Answer
Place an API Gateway as the single public entry: terminate TLS, authenticate, rate-limit, route to internal services, and optionally aggregate responses. Keep domain logic inside services, not in the gateway.

Detailed Answer
Direct client-to-service coupling exposes internal topology, complicates auth (six token schemes), and leaks service URLs on every client release. The gateway provides a stable external contract (/api/v1/orders) while services refactor internally.

Typical responsibilities: request routing, JWT validation, API key management, rate limiting, CORS, request/response transformation, and protocol translation (HTTP to gRPC). BFF (Backend for Frontend) variants tailor payloads per client—mobile vs web—without bloating a single generic gateway.

Anti-patterns: implementing checkout rules, heavy orchestration, or shared databases in the gateway. That creates a new monolith at the edge. Use gateway aggregation only for read-heavy composite views; write flows stay in domain services or orchestrators.

Example
Client → API Gateway → /orders → Order Service
                      → /products → Catalog Service
                      → /pay → Payment Service

Gateway handles: OAuth2 validation, 100 req/min per user, request ID injection.

What The Interviewer Expects
• Lists edge concerns: auth, routing, rate limiting, TLS
• Warns against putting business logic in the gateway
• Mentions BFF or aggregation for read models optionally
• Explains decoupling clients from internal service topology`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-sd-ms-db-per-service",
    categorySlug: "system-design",
    title: "Database per service pattern",
    content:
      "Two microservices need customer order history. The Reporting team asks for direct read access to the Order service PostgreSQL database to build dashboards faster. How do you respond and what pattern keeps services autonomous?",
    explanation:
      "Enforce database per service; expose data via APIs or events, not shared database access.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["microservices", "data-ownership", "architecture", "interview"],
    answers: [
      {
        content: `Short Answer
Deny shared database access. Each service owns its schema; consumers use published APIs, read replicas fed by events, or a dedicated reporting store built from domain events.

Detailed Answer
Shared database coupling defeats microservice independence: schema changes in Orders break Reporting; connection pools contend; transactional boundaries blur. The database-per-service pattern means only the Order service writes to its order tables.

For reporting needs: (1) expose a stable Orders API with pagination and filters, (2) publish OrderCreated/OrderUpdated events to a stream that Reporting ingests into its own read-optimized store (CQRS), or (3) use change data capture (CDC) into a warehouse—with clear ownership and contracts.

Short-term shortcuts (shared views, cross-DB joins) create distributed monolith debt. Document SLAs on the API or event schema instead.

Example
Order Service owns orders DB → publishes order.placed event
Reporting Service owns analytics DB → subscribes, builds materialized views

Reporting never connects to Order's Postgres directly.

What The Interviewer Expects
• States clear data ownership per service
• Rejects shared DB with reasoning (coupling, schema drift)
• Offers API, events, CDC, or CQRS as alternatives
• Understands reporting/analytics as a separate read model`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-sd-ms-sync-vs-async",
    categorySlug: "system-design",
    title: "Sync vs async communication between services",
    content:
      "The Notification service must email users after every order. Order service developers propose a synchronous HTTP call from Order → Notification inside the request path so failures are immediately visible. What are the risks and what would you recommend instead?",
    explanation:
      "Prefer async messaging for side effects; keep the order request path fast and resilient to notification outages.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["microservices", "messaging", "communication", "interview"],
    answers: [
      {
        content: `Short Answer
Avoid synchronous notification in the critical path. Publish an OrderPlaced event or enqueue a job; Notification consumes asynchronously with retries and dead-letter handling.

Detailed Answer
Sync HTTP couples availability: if Notification is down, order placement fails or slows—email is a side effect, not core to committing an order. Sync also adds latency tail risk and tight runtime dependency.

Async patterns decouple: Order commits, publishes event to Kafka/SQS/RabbitMQ, returns 201 to client. Notification subscribes, sends email, retries on provider failure. Use outbox pattern so DB commit and event publish are atomic—write order + outbox row in one transaction, separate relay publishes to the bus.

Choose sync when you need an immediate read-your-writes response from another service (e.g. fraud check with sub-200ms SLA) and can handle fallback. Default to async for notifications, analytics, search indexing.

Example
Sync (problematic):
POST /orders → save order → POST notification-service/send → return

Async (preferred):
POST /orders → save order + outbox event → return
Background relay → OrderPlaced → Notification worker → SendGrid

What The Interviewer Expects
• Identifies availability coupling in sync side-effect calls
• Recommends events or message queue with retries
• Optionally mentions outbox pattern for reliable publishing
• Articulates when sync is still justified (blocking validations)`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-sd-ms-distributed-tracing",
    categorySlug: "system-design",
    title: "Debugging failures across microservices",
    content:
      "A user reports checkout failed with a generic error. The request touched API Gateway, Order, Payment, and Inventory services across twelve log entries with different timestamp formats and no shared identifier. How do you make this class of incident diagnosable?",
    explanation:
      "Implement distributed tracing, correlation IDs, and structured logging propagated across all service boundaries.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["microservices", "observability", "tracing", "interview"],
    answers: [
      {
        content: `Short Answer
Propagate a correlation/trace ID from the gateway through every service call; adopt OpenTelemetry for distributed traces, structured JSON logs, and centralized search (Jaeger, Tempo, Datadog).

Detailed Answer
Microservices shift complexity from code to operations. Without correlation, twelve isolated log lines cannot be stitched into one user journey. The API Gateway generates or accepts X-Request-ID / traceparent (W3C Trace Context) and forwards it on every hop—HTTP headers, message metadata, worker jobs.

Each service logs structured fields: traceId, spanId, service.name, userId, orderId, duration. OpenTelemetry SDKs create spans per operation; exporters send to a trace backend where you see waterfall latency per service. Metrics (error rate, p99 per dependency) complement traces. Alert on SLO burn, investigate with exemplar traces.

Also standardize error envelopes returned to clients (safe message + support reference ID mapped to trace).

Example
Gateway: traceId=abc123
  → Order Service [traceId=abc123] reserve started
  → Inventory [traceId=abc123] insufficient stock
  → Order [traceId=abc123] checkout failed

Single trace view shows Inventory as root cause in 400ms.

What The Interviewer Expects
• Correlation/trace ID propagation across sync and async paths
• Names distributed tracing (OpenTelemetry, Jaeger, etc.)
• Structured logging vs unstructured multiformat logs
• Links observability to incident response and SLOs`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-sd-ms-strangler-fig",
    categorySlug: "system-design",
    title: "Strangler fig migration from monolith",
    content:
      "You have a five-year-old monolith handling 80% of revenue. Leadership wants microservices in twelve months without a risky big-bang rewrite. Which migration strategy do you propose and how do you route traffic during the transition?",
    explanation:
      "Use the strangler fig pattern: incrementally replace monolith modules behind a facade or proxy that routes to old or new implementations.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["microservices", "migration", "strangler-fig", "interview"],
    answers: [
      {
        content: `Short Answer
Apply the strangler fig pattern: put a routing layer in front of the monolith, extract one bounded context at a time into a new service, and progressively shift traffic until the monolith can be retired.

Detailed Answer
Big-bang rewrites fail because requirements drift and risk is concentrated. Strangler fig grows new services around the monolith until it is 'strangled.' Steps: (1) identify extraction candidate with clear boundaries (e.g. Product Catalog), (2) build new service with parity tests against monolith behavior, (3) route specific routes or feature flags from API Gateway/proxy to new service, (4) dual-write or sync data during transition if needed, (5) decommission monolith module when traffic and data are fully migrated.

Start with read-heavy or less coupled domains before core checkout. Maintain rollback switches. Measure error rates and latency per route during cutover.

Example
/api/products/* → new Catalog Service (100% traffic)
/api/orders/*   → monolith (until Order service ready)
/api/orders/*   → Order Service (10% canary → 100%)

Monolith shrinks over quarters, not one release.

What The Interviewer Expects
• Names strangler fig and incremental extraction
• Describes routing layer or feature flags for gradual cutover
• Warns against big-bang rewrite
• Mentions parity testing, rollback, and sensible extraction order`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-sd-ms-idempotency",
    categorySlug: "system-design",
    title: "Idempotency in payment microservices",
    content:
      "Payment service clients retry POST /charges on network timeouts. Without safeguards, duplicate charges appear on customer accounts. How do you design the Payment API to handle duplicate requests safely?",
    explanation:
      "Require idempotency keys so retries replay the same result without double-charging.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["microservices", "idempotency", "payments", "interview"],
    answers: [
      {
        content: `Short Answer
Accept an Idempotency-Key header (client-generated UUID per logical operation). Store key + request hash + response; duplicate keys return the original result without re-executing payment.

Detailed Answer
At-least-once delivery is normal in distributed systems—load balancers, gateways, and mobile clients all retry. Payment must be exactly-once in business effect. On first request, persist idempotency record (key, status=processing), call payment provider, store result, return 201. On retry with same key, return cached 201/402 without calling provider again.

Keys should expire after 24–72 hours. Reject same key with different body (409). Use DB unique constraint on idempotency_key. For sagas, make each step idempotent too (provider may have its own idempotency token).

Example
POST /charges
Idempotency-Key: 7f3a9c2e-...

First attempt: timeout (client unknown if succeeded)
Retry with same key → server returns original chargeId, no second charge

What The Interviewer Expects
• Explains idempotency key pattern (Stripe-style)
• Distinguishes network retry from new payment intent
• Mentions storage of response and unique constraint
• Connects to broader at-least-once delivery in microservices`,
        isCorrect: true,
      },
    ],
  },
];
