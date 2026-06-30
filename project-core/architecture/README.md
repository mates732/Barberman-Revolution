# Architecture

## Folder Structure

```
/src
  index.css              ← Global styles (Tailwind v4 @theme + base layer + utilities)
  main.tsx               ← Entry point (ReactDOM.createRoot + StrictMode)
  App.tsx                ← Root component (BrowserRouter, layout, routes)
  index.html             ← HTML template (fonts via <link> preconnect)
  vite.config.ts         ← Vite config (React + Tailwind plugins)

  foundation/            ← Foundation Layer — reusable systems that everything depends on
    tokens/              ← Primitive design values (spacing, shadows, z-index, timing)
    motion/              ← Animation hooks + presets (presets.ts, useHeroMotion.ts)
    providers/           ← React context providers (AppProvider.tsx)
    config/              ← Application configuration (app.ts)
    controllers/         ← (future) Lifecycle controllers
    hooks/               ← (future) Shared React hooks
    utils/               ← (future) Shared utility functions

  lib/
    data.ts              ← Static data (services, reviews, contact, navLinks, openingHours)

  pages/
    HomePage.tsx         ← "/" — full scrollable landing page
    OffersPage.tsx       ← "/nabidka" — services & pricing
    AboutPage.tsx        ← "/o-nas" — story, pillars, reviews
    ContactPage.tsx      ← "/kontakt" — contact info, map, booking
  components/
    Hero.tsx             ← Scroll-driven hero with logo animation
    Header.tsx           ← Fixed nav bar (homepage vs subpage variant)
    MenuOverlay.tsx      ← Fullscreen mobile menu (AnimatePresence)
    SectionTransition.tsx← Scroll-driven section enter/exit wrapper
    SectionScrollContext.tsx ← React context for section scroll progress
    Reveal.tsx           ← Dual-mode scroll reveal (context or useInView fallback)
    Footer.tsx           ← Site footer
    ScrollProgress.tsx   ← Top progress bar
    ScrollToTop.tsx      ← Route-change scroll reset
    FilmGrain.tsx        ← Static vignette overlay
    CinematicIntro.tsx   ← Curtain intro (uses ink-950, visible)
    Logo.tsx             ← Logo image wrapper
    PageHeader.tsx       ← Subpage hero banner
    WhyMenReturn.tsx     ← Section: sensory story
    Experience.tsx       ← Section: 5 moments
    Trust.tsx            ← Section: stat counters
    Benefits.tsx         ← Section: 6 benefit cards
    Services.tsx         ← Section: service menu
    Booking.tsx          ← Section: booking form
    Gallery.tsx          ← Section: image gallery with scroll zoom
    VideoPresentation.tsx← Section: video with cover/play
    Reviews.tsx          ← Section: featured + secondary reviews
    About.tsx            ← Section: barber story
    Contact.tsx          ← Section: contact info + hours + map
    FinalScene.tsx       ← Section: cinematic closing CTA
```

---

## Component Hierarchy

```
/App (BrowserRouter)
  ├─ AppProvider                     (context — AppPhase, useApp hook)
  │   ├─ ScrollToTop                 (null render, useEffect)
  │   ├─ ScrollProgress              (motion.div, useScroll + useSpring)
  │   ├─ FilmGrain                   (static div)
  │   ├─ CinematicIntro              (AnimatePresence, controlled by phase)
  │   ├─ <div fixed z-0>             (background image layer)
  ├─ <div relative z-10 min-h-screen>
  │    ├─ Header
  │    │    └─ MenuOverlay           (AnimatePresence, conditional)
  │    ├─ <main>
  │    │    └─ <Routes>
  │    │         ├─ "/" → HomePage
  │    │         │    ├─ Hero
  │    │         │    ├─ WhyMenReturn (SectionTransition + Reveal ×6)
  │    │         │    ├─ Experience   (SectionTransition + Reveal ×7)
  │    │         │    ├─ Trust        (SectionTransition + AnimatedCounter ×4)
  │    │         │    ├─ Benefits     (SectionTransition + Reveal ×6)
  │    │         │    ├─ Services     (SectionTransition + Reveal ×8)
  │    │         │    ├─ Booking      (SectionTransition, useState, AnimatePresence)
  │    │         │    ├─ Gallery      (SectionTransition + GalleryImage ×4)
  │    │         │    ├─ VideoPresentation (SectionTransition, useState)
  │    │         │    ├─ Reviews      (SectionTransition + Reveal ×9)
  │    │         │    ├─ About        (SectionTransition + Reveal ×6)
  │    │         │    ├─ Contact      (SectionTransition + Reveal ×6)
  │    │         │    └─ FinalScene   (SectionTransition + Reveal ×4)
  │    │         ├─ "/nabidka" → OffersPage
  │    │         │    ├─ PageHeader
  │    │         │    ├─ (inline service list)
  │    │         │    └─ Booking
  │    │         ├─ "/o-nas" → AboutPage
  │    │         │    ├─ PageHeader
  │    │         │    ├─ (inline story + pillars + reviews)
  │    │         │    └─ Booking
  │    │         └─ "/kontakt" → ContactPage
  │    │              ├─ PageHeader
  │    │              ├─ Contact
  │    │              └─ Booking
  │    └─ Footer
```

