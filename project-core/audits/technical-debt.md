# Technical Debt Report

## Resolved (Cleanup Pass)

| Item | File(s) | Fix Applied |
|------|---------|-------------|
| CinematicIntro invisible (`bg-concrete-950`) | `CinematicIntro.tsx` | Replaced with `bg-ink-950` |
| Pricing.tsx dead code | `Pricing.tsx` | File deleted |
| `grid-lux` / `diagonal-gold` no-op classes | `VideoPresentation.tsx`, `PageHeader.tsx` | Removed from JSX |
| Duplicate `window.scrollTo(0,0)` | `Header.tsx` | Removed duplicate; `ScrollToTop.tsx` retains sole ownership |
| `#F5E7B5` hardcoded (Header.tsx) | `Header.tsx` | Replaced with `text-gold-100` |
| `#F0ECE4` hardcoded (Hero.tsx) | `Hero.tsx` | Replaced with `text-cream` |
| `#08080a` / `#e8e8ec` hardcoded in CSS | `index.css` | Replaced with `var(--color-ink-950)` / `var(--color-ink-100)` |
| `::selection` hardcoded | `index.css` | Replaced with `var(--color-gold-500)` / `var(--color-ink-950)` |
| `.border-gold-gradient`, `.gold-line`, `.text-stroke-gold` | `index.css` | Removed — unused utilities |
| `AnimatePresence onExitComplete={() => {}}` | `CinematicIntro.tsx` | Empty callback removed |
| Hero logo 3x duplicate easing functions | `Hero.tsx` | Consolidated into shared `easeLogo(v, from, to)` helper |
| `opacity-0` class on CinematicIntro text | `CinematicIntro.tsx` | Removed — opacity handled by parent AnimatePresence |

## Priority: High (Remaining)

### 1. No memoization
- **Issue**: No `React.memo`, `useMemo`, or `useCallback` anywhere
- **Impact**: Unnecessary re-renders on parent state changes
- **Fix**: Memoize SectionTransition + expensive children

---

## Priority: Medium

### 2. Inconsistent button gradient direction
- **Vertical** (`bg-gradient-to-b`): Hero, MenuOverlay, FinalScene
- **Horizontal** (`bg-gradient-to-r`): Booking
- **Fix**: Unify to a single gradient direction

### 3. Duplicate service list implementations
- **Services.tsx**: Active component on HomePage
- **OffersPage.tsx**: Inline service list (second implementation)
- **Fix**: Reuse Services.tsx on OffersPage instead of inline list

---

## Priority: Low

### 4. No lazy loading on images
- **Issue**: All `<img>` tags load eagerly
- **Fix**: Add `loading="lazy"` to below-fold images

### 5. No SSR/SSG
- **Issue**: Content invisible until JS loads and hydrates
- **Fix**: Consider SSG for SEO (out of scope for current project)

### 6. Scrolls re-calculate on every section mount
- **Issue**: 12 `useScroll` instances create 12 scroll listeners
- **Fix**: Consider shared scroll observer pattern if performance becomes an issue

### 7. No error boundaries
- **Issue**: Any render error will crash the entire app
- **Fix**: Add a top-level error boundary
