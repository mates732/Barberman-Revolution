# Foundation Governance

## 1. Module Responsibilities

Every Foundation module has a strict responsibility boundary:

---

### `tokens/` — Immutable semantic values

**Responsibility**: Pure constant values that represent design or layout primitives.

**Permitted**:
- Spacing values (`SECTION_PADDING_Y`, `STICKY_IMAGE_HEIGHTS`)
- Size constants (`HERO_MIN_HEIGHT`, `IMAGE_GRAYSCALE`)
- Shadow definitions (text-shadow, box-shadow, drop-shadow class strings)
- Z-index ladder (single authority for all stacking order)
- Easing bezier arrays, spring configs

**Forbidden**:
- Business logic (derived values, conditional defaults)
- Component-specific values in the token **name** (e.g., `HEADER_*` prefix on a generic gold shadow)
- Runtime state, computed values
- Any value that mutates after initialization

**Validation**: Every export in `tokens/` must be either:
- A `const` literal (string, number, tuple)
- An `as const` record

---

### `motion/` — Reusable animation primitives

**Responsibility**: Animation hooks, easing functions, and scroll-driven transform logic that multiple components could consume.

**Permitted**:
- Pure easing functions (`easeLogo`)
- Scroll range constants (`LOGO_SCROLL_RANGE`)
- `use*` hooks that encapsulate framer-motion scroll/transform logic

**Forbidden**:
- Component implementations (hooks that reference specific DOM ids, specific component layout, or are only usable by one component)

**Exception** (documented):
- `useHeroMotion.ts` — lives in `motion/` as the first extracted hook to establish the extraction pattern. It references component-specific DOM (`#header-nav`, `#header-center-slot`) and is only consumed by `Hero.tsx`. This is a deliberate exception while the pattern matures. Future hooks must be generic enough to serve multiple consumers before entering `motion/`.

---

### `providers/` — Global application providers

**Responsibility**: React context providers that wrap the entire application tree.

**Permitted**:
- Context creation and export
- State machines for application-wide lifecycle
- `use*` hooks that expose context values (`useApp()`)
- Session/theme/auth providers

**Forbidden**:
- Page-specific state
- Component-specific state
- Direct DOM manipulation outside of React lifecycle
- Business logic that belongs in `controllers/`

**Current**:
- `AppProvider.tsx` — global lifecycle phase machine (`'intro' | 'running'`)

---

### `controllers/` — Application-wide orchestration

**Responsibility**: Framework-agnostic orchestration logic. No JSX, no React hooks.

**Permitted**:
- Scroll observer (consolidating 12 separate `useScroll` instances)
- Keyboard shortcut registry
- Analytics event bus
- Global event dispatchers

**Forbidden**:
- UI rendering
- Component lifecycle
- Direct DOM manipulation for visual effects

**Status**: Empty. Must not be populated until at least two distinct consumers exist.

---

### `hooks/` — Reusable domain-independent hooks

**Responsibility**: React hooks that are not tied to any specific component or domain.

**Permitted**:
- `useMediaQuery`, `useReducedMotion`, `usePrefersColorScheme`
- `useDebounce`, `useThrottle`, `usePrevious`
- `useIntersectionObserver` (generic, not component-specific)
- Any hook that has at least two potential consumers

**Forbidden**:
- Component-specific hooks (e.g., `useHeroScroll`)
- Hooks that depend on specific DOM structure
- Hooks that would only ever be used by one component

**Status**: Empty. Must not be populated until at least two distinct use cases exist.

---

### `utils/` — Pure helper functions

**Responsibility**: Framework-independent, side-effect-free functions.

**Permitted**:
- String formatting (`className` composition helpers)
- Number clamping, lerp, easing math
- Type guards
- Date formatting
- Pure data transformations

**Forbidden**:
- React imports
- DOM access
- Side effects
- Browser APIs (localStorage, sessionStorage, window, document)

**Status**: Empty. Must not be populated until a clearly reusable pure function is identified.

---

### `config/` — Global configuration

**Responsibility**: Application-wide configuration constants.

**Permitted**:
- Timeout durations
- Feature flags
- API endpoints (if any)
- Environment-conditional values

**Forbidden**:
- Runtime state
- Component-specific configuration
- Business logic
- Mutable values

**Current**:
- `app.ts` — `APP.SUCCESS_MESSAGE_DURATION`

---

## 2. Extraction Rules

Before extracting anything into Foundation, ask these questions:

| Question | If No |
|----------|-------|
| **Is it reused?** (Used in 2+ components today) | Keep it local |
| **Will another component use it?** (Clear future reuse) | Keep it local until reused |
| **Is it semantic?** (Name communicates intent, not mechanics) | Reconsider naming first |
| **Is it framework-independent?** (Could work without React) | Put in `utils/`, not `hooks/` |
| **Would moving it reduce duplication?** (Or just relocate it) | Only extract if duplication >= 2 |

