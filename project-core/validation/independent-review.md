# Independent Codebase & Visual Review

**Reviewer**: Senior frontend engineer  
**Date**: 2026-06-30  
**Methodology**: Read every file in `/src/`, ran `tsc --noEmit`, `vite build`, `eslint .`, verified asset integrity on disk.

---

## 1. Asset Integrity

### 🔴 CRITICAL: Missing Image — `about-lux.jpg`

`About.tsx:13` references `<img src="/images/about-lux.jpg">` but this file does **not exist** in `public/images/` or anywhere else in the project.

```tsx
// About.tsx:13-14
<img
  src="/images/about-lux.jpg"
  alt="Barber při práci"
```

What exists in `public/images/`:
```
622024338_...jpg  622592733_...jpg  623105383_...jpg
639564166_...jpg  649243063_...jpg  659772289_...jpg
logo.png           logo2.png         pozadi.png
```

**Impact**: The About section on the homepage will display a broken image to every visitor.  
**Fix**: Either add `/images/about-lux.jpg` or update the `src` to point to an existing image.

---

## 2. Dead Code

### 🔴 HIGH: 10+ files in `src/foundation/` are completely unused

| File | Lines | Contains |
|---|---|---|
| `foundation/tokens/z-index.ts` | 15 | 7 z-index constants |
| `foundation/tokens/timing.ts` | 1 | `EASE_CINEMATIC_DOOR` |
| `foundation/tokens/shadows.ts` | 7 | 4 shadow constants |
| `foundation/tokens/typography.ts` | 154 | Full typography system spec |
| `foundation/motion/presets.ts` | 7 | `easeLogo()`, `LOGO_SCROLL_RANGE` |
| `foundation/motion/rhythm.ts` | 24 | `SECTION_RHYTHMS`, `HERO_RHYTHM` |
| `foundation/motion/useHeroMotion.ts` | 72 | Full hero animation hook |
| `foundation/config/` | — | Empty directory |

The only foundation files actually imported anywhere:
- `foundation/tokens/spacing` — `SECTION_PADDING_Y` (imported by 6 files)
- `foundation/providers/AppProvider` — `AppProvider`, `useApp` (imported by 2 files)

**Impact**: ~280 lines of typed, exported, documented code that serves no purpose. Creates confusion for future developers. The `useHeroMotion.ts` hook contains a complete alternative hat animation implementation that's superseded by the inline code in `App.tsx`.  
**Fix**: Delete unused files. Keep only `spacing.ts` and `AppProvider.tsx`.

### 🔴 HIGH: `Reveal.tsx` — dead animation component

`Reveal` accepts `delay` and `y` props but renders only `<div className={className}>{children}</div>`. It's a wrapper that does nothing.

