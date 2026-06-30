# Performance Documentation

## Render Order

```
0. index.html <head>:
     Font stylesheet + preload pozadi.png + preload logo.png
1. HTML parsed: <div id="root"></div>
     First paint: ink-950 background (from CSS @layer base on html)
     No white flash — page is near-black from frame 0
2. JS bundle loads + parses
3. AppProvider initializes (checks sessionStorage)
     ├─ First visit: phase='intro' → overlay will render
     └─ Refresh:     phase='running' → no overlay
4. ReactDOM.createRoot
5. All components render synchronously
     CinematicIntro is either visible (phase='intro') or absent (phase='running')
     Hero body/CTA are opacity=1 at scroll=0
6. useLayoutEffect runs (Hero measurements)
7. useEffect runs (AppProvider timer, scroll listeners)
     ├─ First visit: 700ms timer → setPhase('running') → exit animation
     └─ Refresh: no timer (phase is already 'running')
8. Font swap (if custom fonts arrive after paint)
```

## Hydration

- No SSR/SSG — pure client-side SPA
- No hydration mismatch possible (no server-rendered HTML to reconcile)
- **Caveat**: Initial HTML is `<div id="root"></div>` only — invisible until JS loads
- Font swap can cause layout shift: Oswald has different metrics than `Arial Narrow` fallback

## Large Renders

| Scenario | What happens |
|----------|-------------|
| HomePage mount | ~30 Reveal components + 12 sections + all motion hooks initialize |
| Route navigation | Full page unmount/remount (no layout persistence) |
| Logo click on "/" | `introKey` increment remounts entire HomePage |
| MenuOverlay open | AnimatePresence mounts fullscreen overlay with 6 staggered nav items |

## Expensive Operations

### 12 useScroll instances

Every section creates its own scroll observer via `useScroll`. The scroll event handler is shared (single `scroll` listener per `useScroll`), but each instance computes its own progress value based on the target element's bounding rect.

### 30+ useTransform instances

Each `Reveal` child creates 3 `useTransform` mappings (opacity, y, filter). With ~30 Reveal instances on HomePage, that's ~90 MotionValues derived from scroll progress.

### Hero body/CTA visibility at scroll=0

Previously, body and CTA used enter ranges `[0.02, 0.08] → [0, 1]` and `[0.04, 0.14] → [0, 1]`, starting invisible at scroll=0. Now use exit ranges `[0, 0.25] → [1, 0]` — fully visible at scroll=0, exit as user scrolls. This ensures the Hero is complete from first frame.

### Logo transforms (consolidated)

Logo x, y, and scale each use a shared `easeLogo(v, from, to)` helper with identical `1 - (1-p)^5` quintic ease-out logic. Three separate `useTransform` subscriptions remain, but the easing function is no longer duplicated.

### Trust counter interval

Each of 4 AnimatedCounter components runs a `setInterval` at ~45ms for 1800ms when they enter the viewport. All 4 can fire simultaneously.

## Image Loading

| Image | Location | Type | Notes |
|-------|----------|------|-------|
| `/images/pozadi.png` | App.tsx background | Background | Fixed position, loaded on mount |
| `/images/logo.png` | Logo.tsx | <img> | aria-hidden |
| `/images/gallery-lux1-4.jpg` | Gallery, WhyMenReturn, Experience, etc. | <img> | Various sections |
| `/images/about-lux.jpg` | About.tsx, AboutPage.tsx | <img> | Portrait |

No lazy loading (`loading="lazy"`) on any images except `<iframe>` in Contact.tsx.

## Font Loading

Fonts are loaded via `<link>` in `index.html <head>` with preconnect hints. This is good practice but the font files may not arrive before the first paint, causing:
1. Text rendered in fallback font (`Arial Narrow`, `Georgia`, `system-ui`)
2. Layout shift when Oswald arrives with different metrics
3. Perceptual "flash" as text reflows

## Memoization

**None in the codebase**. No `useMemo`, no `useCallback`, no `React.memo`, no `memo()` on components.

## Repeated Calculations

- Same `textShadow` pattern applied as inline style on 5 elements in Header.tsx
- Same gold gradient button shadow patterns repeated across 5 components with minor variations
- Same service list rendered by Services.tsx and OffersPage.tsx (inline)

## Dead Code (Cleaned Up)

| Item | Status |
|------|--------|
| `Pricing.tsx` | ✅ Deleted |
| `CinematicIntro.tsx` (invisible) | ✅ Fixed — uses `ink-950` |
| `.grid-lux`, `.diagonal-gold` classes | ✅ Removed from JSX |
| `AnimatePresence onExitComplete={() => {}}` | ✅ Removed |

## Unused Imports

All imports in active components are used. No unused import issues found.

## Potential Optimizations

1. **Memoize SectionTransition**: Prevent re-render of children when only scroll progress changes
2. **Lazy-load section images**: Add `loading="lazy"` to below-fold images
3. **Deduplicate text shadow**: Move to CSS utility class
4. **Deduplicate button shadows**: Create shared class or constant
