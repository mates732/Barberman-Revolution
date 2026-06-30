# Motion System

## Animation Library

- **Framer Motion v12** — sole animation library
- No GSAP, no CSS animations, no Lenis/Locomotive, no requestAnimationFrame (outside framer-motion)

## Animation Types

| Type | Components |
|------|------------|
| Scroll-driven transforms (useScroll + useTransform) | Hero, SectionTransition, GalleryImage, ScrollProgress, ScrollReveal |
| Spring physics (useSpring) | ScrollProgress bar |
| Mount/unmount transitions (AnimatePresence + initial/animate/exit) | CinematicIntro, MenuOverlay, Booking, VideoPresentation |
| View-triggered (useInView + initial/animate) | Reveal (fallback mode on subpages), Trust (AnimatedCounter) |
| CSS transitions | All hover effects (buttons, cards, images, nav links) |

---

## Scroll-Driven Animations

### 1. Hero (Hero.tsx)

| MotionValue | Type | Input | Output Range | Effect |
|-------------|------|-------|-------------|--------|
| `contentOpacity` | useTransform | `heroScroll` [0, 0.25, 0.40] | [1, 1, 0] | Content wrapper fades out during exit |
| `contentY` | useTransform | `heroScroll` [0, 0.25, 0.40] | [0, 0, -16] | Content slides up during exit |
| `contentFilter` | useTransform | `heroScroll` [0, 0.25, 0.40] | [blur(0), blur(0), blur(1.5px)] | Subtle exit blur |
| `bodyOpacity` | useTransform | `heroScroll` [0, 0.25] | [1, 0] | Body text visible at scroll=0, exits on scroll |
| `ctaOpacity` | useTransform | `heroScroll` [0, 0.25] | [1, 0] | CTA visible at scroll=0, exits on scroll |
| `logoX` | useTransform | `scrollY` custom fn | Variable | Logo center→header slot |
| `logoY` | useTransform | `scrollY` custom fn | Variable | Logo center→header slot |
| `logoScale` | useTransform | `scrollY` custom fn | 1 → 0.55 | Logo shrink |

Custom ease function for logo: `1 - (1 - p)^5` (quintic ease-out) — exported as `easeLogo` from `foundation/motion/presets.ts`. `LOGO_SCROLL_RANGE=120`. The full Hero motion logic (useScroll, useTransform, useLayoutEffect, resize listener) lives in `foundation/motion/useHeroMotion.ts`.

### 2. SectionTransition (per-section)

| MotionValue | Output Range | Effect |
|-------------|-------------|--------|
| `opacity` | [0→1→1→0] | Section fades in on enter, fades out on exit |
| `y` | [30→0→0→-30] | Section slides up on enter, continues up on exit |
| `filter` | [blur(4)→blur(0)→blur(0)→blur(4)] | Unblurs on enter, blurs on exit |

Default timing: enter 0→0.3, exit 0.7→1.0 (30% enter, 30% exit, 40% full visibility). Overridden in WhyMenReturn (enterEnd=0.4) and Experience (enterEnd=0.35).

### 3. GalleryImage (per-image)

| MotionValue | Output Range | Effect |
|-------------|-------------|--------|
| `scale` | [1, 1.06, 1.06, 1] | Image zooms in during scroll, then back |

### 4. ScrollProgress (global)

| MotionValue | Type | Effect |
|-------------|------|--------|
| `scaleX` | useSpring (stiffness:120, damping:30) | Thin bar at top tracks scroll percentage |

---

## mount/unmount Animations

### CinematicIntro
- Duration: 800ms panel slide (left/right), 500ms overlay fade
- Timing: 400ms delay before panels start sliding
- **No mount-based auto-close** — controlled externally via `open` prop from `AppProvider`
- Auto-close timer (700ms) lives in `AppProvider`, not in the component
- Custom ease: `[0.83, 0, 0.17, 1]` (ease-in-out-quart)

### MenuOverlay
- Overlay fade: 0.35s easeOut
- Nav links stagger: each item delayed by 0.12 + i * 0.07
- Booking CTA: 0.5s delay
- Bottom info: 0.5s delay

### Booking (form ↔ success)
- mode="wait" (exit before enter)
- Success: scale 0.95→1 + fade
- Transitions don't overlap

### VideoPresentation (cover ↔ iframe)
- mode="wait"
- Simple opacity crossfade
- No stagger

---

## View-Triggered Animations

### Reveal (fallback mode — used on subpages)
```
initial: { opacity: 0, y: 40, filter: 'blur(8px)' }
animate: { opacity: 1, y: 0, filter: 'blur(0px)' }
transition: { duration: 0.9, delay: prop, ease: [0.16, 1, 0.3, 1] }
```

### Trust AnimatedCounter
- Triggers when counter element enters viewport (useInView, once, margin -50px)
- Counts from 0 to target value over 1800ms in 40 steps
- No framer-motion animation of the number — manual setInterval

---

## Hover Effects (CSS transitions)

| Element | Effect | Duration |
|---------|--------|----------|
| Gold buttons | Brighter shadow, -translateY(0.5), brighter border | 0.5s ease-out |
| Outline buttons | Brighter border, gold background tint | — |
| Nav links | Gold color + drop-shadow glow | 0.3s |
| Cards | Brighter border, lighter background | 0.5s |
| Card icons | Gold glow shadow | 0.5s |
| Images (WhyMenReturn, Experience) | Scale 1→1.05, grayscale 20%→0 | 1.8s |
| MenuOverlay close X | Rotate 90deg | — |
| MenuOverlay nav items | Underline line w-0→w-full | 0.5s |
| Footer booking line | w-6→w-8 | — |
| Gallery video cover | Scale 1→1.05 | 0.7s |
| VideoPresentation play button | Scale 1→1.1 | 0.5s |
| ArrowRight icons | translateX(1) | — |

---

## Animation Rules

1. Never animate `top`, `left`, `width`, `height` — use `transform` only.
2. All section animations must be scroll-driven via `useScroll` + `useTransform`.
3. No time-based entrance sequences — continuous scroll-connected transitions.
4. No `opacity: 0` CSS hacks for initial state — use MotionValues.
5. No layout animations — only compositor-only properties (opacity, transform, filter).
6. All Reveal children must receive scroll progress via `SectionScrollContext`.
7. Animation timing presets should be documented in `presets.ts` when extracted.