---

## Routing

| Path | Component | Nav Label |
|------|-----------|-----------|
| `/` | HomePage | Domů |
| `/nabidka` | OffersPage | Služby / Ceník |
| `/o-nas` | AboutPage | O nás |
| `/kontakt` | ContactPage | Kontakt |
| `*` (catch-all) | HomePage | — |

Hash links `/#sluzby`, `/#cenik`, `/#galerie` scroll to `SectionTransition` elements with matching `id` props. Native CSS `scroll-behavior: smooth` handles the animation.

---

## Rendering Lifecycle

1. **HTML parse**: Fonts start loading via `<link>` in `index.html <head>` (preconnect + stylesheet). Critical images (`pozadi.png`, `logo.png`) begin loading via `<link rel="preload">`.

2. **First paint**: `html` has `background-color: var(--color-ink-950)` from CSS base layer → first paint is always **near-black**. No white flash. No empty page.

3. **JS bundle loads + parses**: React, framer-motion, and all components load as a single chunk.

4. **React mount (sync)**: `AppProvider` initializes — checks `sessionStorage('barberman-intro-shown')`. 
   - **First visit**: `phase = 'intro'` → CinematicIntro overlay renders immediately (z-[100] over the already-painted Hero beneath it). A 700ms timer starts; when it fires, `phase = 'running'` → CinematicIntro begins its 500ms exit animation → unmounts.
   - **Hard refresh**: `phase = 'running'` → CinematicIntro is never rendered. Hero is immediately visible from the first React frame.
   - **Logo replay**: `requestIntro()` sets `phase = 'intro'` → CinematicIntro overlay reappears over the mounted Hero.

5. **StrictMode double-invoke (dev only)**: On first visit, mount 1 sets `sessionStorage`. Mount 2 sees the flag → `phase = 'running'` → intro is skipped in dev mode (correct behavior — prevents intro on HMR).

6. **All components render synchronously**: ScrollToTop (null), ScrollProgress, FilmGrain, Header, background, Footer, routes.

7. **useLayoutEffect runs**: Hero measures nav positions for logo transform targets.

8. **Scroll animations**: All `useTransform` values computed from first frame. Hero body/CTA opacity starts at **1** (visible) at scroll=0, exits as user scrolls past 20%.

---

## Data Flow

- **Static data** lives in `src/lib/data.ts` (services, reviews, contact, navLinks, openingHours, BOOKING_URL)
- **No API calls, no async data fetching, no server state**
- **No prop drilling** beyond 2 levels (parent section → SectionTransition → Reveal + children)
- **Context**: `SectionScrollContext` passes `MotionValue<number>` from SectionTransition down to Reveal children
- **Foundation Layer**: Tokens (`spacing`, `shadows`, `z-index`, `timing`), motion hooks (`useHeroMotion`, `easeLogo`), providers (`AppProvider`), and config (`APP`) live in `src/foundation/`. Every component consumes these resources rather than defining values locally.

## State Flow

State is contained within individual components (no global state store), with one context-based state:

- **`AppProvider`** (context, in `src/foundation/providers/`): `phase` (`AppPhase`) — controls CinematicIntro visibility via centralized startup state machine (exposes `useApp()` hook)
- `Header`: `menuOpen` (boolean) — toggles MenuOverlay
- `VideoPresentation`: `playing` (boolean) — toggles iframe
- `Booking`: `form` (object) + `submitted` (boolean)
- `Trust/AnimatedCounter`: `count` (number) — animated counter value

The `'cinematic-intro'` custom event and `introKey` (HomePage remount) mechanisms are **removed**. Logo replay now routes through `AppProvider.requestIntro()`.
