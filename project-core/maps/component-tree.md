# Component Tree

```
App (BrowserRouter)
│
├─ AppProvider             ← context: phase (AppPhase), useApp() hook, requestIntro()
│  │
│  ├─ ScrollToTop         ← (null render) useEffect: scrollToTop on pathname change
│  ├─ ScrollProgress       ← motion.div fixed top: useScroll + useSpring progress bar
│  ├─ FilmGrain            ← static div: radial-gradient vignette
│  ├─ CinematicIntro        ← AnimatePresence: open={phase === 'intro'}
│  ├─ <div fixed z-0>      ← background image: pozadi.png, cover, center 25%
│
├─ <div relative z-10>
│  │
│  ├─ Header              ← fixed top nav
│  │  ├─ (homepage path)  ← "Rezervovat" link + empty slot div + "Menu" button
│  │  ├─ (subpage path)   ← "Barberman" button + "Rezervovat" + "Menu"
│  │  └─ MenuOverlay      ← AnimatePresence: fullscreen nav (conditional on menuOpen)
│  │
│  ├─ <main>
│  │  └─ <Routes>
│  │     │
│  │     ├─ "/" (HomePage)
│  │     │  ├─ Hero       ← 2 useScroll, 8 useTransform, 4 motion.*
│  │     │  │               body/CTA visible at scroll=0 (exit-only transform)
│  │     │  ├─ WhyMenReturn
│  │     │  │  ├─ SectionTransition (id=none, snap, enterEnd=0.4)
│  │     │  │  └─ Reveal ×6 (eyebrow, title, body, line, quote, image)
│  │     │  │
│  │     │  ├─ Experience
│  │     │  │  ├─ SectionTransition (snap, enterEnd=0.35)
│  │     │  │  └─ Reveal ×7 (eyebrow, title, 5 moments)
│  │     │  │
│  │     │  ├─ Trust
│  │     │  │  ├─ SectionTransition (id=duvera)
│  │     │  │  └─ AnimatedCounter ×4 (useInView + setInterval counter)
│  │     │  │
│  │     │  ├─ Benefits
│  │     │  │  ├─ SectionTransition (id=vyhody)
│  │     │  │  └─ Reveal ×6 (benefit cards)
│  │     │  │
│  │     │  ├─ Services
│  │     │  │  ├─ SectionTransition (id=sluzby, snap)
│  │     │  │  └─ Reveal ×8 (header + 6 services + footer)
│  │     │  │
│  │     │  ├─ Booking
│  │     │  │  ├─ SectionTransition (id=rezervace)
│  │     │  │  ├─ Reveal ×5 (info + form)
│  │     │  │  └─ AnimatePresence (form↔success)
│  │     │  │
│  │     │  ├─ Gallery
│  │     │  │  ├─ SectionTransition (id=galerie, snap)
│  │     │  │  ├─ Reveal ×5 (header + 4 images)
│  │     │  │  └─ GalleryImage ×4 (useScroll + useTransform zoom)
│  │     │  │
│  │     │  ├─ VideoPresentation
│  │     │  │  ├─ SectionTransition (id=video, snap)
│  │     │  │  ├─ Reveal ×3
│  │     │  │  └─ AnimatePresence (cover↔iframe)
│  │     │  │
│  │     │  ├─ Reviews
│  │     │  │  ├─ SectionTransition (id=recenze, snap)
│  │     │  │  ├─ Reveal ×9 (header + featured + divider + 4 secondary)
│  │     │  │  └─ (inline review data)
│  │     │  │
│  │     │  ├─ About
│  │     │  │  ├─ SectionTransition (id=o-nas, snap)
│  │     │  │  └─ Reveal ×6 (image + eyebrow + quote + body + line + signature)
│  │     │  │
│  │     │  ├─ Contact
│  │     │  │  ├─ SectionTransition (id=kontakt, snap)
│  │     │  │  └─ Reveal ×6 (header + 3 info cards)
│  │     │  │
│  │     │  └─ FinalScene
│  │     │     ├─ SectionTransition (snap)
│  │     │     └─ Reveal ×4 (title + line + body + CTA)
│  │     │
│  │     ├─ "/nabidka" (OffersPage)
│  │     │  ├─ PageHeader (eyebrow, title, subtitle, image)
│  │     │  ├─ (inline service list)
│  │     │  └─ Booking
│  │     │
│  │     ├─ "/o-nas" (AboutPage)
│  │     │  ├─ PageHeader
│  │     │  ├─ (inline story section + Reveal ×5)
│  │     │  ├─ (inline pillars section + Reveal ×3)
│  │     │  ├─ (inline reviews section + Reveal ×8)
│  │     │  └─ Booking
│  │     │
│  │     └─ "/kontakt" (ContactPage)
│  │        ├─ PageHeader
│  │        ├─ Contact
│  │        └─ Booking
│  │
│  └─ Footer             ← static: logo, address, phone, booking link
```

## Shared Components Summary

| Component | Imported By | Reused? |
|-----------|-------------|---------|
| SectionTransition | All 12 section components | Yes, used 12 times |
| Reveal | All section components | Yes, used ~30 times |
| Booking | HomePage, OffersPage, AboutPage, ContactPage | Yes, used 4 times |
| Contact | HomePage, ContactPage | Yes, used 2 times |
| PageHeader | OffersPage, AboutPage, ContactPage | Yes, used 3 times |
| Hero | HomePage only | No |
| Header | App (always rendered) | No |
| Footer | App (always rendered) | No |

## Feature Boundaries

- **Landing page**: HomePage (Hero + 12 sections)
- **Services/Offers**: OffersPage (PageHeader + service list + Booking)
- **About**: AboutPage (PageHeader + story + pillars + reviews + Booking)
- **Contact**: ContactPage (PageHeader + Contact + Booking)
- **Booking**: Reused standalone form component
- **Navigation**: Header + MenuOverlay (always present)
