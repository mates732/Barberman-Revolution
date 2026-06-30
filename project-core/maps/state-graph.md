# State Dependency Graph

## State Locations and Effects

```
App (BrowserRouter)                      ← No state (delegates to AppProvider)
│
├─ AppProvider (context)                 ← GLOBAL STARTUP CONTROLLER
│  └─ phase (AppPhase)
│     ├─ Determines CinematicIntro open state
│     ├─ Persisted across refresh via sessionStorage('barberman-intro-shown')
│     ├─ Transitions:
│     │    sessionStorage empty  → 'intro' → 700ms timer → 'running'
│     │    sessionStorage exists → 'running' (skip intro)
│     │    requestIntro()        → 'intro' → 700ms timer → 'running'
│     ├─ Timer: cleaned up on unmount (StrictMode safe)
│     ├─ sessionStorage set once per session (first visit)
│     └─ Exposes: useApp() hook, AppPhase type
│
├─ Header
│  └─ menuOpen (useState<boolean>, default false)
│     ├─ true  → MenuOverlay mounts + body.style.overflow = 'hidden'
│     ├─ false → MenuOverlay unmounts + body.style.overflow = ''
│     ├─ toggled by: "Menu" button onClick → setMenuOpen(true)
│     ├─ toggled by: MenuOverlay onClose → setMenuOpen(false)
│     ├─ reset by: pathname change → setMenuOpen(false) [useEffect]
│  └─ Logo click → requestIntro() (not custom event)
│
├─ CinematicIntro
│  └─ open (controlled prop from AppProvider.phase)
│     ├─ true → AnimatePresence renders curtain overlay
│     ├─ false → AnimatePresence exit animation → unmount
│     └─ No internal useState — fully controlled
│
├─ Hero
 │  └─ Logo click → requestIntro() (not custom event)
 │  └─ bodyOpacity / ctaOpacity: visible at scroll=0, exit on scroll
│
├─ VideoPresentation
│  └─ playing (useState<boolean>, default false)
│     ├─ false → Shows cover image with play button
│     ├─ true → Shows YouTube iframe
│     └─ toggled by: cover click → setPlaying(true)
│
├─ Booking
│  ├─ form (useState<object>)
│  │  ├─ { name, phone, service, date, time }
│  │  └─ Updated by: input onChange handlers
│  │
│  └─ submitted (useState<boolean>, default false)
│     ├─ false → Shows form
│     ├─ true → Shows success message
│     ├─ set to true on form submit
│     └─ reset to false after 5 seconds via setTimeout
│
└─ Trust (×4 AnimatedCounter)
   └─ count (useState<number>, default 0)
      ├─ Updated by: setInterval at ~45ms for 1800ms
      ├─ Triggered by: useInView (once, margin -50px)
      └─ Effect: Visual number increment in stat counter
```

## State Flow Diagram

```
User Action                    → Component State                  → Visual Effect
────────────────────────────────────────────────────────────────────────────────
Page first load                → AppProvider.phase = 'intro'    → CinematicIntro overlay (700ms)
                                → timer fires                   → phase = 'running' → overlay exits
Page hard refresh              → AppProvider.phase = 'running'  → CinematicIntro never mounts
                                (sessionStorage flag persists)  → Hero visible immediately
Click logo on HomePage         → AppProvider.requestIntro()     → phase = 'intro' → CinematicIntro overlay
                                → window.scrollTo top             → page scrolls
Click logo on subpage          → navigate('/')                    → route changes to /
Click "Menu" button            → Header.menuOpen = true           → MenuOverlay mounts
Click nav link in menu         → Header.menuOpen = false          → MenuOverlay unmounts
                                → pathname changes                 → React Router navigates
Navigate to new route          → Header.menuOpen = false          → MenuOverlay unmounts
                                → ScrollToTop fires                → page scrolls to top
Click video cover              → VideoPresentation.playing = true → iframe mounts
Submit booking form            → Booking.submitted = true         → success message appears
After 5s timeout              → Booking.submitted = false         → form reappears
Counter enters viewport        → Trust.count starts               → number animates 0→target
```

## State Architecture

- No external state library (Zustand, Redux)
- **One React Context**: `AppProvider` for intro phase (was: custom DOM events)
- `SectionScrollContext` is for animation values, not application state
- All other state is purely local via `useState`
- Cross-component communication:
  - **AppProvider context** (replaces custom DOM `'cinematic-intro'` events)
  - React Router navigation
  - Direct props (parent → child)
