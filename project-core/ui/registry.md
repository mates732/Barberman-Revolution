# UI Component Registry

## Reusable Components

### SectionTransition
```
Purpose:     Scroll-driven enter/exit wrapper for sections
Props:       children, className?, id?, enterEnd?, exitStart?, snap?
Dependencies: framer-motion (useScroll, useTransform, motion), SectionScrollContext
Variants:    snap (adds snap-start class), custom enterEnd/exitStart timing
Used by:     WhyMenReturn, Experience, Trust, Benefits, Services, Booking,
             Gallery, VideoPresentation, Reviews, About, Contact, FinalScene
Duplicates:  None — single source
Location:    src/components/SectionTransition.tsx
```

### Reveal
```
Purpose:     Scroll-driven staggered reveal for child elements
Props:       children, className?, delay?, y?
Modes:       1. ScrollReveal (via SectionScrollContext) — on home page sections
             2. useInView fallback — on subpages (OffersPage, AboutPage, ContactPage)
Dependencies: framer-motion (useTransform, useInView, motion), SectionScrollContext
Used by:     Every section component, multiple instances per section
Duplicates:  None — single source
Location:    src/components/Reveal.tsx
```

### PageHeader
```
Purpose:     Subpage hero banner with image background
Props:       eyebrow, title, subtitle?, image
Dependencies: None (static)
Used by:     OffersPage, AboutPage, ContactPage
Location:    src/components/PageHeader.tsx
```

---

## Single-Use Components

### Hero
```
Purpose:     Landing hero with scroll-driven logo animation + content entrance/exit
Props:       None (self-contained)
Dependencies: framer-motion (useScroll, useTransform), Logo, react-router-dom Link
State:       useLayoutEffect for measurement
Location:    src/components/Hero.tsx
```

### Header
```
Purpose:     Fixed top navigation (homepage vs subpage variants)
Props:       None
Dependencies: react-router-dom, MenuOverlay, BOOKING_URL
State:       menuOpen (useState)
Location:    src/components/Header.tsx
```

### MenuOverlay
```
Purpose:     Fullscreen mobile navigation overlay
Props:       open (boolean), onClose (function)
Dependencies: framer-motion (AnimatePresence), react-router-dom Link, lucide-react X
Location:    src/components/MenuOverlay.tsx
```

### Footer
```
Purpose:     Site footer with logo, info, booking link
Props:       None
Dependencies: BOOKING_URL, contact from data.ts
Location:    src/components/Footer.tsx
```

### ScrollProgress
```
Purpose:     Thin cinematic progress bar at top of viewport
Props:       None
Dependencies: framer-motion (useScroll, useSpring, motion)
Location:    src/components/ScrollProgress.tsx
```

### ScrollToTop
```
Purpose:     Scrolls to top on route change
Props:       None
Dependencies: react-router-dom useLocation
Note:        Renders null
Location:    src/components/ScrollToTop.tsx
```

### FilmGrain
```
Purpose:     Static vignette overlay for cinematic edge-darkening
Props:       None
Dependencies: None (static div)
Location:    src/components/FilmGrain.tsx
```

### CinematicIntro
```
Purpose:     Curtain intro overlay — controlled externally by AppProvider
Props:       open (boolean), onComplete? (() => void)
Dependencies: framer-motion (AnimatePresence)
State:       None (fully controlled)
Note:        No autoplay. Only renders when open=true. Exit calls onComplete.
Location:    src/components/CinematicIntro.tsx
```

### AppProvider
```
Purpose:     Startup state machine (context). Controls intro phase.
Provides:    phase (AppPhase type), useApp() hook, requestIntro()
State:       phase (useState), sessionStorage flag for session persistence
Dependencies: React context
Location:    foundation/providers/AppProvider
```

### Logo
```
Purpose:     Logo image wrapper
Props:       className?
Dependencies: None
Note:        aria-hidden="true" (decorative)
Location:    src/components/Logo.tsx
```

---

## Section Components (Single-Use on HomePage)

| Component | Purpose | Location |
|-----------|---------|----------|
| WhyMenReturn | Sensory story with image | `src/components/WhyMenReturn.tsx` |
| Experience | 5 moments of barbershop experience | `src/components/Experience.tsx` |
| Trust | Stat counters (animated) | `src/components/Trust.tsx` |
| Benefits | 6 benefit cards | `src/components/Benefits.tsx` |
| Services | Service menu list | `src/components/Services.tsx` |
| Booking | Booking form (also reused on subpages) | `src/components/Booking.tsx` |
| Gallery | Image gallery with scroll zoom | `src/components/Gallery.tsx` |
| VideoPresentation | Video cover with play toggle | `src/components/VideoPresentation.tsx` |
| Reviews | Featured + secondary reviews | `src/components/Reviews.tsx` |
| About | Barber story with portrait | `src/components/About.tsx` |
| Contact | Contact info + hours + map | `src/components/Contact.tsx` |
| FinalScene | Cinematic closing CTA | `src/components/FinalScene.tsx` |

---

## Removed Components

| Component | Previously | Status |
|-----------|------------|--------|
| Pricing.tsx | `src/components/Pricing.tsx` | **Deleted** — dead code, never imported |

---

## Potential Duplicates / Overlaps

1. **OffersPage inline service list** vs **Services.tsx**: Two implementations of the same service list display (OffersPage inline, HomePage uses Services.tsx).

2. **About.tsx** (section component) vs **AboutPage.tsx**: Different layouts — section is a 2-column magazine spread on HomePage, page is a full standalone page with different content.
