# Foundation Layer

## Purpose

The Foundation Layer is the permanent architectural substrate of this project. Every future component must consume these systems rather than defining values locally. Only extract concepts that are already duplicated or clearly reusable.

**Governance**: See [`GOVERNANCE.md`](./GOVERNANCE.md) for the complete rule set — module responsibilities, extraction rules, dependency rules, import rules, public API, growth policy, and validation results. This README is a reference; governance is the authority.

---

## Directory Structure

```
src/foundation/
  tokens/              ← Primitive design values consumed directly by components
    spacing.ts         ← Layout spacing (section padding, image heights, grayscale)
    shadows.ts         ← Text-shadow, box-shadow, drop-shadow values
    z-index.ts         ← Z-index ladder (single authority for stacking order)
    timing.ts          ← Easing bezier arrays, spring configs

  motion/              ← Animation logic built on top of tokens
    presets.ts         ← Easing functions, scroll constants (easeLogo, LOGO_SCROLL_RANGE)
    useHeroMotion.ts   ← Hero scroll/transform hook (extracted from Hero.tsx)

  providers/           ← React context providers
    AppProvider.tsx    ← App lifecycle controller (AppPhase, useApp hook)

  config/              ← Application-level configuration
    app.ts             ← APP constant (SUCCESS_MESSAGE_DURATION, future feature flags)

  controllers/         ← (empty) Application-wide orchestration
  hooks/               ← (empty) Domain-independent React hooks
  utils/               ← (empty) Pure helper functions
```

---

## Tokens

### `tokens/spacing.ts`

Duplicated layout values extracted to a single source of truth.

| Export | Value | Used By |
|--------|-------|---------|
| `SECTION_PADDING_Y` | `py-[120px]` | All 12 SectionTransition sections |
| `STICKY_IMAGE_HEIGHTS` | `min-h-[550px] sm:min-h-[650px] lg:min-h-[800px]` | About, Experience, WhyMenReturn |
| `HERO_MIN_HEIGHT` | `min-h-[110vh]` | Hero (section + content wrapper) |
| `IMAGE_GRAYSCALE` | `grayscale-[20%]` | About, Gallery, Experience, WhyMenReturn |

### `tokens/shadows.ts`

All shadow values used in more than one location.

| Export | Type | Value | Used By |
|--------|------|-------|---------|
| `TEXT_SHADOW_HEADER` | text-shadow (inline style) | `0 2px 8px rgba(0,0,0,0.35)` | Header (5 nav links) |
| `HEADER_DROP_GLOW` | drop-shadow filter class | `hover:drop-shadow-[0_0_6px_rgba(224,192,80,0.3)]` | Header (5 nav links) |
| `CTA_GLOW_DEFAULT` | box-shadow class | `shadow-[0_0_20px_rgba(201,162,39,0.10),0_0_40px_rgba(201,162,39,0.05)]` | MenuOverlay, FinalScene |
| `CTA_GLOW_HOVER` | box-shadow variant class | `hover:shadow-[0_0_30px_rgba(201,162,39,0.18),0_0_60px_rgba(201,162,39,0.10)]` | MenuOverlay, FinalScene |

### `tokens/z-index.ts`

Single authority for the application's z-index ladder. Every z-index value must come from this file.

| Export | Value | Element |
|--------|-------|---------|
| `Z_BACKGROUND` | 0 | Background texture div |
| `Z_APP_SHELL` | 10 | App shell wrapper |
| `Z_VIGNETTE` | 20 | FilmGrain vignette overlay |
| `Z_HEADER` | 60 | Header nav bar |
| `Z_FLOATING_LOGO` | 70 | Hero floating logo |
| `Z_MENU_OVERLAY` | 70 | MenuOverlay (collides with logo — intentional) |
| `Z_SCROLL_PROGRESS` | 80 | Scroll progress bar |
| `Z_INTRO_OVERLAY` | 100 | CinematicIntro curtain |

### `tokens/timing.ts`

Easing and spring configurations.

| Export | Value | Used By |
|--------|-------|---------|
| `EASE_CINEMATIC_DOOR` | `[0.83, 0, 0.17, 1]` | CinematicIntro (both doors) |

---

## Motion

### `motion/presets.ts`

| Export | Description |
|--------|-------------|
| `LOGO_SCROLL_RANGE` | `120` — scroll distance (px) over which logo transforms from Hero to Header |
| `easeLogo(v, from, to)` | Quintic power-out easing function — maps scroll input to transform output |

### `motion/useHeroMotion.ts`

Hook that encapsulates all Hero scroll-driven animation logic. Returns `HeroMotionValues`:
`sectionRef`, `heroScroll`, `contentOpacity`, `contentY`, `contentFilter`, `bodyOpacity`, `ctaOpacity`, `logoX`, `logoY`, `logoScale`.

Hero.tsx no longer imports `useScroll`, `useTransform`, `useRef`, or `useLayoutEffect` directly.

---

## Providers

### `providers/AppProvider.tsx`

Replaced `StartupProvider`. Exports:

| Export | Type | Description |
|--------|------|-------------|
| `AppProvider` | Component | Wraps app, manages `AppPhase` |
| `useApp()` | Hook | Returns `{ phase, requestIntro }` |
| `AppPhase` | Type | `'intro' \| 'running'` |

See `architecture/README.md` for startup flow details.

---

## Config

### `config/app.ts`

```ts
export const APP = {
  SUCCESS_MESSAGE_DURATION: 5000,  // ms — how long booking success message shows
} as const
```

Add future application-level configuration here (timeouts, feature flags, API endpoints).

---

## Governance

All rules for extraction, dependencies, imports, growth, and validation live in **[`GOVERNANCE.md`](./GOVERNANCE.md)**.

Key highlights:

| Rule | Summary |
|------|---------|
| **Module responsibilities** | Each Foundation module has a strict boundary. `tokens/` = immutable values. `motion/` = reusable animation primitives. `providers/` = global providers only. `controllers/` = orchestration, no UI. `hooks/` = domain-independent hooks only. `utils/` = pure functions only. `config/` = config only. |
| **Extraction** | Ask: Is it reused? Will others use it? Is it semantic? Framework-independent? Reduces duplication? If any is "no", keep local. |
| **Dependencies** | Foundation must never import from `pages/`, `components/`, `features/`, `lib/`, or `App.tsx`. Only `react`, third-party libs, and other Foundation modules. |
| **Imports** | Application code may import Foundation. Foundation must never import application code. Verified: 0 reverse imports, 21 forward imports. |
| **Public API** | Each module exposes a clean surface. Avoid deep relative imports into internal files. |
| **Growth** | Empty modules are a success. Only populate when actual duplication exists. `hooks/`, `utils/`, `controllers/` must not be populated until 2+ consumers exist. |
| **Validation** | Current state documented in `GOVERNANCE.md` §7. One exception: `useHeroMotion.ts` is component-specific but deliberately allowed as the first pattern extraction. |