Used in 7+ components (About, Booking, Contact, SocialProof, FinalScene, AboutPage, HomePage's carousel wrapper), each passing `delay` values that are silently dropped. Every `<Reveal delay={0.1}>` in the codebase has zero effect.

**Impact**: Any scroll-triggered reveal animation that was intended is absent. Content appears all at once, no staggered entrance anywhere on the site except the menu overlay (which has its own internal stagger).  
**Fix**: Either implement scroll-triggered entrance (IntersectionObserver + Framer Motion), or delete the component and remove all usage.

### 🔴 HIGH: `CircularCarousel.tsx:190-191` — unused constants

```tsx
const CIRCLE = 48
const EXPANDED = 96
```

These are duplicated from `MorphingArrowButton.tsx:5-7`. They're never read. Lint error.

### ⚠️ MEDIUM: 3 components return `null`

- `CinematicIntro.tsx` — accepts `open` and `onComplete` props, returns null
- `ScrollProgress.tsx` — returns null (intended scroll progress bar)
- `FilmGrain.tsx` — returns null (intended film grain overlay)

The `CinematicIntro` is wired into `App.tsx` and the AppProvider phase system runs its full lifecycle (sessionStorage, setTimeout, state management) to control it — yet it renders nothing. The `FilmGrain` is listed in the dev tools but does nothing.

### 🟢 LOW: `App.css` — empty file

Zero lines. Exists on disk and is not imported.

---

## 3. Build & Lint Issues

All verified:

```
tsc --noEmit   → PASS (no errors)
vite build     → PASS (1.82s)
```

### ⚠️ MEDIUM: 7 lint errors

| File | Error |
|---|---|
| `Header.tsx:1` | `useRef` imported but never used |
| `Header.tsx:20` | setState synchronously inside useEffect |
| `CircularCarousel.tsx:190` | `CIRCLE` assigned but never used |
| `CircularCarousel.tsx:191` | `EXPANDED` assigned but never used |
| `vite.config.ts:9` | Use `@ts-expect-error` instead of `@ts-ignore` |
| `vite.config.ts:12` | Empty block statement |

---

## 4. Unused Prop / Silent Failures

### ⚠️ MEDIUM: `rhythm` prop passed but not defined

`SectionTransition` interface:
```tsx
interface SectionTransitionProps {
  children: ReactNode
  className?: string
  id?: string
  snap?: boolean
}
```

But `About.tsx:8` passes `rhythm="EXPANDED"` and `FinalScene.tsx:10` passes `rhythm="COMPACT"`. These are silently discarded.

The `rhythm.ts` file defines `COMPACT`, `STANDARD`, and `EXPANDED` variants — this was meant to control scroll-triggered exit animations, but `SectionTransition` never received the prop in its interface, nor does it implement the behavior. The feature was started but never finished.

---

## 5. Styling & Visual Issues

### ⚠️ MEDIUM: `text-navigation/55` — opacity modifier likely broken on custom utility

In `Header.tsx:65`:
```tsx
<span className="ml-2 text-navigation/55">Revolution</span>
```

`text-navigation` is a `@utility` in `index.css`. In Tailwind v4, the `/opacity` modifier on `@utility` classes may not decompose hex colors to channels. The `--color-gold-100` is `#EDD69A` (hex). Tailwind v4's opacity modifier support on arbitrary utilities is inconsistent — this may render at full opacity instead of the intended 55%.

**Fix**: Use `text-gold-100/55` instead of `text-navigation/55`.

### ⚠️ MEDIUM: `mix-blend-mode: difference` on SectionHeading — fragile

`SectionHeading.tsx:19` applies `mix-blend-mode: difference` to the eyebrow label container. This works correctly on the dark background (where it brightens white text slightly), but any section with a lighter or mid-tone background would render the text invisible. All current sections use the dark texture, so it works — but this is a ticking bomb.

**Fix**: Remove `mix-blend-mode: difference` and rely on the existing color styling.

### 🟢 LOW: `SectionHeading` eyebrow — white text on white line discrepancy

The component renders `text-white` for the eyebrow label, but `SectionHeading.tsx:8` uses `bg-white/80` for the decorative line. The text label has no explicit `font-display` class — it uses `font-serif italic` directly. However, `text-white` on the ink-950 background is fine (high contrast).

---

## 6. Hat Animation Issues

### ⚠️ MEDIUM: Linear interpolation feels inorganic

```tsx
// App.tsx:74
const progress = Math.max(0, Math.min(y / detachScroll, 1))
// ...
logoScale.set(INITIAL_SCALE + (FINAL_SCALE - INITIAL_SCALE) * progress)
```

The hat moves at constant speed from start to final position with no easing. This is physically unnatural — objects in motion decelerate. The dead `presets.ts` contains `easeLogo()` with a quintic ease-out (`1 - Math.pow(1 - p, 5)`) which was the intended behavior.

**Fix**: Apply an ease-out function: `const eased = 1 - Math.pow(1 - progress, 3)` and use `eased` for y and scale calculations.

### 🟢 LOW: `hatBaseSize` hardcoded — 64/56 px

The hat base size is hardcoded to 64 (desktop) and 56 (mobile). This matches `h-16 w-16 sm:h-14 w-14` in `AnimatedLogo.tsx`. Consistent, correct.

### 🟢 LOW: `updateLogoPosition` called from inside `init()` before it's assigned

In `App.tsx:68`: `updateLogoPosition(window.scrollY)` — This works because of function hoisting, but it's a subtle dependency. Not a bug, but worth noting.

---

## 7. Z-Index Stack

Current actual z-index values:
- `AnimatedLogo`: 80
- `MenuOverlay`: 70
- `Header`: 60
- `MorphingArrowButton`: 20
- `motion.div content`: 10
- `body texture`: 0

Token file has `Z_FLOATING_LOGO = 70` and `Z_MENU_OVERLAY = 70` — both set to the same value, which would be a bug if used. The actual code correctly uses 80 for the hat and 70 for the menu. **The token file is stale and contradictory.**

---

## 8. Duplicate Gallery Images

`public/images/` contains 6 gallery JPGs (622024338_...jpg, 622592733_...jpg, 623105383_...jpg, 639564166_...jpg, 649243063_...jpg, 659772289_...jpg) that are **duplicates** of the images in `src/assets/gallery/`. The carousel loads from `src/assets/gallery/`, so the `public/images/` copies (~1.8MB total) are dead weight served to every visitor.

---

## 9. Image Optimization

- **`pozadi.png`**: 3.3MB for a background texture. This is served on every page load. Should be compressed (WebP at ~80% quality would be ~300-500KB).
- **`logo2.png`**: 570KB, used as favicon/apple-touch-icon. A properly sized PNG would be 5-15KB.

---

## 10. UX Issues

### ⚠️ MEDIUM: Scrollbar hidden entirely

`index.css` hides the scrollbar on all platforms. Users cannot see:
- How far they've scrolled
- How much content remains
- Where they are on the page

This is a deliberate design choice but significantly impacts usability. On macOS, this is especially problematic since there's no visual scroll position indicator.

---

## 11. Code Quality

### ✅ Strengths

- Clean component composition (AppShell → pages → components)
- Consistent Tailwind utility usage
- Strong TypeScript typing on data
- No `any` types in production code
- Proper dependency layering (AppProvider → AppShell → components → pages)
- Framer Motion's `useReducedMotion` respected in carousel

### 🔴 Issues Found

| # | Issue | Severity | File |
|---|---|---|---|
| 1 | `about-lux.jpg` missing | 🔴 Critical | `About.tsx` |
| 2 | 7+ unused foundation files | 🔴 High | `foundation/*` |
| 3 | `Reveal.tsx` does nothing | 🔴 High | `Reveal.tsx` |
| 4 | Unused vars `CIRCLE`/`EXPANDED` | 🔴 High | `CircularCarousel.tsx` |
| 5 | `text-navigation/55` opacity broken | ⚠️ Medium | `Header.tsx` |
| 6 | `mix-blend-mode: difference` fragile | ⚠️ Medium | `SectionHeading.tsx` |
| 7 | Hat animation linear, no easing | ⚠️ Medium | `App.tsx` |
| 8 | 3 stub components return null | ⚠️ Medium | CinematicIntro, ScrollProgress, FilmGrain |
| 9 | `rhythm` prop silently dropped | ⚠️ Medium | SectionTransition, About, FinalScene |
| 10 | Duplicate gallery images (1.8MB) | ⚠️ Medium | `public/images/` |
| 11 | Scrollbar hidden | ⚠️ Medium | `index.css` |
| 12 | `pozadi.png` 3.3MB unoptimized | 🟢 Low | `public/images/` |
| 13 | Hash-anchor nav unreliable | 🟢 Low | Navigation |
| 14 | `useRef` unused import | 🟢 Low | `Header.tsx` |
| 15 | `setState` in effect | 🟢 Low | `Header.tsx` |
| 16 | Inline `<style>` in JSX | 🟢 Low | `Services.tsx` |
| 17 | Empty `App.css` | 🟢 Low | `App.css` |
| 18 | `logo2.png` 570KB for favicon | 🟢 Low | `public/fotky/` |
| 19 | `vite.config.ts` @ts-ignore | 🟢 Low | `vite.config.ts` |
| 20 | No lightbox for gallery | 🟢 Low | Carousel |
| 21 | No logos on subpages | 🟢 Low | App.tsx |

---

## Section-by-Section Scorecard

| Section | Score | Key Issue |
|---|---|---|
| Hero | 7/10 | Static, no entrance motion, missing image in About section below |
| Floating Hat | 7/10 | Linear interpolation, no easing |
| Header | 8/10 | Broken `/55` opacity, unused import |
| Navigation | 8/10 | Hash-anchor routes unreliable |
| Menu Overlay | 9/10 | Best-crafted component |
| Services | 8/10 | Inline `<style>` tag |
| Gallery | 8/10 | Unused vars, no lightbox, duplicate images |
| About Section | 4/10 | Broken image |
| Contact | 8/10 | Minor |
| Footer | 9/10 | Clean |

---

## Answers

### Would you ship this website today?

**No.**

The missing `about-lux.jpg` on the homepage About section is a production-blocking issue. The broken `text-navigation/55` opacity means "Revolution" in the subpage header renders at wrong color. The `Reveal` component silently discarding all delay/stagger props means the intended scroll animations don't exist. These are not theoretical — they are **definite bugs** that affect every visitor.

### What prevents launch?

1. **Broken image on homepage** — About section shows a broken placeholder
2. **All entrance animations absent** — Reveal does nothing; content has zero staggered entrance
3. **Hat motion is linear** — doesn't feel premium
4. **~280 lines of dead code** — maintenance burden
5. **Opacity modifier broken** on subpage brand text

### Top 10 remaining improvements

| # | Impact | Effort | Item |
|---|---|---|---|
| 1 | 🔴 Critical | Low | Add `about-lux.jpg` or fix the src path |
| 2 | 🔴 High | Medium | Implement Reveal scroll animations or delete it |
| 3 | 🔴 High | High | Clean up 7+ unused foundation files |
| 4 | ⚠️ Medium | Low | Apply ease-out to hat interpolation |
| 5 | ⚠️ Medium | Low | Fix `text-navigation/55` → `text-gold-100/55` |
| 6 | ⚠️ Medium | Medium | Remove `mix-blend-mode: difference` from SectionHeading |
| 7 | ⚠️ Medium | Low | Remove duplicate gallery images from `public/images/` |
| 8 | ⚠️ Medium | Low | Remove unused CIRCLE/EXPANDED from CircularCarousel |
| 9 | 🟢 Low | Medium | Optimize pozadi.png (3.3MB → webp) |
| 10 | 🟢 Low | Low | Restore scrollbar or add visual position indicator |

### Top 3 highest-impact improvements for client perception

1. **Fix `about-lux.jpg`** — the broken image is the most noticeable issue to any visitor
2. **Implement Reveal animations** — staggered entrance is what separates "assembled" from "premium"
3. **Ease the hat motion** — the hat is the signature visual; linear movement feels cheap

### Scores (1–10)

| Category | Score | Rationale |
|---|---|---|
| Visual Design | 7 | Palette and texture are good, but hero lacks depth, layout is uniform |
| UX | 6 | No scrollbar, no lightbox, hash anchors unreliable, content has no entrance |
| Motion Design | 5 | Menu is great (9/10); hat is linear (5/10); Reveal is non-functional (0/10) |
| Consistency | 8 | Typography utilities, palette, spacing are consistent across all components |
| Accessibility | 5 | Hidden scrollbar, `mix-blend-mode: difference` fragility, Maps iframe |
| Responsiveness | 8 | All breakpoints handled, hat scales, grids collapse correctly |
| Performance | 7 | 433KB JS bundle (Framer Motion), 3.3MB background texture, 1.8MB duplicate images |
| Code Quality | 5 | 7+ unused files, 7 lint errors, 3 stub components, dead props, silent failures |
| Premium Feel | 6 | Menu and carousel feel premium; hat motion linear, missing image, absent reveals undercut it |

### Overall Launch Readiness Score

## 5/10

Not shippable. The site has a strong visual foundation but is undermined by:
- A **broken image** on the homepage
- **Zero scroll-triggered entrance animations** despite a component architecture built for them
- **Linear hat motion** when the easing infrastructure already exists in dead code
- **~400 lines of unused code** creating maintenance drag
- **1.8MB of duplicate images** and a **3.3MB background texture** hurting load time

A 10/10 would require: all images present, smooth eased hat animation, staggered scroll reveals, no dead code, optimized assets, proper z-index tokens, scrollbar visible, gallery lightbox, and 0 lint errors. You're approximately 60% of the way there. The craft foundation is solid — the polish layer is incomplete.
