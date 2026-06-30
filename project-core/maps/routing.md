# Routing Map

## Route Table

```
Path         Page Component     Nav Label    Section IDs (hash)     Content
───          ─────────────      ────────     ──────────────         ───────
/            HomePage           Domů         #sluzby, #cenik,       Full landing page
                                             #galerie, #recenze,    with 12 sections
                                             #o-nas, #kontakt,
                                             #duvera, #vyhody,
                                             #rezervace, #video

/nabidka     OffersPage         Služby/Ceník —                      PageHeader + service
                                                                     list + Booking

/o-nas       AboutPage          O nás        —                      PageHeader + story +
                                                                     pillars + reviews +
                                                                     Booking

/kontakt     ContactPage        Kontakt      —                      PageHeader + Contact +
                                                                     Booking

*            HomePage (fallback) —           —                      Catch-all: renders HomePage
```

## Navigation Flow

```
Header "Menu" button
  └─ onClick → setMenuOpen(true) → MenuOverlay mounts
       └─ nav links:
            ├─ "Domů"    → Link to="/"        → closes menu → navigates
            ├─ "Služby"  → Link to="/#sluzby"  → closes menu → navigates to / + scroll to #sluzby
            ├─ "Ceník"   → Link to="/#cenik"   → closes menu → navigates to / + scroll to #cenik
            ├─ "Galerie" → Link to="/#galerie" → closes menu → navigates to / + scroll to #galerie
            ├─ "O nás"   → Link to="/o-nas"    → closes menu → navigates to /o-nas
            └─ "Kontakt" → Link to="/kontakt"  → closes menu → navigates to /kontakt

Header "Barberman" text (subpages only)
  └─ onClick → navigate('/')

Header "Rezervovat" link
  └─ href={BOOKING_URL} → external link (new tab)

HomePage logo click (Hero.tsx)
  └─ dispatch('cinematic-intro') + window.scrollTo({ top: 0 })
       → CinematicIntro replays + HomePage remounts (introKey++)
```

## Scroll Behavior

- **CSS**: `scroll-behavior: smooth` on `<html>`
- **Snap**: `scroll-snap-type: y proximity` on `<html>`
- **Hash scroll**: Native browser behavior (no JS scroll-into-view)
- **Route change scroll**: ScrollToTop.tsx + Header.tsx useEffect both call `window.scrollTo(0,0)`
- **Smooth scroll on logo click**: Manual `window.scrollTo({ top: 0, behavior: 'smooth' })`
