import type { SeedQuestion } from "./types";

export const uiSystemDesignQuestions: SeedQuestion[] = [
  {
    id: "seed-uisd-design-tokens",
    categorySlug: "ui-system-design",
    title: "Design tokens hierarchy",
    content:
      "How would you structure design tokens for a multi-brand product so components stay themeable without hard-coding colors in JSX?",
    explanation:
      "Use a three-tier token model: primitive → semantic → component tokens, resolved via CSS variables or a theme provider.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["design-tokens", "theming", "architecture", "interview"],
    answers: [
      {
        content: `Short Answer
Separate primitive values (raw palette) from semantic aliases (text.primary, surface.danger) and optional component tokens. Components consume semantic or component tokens only—never raw hex in JSX.

Detailed Answer
Primitive tokens hold raw values: color.blue.500, space.4, font.size.200. Semantic tokens map intent to primitives: color.text.primary, color.bg.surface, space.stack.md. Component tokens are rare escape hatches: button.bg.primary may alias color.action.primary.

At runtime, emit CSS custom properties (or a theme object) from the active brand. Switching brand swaps the primitive/semantic map; component code stays unchanged. Avoid exporting every primitive into the public API—teams will bypass semantics and break theming.

Example
--color-blue-500: #2563eb;          /* primitive */
--color-action-primary: var(--color-blue-500); /* semantic */
--button-bg: var(--color-action-primary);      /* component */

What The Interviewer Expects
• Names the primitive → semantic → component layers
• Says components should not hard-code raw colors
• Mentions CSS variables or a theme provider for brand switching
• Warns against leaking primitives as the public contract`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-headless-vs-styled",
    categorySlug: "ui-system-design",
    title: "Headless vs styled primitives",
    content:
      "When building a company design system, when would you ship headless primitives (behavior only) versus fully styled components?",
    explanation:
      "Use headless for complex interactive behavior reused across looks; use styled components for brand-consistent defaults that most product teams should adopt as-is.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["headless", "components", "design-system", "interview"],
    answers: [
      {
        content: `Short Answer
Ship styled components as the default product path for consistency. Offer headless (or unstyled) primitives when behavior is complex and multiple visual skins or white-label products need the same interaction model.

Detailed Answer
Styled components encode visual language—spacing, typography, states—and accelerate teams that should look the same. Headless libraries (focus traps, listboxes, menus) encode accessibility and keyboard behavior without opinionated CSS.

A practical split: core DS Button/Input/Card are styled; Combobox/Dialog/DatePicker may expose a headless core plus a styled recipe. Forcing every consumer through headless increases inconsistency; forcing every skin through one styled Button blocks white-label work.

Example
@company/ui          → styled Button, TextField, Modal
@company/ui-headless → useListbox, useDialog (ARIA + state)
@company/ui recipes  → Listbox that composes headless + tokens

What The Interviewer Expects
• Distinguishes behavior (a11y/state) from visual skin
• Recommends styled defaults for brand consistency
• Reserves headless for complex widgets or multi-brand skins
• Mentions accessibility ownership in the headless layer`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-composition-api",
    categorySlug: "ui-system-design",
    title: "Composition over prop explosion",
    content:
      "A Modal component has grown to 40 props (title, footer, sizes, icons, close behavior). How would you redesign the API for flexibility without a prop explosion?",
    explanation:
      "Prefer compound components and slots (Modal.Header, Modal.Body, Modal.Footer) with a small set of shared props and context.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["api-design", "composition", "react", "interview"],
    answers: [
      {
        content: `Short Answer
Replace boolean/config props with compound components and slots. Keep a tiny root API (open, onOpenChange, size) and let structure live in JSX children.

Detailed Answer
Prop explosion happens when every layout variant becomes a boolean. Compound components share context (id, labeledBy, dismiss) while callers compose the structure they need. Slots or render props cover rare escapes without baking every case into the root.

Document canonical recipes (confirm dialog, form dialog) so teams do not reinvent layouts. Reserve high-level wrappers for the 80% case; keep primitives composable for the 20%.

Example
<Modal open={open} onOpenChange={setOpen} size="md">
  <Modal.Header>
    <Modal.Title>Delete project</Modal.Title>
    <Modal.Close />
  </Modal.Header>
  <Modal.Body>...</Modal.Body>
  <Modal.Footer>
    <Button variant="ghost">Cancel</Button>
    <Button variant="danger">Delete</Button>
  </Modal.Footer>
</Modal>

What The Interviewer Expects
• Calls out compound components / slots vs boolean props
• Keeps accessibility wiring in shared context
• Offers recipe wrappers for common patterns
• Avoids "just add another prop" as the long-term answer`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-theming-dark-mode",
    categorySlug: "ui-system-design",
    title: "Dark mode without duplication",
    content:
      "How do you implement light/dark (and high-contrast) themes in a design system without duplicating every component stylesheet?",
    explanation:
      "Theme via semantic tokens and CSS variables (or a theme context); components reference tokens so one stylesheet works for all themes.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["theming", "dark-mode", "css-variables", "interview"],
    answers: [
      {
        content: `Short Answer
Define semantic tokens once; swap token values per theme on a root attribute/class. Components only read tokens, so stylesheets are not copied per theme.

Detailed Answer
Put theme values on :root[data-theme="light|dark|hc"] or .theme-dark. Prefer color-scheme and relative color where helpful, but keep brand colors in tokens. Prefer prefers-color-scheme as a default with an explicit user override stored in preference.

Avoid separate .Button--dark CSS files. Avoid baking theme branches into every React component. Test contrast per theme; high-contrast may need its own semantic map, not just inverted colors.

Example
:root[data-theme="light"] { --color-bg: #fff; --color-text: #111; }
:root[data-theme="dark"]  { --color-bg: #0b0b0c; --color-text: #f5f5f5; }
.button { background: var(--color-action-primary); color: var(--color-on-action); }

What The Interviewer Expects
• Semantic tokens + CSS variables (or equivalent)
• One component stylesheet across themes
• User preference override vs system preference
• Mentions contrast/accessibility for dark and HC themes`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-a11y-contracts",
    categorySlug: "ui-system-design",
    title: "Accessibility contracts in a DS",
    content:
      "What accessibility guarantees should a design system own at the component level versus leave to product teams?",
    explanation:
      "The DS owns keyboard interaction, ARIA roles/states, focus management, and contrast defaults; products own content meaning, page structure, and custom compositions.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["a11y", "design-system", "aria", "interview"],
    answers: [
      {
        content: `Short Answer
Design system components must ship correct roles, keyboard behavior, focus traps/restore, labeling APIs, and contrast-safe defaults. Product teams own meaningful labels, heading order, page landmarks, and any custom assembly of primitives.

Detailed Answer
If Dialog does not trap focus or restore it on close, every consumer ships a bug. If Button cannot accept aria-label / visible text cleanly, icon-only buttons fail. Provide lintable APIs (required label, describedBy) and document do/don'ts.

Do not pretend the DS can make an inaccessible page accessible—teams still misuse headings and hide content. Pair components with testing helpers (axe in CI, interaction tests for Escape/Tab) and Storybook a11y stories for each interactive pattern.

Example
DS owns: Modal focus trap, Listbox arrow keys, Switch role="switch"
Product owns: "Delete invoice #182" accessible name, h1/h2 outline, skip link placement

What The Interviewer Expects
• Clear split of DS vs product a11y ownership
• Concrete examples (focus, ARIA, labeling APIs)
• Mentions testing/Storybook as enforcement
• Does not claim tokens alone equal accessibility`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-versioning",
    categorySlug: "ui-system-design",
    title: "Versioning a design system",
    content:
      "You need to rename Button variants and remove a deprecated spacing token used by 12 product apps. How do you version and roll out the change?",
    explanation:
      "Use semver (major for breaking), codemods/migration guides, dual-run deprecation windows, and staggered adoption—not a silent swap on latest.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["versioning", "semver", "migration", "interview"],
    answers: [
      {
        content: `Short Answer
Treat visual/API breaks as semver majors. Deprecate with warnings and dual support, publish a migration guide/codemod, then remove in the next major after adopters upgrade.

Detailed Answer
Additive tokens/components are minor; bugfixes are patch; renaming props, removing tokens, or changing default visuals that break layouts are major. Keep old names as aliases during a deprecation window with console/docs warnings.

For monorepos, a single major bump can land with a codemod CI check. For polyrepos, support N and N-1 briefly, track adoption dashboards, and avoid forcing "always latest" without automation. Never change token meaning in place (blue.500 suddenly red)—add a new token instead.

Example
v5: variant="primary" (current)
v6: deprecate primary → solid; alias remains
v7: remove primary; codemod rewrites JSX

What The Interviewer Expects
• Semver mental model for DS changes
• Deprecation window + migration path/codemod
• Avoids silent semantic changes to existing tokens
• Considers multi-app rollout reality`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-layout-spacing",
    categorySlug: "ui-system-design",
    title: "Spacing and layout scale",
    content:
      "Why do design systems use a spacing scale (4/8pt) and layout primitives (Stack, Cluster, Grid) instead of letting every page invent margin values?",
    explanation:
      "A constrained scale creates rhythm and consistency; layout primitives encode alignment/gap patterns so product UI does not accumulate magic numbers.",
    difficulty: "BEGINNER",
    type: "FLASHCARD",
    tags: ["spacing", "layout", "design-system", "interview"],
    answers: [
      {
        content: `Short Answer
A spacing scale limits arbitrary margins to a rhythmic set of values. Layout primitives apply that scale as gap/padding so screens stay consistent and refactors stay mechanical.

Detailed Answer
Magic numbers (13px, 27px) break visual rhythm and make responsive tweaks noisy. Scales (4, 8, 12, 16, 24…) map to tokens like space.2 / space.4. Stack/Cluster/Grid accept gap tokens and alignment props, replacing one-off flex wrappers.

Prefer gap on parents over margin on children to avoid margin collapse and double-spacing bugs. Document when to break the scale (hairlines, optical adjustments) so exceptions stay rare.

Example
<Stack gap="4" align="stretch">
  <PageHeader />
  <ContentGrid columns={{ md: 2, lg: 3 }} gap="6" />
</Stack>

What The Interviewer Expects
• Explains rhythm/consistency benefit of a scale
• Mentions layout primitives over ad-hoc flex+margin
• Prefers gap tokens over scattered margins
• Notes that exceptions should be intentional`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-form-patterns",
    categorySlug: "ui-system-design",
    title: "Form field pattern",
    content:
      "Design a reusable Field pattern for your UI system that supports label, hint, error, and control without breaking accessibility.",
    explanation:
      "Compose Label + Control + Hint/Error with shared ids (htmlFor, aria-describedby) via a Field context so any control plugs in correctly.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["forms", "a11y", "composition", "interview"],
    answers: [
      {
        content: `Short Answer
Provide a Field compound component that wires id, label, describedBy (hint/error), and invalid state through context so Input/Select/Textarea stay accessible by default.

Detailed Answer
Each field needs a stable id, a visible label (or carefully justified aria-label), and aria-describedby pointing at hint and/or error elements. aria-invalid reflects error state. Do not rely on placeholder as the only label.

Keep validation messaging ownership flexible: Field can accept error text from form libraries (React Hook Form, Formik) without owning schema logic. Ensure error text is in the accessibility tree when shown, and that focus moves sensibly on submit errors at the form level.

Example
<Field isInvalid={!!errors.email}>
  <Field.Label>Email</Field.Label>
  <Field.Control asChild><Input type="email" /></Field.Control>
  <Field.Hint>Work email preferred</Field.Hint>
  <Field.Error>{errors.email}</Field.Error>
</Field>

What The Interviewer Expects
• Correct label/control linking and describedby
• aria-invalid / error announcement awareness
• Composition that works with any control
• Does not use placeholder as the sole label`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-adoption-governance",
    categorySlug: "ui-system-design",
    title: "Design system adoption",
    content:
      "Product teams keep building one-off buttons that drift from the design system. How would you improve adoption without becoming a bottleneck?",
    explanation:
      "Combine excellent defaults and docs, lint/codemod enforcement, contribution paths, and design-dev pairing—governance with enablement, not only bans.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["governance", "adoption", "process", "interview"],
    answers: [
      {
        content: `Short Answer
Make the right path easiest: solid components, Figma↔code parity, searchable docs, and lint rules against raw HTML buttons in app code. Offer a contribution RFC path for missing variants instead of silent forks.

Detailed Answer
Adoption fails when the DS is incomplete, hard to find, or slow to extend. Measure usage (bundle imports, Figma library attach rate). Add ESLint boundaries that flag \`<button>\` / ad-hoc CSS in product packages while allowing exceptions in the DS package itself.

Staff a clear intake: request → design critique → API proposal → release. Embed DS engineers in high-churn product squads periodically. Celebrate migrations with codemods. Pure policework without velocity creates shadow UI.

Example
eslint-plugin-company: no-raw-button in apps/*
Contribution template: use case, a11y notes, token needs, screenshots
Dashboard: % of UI PRs importing @company/ui

What The Interviewer Expects
• Enablement (docs, parity, speed) plus light enforcement
• Contribution model for gaps
• Metrics for adoption
• Avoids "only ban everything" as the whole strategy`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-responsive-tokens",
    categorySlug: "ui-system-design",
    title: "Responsive token strategies",
    content:
      "Should typography and spacing tokens change across breakpoints inside the design system, or should product layouts handle all responsiveness?",
    explanation:
      "Keep most tokens stable; use responsive variants sparingly for foundational type/space, and let layout primitives own structural breakpoint changes.",
    difficulty: "INTERMEDIATE",
    type: "FLASHCARD",
    tags: ["responsive", "tokens", "typography", "interview"],
    answers: [
      {
        content: `Short Answer
Tokens stay mostly breakpoint-agnostic. Offer a small set of responsive fluid/type scales at the foundation layer; structural changes (columns, stacking) belong in layout primitives and product composition.

Detailed Answer
If every token is responsive, themes become unpredictable and hard to reason about in Figma and code. Common pattern: fixed space scale; fluid or stepped font-size tokens for display/body; layout components accept responsive props (columns={{ sm: 1, md: 2 }}).

Container queries increasingly beat viewport assumptions for components reused in side panels vs full pages—document when components use @container vs media queries.

Example
--font-size-body: clamp(1rem, 0.95rem + 0.3vw, 1.125rem);
<Grid columns={{ base: 1, md: 2, xl: 3 }} gap="6" />

What The Interviewer Expects
• Does not make every token responsive
• Separates foundational type/space from layout structure
• Mentions layout primitives / responsive props
• Bonus: container queries for reusable components`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-cross-framework",
    categorySlug: "ui-system-design",
    title: "Cross-framework design systems",
    content:
      "Your company has React and Vue apps. How would you share a design system without maintaining two divergent component libraries forever?",
    explanation:
      "Share tokens and CSS (or Web Components) as the source of truth; keep thin framework wrappers for idiomatic APIs—or standardize on one framework for UI if feasible.",
    difficulty: "ADVANCED",
    type: "FLASHCARD",
    tags: ["architecture", "web-components", "tokens", "interview"],
    answers: [
      {
        content: `Short Answer
Share design tokens and styles as the canonical layer. Prefer one implementation technology (CSS + Web Components, or a single framework) with thin adapters, rather than two fully separate React and Vue libraries that will drift.

Detailed Answer
Dual full libraries double a11y and API work. Practical approaches: (1) token package + CSS package consumed everywhere; (2) Web Components for interactive primitives with React/Vue wrappers; (3) organizational standard that new UI is React-only and Vue is legacy.

If wrappers exist, generate or document prop parity, share visual regression tests against the same stories, and version tokens independently so brand updates land once. Avoid "pixel parity later" without shared fixtures—drift is inevitable.

Example
@company/tokens → JSON/CSS variables
@company/styles → button.css using tokens
@company/react  → <Button> wrapping WC or class hooks
@company/vue    → <CompanyButton> thin SFC wrapper

What The Interviewer Expects
• Puts tokens/styles at the shared core
• Names Web Components or single-framework strategy
• Acknowledges dual full libraries as costly
• Mentions testing parity across wrappers`,
        isCorrect: true,
      },
    ],
  },
  {
    id: "seed-uisd-measure-success",
    categorySlug: "ui-system-design",
    title: "Measuring DS success",
    content:
      "What metrics would you use to show leadership that the UI design system is working?",
    explanation:
      "Track adoption, time-to-UI, consistency/defect rates, and accessibility—not vanity storybook page views alone.",
    difficulty: "BEGINNER",
    type: "MULTIPLE_CHOICE",
    tags: ["metrics", "governance", "interview"],
    answers: [
      {
        content:
          "Adoption rate, time to ship UI, UI defect/a11y regressions, and design-dev consistency—not only Storybook traffic",
        isCorrect: true,
      },
      {
        content: "Number of colors in the Figma file only",
        isCorrect: false,
      },
      {
        content: "How many times the DS repo is starred on GitHub",
        isCorrect: false,
      },
      {
        content: "Total lines of CSS deleted from one random PR",
        isCorrect: false,
      },
    ],
  },
];