**Golden rule**: If all answers are "yes", extract. If any is "no", keep local.

Exceptions require explicit documentation in this file.

---

## 3. Dependency Rules

```
┌──────────────────────────────────────────────────────────────┐
│                     APPLICATION CODE                          │
│  pages/  sections/  components/  features/  App.tsx  lib/    │
│                                                              │
│  May import from Foundation.                                 │
│  Must never be imported by Foundation.                       │
└──────────────────────────────────────────────────────────────┘
                              ▲
                              │ imports
                              │
┌──────────────────────────────────────────────────────────────┐
│                     FOUNDATION LAYER                          │
│  tokens/  motion/  providers/  controllers/  hooks/  utils/  │
│  config/                                                     │
│                                                              │
│  May import from:                                            │
│    • React and third-party libraries                         │
│    • Other Foundation modules (e.g., motion/ → tokens/)      │
│                                                              │
│  Must never import from:                                     │
│    • pages/  sections/  components/  features/               │
│    • lib/  App.tsx  main.tsx                                 │
│    • Any file outside src/foundation/                        │
└──────────────────────────────────────────────────────────────┘
                              ▲
                              │ imports
                              │
┌──────────────────────────────────────────────────────────────┐
│                     EXTERNAL DEPENDENCIES                      │
│  react  react-dom  framer-motion  react-router-dom           │
│  lucide-react  third-party packages                          │
└──────────────────────────────────────────────────────────────┘
```

### Current dependency graph

```
                    ┌──────────────────┐
                    │   App.tsx        │
                    │   components/    │
                    │   (21 imports)   │
                    └───────┬──────────┘
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
          ▼                 ▼                  ▼
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  tokens/     │  │  motion/     │  │  providers/  │
  │  spacing     │  │  presets.ts  │  │  AppProvider │
  │  shadows     │  │  useHeroMotion│ └──────┬───────┘
  │  z-index     │  └──────┬───────┘         │
  │  timing      │         │                 │
  └──────────────┘         │                 │
                           │ imports         │
                           ▼                 │
                   ┌──────────────┐          │
                   │  react       │◄─────────┘
                   │  framer-motion│
                   └──────────────┘
```

### Verification

```
src/foundation/
  tokens/spacing.ts       →  0 imports         ✅
  tokens/shadows.ts       →  0 imports         ✅
  tokens/z-index.ts       →  0 imports         ✅
  tokens/timing.ts        →  0 imports         ✅
  motion/presets.ts       →  0 imports         ✅
  motion/useHeroMotion.ts →  react, framer-motion, ./presets  ✅
  providers/AppProvider.tsx → react            ✅
  config/app.ts           →  0 imports         ✅

Foundation → application code:  ZERO  ✅
Application code → Foundation:    21 imports  ✅
```

---

## 4. Import Rules

### Application code may import Foundation

```
// ✅ Correct
import { SECTION_PADDING_Y } from '../foundation/tokens/spacing'
import { useApp } from '../foundation/providers/AppProvider'
import { useHeroMotion } from '../foundation/motion/useHeroMotion'
```

```
// ❌ Incorrect — deep path with no abstraction
import { easeLogo } from '../foundation/motion/presets'
```

### Foundation must never import application code

```
// ✅ Correct — third-party library
import { motion } from 'framer-motion'

// ✅ Correct — another Foundation module
import { easeLogo } from './presets'

// ❌ Incorrect — importing from outside Foundation
import { BOOKING_URL } from '../lib/data'
import { HeroMotionValues } from '../components/Hero'
```

### Directories that must not appear in any Foundation import

```
src/pages/
src/components/
src/lib/
App.tsx
main.tsx
index.css
```

---

## 5. Public API

Every Foundation module should expose a clean public surface. Application code should not reach into internal files.

| Module | Public API File | What it exports |
|--------|----------------|-----------------|
| tokens/ | (each file is its own API) | `spacing.ts`, `shadows.ts`, `z-index.ts`, `timing.ts` |
| motion/ | `presets.ts`, `useHeroMotion.ts` | `easeLogo`, `LOGO_SCROLL_RANGE`, `useHeroMotion` |
| providers/ | `AppProvider.tsx` | `AppProvider`, `useApp`, `AppPhase` |
| config/ | `app.ts` | `APP` |

### Preferred import paths

```
foundation/tokens/spacing
foundation/tokens/shadows
foundation/tokens/z-index
foundation/tokens/timing
foundation/motion/presets
foundation/motion/useHeroMotion
foundation/providers/AppProvider
foundation/config/app
```

Avoid importing internal implementation details (files that start with `_`, helper functions not exported, etc.).

---

## 6. Growth Policy

### When to create new Foundation files

| Module | Growth Rule |
|--------|-------------|
| `tokens/` | Add new file when a value doesn't fit existing categories. E.g., `colors.ts` if design adds custom color stops, `durations.ts` if animation timing values appear. |
| `motion/` | Add new `use*Motion` hook when a generic animation pattern is extracted from a component. File per hook. |
| `providers/` | Only when a genuinely global provider is required. Maximum 1–2 providers in typical project. |
| `controllers/` | Only when orchestration logic has 2+ consumers. Do not populate preemptively. |
| `hooks/` | Only when a generic hook has 2+ potential consumers. Do not extract `useHero*` or single-use hooks. |
| `utils/` | Only when a pure function is reused in 2+ files. Do not extract single-use helpers. |
| `config/` | Single file until config exceeds ~10 entries, then group by domain (`api.ts`, `features.ts`). |

### Anti-patterns

```
// ❌ Empty abstraction — creating files for "future use"
src/foundation/tokens/durations.ts  ← only has one value
src/foundation/hooks/useWindowSize.ts  ← only used in one component
src/foundation/controllers/ScrollController.ts  ← no consumers yet
```

```
// ✅ Correct — wait until duplication exists
// Two components both need 'py-[120px]' → extract to spacing.ts
// Three components both need useInView with same margin → extract to hooks/
```

---

## 7. Validation Results

### Current state (after Foundation Layer creation)

| Rule | Status | Details |
|------|--------|---------|
| Foundation never imports application code | ✅ PASS | Zero imports from pages/, components/, lib/, App.tsx |
| All token values are immutable | ✅ PASS | All `const` or `as const` |
| No business logic in tokens | ✅ PASS | All pure layout/design value strings |
| Z-index has single authority | ✅ PASS | All z-index values in `z-index.ts` |
| No runtime state in config | ✅ PASS | `APP` is `as const` record |
| No UI rendering in providers | ✅ PASS | `AppProvider` only renders context wrapper |
| No side effects in utils | ✅ PASS | `utils/` is empty |

### Exceptions (documented violations)

| Exception | Module | Reason |
|-----------|--------|--------|
| `useHeroMotion.ts` in `motion/` | `motion/` | Component-specific hook that references Hero DOM (`#header-nav`, `#header-center-slot`), measures Hero layout, and is only consumed by `Hero.tsx`. **Justification**: First hook extraction to establish the pattern. Future hooks must be generic before admission. When/if `useRevealMotion` or `useSectionTransition` are extracted as generic hooks, `useHeroMotion` should be evaluated for relocation back to `components/` or generalization. |
| `HEADER_DROP_GLOW` contains `HEADER_` prefix in `tokens/` | `tokens/shadows.ts` | The name references a specific component (`Header`), violating the "never component-specific names" rule. The value itself is a generic gold drop-shadow. **Recommendation**: Rename to `GOLD_DROP_GLOW_HOVER` — generic, reusable, and semantically clear. |

### Pre-existing (non-foundation) issues

These exist outside Foundation and affect the broader project. Tracked separately in `project-core/audits/`.

- Header.tsx: `setMenuOpen(false)` in useEffect (react-hooks/set-state-in-effect)
- vite.config.ts: `@ts-ignore` instead of `@ts-expect-error`
- vite.config.ts: Empty catch block

---

## 8. How Future Contributors Should Think About Foundation

### When building a new component

1. **Check Foundation first** — before writing `py-[120px]`, check `spacing.ts`. Before writing `z-60`, check `z-index.ts`. Before writing a shadow, check `shadows.ts`.
2. **Do not add to Foundation preemptively** — keep values local to the component. Only extract when the value is used in a second location.
3. **Do not import Foundation internals** — consume the public API surface.
4. **Do not add React hooks to Foundation unless generic** — single-use hooks stay with the component.
5. **Document exceptions** — if a Foundation rule must be broken, document it in `GOVERNANCE.md`.

### The Foundation is not a library

Foundation is not a generic utility library. It is the permanent architectural substrate of this specific project. Every value in Foundation exists because it was duplicated across components or is semantically essential (z-index system).

An empty Foundation module (`controllers/`, `hooks/`, `utils/`) is a **success** — it means nothing has been prematurely abstracted. These directories should only grow when real duplication forces them to.

### One-directional dependency

```
Third-party libs → Foundation → Components/Pages
```

Foundation depends on third-party libraries (React, framer-motion). Components depend on Foundation. Foundation never depends on components. This creates a stable core that can be reasoned about independently of the UI.
